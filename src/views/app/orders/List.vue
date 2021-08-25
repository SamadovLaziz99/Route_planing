<template>
  <b-row>
    <b-colxx class="disable-text-selection" style="padding: 0">
      <list-page-heading
        :title="$t('menu.orders_list')"
        :selectAll="selectAll"
        :isSelectedAll="isSelectedAll"
        :isAnyItemSelected="isAnyItemSelected"
        :keymap="keymap"
        :rangepicker="true"
        :changeOrderBy="changeOrderBy"
        :changePageSize="changePageSize"
        :sort="sort"
        :searchChange="searchChange"
        :from="((pagination.page - 1) * pagination.limit) + 1"
        :to="(pagination.page * pagination.limit) > pagination.total ? pagination.total : (pagination.page * pagination.limit)"
        :total="pagination.total"
        :perPage="pagination.limit"
      ></list-page-heading>
      <b-tabs card v-model="activeTab" @input="changeTabs">
        <b-tab style="padding: 0.6rem">
          <template #title>
            <div style="display: flex">
              <div style="margin-right: 10px">{{ $t('order.all') }}</div>
              <b-badge variant="danger">77</b-badge>
            </div>
          </template>
        </b-tab>
        <b-tab style="padding: 0.6rem">
          <template #title>
            <div style="display: flex">
              <div style="margin-right: 10px">{{ $t('order.pending') }}</div>
              <b-badge variant="danger">15</b-badge>
            </div>
          </template>
        </b-tab>
        <b-tab style="padding: 0.6rem">
          <template #title>
            <div style="display: flex">
              <div style="margin-right: 10px">{{ $t('order.accepted') }}</div>
              <b-badge variant="danger">10</b-badge>
            </div>
          </template>
        </b-tab>
        <b-tab style="padding: 0.6rem">
          <template #title>
            <div style="display: flex">
              <div style="margin-right: 10px">{{ $t('order.in_progress') }}</div>
              <b-badge variant="danger">9</b-badge>
            </div>
          </template>
        </b-tab>
        <b-tab style="padding: 0.6rem">
          <template #title>
            <div style="display: flex">
              <div style="margin-right: 10px">{{ $t('order.shipping') }}</div>
              <b-badge variant="danger">20</b-badge>
            </div>
          </template>
        </b-tab>
        <b-tab style="padding: 0.6rem">
          <template #title>
            <div style="display: flex">
              <div style="margin-right: 10px">{{ $t('order.finished') }}</div>
              <b-badge variant="danger">15</b-badge>
            </div>
          </template>
        </b-tab>
        <b-tab style="padding: 0.6rem">
          <template #title>
            <div style="display: flex">
              <div style="margin-right: 10px">{{ $t('order.cancelled') }}</div>
              <b-badge variant="danger">8</b-badge>
            </div>
          </template>
        </b-tab>
      </b-tabs>
      <b-card :title="$t(`order.${$route.query.type}`)">
        <b-table
          hover
          :items="items"
          :fields="fields"
          select-mode="multi"
        >
          <template #cell(action)="row">
            <div style="display: flex">
              <div @click="$router.push({ name: 'orderDetails', params: { id: row.item.customer } })" class="glyph-icon simple-icon-eye mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
              <div class="glyph-icon simple-icon-pencil mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280"></div>
              <div class="glyph-icon simple-icon-trash mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280"></div>
            </div>
          </template>
          <template #cell(status)="row">
            <b-badge pill variant="primary">Pending</b-badge>
          </template>
          <template #cell(selection)="{ rowSelected }">
            <template v-if="rowSelected">
              <div class="glyph-icon simple-icon-check"></div>
            </template>
            <template v-else>
              <!--          <div class="glyph-icon simple-icon-user"></div>-->
            </template>
          </template>
        </b-table>
        <Pagination :page="pagination.page" :per-page="pagination.limit" :total="pagination.total" @changePagination="changePagination"/>
      </b-card>
    </b-colxx>
  </b-row>
</template>

