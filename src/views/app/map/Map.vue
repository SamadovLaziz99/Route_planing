<template>
  <div class="map_container">
    <div tabindex="1" @keyup="keyHandler($event)" id="map" ref="basicMap" class="yandexMap"></div>
    <div :class="`mapRightBar ${ rightBar ? 'mapRightBar_active' : '' }`">
      <div class="rightToggle" @click="rightBar = !rightBar">
        <div class="simple-icon-layers icon"></div>
      </div>
      <right-bar @getOneRoute="getOneRoute" :route="route"/>
    </div>
  </div>
</template>
<script>
import homeIcon from '../../../assets/img/pointers/home.svg'
import cookerIcon from '../../../assets/img/pointers/cooker.png'
import ymaps from 'ymaps'
import { defaultMap } from "../../../constants/config";
import RightBar from "./RightBar";
import way from './way'
export default {
  components: {
    'right-bar': RightBar
  },
  data () {
    return {
      rightBar: false,
      map: null,
      maps: null,
      count: 0,
      vector: 1,
      route: {
        stop: true,
        coords: []
      },
      geoObjects: {
        cookers: [],
        couriers: [],
        route: null
      },
      cookers: [
        [41.367250, 69.285450],
        [41.352607, 69.288931],
        [41.317424, 69.280236],
        [41.343303, 69.305773],
        [41.324419, 69.301903],
        [41.321352, 69.289203],
        [41.314956, 69.299522],
        [41.315629, 69.287863]
      ],
      couriers: [
        [41.358062, 69.275527],
        [41.339381, 69.260325],
        [41.330396, 69.283734],
        [41.315159, 69.289003],
        [41.311251, 69.268272],
        [41.307083, 69.294877]
      ],
      courierWay: way,
      home_coords: [
        [41.324174, 69.290130],
        [41.324759, 69.290031],
        [41.325001, 69.289160],
        [41.325194, 69.287582],
        [41.325534, 69.282935]
      ],
      coordinates: [ 41.312947, 69.280204 ],
      homeIcon: homeIcon,
      cookerIcon: cookerIcon
    }
  },
  watch: {
    count (val) {
      if (val > 136) this.vector = -1
      if (val < 1) this.vector = 1
    }
  },
  mounted() {

  },
  methods: {
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
    keyHandler (e) {
      console.log(e.code)
      console.log(this.geoObjects)
      if (e.code === 'KeyS') {
        // fs.writeFile('ways.json', {
        //   way: this.courierWay
        // })
        // for (let i = 0; i < this.geoObjects.couriers.length; i++) {
        //   this.map.geoObjects.remove(this.geoObjects.couriers[i])
        // }
      }
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
    pointSetter(oldPoint, newPoint) {
      const index = this.geoObjects.couriers.indexOf(oldPoint)
      this.geoObjects.couriers[index] = newPoint
      this.map.geoObjects.remove(oldPoint)
      this.map.geoObjects.add(newPoint)
    },
    courierRealTime (coords) {
      // this.map.panTo(coords, { checkZoomRange: true })
      const point = new this.maps.GeoObject({
        geometry: {
          type: 'Point',
          coordinates: coords
        },
        properties: {
          hintContent: 'Real Courier'
        }
      }, {
        preset: 'islands#greenAutoCircleIcon',
        draggable: false,
      })
      this.pointSetter(this.geoObjects.couriers[2], point)
      this.routeCreator({
        coords: [
          coords,
          defaultMap.home,
          this.route.coords[0]
        ]
      })
    },
    courierPoint (el, name) {
      const point = new this.maps.GeoObject({
        geometry: {
          type: 'Point',
          coordinates: [
            parseFloat(el.location[0].latitude),
            parseFloat(el.location[0].longitude)
          ]
        },
        properties: {
          hintContent: name,
          balloonContentBody: `Coozin's ${ name }`,
          balloonContentFooter: "Coozin",
        }
      }, {
        preset: 'islands#greenAutoCircleIcon',
        draggable: false,
      })
      this.geoObjects.couriers.push(point)
      this.map.geoObjects.add(point)
    },
    cookerPoint (coords, name) {
      const point = new this.maps.GeoObject({
        geometry: {
          type: 'Point',
          coordinates: coords
        },
        properties: {
          iconContent: 'Vendors',
          hintContent: name,
          balloonContentBody: `Coozin's ${ name }`,
          balloonContentFooter: "Coozin",
        }
      }, {
        preset: 'islands#blueFoodCircleIcon',
        draggable: false,
      })
      this.geoObjects.cookers.push(point)
      this.map.geoObjects.add(point)
    },
    oneRouteCreator (state) {
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
      this.homePoint()
      this.cookers.forEach((e, i) => {
        this.cookerPoint(e, `Vendor ${ i + 1 }`)
      })
      // this.couriers.forEach((e, i) => {
      //   this.courierPoint(e, `Courier ${ i + 1 }`)
      // })
      this.$store.getters.courierLocations.forEach(e => {
        this.courierPoint(e, e.name)
      })
      this.oneRouteCreator({
        coords: [
          [41.321352, 69.289203],
          [41.313705, 69.280240]
        ]
      })
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
        this.map.events.add('click', (e) => this.clickedMap(e))
        this.map.container.fitToViewport();
        this.$store.dispatch('courierLocation').then(res => {
          this.drawPointers()
        })
        // setInterval(() => {
        //   this.courierRealTime(this.courierWay[this.count])
        //   this.count += this.vector
        // }, 1000)
      })
        .catch(error => console.log('Failed to load Yandex Maps', error))
    },
  },
  created () {
    this.initMap()
  }
}
</script>
