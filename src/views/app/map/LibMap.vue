<template>
  <div>
    <yandex-map :coords="center" :zoom="15" class="yandexMap" map-type="map" :controls="['zoomControl', 'fullscreenControl', 'trafficControl']">
      <ymap-marker
        v-for="cr in courierLocations"
        :marker-id="cr.location[0].id"
        :coords="[parseFloat(cr.location[0].latitude), parseFloat(cr.location[0].longitude)]"
        :hint-content="cr.name"
        :icon="iconGenerator(icons.empty)"
      ></ymap-marker>
      <ymap-marker
        v-for="vendor in dataVendors"
        :marker-id="'chef' + vendor.id"
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
    this.$store.dispatch('getVendors', {
      no_page: true
    })
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