<script>
import ListPageHeading from "./Heading";
import Pagination from "../../../components/TableComponents/Pagination";
export default {
  components: {
    "list-page-heading": ListPageHeading,
    Pagination
    // TableSimple
  },
  data() {
    return {
      pagination: {
        page: 1,
        limit: 10,
        total: 100
      },
      activeTab: 0,
      isLoad: false,
      sort: {
        column: "title",
        label: "Product Name"
      },
      search: "",
      fields: [
        {
          key: 'selection',
          label: '',
          // tdClass: 'selectColumn'
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
          key: 'payment_type',
          label: 'Payment Type',
          tdClass: 'text-muted'
        },
        {
          key: 'price',
          label: 'Order Price',
          tdClass: 'text-muted'
        },
        {
          key: 'time',
          label: 'Order Time',
          tdClass: 'text-muted'
        },
        {
          key: 'delivery',
          label: 'Delivery time',
          tdClass: 'text-muted'
        },
        {
          key: 'status',
          label: 'Status',
          // tdClass: 'secondColumn'
        },
        {
          key: 'action',
          label: 'Action',
          // tdClass: 'thirdRow'
        }
      ],
      items: [
        { customer: 'Dickerson', vendor: 'Cooker', payment_type: 'card', price: '1000$', time: '2 hours', delivery: '1 hour', status: 'pending...',  age: 21, last_name: 'Macdonald' },
        { customer: 'Larsen', vendor: 'Cooker', payment_type: 'card', price: '1000$', time: '2 hours', delivery: '1 hour', status: 'pending...',  age: 26, last_name: 'Shaw' },
        { customer: 'Geneva', vendor: 'Cooker', payment_type: 'card', price: '1000$', time: '2 hours', delivery: '1 hour', status: 'pending...',  age: 15, last_name: 'Wilson',},
        { customer: 'Thor', vendor: 'Cooker', payment_type: 'card', price: '1000$', time: '2 hours', delivery: '1 hour', status: 'pending...',  age: 49, last_name: 'MacDonald',},
        { customer: 'Dick', vendor: 'Cooker', payment_type: 'card', price: '1000$', time: '2 hours', delivery: '1 hour', status: 'pending...',  age: 53, last_name: 'Dunlap' },
        { customer: 'Dickerson', vendor: 'Cooker', payment_type: 'card', price: '1000$', time: '2 hours', delivery: '1 hour', status: 'pending...',  age: 21, last_name: 'Macdonald' },
        { customer: 'Larsen', vendor: 'Cooker', payment_type: 'card', price: '1000$', time: '2 hours', delivery: '1 hour', status: 'pending...',  age: 26, last_name: 'Shaw' },
        { customer: 'Geneva', vendor: 'Cooker', payment_type: 'card', price: '1000$', time: '2 hours', delivery: '1 hour', status: 'pending...',  age: 15, last_name: 'Wilson',},
        { customer: 'Thor', vendor: 'Cooker', payment_type: 'card', price: '1000$', time: '2 hours', delivery: '1 hour', status: 'pending...',  age: 49, last_name: 'MacDonald',},
        { customer: 'Dick', vendor: 'Cooker', payment_type: 'card', price: '1000$', time: '2 hours', delivery: '1 hour', status: 'pending...',  age: 53, last_name: 'Dunlap' },
      ],
      selectedItems: []
    };
  },
  methods: {
    changePagination (e) {
      this.pagination.page = e
      let _query = { ...this.$route.query }
      _query.page = e
      _query.limit = this.pagination.limit
      this.routePusher(_query)
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
      this.routePusher(_query)
    },
    findRoutesWithKey (key) {
      switch (key) {
        case 0: this.changeRoutetypeWithKey('all')
          break;
        case 1: this.changeRoutetypeWithKey('pending')
          break;
        case 2: this.changeRoutetypeWithKey('accepted')
          break;
        case 3: this.changeRoutetypeWithKey('in_progress')
          break;
        case 4: this.changeRoutetypeWithKey('shipping')
          break;
        case 5: this.changeRoutetypeWithKey('finished')
          break;
        case 6: this.changeRoutetypeWithKey('cancelled')
          break;
        default: break;
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
        case 'in_progress': this.changeActiveTab(3)
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
    changePageSize(limit) {
      this.pagination.page = 1
      this.pagination.limit = limit
      let _query = { ...this.$route.query }
      _query.page = 1
      _query.limit = limit
      this.routePusher(_query)

    },
    changeOrderBy(sort) {
      this.sort = sort;
    },
    searchChange(val) {
      this.search = val;
      this.page = 1;
    },

    selectAll(isToggle) {
      if (this.selectedItems.length >= this.items.length) {
        if (isToggle) this.selectedItems = [];
      } else {
        this.selectedItems = this.items.map(x => x.id);
      }
    },
    keymap(event) {
      switch (event.srcKey) {
        case "select":
          this.selectAll(false);
          break;
        case "undo":
          this.selectedItems = [];
          break;
      }
    },
    getIndex(value, arr, prop) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] === value) {
          return i;
        }
      }
      return -1;
    },
    toggleItem(event, itemId) {
      if (event.shiftKey && this.selectedItems.length > 0) {
        let itemsForToggle = this.items;
        var start = this.getIndex(itemId, itemsForToggle, "id");
        var end = this.getIndex(
          this.selectedItems[this.selectedItems.length - 1],
          itemsForToggle,
          "id"
        );
        itemsForToggle = itemsForToggle.slice(
          Math.min(start, end),
          Math.max(start, end) + 1
        );
        this.selectedItems.push(
          ...itemsForToggle.map(item => {
            return item.id;
          })
        );
      } else {
        if (this.selectedItems.includes(itemId)) {
          this.selectedItems = this.selectedItems.filter(x => x !== itemId);
        } else this.selectedItems.push(itemId);
      }
    },
    handleContextMenu(vnode) {
      if (!this.selectedItems.includes(vnode.key)) {
        this.selectedItems = [vnode.key];
      }
    },
    onContextMenuAction(action) {
      console.log(
        "context menu item clicked - " + action + ": ",
        this.selectedItems
      );
    },
  },
  computed: {
    isSelectedAll() {
      return this.selectedItems.length >= this.items.length;
    },
    isAnyItemSelected() {
      return (
        this.selectedItems.length > 0 &&
        this.selectedItems.length < this.items.length
      );
    },
  },
  watch: {
    search() {
      this.page = 1;
    },
  },
  mounted() {
    const { type } = this.$route.query
    console.log(type)
    if (!type) {
      this.$router.push({ name: this.$route.name, query: { type: 'all' } })
    } else {
      setTimeout(() => {
        this.findTabsWithType(type)
      }, 100)
    }
    // this.loadItems();
  }
};
</script>
