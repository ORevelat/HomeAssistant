import{s as e,cP as a,y as s,cS as t,bj as i,bk as r,bl as m,bn as o}from"./card-67eaecc9.js";import"./image-9b3561f9.js";import{getStateObjOrDispatchError as n}from"./live-cf2512fe.js";import"./media-layout-8e0c974f.js";import"./lazyload-7e37567e.js";let u=class extends e{constructor(){super(...arguments),this._refImage=a()}async play(){await(this._refImage.value?.play())}async pause(){await(this._refImage.value?.pause())}async mute(){await(this._refImage.value?.mute())}async unmute(){await(this._refImage.value?.unmute())}isMuted(){return!!this._refImage.value?.isMuted()}async seek(e){await(this._refImage.value?.seek(e))}async setControls(e){await(this._refImage.value?.setControls(e))}isPaused(){return this._refImage.value?.isPaused()??!0}render(){if(this.hass&&this.cameraConfig)return n(this,this.hass,this.cameraConfig),s` <frigate-card-image
      ${t(this._refImage)}
      .imageConfig=${{mode:this.cameraConfig.image.url?"url":"camera",refresh_seconds:this.cameraConfig.image.refresh_seconds,url:this.cameraConfig.image.url,zoomable:!1}}
      .hass=${this.hass}
      .cameraConfig=${this.cameraConfig}
    >
    </frigate-card-image>`}static get styles(){return i(":host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}")}};r([m({attribute:!1})],u.prototype,"hass",void 0),r([m({attribute:!1})],u.prototype,"cameraConfig",void 0),u=r([o("frigate-card-live-image")],u);export{u as FrigateCardLiveImage};
