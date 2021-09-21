<template>
  <div>
    <b-row v-if="!error">
      <b-colxx class="disable-text-selection">
        <crud-modal ref="crudModal" @closeable="closed" :name="form.id ? 'collection.update' : 'collection.create'">
          <div slot="content">
            <b-tabs fill content-class="tab-content" nav-class="separator-tabs">
              <b-tab title="MAIN">
                <div class="mt-4"></div>
                <b-form class="av-tooltip tooltip-right-bottom">
                  <b-form-group :label="$t('name') + $t('uz')" class="has-float-label mb-4">
                    <b-form-input type="text" v-model.trim="$v.form.name.uz.$model" :state="!$v.form.name.uz.$error"/>
                    <b-form-invalid-feedback v-if="!$v.form.name.uz.required">{{ $t('please.enter') + $t('name') + $t('uz') }}</b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group :label="$t('name') + $t('ru')" class="has-float-label mb-4">
                    <b-form-input type="text" v-model.trim="$v.form.name.ru.$model" :state="!$v.form.name.ru.$error"/>
                    <b-form-invalid-feedback v-if="!$v.form.name.ru.required">{{ $t('please.enter') + $t('name') + $t('ru') }}</b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group :label="$t('name') + $t('oz')" class="has-float-label mb-4">
                    <b-form-input type="text" v-model.trim="$v.form.name.oz.$model" :state="!$v.form.name.oz.$error"/>
                    <b-form-invalid-feedback v-if="!$v.form.name.oz.required">{{ $t('please.enter') + $t('name') + $t('oz') }}</b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group :label="$t('pages.category')" class="has-float-label mb-4">
                    <v-select :options="categories" v-model="form.category" />
                  </b-form-group>
                  <b-form-group :label="$t('position')" class="has-float-label mb-4">
                    <b-form-input type="number" v-model="form.position"/>
                  </b-form-group>
                  <b-form-group :label="$t('pages.status')">
                    <b-form-radio-group stacked class="pt-2" :options="statuses" v-model="form.active" />
                  </b-form-group>
                </b-form>
              </b-tab>
              <b-tab title="FOODS">
                <div class="mt-4"></div>
                <vue-perfect-scrollbar
                  class="scroll dashboard-list-with-thumbs"
                  style="height: 470px !important;"
                  :settings="{ suppressScrollX: true, wheelPropagation: false }"
                >
                  <b-form-group>
                    <b-form-checkbox-group
                      id="checkbox-group-2"
                      v-model="form.foods"
                      name="flavour-2"
                    >
                      <b-form-checkbox v-for="(food, index) in dataFood" :value="food.id" :key="food.id" :class="{
                      'foods': !form.foods.includes(food.id),
                      'activeFoods': form.foods.includes(food.id)
                    }">
                        <foods-card
                          :order="food"
                          detail-path="#"
                        />
                      </b-form-checkbox>
                    </b-form-checkbox-group>
                  </b-form-group>
                </vue-perfect-scrollbar>
              </b-tab>
              <b-tab title="BANNER">
                <image-uploader/>
              </b-tab>
            </b-tabs>
          </div>
          <div slot="action">
            <b-button @click="submit" type="submit" :class="{'btn-multiple-state btn-shadow': true, 'show-spinner': pending }" variant="primary">
            <span class="spinner d-inline-block">
                <span class="bounce1"></span>
                <span class="bounce2"></span>
                <span class="bounce3"></span>
            </span>
              <span class="label">{{ form.id ? $t('update') : $t('save') }}</span>
            </b-button>
          </div>
        </crud-modal>
        <remove-modal v-if="$store.getters.deleteModal.isShow" @removing="removeItem"/>
        <list-page-heading
          :title="$t('menu.foods_collection')"
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
            v-b-modal.crudModal
            variant="primary"
            size="lg"
            :class="{ 'top-right-button': true }"
          >{{ $t('pages.add-new') }}
          </b-button>
        </list-page-heading>
        <b-card :title="$t(`menu.users`)">
          <b-table
            hover
            :items="items"
            :fields="fields"
            :busy="load"
          >
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(action)="row">
              <div style="display: flex">
                <div class="glyph-icon simple-icon-pencil mr-2" @click="editItem(row.item.id)" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
                <div @click="$store.commit('DELETE_MODAL', { isShow: true, data: row.item})" class="glyph-icon simple-icon-trash mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
              </div>
            </template>
            <template #cell(name)="row">
              <div>{{ row.item.name[$lang] }}</div>
            </template>
            <template #cell(category)="row">
              <div>{{ row.item.category ? row.item.category.name[$lang] : '' }}</div>
            </template>
            <template #cell(status)="row">
              <b-badge pill variant="primary">Pending</b-badge>
            </template>
            <template #cell(created_at)="row">
              {{ moment(row.item.created_at).format('YYYY-MM-DD HH:mm') }}
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
<!--        <template v-if="!load">-->
<!--          <list-page-listing-->
<!--            ref="listPageListing"-->
<!--            :displayMode="displayMode"-->
<!--            :items="items"-->
<!--            :selectedItems="selectedItems"-->
<!--            :lastPage="Math.ceil(pagination.total / 15)"-->
<!--            :perPage="15"-->
<!--            :page="pagination.page"-->
<!--            :changePage="changePage"-->
<!--            :handleContextMenu="handleContextMenu"-->
<!--            :onContextMenuAction="onContextMenuAction"-->
<!--            @view="viewItem"-->
<!--            @edit="editItem"-->
<!--          ></list-page-listing>-->
<!--        </template>-->
<!--        <template v-else>-->
<!--          <div class="loading"></div>-->
<!--        </template>-->
      </b-colxx>
    </b-row>
    <error-page v-else :error="error"/>
  </div>
</template>

<script>
import ListPageHeading from "./ListHeading";
import ListPageListing from "./ListListing";
import FoodsCard from "./components/FoodsCard";
import Pagination from "../../../components/TableComponents/Pagination";
import products from "../../../data/products";
import moment from "moment";
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
const _page = 'collections'
import { actions, getters } from "../../../utils/store_schema";
const { get, getById, put, post, remove } = actions(_page)
export default {
  components: {
    "list-page-heading": ListPageHeading,
    "list-page-listing": ListPageListing,
    'foods-card': FoodsCard,
    Pagination
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
      fields: [
        {
          key: 'name',
          label: 'Name',
          // tdClass: 'firstColumn'
        },
        {
          key: 'category',
          label: 'Category',
          // tdClass: 'firstColumn'
        },
        {
          key: 'created_at',
          label: 'Registration date',
          tdClass: 'text-muted'
        },
        {
          key: 'action',
          label: 'Action',
          // tdClass: 'thirdRow'
        }
      ],
      form: {
        id: null,
        name: {
          uz: '',
          ru: '',
          oz: ''
        },
        foods: [],
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
      displayMode: "list",
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
    ...mapGetters(['dataFood']),
    items() {
      return this.data.map(e => {
        return {
          ...e,
          action: ['edit', 'delete']
        }
      })
    }
  },
  mounted() {
    this.getData()
    this.$store.dispatch('getFood')
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
    moment,
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const _form = { ...this.form }
        delete _form.id
        _form.category_id = this.form.category?.value
        _form.position = parseInt(this.form.position)
        _form.food_ids = this.form.foods
        delete _form.foods
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
        this.form = {
          id: res.id,
          name: res.name,
          foods: res.foods.map(e => e.id),
          position: res.position,
          active: res.active,
          category: {
            label: res.category.name[this.$lang],
            value: res.category.id
          }
        }
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
    changePagination(e) {
      this.page = e
      this.getData()
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
