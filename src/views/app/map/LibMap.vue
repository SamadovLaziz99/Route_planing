<template>
  <div style="position:relative;">
    <yandex-map :coords="center" :zoom="15" class="yandexMap" map-type="map" :controls="['zoomControl', 'fullscreenControl', 'trafficControl']">
      <ymap-marker
        v-for="cr in courierLocations"
        :marker-id="'courier' + cr.location[0].id"
        :key="'courier' + cr.location[0].id"
        :coords="[parseFloat(cr.location[0].latitude), parseFloat(cr.location[0].longitude)]"
        :hint-content="cr.name"
        :icon="iconGenerator(icons.empty)"
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
      <right-bar @getOneRoute="getOneRoute" :route="route"/>
    </div>
    <div class="routeDetailsContent">
      <b-card style="width: 100%; height: 100%" :title="$t('route.details')" class="mb-4">
        <b-close-button />
        <div class="details">
          <div class="detail_row">
            <span class="iconsminds-shopping-cart icon">
              <span class="item_name">Order</span>
            </span>
              <span class="item_title"># 1231321</span>
          </div>
          <div class="detail_row">
            <span class="iconsminds-male icon">
              <span class="item_name">Customer</span>
            </span>
            <span class="item_title">Boyimjon Hoshimjonov</span>
          </div>
          <div class="detail_row">
            <span class="iconsminds-smartphone-4 icon">
              <span class="item_name">Customer Phone</span>
            </span>
            <span class="item_title">+998997032053</span>
          </div>
          <div class="detail_row">
            <span class="iconsminds-chef-hat icon">
              <span class="item_name">Vendor</span>
            </span>
            <span class="item_title">Cooker</span>
          </div>
          <div class="detail_row">
            <span class="iconsminds-scooter icon">
              <span class="item_name">Courier</span>
            </span>
            <span class="item_title">John Doe</span>
          </div>
          <div class="detail_row">
            <span class="iconsminds-road-2 icon">
              <span class="item_name">Distance</span>
            </span>
            <span class="item_title">8 km</span>
          </div>
          <div class="detail_row">
            <span class="iconsminds-clock icon">
              <span class="item_name">Duration</span>
            </span>
            <span class="item_title">45 min</span>
          </div>
          <div class="detail_row">
            <span class="iconsminds-traffic-light icon">
              <span class="item_name">Duration Traffic Jump</span>
            </span>
            <span class="item_title">55 min</span>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import RightBar from "./RightBar";
import { mapGetters } from "vuex";
import client from '@/assets/icons/client.svg'
import chef from '@/assets/icons/chef.svg'
import empty from '@/assets/icons/empty.svg'
export default {
  components: {
    'right-bar': RightBar
  },
  data () {
    return {
      icons: {
        client,
        chef,
        empty
      },
      rightBar: false,
      center: [41.312947, 69.280204],
      route: {
        stop: true,
        coords: []
      }
    }
  },
  mounted() {
    this.$store.dispatch('courierLocation')
    this.$store.dispatch('getCouriers')
    this.$store.dispatch('getVendors', {
      no_page: true
    })
    this.$store.dispatch('getOneRoute')
  },
  computed: {
    ...mapGetters(['courierLocations', 'dataVendors'])
  },
  methods: {
    getOneRoute () {
      console.log('salom')
    },
    iconGenerator (image) {
      return {
        layout: 'default#imageWithContent',
        imageHref: image,
        imageSize: [43, 43],
        imageOffset: [0, 0],
        // content: '123 v12',
        contentOffset: [0, 15],
        // contentLayout: '<div style="background: red; width: 50px; color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      }
    }
  }
}
</script>

<style>
.ymaps-2-1-79-controls__toolbar_right {
  margin-right: 45px !important;
  /*position: absolute !important;*/
  /*right: 10% !important;*/
}
</style>
