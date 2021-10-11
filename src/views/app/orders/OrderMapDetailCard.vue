<template>
  <div class="routeDetailsContent" v-if="order">
    <b-card style="width: 100%; height: 100%" :title="$t('route.details')" class="mb-4">
      <b-close-button @click="closeRouteDetails"/>
      <div class="details">
        <div class="detail_row">
            <span class="iconsminds-shopping-cart icon">
              <span class="item_name">Order</span>
            </span>
          <span class="item_title"># {{ order.id }}</span>
        </div>
        <div class="detail_row">
            <span class="iconsminds-male icon">
              <span class="item_name">Customer</span>
            </span>
          <span class="item_title">{{ order.user.first_name + ' ' + order.user.last_name }}</span>
        </div>
        <div class="detail_row">
            <span class="iconsminds-smartphone-4 icon">
              <span class="item_name">Customer Phone</span>
            </span>
          <span class="item_title">{{ order.user.phone }}</span>
        </div>
        <div class="detail_row">
            <span class="iconsminds-chef-hat icon">
              <span class="item_name">Vendor</span>
            </span>
          <span class="item_title">{{ order.vendor.user.first_name + ' ' + order.vendor.user.last_name }}</span>
        </div>
        <div v-if="order.courier" class="detail_row">
            <span class="iconsminds-scooter icon">
              <span class="item_name">Courier</span>
            </span>
          <span class="item_title">{{ order.courier.name }}</span>
        </div>
        <div class="detail_row">
            <span class="iconsminds-road-2 icon">
              <span class="item_name">Distance</span>
            </span>
          <span class="item_title">{{ order.route.distance.text }}</span>
        </div>
        <div class="detail_row">
            <span class="iconsminds-clock icon">
              <span class="item_name">Duration</span>
            </span>
          <span class="item_title">{{ order.route.duration.text }}</span>
        </div>
        <div class="detail_row">
            <span class="iconsminds-traffic-light icon">
              <span class="item_name">Duration Traffic Jump</span>
            </span>
          <span class="item_title">{{ order.route.durationTraffic.text }}</span>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "OrderMapDetailCard",
  props: ['order'],
  methods: {
    closeRouteDetails () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
