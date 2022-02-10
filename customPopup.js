!function(t,o){"object"==typeof module&&module.exports?module.exports=o():t.Toastify=o()}(this,(function(t){var o=function(t){return new o.lib.init(t)};function i(t,o){return o.offset[t]?isNaN(o.offset[t])?o.offset[t]:o.offset[t]+"px":"0px"}function s(t,o){return!(!t||"string"!=typeof o)&&!!(t.className&&t.className.trim().split(/\s+/gi).indexOf(o)>-1)}return o.defaults={oldestFirst:!0,text:"Toastify is awesome!",node:void 0,duration:3e3,selector:void 0,callback:function(){},destination:void 0,newWindow:!1,close:!1,gravity:"toastify-top",positionLeft:!1,position:"",backgroundColor:"",avatar:"",className:"",stopOnFocus:!0,onClick:function(){},offset:{x:0,y:0},escapeMarkup:!0,style:{background:""}},o.lib=o.prototype={toastify:"1.11.2",constructor:o,init:function(t){return t||(t={}),this.options={},this.toastElement=null,this.options.text=t.text||o.defaults.text,this.options.node=t.node||o.defaults.node,this.options.duration=0===t.duration?0:t.duration||o.defaults.duration,this.options.selector=t.selector||o.defaults.selector,this.options.callback=t.callback||o.defaults.callback,this.options.destination=t.destination||o.defaults.destination,this.options.newWindow=t.newWindow||o.defaults.newWindow,this.options.close=t.close||o.defaults.close,this.options.gravity="bottom"===t.gravity?"toastify-bottom":o.defaults.gravity,this.options.positionLeft=t.positionLeft||o.defaults.positionLeft,this.options.position=t.position||o.defaults.position,this.options.backgroundColor=t.backgroundColor||o.defaults.backgroundColor,this.options.avatar=t.avatar||o.defaults.avatar,this.options.className=t.className||o.defaults.className,this.options.stopOnFocus=void 0===t.stopOnFocus?o.defaults.stopOnFocus:t.stopOnFocus,this.options.onClick=t.onClick||o.defaults.onClick,this.options.offset=t.offset||o.defaults.offset,this.options.escapeMarkup=void 0!==t.escapeMarkup?t.escapeMarkup:o.defaults.escapeMarkup,this.options.style=t.style||o.defaults.style,t.backgroundColor&&(this.options.style.background=t.backgroundColor),this},buildToast:function(){if(!this.options)throw"Toastify is not initialized";var t=document.createElement("div");for(var o in t.className="toastify on "+this.options.className,this.options.position?t.className+=" toastify-"+this.options.position:!0===this.options.positionLeft?(t.className+=" toastify-left",console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.")):t.className+=" toastify-right",t.className+=" "+this.options.gravity,this.options.backgroundColor&&console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.'),this.options.style)t.style[o]=this.options.style[o];if(this.options.node&&this.options.node.nodeType===Node.ELEMENT_NODE)t.appendChild(this.options.node);else if(this.options.escapeMarkup?t.innerText=this.options.text:t.innerHTML=this.options.text,""!==this.options.avatar){var s=document.createElement("img");s.src=this.options.avatar,s.className="toastify-avatar","left"==this.options.position||!0===this.options.positionLeft?t.appendChild(s):t.insertAdjacentElement("afterbegin",s)}if(!0===this.options.close){var e=document.createElement("span");e.innerHTML="&#10006;",e.className="toast-close",e.addEventListener("click",function(t){t.stopPropagation(),this.removeElement(this.toastElement),window.clearTimeout(this.toastElement.timeOutValue)}.bind(this));var n=window.innerWidth>0?window.innerWidth:screen.width;("left"==this.options.position||!0===this.options.positionLeft)&&n>360?t.insertAdjacentElement("afterbegin",e):t.appendChild(e)}if(this.options.stopOnFocus&&this.options.duration>0){var a=this;t.addEventListener("mouseover",(function(o){window.clearTimeout(t.timeOutValue)})),t.addEventListener("mouseleave",(function(){t.timeOutValue=window.setTimeout((function(){a.removeElement(t)}),a.options.duration)}))}if(void 0!==this.options.destination&&t.addEventListener("click",function(t){t.stopPropagation(),!0===this.options.newWindow?window.open(this.options.destination,"_blank"):window.location=this.options.destination}.bind(this)),"function"==typeof this.options.onClick&&void 0===this.options.destination&&t.addEventListener("click",function(t){t.stopPropagation(),this.options.onClick()}.bind(this)),"object"==typeof this.options.offset){var l=i("x",this.options),r=i("y",this.options),p="left"==this.options.position?l:"-"+l,d="toastify-top"==this.options.gravity?r:"-"+r;t.style.transform="translate("+p+","+d+")"}return t},showToast:function(){var t;if(this.toastElement=this.buildToast(),!(t="string"==typeof this.options.selector?document.getElementById(this.options.selector):this.options.selector instanceof HTMLElement||"undefined"!=typeof ShadowRoot&&this.options.selector instanceof ShadowRoot?this.options.selector:document.body))throw"Root element is not defined";var i=o.defaults.oldestFirst?t.firstChild:t.lastChild;return t.insertBefore(this.toastElement,i),o.reposition(),this.options.duration>0&&(this.toastElement.timeOutValue=window.setTimeout(function(){this.removeElement(this.toastElement)}.bind(this),this.options.duration)),this},hideToast:function(){this.toastElement.timeOutValue&&clearTimeout(this.toastElement.timeOutValue),this.removeElement(this.toastElement)},removeElement:function(t){t.className=t.className.replace(" on",""),window.setTimeout(function(){this.options.node&&this.options.node.parentNode&&this.options.node.parentNode.removeChild(this.options.node),t.parentNode&&t.parentNode.removeChild(t),this.options.callback.call(t),o.reposition()}.bind(this),400)}},o.reposition=function(){for(var t,o={top:15,bottom:15},i={top:15,bottom:15},e={top:15,bottom:15},n=document.getElementsByClassName("toastify"),a=0;a<n.length;a++){t=!0===s(n[a],"toastify-top")?"toastify-top":"toastify-bottom";var l=n[a].offsetHeight;t=t.substr(9,t.length-1);(window.innerWidth>0?window.innerWidth:screen.width)<=360?(n[a].style[t]=e[t]+"px",e[t]+=l+15):!0===s(n[a],"toastify-left")?(n[a].style[t]=o[t]+"px",o[t]+=l+15):(n[a].style[t]=i[t]+"px",i[t]+=l+15)}return this},o.lib.init.prototype=o.lib,o}));
document.addEventListener("DOMContentLoaded", function(event) {
  
/**
 * MediaStream ImageCapture polyfill
 *
 * @license
 * Copyright 2018 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 let ImageCapture = window.ImageCapture;

 if (typeof ImageCapture === 'undefined') {
   ImageCapture = class {
 
     /**
      * TODO https://www.w3.org/TR/image-capture/#constructors
      *
      * @param {MediaStreamTrack} videoStreamTrack - A MediaStreamTrack of the 'video' kind
      */
     constructor(videoStreamTrack) {
       if (videoStreamTrack.kind !== 'video')
         throw new DOMException('NotSupportedError');
 
       this._videoStreamTrack = videoStreamTrack;
       if (!('readyState' in this._videoStreamTrack)) {
         // Polyfill for Firefox
         this._videoStreamTrack.readyState = 'live';
       }
 
       // MediaStream constructor not available until Chrome 55 - https://www.chromestatus.com/feature/5912172546752512
       this._previewStream = new MediaStream([videoStreamTrack]);
       this.videoElement = document.createElement('video');
       this.videoElementPlaying = new Promise(resolve => {
         this.videoElement.addEventListener('playing', resolve);
       });
       if (HTMLMediaElement) {
         this.videoElement.srcObject = this._previewStream;  // Safari 11 doesn't allow use of createObjectURL for MediaStream
       } else {
         this.videoElement.src = URL.createObjectURL(this._previewStream);
       }
       this.videoElement.muted = true;
       this.videoElement.setAttribute('playsinline', ''); // Required by Safari on iOS 11. See https://webkit.org/blog/6784
       this.videoElement.play();
 
       this.canvasElement = document.createElement('canvas');
       // TODO Firefox has https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
       this.canvas2dContext = this.canvasElement.getContext('2d');
     }
 
     /**
      * https://w3c.github.io/mediacapture-image/index.html#dom-imagecapture-videostreamtrack
      * @return {MediaStreamTrack} The MediaStreamTrack passed into the constructor
      */
     get videoStreamTrack() {
       return this._videoStreamTrack;
     }
 
     /**
      * Implements https://www.w3.org/TR/image-capture/#dom-imagecapture-getphotocapabilities
      * @return {Promise<PhotoCapabilities>} Fulfilled promise with
      * [PhotoCapabilities](https://www.w3.org/TR/image-capture/#idl-def-photocapabilities)
      * object on success, rejected promise on failure
      */
     getPhotoCapabilities() {
       return new Promise(function executorGPC(resolve, reject) {
         // TODO see https://github.com/w3c/mediacapture-image/issues/97
         const MediaSettingsRange = {
           current: 0, min: 0, max: 0,
         };
         resolve({
           exposureCompensation: MediaSettingsRange,
           exposureMode: 'none',
           fillLightMode: 'none',
           focusMode: 'none',
           imageHeight: MediaSettingsRange,
           imageWidth: MediaSettingsRange,
           iso: MediaSettingsRange,
           redEyeReduction: false,
           whiteBalanceMode: 'none',
           zoom: MediaSettingsRange,
         });
         reject(new DOMException('OperationError'));
       });
     }
 
     /**
      * Implements https://www.w3.org/TR/image-capture/#dom-imagecapture-setoptions
      * @param {Object} photoSettings - Photo settings dictionary, https://www.w3.org/TR/image-capture/#idl-def-photosettings
      * @return {Promise<void>} Fulfilled promise on success, rejected promise on failure
      */
     setOptions(photoSettings = {}) {
       return new Promise(function executorSO(resolve, reject) {
         // TODO
       });
     }
 
     /**
      * TODO
      * Implements https://www.w3.org/TR/image-capture/#dom-imagecapture-takephoto
      * @return {Promise<Blob>} Fulfilled promise with [Blob](https://www.w3.org/TR/FileAPI/#blob)
      * argument on success; rejected promise on failure
      */
     takePhoto() {
       const self = this;
       return new Promise(function executorTP(resolve, reject) {
         // `If the readyState of the MediaStreamTrack provided in the constructor is not live,
         // return a promise rejected with a new DOMException whose name is "InvalidStateError".`
         if (self._videoStreamTrack.readyState !== 'live') {
           return reject(new DOMException('InvalidStateError'));
         }
         self.videoElementPlaying.then(() => {
           try {
             self.canvasElement.width = self.videoElement.videoWidth;
             self.canvasElement.height = self.videoElement.videoHeight;
             self.canvas2dContext.drawImage(self.videoElement, 0, 0);
             self.canvasElement.toBlob(resolve);
           } catch (error) {
             reject(new DOMException('UnknownError'));
           }
         });
       });
     }
 
     /**
      * Implements https://www.w3.org/TR/image-capture/#dom-imagecapture-grabframe
      * @return {Promise<ImageBitmap>} Fulfilled promise with
      * [ImageBitmap](https://www.w3.org/TR/html51/webappapis.html#webappapis-images)
      * argument on success; rejected promise on failure
      */
     grabFrame() {
       const self = this;
       return new Promise(function executorGF(resolve, reject) {
         // `If the readyState of the MediaStreamTrack provided in the constructor is not live,
         // return a promise rejected with a new DOMException whose name is "InvalidStateError".`
         if (self._videoStreamTrack.readyState !== 'live') {
           return reject(new DOMException('InvalidStateError'));
         }
         self.videoElementPlaying.then(() => {
           try {
             self.canvasElement.width = self.videoElement.videoWidth;
             self.canvasElement.height = self.videoElement.videoHeight;
             self.canvas2dContext.drawImage(self.videoElement, 0, 0);
             // TODO polyfill https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmapFactories/createImageBitmap for IE
             resolve(window.createImageBitmap(self.canvasElement));
           } catch (error) {
             reject(new DOMException('UnknownError'));
           }
         });
       });
     }
   };
 }
 
 window.ImageCapture = ImageCapture;

 /////////////////////////////////////////////////////////////////////////////////////////////////



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
      const warningNotofication = document.querySelector("#warning_notofication").textContent ?? "Camera not detection";
      Toastify({
        text: warningNotofication,
        duration: 7000,
        close: true,
        style: {
          background: "linear-gradient(to right, rgb(216 19 19), rgb(192 84 84))",
        }
      }).showToast();

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