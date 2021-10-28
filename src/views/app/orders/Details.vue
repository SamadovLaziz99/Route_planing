<template>
  <div>
    <div v-if="!error">
      <div v-if="loadOne && !order" class="loading"></div>
      <div v-if="order">
        <b-modal id="changeStatusModal" @hide="hide" v-model="confirm.show" ref="changeStatusModal" :title="$t('do.you.want')">
          <h2>{{ confirm.cause }}</h2>
          <template slot="modal-footer">
            <b-button variant="outline-primary" @click="hide">{{ $t('cancel') }}</b-button>
            <b-button variant="primary">
              <span :class="{ 'spinner': confirm.load, 'd-inline-block': true }">
                  <span class="bounce1"></span>
                  <span class="bounce2"></span>
                  <span class="bounce3"></span>
              </span>
              <span class="label" @click="changeOrderStatus(confirm.type)">OK</span>
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
            <b-card class="mb-4" :title="orderEvents()">
                <b-form @submit.prevent="openConfirmModal('confirm')">
                  <b-row v-if="isConfirm">
                    <b-colxx xl="8" lg="12">
                      <b-form-input v-model.trim="$v.code.$model"  :state="!$v.code.$error" class="mb-4"></b-form-input>
                      <b-form-invalid-feedback v-if="!$v.code.required">Oбязательный</b-form-invalid-feedback>
                      <b-form-invalid-feedback v-if="!$v.code.minLength">Минимальная длина - 5 символов.</b-form-invalid-feedback>
                    </b-colxx>
                    <b-colxx xl="4" lg="12">
                      <div class="w-100" style="display: flex">
                        <b-button class="w-100 mb-2"  type="submit" variant="outline-primary">Oтправить</b-button>
                        <b-button :class="`mb-2 ml-2 ${!timer.show ? 'simple-icon-refresh' : ''}`" @click="changeOrderStatus('resend')">{{ timer.show ? timer.count : '' }}</b-button>
                      </div>
                    </b-colxx>
                  </b-row>
                </b-form>
              <b-button variant="outline-primary" v-if="isAccepted" @click="openConfirmModal('accept')" class="w-100 mb-2">Принято</b-button>
              <b-button variant="outline-primary" v-if="isInProccess" @click="openConfirmModal('process')" class="w-100 mb-2">В процессе</b-button>
              <b-button variant="outline-primary" v-if="isRequestDelivery" @click="openConfirmModal('reqdelivery')" class="w-100 mb-2">Запросить доставку</b-button>
              <b-row v-if="isCourierAssign">
                <b-colxx xl="8" lg="12">
                  <v-select :options="couriers" v-model="courier" class="mb-4"/>
                </b-colxx>
                <b-colxx xl="4" lg="12">
                  <b-button variant="outline-primary" class="w-100 mb-2" @click="openConfirmModal('assign')">Назначать</b-button>
                </b-colxx>
              </b-row>
              <b-button variant="outline-primary" v-if="isShipping" @click="openConfirmModal('shipping')" class="w-100 mb-2">В пути</b-button>
              <b-button variant="outline-primary" v-if="isFinished" @click="openConfirmModal('finish')" class="w-100 mb-2">Завершить заказ</b-button>
              <b-button v-if="isCancel" @click="openConfirmModal('cancel')" class="w-100 mb-2">Отменить заказ</b-button>
            </b-card>
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
                              <p style="font-size: 13px; line-height: 1; color:#f18024;  margin-top:5px; vertical-align:top; white-space:nowrap;">{{ food.count > 1 ? (food.count + ' x ') : '' }}{{ food.food.sale_price || food.food.price }} {{ $t('sum') }}</p>
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
import IconCardsCarousel from "./DetailsCard";
import { mapGetters } from 'vuex'
import { getters } from "../../../utils/store_schema";
import Tables from "../ui/components/Tables";
import { imageProxy } from "../../../utils";
import {required, minLength} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
export default {
  components: {
    Tables,
    "icon-cards-carousel": IconCardsCarousel
  },
  validations: {
    code: {
      required,
      minLength: minLength(5)
    }
  },
  mixins: [validationMixin],
  data() {
    return {
      coords: [41.324174, 69.290130],
      confirm: {
        show: false,
        cause: '',
        type: null,
        load: true
      },
      order: null,
      courier: null,
      code: null,
      timer: {
        show: false,
        decrementer: null,
        count: 59
      },
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
  watch: {
    'timer.count': function (val) {
      if (val < 1) {
        this.timer.show = false
        clearInterval(this.timer.decrementer)
      }
    }
  },
  computed: {
    ...mapGetters(getters('orders')),
    ...mapGetters(['orderFoods', 'dataCouriers']),
    isConfirm () {
      const _ = this.order
      return _ && (_.status === 'pending') && (_.payment_type === 'balance') && (_.transactions.length && (_.transactions[0].state === 0))
    },
    isAccepted () {
      const _ = this.order
      return _ &&
        (_.status === 'pending') &&
        ((_.payment_type === 'cash') || (_.transactions.length && (_.transactions[0].state === 5)))
    },
    isInProccess () {
      const _ = this.order
      return _ && _.status === 'accepted'
    },
    isRequestDelivery () {
      const _ = this.order
      return _ && (_.status === 'in_process') && (_.delivery_status === null)
    },
    isCourierAssign () {
      const _ = this.order
      return _ && (_.status === 'in_process') && (_.delivery_status === 'pending')
    },
    isCancel () {
      const _ = this.order
      return _ && _.status !== 'finished' && _.status !== 'cancelled'
    },
    isShipping () {
      const _ = this.order
      return _ && (_.status === 'in_process') && (_.delivery_status === 'in_process' || _.delivery_status === 'accepted')
    },
    isFinished () {
      const _ = this.order
      return _ && (_.status === 'shipping') && (_.delivery_status === 'in_process') && (_.transactions.length && (_.transactions[0].state === 5))
    },
    couriers () {
      return this.dataCouriers.map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    }
  },
  methods: {
    imageProxy,
    hide () {
      this.confirm = {
        show: false,
        cause: '',
        type: null,
        load: true
      }
    },
    error (err) {
      const _message = err.response.data.message
      this.$store.dispatch('error_alert', {
        title: 'Ошибка',
        message: _message
      })
    },
    success (res) {
      this.$store.dispatch('success_alert', {
        title: 'Успех',
        message: 'Действие успешно выполнено'
      })
      this.hide()
      setTimeout(() => {
        document.location.reload()
      }, 500)
    },
    orderEvents () {
      if (this.isConfirm) return 'Подтвердите заказ'
      if (this.isAccepted) return 'Принятый заказ'
      if (this.isInProccess) return 'Заказ в обработке'
      if (this.isShipping) return 'Доставка заказа'
      if (this.isRequestDelivery) return 'Запросить доставку'
      if (this.isCourierAssign) return 'Курьер Назначить'
      if (this.isFinished) return 'Готовый заказ'
      else return 'Никаких действий'
    },
    openConfirmModal (type) {
      if (type === 'confirm') { this.confirm = { show: true, load: false, cause: 'Подтвердить транзакцию !', type: 'confirm' }}
      if (type === 'accept') { this.confirm = { show: true, load: false, cause: 'Статус заказа изменен на Принято !', type: 'accept' }}
      if (type === 'process') { this.confirm = { show: true, load: false, cause: 'Статус заказа изменен на В процессе !', type: 'process' }}
      if (type === 'reqdelivery') { this.confirm = { show: true, load: false, cause: 'Запросить доставку !', type: 'reqdelivery' }}
      if (type === 'shipping') { this.confirm = { show: true, load: false, cause: 'Статус заказа изменен на Доставка !', type: 'shipping' }}
      if (type === 'assign') { this.confirm = { show: true, load: false, cause: 'Подтвердить назначение курьера !', type: 'assign' }}
      if (type === 'cancel') { this.confirm = { show: true, load: false, cause: 'Статус заказа изменен на Отменен !', type: 'cancel' }}
      if (type === 'finish') { this.confirm = { show: true, load: false, cause: 'Статус заказа изменен на Завершено !', type: 'finish' }}
    },
    changeOrderStatus (status) {
      if (status === 'confirm') {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          this.confirm.load = true
          this.$store.dispatch('confirmTransaction', {
            id: this.order.id,
            data: { code: this.code }
          }).then(this.success).catch(this.error).finally(() => { this.confirm.load = false })
        }
      } //
      if (status === 'resend') {
        if (!this.timer.show) {
          this.$store.dispatch('resendCode', this.order.id).then(res => {
            console.log(res)
            this.startTimer()
          }).catch(this.error)
        }
      } // ----
      if (status === 'accept') {
        this.confirm.load = true
        this.$store.dispatch('acceptOrder', this.order.id).then(this.success).catch(this.error).finally(() => { this.confirm.load = false })
      } //
      if (status === 'process') {
        this.confirm.load = true
        this.$store.dispatch('processOrder', this.order.id).then(this.success).catch(this.error).finally(() => { this.confirm.load = false })
      } //
      if (status === 'reqdelivery') {
        this.confirm.load = true
        this.$store.dispatch('requestDelivery', this.order.id).then(this.success).catch(this.error).finally(() => { this.confirm.load = false })
      }
      if (status === 'shipping') {
        this.confirm.load = true
        this.$store.dispatch('shippingOrder', this.order.id).then(this.success).catch(this.error).finally(() => { this.confirm.load = false })
      }
      if (status === 'assign') {
        if (this.courier) {
          this.confirm.load = true
          this.$store.dispatch('assignCourier', {
            order_id: this.order.id,
            courier_id: this.courier.value
          }).then(this.success).catch(this.error).finally(() => { this.confirm.load = false })
        }
      }
      if (status === 'cancel') {
        this.confirm.load = true
        // this.$store.dispatch('cancelOrder', this.order.id).then(this.success).catch(this.error).finally(() => { this.confirm.load = false })
      }
      if (status === 'finish') {
        this.confirm.load = true
        this.$store.dispatch('finishOrder', this.order.id).then(this.success).catch(this.error).finally(() => { this.confirm.load = false })
      }
    },
    startTimer () {
      this.timer.show = true
      this.timer.decrementer = setInterval(() => {
        this.timer.count --
      }, 1000)
    },
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
      this.foods = res.results
    })
    this.$store.dispatch('getByIdOrders', this.$route.params.id).then(res => {
      if (!this.isCourierAssign) this.$store.dispatch('getCouriers')
      this.order = res
      this.status = res.status
      console.log(this.order)
    })
  }
};
</script>
