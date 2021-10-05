<template>
  <b-row v-if="(total / $perPage) > 1">
    <b-colxx xxs="12">
      <b-pagination-nav
        :number-of-pages="Math.ceil((total / $perPage))"
        use-router
        :link-gen="linkGen"
        :value="page"
        @change="changePagination"
        :per-page="$perPage"
        align="right"
      >
        <template v-slot:next-text>
          <i class="simple-icon-arrow-right" />
        </template>
        <template v-slot:prev-text>
          <i class="simple-icon-arrow-left" />
        </template>
        <template v-slot:first-text>
          <i class="simple-icon-control-start" />
        </template>
        <template v-slot:last-text>
          <i class="simple-icon-control-end" />
        </template>
      </b-pagination-nav>
    </b-colxx>
  </b-row>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    page: {
      type: Number,
      default: () => 1
    },
    perPage: {
      type: Number,
      default: () => 10
    },
    total: {
      type: Number,
      default: () => 0
    }
  },
  data () {
    return {}
  },
  // computed: {
  //   lastPage: () => this.perPage
  // },
  methods: {
    changePagination (val) {
      this.$emit('changePagination', val)
    },
    queryGenerator (obj) {
      let _querys = []
      let keys = Object.keys(obj)
      let values = Object.values(obj)
      _querys = keys.map((e, i) => {
        return e + '=' + (values[i] ? values[i] : '')
      })
      return _querys.toString().replaceAll(',', '&')
    },
    linkGen(pageNum) {
      return {
        name: this.$route.name,
        query: this.$route.query,
        hash: "#page-" + pageNum
      }
      // return pageNum + ''
      // return this.queryGenerator(this.$route.query)
      // return { ...this.$route.query, page: pageNum } "#page-" + pageNum;
    },
  }
}
</script>

<style scoped>

</style>
