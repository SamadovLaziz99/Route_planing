<template>
  <div>
    <div class="uploader" @dragover.prevent="dragover" @drop.prevent="drop">
      <div @drop="dragFile" class="drag">
        <h3>Drag and Drop upload file here</h3>
        <label for="uploader">
          <div class="button">Upload</div>
        </label>
      </div>
      <input style="display: none" id="uploader" type="file" multiple @change="uploadFile"/>
    </div>
    <div v-if="File.length">
      <ul v-for="(file, index) in File" :key="index">
        <li>{{file.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageUploadContainer",
  data() {
    return {
      File: []
    }
  },
  watch: {
    File (val) {
      console.log(val)
    }
  },
  methods: {
    uploadFile(e) {
      this.File = e.target.files;
    },
    dragFile(e) {
      console.log(e)
      this.File = e.dataTransfer.files;
    },
    dragover() {
      console.log('drag')
    },
    drop () {
      console.log('drop')
    }
  }
}
</script>

<style lang="scss">
.uploader {
  margin: 10px 0;
  outline: none;
  background: aliceblue;
  width: 100%;
  border: 5px dashed grey;
  border-radius: 10px;
  .drag {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    .button {
      background: #cb5f10;
      margin-top: 10px;
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
</style>
