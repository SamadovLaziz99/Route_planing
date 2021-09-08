<template>
  <div>
    <b-row v-if="!error">
      <b-colxx class="disable-text-selection">
        <DeleteConfirmModal v-if="$store.getters.deleteModal.isShow" @removing="removeItem"/>
        <list-page-heading
          :title="$t('menu.vendors')"
          :displayMode="displayMode"
          :sortOptions="sortOptions"
          :changeOrderBy="changeOrderBy"
          :sort="sort"
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
            @click="$router.push({ name: 'vendor_create' })"
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
            @edit="editItem"
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
import ListPageHeading from "./Heading";
import ListPageListing from "./Listing";
// import FoodsCard from "./components/FoodsCard";
import products from "../../../data/products";
import DeleteConfirmModal from "../../../components/DeleteConfirmModal";
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import {actions, getters} from "../../../utils/store_schema";
const _page = 'vendors'
const { get, getById, put, post, remove } = actions(_page)
export default {
  components: {
    "list-page-heading": ListPageHeading,
    "list-page-listing": ListPageListing,
    DeleteConfirmModal
  },
  validations: {
    form: {
      name: {
        uz: {
          required
        },
        ru: {
          required
        },
        oz: {
          required
        }
      }
    }
  },
  mixins: [validationMixin],
  data() {
    return {
      products,
      foods: [],
      form: {
        id: null,
        name: {
          uz: '',
          ru: '',
          oz: ''
        },
        position: null,
        active: true,
        category: null
      },
      statuses: [
        {
          text: "ACTIVE",
          value: true
        },
        {
          text: "INACTIVE",
          value: false
        }
      ],
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
      search: "",
      from: 0,
      to: 0,
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
          router: {
            name: 'food_update',
            params: {
              id: e.id
            }
          },
          action: ['view', 'edit', 'delete']
        }
      })
    }
  },
  mounted() {
    this.getData()
    this.$store.dispatch('getCategories').then(res => {
      this.categories = res.map(e => {
        return {
          label: e.name[this.$lang],
          value: e.id
        }
      })
    })
  },
  methods: {
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
    },
    editItem (id) {
      this.$store.dispatch(getById, id).then(res => {
        const _form = { ...res }
        delete _form.created_at
        delete _form.updated_at
        _form.category = this.categories.filter(e => e.value === res.category)[0]
        this.form = _form
        this.$bvModal.show('crudModal')
      })
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
    searchChange(val) {
      this.search = val;
      this.page = 1;
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
        page: this.page
      }).then(res => {
        console.log(res)
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
