<template>
  <div>
    <div class="uploader" @dragover.prevent @drop.prevent>
      <div @drop="dragFile" class="drag">
        <h6 style="margin-top: 50px">Drag and Drop upload file here</h6>
        <label for="uploader">
          <div class="button">Upload</div>
        </label>
      </div>
      <input style="display: none" id="uploader" type="file" @change="uploadFile"/>
    </div>
      <div v-if="files.length">
        <transition-group name="fade">
          <ul class="uploaded_item" v-for="(file, index) in files" :key="index + 0">
              <li v-if="file.file">
                <img :src="file.image" alt="">
                <span @click="files.splice(index, 1)" class="close-button simple-icon-close"></span>
                <div class="thumb">
                  <span class="img_name"><strong>Name: </strong>{{ file.file.name }}</span>
                  <span class="img_name"><strong>Size: </strong>{{ file.file.size }}</span>
                </div>
              </li>
          </ul>
        </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageUploadContainer",
  data() {
    return {
      imageURL: null,
      files: [],
    }
  },
  watch: {
    files(val) {
      console.log(val)
    }
  },
  methods: {
    async getBase64(img, callback) {
      const reader = new FileReader()
      await reader.addEventListener('load', (e) => callback(e, reader.result))
      await reader.readAsDataURL(img)
      return reader
    },
    // async imageParse (e) {
    //   let _img;
    //   await this.$imgUploader(e).then(res => {
    //     _img = res.image
    //   })
    //   console.log(_img)
    // },
    // iio (e) {
    //   return e
    // },
    async gene(e) {
      await this.getBase64(e, (e, image) => {
        this.imageURL = image
      })
      return this.imageURL
    },
    uploadFile(e) {
      const _files = e.target.files
      const _one = _files[0]
      this.getBase64(_one, (e, img) => {
        this.imageURL = img
      }).then(res => {
        setTimeout(() => {
          this.files.push({
            file: _one,
            image: this.imageURL
          })
        }, 100)
      })
    },
    dragFile(e) {
      const _files = e.dataTransfer.files
      const _one = _files[0]
      if (_one) {
        this.getBase64(_one, (e, img) => {
          this.imageURL = img
        }).then(res => {
          setTimeout(() => {
            this.files.push({
              file: _one,
              image: this.imageURL
            })
          }, 100)
        })
      }
    },
    dragover() {
      console.log('drag')
    },
    drop(e) {
      console.log('drop', e)
    }
  }
}
</script>

<style lang="scss">
.uploaded_item {
  background: aliceblue;
  border-radius: 10px;
  padding: 0;
  overflow: hidden;
  li {
    list-style: none;
    display: flex;
    align-items: center;
    position: relative;
    .thumb {
      display: flex;
      flex-flow: column;
    }
    img {
      margin-right: 10px;
      width: 80px;
      height: 80px;
      border-radius: 10px;
    }
    .img_name {
      font-size: 10px;
    }
    .close-button {
      position: absolute;
      right: 0;
      top: 0;
      margin: 10px;
      cursor: pointer;
      transition: all, .2s;
    }
    .close-button:hover {
      font-size: 14px;
      color: darkred;
    }
  }
}

.uploader {
  margin: 10px 0;
  outline: none;
  background: aliceblue;
  width: 100%;
  border: 3px dashed #bbbbbb;
  border-radius: 10px;

  .drag {
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;

    .button {
      background: #cb5f10;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 30px;
      font-weight: 600;
      border-radius: 15px;
      cursor: pointer;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all .5s;
  transform: translateY(0px);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
