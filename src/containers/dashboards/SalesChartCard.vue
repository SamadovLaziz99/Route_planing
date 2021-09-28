<template>
  <b-card :title="$t('sales')">
    <template #header>
      <b-dropdown style="position: absolute; right: 4%; top: 8%" variant="primary" right :text="title">
        <b-dropdown-item @click="changeStatus('Week')"> {{ $t('weekly') }} </b-dropdown-item>
        <b-dropdown-item @click="changeStatus('Month')"> {{ $t('monthly') }} </b-dropdown-item>
      </b-dropdown>
    </template>
    <div class="dashboard-line-chart">
      <line-chart :data="chart" shadow />
    </div>
  </b-card>
</template>
<script>
import LineChart from "../../components/Charts/Line";
// import { lineChartData } from "../../data/charts";
import moment from "moment";
import { ThemeColors } from '../../utils'
const colors = ThemeColors()
export default {
  props: ['chartData', 'title'],
  components: {
    "line-chart": LineChart
  },
  computed: {
    chart () {
      return {
        labels: this.chartData.map(e => this.moment(e.day).format('YYYY-MM-DD')) ,
        datasets: [
          {
            label: '',
            data: this.chartData.map(e => {
              console.log(e.amount)
              return e.amount
            }),
            borderColor: colors.themeColor1,
            pointBackgroundColor: colors.foregroundColor,
            pointBorderColor: colors.themeColor1,
            pointHoverBackgroundColor: colors.themeColor1,
            pointHoverBorderColor: colors.foregroundColor,
            pointRadius: 6,
            pointBorderWidth: 2,
            pointHoverRadius: 8,
            fill: false
          }
        ]
      }
    }
  },
  methods: {
    moment,
    changeStatus (e) {
      // this.status = e
      this.$emit('changeStatus', e)
    },
    refreshButtonClick() {
      console.log("refreshButtonClick");
    }
  }
};
</script>
