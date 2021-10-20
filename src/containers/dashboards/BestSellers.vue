<template>
  <b-card :title="title">
    <vue-perfect-scrollbar
      class="scroll"
      style="height: 500px;"
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
    >
      <vuetable
        ref="vuetable"
        :data="items"
        :fields="bestsellers.fields"
        :api-mode="false"
      >
      </vuetable>
    </vue-perfect-scrollbar>
  </b-card>
</template>
<script>
import Vuetable from "vuetable-2/src/components/Vuetable";
// import VuetablePaginationBootstrap from "../../components/Common/VuetablePaginationBootstrap";
// import { apiUrl } from "../../constants/config";

export default {
  props: ["title", "items"],
  components: {
    vuetable: Vuetable,
    // "vuetable-pagination-bootstrap": VuetablePaginationBootstrap
  },
  data() {
    return {
      bestsellers: {
        // apiUrl: apiUrl + "/cakes/fordatatable",
        fields: [
          {
            name: "vendor__user__first_name",
            title: this.$t('first.name'),
            titleClass: "",
            dataClass: "list-item-heading"
          },
          {
            name: "vendor__user__last_name",
            title: this.$t('last.name'),
            titleClass: "",
            dataClass: "text-muted"
          },
          {
            name: "sales_count",
            // sortField: "stock",
            title: this.$t('sales'),
            titleClass: "",
            dataClass: "text-muted"
          },
          {
            name: "total_sum",
            // sortField: "category",
            title: this.$t('dashboards.total'),
            titleClass: "",
            dataClass: "text-muted"
          },
        ]
      }
    };
  },
  methods: {
    // onPaginationData(paginationData) {
    //   this.$refs.pagination.setPaginationData(paginationData);
    // },
    // onChangePage(page) {
    //   console.log(page)
    //   this.$refs.vuetable.changePage(page);
    // }
  }
};
</script>
