<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <list-page-heading
        :title="$t('menu.couriers')"
        :selectAll="selectAll"
        :isSelectedAll="isSelectedAll"
        :isAnyItemSelected="isAnyItemSelected"
        :keymap="keymap"
        :displayMode="displayMode"
        :changeDisplayMode="changeDisplayMode"
        :sortOptions="sortOptions"
        :changeOrderBy="changeOrderBy"
        :changePageSize="changePageSize"
        :sort="sort"
        :searchChange="searchChange"
        :from="from"
        :to="to"
        :total="total"
        :perPage="perPage"
      ></list-page-heading>
      <template v-if="isLoad">
        <list-page-listing
          :displayMode="displayMode"
          :items="items"
          :selectedItems="selectedItems"
          :toggleItem="toggleItem"
          :lastPage="lastPage"
          :perPage="perPage"
          :page="page"
          :changePage="changePage"
          :handleContextMenu="handleContextMenu"
          :onContextMenuAction="onContextMenuAction"
        ></list-page-listing>
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
    </b-colxx>
  </b-row>
</template>

<script>
import axios from "axios";
import { apiUrl } from "../../../constants/config";
import ListPageHeading from "./Heading";
import ListPageListing from "./Listing";
export default {
  components: {
    "list-page-heading": ListPageHeading,
    "list-page-listing": ListPageListing
  },
  data() {
    return {
      isLoad: false,
      apiBase: apiUrl + "/cakes/fordatatable",
      displayMode: "thumb",
      sort: {},
      sortOptions: [
        {
          column: "vendor",
          label: "Vendors"
        },
        {
          column: "category",
          label: "Category"
        }
      ],
      // vendors: [
      //   { name: 'James', phone: '+998900006996', image: '1.jpg',  reg_date: '12-07-2021 08:42' },
      //   { name: 'Robert', phone: '+998900006996', image: '2.jpg',  reg_date: '12-07-2021 08:42' },
      //   { name: 'John', phone: '+998900006996', image: '3.jpg',  reg_date: '12-07-2021 08:42' },
      //   { name: 'Michael', phone: '+998900006996', image: '4.jpg',  reg_date: '12-07-2021 08:42' },
      //   { name: 'William', phone: '+998900006996', image: '5.jpg',  reg_date: '12-07-2021 08:42' },
      //   { name: 'David', phone: '+998900006996', image: '6.jpg',  reg_date: '12-07-2021 08:42' },
      //   { name: 'Richard', phone: '+998900006996', image: '7.jpg',  reg_date: '12-07-2021 08:42' },
      //   { name: 'Joseph', phone: '+998900006996', image: '8.jpg',  reg_date: '12-07-2021 08:42' },
      //   { name: 'Thomas', phone: '+998900006996', image: '9.jpg',  reg_date: '12-07-2021 08:42' },
      //   { name: 'Charles', phone: '+998900006996', image: '10.jpg',  reg_date: '12-07-2021 08:42' },
      // ],
      page: 1,
      perPage: 4,
      search: "",
      from: 0,
      to: 0,
      total: 0,
      lastPage: 0,
      items: [],
      selectedItems: []
    };
  },
  methods: {
    loadItems() {
      this.isLoad = false;

      axios
        .get(this.apiUrl)
        .then(response => {
          return response.data;
        })
        .then(res => {
          this.total = res.total;
          this.from = res.from;
          this.to = res.to;
          console.log(res.data)
          this.items = res.data.map((x, index) => {
            return {
              ...x,
              fullname: 'Robert William',
              phone: '+9989908890036',
              car_model: 'Sedan',
              plate_number: '65 627',
              // router: {
              //   name: 'vendor-detail',
              //   query: {
              //     vendor: 'Sara Korthey',
              //     id: x.id
              //   },
              // },
              action: ['view', 'edit', 'delete'],
              img: `../../../assets/img/profiles/${index + 3}.jpg`
            };
          });
          this.perPage = res.per_page;
          this.selectedItems = [];
          this.lastPage = res.last_page;
          this.isLoad = true;
        });
    },

    changeDisplayMode(displayType) {
      this.displayMode = displayType;
    },
    changePageSize(perPage) {
      this.page = 1;
      this.perPage = perPage;
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
    changePage(pageNum) {
      this.page = pageNum;
    }
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
    apiUrl() {
      return `${this.apiBase}?sort=${this.sort.column}&page=${this.page}&per_page=${this.perPage}&search=${this.search}`;
    }
  },
  watch: {
    search() {
      this.page = 1;
    },
    apiUrl() {
      this.loadItems();
    }
  },
  mounted() {
    this.loadItems();
  }
};
</script>
