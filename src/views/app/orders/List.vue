<template>
  <div>
    <b-row v-if="!error">
      <b-colxx class="disable-text-selection" style="padding: 0">
        <list-page-heading
          :title="$t('menu.orders_list')"
          :rangepicker="true"
          :changeOrderBy="changeOrderBy"
          :searchChange="searchChange"
          :from="from"
          :to="to"
          :total="pagination.total"
          :perPage="15"
        >
          <b-row style="padding: 0 10px">
            <b-colxx xxs="12" md="2">
                              <v-select v-if="$route.name === 'order_list'" v-model="filters.vendor" @input="changeVendor" style="width: 100%" class="mb-2" :options="vendors" :placeholder="$t('vendors')"/>
            </b-colxx>
            <b-colxx xxs="12" md="2">
                              <v-select v-if="$route.name === 'order_list'" v-model="filters.food" @input="changeFood" style="width: 100%" class="mb-2" :options="foods" :placeholder="$t('foods')"/>
            </b-colxx>
            <b-colxx xxs="12" md="2">
                              <v-select v-if="$route.name === 'order_list'" v-model="filters.courier" @input="changeCouriers" style="width: 100%" class="mb-2" :options="couriers" :placeholder="$t('couriers')"/>
            </b-colxx>
            <b-colxx xxs="12" md="2">
                              <v-select v-if="$route.name === 'order_list'" v-model="filters.payment_type" @input="changePaymentType" style="width: 100%" class="mb-2" :options="payment_types" :placeholder="$t('payment_type')"/>
            </b-colxx>
            <b-colxx xxs="12" md="3">
              <div class="d-inline-block mb-2 float-md-left align-top w-100">
                <b-input v-if="$route.name === 'order_list'" class="search_input" :placeholder="$t('menu.search') + ', ' + $t('menu.users') + ', ' + $t('phone')" @input="search" v-model="filters.search"  />
              </div>
            </b-colxx>
            <b-colxx xxs="12" md="1">
              <div class="float-md-right pt-1">
                <span class="text-muted text-small mr-1 mb-2">{{from}}-{{to}} of {{ pagination.total }}</span>
              </div>
            </b-colxx>
          </b-row>
        </list-page-heading>
        <b-tabs card v-model="activeTab" @input="changeTabs">
          <b-tab style="padding: 0.6rem" v-for="tab in orderStats" :key="tab.name">
            <template #title>
              <div style="display: flex">
                <div style="margin-right: 10px">{{ $t(tab.name) }}</div>
                <b-badge variant="primary" v-if="tab.count > 0">{{ tab.count }}</b-badge>
              </div>
            </template>
          </b-tab>
        </b-tabs>
        <b-card :title="$t(`order.${$route.query.type}`)">
          <b-table
            hover
            :items="data"
            :fields="fields"
            :busy="load"
            show-empty
          >
            <template #empty>
              <EmptyBox style="margin-top: 50px"/>
            </template>
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(action)="{ item }">
              <div style="display: flex">
                <div @click="$router.push({ name: 'order_details', params: { id: item.id } })" class="glyph-icon simple-icon-eye mr-2 w-100 text-center action_button" id="view_button" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
              </div>
            </template>
            <template #cell(status)="{ item }">
              <b-badge pill :variant="badgeType(item.status)">{{ $t(item.status) }}</b-badge>
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
import moment from "moment";
const _page = 'orders'
const { get, getById } = actions(_page)

export default {
  components: {
    "list-page-heading": ListPageHeading,
    Pagination,
    EmptyBox
    // TableSimple
  },
  data() {
    this.search = debounce(this.search, 800)
    return {
      activeTab: 0,
      fields: [
        {
          key: 'id',
          label: 'Id',
          tdClass: 'firstColumn'
        },
        {
          key: 'customer',
          label: 'Customer',
          tdClass: 'firstColumn'
        },
        {
          key: 'vendor',
          label: 'Vendor',
          tdClass: 'text-muted'
        },
        {
          key: 'additional_phone',
          label: 'Phone',
          tdClass: 'text-muted'
        },
        {
          key: 'payment_type',
          label: 'Payment Type',
          tdClass: 'text-muted',
          class: 'text-center'
        },
        {
          key: 'order_price',
          label: 'Order Price',
          tdClass: 'text-muted',
          class: 'text-center'
        },
        {
          key: 'time',
          label: 'Order Time',
          tdClass: 'text-muted'
        },
        {
          key: 'delivery_time',
          label: 'Delivery time',
          tdClass: 'text-muted'
        },
        {
          key: 'status',
          label: 'Status',
          class: 'text-center'
          // tdClass: 'secondColumn'
        },
        {
          key: 'action',
          label: 'Action',
          class: 'text-center'
        }
      ],
      page: 1,
      from: 0,
      to: 0,
      payment_types: [
        {
          label: 'Cash',
          value: 'cash'
        },
        {
          label: 'Card',
          value: 'card'
        }
      ],
      filters: {
        type: 'pending',
        search: null,
        vendor: null,
        food: null,
        courier: null,
        payment_type: null
      }
    };
  },
  methods: {
    moment,
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
      _query.q = this.filters.search,
      _query.payment_type = this.filters.payment_type?.value
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
        // case 0: this.changeRoutetypeWithKey('all')
        //   break;
        case 0: this.changeRoutetypeWithKey('pending')
          break;
        case 1: this.changeRoutetypeWithKey('accepted')
          break;
        case 2: this.changeRoutetypeWithKey('in_process')
          break;
        case 3: this.changeRoutetypeWithKey('shipping')
          break;
        // case 5: this.changeRoutetypeWithKey('finished')
        //   break;
        // case 6: this.changeRoutetypeWithKey('cancelled')
        //   break;
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
      this.$store.dispatch(get, {
        page: this.page,
        status: this.$route.query.type,
        food_id: this.filters.food?.value,
        vendor_id: this.filters.vendor?.value,
        courier_id: this.filters.courier?.value,
        q: this.filters.search,
        payment_type: this.filters.payment_type?.value
      }).then(res => {
        console.log(res)
        console.log(this.pagination)
        this.to = this.pagination.page * 15 > this.pagination.total ? this.pagination.total : this.pagination.page * 15
        this.from = (this.pagination.page - 1) * 15
      })
    }
  },
  computed: {
    ...mapGetters(getters(_page)),
    ...mapGetters(['orderStats', 'dataVendors', 'dataFood', 'dataCouriers']),
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
    }
  },
  watch: {},
  async mounted() {
    const _query = this.$route.query
    await this.$store.dispatch('getVendors')
    await this.$store.dispatch('getFood')
    await this.$store.dispatch('getCouriers')
    this.$store.dispatch('getOrderStats')
    const _hash = this.$route.hash
    let _page;
    if (_hash) {
      _page = this.$route.hash.slice(this.$route.hash.length - 1)
      this.page = parseInt(_page)
    }
    console.log(_query)
    if (_query) {
      const { food_id, courier_id, vendor_id, q, type, payment_type } = _query
      this.filters.food = this.foods.filter(e => e.value === parseInt(food_id))[0]
      this.filters.vendor = this.vendors.filter(e => e.value === parseInt(vendor_id))[0]
      this.filters.courier = this.couriers.filter(e => e.value === parseInt(courier_id))[0]
      this.filters.payment_type = this.payment_types.filter(e => e.value === parseInt(payment_type))[0]
      this.filters.search = q
      this.filters.type = type
      setTimeout(() => {
        this.findTabsWithType(type)
        this.getData()
      }, 100)
    }
  }
};
</script>
