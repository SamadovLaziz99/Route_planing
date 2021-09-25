<template>
  <div class="history-tl-container">
<!--    <div class="timeline">-->
      <ul class="tl">
        <li v-for="item in items" :key="item.id" class="tl-item" ng-repeat="item in retailer_history">
<!--          <div :class="`title ${ (route && route.coords && route.coords === timeline.coords) ? 'title_active' : '' }`">-->
          <div :class="`title ${ parseInt($route.query.order_id) === item.id ? 'title_active' : '' }`" @click="viewItem(item)">
            <div class="order_number">
              #{{ item.id }}
            </div>
            <div :class="`order_status badge-outline-${badgeType(item.status)}`">
              {{ $t(`order.${item.status}`) }}
            </div>
            <div style="width: 100%; margin-top: 25px">
              <div class="item-title"><span class="iconsminds-doctor marker orange"></span>{{ item.user.first_name }} {{ item.user.last_name }}</div>
                <div class="item-title"><span class="iconsminds-map-marker-2 marker red"></span>{{ item.vendor.address }}</div>
                <div class="item-title"><span class="iconsminds-map-marker-2 marker green"></span>{{ item.user_address.address_name }}</div>
            </div>
<!--            <div class="d-flex justify-content-between align-items-center pt-2">-->
<!--              <span>Courier: </span>-->
<!--              <v-select style="min-width: 180px;" :options="tickets" label="title" index="detail"/>-->
<!--            </div>-->
          </div>
        </li>
      </ul>
<!--    </div>-->
  </div>
</template>

<script>
// import tickets from "../../../data/tickets";
import {mapGetters} from "vuex";
export default {
  name: "TimeLine",
  props: ['route', 'items'],
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['dataOrders'])
  },
  methods: {
    viewItem (item) {
      this.$router.push({
        name: this.$route.name,
        query: {
          order_id: item.id
        }
      })
      this.$emit('selectedItem', item)
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
    },
  }
}
</script>

<style lang="scss">
.order_number {
  position: absolute;
  right: 0;
  top: 0;
  background: #e7e7e7;
  border-radius: inherit;
  border-bottom-right-radius: 0;
  border-top-left-radius: 0;
  padding: 5px 10px;
}
.order_status {
  position: absolute;
  left: 0;
  top: 0;
  border-radius: inherit;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;
  padding: 5px 10px;
}
</style>
