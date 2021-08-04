<template>
  <div class="history-tl-container">
    <ul class="tl">
      <li v-for="timeline in timelines" :key="timeline.distance" class="tl-item" ng-repeat="item in retailer_history">
<!--        <div class="timestamp">-->
<!--          3rd March 2015<br> 7:00 PM-->
<!--        </div>-->
          <div class="title">
            <div class="item-title"><span class="iconsminds-map-marker-2 marker red"></span>Coozin Home</div>
            <div class="item-title"><span class="iconsminds-map-marker-2 marker green"></span>{{ timeline.point }}</div>
            <div class="item-title"><span class="iconsminds-clock marker blue"></span>{{ timeline.time }}</div>
            <div class="item-title"><span class="iconsminds-scooter marker orange"></span>{{ timeline.distance }}</div>
          </div>
      </li>
<!--      <li class="tl-item" ng-repeat="item in retailer_history">-->
<!--&lt;!&ndash;        <div class="timestamp">&ndash;&gt;-->
<!--&lt;!&ndash;          19th March 2015<br> 3:00 PM&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--        <div class="item-title">Kill some Orcs</div>-->
<!--        <div class="item-detail">Don't enter the caves!!</div>-->
<!--      </li>-->
<!--      <li class="tl-item" ng-repeat="item in retailer_history">-->
<!--&lt;!&ndash;        <div class="timestamp">&ndash;&gt;-->
<!--&lt;!&ndash;          1st June 2015<br> 7:00 PM&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--        <div class="item-title">Throw that goddamn ring in the lava</div>-->
<!--        <div class="item-detail">Also, throw that Gollum too</div>-->
<!--      </li>-->
    </ul>
  </div>
</template>

<script>
export default {
  name: "TimeLine",
  data () {
    return {
      timelines: [
        {
          point: 'махалля Мирзо Улугбек, 7/2/24',
          time: '1 hour 32 minutes',
          distance: '7.3 km (7360 m)'
        },
        {
          point: 'махалля Акбаробод, 3/1/4',
          time: '2 hour 12 minutes',
          distance: '14.8 km (14810 m)'
        },
        {
          point: 'махалля Отчопар-2, 5/2/14',
          time: '26 minutes',
          distance: '2.4 km (2450 m)'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
$line-color: #ed7117;
.title {
  padding: 10px;
  //background: #ececec;
  border-radius: 10px;
  border-top-left-radius: 0;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
}
.marker {
  font-size: 16px;
  font-weight: bold;
  margin-right: 5px;
}
.red {
  color: red;
}
.green {
  color: green;
}
.blue {
  color: cornflowerblue;
}
.orange {
  color: $line-color;
}
.history-tl-container{
  //width:50%;
  //margin: auto;
  padding-right: 10px;
  display: block;
  position: relative;
}
.history-tl-container ul.tl{
  margin: 20px 0;
  width: 100%;
  padding: 0;
  display:inline-block;

}
.history-tl-container ul.tl li{
  list-style: none;
  margin:auto;
  //margin-left:200px;
  min-height: 50px;
  /*background: rgba(255,255,0,0.1);*/
  border-left:1px dashed $line-color;
  padding: 0 0 20px 20px;
  position:relative;
}
.history-tl-container ul.tl li:last-child{ border-left:0;}
.history-tl-container ul.tl li::before{
  position: absolute;
  left: -10px;
  top: 0px;
  content: " ";
  border: 8px solid rgba(255, 255, 255, 0.74);
  border-radius: 500%;
  background: $line-color;
  height: 20px;
  width: 20px;
  transition: all 500ms ease-in-out;

}
.history-tl-container ul.tl li:hover::before{
  border-color:  $line-color;
  transition: all 400ms ease-in-out;
}
ul.tl li .item-title{
  margin: 5px 0;
}
ul.tl li .item-detail{
  color:rgba(0,0,0,0.5);
  font-size:12px;
}
ul.tl li .timestamp{
  color: #8D8D8D;
  position: absolute;
  //width: 100px;
  left: -50%;
  text-align: right;
  font-size: 12px;
}
</style>
