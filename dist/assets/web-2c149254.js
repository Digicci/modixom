import{W as u,C as o,t as d,u as m}from"./index-17623f89.js";class h extends u{async getPhoto(t){return new Promise(async(i,a)=>{if(t.webUseInput||t.source===o.Photos)this.fileInputExperience(t,i,a);else if(t.source===o.Prompt){let e=document.querySelector("pwa-action-sheet");e||(e=document.createElement("pwa-action-sheet"),document.body.appendChild(e)),e.header=t.promptLabelHeader||"Photo",e.cancelable=!1,e.options=[{title:t.promptLabelPhoto||"From Photos"},{title:t.promptLabelPicture||"Take Picture"}],e.addEventListener("onSelection",async r=>{r.detail===0?this.fileInputExperience(t,i,a):this.cameraExperience(t,i,a)})}else this.cameraExperience(t,i,a)})}async pickImages(t){return new Promise(async(i,a)=>{this.multipleFileInputExperience(i,a)})}async cameraExperience(t,i,a){if(customElements.get("pwa-camera-modal")){const e=document.createElement("pwa-camera-modal");e.facingMode=t.direction===d.Front?"user":"environment",document.body.appendChild(e);try{await e.componentOnReady(),e.addEventListener("onPhoto",async r=>{const n=r.detail;n===null?a(new m("User cancelled photos app")):n instanceof Error?a(n):i(await this._getCameraPhoto(n,t)),e.dismiss(),document.body.removeChild(e)}),e.present()}catch(r){this.fileInputExperience(t,i,a)}}else console.error("Unable to load PWA Element 'pwa-camera-modal'. See the docs: https://capacitorjs.com/docs/web/pwa-elements."),this.fileInputExperience(t,i,a)}fileInputExperience(t,i,a){let e=document.querySelector("#_capacitor-camera-input");const r=()=>{var n;(n=e.parentNode)===null||n===void 0||n.removeChild(e)};e||(e=document.createElement("input"),e.id="_capacitor-camera-input",e.type="file",e.hidden=!0,document.body.appendChild(e),e.addEventListener("change",n=>{const c=e.files[0];let s="jpeg";if(c.type==="image/png"?s="png":c.type==="image/gif"&&(s="gif"),t.resultType==="dataUrl"||t.resultType==="base64"){const l=new FileReader;l.addEventListener("load",()=>{if(t.resultType==="dataUrl")i({dataUrl:l.result,format:s});else if(t.resultType==="base64"){const p=l.result.split(",")[1];i({base64String:p,format:s})}r()}),l.readAsDataURL(c)}else i({webPath:URL.createObjectURL(c),format:s}),r()}),e.addEventListener("cancel",n=>{a(new m("User cancelled photos app")),r()})),e.accept="image/*",e.capture=!0,t.source===o.Photos||t.source===o.Prompt?e.removeAttribute("capture"):t.direction===d.Front?e.capture="user":t.direction===d.Rear&&(e.capture="environment"),e.click()}multipleFileInputExperience(t,i){let a=document.querySelector("#_capacitor-camera-input-multiple");const e=()=>{var r;(r=a.parentNode)===null||r===void 0||r.removeChild(a)};a||(a=document.createElement("input"),a.id="_capacitor-camera-input-multiple",a.type="file",a.hidden=!0,a.multiple=!0,document.body.appendChild(a),a.addEventListener("change",r=>{const n=[];for(let c=0;c<a.files.length;c++){const s=a.files[c];let l="jpeg";s.type==="image/png"?l="png":s.type==="image/gif"&&(l="gif"),n.push({webPath:URL.createObjectURL(s),format:l})}t({photos:n}),e()}),a.addEventListener("cancel",r=>{i(new m("User cancelled photos app")),e()})),a.accept="image/*",a.click()}_getCameraPhoto(t,i){return new Promise((a,e)=>{const r=new FileReader,n=t.type.split("/")[1];i.resultType==="uri"?a({webPath:URL.createObjectURL(t),format:n,saved:!1}):(r.readAsDataURL(t),r.onloadend=()=>{const c=r.result;i.resultType==="dataUrl"?a({dataUrl:c,format:n,saved:!1}):a({base64String:c.split(",")[1],format:n,saved:!1})},r.onerror=c=>{e(c)})})}async checkPermissions(){if(typeof navigator>"u"||!navigator.permissions)throw this.unavailable("Permissions API not available in this browser");try{return{camera:(await window.navigator.permissions.query({name:"camera"})).state,photos:"granted"}}catch(t){throw this.unavailable("Camera permissions are not available in this browser")}}async requestPermissions(){throw this.unimplemented("Not implemented on web.")}async pickLimitedLibraryPhotos(){throw this.unavailable("Not implemented on web.")}async getLimitedLibraryPhotos(){throw this.unavailable("Not implemented on web.")}}const y=new h;export{y as Camera,h as CameraWeb};
