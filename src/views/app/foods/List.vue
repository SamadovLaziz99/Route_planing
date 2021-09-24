<template>
  <div>
    <b-row v-if="!error">
      <b-colxx class="disable-text-selection">
        <remove-modal v-if="$store.getters.deleteModal.isShow" @removing="removeItem"/>
        <list-page-heading
          :title="$t('menu.foods_list')"
          :displayMode="displayMode"
          @filters="filterChanging"
          :from="from"
          :to="to"
          :total="pagination.total"
          :perPage="15"
        >
          <b-button
            slot="action"
            variant="primary"
            size="lg"
            @click="$router.push({ name: 'food_create' })"
            :class="{ 'top-right-button': true }"
          >{{ $t('pages.add-new') }}
          </b-button>
        </list-page-heading>
        <template v-if="!load">
          <list-page-listing
            ref="listPageListing"
            :displayMode="displayMode"
            :items="items"
            :selectedItems="selectedItems"
            :lastPage="Math.ceil(pagination.total / 15)"
            :perPage="15"
            :page="pagination.page"
            :changePage="changePage"
            :handleContextMenu="handleContextMenu"
            :onContextMenuAction="onContextMenuAction"
            @view="viewItem"
          ></list-page-listing>
        </template>
        <template v-else>
          <div class="loading"></div>
        </template>
      </b-colxx>
    </b-row>
    <error-page v-else :error="error"/>
  </div>
</template>

<script>
import ListPageHeading from "./ListHeading";
import ListPageListing from "./ListListing";
import FoodsCard from "./components/FoodsCard";
import { mapGetters } from "vuex";
import { actions, getters } from "../../../utils/store_schema";
import {imageProxy} from "../../../utils";
const _page = 'food'
const { get, getById, put, post, remove } = actions(_page)
export default {
  components: {
    "list-page-heading": ListPageHeading,
    "list-page-listing": ListPageListing,
    'foods-card': FoodsCard
  },
  data() {
    return {
      foods: [],
      categories: [],
      displayMode: "thumb",
      sort: {},
      sortOptions: [
        {
          column: "name",
          label: "Name"
        },
        {
          column: "position",
          label: "Position"
        }
      ],
      page: 1,
      from: 0,
      to: 0,
      filters: null,
      selectedItems: []
    };
  },
  watch: {
    foods (e) {
      console.log(e)
    },
    'form.active': function (val) {
      console.log(val)
    }
  },
  computed: {
    ...mapGetters(getters(_page)),
    items() {
      return this.data.map(e => {
        return {
          ...e,
          img: e.media.length > 0 ? imageProxy(e.media[0].url, '150x110') : undefined,
          routes: {
            view: {
              name: 'food_detail',
              params: {
                id: e.id
              }
            },
            edit: {
              name: 'food_update',
              params: {
                id: e.id
              }
            }
          },
          action: ['view', 'edit', 'delete']
        }
      })
    }
  },
  mounted() {
    const _hash = this.$route.hash
    const _query = this.$route.query
    this.filters = _query
    let _page;
    if (_hash) {
      _page = this.$route.hash.slice(6)
      this.page = parseInt(_page)
    }
    this.getData()
  },
  methods: {
    filterChanging (val) {
      this.filters = val
      this.page = 1
      this.$router.push({ name: this.$route.name, query: this.filters })
      this.getData()
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const _form = { ...this.form }
        delete _form.id
        _form.category = this.form.category?.value
        _form.position = parseInt(this.form.position)
        this.$store.dispatch(this.form.id ? put : post, {
          id: this.form.id,
          data: _form
        }).then(res => {
          this.$refs.crudModal.hideModal()
          this.getData()
        })
      }
    },
    viewItem (id) {
      console.log(id)
      this.$router.push({ name: 'food_detail', params: { id: id } })
    },
    removeItem (id) {
      this.$store.dispatch(remove, id).then(res => {
        this.$store.commit('DELETE_MODAL', {
          isShow: false,
          data: {}
        })
        this.getData()
      })
    },
    clear() {
      this.$v.$reset()
      this.form = {
        id: null,
        name: {
          uz: '',
          ru: '',
          oz: ''
        },
        position: null,
        active: true
      }
    },
    closed(e) {
      this.clear()
      console.log(e)
    },
    changeOrderBy(sort) {
      this.sort = sort;
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
    changePage(n) {
      this.page = n
      this.getData()
    },
    getData() {
      this.$store.dispatch(get, {
        page: this.page,
        ...this.filters
      }).then(res => {
        this.to = this.pagination.page * 15 > this.pagination.total ? this.pagination.total : this.pagination.page * 15
        this.from = (this.pagination.page - 1) * 15
      })
    }
  },
};
</script>
<style lang="scss">
.foods {
  width: 100% !important;
  border-radius: 10px;
  margin: 5px 0;
  .custom-control-label {
    width: 100%;
    cursor: pointer;
    border-radius: 0.75rem !important;
  }
  .custom-control-label:hover {
    background: aliceblue;
  }
}
.activeFoods {
  width: 100% !important;
  border-radius: 10px;
  margin: 5px 0;
  .custom-control-label {
    width: 100%;
    cursor: pointer;
    border-radius: 0.75rem !important;
    background: #fff8f0;
  }
  .custom-control-label:hover {
    background: #fff8f0;
  }
}
</style>
