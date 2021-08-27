<template>
  <b-row>
    <b-colxx xxs="12">
      <h1>{{ title }}</h1>
      <div class="top-right-button-container">
        <slot name="action"></slot>
<!--        <b-button-group>-->
<!--          <b-dropdown split right @click="selectAll(true)" class="check-button" variant="primary">-->
<!--            <label-->
<!--              class="custom-control custom-checkbox pl-4 mb-0 d-inline-block"-->
<!--              slot="button-content"-->
<!--            >-->
<!--              <input-->
<!--                class="custom-control-input"-->
<!--                type="checkbox"-->
<!--                :checked="isSelectedAll"-->
<!--                v-shortkey=" { select: ['ctrl','a'], undo: ['ctrl','d'] } "-->
<!--                @shortkey="keymap"-->
<!--              />-->
<!--              <span-->
<!--                :class="{-->
<!--                'custom-control-label' :true,-->
<!--                'indeterminate' : isAnyItemSelected-->
<!--                }"-->
<!--              >&nbsp;</span>-->
<!--            </label>-->
<!--            <b-dropdown-item>{{$t('pages.delete')}}</b-dropdown-item>-->
<!--            <b-dropdown-item>{{$t('pages.another-action')}}</b-dropdown-item>-->
<!--          </b-dropdown>-->
<!--        </b-button-group>-->
      </div>
      <piaf-breadcrumb />
      <div class="mb-2 mt-2">
        <b-button
          variant="empty"
          class="pt-0 pl-0 d-inline-block d-md-none"
          v-b-toggle.displayOptions
        >
          {{ $t('pages.display-options') }}
          <i class="simple-icon-arrow-down align-middle" />
        </b-button>
        <b-collapse id="displayOptions" class="d-md-block">
          <div class="d-block d-md-inline-block pt-1">
            <b-dropdown
              id="ddown1"
              :text="`${$t('pages.orderby')} ${ sort.label ? sort.label : ' '}`"
              variant="outline-dark"
              class="mr-1 float-md-left btn-group"
              size="xs"
            >
              <b-dropdown-item
                v-for="(order,index) in sortOptions"
                :key="index"
                @click="changeOrderBy(order)"
              >{{ order.label }}</b-dropdown-item>
            </b-dropdown>

            <div class="search-sm d-inline-block float-md-left mr-1 align-top">
              <b-input :placeholder="$t('menu.search')"  @input="(val) => searchChange(val)" />
            </div>
          </div>
          <div class="float-md-right pt-1">
            <span class="text-muted text-small mr-1 mb-2">{{from}}-{{to}} of {{ total }}</span>
<!--            <b-dropdown-->
<!--              id="ddown2"-->
<!--              right-->
<!--              :text="`${perPage}`"-->
<!--              variant="outline-dark"-->
<!--              class="d-inline-block"-->
<!--              size="xs"-->
<!--            >-->
<!--              <b-dropdown-item-->
<!--                v-for="(size,index) in pageSizes"-->
<!--                :key="index"-->
<!--                @click="changePageSize(size)"-->
<!--              >{{ size }}</b-dropdown-item>-->
<!--            </b-dropdown>-->
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
    return {
    };
  }
};
</script>
