<template>
  <div>
    <b-row v-if="!error">
      <b-colxx class="disable-text-selection" style="padding: 0">
        <list-page-heading
          :title="$t('menu.orders_history')"
          :rangepicker="false"
          :changeOrderBy="changeOrderBy"
          :sort="sort"
          :searchChange="searchChange"
          :from="from"
          :to="to"
          :total="pagination.total"
          :perPage="15"
        ></list-page-heading>
        <b-tabs card v-model="activeTab" @input="changeTabs">
          <b-tab style="padding: 0.6rem" v-for="tab in orderStatsHistory" :key="tab.name">
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
          >
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(action)="{ item }">
              <div style="display: flex">
                <div @click="$router.push({ name: 'order_details', params: { id: item.id } })" class="glyph-icon simple-icon-eye mr-2 w-100 text-center action_button" id="view_button" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
                <!--                <div class="glyph-icon simple-icon-pencil mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280"></div>-->
                <!--                <div class="glyph-icon simple-icon-trash mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280"></div>-->
              </div>
            </template>
            <template #cell(status)="{ item }">
              <b-badge pill :variant="badgeType(item.status)">{{ $t(item.status) }}</b-badge>
            </template>
            <template #cell(time)="{ item }">
              {{ moment(item.created_at).format('YYYY-MM-DD HH:mm') }}
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
import { mapGetters } from "vuex";
import moment from "moment";
const _page = 'orders'
const { get, getById } = actions(_page)

export default {
  components: {
    "list-page-heading": ListPageHeading,
    Pagination
    // TableSimple
  },
  data() {
    return {
      activeTab: 0,
      isLoad: false,
      sort: {
        column: "title",
        label: "Product Name"
      },
      search: "",
      tabs: [
        { name: 'order.finished', count: 15 },
        { name: 'order.cancelled', count: 20 },
      ],
      fields: [
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
      to: 0
    };
  },
  methods: {
    moment,
    changePagination (e) {
      this.page = e
      this.getData()
    },
    changeTabs (e) {
      this.findRoutesWithKey(e)
    },
    routePusher (query) {
      this.$router.push({
        name: this.name,
        query: query
      }).catch(() => {})
    },
    changeActiveTab(e) {
      this.activeTab = e
    },
    changeRoutetypeWithKey(type) {
      let _query = { ...this.$route.query }
      _query.type = type
      this.page = 1
      this.routePusher(_query)
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
        case 'all': this.changeActiveTab(0)
          break;
        case 'pending': this.changeActiveTab(1)
          break;
        case 'accepted': this.changeActiveTab(2)
          break;
        case 'in_process': this.changeActiveTab(3)
          break;
        case 'shipping': this.changeActiveTab(4)
          break;
        case 'finished': this.changeActiveTab(5)
          break;
        case 'cancelled': this.changeActiveTab(6)
          break;
        default: break;
      }
    },
    // changePageSize(limit) {
    //   this.pagination.page = 1
    //   this.pagination.limit = limit
    //   let _query = { ...this.$route.query }
    //   _query.page = 1
    //   _query.limit = limit
    //   this.routePusher(_query)
    //
    // },
    changeOrderBy(sort) {
      this.sort = sort;
    },
    searchChange(val) {
      this.search = val;
      this.page = 1;
    },
    getData () {
      this.$store.dispatch('getOrderStats')
      this.$store.dispatch(get, {
        page: this.page,
        status: this.$route.query.type
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
    ...mapGetters([
      'orderStatsHistory'
    ])
  },
  watch: {
    search() {
      this.page = 1;
    },
  },
  mounted() {
    const _hash = this.$route.hash
    let _page;
    if (_hash) {
      _page = this.$route.hash.slice(this.$route.hash.length - 1)
      this.page = parseInt(_page)
    }
    const { type } = this.$route.query
    if (!type) {
      this.$router.push({ name: this.$route.name, query: { type: 'finished' } })
      this.getData()
    } else {
      setTimeout(() => {
        this.findTabsWithType(type)
        this.getData()
      }, 100)
    }
    // this.loadItems();
  }
};
</script>
