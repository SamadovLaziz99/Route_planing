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
              <b-colxx xxs="12" md="3">
                <v-select v-if="$route.name === 'food_list'" v-model="filters.vendor" @input="changeVendor" style="width: 100%" class="mb-2" :options="vendors" :placeholder="$t('vendors')"/>
              </b-colxx>
              <b-colxx xxs="12" md="3">
                <v-select v-if="$route.name === 'food_list'" v-model="filters.category" @input="changeCategory" style="width: 100%" class="mb-2" :options="categorys" :placeholder="$t('categories')"/>
              </b-colxx>
              <b-colxx xxs="12" md="3">
                <v-select v-if="$route.name === 'food_list'" v-model="filters.unit" @input="changeCategory" style="width: 100%" class="mb-2" :options="units" :placeholder="$t('units')"/>
              </b-colxx>
              <b-colxx xxs="12" md="3">
                <div class="d-inline-block mb-2 float-md-left align-top w-100">
                  <b-input v-if="$route.name === 'food_list'" class="search_input" :placeholder="$t('search')" @input="search" v-model="filters.search"  />
                </div>
              </b-colxx>
              <b-colxx xxs="12" md="12">
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
    this.search = debounce(this.search, 1000)
    return {
      filters: {
        vendor: null,
        category: null,
        unit: null,
        search: null
      }
    };
  },
  watch: {
    // 'filters.vendor_id': function (val) {
    //   // const _filters = { ...this.filters }
    //   this.$emit('filters', {
    //     vendor_id: this.filters.vendor_id?.value,
    //     category_id: this.filters.category_id?.value,
    //     search: this.filters.search
    //   })
    // },
    // 'filters.category_id': function (val) {
    //   // const _filters = { ...this.filters }
    //   this.$emit('filters', {
    //     vendor_id: this.filters.vendor_id?.value,
    //     category_id: this.filters.category_id?.value,
    //     search: this.filters.search
    //   })
    // },
    // 'filters.search': debounce((val) => {
    //   this.$emit('filters', {
    //     vendor_id: this.filters.vendor_id?.value,
    //     category_id: this.filters.category_id?.value,
    //     search: this.filters.search
    //   })
    // }, 1000),
  },
  mounted() {
    if (this.$route.name === 'food_list') {
      const _query = this.$route.query
      if (_query.q) this.filters.search = _query.q
      this.$store.dispatch('getCategories', {
        no_page: true
      }).then(res => {
        if (_query.category_id) {
          // debugger
          this.filters.category = this.categorys.filter(e => e.value === parseInt(_query.category_id))[0]
        }
      })
      this.$store.dispatch('getVendors', {
        no_page: true
      }).then(res => {
        if (_query.vendor_id) {
          this.filters.vendor = this.vendors.filter(e => e.value === parseInt(_query.vendor_id))[0]
        }
      })
      this.$store.dispatch('getUnits', {
        no_page: true
      }).then(res => {
        if (_query.unit_id) {
          this.filters.unit = this.units.filter(e => e.value === parseInt(_query.unit_id))[0]
        }
      })
    }
  },
  computed: {
    ...mapGetters(['dataCategories', 'dataVendors', 'dataUnits']),
    categorys () {
      return this.dataCategories.map(e => {
        return {
          label: e.name[this.$lang],
          value: e.id
        }
      })
    },
    vendors () {
      return this.dataVendors.map(e => {
        const { first_name, last_name } = e.user
        return {
          label: first_name + ' ' + last_name,
          value: e.id
        }
      })
    },
    units () {
      return this.dataUnits.map(e => {
        // const { first_name, last_name } = e.user
        return {
          label: e.name[this.$lang],
          value: e.id
        }
      })
    }
  },
  methods: {
    filterState() {
      return {
        vendor_id: this.filters.vendor?.value,
        category_id: this.filters.category?.value,
        unit_id: this.filters.unit?.value,
        q: this.filters.search
      }
    },
    changeVendor (e) {
      this.$emit('filters', this.filterState())
    },
    changeCategory(e) {
      this.$emit('filters', this.filterState())
    },
    search (e) {
      this.$emit('filters', this.filterState())
    }
  }
};
</script>
