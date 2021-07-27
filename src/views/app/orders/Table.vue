<template>
  <b-card :title="title">
    <b-table
      hover
      :items="items"
      :fields="fields"
      selectable
      select-mode="multi"
    >
      <slot></slot>
    </b-table>
    <Pagination :page="pagination.page" :per-page="pagination.limit" :total="pagination.total" @changePagination="changePagination"/>
  </b-card>
</template>

<script>
import Pagination from "../../../components/TableComponents/Pagination";
export default {
  name: "Table",
  props: {
    title: {
      type: String,
      default: () => 'Simple Table'
    },
    fields: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object,
      default () {
        return {
          page: 1,
          limit: 10,
          total: 0
        }
      }
    }
  },
  components: {
    Pagination
  },
  data() {
    return {}
  },
  methods: {
    changePagination (e) {
      this.$emit('changePagination', e)
    }
  }
}
</script>

<style>
.selectColumn {
  width: 2%;
}
.firstColumn {
  width: 20%;
}
.secondColumn {
  width: 25%;
}
.thirdRow {
  width: 15%;
}
.thirdRow {
  width: 8%;
}
</style>
