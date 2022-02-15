<template>
  <b-row>
    <b-colxx xxs="12">
      <h1>{{ title }}</h1>
      <div class="top-right-button-container">
        <slot name="action"></slot>
      </div>
      <piaf-breadcrumb />
      <div class="mb-3 mt-3">
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
        <b-collapse id="displayOptions" class="d-md-block mt-3">
          <div class="d-md-inline-block pt-1 w-100">
            <b-row>
              <b-colxx xxs="12" md="2">
                <div class="d-inline-block mb-2 float-md-left align-top w-100">
                  <b-input class="search_input" :placeholder="$t('id')" @input="filter" v-model="filters.user_id"  />
                </div>
              </b-colxx>
              <b-colxx xxs="12" md="3">
                <div class="d-inline-block mb-2 float-md-left align-top w-100">
                  <b-input class="search_input" :placeholder="$t('search')" @input="filter" v-model="filters.search"  />
                </div>
              </b-colxx>
              <b-colxx xxs="12" md="3">
                <div class="d-inline-block mb-2 float-md-left align-top w-100">
                  <b-input class="search_input" :placeholder="$t('phone')" @input="filter" v-model="filters.phone"  />
                </div>
              </b-colxx>
              <b-colxx xxs="12" md="1">
                <div></div>
              </b-colxx>
              <b-colxx xxs="12" md="3">
                <div class="float-md-right pt-1">
                  <span class="text-muted text-small mr-1 mb-2">{{from}}-{{to}} {{ $t('of') }} {{ total }}</span>
                </div>
              </b-colxx>
            </b-row>
          </div>
        </b-collapse>
      </div>
      <!--      <div class="mb-5" />-->
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
import debounce from 'debounce'
import { mapGetters } from "vuex";

export default {
  components: {
    "data-list-icon": DataListIcon,
    "thumb-list-icon": ThumbListIcon,
    "image-list-icon": ImageListIcon,
    "add-new-modal": AddNewModal
  },
  props: [
    "title",
    "selectAll",
    "isSelectedAll",
    "isAnyItemSelected",
    "keymap",
    "displayMode",
    "sortOptions",
    "changeDisplayMode",
    "changeOrderBy",
    "changePageSize",
    "sort",
    "searchChange",
    "from",
    "to",
    "total",
    "perPage"
  ],
  data() {
    this.filter = debounce(this.filter, 1000)
    return {
      filters: {
        user_id: null,
        search: null,
        phone: null
      }
    };
  },
  methods: {
    filter (e) {
      this.$emit('filters', this.filters)
    }
  },
  mounted() {
    const _query = this.$route.query
    if (_query) {
      this.filters.user_id = _query.user_id
      this.filters.search = _query.search
      this.filters.phone = _query.phone
    }
  }
};
</script>
