<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <b-row>
          <b-colxx xxs="12" md="6">
            <piaf-breadcrumb :heading="$t('analytics')" />
          </b-colxx>
          <b-colxx xxs="12" md="3">
            <datepicker
              clear-button
              clear-button-icon="simple-icon-close"
              format="yyyy-MM-dd"
              v-model="filter.startDate"
              :bootstrap-styling="true"
              :placeholder="$t('start.date')"
            ></datepicker>
          </b-colxx>
          <b-colxx xxs="12" md="3">
            <datepicker
              clear-button
              format="yyyy-MM-dd"
              v-model="filter.endDate"
              clear-button-icon="simple-icon-close"
              :bootstrap-styling="true"
              :placeholder="$t('end.date')"
            ></datepicker>
          </b-colxx>
        </b-row>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xl="6" lg="12">
        <transition name="fade">
          <icon-cards-carousel v-if="statsTop" :stats="statsTop"></icon-cards-carousel>
        </transition>
        <b-row>
          <b-colxx md="12" class="mb-4">
            <transition name="fade">
              <sales-chart-card v-if="statsWeek && statsMonth && chartOff" :title="orderStatsWeek ? $t('weekly') : $t('monthly')" :chart-data="orderStatsWeek ? statsWeek : statsMonth" @changeStatus="changeOrderStatus"></sales-chart-card>
            </transition>
          </b-colxx>
        </b-row>
      </b-colxx>
      <b-colxx lg="12" xl="6" class="mb-4">
        <transition name="fade">
          <recent-orders v-if="statsFoods && statsFoods.length" :items="statsFoods" name="top_foods"></recent-orders>
        </transition>
      </b-colxx>
<!--      <b-colxx lg="12" xl="3" class="mb-4">-->
<!--        <transition name="fade">-->
<!--          <recent-orders v-if="statsNotSoldFoods && statsNotSoldFoods.length" :items="statsNotSoldFoods" name="not_sold_foods"></recent-orders>-->
<!--        </transition>-->
<!--      </b-colxx>-->
    </b-row>
    <b-row>
      <b-colxx lg="4" md="12" class="mb-4">
        <product-categories-polar-area v-if="statsCategories" :name="$t('top_categories')" :items="statsCategories.toplist"></product-categories-polar-area>
<!--        <transition name="fade">-->
<!--          <tickets v-if="statsVendors" name="Vendors" :items="statsVendors"></tickets>-->
<!--        </transition>-->
      </b-colxx>
      <b-colxx lg="4" md="6" class="mb-4">
        <transition name="fade">
          <logs v-if="statsCategories" name="orders_by_categories" :items="statsCategories.all"></logs>
        </transition>
      </b-colxx>
      <b-colxx lg="4" md="6" class="mb-4">
        <transition name="fade">
          <tickets v-if="statsUsers" name="top_users" :items="statsUsers"></tickets>
        </transition>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xl="6" lg="12" class="mb-4">
        <transition name="fade">
          <best-sellers v-if="statsVendors" :title="$t('top_vendors')" :items="statsVendors"></best-sellers>
        </transition>
      </b-colxx>
      <b-colxx xl="6" lg="12" class="mb-4">
        <transition name="fade">
          <best-couriers v-if="statsCouriers && statsCouriers.length" :title="$t('top_couriers')" :items="statsCouriers"></best-couriers>
        </transition>
      </b-colxx>
<!--      <b-colxx xl="6" lg="12" class="mb-4">-->
<!--        <transition name="fade">-->
<!--          <calendar v-if="statsVendors"></calendar>-->
<!--&lt;!&ndash;          <best-sellers v-if="statsVendors" :title="$t('top_vendors')" :items="statsVendors"></best-sellers>&ndash;&gt;-->
<!--        </transition>-->
<!--      </b-colxx>-->
    </b-row>
    <div v-if="!statsFoods && !statsCategories && !statsMonth && !statsTop && !statsUsers && !statsWeek && !statsVendors && !statsCouriers && !statsNotSoldFoods" class="text-center text-primary my-2">
      <b-spinner class="align-middle"></b-spinner>
      <strong>{{ $t('loading') }}...</strong>
    </div>
