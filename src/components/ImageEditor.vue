<template>
  <b-modal no-close-on-backdrop id="imageCroppperModal" @hide="hide" v-model="isOpen" :title="$t('image.cropper')" size="lg" class="croppModal">
    <div style="position: relative">
      <img ref="imageRef" id="imageRef" class="d-none" src="https://trator-laravel-images.s3.eu-central-1.amazonaws.com/coozin/uploads/original/foods/l79v5C8Xap7gDQIHzouxARSabJdPnPEeSTIe8oSB.jpeg" width="1920px" height="1080px">
      <div class="image_progress">
        <b-progress v-if="uploading.show" :value="uploading.percent" :max="100" show-progress animated></b-progress>
      </div>
      <div class="toolbar" v-if="img">
        <span class="simple-icon-magnifier-add icon font-weight-medium" @click="$refs.cropper.zoom(2)"></span>
        <span class="simple-icon-magnifier-remove icon font-weight-medium" @click="$refs.cropper.zoom(0.5)"></span>
        <span class="iconsminds-left-1 icon font-weight-medium" @click="$refs.cropper.rotate(-90)"></span>
        <span class="iconsminds-right-1 icon font-weight-medium" @click="$refs.cropper.rotate(90)"></span>
        <span class="iconsminds-view-width icon font-weight-medium" @click="$refs.cropper.flip(true)"></span>
        <span class="iconsminds-view-height icon font-weight-medium" @click="$refs.cropper.flip(false, true)"></span>
        <span class="simple-icon-size-actual icon font-weight-medium" @click="center"></span>
        <span class="simple-icon-size-fullscreen icon font-weight-medium" @click="full"></span>
      </div>
      <div v-if="!img" class="crop_placeholder">
        <img :src="image" alt="">
      </div>
      <cropper
        v-if="img"
        class="cropper"
        ref="cropper"
        :src="img"
        :auto-zoom="true"
        :stencil-size="settings.stencil.size"
        image-restriction="stencil"
        :stencil-props="settings.stencil.props"
        @change="change"
      />
    </div>
    <template #modal-footer>
      <div style="display: flex; justify-content: space-between; width: 100%">
        <b-button variant="outline-primary" @click="$refs.file.click()"><span class="iconsminds-upload mr-2"></span>{{ $t('upload') }}</b-button>
        <div style="display: flex">
          <b-button class="mr-2" variant="danger default" @click="hide">{{ $t('cancel') }}</b-button>
          <b-button class="mr-2" v-if="img" variant="danger default" @click="img = null">{{ $t('clear') }}</b-button>
          <b-button variant="secondary default" v-if="img" @click="uploadImage">{{ $t('save') }}</b-button>
        </div>
      </div>
    </template>
    <input type="file" ref="file" accept="image/*" style="display: none" @change="loadImage">
  </b-modal>
</template>

