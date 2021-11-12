<template>
  <div>
    <b-row v-if="!errorFood">
      <div v-if="oneLoadFood && !food" class="loading"></div>
      <b-colxx v-if="food" xxs="12">
        <h1>{{ food.name }}</h1>
<!--        <div class="top-right-button-container">-->
<!--          <b-dropdown-->
<!--            id="ddown5"-->
<!--            :text="$t('pages.actions')"-->
<!--            size="lg"-->
<!--            variant="outline-primary"-->
<!--            class="top-right-button top-right-button-single"-->
<!--            no-fade="true"-->
<!--          >-->
<!--            <b-dropdown-item>{{ $t('dashboards.last-week') }}</b-dropdown-item>-->
<!--            <b-dropdown-item>{{ $t('dashboards.this-month') }}</b-dropdown-item>-->
<!--          </b-dropdown>-->
<!--        </div>-->
        <piaf-breadcrumb/>
        <b-tabs nav-class="separator-tabs ml-0 mb-5" content-class="tab-content">
          <b-tab :title="$t('pages.details')">
            <b-row>
              <b-colxx xxs="12" lg="4" class="mb-4">
                <b-card class="mb-4" no-body>
                  <div class="position-absolute card-top-buttons">
                    <b-button variant="outline-white" class="icon-button">
                      <i class="simple-icon-pencil"/>
                    </b-button>
                  </div>
                  <img :src="foodImage" alt="Detail" class="card-img-top"/>
                  <b-card-body>
                    <p class="text-muted text-small mb-2">{{ $t('pages.description') }}</p>
                    <p class="mb-3">
                      {{ food.description }}
                    </p>
                    <p class="text-muted text-small mb-2">{{ $t('pages.rating') }}</p>
                    <div class="mb-3">
                      <stars :value="food.ratings_avg" :disabled="true"></stars>
                    </div>
                    <p class="text-muted text-small mb-2">{{ $t('pages.price') }}</p>
                    <p class="mb-3">{{ new Intl.NumberFormat().format(food.price) }} sum</p>
                    <p class="text-muted text-small mb-2">{{ $t('category') }}</p>
                    <p class="mb-3">{{ food.category.name[$lang]}}</p>
                    <p class="text-muted text-small mb-2">{{ $t('menu.unit') }}</p>
                    <p class="mb-3">{{ food.unit.name[$lang]}}</p>
                    <p class="text-muted text-small mb-2">{{ $t('preparation_time') }}</p>
                    <p class="mb-3">{{ food.preparation_time }} minutes</p>
                    <p class="text-muted text-small mb-2">{{ $t('pages.ingredients') }}</p>
                    <div class="mb-3">
                      <p class="d-sm-inline-block mb-1">
                        <b-badge v-for="ing in food.ingredients" :key="ing" pill variant="outline-secondary" class="mb-1 mr-1">{{ ing }}</b-badge>
                      </p>
                    </div>
                    <p class="text-muted text-small mb-2">{{ $t('created_at') }}</p>
                    <p>{{ moment(food.created_at).format('YYYY-MM-DD HH:mm') }}</p>
                    <p class="text-muted text-small mb-2">{{ $t('status') }}</p>
                    <switches theme="custom" color="primary-inverse"
                              class="vue-switcher-small"></switches>
                  </b-card-body>
                </b-card>
                <b-card :title="$t('food.vendor.location')" class="mb-4">
                  <yandex-map :coords="[food.vendor.latitude, food.vendor.longitude]" :zoom="15" class="map-item" map-type="map" :controls="['zoomControl']">
                    <ymap-marker marker-id="123" :coords="[food.vendor.latitude, food.vendor.longitude]" :hint-content="food.vendor.user.first_name + ' ' + food.vendor.user.last_name" ></ymap-marker>
                  </yandex-map>
                </b-card>
<!--                <radial-progress-card-->
<!--                  :title="$t('pages.order-status')"-->
<!--                  :percent="85"-->
<!--                  no-suffle-->
<!--                  class="mb-4"-->
<!--                />-->
<!--                <radial-progress-card-->
<!--                  :title="$t('pages.bake-progress')"-->
<!--                  :percent="40"-->
<!--                  no-suffle-->
<!--                  class="mb-4"-->
<!--                />-->
              </b-colxx>
              <b-colxx xxs="12" lg="8">
<!--                <small-line-charts itemClass="dashboard-small-chart" v-if="isLoad"></small-line-charts>-->
                <website-visit-chart-card class="mb-4"></website-visit-chart-card>
                <b-card v-if="food.video_url" class="mb-4" :title="$t('videos')">
                  <iframe style="border: none; outline: none; width: 100%; height: 400px" :src="food.video_url.replace('/watch?v=', '/embed/')">
                  </iframe>
                </b-card>
                <b-card class="mb-4" :title="$t('pages.comments')">
                  <comment-item
                    v-for="(comment,index) in ratings"
                    :key="index"
                    :data="comment"
                    detail-path="#"
                  />
                </b-card>
              </b-colxx>
            </b-row>
          </b-tab>
          <b-tab :title="$t('pages.orders')">
            <b-row v-if="orders.length">
              <b-colxx>
                <order-item
                  v-for="(order, index) in orders"
                  :key="index"
                  :data="order"
                  :detail-path="{ name: 'order_details', params: { id: order.id } }"
                />
              </b-colxx>
            </b-row>
            <EmptyBox v-else style="margin-top: 50px"/>
          </b-tab>
        </b-tabs>
      </b-colxx>
    </b-row>
    <error-page v-else :error="errorFood"/>
  </div>
</template>

<script>
import Stars from "../../../components/Common/Stars";
import RadialProgressCard from "../../../components/Cards/RadialProgressCard";
import CommentItem from "../../../components/Listing/CommentItem";
import OrderItem from "../../../components/Listing/OrderItem";
import {comments} from "../../../data/comments";
import EmptyBox from "../../../components/EmptyBox";
import SmallLineCharts from "../../../containers/dashboards/SmallLineCharts";
import WebsiteVisitsChartCard from "../../../containers/dashboards/WebsiteVisitsChartCard";
import { getters } from "../../../utils/store_schema";
import Switches from "vue-switches";
import moment from "moment";
import {mapGetters} from "vuex";

export default {
  components: {
    stars: Stars,
    EmptyBox,
    'switches': Switches,
    "radial-progress-card": RadialProgressCard,
    "comment-item": CommentItem,
    "order-item": OrderItem,
    "small-line-charts": SmallLineCharts,
    "website-visit-chart-card": WebsiteVisitsChartCard
  },
  data() {
    return {
      isLoad: false,
      comments: comments.slice(0, 5),
      food: null,
      defImage: '/assets/img/details/1.jpg',
      foodImage: null,
      ratings: [],
      orders: []
    };
  },
  methods: {
    moment
  },
  computed: {
    ...mapGetters(['errorFood', 'oneLoadFood']),
  },
  mounted() {
    this.$store.dispatch('getRatings', {
      food_id: this.$route.params.id
    }).then(res => {
      console.log('Ratings', res)
      this.ratings = res
    })
    this.$store.dispatch('getOrders', {
      food_id: this.$route.params.id
    }).then(res => {
      console.log(res)
    })
    this.$store.dispatch('getByIdFood', this.$route.params.id).then(res => {
      this.food = res
      console.log(res)
      this.foodImage = (res.media && res.media.length > 0) ? this.$imgProxy(res.media[0].url, '500x350') : this.defImage
    })
    this.$store.dispatch('getOrders', {
      food_id: this.$route.params.id
    }).then(res => {
      this.orders = res
    })
  }
};
</script>
