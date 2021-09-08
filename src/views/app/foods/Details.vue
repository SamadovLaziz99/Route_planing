<template>
  <div>
    <b-row v-if="!errorFood">
      <b-colxx xxs="12">
        <h1>Details</h1>
        <div class="top-right-button-container">
          <b-dropdown
            id="ddown5"
            :text="$t('pages.actions')"
            size="lg"
            variant="outline-primary"
            class="top-right-button top-right-button-single"
            no-fade="true"
          >
            <b-dropdown-item>{{ $t('dashboards.last-week') }}</b-dropdown-item>
            <b-dropdown-item>{{ $t('dashboards.this-month') }}</b-dropdown-item>
          </b-dropdown>
        </div>
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
                  <img src="/assets/img/details/1.jpg" alt="Detail" class="card-img-top"/>
                  <b-card-body>
                    <p class="text-muted text-small mb-2">{{ $t('pages.description') }}</p>
                    <p class="mb-3">
                      It’s all about simplicity…Less is more. Chocolate Cake
                      exclusively brings you the classic chocolate cake.
                      This cake is the one you always dream of-moist cake
                      and creamy chocolate frosting.
                      <br/>
                      <br/>This cake proudly serves itself for a family
                      gathering, a dinner party, a birthday celebration, a
                      baby christening, and a gift to someone special or
                      simply to have on hand on the cake stand at home
                      served with an ice cold glass of milk!
                    </p>
                    <p class="text-muted text-small mb-2">{{ $t('pages.rating') }}</p>
                    <div class="mb-3">
                      <stars value="4" :disabled="true"></stars>
                    </div>
                    <p class="text-muted text-small mb-2">{{ $t('pages.price') }}</p>
                    <p class="mb-3">$8,14</p>
                    <p class="text-muted text-small mb-2">{{ $t('pages.ingredients') }}</p>
                    <div class="mb-3">
                      <p class="d-sm-inline-block mb-1">
                        <b-badge pill variant="outline-secondary" class="mb-1 mr-1">Flour</b-badge>
                        <b-badge pill variant="outline-secondary" class="mb-1 mr-1">Chocolate</b-badge>
                        <b-badge pill variant="outline-secondary" class="mb-1 mr-1">Caster Sugar</b-badge>
                        <b-badge pill variant="outline-secondary" class="mb-1 mr-1">Baking Powder</b-badge>
                        <b-badge pill variant="outline-secondary" class="mb-1 mr-1">Milk</b-badge>
                        <b-badge pill variant="outline-secondary" class="mb-1 mr-1">Eggs</b-badge>
                        <b-badge pill variant="outline-secondary" class="mb-1 mr-1">Vegetable Oil</b-badge>
                      </p>
                    </div>
                    <p class="text-muted text-small mb-2">{{ $t('pages.is-vegan') }}</p>
                    <p>No</p>
                  </b-card-body>
                </b-card>
                <radial-progress-card
                  :title="$t('pages.order-status')"
                  :percent="85"
                  no-suffle
                  class="mb-4"
                />
                <radial-progress-card
                  :title="$t('pages.bake-progress')"
                  :percent="40"
                  no-suffle
                  class="mb-4"
                />
              </b-colxx>
              <b-colxx xxs="12" lg="8">
                <small-line-charts itemClass="dashboard-small-chart" v-if="isLoad"></small-line-charts>
                <website-visit-chart-card class="mb-4"></website-visit-chart-card>
                <b-card class="mb-4" :title="$t('pages.comments')">
                  <comment-item
                    v-for="(comment,index) in comments"
                    :key="index"
                    :data="comment"
                    detail-path="#"
                  />
                </b-card>
              </b-colxx>
            </b-row>
          </b-tab>
          <b-tab :title="$t('pages.orders')">
            <b-row>
              <b-colxx>
                <!--                <div class="d-flex flex-grow-2 min-width-zero">-->
                <!--                  <b-card-body class="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">-->
                <!--                    <div class="list-item-heading mb-1 truncate w-40 w-xs-100">-->
                <!--                      Name-->
                <!--                    </div>-->
                <!--                    <p class="mb-1 text-muted text-small w-15 w-xs-100">Phone</p>-->
                <!--                    <p class="mb-1 text-muted text-small w-15 w-xs-100">Payment Type</p>-->
                <!--                    <p class="mb-1 text-muted text-small w-15 w-xs-100">Price</p>-->
                <!--                    <p class="mb-1 text-muted text-small w-15 w-xs-100">Order Time</p>-->
                <!--                    <p class="mb-1 text-muted text-small w-15 w-xs-100">Delivery Time</p>-->
                <!--                    <p class="mb-1 text-muted text-small w-15 w-xs-100">Date</p>-->
                <!--                    <p class="mb-1 text-muted text-small w-15 w-xs-100">Status</p>-->
                <!--&lt;!&ndash;                    <div class="w-15 w-xs-100 text-right">&ndash;&gt;-->
                <!--&lt;!&ndash;                      <b-badge pill variant="danger`">Status</b-badge>&ndash;&gt;-->
                <!--&lt;!&ndash;                    </div>&ndash;&gt;-->
                <!--                  </b-card-body>-->
                <!--                </div>-->
                <order-item
                  v-for="(order,index) in _oders"
                  :key="index"
                  :data="order"
                  detail-path="#"
                />
              </b-colxx>
            </b-row>
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
import orders from "../../../data/orders";
import SmallLineCharts from "../../../containers/dashboards/SmallLineCharts";
import WebsiteVisitsChartCard from "../../../containers/dashboards/WebsiteVisitsChartCard";
import { getters } from "../../../utils/store_schema";
import {mapGetters} from "vuex";

export default {
  components: {
    stars: Stars,
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
      orders
    };
  },
  methods: {},
  computed: {
    ...mapGetters(['errorFood']),
    _oders() {
      return this.orders.map(e => {
        return {
          ...e,
          id: '#1110222154',
          phone: '+998909963313',
          payment_type: 'cash',
          price: '586 $',
          time: '1 hour',
          delivery: 'Half hour',
        }
      })
    }
  },
  mounted() {
    this.$store.dispatch('getByIdFood', this.$route.params.id).then(res => {
      this.food = res
    })
  }
};
</script>
