import Vue from 'vue'
import Breadcrumb from './components/Common/Breadcrumb'
import RefreshButton from './components/Common/RefreshButton'
import Colxx from './components/Common/Colxx'
import vuePerfectScrollbar from 'vue-perfect-scrollbar'
import CrudModal from "./components/CrudModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import ImageUploadContainer from "./components/ImageUploadContainer";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import InputTag from "./components/Form/InputTag";
import ErrorPage from "./views/app/statuses/ErrorPage";
import Dropzone from "./containers/forms/DropzoneExample";

Vue.component('v-select', vSelect)
Vue.component('dropzone', Dropzone)
Vue.component('error-page', ErrorPage)
Vue.component('remove-modal', DeleteConfirmModal)
Vue.component('piaf-breadcrumb', Breadcrumb);
Vue.component('b-refresh-button', RefreshButton);
Vue.component('b-colxx', Colxx);
Vue.component('input-tag', InputTag);
Vue.component('vue-perfect-scrollbar', vuePerfectScrollbar);
Vue.component('crud-modal', CrudModal)
Vue.component('image-uploader', ImageUploadContainer)