<!--    <b-row>-->
<!--      <b-colxx sm="12" lg="4" class="mb-4">-->
<!--        <profile-statuses></profile-statuses>-->
<!--      </b-colxx>-->
<!--      <b-colxx md="6" lg="4" class="mb-4">-->
<!--        <gradient-card>-->
<!--          <b-badge pill variant="theme-3" class="align-self-start mb-3">{{ $t('dashboards.piaf') }}</b-badge>-->
<!--          <p class="lead text-white">{{ $t('dashboards.magic-is-in-the-details') }}</p>-->
<!--          <p class="text-white">{{ $t('dashboards.yes-it-is-indeed') }}</p>-->
<!--        </gradient-card>-->
<!--      </b-colxx>-->
<!--      <b-colxx md="6" lg="4" class="mb-4">-->
<!--        <cakes></cakes>-->
<!--      </b-colxx>-->
<!--    </b-row>-->
<!--    <sortable-statictics-row></sortable-statictics-row>-->
<!--    <b-row>-->
<!--      <b-colxx sm="12" md="6" class="mb-4">-->
<!--        <website-visit-chart-card></website-visit-chart-card>-->
<!--      </b-colxx>-->
<!--      <b-colxx sm="12" md="6" class="mb-4">-->
<!--        <converconversion-rates-chart-card></converconversion-rates-chart-card>-->
<!--      </b-colxx>-->
<!--    </b-row>-->
<!--    <b-row>-->
<!--      <b-colxx lg="12" md="6" xl="4">-->
<!--        <b-row>-->
<!--          <b-colxx lg="4" xl="12" class="mb-4">-->
<!--            <gradient-with-radial-progress-card-->
<!--              icon="iconsminds-clock"-->
<!--              :title="`5 ${$t('dashboards.files')}`"-->
<!--              :detail="$t('dashboards.pending-for-print')"-->
<!--              :percent="5*100/12"-->
<!--              progressText="5/12"-->
<!--            />-->
<!--          </b-colxx>-->
<!--          <b-colxx lg="4" xl="12" class="mb-4">-->
<!--            <gradient-with-radial-progress-card-->
<!--              icon="iconsminds-male"-->
<!--              :title="`4 ${$t('dashboards.orders')}`"-->
<!--              :detail="$t('dashboards.on-approval-process')"-->
<!--              :percent="4*100/6"-->
<!--              progressText="4/6"-->
<!--            />-->
<!--          </b-colxx>-->
<!--          <b-colxx lg="4" xl="12" class="mb-4">-->
<!--            <gradient-with-radial-progress-card-->
<!--              icon="iconsminds-bell"-->
<!--              :title="`8 ${$t('dashboards.alerts')}`"-->
<!--              :detail="$t('dashboards.waiting-for-notice')"-->
<!--              :percent="8*100/10"-->
<!--              progressText="8/10"-->
<!--            />-->
<!--          </b-colxx>-->
<!--        </b-row>-->
<!--      </b-colxx>-->
<!--      <b-colxx lg="6" md="6" xl="4" sm="12" class="mb-4">-->
<!--        <advanced-search></advanced-search>-->
<!--      </b-colxx>-->
<!--      <b-colxx lg="6" xl="4" class="mb-4">-->
<!--        <small-line-charts itemClass="dashboard-small-chart"></small-line-charts>-->
<!--        <top-rated-items></top-rated-items>-->
<!--      </b-colxx>-->
<!--    </b-row>-->
  </div>
</template>