<script>
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import image from '../assets/svg/image.svg'
import { mapGetters } from "vuex";
import 'vue-advanced-cropper/dist/style.css';
import store from "../store";
export default {
  name: "ImageEditor",
  components: {
    Cropper, CircleStencil
  },
  data () {
    return {
      image: image,
      img: null,
      media: null,
      loadedImage: null,
      media_id: null,
      media_type: null,
      type: null,
      isOpen: false,
      settings: {
        stencil: {
          size: {
            width: 1920,
            height: 1080
          },
          props: {
            aspectRatio: 4/3,
            movable: false
          }
        },
        restriction: 'stencil'
      },
    }
  },
  computed: {
    ...mapGetters(['uploading'])
  },
  mounted() {
  },
  methods: {
    open (media_type, type, id, media) {
      // this.loadedImage = url
      this.media_type = media_type
      this.type = type
      this.media_id = id
      this.media = media
      if (type === 'avatar') {
        this.settings.stencil.size = {
          width: 1080,
          height: 1080
        }
        this.settings.stencil.props = {
          aspectRatio: 1
        }
      }
      if (type === 'patent')  {
        this.settings.stencil.size = {
          width: 1080,
          height: 1500
        }
        this.settings.stencil.props = {
          aspectRatio: 18/25
        }
      }
      if (type === 'passport') {
        this.settings.stencil.size = {
          width: 840,
          height: 1080
        }
        this.settings.stencil.props.aspectRatio = 7/10
        // this.settings.stencil.props = {
        //   aspectRatio: 7/10
        // }
      }
      if (type === 'banner') {
        this.settings.stencil.size = {
          width: 1232,
          height: 296
        }
        this.settings.stencil.props.aspectRatio = 154/37
        // this.settings.stencil.props = {
        //   aspectRatio: 81/23
        // }
      }
      if (type === 'image') {
        this.settings.stencil.size = {
          width: 1920,
          height: 1080
        }
        this.settings.stencil.props.aspectRatio = 16/9
      }
      this.isOpen = true
      // setTimeout(() => {
      //   this.imageGet()
      // }, 100)
    },
    // imageGet () {
    //   let _img = document.getElementById('imageRef')
    //   // var _img = this.$refs.imageRef
    //   console.log(_img)
    //   let canvas = document.createElement("canvas")
    //   canvas.width = _img.width
    //   canvas.height = _img.height
    //   let ctx = canvas.getContext("2d")
    //   ctx.drawImage(_img, 0, 0)
    //   let dataURL = canvas.toDataURL("image/jpg", 1.0)
    //   let baseee = dataURL.replace(/^data:image\/(png|jpg);base64,/, "")
    //   console.log(baseee)
    // },
    clear () {
      this.media = null
      this.img = null
      this.media_id = null
      this.media_type = null
      this.type = null
    },
    hide () {
      this.isOpen = false
      this.clear()
    },
    uploaderType (data) {
      if (this.media) {
        this.$store.dispatch('updateMedia', {
          id: this.media.id,
          data: {
            model: this.media_type,
            ...data
          }
        }).then(res => {
          this.hide()
          this.$store.dispatch('uploadingAction', {
            show: false,
            percent: 0
          })
          this.$emit('loaded', res)
        })
      } else {
        this.$store.dispatch('uploadMedia', {
          type: this.media_type,
          data: data
        }).then(res => {
          this.hide()
          this.$store.dispatch('uploadingAction', {
            show: false,
            percent: 0
          })
          this.$emit('loaded', res)
        })
      }
    },
    uploadImage() {
      const { canvas } = this.$refs.cropper.getResult();
      if (canvas) {
        const form = new FormData();
        canvas.toBlob(blob => {
          form.append('type', this.type)
          form.append('mediable_id', this.media_id)
          form.append('file', blob);
          this.uploaderType(form)
        }, 'image/jpeg');
      }
    },
    center() {
      this.$refs.cropper.setCoordinates(({ coordinates, imageSize }) => ({
        left: imageSize.width/2 - coordinates.width/2,
        top: imageSize.height/2 - coordinates.height/2
      }))
    },
    full () {
      this.$refs.cropper.setCoordinates(({ coordinates, imageSize }) => ({
        width: imageSize.width,
        height: imageSize.height
      }))
    },
    loadImage (e) {
      const { files } = e.target
      console.log(files)
      if (files && files[0]) {
        const blob = URL.createObjectURL(files[0]);
        this.img = blob
      }
    },
    change (e) {
      console.log(e)
      // image url
      // console.log(e.canvas.toDataURL())
    },
    zoom (val) {
      console.log(val)
      console.log(this.$refs)
      setTimeout(() => {
        this.$refs.cropper.zoom(val)
      }, 1)
    }
  }
}
</script>

<style lang="scss">
@import '~vue-advanced-cropper/dist/theme.classic.scss';
.preview {
  border: dashed 1px rgba(255,255,255, 0.25);
}
#imageCroppperModal {
  .modal-body {
    padding: 0 !important;
  }
}
.image_progress {
  .progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 5;
    background-color: rgba(243, 243, 243, 0.1);
    height: 15px;
  }
}
.toolbar {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-flow: column;
  margin-top: 5px;
  z-index: 5;
  align-content: space-evenly;
  .icon {
    color: white;
    text-align: center;
    font-size: 20px;
    margin: 2px 0;
    padding: 12px 15px;
    cursor: pointer;
    border-radius: 5px;
    transition: all, .3s;
  }
  .icon:hover {
    text-shadow: 5px 5px 5px #ffffff,
    -2px 1px 10px #ffffff;
    border-radius: 5px;
  }
}
.cropper {
  height: 450px;
}
.crop_placeholder {
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
