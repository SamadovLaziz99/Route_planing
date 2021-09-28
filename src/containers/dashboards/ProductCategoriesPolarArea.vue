<template>
  <b-card :title="name">
    <div class="dashboard-donut-chart">
      <polar-area-chart :data="chart" shadow />
    </div>
  </b-card>
</template>
<script>
import PolarAreaChart from "../../components/Charts/PolarArea";
// import { polarAreaChartData } from "../../data/charts";
import { ThemeColors } from '../../utils'
const colors = ThemeColors()
export default {
  props: ['name', 'items'],
  components: {
    "polar-area-chart": PolarAreaChart
  },
  computed: {
    chart () {
      return {
          labels: this.items.map(e => e.food__category__name[this.$lang]),
          datasets: [
          {
            data: this.items.map(e => e.count),
            borderWidth: 2,
            borderColor: [colors.themeColor1, colors.themeColor2, colors.themeColor3],
            backgroundColor: [
              colors.themeColor1,
              colors.themeColor1_10,
              colors.themeColor2_10,
              colors.themeColor3,
              colors.themeColor2
            ]
          }
        ]
      }
    }
  }
};
</script>
