<template>
  <div class="d-flex flex-row mb-0" style="width: 100% !important;">
    <div class="d-block position-relative">
      <img :src="order.img" :alt="order.title" class="list-thumbnail border-0" style="height: 70px !important;" />
      <b-badge :variant="order.statusColor" pill class="position-absolute badge-top-right">{{order.status}}</b-badge>
    </div>
    <div class="pl-3 pt-2 pr-2 pb-2">
      <div>
        <p class="list-item-heading m-0" style="margin-top: -5px !important;">{{ order.title }}</p>
        <p class="text-muted mb-1 text-small">Vendor: John Doe</p>
        <p class="text-muted mb-1 text-small">Category: Salat</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['order', 'detailPath']
}
</script>
