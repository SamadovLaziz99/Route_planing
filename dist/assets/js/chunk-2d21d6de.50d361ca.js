(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21d6de"],{d0ea:function(n,e,t){"use strict";t.d(e,"a",(function(){return x}));var i={LEFT:37,RIGHT:39,ESC:27},a={props:{images:{type:Array,default:function(){return[]}},index:{type:Number,default:1},disableScroll:{type:Boolean,default:!1},background:{type:String,default:"rgba(0, 0, 0, 0.8)"},interfaceColor:{type:String,default:"rgba(255, 255, 255, 0.8)"}},data:function(){return{currentIndex:this.index,isImageLoaded:!1,bodyOverflowStyle:"",touch:{count:0,x:0,y:0,multitouch:!1,flag:!1}}},computed:{formattedImages:function(){return this.images.map((function(n){return"string"===typeof n?{url:n}:n}))}},watch:{index:function(n){document&&(this.currentIndex=n,this.disableScroll&&"number"===typeof n?document.body.style.overflow="hidden":this.disableScroll&&!n&&(document.body.style.overflow=this.bodyOverflowStyle))},currentIndex:function(n){this.setImageLoaded(n)}},mounted:function(){document&&(this.bodyOverflowStyle=document.body.style.overflow,this.bindEvents())},beforeDestroy:function(){document&&(this.disableScroll&&(document.body.style.overflow=this.bodyOverflowStyle),this.unbindEvents())},methods:{close:function(){this.$emit("close")},prev:function(){0!==this.currentIndex&&(this.currentIndex-=1,this.$emit("slide",{index:this.currentIndex}))},next:function(){this.currentIndex!==this.images.length-1&&(this.currentIndex+=1,this.$emit("slide",{index:this.currentIndex}))},imageLoaded:function(n,e){var t=n.target;t.classList.add("loaded"),e===this.currentIndex&&this.setImageLoaded(e)},getImageElByIndex:function(n){var e=this.$refs["lg-img-"+n]||[];return e[0]},setImageLoaded:function(n){var e=this.getImageElByIndex(n);this.isImageLoaded=!!e&&e.classList.contains("loaded")},shouldPreload:function(n){var e=this.getImageElByIndex(n)||{},t=e.src;return!!t||n===this.currentIndex||n===this.currentIndex-1||n===this.currentIndex+1},bindEvents:function(){document.addEventListener("keydown",this.keyDownHandler,!1)},unbindEvents:function(){document.removeEventListener("keydown",this.keyDownHandler,!1)},touchstartHandler:function(n){this.touch.count+=1,this.touch.count>1&&(this.touch.multitouch=!0),this.touch.x=n.changedTouches[0].pageX,this.touch.y=n.changedTouches[0].pageY},touchmoveHandler:function(n){if(!this.touch.flag&&!this.touch.multitouch){var e=n.touches[0]||n.changedTouches[0];e.pageX-this.touch.x>40?(this.touch.flag=!0,this.prev()):e.pageX-this.touch.x<-40&&(this.touch.flag=!0,this.next())}},touchendHandler:function(){this.touch.count-=1,this.touch.count<=0&&(this.touch.multitouch=!1),this.touch.flag=!1},keyDownHandler:function(n){switch(n.keyCode){case i.LEFT:this.prev();break;case i.RIGHT:this.next();break;case i.ESC:this.close();break;default:break}}}};function o(n,e,t,i,a,o,l,r,s,A){"boolean"!==typeof l&&(s=r,r=l,l=!1);var d,c="function"===typeof t?t.options:t;if(n&&n.render&&(c.render=n.render,c.staticRenderFns=n.staticRenderFns,c._compiled=!0,a&&(c.functional=!0)),i&&(c._scopeId=i),o?(d=function(n){n=n||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,n||"undefined"===typeof __VUE_SSR_CONTEXT__||(n=__VUE_SSR_CONTEXT__),e&&e.call(this,s(n)),n&&n._registeredComponents&&n._registeredComponents.add(o)},c._ssrRegister=d):e&&(d=l?function(){e.call(this,A(this.$root.$options.shadowRoot))}:function(n){e.call(this,r(n))}),d)if(c.functional){var h=c.render;c.render=function(n,e){return d.call(e),h(n,e)}}else{var g=c.beforeCreate;c.beforeCreate=g?[].concat(g,d):[d]}return t}var l=o,r="undefined"!==typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());function s(n){return function(n,e){return c(n,e)}}var A=document.head||document.getElementsByTagName("head")[0],d={};function c(n,e){var t=r?e.media||"default":n,i=d[t]||(d[t]={ids:new Set,styles:[]});if(!i.ids.has(n)){i.ids.add(n);var a=e.source;if(e.map&&(a+="\n/*# sourceURL="+e.map.sources[0]+" */",a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e.map))))+" */"),i.element||(i.element=document.createElement("style"),i.element.type="text/css",e.media&&i.element.setAttribute("media",e.media),A.appendChild(i.element)),"styleSheet"in i.element)i.styles.push(a),i.element.styleSheet.cssText=i.styles.filter(Boolean).join("\n");else{var o=i.ids.size-1,l=document.createTextNode(a),s=i.element.childNodes;s[o]&&i.element.removeChild(s[o]),s.length?i.element.insertBefore(l,s[o]):i.element.appendChild(l)}}}var h=s,g=a,u=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("transition",{attrs:{name:"fade"}},["number"===typeof n.index?t("div",{staticClass:"light-gallery",on:{touchstart:n.touchstartHandler,touchmove:n.touchmoveHandler,touchend:n.touchendHandler}},[t("div",{staticClass:"light-gallery__modal",style:"background: "+n.background},[t("div",{class:["light-gallery__spinner",!n.isImageLoaded||"hide"]},[t("div",{staticClass:"light-gallery__dot",style:"border-color: "+n.interfaceColor}),n._v(" "),t("div",{staticClass:"light-gallery__dot",style:"border-color: "+n.interfaceColor}),n._v(" "),t("div",{staticClass:"light-gallery__dot",style:"border-color: "+n.interfaceColor})]),n._v(" "),t("div",{staticClass:"light-gallery__container"},[t("ul",{staticClass:"light-gallery__content"},n._l(n.formattedImages,(function(e,i){return t("li",{key:i,staticClass:"light-gallery__image-container",style:"transform: translate3d("+-100*n.currentIndex+"%, 0px, 0px);"},[t("div",{staticClass:"light-gallery__image"},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.title&&n.isImageLoaded,expression:"image.title && isImageLoaded"}],staticClass:"light-gallery__text",style:"background: "+n.background+"; color: "+n.interfaceColor},[n._v("\n                "+n._s(e.title)+"\n              ")]),n._v(" "),t("img",{ref:"lg-img-"+i,refInFor:!0,attrs:{src:!!n.shouldPreload(i)&&e.url},on:{load:function(e){return n.imageLoaded(e,i)}}})])])})),0)]),n._v(" "),n.currentIndex>0?t("button",{staticClass:"light-gallery__prev",style:"background: "+n.background,on:{click:function(e){return n.prev()}}},[t("svg",{attrs:{width:"25",height:"40",viewBox:"0 0 25 40"}},[t("polyline",{attrs:{points:"19 5 5 20 19 35","stroke-width":"3","stroke-linecap":"butt",fill:"none","stroke-linejoin":"round",stroke:n.interfaceColor}})])]):n._e(),n._v(" "),n.currentIndex+1<n.images.length?t("button",{staticClass:"light-gallery__next",style:"background: "+n.background,on:{click:function(e){return n.next()}}},[t("svg",{attrs:{width:"25",height:"40",viewBox:"0 0 25 40"}},[t("polyline",{attrs:{points:"6 5 20 20 6 35","stroke-width":"3","stroke-linecap":"butt",fill:"none","stroke-linejoin":"round",stroke:n.interfaceColor}})])]):n._e(),n._v(" "),t("button",{staticClass:"light-gallery__close",style:"background: "+n.background,on:{click:function(e){return n.close()}}},[t("svg",{attrs:{width:"30",height:"30"}},[t("g",{attrs:{"stroke-width":"3",stroke:n.interfaceColor}},[t("line",{attrs:{x1:"5",y1:"5",x2:"25",y2:"25"}}),n._v(" "),t("line",{attrs:{x1:"5",y1:"25",x2:"25",y2:"5"}})])])])])]):n._e()])},m=[];u._withStripped=!0;var p=function(n){n&&n("data-v-2951e615_0",{source:".light-gallery__modal[data-v-2951e615] {\n  position: fixed;\n  display: block;\n  z-index: 1001;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n.light-gallery__content[data-v-2951e615] {\n  height: 100%;\n  width: 100%;\n  white-space: nowrap;\n  padding: 0;\n  margin: 0;\n}\n.light-gallery__container[data-v-2951e615] {\n  position: absolute;\n  z-index: 1002;\n  display: block;\n  width: 100%;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  text-align: center;\n}\n.light-gallery__image-container[data-v-2951e615] {\n  display: inline-table;\n  vertical-align: middle;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  text-align: center;\n  transition: left .4s ease, transform .4s ease, -webkit-transform .4s ease;\n}\n.light-gallery__image[data-v-2951e615] {\n  display: inline-block;\n  position: relative;\n  margin: 0 auto;\n  max-width: 100%;\n  max-height: 100vh;\n}\n.light-gallery__image img[data-v-2951e615] {\n  max-width: 100%;\n  max-height: 100vh;\n  opacity: 0;\n  transition: opacity .2s;\n}\n.light-gallery__image img.loaded[data-v-2951e615] {\n  opacity: 1;\n}\n.light-gallery__text[data-v-2951e615] {\n  position: absolute;\n  z-index: 1000;\n  bottom: 0;\n  display: block;\n  margin: 0 auto;\n  padding: 12px 30px;\n  width: 100%;\n  box-sizing: border-box;\n}\n.light-gallery__next[data-v-2951e615], .light-gallery__prev[data-v-2951e615], .light-gallery__close[data-v-2951e615] {\n  position: absolute;\n  z-index: 1002;\n  display: block;\n  background: transparent;\n  border: 0;\n  line-height: 0;\n  outline: none;\n  padding: 7px;\n  cursor: pointer;\n}\n.light-gallery__next[data-v-2951e615] {\n  top: 50%;\n  transform: translate(0, -50%);\n  right: 1.5%;\n  vertical-align: middle;\n}\n.light-gallery__prev[data-v-2951e615] {\n  top: 50%;\n  transform: translate(0, -50%);\n  left: 1.5%;\n}\n.light-gallery__close[data-v-2951e615] {\n  right: 0;\n  padding: 12px;\n}\n.light-gallery__spinner[data-v-2951e615] {\n  position: absolute;\n  z-index: 1003;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  margin: 0 auto;\n  display: block;\n  height: 15px;\n  width: auto;\n  box-sizing: border-box;\n  text-align: center;\n}\n.light-gallery__spinner.hide[data-v-2951e615] {\n  display: none;\n}\n.light-gallery__dot[data-v-2951e615] {\n  float: left;\n  margin: 0 calc(15px / 2);\n  width: 15px;\n  height: 15px;\n  border: calc(15px / 5) solid rgba(255, 255, 255, 0.8);\n  border-radius: 50%;\n  transform: scale(0);\n  box-sizing: border-box;\n  animation: spinner-animation-data-v-2951e615 1000ms ease infinite 0ms;\n}\n.light-gallery__dot[data-v-2951e615]:nth-child(1) {\n  animation-delay: calc(300ms * 1);\n}\n.light-gallery__dot[data-v-2951e615]:nth-child(2) {\n  animation-delay: calc(300ms * 2);\n}\n.light-gallery__dot[data-v-2951e615]:nth-child(3) {\n  animation-delay: calc(300ms * 3);\n}\n.fade-enter-active[data-v-2951e615], .fade-leave-active[data-v-2951e615] {\n  position: fixed;\n  z-index: 1000;\n  transition: opacity .2s;\n}\n.fade-enter[data-v-2951e615], .fade-leave-to[data-v-2951e615] {\n  position: fixed;\n  opacity: 0;\n  z-index: 1000;\n}\n@keyframes spinner-animation-data-v-2951e615 {\n50% {\n    transform: scale(1);\n    opacity: 1;\n}\n100% {\n    opacity: 0;\n}\n}\n\n/*# sourceMappingURL=light-gallery.vue.map */",map:{version:3,sources:["/home/pere.monfort/code/vue-light-gallery/src/light-gallery.vue","light-gallery.vue"],names:[],mappings:"AAgTA;EACA,eAAA;EACA,cAAA;EACA,aAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,gBAAA;AAAA;AAGA;EACA,YAAA;EACA,WAAA;EACA,mBAAA;EACA,UAAA;EACA,SAAA;AAAA;AAGA;EACA,kBAAA;EACA,aAAA;EACA,cAAA;EACA,WAAA;EACA,QAAA;EACA,SAAA;EACA,gCAAA;EACA,kBAAA;AAAA;AAGA;EACA,qBAAA;EACA,sBAAA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,yEAAA;AAAA;AAGA;EAEA,qBAAA;EACA,kBAAA;EACA,cAAA;EACA,eAAA;EACA,iBAAA;AAAA;AANA;EAYA,eAAA;EACA,iBAAA;EACA,UAAA;EACA,uBAAA;AAAA;AAfA;EAmBA,UAAA;AAAA;AAMA;EACA,kBAAA;EACA,aAAA;EACA,SAAA;EACA,cAAA;EACA,cAAA;EACA,kBAAA;EACA,WAAA;EACA,sBAAA;AAAA;AAGA;EAGA,kBAAA;EACA,aAAA;EACA,cAAA;EACA,uBAAA;EACA,SAAA;EACA,cAAA;EACA,aAAA;EACA,YAAA;EACA,eAAA;AAAA;AAGA;EACA,QAAA;EACA,6BAAA;EACA,WAAA;EACA,sBAAA;AAAA;AAGA;EACA,QAAA;EACA,6BAAA;EACA,UAAA;AAAA;AAGA;EACA,QAAA;EACA,aAAA;AAAA;AAGA;EAEA,kBAAA;EACA,aAAA;EACA,QAAA;EACA,SAAA;EACA,gCAAA;EACA,cAAA;EACA,cAAA;EACA,YAAA;EACA,WAAA;EACA,sBAAA;EACA,kBAAA;AAAA;AAZA;EAgBA,aAAA;AAAA;AAIA;EAEA,WAAA;EACA,wBAAA;EACA,WAAA;EACA,YAAA;EACA,qDAAA;EACA,kBAAA;EACA,mBAAA;EACA,sBAAA;EACA,qEAAA;AAAA;AAVA;EAcA,gCAAA;AAAA;AAdA;EAkBA,gCAAA;AAAA;AAlBA;EAsBA,gCAAA;AAAA;AAKA;EACA,eAAA;EACA,aAAA;EACA,uBAAA;AAAA;AAGA;EACA,eAAA;EACA,UAAA;EACA,aAAA;AAAA;AAGA;AACA;IACA,mBAAA;IACA,UAAA;AAAA;AAEA;IACA,UAAA;AAAA;AAAA;;AChVA,4CAA4C",file:"light-gallery.vue",sourcesContent:['<template>\n  <transition name="fade">\n    <div\n      v-if="typeof index === \'number\'"\n      class="light-gallery"\n      @touchstart="touchstartHandler"\n      @touchmove="touchmoveHandler"\n      @touchend="touchendHandler"\n    >\n      <div\n        class="light-gallery__modal"\n        :style="`background: ${background}`"\n      >\n        <div\n          :class="[\'light-gallery__spinner\', !isImageLoaded || \'hide\']"\n        >\n          <div\n            class="light-gallery__dot"\n            :style="`border-color: ${interfaceColor}`"\n          />\n          <div\n            class="light-gallery__dot"\n            :style="`border-color: ${interfaceColor}`"\n          />\n          <div\n            class="light-gallery__dot"\n            :style="`border-color: ${interfaceColor}`"\n          />\n        </div>\n        <div class="light-gallery__container">\n          <ul class="light-gallery__content">\n            <li\n              v-for="(image, imageIndex) in formattedImages"\n              :key="imageIndex"\n              :style="`transform: translate3d(${currentIndex * -100}%, 0px, 0px);`"\n              class="light-gallery__image-container"\n            >\n              <div class="light-gallery__image">\n                <div\n                  v-show="image.title && isImageLoaded"\n                  class="light-gallery__text"\n                  :style="`background: ${background}; color: ${interfaceColor}`"\n                >\n                  {{ image.title }}\n                </div>\n                <img\n                  :ref="`lg-img-${imageIndex}`"\n                  :src="shouldPreload(imageIndex) ? image.url : false"\n                  @load="imageLoaded($event, imageIndex)"\n                >\n              </div>\n            </li>\n          </ul>\n        </div>\n        <button\n          v-if="currentIndex > 0"\n          class="light-gallery__prev"\n          :style="`background: ${background}`"\n          @click="prev()"\n        >\n          <svg\n            width="25"\n            height="40"\n            viewBox="0 0 25 40"\n          >\n            <polyline\n              points="19 5 5 20 19 35"\n              stroke-width="3"\n              stroke-linecap="butt"\n              fill="none"\n              stroke-linejoin="round"\n              :stroke="interfaceColor"\n            />\n          </svg>\n        </button>\n        <button\n          v-if="currentIndex + 1 < images.length"\n          class="light-gallery__next"\n          :style="`background: ${background}`"\n          @click="next()"\n        >\n          <svg\n            width="25"\n            height="40"\n            viewBox="0 0 25 40"\n          >\n            <polyline\n              points="6 5 20 20 6 35"\n              stroke-width="3"\n              stroke-linecap="butt"\n              fill="none"\n              stroke-linejoin="round"\n              :stroke="interfaceColor"\n            />\n          </svg>\n        </button>\n        <button\n          class="light-gallery__close"\n          :style="`background: ${background}`"\n          @click="close()"\n        >\n          <svg\n            width="30"\n            height="30"\n          >\n            <g\n              stroke-width="3"\n              :stroke="interfaceColor"\n            >\n              <line\n                x1="5"\n                y1="5"\n                x2="25"\n                y2="25"\n              />\n              <line\n                x1="5"\n                y1="25"\n                x2="25"\n                y2="5"\n              />\n            </g>\n          </svg>\n        </button>\n      </div>\n    </div>\n  </transition>\n</template>\n\n<script>\nconst keyMap = {\n  LEFT: 37,\n  RIGHT: 39,\n  ESC: 27,\n};\n\nexport default {\n  props: {\n    images: {\n      type: Array,\n      default: () => [],\n    },\n    index: {\n      type: Number,\n      default: 1,\n    },\n    disableScroll: {\n      type: Boolean,\n      default: false,\n    },\n    background: {\n      type: String,\n      default: \'rgba(0, 0, 0, 0.8)\',\n    },\n    interfaceColor: {\n      type: String,\n      default: \'rgba(255, 255, 255, 0.8)\',\n    },\n  },\n  data() {\n    return {\n      currentIndex: this.index,\n      isImageLoaded: false,\n      bodyOverflowStyle: \'\',\n      touch: {\n        count: 0,\n        x: 0,\n        y: 0,\n        multitouch: false,\n        flag: false,\n      },\n    };\n  },\n  computed: {\n    formattedImages() {\n      return this.images.map(image => (typeof image === \'string\'\n        ? { url: image } : image\n      ));\n    },\n  },\n  watch: {\n    index(val) {\n      if (!document) return;\n\n      this.currentIndex = val;\n\n      if (this.disableScroll && typeof val === \'number\') {\n        document.body.style.overflow = \'hidden\';\n      } else if (this.disableScroll && !val) {\n        document.body.style.overflow = this.bodyOverflowStyle;\n      }\n    },\n    currentIndex(val) {\n      this.setImageLoaded(val);\n    },\n  },\n  mounted() {\n    if (!document) return;\n\n    this.bodyOverflowStyle = document.body.style.overflow;\n    this.bindEvents();\n  },\n  beforeDestroy() {\n    if (!document) return;\n\n    if (this.disableScroll) {\n      document.body.style.overflow = this.bodyOverflowStyle;\n    }\n    this.unbindEvents();\n  },\n  methods: {\n    close() {\n      this.$emit(\'close\');\n    },\n    prev() {\n      if (this.currentIndex === 0) return;\n      this.currentIndex -= 1;\n      this.$emit(\'slide\', { index: this.currentIndex });\n    },\n    next() {\n      if (this.currentIndex === this.images.length - 1) return;\n      this.currentIndex += 1;\n      this.$emit(\'slide\', { index: this.currentIndex });\n    },\n    imageLoaded($event, imageIndex) {\n      const { target } = $event;\n      target.classList.add(\'loaded\');\n\n      if (imageIndex === this.currentIndex) {\n        this.setImageLoaded(imageIndex);\n      }\n    },\n    getImageElByIndex(index) {\n      const elements = this.$refs[`lg-img-${index}`] || [];\n      return elements[0];\n    },\n    setImageLoaded(index) {\n      const el = this.getImageElByIndex(index);\n      this.isImageLoaded = !el ? false : el.classList.contains(\'loaded\');\n    },\n    shouldPreload(index) {\n      const el = this.getImageElByIndex(index) || {};\n      const { src } = el;\n\n      return !!src\n       || index === this.currentIndex\n       || index === this.currentIndex - 1\n       || index === this.currentIndex + 1;\n    },\n    bindEvents() {\n      document.addEventListener(\'keydown\', this.keyDownHandler, false);\n    },\n    unbindEvents() {\n      document.removeEventListener(\'keydown\', this.keyDownHandler, false);\n    },\n    touchstartHandler(event) {\n      this.touch.count += 1;\n      if (this.touch.count > 1) {\n        this.touch.multitouch = true;\n      }\n      this.touch.x = event.changedTouches[0].pageX;\n      this.touch.y = event.changedTouches[0].pageY;\n    },\n    touchmoveHandler(event) {\n      if (this.touch.flag || this.touch.multitouch) return;\n\n      const touchEvent = event.touches[0] || event.changedTouches[0];\n\n      if (touchEvent.pageX - this.touch.x > 40) {\n        this.touch.flag = true;\n        this.prev();\n      } else if (touchEvent.pageX - this.touch.x < -40) {\n        this.touch.flag = true;\n        this.next();\n      }\n    },\n    touchendHandler() {\n      this.touch.count -= 1;\n      if (this.touch.count <= 0) {\n        this.touch.multitouch = false;\n      }\n      this.touch.flag = false;\n    },\n    keyDownHandler(event) {\n      switch (event.keyCode) {\n        case keyMap.LEFT:\n          this.prev();\n          break;\n        case keyMap.RIGHT:\n          this.next();\n          break;\n        case keyMap.ESC:\n          this.close();\n          break;\n        default:\n          break;\n      }\n    },\n  },\n};\n<\/script>\n\n<style lang="scss" scoped>\n.light-gallery {\n  &__modal {\n    position: fixed;\n    display: block;\n    z-index: 1001;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n  }\n\n  &__content {\n    height: 100%;\n    width: 100%;\n    white-space: nowrap;\n    padding: 0;\n    margin: 0;\n  }\n\n  &__container {\n    position: absolute;\n    z-index: 1002;\n    display: block;\n    width: 100%;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    text-align: center;\n  }\n\n  &__image-container {\n    display: inline-table;\n    vertical-align: middle;\n    position: relative;\n    width: 100%;\n    height: 100%;\n    text-align: center;\n    transition: left .4s ease, transform .4s ease, -webkit-transform .4s ease;\n  }\n\n  &__image {\n    & {\n      display: inline-block;\n      position: relative;\n      margin: 0 auto;\n      max-width: 100%;\n      max-height: 100vh;\n      // opacity: 0;\n    }\n\n    & img {\n      & {\n        max-width: 100%;\n        max-height: 100vh;\n        opacity: 0;\n        transition: opacity .2s;\n      }\n\n      &.loaded{\n        opacity: 1;\n      }\n    }\n\n  }\n\n  &__text {\n    position: absolute;\n    z-index: 1000;\n    bottom: 0;\n    display: block;\n    margin: 0 auto;\n    padding: 12px 30px;\n    width: 100%;\n    box-sizing: border-box;\n  }\n\n  &__next,\n  &__prev,\n  &__close {\n    position: absolute;\n    z-index: 1002;\n    display: block;\n    background: transparent;\n    border: 0;\n    line-height: 0;\n    outline: none;\n    padding: 7px;\n    cursor: pointer;\n  }\n\n  &__next {\n    top: 50%;\n    transform: translate(0, -50%);\n    right: 1.5%;\n    vertical-align: middle;\n  }\n\n  &__prev {\n    top: 50%;\n    transform: translate(0, -50%);\n    left: 1.5%;\n  }\n\n  &__close {\n    right: 0;\n    padding: 12px;\n  }\n\n  &__spinner {\n    & {\n      position: absolute;\n      z-index: 1003;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      margin: 0 auto;\n      display: block;\n      height: 15px;\n      width: auto;\n      box-sizing: border-box;\n      text-align: center;\n    }\n\n    &.hide {\n      display: none;\n    }\n  }\n\n  &__dot {\n    & {\n      float: left;\n      margin: 0 calc(15px / 2);\n      width: 15px;\n      height: 15px;\n      border: calc(15px / 5) solid rgba(255, 255, 255, 0.8);\n      border-radius: 50%;\n      transform: scale(0);\n      box-sizing: border-box;\n      animation: spinner-animation 1000ms ease infinite 0ms;\n    }\n\n    &:nth-child(1) {\n      animation-delay: calc(300ms * 1);\n    }\n\n    &:nth-child(2) {\n      animation-delay: calc(300ms * 2);\n    }\n\n    &:nth-child(3) {\n      animation-delay: calc(300ms * 3);\n    }\n  }\n}\n\n.fade-enter-active, .fade-leave-active {\n  position: fixed;\n  z-index: 1000;\n  transition: opacity .2s;\n}\n\n.fade-enter, .fade-leave-to {\n  position: fixed;\n  opacity: 0;\n  z-index: 1000;\n}\n\n@keyframes spinner-animation {\n  50% {\n    transform: scale(1);\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n</style>\n',".light-gallery__modal {\n  position: fixed;\n  display: block;\n  z-index: 1001;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n\n.light-gallery__content {\n  height: 100%;\n  width: 100%;\n  white-space: nowrap;\n  padding: 0;\n  margin: 0; }\n\n.light-gallery__container {\n  position: absolute;\n  z-index: 1002;\n  display: block;\n  width: 100%;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  text-align: center; }\n\n.light-gallery__image-container {\n  display: inline-table;\n  vertical-align: middle;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  text-align: center;\n  transition: left .4s ease, transform .4s ease, -webkit-transform .4s ease; }\n\n.light-gallery__image {\n  display: inline-block;\n  position: relative;\n  margin: 0 auto;\n  max-width: 100%;\n  max-height: 100vh; }\n\n.light-gallery__image img {\n  max-width: 100%;\n  max-height: 100vh;\n  opacity: 0;\n  transition: opacity .2s; }\n\n.light-gallery__image img.loaded {\n  opacity: 1; }\n\n.light-gallery__text {\n  position: absolute;\n  z-index: 1000;\n  bottom: 0;\n  display: block;\n  margin: 0 auto;\n  padding: 12px 30px;\n  width: 100%;\n  box-sizing: border-box; }\n\n.light-gallery__next, .light-gallery__prev, .light-gallery__close {\n  position: absolute;\n  z-index: 1002;\n  display: block;\n  background: transparent;\n  border: 0;\n  line-height: 0;\n  outline: none;\n  padding: 7px;\n  cursor: pointer; }\n\n.light-gallery__next {\n  top: 50%;\n  transform: translate(0, -50%);\n  right: 1.5%;\n  vertical-align: middle; }\n\n.light-gallery__prev {\n  top: 50%;\n  transform: translate(0, -50%);\n  left: 1.5%; }\n\n.light-gallery__close {\n  right: 0;\n  padding: 12px; }\n\n.light-gallery__spinner {\n  position: absolute;\n  z-index: 1003;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  margin: 0 auto;\n  display: block;\n  height: 15px;\n  width: auto;\n  box-sizing: border-box;\n  text-align: center; }\n\n.light-gallery__spinner.hide {\n  display: none; }\n\n.light-gallery__dot {\n  float: left;\n  margin: 0 calc(15px / 2);\n  width: 15px;\n  height: 15px;\n  border: calc(15px / 5) solid rgba(255, 255, 255, 0.8);\n  border-radius: 50%;\n  transform: scale(0);\n  box-sizing: border-box;\n  animation: spinner-animation 1000ms ease infinite 0ms; }\n\n.light-gallery__dot:nth-child(1) {\n  animation-delay: calc(300ms * 1); }\n\n.light-gallery__dot:nth-child(2) {\n  animation-delay: calc(300ms * 2); }\n\n.light-gallery__dot:nth-child(3) {\n  animation-delay: calc(300ms * 3); }\n\n.fade-enter-active, .fade-leave-active {\n  position: fixed;\n  z-index: 1000;\n  transition: opacity .2s; }\n\n.fade-enter, .fade-leave-to {\n  position: fixed;\n  opacity: 0;\n  z-index: 1000; }\n\n@keyframes spinner-animation {\n  50% {\n    transform: scale(1);\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n/*# sourceMappingURL=light-gallery.vue.map */"]},media:void 0})},y="data-v-2951e615",f=void 0,v=!1,x=l({render:u,staticRenderFns:m},p,g,y,v,f,h,void 0)}}]);