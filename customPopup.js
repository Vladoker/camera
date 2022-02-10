document.addEventListener("DOMContentLoaded", function(event) {
  const custom_popup = document.querySelector("#custom_popup");
  const close_popup = document.querySelector("#close_popup");
  const camera_back = document.querySelector("#camera_back");
  const container_camera = document.querySelector("#container_camera");

  const camera = document.querySelector("#camera");
  const photo_icon = document.querySelector("#photo_icon");


  const face_btn = document.querySelector("#face_btn");
  const front_btn = document.querySelector("#front_btn");
  const back_btn = document.querySelector("#back_btn");

  const send = document.querySelector("#sendPhotos");

  const face_maska = document.querySelector(".face_maska");
  const pasport_maska = document.querySelector(".pasport_maska");

  let stream = false;
  let eventName = "";
  let photos = {};

  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }

  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function(constraints) {
  
      // Сначала, если доступно, получим устаревшее getUserMedia
  
    var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  
     //Некоторые браузеры не реализуют его, тогда вернём отменённый промис
     // с ошибкой для поддержания последовательности интерфейса
  
      if (!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
      }
  
      // Иначе, обернём промисом устаревший navigator.getUserMedia
  
      return new Promise(function(resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    }
  }

  



  function turnOnTheCamera(photoName, element, front = true){
    eventName = photoName;
    element.target.disabled = true;
    element.target.style.opacity = "0.5";
    navigator.mediaDevices.getUserMedia({"audio": false, 'video': { 'facingMode': (front ? 'user' : 'environment') } }) //'frameRate': { ideal: 10, max: 15 },
    .then(mediaStream => {
      
      if ("srcObject" in camera) {
        camera.srcObject = mediaStream;
      } else {
        // Не используем в новых браузерах
        camera.src = window.URL.createObjectURL(mediaStream);
      }
      camera.onloadedmetadata = function(e) {
        camera.play();
      };
      
      stream = mediaStream;
      container_camera.classList.add("show");
      setTimeout(()=> {
        element.target.disabled = false;
        element.target.style.opacity = "1";
      },1000);
    })
    .catch(er => {
      let warningNotofication = document.querySelector("#warning_notofication");
      if(warningNotofication){
        warningNotofication = warningNotofication.textContent;
      }
      if(window.innerWidth >= 430){
        Toastify({
          text: warningNotofication,
          duration: 7000,
          close: true,
          style: {
            background: "linear-gradient(to right, rgb(216 19 19), rgb(192 84 84))",
          }
        }).showToast();
      }
      else {
        alert(warningNotofication);
      }
      console.error(er);
      setTimeout(()=> {
        element.target.disabled = false;
        element.target.style.opacity = "1";
      },1000);
    });
  }
  function offCamera(){
    container_camera.classList.remove("show");
    if(stream){
      stream.getTracks().forEach(track => track.stop());
    }
    face_maska.classList.add("hidden");
    pasport_maska.classList.add("hidden");
  }

  custom_popup.addEventListener("click", (e) => { // close all popup
    const array = e.target.classList;
    if(array.contains("custom--popup")){
      offCamera();
      custom_popup.classList.remove("show");
      photos = {};
    }
  });
  close_popup.addEventListener("click", () => { // close popup 'cross'
    offCamera();
    custom_popup.classList.remove("show");
    photos = {};
  });
  camera_back.addEventListener("click", () => { // close camera
    offCamera();
  });


  function createFileInput(name){
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", () => {
      photos[name] = input.files[0];
    });
    input.click();
  }

  // open camera
  face_btn.addEventListener("click", e => { 
    face_maska.classList.remove("hidden");
    turnOnTheCamera("face", e, true);
  }); 
  front_btn.addEventListener("click", e => { 
    if(window.innerWidth <= 430){
      pasport_maska.classList.remove("hidden");
      turnOnTheCamera("front", e, false);
    }
    else {
      createFileInput("front");
    }
  }); 
  back_btn.addEventListener("click", e => { 
    if(window.innerWidth <= 430){
      pasport_maska.classList.remove("hidden");
      turnOnTheCamera("back", e, false);
    }
    else {
      createFileInput("back");
    }
  }); 

  
  // take a picture
  photo_icon.addEventListener("click", () => { 
    if(stream){
      const mediaStreamTrack = stream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(mediaStreamTrack);
  
      imageCapture.takePhoto()
      .then(blob => {
        photos[eventName] = blob;
      })
      .catch(console.error)
      .finally(() => {
        offCamera();
      });
    }
  });

  send.addEventListener("click", function (e) {

    if(Object.values(photos).length >= 3){ // Проверку можно убрать - Проверка на наличии трёх фотографий
      e.target.disabled = true;
      e.target.style.opacity = "0.5";
      const formData = new FormData();
      
      // Фотографии 
      formData.append('face', photos.face); 
      formData.append('front', photos.front); 
      formData.append('back', photos.back); 

      // по истогу отправляется такая структура 
      // {
      //   face: (binary),
      //   front: (binary),
      //   back: (binary)
      // }


      // отправка на Сервер фотографии
      fetch('https://example.com/profile/avatar', { // Тут меняем API куда будут прихоидть фото 
        method: 'POST',
        body: formData
      })
      .then(function(serverResponce) {
        console.log(serverResponce);

      })
      .catch(function(err) {
        console.error(err);
      })
      .finally(function() {
        custom_popup.classList.remove("show");
        e.target.disabled = false;
        e.target.style.opacity = "1";
      });
    }

  });
  
});
