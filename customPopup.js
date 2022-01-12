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

  let stream = null;
  let eventName = "";
  let photos = {};




  function turnOnTheCamera(e){
    
    eventName = e;
    navigator.mediaDevices.getUserMedia({'video': true})
    .then(mediaStream => {   
      camera.srcObject = mediaStream;
      stream = mediaStream;
      container_camera.classList.add("show");
    })
    .catch(er => {
      console.error(er);
      let input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.addEventListener("change", () => {
        photos[eventName] = input.files[0];
      });
      input.click();
    });
  }
  function offCamera(){
    console.dir("stream", stream);
    console.dir("camera", camera);
    if(stream){
      stream.stop();
    }
    container_camera.classList.remove("show");
  }


  custom_popup.addEventListener("click", (e) => { // close all popup
    const array = e.target.classList;
    if(array.contains("custom--popup")){
      custom_popup.classList.remove("show");
      offCamera();
    }
  });
  close_popup.addEventListener("click", () => { // close popup 'cross'
    custom_popup.classList.remove("show");
    offCamera();
  });
  camera_back.addEventListener("click", () => { // close camera
    offCamera();
  });

  // open camera
  face_btn.addEventListener("click", function(){ turnOnTheCamera("face") }); 
  front_btn.addEventListener("click", function(){ turnOnTheCamera("front") }); 
  back_btn.addEventListener("click", function(){ turnOnTheCamera("back") }); 

  
  // take a picture
  photo_icon.addEventListener("click", () => { 
    const mediaStreamTrack = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(mediaStreamTrack);

    imageCapture.takePhoto()
    .then(blob => {
      photos[eventName] = blob;
    })
    .catch(console.error)
    .finally(() => {
      custom_popup.classList.remove("show");
      offCamera();
    });
    
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