<template>
  <b-row>
    <b-colxx xxs="12">
      <h1 class="ml-xs-2">{{ title }}</h1>
      <div class="top-right-button-container">
        <slot name="action"></slot>
      </div>
      <piaf-breadcrumb />
      <div class="mb-2 mt-2">
        <div class="d-flex justify-content-between">
          <div></div>
          <b-button
            variant="primary"
            class="d-inline-block d-md-none mr-2"
            v-b-toggle.displayOptions
          >
            {{ $t('filters') }}
            <i class="simple-icon-arrow-down align-middle" />
          </b-button>
        </div>
        <b-collapse id="displayOptions" class="d-md-block mt-2">
          <div class="d-md-inline-block pt-1 w-100">
            <slot></slot>
          </div>
        </b-collapse>
      </div>
    </b-colxx>
  </b-row>
</template>
<script>
import {
  DataListIcon,
  ThumbListIcon,
  ImageListIcon
} from "../../../components/Svg";
import AddNewModal from "../../../containers/pages/AddNewModal";
// import { DateRangePicker } from '@livelybone/vue-datepicker'
import '@livelybone/vue-datepicker/lib/css/index.css'
export default {
  components: {
    "data-list-icon": DataListIcon,
    "thumb-list-icon": ThumbListIcon,
    "image-list-icon": ImageListIcon,
    "add-new-modal": AddNewModal,
    // DateRangePicker
  },
  props: [
    "title",
    "rangepicker",
    "selectAll",
    "isSelectedAll",
    "isAnyItemSelected",
    "keymap",
    "displayMode",
    "changeDisplayMode",
    "changeOrderBy",
    "changePageSize",
    "sort",
    "searchChange",
    "from",
    "to",
    "total",
    "perPage",
    "displayModeHidden"
  ],
  data() {
    return {
      date: [],
      filters: {
        vendor: null
      }
    };
  },
  methods: {
    // changeDatePicker (e) {
    //   this.date = e
    // },
  },
  // mounted() {
  //   this.$store.dispatch('getVendors')
  // }
};
</script>

