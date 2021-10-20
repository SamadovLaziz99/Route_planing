<template>
  <div style="position: relative">
    <div class="loader_content" v-if="loadMapData">
      <b-card>
        <div class="text-center text-primary my-2 mt-1">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </b-card>
    </div>
    <div tabindex="1" @keyup="keyHandler($event)" id="map" ref="basicMap" class="yandexMap"></div>
    <div :class="`mapRightBar ${ rightBar ? 'mapRightBar_active' : '' }`">
      <div class="rightToggle" @click="rightBar = !rightBar">
<!--        <b-button @click="showPoints">Points</b-button>-->
        <div class="simple-icon-layers icon"></div>
      </div>
      <right-bar @selectedItem="selectedItem" :route="route"/>
    </div>
    <OrderMapDetailCard :order="order" @close="closeRouteDetails"/>
  </div>
</template>
<script>
import ymaps from 'ymaps'
import { bridge } from "../../../utils/bridge";
import { defaultMap } from "../../../constants/config";
import RightBar from "./RightBar";
import { timeFormat } from "../../../utils";
import OrderMapDetailCard from "../orders/OrderMapDetailCard";
// import way from './way'
import client from '@/assets/icons/client.png'
import chef from '@/assets/icons/chef.png'
import empty from '@/assets/icons/empty.png'
import busy from '@/assets/icons/active.png'
export default {
  components: {
    'right-bar': RightBar,
    OrderMapDetailCard
  },
  data () {
    return {
      images: {
        client,
        chef,
        empty,
        busy
      },
      rightBar: false,
      map: null,
      maps: null,
      order: null,
      loadMapData: false,
      selectedOrder: null,
      route: {
        stop: true,
        coords: []
      },
      geoObjects: {
        cookers: [],
        couriers: [],
        routedCouriers: [],
        route: null,
        client: null
      },
      coordinates: [ 41.312947, 69.280204 ],
    }
  },
  methods: {
    showPoints () {
      // this.$root.$emit('lollipop', 'lol')
      // bridge.$emit('lollipop', 'salom')
      console.log(this.geoObjects)
    },
    clickedMap (e) {
      this.rightBar = false
      this.route.stop = true
      const _coords = e.get('coords');
      this.coordinates = _coords
      this.map.panTo(_coords, { checkZoomRange: true })
      // this.routeCreator({
      //   mapStateAutoApply: true
      // })
    },
    getOneRoute (e) {
      this.rightBar = false
      this.route.coords = e
      this.route.stop = false
      // this.routeCreator({
      //   coords: e,
      //   mapStateAutoApply: true
      // })
      console.log('Route:', e)
    },
    clientPoint (el) {
      if (this.geoObjects.client) {
        this.map.geoObjects.remove(this.geoObjects.client)
      }
      const point = new this.maps.GeoObject(
        {
          geometry: {
            type: 'Point',
            coordinates: [
              parseFloat(el.latitude),
              parseFloat(el.longitude)
            ]
          },
          properties: {
            hintContent: el.name,
            balloonContentBody: `Coozin's client ${el.name}`,
            balloonContentFooter: "Coozin",
          }
        },
        {
          iconLayout: 'default#imageWithContent',
          iconImageHref: this.images.client,
          iconImageSize: [42,42],
          iconImageOffset: [-21, -42],
        }
      )
      this.geoObjects.client = point
      this.map.geoObjects.add(point)
    },
    homePoint (coords) {
      const point = new this.maps.GeoObject({
        geometry: {
          type: 'Point',
          coordinates: coords || defaultMap.home
        },
        properties: {
          iconContent: 'Coozin',
          hintContent: 'Coozin Home',
          balloonContentBody: "Coozin Home",
          balloonContentFooter: "Coozin",
        }
      },
      {
        preset: 'islands#redHomeCircleIcon',
        draggable: false,
      })
      this.map.geoObjects.add(point)
    },
    closeRouteDetails () {
      this.$router.push({ name: this.$route.name })
      this.map.geoObjects.remove(this.geoObjects.client)
      this.map.geoObjects.remove(this.geoObjects.route)
      this.geoObjects.routedCouriers.forEach(e => {
        this.map.geoObjects.remove(e.point)
      })
      this.geoObjects.routedCouriers = []
      this.selectedOrder = null
      this.order = null
      this.geoObjects.route = null
    },
    selectedItem (e) {
      this.selectedOrder = e
      const _coords = `${e.user_address.longitude + ',' + e.user_address.latitude}~${e.vendor.longitude + ',' + e.vendor.latitude}`
      this.$store.dispatch('getRouteValhalla', {
        to: [ e.user_address.longitude, e.user_address.latitude],
        from : [e.vendor.longitude, e.vendor.latitude]
      }).then(res => {
        this.order = {
          ...e,
          route: res
        }
        let _client = {
          id: e.id,
          longitude: e.user_address.longitude,
          latitude: e.user_address.latitude,
          name: e.user.first_name + ' ' + e.user.last_name
        }
        this.clientPoint(_client)
        this.oneRouteCreator({
          coords: [
            [parseFloat(e.vendor.latitude), parseFloat(e.vendor.longitude)],
            [parseFloat(_client.latitude), parseFloat(_client.longitude)]
          ]
        })
        const _coord = [((parseFloat(e.vendor.latitude) + parseFloat(_client.latitude)) / 2 ), ((parseFloat(e.vendor.longitude) + parseFloat(_client.longitude)) / 2 )]
        this.map.setCenter(_coord, 14)
        this.map.panTo(_coord, { checkZoomRange: true })
        if (this.geoObjects.routedCouriers && this.geoObjects.routedCouriers.length) {
          this.geoObjects.routedCouriers.forEach(el => {
            this.map.geoObjects.remove(el.point)
          })
        }
        this.geoObjects.couriers.forEach(el => {
          const _el = el.el
          // const _user_coords = e.user_address.longitude + ',' + e.user_address.latitude
          this.$store.dispatch('getRouteValhalla', {
            to: [ e.user_address.longitude, e.user_address.latitude],
            from : [_el.location[0].longitude, _el.location[0].latitude]
          }).then(res => {
            // console.log(res)
            // console.log(timeFormat(res.time))
            this.routedCouriersPoint(_el, res)
          })
          // this.$store.dispatch('getOneRoute', `${_user_coords}~${_el.location[0].longitude + ',' + _el.location[0].latitude}`).then(res => {
          //   this.routedCouriersPoint(_el, res)
          // })
        })
        // this.geoObjects.couriers.forEach(e => {
        //   this.$store.dispatch('getOneRoute', _coords).then(res => {
        //
        //   })
        // })
      })
    },
    courierPoint (el) {
      const point = new this.maps.GeoObject(
        {
          geometry: {
            type: 'Point',
            coordinates: [
              parseFloat(el.location[0].latitude),
              parseFloat(el.location[0].longitude)
            ]
          },
          properties: {
            hintContent: el.name,
            balloonContentBody: `Coozin's ${el.name}`,
            balloonContentFooter: "Coozin",
          }
        },
        {
          iconLayout: 'default#imageWithContent',
          iconImageHref: el.location[0].order ? this.images.busy : this.images.empty,
          iconImageSize: [42,42],
          iconImageOffset: [-21, -42],
        }
      )
        this.geoObjects.couriers.push({
          el: el,
          point: point
        })
        this.map.geoObjects.add(point)
    },
    routedCouriersPoint (el, route) {
      const { hr, mn } = timeFormat(route.time)
      const _dis = route.length.toString()
      const distance = _dis.split('.')[1].length > 1 ? (_dis.split('.')[0] + '.' + _dis.split('.')[1].slice(0, 1)) : route.length
      const point = new this.maps.GeoObject(
        {
          geometry: {
            type: 'Point',
            coordinates: [
              parseFloat(el.location[0].latitude),
              parseFloat(el.location[0].longitude)
            ]
          },
          properties: {
            hintContent: el.name,
            balloonContentBody: `Coozin's ${el.name}`,
            balloonContentFooter: "Coozin",
          }
        },
        {
          iconLayout: 'default#imageWithContent',
          iconImageHref: this.images.empty,
          iconImageSize: [42,42],
          iconImageOffset: [-21, -42],
          iconContentOffset: [-60, 44],
          iconContentLayout: this.maps.templateLayoutFactory.createClass(
            `<div class="marker_content" style="
                box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px !important;
                background: white !important;
                padding: 5px !important;
                border-radius: 4px !important;
                width: 180px !important;
                color: #000 !important;
                display: flex !important;
                justify-content: center !important;
            ">
                    <div><span class="iconsminds-clock marker orange"></span>${hr !== '' ? (hr + ' ' + this.$t('hr')) : '' } ${mn !== '' ? (mn + ' ' + this.$t('min')) : '' }</div>
                    <div class="ml-1"><span class="iconsminds-scooter marker blue" style="font-size: 18px"></span>${distance + ' ' + this.$t('km')}</div>
            </div>`
          )
        }
      )
      this.geoObjects.routedCouriers.push({
        el: el,
        point: point
      })
      this.map.geoObjects.add(point)
    },
    cookerPoint (el, name) {
      const point = new this.maps.GeoObject(
        {
          geometry: {
            type: 'Point',
            coordinates: [
              parseFloat(el.latitude),
              parseFloat(el.longitude)
            ]
          },
          properties: {
            iconContent: 'Vendors',
            hintContent: name,
            balloonContentBody: `Coozin's ${name}`,
            balloonContentFooter: "Coozin",
          }
        },
        {
          iconLayout: 'default#image',
          iconImageHref: this.images.chef,
          iconImageSize: [42, 42],
        }
        // {
        //   preset: 'islands#blueFoodCircleIcon',
        //   draggable: false,
        // }
      )
      this.geoObjects.cookers.push({
        id: el.id,
        point: point
      })
      this.map.geoObjects.add(point)
    },
    oneRouteCreator (state) {
      if (this.geoObjects.route) {
        this.map.geoObjects.remove(this.geoObjects.route);
      }
      this.maps.route(state.coords, {
        multiRoute: true,
        mapStateAutoApply: state?.mapStateAutoApply,
      }).done(function (route) {
        console.log(route)
        route.options.set("mapStateAutoApply", true);
        this.geoObjects.route = route
        this.map.geoObjects.add(route);
      }, function (err) {
        throw err;
      }, this);
    },
    routeCreator (state) {
      const _oldRoute = this.geoObjects.route
      if (_oldRoute) this.map.geoObjects.remove(_oldRoute)
      if (!this.route.stop) {
        this.maps.route(state.coords, {
          multiRoute: true,
          mapStateAutoApply: state?.mapStateAutoApply,
        }).done(function (route) {
          console.log(route)
          // console.log(route.getWayPoints().getLength())
          // console.log(route.model.getReferencePoints())
          route.options.set("mapStateAutoApply", true);
          this.geoObjects.route = route
          this.map.geoObjects.add(route);
        }, function (err) {
          throw err;
        }, this);
      }
    },
    realTimeCourier (el) {
      const _oldItem = this.geoObjects.couriers.filter(e => e.el.id === el.id)[0]
      const _oldItemWithRouted = this.geoObjects.routedCouriers.filter(e => e.el.id === el.id)[0]
      const _index = this.geoObjects.couriers.indexOf(_oldItem)
      const _indexWithRouted = this.geoObjects.routedCouriers.indexOf(_oldItemWithRouted)
      setTimeout(() => {
        this.map.geoObjects.remove(_oldItem.point)
        this.geoObjects.couriers.splice(_index, 1)

        if (this.geoObjects.routedCouriers.length > 0) {
          this.map.geoObjects.remove(_oldItemWithRouted.point)
          this.geoObjects.routedCouriers.splice(_indexWithRouted, 1)
        }

      }, 1)
      setTimeout(() => {
          if (this.geoObjects.routedCouriers.length > 0) {
            const _user_coords = this.selectedOrder.user_address.longitude + ',' + this.selectedOrder.user_address.latitude
            this.$store.dispatch('getOneRoute', `${_user_coords}~${el.location[0].longitude + ',' + el.location[0].latitude}`).then(res => {
              this.routedCouriersPoint(el, res)
            })
          }
        this.courierPoint(el)
        // this.map.geoObjects.remove(_oldItem.point)
      }, 2)
    },
    multiRoute () {
      const multiRoute = new this.maps.multiRouter.MultiRoute({
        referencePoints: [
          [41.321352, 69.289203],
          [41.313705, 69.280240]
        ],
        params: {
          routingMode: 'masstransit'
        }
      }, {
        boundsAutoApply: true
      });
      this.map.geoObjects.add(multiRoute);
    },
    drawPointers () {
      this.$store.getters.dataVendors.filter(e => (e.active && e.latitude)).forEach(e => {
        this.cookerPoint(e, (e.user.first_name + ' ' + e.user.last_name))
      })
      this.$store.getters.courierLocations.filter(e => (e.active && e.location[0].latitude)).forEach(e => {
        this.courierPoint(e)
      })
      // this.$store.dispatch('getRouteValhalla')
      // this.oneRouteCreator({
      //   coords: [
      //     [41.321352, 69.289203],
      //     [41.313705, 69.280240]
      //   ]
      // })
      // this.multiRoute()
    },
    initMap () {
      ymaps.load(defaultMap.api).then(maps => {
        this.maps = maps
        this.map = new maps.Map('map', {
          center: defaultMap.home,
          zoom: 15,
          controls: ['zoomControl', 'fullscreenControl']
        })
        console.log(this.map, this.maps)
        this.map.events.add('click', (e) => this.clickedMap(e))
        this.map.container.fitToViewport();
        this.loadMapData = true
        this.$store.dispatch('courierLocation').then(res => {
          this.$store.dispatch('getVendors', { no_page: true }).then(res => {
            this.drawPointers()
            this.loadMapData = false
          })
        })
        // setInterval(() => {
        //   this.courierRealTime(this.courierWay[this.count])
        //   this.count += this.vector
        // }, 1000)
      })
        .catch(error => console.log('Failed to load Yandex Maps', error))
    },
  },
  mounted() {
    bridge.$on('realTimeCourier', this.realTimeCourier)
    // this.$router.push({ name: this.$route.name })
  },
  created () {
    this.initMap()
  }
}
</script>
<style>

</style>
