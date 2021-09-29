<template>
  <b-row>
    <b-colxx xxs="12">
      <h1 class="ml-xs-2">{{ title }}</h1>
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
<!--        <b-collapse id="displayOptions" class="d-md-block">-->
<!--          <div class="d-block d-md-inline-block pt-1">-->
<!--            <b-dropdown-->
<!--              id="ddown1"-->
<!--              :text="`${$t('pages.orderby')} ${sort.label}`"-->
<!--              variant="outline-dark"-->
<!--              class="mr-1 float-md-left btn-group"-->
<!--              size="xs"-->
<!--            >-->
<!--              <b-dropdown-item-->
<!--                v-for="(order,index) in sortOptions"-->
<!--                :key="index"-->
<!--                @click="changeOrderBy(order)"-->
<!--              >{{ order.label }}</b-dropdown-item>-->
<!--            </b-dropdown>-->
<!--            <div class="search-sm d-inline-block float-md-left mr-1 align-top">-->
<!--              <b-input :placeholder="$t('menu.search')"  @input="(val) => searchChange(val)" />-->
<!--            </div>-->
<!--            <div v-if="!rangepicker" class="d-inline-block float-md-left mr-1 align-top">-->
<!--              <DateRangePicker placeholder="Start Date" secondPlaceholder="End Date" @input="changeDatePicker" rangeSeparator="~" v-model="date" :dayStr="['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"/>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="float-md-right pt-1">-->
<!--            <span class="text-muted text-small mr-1 mb-2">{{from}}-{{to}} of {{ total }}</span>-->
<!--&lt;!&ndash;            <b-dropdown&ndash;&gt;-->
<!--&lt;!&ndash;              id="ddown2"&ndash;&gt;-->
<!--&lt;!&ndash;              right&ndash;&gt;-->
<!--&lt;!&ndash;              :text="`${perPage}`"&ndash;&gt;-->
<!--&lt;!&ndash;              variant="outline-dark"&ndash;&gt;-->
<!--&lt;!&ndash;              class="d-inline-block"&ndash;&gt;-->
<!--&lt;!&ndash;              size="xs"&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--&lt;!&ndash;              <b-dropdown-item&ndash;&gt;-->
<!--&lt;!&ndash;                v-for="(size,index) in pageSizes"&ndash;&gt;-->
<!--&lt;!&ndash;                :key="index"&ndash;&gt;-->
<!--&lt;!&ndash;                @click="changePageSize(size)"&ndash;&gt;-->
<!--&lt;!&ndash;              >{{ size }}</b-dropdown-item>&ndash;&gt;-->
<!--&lt;!&ndash;            </b-dropdown>&ndash;&gt;-->
<!--          </div>-->
<!--        </b-collapse>-->
        <b-collapse id="displayOptions" class="d-md-block mt-2">
          <div class="d-md-inline-block pt-1 w-100">
            <slot></slot>
          </div>
        </b-collapse>
      </div>
      <div class="mb-5" />
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
<style>
.input-wrapper.focus {
  border-color: orange !important;
}
.datepicker .picker .picker-items .row-item .item.selected:before, .date-range-picker .picker .picker-items .row-item .item.selected:before, .timepicker .picker .picker-items .row-item .item.selected:before, .datetime-picker .picker .picker-items .row-item .item.selected:before {
  background: #ffa500 !important;
}
.datepicker .picker .picker-items .row-item .item.is-in-range:before, .date-range-picker .picker .picker-items .row-item .item.is-in-range:before, .timepicker .picker .picker-items .row-item .item.is-in-range:before, .datetime-picker .picker .picker-items .row-item .item.is-in-range:before {
  background: rgba(255, 165, 0, 0.2);
}
.datepicker .picker .picker-items .row-item .item:hover, .date-range-picker .picker .picker-items .row-item .item:hover, .timepicker .picker .picker-items .row-item .item:hover, .datetime-picker .picker .picker-items .row-item .item:hover {
  color: orange;
  border: none;
}
.datepicker .picker .picker-items .row-item .item:hover, .date-range-picker .picker .picker-items .row-item .item:hover, .timepicker .picker .picker-items .row-item .item:hover, .datetime-picker .picker .picker-items .row-item .item:hover {
  color: white;
  border: none;
}
.datepicker .picker .picker-items .row-item .item.is-now, .date-range-picker .picker .picker-items .row-item .item.is-now, .timepicker .picker .picker-items .row-item .item.is-now, .datetime-picker .picker .picker-items .row-item .item.is-now {
  color: orange;
}
.datepicker .picker .picker-items .row-item .item.selected:before, .datepicker .picker .picker-items .row-item .item.is-now:before, .datepicker .picker .picker-items .row-item .item.is-in-range:before, .date-range-picker .picker .picker-items .row-item .item.selected:before, .date-range-picker .picker .picker-items .row-item .item.is-now:before, .date-range-picker .picker .picker-items .row-item .item.is-in-range:before, .timepicker .picker .picker-items .row-item .item.selected:before, .timepicker .picker .picker-items .row-item .item.is-now:before, .timepicker .picker .picker-items .row-item .item.is-in-range:before, .datetime-picker .picker .picker-items .row-item .item.selected:before, .datetime-picker .picker .picker-items .row-item .item.is-now:before, .datetime-picker .picker .picker-items .row-item .item.is-in-range:before {
  border: none;
}
.datepicker .input-wrapper, .date-range-picker .input-wrapper, .timepicker .input-wrapper, .datetime-picker .input-wrapper {
  padding: 1px;
  border-radius: 10px;
  border: 1px solid grey;
}
.vue-input {
  background: transparent;
}
</style>
