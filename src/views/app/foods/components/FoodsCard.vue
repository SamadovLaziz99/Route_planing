<template>
  <div v-if="order" class="d-flex flex-row mb-0" style="width: 100% !important;">
    <div class="d-block position-relative">
<!--      <img :src="imageProxy(order.media[0].url)" :alt="order.title" class="list-thumbnail border-0" style="height: 70px !important;" />-->
      <b-badge :variant="order.statusColor" pill class="position-absolute badge-top-right">{{order.status}}</b-badge>
    </div>
    <div class="pl-3 pt-2 pr-2 pb-2">
      <div>
        <p class="list-item-heading m-0" style="margin-top: -5px !important;">{{ order.title || order.name }}</p>
        <p class="text-muted mb-1 text-small" v-if="order.vendor && order.vendor.user">Vendor: {{ order.vendor.user.first_name + ' ' + order.vendor.user.last_name }}</p>
        <p class="text-muted mb-1 text-small" v-if="order.category">Category: {{ order.category.name[$lang] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { imageProxy } from "../../../../utils";
export default {
  props: ['order', 'detailPath'],
  methods: {
    imageProxy
  }
}
</script>
