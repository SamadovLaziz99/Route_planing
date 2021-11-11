<template>
  <b-modal id="imageCroppperModal" v-model="isOpen" title="Image Cropper" size="lg">
    <cropper
      class="cropper"
      :src="img"
      :auto-zoom="true"
      :stencil-size="{
        width: 320,
        height: 320
      }"
      image-restriction="stencil"
      :stencil-props="{
        aspectRatio: 1
      }"
      @change="change"
    />
    <input type="file" ref="file" accept="image/*" style="display: none" @change="loadImage">
    <b-button @click="$refs.file.click()">Load Image</b-button>
  </b-modal>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
export default {
  name: "ImageEditor",
  components: {
    Cropper
  },
  data () {
    return {
      img: 'https://images.unsplash.com/photo-1600984575359-310ae7b6bdf2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
      isOpen: false
    }
  },
  methods: {
    open () { this.isOpen = true },
    hide () { this.isOpen = false },
    loadImage (e) {
      const { files } = e.target
      if (files && files[0]) {
        const blob = URL.createObjectURL(files[0]);
        this.img = blob
      }
    },
    change (e) {
      console.log(e)
      // image url
      // console.log(e.canvas.toDataURL())
    }
  }
}
</script>

<style>
.cropper {
  height: 450px;
  background: #DDD;
}
</style>
