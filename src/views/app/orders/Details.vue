<template>
  <div>
    <div v-if="!error">
      <div v-if="loadOne && !order" class="loading"></div>
      <div v-if="order">
        <b-modal id="changeStatusModal" ref="changeStatusModal" :title="$t('change.status')">
          <b-form-radio-group stacked class="pt-2" :options="statuses" v-model="status" />
          <template slot="modal-footer">
            <b-button @click="changeStatus" :class="{'btn-multiple-state btn-shadow': true, 'show-spinner': pendingStatus }" variant="primary">
              <span class="spinner d-inline-block">
                  <span class="bounce1"></span>
                  <span class="bounce2"></span>
                  <span class="bounce3"></span>
              </span>
              <span class="label">Change</span>
            </b-button>
          </template>
        </b-modal>
        <b-row>
          <b-colxx xxs="12">
            <h1>{{ $t('order.details') }} - #<strong>{{ $route.params.id }}</strong></h1>
            <piaf-breadcrumb/>
          </b-colxx>
        </b-row>
        <b-row>
          <b-colxx xl="6" lg="12">
            <icon-cards-carousel :item="order"></icon-cards-carousel>
            <b-card class="mb-4" no-body>
              <b-card-body>
                <b-card-title>{{ $t('user.details') }}</b-card-title>
                <div class="d-flex flex-row align-items-center mb-2">
                    <i :class="`initial-height text-primary simple-icon-user`" style="font-size: 18px"></i>
                  <div class="pl-3 pt-2 pr-2">
                      <p class="list-item-heading mb-1">{{ order.user.first_name }} {{ order.user.last_name }}</p>
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center mb-2">
                  <i :class="`initial-height text-primary simple-icon-phone`" style="font-size: 18px"></i>
                  <div class="pl-3 pt-2 pr-2">
                    <p class="list-item-heading mb-1">{{ order.user.phone }}</p>
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center mb-2">
                  <i :class="`initial-height text-primary simple-icon-location-pin`" style="font-size: 20px; margin-left: -5px"></i>
                  <div class="pl-2 pt-2 pr-2">
                    <p class="list-item-heading mb-1"> {{ order.user_address.address_name }} </p>
                  </div>
                </div>
              </b-card-body>
            </b-card>
            <b-row>
              <b-colxx md="12">
                <b-card v-if="order.user_address && order.vendor" class="mb-4" :title="$t('vendor.and.user.map')">
                  <yandex-map
                    :controls="['zoomControl']"
                    :coords="[parseFloat(order.user_address.latitude), parseFloat(order.user_address.longitude)]"
                    :zoom="15"
                    style="width: 100%; height: 300px"
                  >
                    <ymap-marker
                      :coords="[parseFloat(order.user_address.latitude), parseFloat(order.user_address.longitude)]"
                      marker-id="123"
                      :hint-content="order.user.first_name + ' ' + order.user.last_name"
                    />
                    <ymap-marker
                      :coords="[parseFloat(order.vendor.latitude), parseFloat(order.vendor.longitude)]"
                      marker-id="321"
                      :hint-content="order.vendor.user.first_name + ' ' + order.vendor.user.last_name"
                    />
                  </yandex-map>
                </b-card>
              </b-colxx>
            </b-row>
          </b-colxx>
          <b-colxx lg="12" xl="6">
            <b-card class="mb-4" no-body>
              <b-card-body>
                <b-card-title>{{ $t('vendor.details') }}</b-card-title>
                <div class="d-flex flex-row align-items-center mb-1">
                  <i :class="`initial-height text-primary simple-icon-user`" style="font-size: 18px"></i>
                  <div class="pl-3 pt-2 pr-2">
                    <p class="list-item-heading mb-1">{{ order.vendor.user.first_name }} {{ order.vendor.user.last_name }}</p>
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center mb-1">
                  <i :class="`initial-height text-primary simple-icon-phone`" style="font-size: 18px"></i>
                  <div class="pl-3 pt-2 pr-2">
                    <p class="list-item-heading mb-1">{{ order.vendor.user.phone }}</p>
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center mb-1">
                  <i :class="`initial-height text-primary simple-icon-location-pin`" style="font-size: 20px; margin-left: -5px"></i>
                  <div class="pl-2 pt-2 pr-2">
                    <p class="list-item-heading mb-1"> {{ order.vendor.address }} </p>
                  </div>
                </div>
                <p class="mt-3">{{ order.vendor.about_me }}</p>
              </b-card-body>
            </b-card>
            <b-card class="mb-4" v-if="order.courier" no-body>
              <b-card-body>
                <b-card-title>{{ $t('courier.details') }}</b-card-title>
                <div class="d-flex flex-row align-items-center mb-1">
                  <i :class="`initial-height text-primary simple-icon-user`" style="font-size: 18px"></i>
                  <div class="pl-3 pt-2 pr-2">
                    <p class="list-item-heading mb-1">{{ order.courier.name }}</p>
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center mb-1">
                  <i :class="`initial-height text-primary simple-icon-phone`" style="font-size: 18px"></i>
                  <div class="pl-3 pt-2 pr-2">
                    <p class="list-item-heading mb-1">{{ order.courier.phone  }}</p>
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center mb-1">
                  <i :class="`initial-height text-primary iconsminds-car`" style="font-size: 20px; margin-left: -5px"></i>
                  <div class="pl-2 pt-2 pr-2">
                    <p class="list-item-heading mb-1"> {{ order.courier.details.car_model }} - {{ order.courier.details.car_number }}</p>
                  </div>
                </div>
