<template>
  <vue-dropzone
    ref="myVueDropzone"
    id="dropzone"
    :useCustomSlot="true"
    :options="dropzoneOptions"
    @vdropzone-sending="customUpload"
    @vdropzone-removed-file="removeFile"
    @vdropzone-success="success"
    :destroyDropzone="destroy"
  >
    <div class="dropzone-custom-content">
      <h4 class="dropzone-custom-title">Drag and drop to upload content!</h4>
    </div>
  </vue-dropzone>
<!--  <b-row>-->
<!--    <b-colxx xxs="12">-->
<!--      <b-card class="mb-4" :title="$t('images')">-->
<!--        <b-form>-->
<!--          <b-row>-->
<!--            <b-colxx xxs="12">-->
<!--              -->
<!--            </b-colxx>-->
<!--          </b-row>-->
<!--        </b-form>-->
<!--      </b-card>-->
<!--    </b-colxx>-->
<!--  </b-row>-->
</template>
<script>
import VueDropzone from "vue2-dropzone";

export default {
  props: ['media', 'url', 'destroy'],
  components: {
    "vue-dropzone": VueDropzone
  },
  data() {
    const token = localStorage.getItem('token')
    return {
      destroyed: false,
      dropzoneOptions: {
        url: `https://coozin.cookzy.uz/${this.url}/media/`,
        method: "POST",
        thumbnailHeight: 150,
        maxFilesize: 2,
        previewTemplate: this.dropzoneTemplate(),
        uploadMultiple: false,
        headers: {
          "Authorization": 'Bearer ' + token,
          'Cache-Control': null,
          'X-Requested-With': null
        }
      },
      files: []
    };
  },
  watch: {
    $route: (val) => {
      console.log(val)
    }
  },
  beforeDestroy() {
    console.log('before destroy')
    this.destroyed = true
  },
  methods: {
    success (file, res) {
      // console.log(file)
      // console.log(res)
      this.files.push({
        ...file,
        id: res.id
      })
    },
    setDefaultImage (file, url) {
      this.$refs.myVueDropzone.manuallyAddFile(file, url)
    },
    removeFile (file, error, xhr) {
      console.log('Removedddddddddddddd')
      if (!this.destroyed) {
        if (file.manuallyAdded) {
          this.$store.dispatch('deleteMedia', file.id)
        }
        if (file.upload.uuid) {
          const _id = this.files.filter(e => e.upload.uuid === file.upload.uuid)[0].id
          this.$store.dispatch('deleteMedia', _id)
        }
      }
      // try {
      //   if (this.$refs.vueDropzone.dropzone.disabled !== true) {
      //
      //   }
      // }
      // catch (e) {}
    },
    customUpload (file, xhr, formData) {
      // formData.append('file', file)
      formData.append('type', this.media.type)
      formData.append('mediable_id', this.media.id)
      // formData.delete('file');
    },
    dropzoneTemplate() {
      return `<div class="dz-preview dz-file-preview mb-3">
                  <div class="d-flex flex-row "> <div class="p-0 w-30 position-relative">
                      <div class="dz-error-mark"><span><i></i>  </span></div>
                      <div class="dz-success-mark"><span><i></i></span></div>
                      <div class="preview-container">
                        <img data-dz-thumbnail class="img-thumbnail border-0" />
                        <i class="simple-icon-doc preview-icon"></i>
                      </div>
                  </div>
                  <div class="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
                    <div> <span data-dz-name /> </div>
                    <div class="text-primary text-extra-small" data-dz-size /> </div>
                    <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                    <div class="dz-error-message"><span data-dz-errormessage></span></div>
                  </div>
                  <a href="#" class="remove" style="cursor: pointer" data-dz-remove> <i class="glyph-icon simple-icon-trash"></i> </a>
                </div>
        `;
    }
  }
};
</script>
