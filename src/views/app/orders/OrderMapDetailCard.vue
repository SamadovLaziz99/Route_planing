<template>
  <div class="routeDetailsContent" v-if="order">
    <b-card style="width: 100%;" :title="$t('route.details')" class="mb-4">
      <b-close-button @click="closeRouteDetails"/>
      <div class="details">
        <div class="detail_row">
            <span class="iconsminds-shopping-cart icon">
              <span class="item_name">{{ $t('order.order') }}</span>
            </span>
          <span class="item_title"># {{ order.id }}</span>
        </div>
        <div class="detail_row">
            <span class="iconsminds-male icon">
              <span class="item_name">{{ $t('customer') }}</span>
            </span>
          <span class="item_title">{{ order.user.first_name + ' ' + (order.user.last_name ? order.user.last_name : '') }}</span>
        </div>
        <div class="detail_row">
            <span class="iconsminds-smartphone-4 icon">
              <span class="item_name">{{ $t('customer.phone') }}</span>
            </span>
          <span class="item_title">{{ order.user.phone }}</span>
        </div>
        <div class="detail_row">
            <span class="iconsminds-chef-hat icon">
              <span class="item_name">{{ $t('vendor') }}</span>
            </span>
          <span class="item_title">{{ order.vendor.user.first_name + ' ' + order.vendor.user.last_name }}</span>
        </div>
        <div v-if="order.courier" class="detail_row">
            <span class="iconsminds-scooter icon">
              <span class="item_name">{{ $t('courier') }}</span>
            </span>
          <span class="item_title">{{ order.courier.name }}</span>
        </div>
        <div class="detail_row">
            <span class="simple-icon-energy icon">
              <span class="item_name">{{ $t('status') }}</span>
            </span>
          <span class="item_title"><b-badge class="mb-1" pill :variant="badgeType(order.status)">{{ $t(`order.${ order.status }`) }}</b-badge></span>
        </div>
        <div class="detail_row">
            <span class="iconsminds-dollar icon">
              <span class="item_name">{{ $t('payment_type') }}</span>
            </span>
          <span class="item_title">{{ $t(order.payment_type) }}</span>
        </div>
        <div class="detail_row">
            <span class="iconsminds-dollar-sign-2 icon">
              <span class="item_name">{{ $t('total_price') }}</span>
            </span>
          <span class="item_title">{{ order.total_price }} {{ $t('sum') }}</span>
        </div>
        <div class="detail_row">
            <span class="iconsminds-clock-forward icon">
              <span class="item_name">{{ $t('created_at') }}</span>
            </span>
          <span class="item_title">{{ moment(order.created_at).format('HH:mm, DD-MM-YYYY') }}</span>
        </div>
        <div class="detail_row">
            <span class="iconsminds-time-backup icon">
              <span class="item_name">{{ $t('delivery_time') }}</span>
            </span>
          <span class="item_title">{{ moment(order.delivery_time).format('HH:mm, DD-MM-YYYY') }}</span>
        </div>
        <div class="detail_row">
            <span class="iconsminds-road-2 icon">
              <span class="item_name">{{ $t('distance') }}</span>
            </span>
          <span class="item_title">{{ distance }} {{ $t('km') }}</span>
        </div>
        <div class="detail_row">
            <span class="iconsminds-clock icon">
              <span class="item_name">{{ $t('duration') }}</span>
            </span>
          <span class="item_title">{{ (hr !== '' ? (hr + ' ' + this.$t('hr')) : '') + ' ' + (mn !== '' ? (mn + ' ' + this.$t('min')) : '') }}</span>
        </div>
<!--        <div class="detail_row">-->
<!--            <span class="iconsminds-traffic-light icon">-->
<!--              <span class="item_name">Duration Traffic Jump</span>-->
<!--            </span>-->
<!--          <span class="item_title">{{ order.route.durationTraffic.text }}</span>-->
<!--        </div>-->
      </div>
    </b-card>
  </div>
</template>

<script>
import { timeFormat } from "../../../utils";
import moment from "moment";
export default {
  name: "OrderMapDetailCard",
  props: ['order'],
  methods: {
    moment,
    timeFormat,
    closeRouteDetails () {
      this.$emit('close')
    },
    badgeType(type) {
      switch (type) {
        case 'pending': return 'info'
          break;
        case 'accepted': return 'secondary'
          break;
        case 'in_process': return 'primary'
          break;
        case 'shipping': return 'dark'
          break;
        case 'finished': return 'success'
          break;
        case 'cancelled': return 'danger'
          break;
        default: return 'primary'
          break;
      }
    }
  },
  computed: {
    hr () {
      return this.timeFormat(this.order.route.time).hr
    },
    mn () {
      return this.timeFormat(this.order.route.time).mn
    },
    distance () {
      const _dis = this.order.route.length.toString()
      const distance = _dis.split('.')[1].length > 1 ? (_dis.split('.')[0] + '.' + _dis.split('.')[1].slice(0, 1)) : this.order.route.length
      return distance
    }
  }
}
</script>

<style scoped>

</style>
