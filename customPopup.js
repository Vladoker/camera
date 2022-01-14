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
      alert("camera not detected");
      console.error(er);
      let input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.addEventListener("change", () => {
        photos[eventName] = input.files[0];
      });
      input.click();
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

  // open camera
  face_btn.addEventListener("click", e => { 
    turnOnTheCamera("face", e, true);
  }); 
  front_btn.addEventListener("click", e => { 
    turnOnTheCamera("front", e, false);
  }); 
  back_btn.addEventListener("click", e => { 
    turnOnTheCamera("back", e, false);
  }); 

  
  // take a picture
  photo_icon.addEventListener("click", () => { 
    alert("click");
    if(stream){
      alert("stream is avalible");
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

  send.addEventListener("click", function () {

    if(Object.values(photos).length >= 3){
      const formData = new FormData();

      formData.append('face', photos.face); // Ставим фотографию лица в спецальную форму для отправки
      formData.append('front', photos.front); 
      formData.append('back', photos.back); 


      // отправка на Сервер фотографии
      fetch('https://example.com/profile/avatar', {
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
      });
    }

  });
  
});