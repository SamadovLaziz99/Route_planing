<template>
  <b-row>
    <b-colxx xxs="12">
      <b-card class="mb-4" :title="$t('form-components.dropzone')">
        <b-form>
          <b-row>
            <b-colxx xxs="12">
              <vue-dropzone
                ref="myVueDropzone"
                id="dropzone"
                :options="dropzoneOptions"
                @vdropzone-file-added="addedFile"
                @vdropzone-sending="customUpload"
              >
              </vue-dropzone>
            </b-colxx>
          </b-row>
        </b-form>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import VueDropzone from "vue2-dropzone";

export default {
  components: {
    "vue-dropzone": VueDropzone
  },
  data() {
    const token = localStorage.getItem('token')
    return {
      dropzoneOptions: {
        url: "https://coozin.cookzy.uz/food/media/",
        method: "POST",
        thumbnailHeight: 200,
        maxFilesize: 2,
        previewTemplate: this.dropzoneTemplate(),
        headers: {
          "Authorization": 'Bearer ' + token,
          "Access-Control-Allow-Origin": '*'
        }
      }
    };
  },
  methods: {
    addedFile(file) {
      console.log(file)
    },
    customUpload (file, xhr, formData) {
      formData.append('url', file)
      formData.append('type', 'image')
      formData.append('mediable_id', 1)
      formData.delete('file');
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
                  <a href="#" class="remove" data-dz-remove> <i class="glyph-icon simple-icon-trash"></i> </a>
                </div>
        `;
    }
  }
};
</script>
