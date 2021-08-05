<template>
  <div class="history-tl-container">
<!--    <div class="timeline">-->
      <ul class="tl">
        <li v-for="timeline in timelines" :key="timeline.distance" class="tl-item" ng-repeat="item in retailer_history">
          <div :class="`title ${ (route && route.coords && route.coords === timeline.coords) ? 'title_active' : '' }`">
            <div class="order_number">
              #1001100011
            </div>
            <div @click="setRoute(timeline)">
              <div class="item-title"><span class="iconsminds-map-marker-2 marker red"></span>Coozin Home</div>
              <div class="item-title"><span class="iconsminds-map-marker-2 marker green"></span>{{ timeline.point }}</div>
              <div class="item-title"><span class="iconsminds-clock marker blue"></span>{{ timeline.time }}</div>
              <div class="item-title"><span class="iconsminds-scooter marker orange"></span>{{ timeline.distance }}</div>
            </div>
            <div class="d-flex justify-content-between align-items-center pt-2">
              <span>Courier: </span>
              <v-select style="min-width: 180px;" :options="tickets" label="title" index="detail"/>
            </div>
          </div>
        </li>
      </ul>
<!--    </div>-->
  </div>
</template>

<script>
import tickets from "../../../data/tickets";
export default {
  name: "TimeLine",
  props: ['route'],
  data () {
    return {
      tickets,
      timelines: [
        {
          point: 'махалля Мирзо Улугбек, 7/2/24',
          time: '1 hour 32 minutes',
          distance: '7.3 km (7360 m)',
          coords: [
            [41.341908, 69.301433],
            [41.332883, 69.299342]
          ]
        },
        {
          point: 'махалля Акбаробод, 3/1/4',
          time: '2 hour 12 minutes',
          distance: '14.8 km (14810 m)',
          coords: [
            [41.319747, 69.290714],
            [41.329049, 69.273511]
          ]
        },
        {
          point: 'махалля Отчопар-2, 5/2/14',
          time: '26 minutes',
          distance: '2.4 km (2450 m)',
          coords: [
            [41.315371, 69.270112],
            [41.325344, 69.325486]
          ]
        }
      ]
    }
  },
  methods: {
    setRoute (timeline) {
      this.$emit('get', timeline.coords)
    }
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
  padding: 5px 10px;
}
</style>
