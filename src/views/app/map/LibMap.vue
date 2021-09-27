<template>
  <div style="position:relative;">
    <yandex-map  :coords="center" :zoom="15" class="yandexMap" map-type="map" :controls="['zoomControl', 'fullscreenControl', 'trafficControl']">
      <ymap-marker
        v-for="cr in courierLocations"
        :marker-id="'courier' + cr.location[0].id"
        :key="'courier' + cr.location[0].id"
        :coords="[parseFloat(cr.location[0].latitude), parseFloat(cr.location[0].longitude)]"
        :hint-content="cr.name"
        :icon="iconGenerator(icons.empty)"
      ></ymap-marker>
      <ymap-marker
        v-if="routeMode"
        v-for="cr in routedCouriers"
        :marker-id="'courier_routed' + cr.location[0].id"
        :key="'courier_routed' + cr.location[0].id"
        :coords="[parseFloat(cr.location[0].latitude), parseFloat(cr.location[0].longitude)]"
        :hint-content="cr.name"
        :icon="iconGenerator(icons.empty, cr.route)"
      ></ymap-marker>
      <ymap-marker
        v-if="client"
        :marker-id="'client' + client.id"
        :coords="[parseFloat(client.latitude), parseFloat(client.longitude)]"
        :hint-content="client.name"
        :icon="iconGenerator(icons.client)"
      ></ymap-marker>
      <ymap-marker
        v-for="vendor in dataVendors"
        :marker-id="'chef' + vendor.id"
        :key="'chef' + vendor.id"
        :coords="[parseFloat(vendor.latitude), parseFloat(vendor.longitude)]"
        :hint-content="vendor.user.first_name + ' ' + vendor.user.last_name"
        :icon="iconGenerator(icons.chef)"
      ></ymap-marker>
    </yandex-map>
    <div :class="`mapRightBar ${ rightBar ? 'mapRightBar_active' : '' }`">
      <div class="rightToggle" @click="rightBar = !rightBar">
        <div class="simple-icon-layers icon"></div>
      </div>
      <right-bar @selectedItem="selectedItem"/>
    </div>
    <OrderMapDetailCard :order="order" @close="closeRouteDetails"/>
  </div>
</template>

<script>
import RightBar from "./RightBar";
import OrderMapDetailCard from "../orders/OrderMapDetailCard";
import { mapGetters } from "vuex";
import client from '@/assets/icons/client.svg'
import chef from '@/assets/icons/chef.svg'
import empty from '@/assets/icons/empty.svg'
export default {
  components: {
    'right-bar': RightBar,
    OrderMapDetailCard
  },
  data () {
    return {
      icons: {
        client,
        chef,
        empty
      },
      routeMode: false,
      rightBar: false,
      center: [41.312947, 69.280204],
      route: {
        stop: true,
        coords: []
      },
      order: null,
      client: null,
      routedCouriers: []
    }
  },
  mounted() {
    this.$store.dispatch('courierLocation')
    this.$store.dispatch('getCouriers')
    this.$store.dispatch('getVendors', {
      no_page: true
    })
    this.$store.dispatch('getOrders', { status: 'map' })
  },
  computed: {
    ...mapGetters(['courierLocations', 'dataVendors', 'oneRoute', 'copyCourierLocations'])
  },
  methods: {
    closeRouteDetails () {
      this.order = null
      this.client = null
      this.routeMode = false
      this.routedCouriers = []
      // this.$store.dispatch('showCourierLocation')
      this.$router.push({ name: this.$route.name })
      console.log(this.routedCouriers)
    },
    routeSetterOnCourier (e) {
      this.routedCouriers = []
      this.courierLocations.forEach(el => {
        const _user_coords = e.user_address.longitude + ',' + e.user_address.latitude
        // debugger
        this.$store.dispatch('getOneRoute', `${_user_coords}~${el.location[0].longitude + ',' + el.location[0].latitude}`).then(res => {
          this.routedCouriers.push({
            ...el,
            route: res
          })
        })
      })
      setTimeout(() => {
        this.routeMode = true
      }, 500)
    },
    selectedItem (e) {
      // Example location for routing '69.289203,41.321352~69.28024,41.313705'
      this.client = null
      // debugger
      const _coords = `${e.user_address.longitude + ',' + e.user_address.latitude}~${e.vendor.longitude + ',' + e.vendor.latitude}`
      this.$store.dispatch('getOneRoute', _coords).then(res => {
        this.order = {
          ...e,
          route: res
        }
        this.client = {
          id: e.id,
          longitude: e.user_address.longitude,
          latitude: e.user_address.latitude,
          name: e.user.first_name + ' ' + e.user.last_name
        }
      })
      // this.$store.dispatch('hiddenCourierLocation')
      this.routeSetterOnCourier(e)
    },
    iconGenerator (image, content) {
      return {
        layout: 'default#imageWithContent',
        imageHref: image,
        imageSize: [43, 43],
        imageOffset: [0, 0],
        // content: '123 v12',
        contentOffset: [-60, 44],
        contentLayout: content ? `<div class="marker_content">
            <div><span class="iconsminds-clock marker orange"></span>${content.duration.text}</div>
            <div class="ml-1"><span class="iconsminds-scooter marker blue" style="font-size: 18px"></span>${content.distance.text}</div>
        </div>` : ''
      }
    }
  },
  destroyed() {
    this.$router.push({ name: this.$route.name })
  }
}
</script>

<style>
.marker_content {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  background: white;
  padding: 5px;
  border-radius: 4px;
  width: 150px;
  color: #000;
  display: flex;
  justify-content: center;
  /*font-weight: bold;*/
}
.ymaps-2-1-79-controls__toolbar_right {
  margin-right: 45px !important;
  /*position: absolute !important;*/
  /*right: 10% !important;*/
}
</style>
