!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){var n={},a=document.querySelector(".app__snackbar"),o=null;n.show=(e,t=4e3)=>{e&&(o&&o.remove(),(o=document.createElement("div")).className="app__snackbar-msg",o.textContent=e,a.appendChild(o),setTimeout(()=>{o.remove()},t))},t.snackbar=n},function(e,t,n){"use strict";n.r(t);var a=n(0),o={};function r(e){!e&&window.isMediaStreamAPISupported?o.webcam=document.querySelector("video"):o.webcam=document.querySelector("img")}o.active=!1,o.webcam=null,o.canvas=null,o.ctx=null,o.decoder=null,o.setCanvas=()=>{o.canvas=document.createElement("canvas"),o.ctx=o.canvas.getContext("2d")},o.init=()=>{var e=!1;function t(){o.canvas.width=window.innerWidth,o.canvas.height=window.innerHeight}function n(e){navigator.mediaDevices.getUserMedia(e).then((function(e){o.webcam.srcObject=e,o.webcam.setAttribute("playsinline",!0),o.webcam.setAttribute("controls",!0),setTimeout(()=>{document.querySelector("video").removeAttribute("controls")})})).catch((function(e){console.log("Error occurred ",e),i()}))}function i(){window.noCameraPermission=!0,document.querySelector(".custom-scanner").style.display="none",a.snackbar.show("Unable to access the camera",1e4)}r(),o.setCanvas(),o.decoder=new Worker("decoder.js"),window.isMediaStreamAPISupported?o.webcam.addEventListener("play",(function(n){e||(t(),e=!0)}),!1):t(),window.isMediaStreamAPISupported&&navigator.mediaDevices.enumerateDevices().then((function(e){var t,a=e.filter((function(e){e.label.split(",")[1];if("videoinput"==e.kind)return e}));a.length>1?(t={video:{mandatory:{sourceId:a[a.length-1].deviceId?a[a.length-1].deviceId:null}},audio:!1},window.iOS&&(t.video.facingMode="environment"),n(t)):a.length?(t={video:{mandatory:{sourceId:a[0].deviceId?a[0].deviceId:null}},audio:!1},window.iOS&&(t.video.facingMode="environment"),t.video.mandatory.sourceId||window.iOS?n(t):n({video:!0})):n({video:!0})})).catch((function(e){i(),console.error("Error occurred : ",e)}))},o.scan=function(e,t){function n(){if(o.active)try{o.ctx.drawImage(o.webcam,0,0,o.canvas.width,o.canvas.height);var e=o.ctx.getImageData(0,0,o.canvas.width,o.canvas.height);e.data&&o.decoder.postMessage(e)}catch(e){"NS_ERROR_NOT_AVAILABLE"==e.name&&setTimeout(n,0)}}o.active=!0,o.setCanvas(),o.decoder.onmessage=function(t){if(t.data.length>0){var a=t.data[0][2];o.active=!1,e(a)}setTimeout(n,0)},setTimeout(()=>{r(t)}),n()};var i=o;n(2);"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/service-worker.js").then(e=>{console.log("SW registered: ",e),localStorage.getItem("offline")||(localStorage.setItem("offline",!0),a.snackbar.show("App is ready for offline usage.",5e3))}).catch(e=>{console.log("SW registration failed: ",e)})}),window.addEventListener("DOMContentLoaded",()=>{window.iOS=["iPad","iPhone","iPod"].indexOf(navigator.platform)>=0,window.isMediaStreamAPISupported=navigator&&navigator.mediaDevices&&"enumerateDevices"in navigator.mediaDevices,window.noCameraPermission=!1;var e=null,t=null,n=document.querySelector(".app__layout"),a=document.querySelector(".app__dialog"),o=document.querySelector(".app__dialog-overlay"),r=document.querySelector(".app__dialog-close"),d=document.querySelector(".custom-scanner"),c=document.querySelector("#result");function s(){((e="")=>new RegExp("^(https?:\\/\\/)","i").test(e))(e)||(e="//"+e),window.open(e,"_blank","toolbar=0,location=0,menubar=0"),u()}function l(t=!1){window.isMediaStreamAPISupported&&!window.noCameraPermission&&(d.style.display="block"),t&&(d.style.display="block"),i.scan(t=>{e=t,c.value=t,c.select(),d.style.display="none",((e="")=>{if(!e||"string"!=typeof e)return!1;return new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i").test(e)})(t)&&s(),a.classList.remove("app__dialog--hide"),o.classList.remove("app__dialog--hide")},t)}function u(){e=null,c.value="",window.isMediaStreamAPISupported||(t.src="",t.className=""),a.classList.add("app__dialog--hide"),o.classList.add("app__dialog--hide")}window.appOverlay=document.querySelector(".app__overlay"),window.addEventListener("load",e=>{i.init(),setTimeout(()=>{window.appOverlay.style.borderStyle="solid",window.isMediaStreamAPISupported&&l()},1e3),function(){var e=document.createElement("input");e.setAttribute("type","file"),e.setAttribute("capture","camera"),e.id="camera",window.appOverlay.style.borderStyle="",(t=document.createElement("img")).src="",t.id="frame";var a=document.querySelector(".app__layout-content");a.appendChild(e),a.appendChild(t),n.addEventListener("click",()=>{d.style.display="none",document.querySelector("#camera").click()}),e.addEventListener("change",e=>{e.target&&e.target.files.length>0&&(t.className="app__overlay",t.src=URL.createObjectURL(e.target.files[0]),window.noCameraPermission||(d.style.display="block"),window.appOverlay.style.borderColor="rgb(62, 78, 184)",l(!0))})}()}),r.addEventListener("click",u,!1)})},function(e,t){}]);