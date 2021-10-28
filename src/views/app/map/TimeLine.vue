<template>
  <div class="history-tl-container">
    <b-modal id="changeStatusModal" @hide="hide" v-model="assign.show" ref="changeStatusModal" :title="$t('do.you.want')">
      <h2>Назначить на: <strong>{{ assign.courier ? assign.courier.label : '' }}</strong></h2>
      <template slot="modal-footer">
        <b-button variant="outline-primary" @click="hide">{{ $t('cancel') }}</b-button>
        <b-button variant="primary">
              <span :class="{ 'spinner': assign.load, 'd-inline-block': true }">
                  <span class="bounce1"></span>
                  <span class="bounce2"></span>
                  <span class="bounce3"></span>
              </span>
          <span class="label" @click="assignCourier">OK</span>
        </b-button>
      </template>
    </b-modal>
<!--    <div class="timeline">-->
      <ul class="tl" v-if="items">
        <li v-for="item in items" :key="item.id" class="tl-item" ng-repeat="item in retailer_history">
<!--          <div :class="`title ${ (route && route.coords && route.coords === timeline.coords) ? 'title_active' : '' }`">-->
          <div :class="`title ${ parseInt($route.query.order_id) === item.id ? 'title_active' : '' }`" @click="viewItem(item)">
            <div class="order_number">
              #{{ item.id }}
            </div>
            <div :class="`order_status badge-outline-${badgeType(item.delivery_status ? item.delivery_status : 'accepted')}`">
              {{ $t(`order.${item.delivery_status ? item.delivery_status : 'accepted'}`) }}
            </div>
            <div style="width: 100%; margin-top: 25px">
                <div class="item-title"><span class="iconsminds-doctor marker orange"></span>{{ item.user.first_name }} {{ item.user.last_name }}</div>
                <div class="item-title"><span class="iconsminds-chef-hat marker info"></span>{{ item.vendor.user.first_name }} {{ item.vendor.user.last_name }}</div>
                <div class="item-title"><span class="iconsminds-map-marker-2 marker red"></span>{{ item.vendor.address }}</div>
                <div class="item-title"><span class="iconsminds-map-marker-2 marker green"></span>{{ item.user_address.address_name }}</div>
            </div>
            <hr v-if="isCourierAssign(item)">
            <div v-if="isCourierAssign(item)" class="d-flex justify-content-between align-items-center">
              <span>Назначить курьер: </span>
              <v-select style="min-width: 200px;" v-model="courier" :options="couriers" @input="changeCourier($event, item)"/>
            </div>
          </div>
        </li>
      </ul>
<!--    </div>-->
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "TimeLine",
  components: {},
  props: ['route', 'items'],
  data () {
    return {
      courier: null,
      assign: {
        show: false,
        courier: null,
        load: false,
        order: null
      }
    }
  },
  computed: {
    ...mapGetters(['dataOrders', 'dataCouriers']),
    couriers () {
      return this.dataCouriers.map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
  },
  methods: {
    isCourierAssign (order) {
      const _ = order
      return _ && (_.status === 'in_process') && (_.delivery_status === 'pending')
    },
    changeCourier (v, item) {
      if (this.courier) {
        this.assign = {
          show: true,
          courier: v,
          load: false,
          order: item
        }
      }
    },
    hide () {
      this.courier = null
      this.assign = {
        show: false,
        courier: null,
        load: false,
        order: null
      }
    },
    assignCourier () {
      console.log('assign')
      console.log(this.assign)
      this.assign.load = true
      this.$store.dispatch('assignCourier', {
        order_id: this.assign.order.id,
        courier_id: this.assign.courier.value
      }).then(res => {
        this.$store.dispatch('success_alert', {
          title: 'Успех',
          message: 'Действие успешно выполнено'
        })
        this.$emit('reload', 'success')
        this.hide()
      }).catch(err => {
        const _message = err.response.data.message
        this.$store.dispatch('error_alert', {
          title: 'Ошибка',
          message: _message
        })
      }).finally(() => {
        this.assign.load = false
      })
    },
    viewItem (item) {
      console.log(this.$route.query.order_id)
      console.log(item.id)
      if (this.$route.query.order_id) {
        if (this.$route.query.order_id != item.id) {
          this.$router.push({
            name: this.$route.name,
            query: {
              order_id: item.id
            }
          })
          this.$emit('selectedItem', item)
        }
      } else {
        this.$router.push({
          name: this.$route.name,
          query: {
            order_id: item.id
          }
        })
        this.$emit('selectedItem', item)
      }
    },
    badgeType(type) {
      switch (type) {
        case 'pending': return 'info'
          break;
        case 'accepted': return 'secondary'
          break;
        case 'in_process': return 'primary'
          break;
        case 'shipping': return 'dark'
          break;
        case 'finished': return 'success'
          break;
        case 'cancelled': return 'danger'
          break;
        default: return 'primary'
          break;
      }
    },
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
  border-top-left-radius: 0;
  padding: 5px 10px;
}
.order_status {
  position: absolute;
  left: 0;
  top: 0;
  border-radius: inherit;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;
  padding: 5px 10px;
}
</style>