<!--                <p class="mt-3">{{ order.vendor.about_me }}</p>-->
              </b-card-body>
            </b-card>
            <b-card class="mb-4" :title="$t('foods')">
              <div style="height:auto !important; position:relative;width:100% !important; font-family: Helvetica,Arial,sans-serif !important;">
                <table style="width: 100%; margin:0;padding:25px;" heigth="auto">
                    <tbody>
<!--                    <tr>-->
<!--                      <td align="left" valign="center" style="padding-bottom:20px;border-top:0;height:100% !important;width:100% !important;">-->
<!--                        <img :src="$logo" class="w-20 h-20"/>-->
<!--                      </td>-->
<!--                      <td align="right" valign="center" style="padding-bottom:20px;border-top:0;height:100% !important;width:100% !important;">-->
<!--                        <span style="color: #8f8f8f; font-weight: normal; line-height: 2; font-size: 14px;">02.02.2019</span>-->
<!--                      </td>-->
<!--                    </tr>-->
                    <tr v-if="foods.length" style="width: 100%">
                      <td colSpan="3" style="padding-top:10px; width: 100%">
                        <table style="width: 100%">
                          <tr v-for="food in foods" :key="food.id">
                            <td style="padding-top:0px; padding-bottom: 20px; width:120px ">
                              <img :src="imageProxy(food.food.image, '320x320')" style="width: 100px; height: 75px; object-fit: cover; border-radius: 3px; " />
                            </td>
                            <td style="padding-top:0px; padding-bottom:20px;">
                              <h4 style="font-size: 15px;"><router-link :to="{ name: 'food_detail', params: { id: food.id } }" style="text-decoration: none; font-weight:500;">{{ food.food.name }}</router-link></h4>
                              <p style="font-size: 12px;">{{ food.food.description }}</p>
                            </td>
                            <td style="padding-top:0px; padding-bottom:20px; text-align: right;">
                              <p style="font-size: 13px; line-height: 1; color:#f18024;  margin-top:5px; vertical-align:top; white-space:nowrap;">{{ food.count > 1 ? (food.count + ' x ') : '' }}{{ food.food.price }} {{ $t('sum') }}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                </table>
                <table style="display: flex; justify-content: space-between">
                  <div></div>
                  <tbody>
                  <tr>
                    <td colSpan="2" style="padding-top:0px; padding-bottom:5px; text-align: right; color:#909090;">
                      <p style="font-size: 12px; line-height: 1; margin-top:5px; vertical-align:top;  margin-bottom: 0;">Subtotal:&nbsp;</p>
                    </td>
                    <td style="padding-top:0px; padding-bottom:5px; text-align: right; padding-left: 15px;">
                      <p style="font-size: 13px; line-height: 1; margin-top:5px; vertical-align:top; color:#f18024; white-space:nowrap; margin-bottom: 0;">{{ order.order_price }} {{ $t('sum') }}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" style="padding-top:0px; padding-bottom:5px; text-align: right; color:#909090;">
                      <p style="font-size: 12px; line-height: 1; margin-top:5px; vertical-align:top; margin-bottom: 0;">Shipping:&nbsp;</p>
                    </td>
                    <td style="padding-top:0px; padding-bottom:5px; text-align: right; padding-left: 15px;">
                      <p style="font-size: 13px; line-height: 1; margin-top:5px; vertical-align:top; color:#f18024; white-space:nowrap; margin-bottom: 0;">{{ order.delivery_price }} {{ $t('sum') }}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" style="padding-top:0px; padding-bottom:5px; text-align: right; color:#909090;">
                      <p style="font-size: 12px; line-height: 1; margin-top:5px; vertical-align:top; margin-bottom: 0;"><strong>Total:&nbsp;</strong></p>
                    </td>
                    <td style="padding-top:0px; padding-bottom:5px; text-align: right; padding-left: 15px;">
                      <p style="font-size: 13px; line-height: 1; margin-top:5px; vertical-align:top; color:#f18024; white-space:nowrap; margin-bottom: 0;"><strong>{{ order.total_price }} {{ $t('sum') }}</strong></p>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </b-card>
          </b-colxx>
        </b-row>
      </div>
    </div>
    <error-page v-else :error="error"/>
  </div>
