<template>
  <b-card :title="$t('dashboards.recent-orders')">
    <b-refresh-button @click="refreshButtonClick" />
    <vue-perfect-scrollbar
      class="scroll dashboard-list-with-thumbs"
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
    >
      <recent-order-item
        v-for="(item,index) in items"
        :order="item"
        :detail-path="{ name: 'food_detail', params: { id: item.food } }"
        :key="index"
      />
    </vue-perfect-scrollbar>
  </b-card>
</template>
<script>
import RecentOrderItem from "../../components/Listing/RecentOrderItem";
import products from "../../data/products";

export default {
  props: ['items'],
  components: {
    "recent-order-item": RecentOrderItem
  },
  data() {
    return {
      products
    };
  },
  methods: {
    refreshButtonClick() {
      console.log("refreshButtonClick");
    }
  }
};
</script>
