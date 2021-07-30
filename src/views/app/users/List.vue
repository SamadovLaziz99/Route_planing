<template>
  <b-row>
    <b-colxx class="disable-text-selection" style="padding: 0">
      <list-page-heading
        :title="$t('menu.users')"
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
      <b-card :title="$t(`menu.users`)">
        <b-table
          hover
          :items="items"
          :fields="fields"
          selectable
          select-mode="multi"
        >
          <template #cell(action)="row">
            <div style="display: flex">
              <div class="glyph-icon simple-icon-eye mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280"></div>
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
          key: 'name',
          label: 'Name',
          // tdClass: 'firstColumn'
        },
        {
          key: 'phone',
          label: 'Phone Number',
          // tdClass: 'firstColumn'
        },
        {
          key: 'order',
          label: 'Orders Count',
          tdClass: 'text-muted'
        },
        {
          key: 'reg_date',
          label: 'Registration date',
          tdClass: 'text-muted'
        },
        {
          key: 'action',
          label: 'Action',
          // tdClass: 'thirdRow'
        }
      ],
      items: [
        { name: 'James', phone: '+998900006996',  order: 39,  reg_date: '12-07-2021 08:42' },
        { name: 'Robert', phone: '+998900006996',  order: 39,  reg_date: '12-07-2021 08:42' },
        { name: 'John', phone: '+998900006996',  order: 39,  reg_date: '12-07-2021 08:42' },
        { name: 'Michael', phone: '+998900006996',  order: 39,  reg_date: '12-07-2021 08:42' },
        { name: 'William', phone: '+998900006996',  order: 39,  reg_date: '12-07-2021 08:42' },
        { name: 'David', phone: '+998900006996',  order: 39,  reg_date: '12-07-2021 08:42' },
        { name: 'Richard', phone: '+998900006996',  order: 39,  reg_date: '12-07-2021 08:42' },
        { name: 'Joseph', phone: '+998900006996',  order: 39,  reg_date: '12-07-2021 08:42' },
        { name: 'Thomas', phone: '+998900006996',  order: 39,  reg_date: '12-07-2021 08:42' },
        { name: 'Charles', phone: '+998900006996',  order: 39,  reg_date: '12-07-2021 08:42' },
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
<style>
</style>
