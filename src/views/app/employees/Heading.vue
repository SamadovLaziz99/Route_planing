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
              <b-colxx xxs="12" md="1">
                <div class="d-inline-block mb-2 float-md-left align-top w-100">
                  <b-input v-if="$route.name === 'vendors_list'" class="search_input" :placeholder="$t('id')" @input="searchById" v-model="filters.id"  />
                </div>
              </b-colxx>
              <b-colxx xxs="12" md="3">
                <div class="d-inline-block mb-2 float-md-left align-top w-100">
                  <b-input v-if="$route.name === 'vendors_list'" class="search_input" :placeholder="$t('search')" @input="search" v-model="filters.search"  />
                </div>
<!--                <v-select v-if="$route.name === 'food_list'" v-model="filters.vendor" @input="changeVendor" style="width: 100%" class="mb-2" :options="vendors" :placeholder="$t('vendors')"/>-->
              </b-colxx>
              <b-colxx xxs="12" md="3">
                <datepicker
                  v-if="$route.name === 'vendors_list'"
                  clear-button
                  clear-button-icon="simple-icon-close"
                  format="yyyy-MM-dd"
                  @input="changeStartDate"
                  @cleared="clearedStartDate"
                  v-model="filters.startDate"
                  :bootstrap-styling="true"
                  :placeholder="$t('start.date')"
                ></datepicker>
<!--                <v-select v-if="$route.name === 'food_list'" v-model="filters.category" @input="changeCategory" style="width: 100%" class="mb-2" :options="categorys" :placeholder="$t('categories')"/>-->
              </b-colxx>
              <b-colxx xxs="12" md="3">
                <datepicker
                  v-if="$route.name === 'vendors_list'"
                  clear-button
                  format="yyyy-MM-dd"
                  @cleared="clearedEndDate"
                  @input="changeEndDate"
                  v-model="filters.endDate"
                  clear-button-icon="simple-icon-close"
                  :bootstrap-styling="true"
                  :placeholder="$t('end.date')"
                ></datepicker>
<!--                <div class="d-inline-block mb-2 float-md-left align-top w-100">-->
<!--                  <b-input v-if="$route.name === 'vendors_list'" class="search_input" :placeholder="$t('search')" @input="search" v-model="filters.search"  />-->
<!--                </div>-->
              </b-colxx>
              <b-colxx xxs="12" md="2">
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
import moment from "moment";
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
    this.search = debounce(this.search, 1000)
    this.searchById = debounce(this.searchById, 1000)
    return {
      filters: {
        search: null,
        id: null,
        startDate: null,
        endDate: null
      }
    };
  },
  mounted() {
    if (this.$route.name === 'vendors_list') {
      const _query = this.$route.query
      if (_query.name) this.filters.search = _query.name
      if (_query.id) this.filters.id = _query.id
      if(_query.registration_from && _query.registration_to) {
        this.filters.startDate = _query.registration_from
        this.filters.endDate = _query.registration_to
      }
    }
  },
  methods: {
    moment,
    filterState() {
      return {
        name: this.filters.search,
        id: this.filters.id,
        registration_from: this.filters.startDate ? moment(this.filters.startDate).format('YYYY-MM-DD') : null,
        registration_to: this.filters.endDate ? moment(this.filters.endDate).format('YYYY-MM-DD') : null
      }
    },
    changeStartDate (e) {
      console.log(e)
      if (this.filters.endDate) {
        this.$emit('filters', this.filterState())
      }
    },
    clearedStartDate () {
      this.filters.endDate = null
      this.$emit('filters', this.filterState())
    },
    clearedEndDate () {
      this.filters.startDate = null
      this.$emit('filters', this.filterState())
    },
    changeEndDate (e) {
      console.log(e)
      if (this.filters.startDate) {
        this.$emit('filters', this.filterState())
      }
    },
    search (e) {
      this.$emit('filters', this.filterState())
    },
    searchById (e) {
      this.$emit('filters', this.filterState())
    }
  }
};
</script>