<script>
import GradientCard from "../../../components/Cards/GradientCard";
import GradientWithRadialProgressCard from "../../../components/Cards/GradientWithRadialProgressCard";
import AdvancedSearch from "../../../containers/dashboards/AdvancedSearch";
import BestSellers from "../../../containers/dashboards/BestSellers";
import Cakes from "../../../containers/dashboards/Cakes";
import Calendar from "../../../containers/dashboards/Calendar";
import ConversionRatesChartCard from "../../../containers/dashboards/ConversionRatesChartCard";
import IconCardsCarousel from "../../../containers/dashboards/IconCardsCarousel";
import Logs from "../../../containers/dashboards/Logs";
import Tickets from "../../../containers/dashboards/Tickets";
import ProductCategoriesPolarArea from "../../../containers/dashboards/ProductCategoriesPolarArea";
import ProfileStatuses from "../../../containers/dashboards/ProfileStatuses";
import RecentOrders from "../../../containers/dashboards/RecentOrders";
import SalesChartCard from "../../../containers/dashboards/SalesChartCard";
import SmallLineCharts from "../../../containers/dashboards/SmallLineCharts";
import SortableStaticticsRow from "../../../containers/dashboards/SortableStaticticsRow";
import TopRatedItems from "../../../containers/dashboards/TopRatedItems";
import WebsiteVisitsChartCard from "../../../containers/dashboards/WebsiteVisitsChartCard";
import BestCouriers from "../../../containers/dashboards/BestCouriers";
import { mapGetters } from "vuex";
import moment from "moment";
import axios from "axios";
export default {
  components: {
    "advanced-search": AdvancedSearch,
    "best-sellers": BestSellers,
    "best-couriers": BestCouriers,
    cakes: Cakes,
    calendar: Calendar,
    "converconversion-rates-chart-card": ConversionRatesChartCard,
    "icon-cards-carousel": IconCardsCarousel,
    logs: Logs,
    tickets: Tickets,
    "product-categories-polar-area": ProductCategoriesPolarArea,
    "profile-statuses": ProfileStatuses,
    "recent-orders": RecentOrders,
    "sales-chart-card": SalesChartCard,
    "small-line-charts": SmallLineCharts,
    "sortable-statictics-row": SortableStaticticsRow,
    "top-rated-items": TopRatedItems,
    "website-visit-chart-card": WebsiteVisitsChartCard,
    "gradient-card": GradientCard,
    "gradient-with-radial-progress-card": GradientWithRadialProgressCard
  },
  data () {
    return {
      orderStatsWeek: true,
      chartOff: true,
      filter: {
        startDate: null,
        endDate: null
      }
    }
  },
  computed: {
    ...mapGetters(['statsCategories', 'statsFoods', 'statsNotSoldFoods', 'statsMonth', 'statsTop', 'statsUsers', 'statsVendors', 'statsWeek', 'statsCouriers'])
  },
  watch: {
    'filter.startDate': function (val) {
      if (val) {
        if (val && this.filter.endDate) {
          const _param = {
            start_date: moment(this.filter.startDate).format('YYYY-MM-DD'),
            end_date: moment(this.filter.endDate).format('YYYY-MM-DD')
          }
          this.getData(_param)
        }
      } else {
        this.filter.endDate = null
        this.getData()
      }
    },
    'filter.endDate': function (val) {
      if (val) {
        if (val && this.filter.startDate) {
          const _param = {
            start_date: moment(this.filter.startDate).format('YYYY-MM-DD'),
            end_date: moment(this.filter.endDate).format('YYYY-MM-DD')
          }
          this.getData(_param)
        }
      } else {
        this.filter.startDate = null
        this.getData()
      }
    }
  },
  methods: {
    moment,
    changeOrderStatus (e) {
      console.log(e)
      this.chartOff = false
      this.orderStatsWeek = (e === 'Week')
      setTimeout(() => {
        this.chartOff = true
      })
    },
    async getData (params) {
      await this.$store.dispatch('statsTop', params)
      await this.$store.dispatch('statsWeek', params)
      await this.$store.dispatch('statsMonth', params)
      await this.$store.dispatch('statsFoods', params)
      await this.$store.dispatch('statsCategories', params)
      await this.$store.dispatch('statsUsers', params)
      await this.$store.dispatch('statsVendors', params)
      await this.$store.dispatch('statsCouriers', params)
    }
  },
  mounted() {
    this.getData()
  }
};
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