</template>

<script>
// import BestSellers from "../../../containers/dashboards/BestSellers";
import Cakes from "../../../containers/dashboards/Cakes";
import ConversionRatesChartCard from "../../../containers/dashboards/ConversionRatesChartCard";
import IconCardsCarousel from "./DetailsCard";
import NewComments from "../../../containers/dashboards/NewComments";
import QuickPost from "../../../containers/dashboards/QuickPost";
import WebsiteVisitsChartCard from "../../../containers/dashboards/WebsiteVisitsChartCard";
import GradientWithRadialProgressCard from "../../../components/Cards/GradientWithRadialProgressCard";
import { mapGetters } from 'vuex'
import { getters } from "../../../utils/store_schema";
import Tables from "../ui/components/Tables";
import { blogCategories } from "../../../data/blog";
import { imageProxy } from "../../../utils";

export default {
  components: {
    Tables,
    // "best-sellers": BestSellers,
    cakes: Cakes,
    "converconversion-rates-chart-card": ConversionRatesChartCard,
    "icon-cards-carousel": IconCardsCarousel,
    "new-comments": NewComments,
    "quick-post": QuickPost,
    "gradient-with-radial-progress-card": GradientWithRadialProgressCard,
    "website-visit-chart-card": WebsiteVisitsChartCard
  },
  data() {
    return {
      coords: [41.324174, 69.290130],
      order: null,
      blogCategories,
      status: 'pending',
      pendingStatus: false,
      foods: [],
      statuses: [
        {
          text: this.$t('order.pending'),
          value: 'pending'
        },
        {
          text: this.$t('order.accepted'),
          value: 'accepted'
        },
        {
          text: this.$t('order.in_process'),
          value: 'in_process'
        },
        {
          text: this.$t('order.shipping'),
          value: 'shipping'
        },
        {
          text: this.$t('order.finished'),
          value: 'finished'
        },
        {
          text: this.$t('order.cancelled'),
          value: 'cancelled'
        }
      ],
    }
  },
  computed: {
    ...mapGetters(getters('orders')),
    ...mapGetters(['orderFoods'])
  },
  methods: {
    imageProxy,
    changeStatus () {
      this.pendingStatus = true
      this.$store.dispatch('changeStatusOrder', {
        id: this.order.id,
        data: {
          status: this.status
        }
      }).then(res => {
        this.order.status = this.status
        this.$refs.changeStatusModal.hide()
      }).finally(() => {
        this.pendingStatus = false
      })
    }
  },
  mounted() {
    this.$store.dispatch('getFoodOrders', this.$route.params.id).then(res => {
      console.log(res)
      this.foods = res.results
      console.log(this.foods)
    })
    // this.$store.dispatch('getOrderFoods', this.$route.params.id).then(res => {
    //   console.log(res)
    // })
    this.$store.dispatch('getByIdOrders', this.$route.params.id).then(res => {
      this.order = res
      this.status = res.status
      console.log(res)
    })
  }
};
</script>
