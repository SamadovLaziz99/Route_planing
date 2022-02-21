<template>
  <div>
    <b-row v-if="!error">
      <b-colxx class="disable-text-selection">
        <list-page-heading
          :title="$t('menu.orders_history')"
          :rangepicker="true"
          :changeOrderBy="changeOrderBy"
          :searchChange="searchChange"
          :from="from"
          :to="to"
          :total="pagination.total"
          :perPage="15"
        >
          <b-button
            slot="action"
            variant="primary"
            size="lg"
            :class="{ 'top-right-button': true }"
            class="ml-2"
            @click="excelReport"
          ><span class="iconsminds-data-download mr-2"></span>Экспорт Excel
          </b-button>
          <b-row style="padding: 0 10px">
            <b-colxx xxs="12" md="2">
              <b-form-group :label="$t('vendors')" class="has-float-label mb-2">
                <v-select v-if="$route.name === 'order_history'" v-model="filters.vendor" @input="changeVendor"
                          style="width: 100%" class="mb-2" :options="vendors" :placeholder="$t('vendors')"/>
              </b-form-group>
            </b-colxx>
            <b-colxx xxs="12" md="2">
              <b-form-group :label="$t('foods')" class="has-float-label mb-2">
                <v-select v-if="$route.name === 'order_history'" v-model="filters.food" @input="changeFood"
                          style="width: 100%" class="mb-2" :options="foods" :placeholder="$t('foods')"/>
              </b-form-group>
            </b-colxx>
            <b-colxx xxs="12" md="2">
              <b-form-group :label="$t('couriers')" class="has-float-label mb-2">
                <v-select v-if="$route.name === 'order_history'" v-model="filters.courier" @input="changeCouriers"
                          style="width: 100%" class="mb-2" :options="couriers" :placeholder="$t('couriers')"/>
              </b-form-group>
            </b-colxx>
            <b-colxx xxs="12" md="2">
              <b-form-group :label="$t('payment_type')" class="has-float-label mb-2">
                <v-select v-if="$route.name === 'order_history'" v-model="filters.payment_type" @input="changePaymentType"
                          style="width: 100%" class="mb-2" :options="payment_types" :placeholder="$t('payment_type')"/>
              </b-form-group>
            </b-colxx>
            <b-colxx xxs="12" md="2">
              <b-form-group :label="$t('price.from')" class="has-float-label mb-4">
                <b-form-input type="number" v-model="filters.order_price_from" @input="priceRangerChange"/>
              </b-form-group>
            </b-colxx>
            <b-colxx xxs="12" md="2">
              <b-form-group :label="$t('price.to')" class="has-float-label mb-4">
                <b-form-input type="number" v-model="filters.order_price_to" @input="priceRangerChange"/>
              </b-form-group>
            </b-colxx>
            <b-colxx xxs="12" md="4">
              <b-form-group :label="$t('date.picker')" class="has-float-label mb-4">
                <DateRangePicker :placeholder="$t('forms.date')" @input="changeDatePicker" rangeSeparator=">" v-model="date" :dayStr="[
                    $t('day.sun'),
                    $t('day.mon'),
                    $t('day.tue'),
                    $t('day.wed'),
                    $t('day.thu'),
                    $t('day.fri'),
                    $t('day.sat'),
                  ]"/>
              </b-form-group>
            </b-colxx>
            <b-colxx xxs="12" md="3">
              <b-form-group :label="$t('category')" class="has-float-label mb-2">
                <v-select v-if="$route.name === 'order_history'" v-model="filters.category" @input="changeFood"
                          style="width: 100%" class="mb-2" :options="categorys" :placeholder="$t('category')"/>
              </b-form-group>
            </b-colxx>
            <b-colxx xxs="12" md="3">
              <b-form-group :label="$t('search')" class="has-float-label mb-2">
                <b-input v-if="$route.name === 'order_history'" class="search_input"
                         :placeholder="$t('search') + ', ' + $t('menu.users') + ', ' + $t('phone')" @input="search"
                         v-model="filters.search"/>
              </b-form-group>
            </b-colxx>
            <b-colxx xxs="12" md="2">
              <b-form-group :label="$t('id')" class="has-float-label mb-2">
                <b-input v-if="$route.name === 'order_history'" type="number"
                         :placeholder="$t('id')" @input="search"
                         v-model="filters.order_id"/>
              </b-form-group>
            </b-colxx>
            <b-colxx xxs="12" md="4">
              <p v-if="allStats">Total Order Price: <strong>{{new Intl.NumberFormat('en-US', {style: 'decimal'}).format(allStats.total_order_prices)  }}</strong></p>
            </b-colxx>
            <b-colxx xxs="12" md="4">
              <p v-if="allStats">Total Delivery Price: <strong>{{ new Intl.NumberFormat('en-US', {style: 'decimal'}).format(allStats.total_delivery_prices) }}</strong></p>
            </b-colxx>
            <b-colxx xxs="12" md="4">
              <div class="float-md-right pt-1">
                <span class="text-muted text-small mr-1 mb-2">{{ from }}-{{ to }} {{ $t('of') }} {{ pagination.total }}</span>
              </div>
            </b-colxx>
          </b-row>
        </list-page-heading>
        <b-tabs class="m-0" v-model="activeTab" @input="changeTabs">
          <b-tab style="padding: 0.6rem" v-for="tab in orderStatsHistory" :key="tab.name">
            <template #title>
              <div style="display: flex">
                <div style="margin-right: 10px">{{ $t(tab.name) }}</div>
                <b-badge variant="primary" v-if="tab.count > 0">{{ tab.count }}</b-badge>
              </div>
            </template>
          </b-tab>
        </b-tabs>
        <b-card :title="$t(`order.${$route.query.type}`)" class="mb-4">
          <b-table
            hover
            :items="data"
            :fields="fields"
            :busy="load"
            show-empty
            responsive
          >
            <template #empty>
              <EmptyBox style="margin-top: 50px"/>
            </template>
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>{{ $t('loading') }}...</strong>
              </div>
            </template>
            <template #cell(action)="{ item }">
              <div style="display: flex">
                <div @click="$router.push({ name: 'order_details', params: { id: item.id } })" class="glyph-icon simple-icon-eye mr-2 w-100 text-center action_button" id="view_button" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
              </div>
            </template>
            <template #cell(status)="{ item }">
              <b-badge pill :variant="badgeType(item.status)">{{ $t(`order.${item.status}`) }}</b-badge>
            </template>
            <template #cell(time)="{ item }">
              {{ moment(item.created_at).format('YYYY-MM-DD HH:mm') }}
            </template>
            <template #cell(id)="{ item }">
              <div>#{{ item.id }}</div>
            </template>
            <template #cell(delivery_time)="{ item }">
              {{ moment(item.delivery_time).format('YYYY-MM-DD HH:mm') }}
            </template>
            <template #cell(payment_type)="{ item }">
              <div v-if="item.payment_type === 'cash'" style="font-size: 28px" class="iconsminds-dollar text-primary"></div>
              <div v-if="item.payment_type === 'balance'" style="font-size: 28px" class="iconsminds-wallet text-primary"></div>
              <div v-if="item.payment_type === 'card'" style="font-size: 28px" class="simple-icon-credit-card text-primary"></div>
            </template>
            <template #cell(vendor)="{ item }">
              {{ item.vendor.user.first_name + ' ' + item.vendor.user.last_name }}
            </template>
            <template #cell(customer)="{ item }">
              {{ item.user.first_name + ' ' + item.user.last_name }}
            </template>
          </b-table>
          <Pagination v-if="!load" :page="pagination.page" :per-page="pagination.limit" :total="pagination.total" @changePagination="changePagination"/>
        </b-card>
      </b-colxx>
    </b-row>
    <error-page v-else :error="error"/>
  </div>
