<template>
  <div>
    <div v-if="reload" tabindex="1" @keyup="keyHandler($event)" id="map" ref="basicMap" class="map">
<!--      <div class="saveGeo">-->
<!--        <a-button @click="showMapData" type="default"><a-icon type="save" /> {{ $t('save_geo') }}</a-button>-->
<!--        <a-button @click="reset" style="margin-left: 5px" type="default"><a-icon type="reload" /> {{ $t('reset') }}</a-button>-->
<!--      </div>-->
    </div>
<!--    <div style="margin-top: 10px">-->
<!--      <p style="font-size: 14px; transform: translateY(10px)">{{ $t('name') }}</p>-->
<!--      <a-input v-model="name" />-->
<!--    </div>-->
<!--    <div style="display: flex; justify-content: flex-end; margin-top: 30px">-->
<!--      <a-button @click="$router.go(-1)" type="default">{{ $t('cancel') }}</a-button>-->
<!--      <a-button :loading="loading" @click="save" style="margin-left: 5px" type="primary">{{ $route.params.id ? $t('update') : $t('save') }}</a-button>-->
<!--    </div>-->
  </div>
</template>
<!--<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=679a08be-aa49-4a79-ad31-80c65dda374a" />-->
<script>
import homeIcon from '../../../assets/img/pointers/home.svg'
import cookerIcon from '../../../assets/img/pointers/cooker.png'
import ymaps from 'ymaps'
export default {
  data () {
    return {
      map: null,
      maps: null,
      reload: true,
      count: 0,
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
      home_coord: [41.324174, 69.290130],
      home_coords: [
        [41.324174, 69.290130],
        [41.324759, 69.290031],
        [41.325001, 69.289160],
        [41.325194, 69.287582],
        [41.325534, 69.282935]
      ],
      coordinates: [41.324174, 69.290130],
      homeIcon: homeIcon,
      cookerIcon: cookerIcon
    }
  },
  watch: {
    // coordinates () {
    //   ymaps.ready(this.initMap());
    // }
  },
  methods: {
    reloader () {
      setTimeout(() => {
        console.log('salom')
      }, 1)
      setTimeout(() => {
        console.log('alik')
      }, 2)
    },
    keyHandler (e) {
      console.log(e.code)
      this.homePoint(this.home_coords[4])
      console.log(this.map.geoObjects)
      // this.reloader()
      // this.map.geoObjects.each((collection) => {
      //   console.log(collection.get('target'))
        // console.log(collection.getGeoObjects())
        // collection.each((marker) => {
        //   const markerId = marker.properties.get('markerId');
        //   console.log(markerId)
        // })
      // })
      // if (e.code === 'KeyS') {
      //     if (this.count >= 0 && this.count < 6) this.count --
      //     this.homePoint(this.home_coords[this.count])
      //     this.coordinates = this.home_coords[this.count]
      // }
      // if (e.code === 'KeyW') {
      //   if (this.count >= 0 && this.count < 5) this.count ++
      //   this.homePoint(this.home_coords[this.count])
      //   this.coordinates = this.home_coords[this.count]
      // }
    },
    pointDown (e) {
      console.log('Down Pressed', e)
    },
    pointUp (e) {
      console.log('Up Pressed', e)
    },
    homePoint (coords) {
      const point = new this.maps.GeoObject({
        geometry: {
          type: 'Point',
          coordinates: coords || this.home_coord
        },
        properties: {
          iconContent: 'Coozin',
          hintContent: 'Coozin Home'
        }
      }, {
        preset: 'islands#redHomeCircleIcon',
        draggable: false,
        // iconLayout: 'default#image',
        // iconImageHref: this.homeIcon,
        // iconImageSize: [50, 42],
        // iconImageOffset: [-3, -42]
      })
      this.map.geoObjects.add(point)
    },
    courierPoint (coords, name) {
      const point = new this.maps.GeoObject({
        geometry: {
          type: 'Point',
          coordinates: coords
        },
        properties: {
          hintContent: name
        }
      }, {
        preset: 'islands#greenAutoCircleIcon',
        draggable: false,
        // iconLayout: 'default#image',
        // iconImageHref: this.homeIcon,
        // iconImageSize: [50, 42],
        // iconImageOffset: [-3, -42]
      })
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
          hintContent: name
        }
      }, {
        preset: 'islands#blueFoodCircleIcon',
        draggable: false,
        // iconLayout: 'default#image',
        // iconImageHref: this.cookerIcon,
        // iconImageSize: [50, 42],
        // iconImageOffset: [-3, -42]
      })
      this.map.geoObjects.add(point)
    },
    drawPointers () {
      this.homePoint()
      this.cookers.forEach((e, i) => {
        this.cookerPoint(e, `Vendor ${ i + 1 }`)
      })
      this.couriers.forEach((e, i) => {
        this.courierPoint(e, `Courier ${ i + 1 }`)
      })
    },
    initMap () {
      ymaps.load().then(maps => {
        this.maps = maps
        this.map = new maps.Map('map', {
          center: this.coordinates,
          zoom: 15,
          controls: ['zoomControl', 'fullscreenControl']
        })
        this.drawPointers()
      })
        .catch(error => console.log('Failed to load Yandex Maps', error))
    },
  },
  created () {
    this.initMap()
  }
}
</script>

<style>
.map {
  height: 680px;
  position: relative;
}
.saveGeo {
  /*border: 1px solid;*/
  position: absolute;
  display: flex;
  bottom: 2%;
  right: 1%;
  z-index: 5;
}
</style>