</template>

<script>
import ListPageHeading from "./Heading";
import Pagination from "../../../components/TableComponents/Pagination";
import { actions, getters } from "../../../utils/store_schema";
import EmptyBox from "../../../components/EmptyBox";
import { mapGetters } from "vuex";
import debounce from "debounce";
import { DateRangePicker } from '@livelybone/vue-datepicker'
import moment from "moment";
const _page = 'orders'
const { get, getById } = actions(_page)

export default {
  components: {
    "list-page-heading": ListPageHeading,
    Pagination,
    EmptyBox,
    DateRangePicker
    // TableSimple
  },
  data() {
    this.search = debounce(this.search, 800)
    this.priceRangerChange = debounce(this.priceRangerChange, 1500)
    return {
      activeTab: 0,
      fields: [
        {
          key: 'id',
          label: this.$t('id'),
          tdClass: 'firstColumn'
        },
        {
          key: 'customer',
          label: this.$t('customer'),
          tdClass: 'firstColumn'
        },
        {
          key: 'vendor',
          label: this.$t('vendor'),
          tdClass: 'text-muted'
        },
        {
          key: 'additional_phone',
          label: this.$t('phone'),
          tdClass: 'text-muted'
        },
        {
          key: 'payment_type',
          label: this.$t('payment_type'),
          tdClass: 'text-muted',
          class: 'text-center'
        },
        {
          key: 'order_price',
          label: this.$t('order_price'),
          tdClass: 'text-muted',
          class: 'text-center'
        },
        {
          key: 'delivery_price',
          label: this.$t('delivery_price'),
          tdClass: 'text-muted',
          class: 'text-center'
        },
        {
          key: 'time',
          label: this.$t('order_time'),
          tdClass: 'text-muted'
        },
        {
          key: 'delivery_time',
          label: this.$t('delivery_time'),
          tdClass: 'text-muted'
        },
        {
          key: 'status',
          label: this.$t('status'),
          class: 'text-center'
          // tdClass: 'secondColumn'
        },
        {
          key: 'action',
          label: this.$t('action'),
          class: 'text-center'
        }
      ],
      page: 1,
      from: 0,
      to: 0,
      date: [],
      payment_types: [
        {
          label: this.$t('cash'),
          value: 'cash'
        },
        {
          label: this.$t('wallet'),
          value: 'balance'
        },
        {
          label: this.$t('card'),
          value: 'card'
        }
      ],
      filters: {
        type: 'pending',
        order_id: null,
        search: null,
        vendor: null,
        food: null,
        category: null,
        courier: null,
        payment_type: null,
        order_date_from: null,
        order_date_to: null,
        order_price_from: null,
        order_price_to: null
      }
    };
  },
  methods: {
    moment,
    priceRangerChange (e) {
      this.routePusher()
      this.getData()
    },
    excelReport () {
      const {
        search,
        vendor,
        food,
        courier,
        payment_type,
        type,
        category,
        order_id,
        order_date_to,
        order_date_from,
        order_price_to,
        order_price_from,
        transaction_status
      } = this.filters
      const link = document.createElement('a')
      link.href = process.env.VUE_APP_BASE_URL + `/orders/download/?q=${search ? '&q=' + search : ''}&status=${type || ''}${transaction_status ? '&transaction_status=' + transaction_status : ''}${vendor?.value ? '&vendor_id=' + vendor.value : ''}${food?.value ? '&food_id=' + food.value : ''}${payment_type?.value ? '&payment_type=' + payment_type.value : ''}${courier?.value ? '&courier_id=' + courier.value : ''}${category?.value ? '&courier_id=' + category.value : ''}${order_id ? '&order_id=' + order_id : ''}${order_date_to ? '&order_date_to=' + order_date_to : ''}${order_date_from ? '&order_date_from=' + order_date_from : ''}${order_price_to ? '&order_price_to=' + order_price_to : ''}${order_price_from ? '&order_price_from=' + order_price_from : ''}`
      // link.href = process.env.VUE_APP_BASE_URL + `/orders/download/?q=${search || ''}&status=${type || ''}&delivery_status=${delivery_status || ''}&transaction_status=${transaction_status || 0}&vendor_id=${vendor?.value || 0}&food_id=${food?.value || 0}&payment_type=${payment_type?.value || 0}${courier?.value ? '&courier_id=' + courier.value : ''}`
      console.log(link.href)
      link.setAttribute('download', 'Report')
      document.body.appendChild(link)
      link.click()
    },
    // priceToRangerChange (e) {
    //   if (e && e.length) {
    //     this.filters.order_price_to = parseInt(e)
    //     this.routePusher()
    //     this.getData()
    //   }
    // },
    changeDatePicker (e) {
      if (e && e.length) {
        this.filters.order_date_from = e[0]
        this.filters.order_date_to = e[1]
      } else {
        this.filters.order_date_from = null
        this.filters.order_date_to = null
      }
      this.routePusher()
      this.getData()
    },
    search (e) {
      this.page = 1
      this.routePusher()
      this.getData()
    },
    changeVendor (e) {
      this.page = 1
      this.routePusher()
      this.getData()
    },
    changeFood (e) {
      this.page = 1
      this.routePusher()
      this.getData()
    },
    changeCouriers (e) {
      this.page = 1
      this.routePusher()
      this.getData()
    },
    changePaymentType (e) {
      this.page = 1
      this.routePusher()
      this.getData()
    },
    changePagination (e) {
      this.page = e
      this.getData()
    },
    changeTabs (e) {
      this.findRoutesWithKey(e)
    },
    routePusher () {
      let _query = { ...this.$route.query }
      _query.food_id = this.filters.food?.value,
      _query.courier_id = this.filters.courier?.value,
      _query.vendor_id = this.filters.vendor?.value,
      _query.category_id = this.filters.category?.value,
      _query.q = this.filters.search,
      _query.id = this.filters.order_id,
      _query.payment_type = this.filters.payment_type?.value
      _query.date_from = this.filters.order_date_from
      _query.date_to = this.filters.order_date_to
      _query.price_from = this.filters.order_price_from
      _query.price_to = this.filters.order_price_to
      this.$router.push({
        name: this.name,
        query: _query
      }).catch(() => {})
    },
    changeActiveTab(e) {
      this.activeTab = e
    },
    changeRoutetypeWithKey(type) {
      let _query = { ...this.$route.query }
      _query.type = type
      this.page = 1
      this.filters.type = type
      this.$router.push({
        name: this.name,
        query:_query
      }).catch(() => {})
      this.getData()
    },
    findRoutesWithKey (key) {
      switch (key) {
        case 0: this.changeRoutetypeWithKey('finished')
          break;
        case 1: this.changeRoutetypeWithKey('cancelled')
          break;
        default: break;
      }
    },
    badgeType(type) {
      switch (type) {
        case 'pending': return 'info'
          break;
        case 'accepted': return 'secondary'
          break;
        case 'in_process': return 'light'
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
    findTabsWithType (type) {
      switch (type) {
        case 'pending': this.changeActiveTab(0)
          break;
        case 'accepted': this.changeActiveTab(1)
          break;
        case 'in_process': this.changeActiveTab(2)
          break;
        case 'shipping': this.changeActiveTab(3)
          break;
// case 'finished': this.changeActiveTab(4)
//   break;
// case 'cancelled': this.changeActiveTab(5)
//   break;
        default: break;
      }
    },
    changeOrderBy(sort) {
      this.sort = sort;
    },
    searchChange(val) {
      this.search = val;
      this.page = 1;
    },
    getData () {
      const _ = {
        page: this.page,
        status: this.$route.query.type,
        food_id: this.filters.food?.value,
        vendor_id: this.filters.vendor?.value,
        courier_id: this.filters.courier?.value,
        category_id: this.filters.category?.value,
        q: this.filters.search,
        order_id: this.filters.order_id || undefined,
        payment_type: this.filters.payment_type?.value,
        order_date_to: this.filters.order_date_to || undefined,
        order_date_from: this.filters.order_date_from || undefined,
        order_price_to: this.filters.order_price_to ? parseInt(this.filters.order_price_to) : undefined,
        order_price_from: this.filters.order_price_from ? parseInt(this.filters.order_price_from) : undefined
      }
      const __ = { ..._ }
      delete __.page
      delete __.status
      this.$store.dispatch('getOrderStats', __)
      this.$store.dispatch(get, _).then(res => {

        this.to = this.pagination.page * 15 > this.pagination.total ? this.pagination.total : this.pagination.page * 15
        this.from = (this.pagination.page - 1) * 15
      })
    }
  },
  computed: {
    ...mapGetters(getters(_page)),
    ...mapGetters(['orderStatsHistory', 'dataVendors', 'allStats', 'dataFood', 'dataCouriers', 'dataCategories']),
    vendors () {
      return this.dataVendors.map(e => {
        const { first_name, last_name } = e.user
        return {
          label: first_name + ' ' + last_name,
          value: e.id
        }
      })
    },
    foods () {
      return this.dataFood.map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
    couriers () {
      return this.dataCouriers.map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
    },
    categorys () {
      return this.dataCategories.map(e => {
        return {
          label: e.name[this.$lang],
          value: e.id
        }
      })
    }
  },
  watch: {},
  mounted() {
    this.$store.commit('LOAD_ORDERS', true)
    const _query = this.$route.query
     this.$store.dispatch('getVendors', { no_page: true })
     this.$store.dispatch('getFood', { no_page: true })
     this.$store.dispatch('getCouriers', { no_page: true })
     this.$store.dispatch('getCategories', { no_page: true })
    const _hash = this.$route.hash
    let _page;
    if (_hash) {
      _page = this.$route.hash.split('-')[1]
      this.page = parseInt(_page)
    }
    if (_query) {
      const { food_id, courier_id, vendor_id, id, q, type, category_id, payment_type, date_from, date_to, price_from, price_to } = _query
      this.filters.food = this.foods.filter(e => e.value === parseInt(food_id))[0]
      this.filters.vendor = this.vendors.filter(e => e.value === parseInt(vendor_id))[0]
      this.filters.courier = this.couriers.filter(e => e.value === parseInt(courier_id))[0]
      this.filters.category = this.categorys.filter(e => e.value === parseInt(category_id))[0]
      this.filters.payment_type = this.payment_types.filter(e => e.value === parseInt(payment_type))[0]
      this.filters.search = q
      this.filters.order_id = id
      this.filters.type = type
      this.date = [date_from, date_to]
      this.filters.order_date_from = date_from
      this.filters.order_date_to = date_to
      this.filters.order_price_from = price_from
      this.filters.order_price_to = price_to
      setTimeout(() => {
        this.findTabsWithType(type)
        this.getData()
      }, 100)
    }
  }
};
</script>






