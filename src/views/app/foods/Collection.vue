<template>
  <div>
    <b-row v-if="!error">
      <b-colxx class="disable-text-selection">
        <crud-modal ref="crudModal" @closeable="closed" :name="form.id ? 'collection.update' : 'collection.create'">
          <div slot="content" style="height: 100%">
            <b-tabs v-if="!loadOne" fill content-class="tab-content" v-model="activeTab" nav-class="separator-tabs">
              <b-tab :title="$t('collection.main')">
                <div class="mt-4"></div>
<!--1-->
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
                    <v-select :options="categories" v-model.trim="$v.form.category.$model" :state="!$v.form.category.$error" />
                    <b-form-invalid-feedback :style="`display: ${(isValidCustom && !$v.form.category.required) ? 'block' : 'none'}`">{{ $t('please.enter') + $t('category') }}</b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group :label="$t('position')" class="has-float-label mb-4">
                    <b-form-input type="number" v-model="form.position"/>
                  </b-form-group>
                  <b-form-group :label="$t('pages.status')">
                    <b-form-radio-group stacked class="pt-2" :options="statuses" v-model="form.active" />
                  </b-form-group>
                </b-form>
              </b-tab>
<!--2-->
              <b-tab :title="$t('collection.food')" style="height: 100% !important;">
                <div class="mt-2"></div>
                <b-button @click="isOpenFilter = !isOpenFilter" variant="primary" class="mb-3 w-100">
                  <span :class="`iconsminds-arrow-${isOpenFilter ? 'up' : 'down'}-2 mr-2`"></span>
                  {{ $t('filter') }}
                  <span :class="`iconsminds-arrow-${isOpenFilter ? 'up' : 'down'}-2 mr-2`"></span>
                </b-button>
                <transition name="slide">
                  <div v-if="isOpenFilter">
                    <b-form-group :label="$t('search')" class="has-float-label mb-2">
                      <b-form-input type="text" @input="searchFood" v-model="foodFilters.search" :placeholder="$t('search')"/>
                    </b-form-group>
                    <b-form-group :label="$t('categories')" class="has-float-label mb-2">
                      <v-select :options="categories" @input="seachCategory"/>
                    </b-form-group>
                    <b-form-group :label="$t('vendors')" class="has-float-label mb-4">
                      <v-select :options="vendors" @input="seachVendors"/>
                    </b-form-group>
                  </div>
                </transition>
                <div
                  v-if="!loadFood"
                  class="dashboard-list-with-thumbs"
                  style="height: 600px !important; overflow-y: auto"
                >
                  <EmptyBox v-if="!loadFood && !dataFood.length"/>
                  <b-form-group>
                    <b-form-checkbox-group
                      id="checkbox-group-2"
                      v-model="form.foods"
                      name="flavour-2"
                    >
                      <b-form-checkbox v-for="(food, index) in unCheckedFoods" :value="food.id" :key="food.id" :class="{
                      'foods': !form.foods.length && form.foods.includes(food.id),
                      'activeFoods': form.foods.length && form.foods.includes(food.id)
                    }">
                        <foods-card
                          :order="food"
                          detail-path="#"
                        />
                      </b-form-checkbox>
                    </b-form-checkbox-group>
                  </b-form-group>
                </div>
                <div v-else class="text-center text-primary my-2 mt-5">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>{{ $t('loading') }}...</strong>
                </div>
              </b-tab>
<!--3-->
              <b-tab title="Новая Блюда" style="height: 100% !important;">
                <div class="mt-2"></div>
                <b-button @click="isOpenFilter = !isOpenFilter" variant="primary" class="mb-3 w-100">
                  <span :class="`iconsminds-arrow-${isOpenFilter ? 'up' : 'down'}-2 mr-2`"></span>
                  {{ $t('filter') }}
                  <span :class="`iconsminds-arrow-${isOpenFilter ? 'up' : 'down'}-2 mr-2`"></span>
                </b-button>
                <transition name="slide">
                  <div v-if="isOpenFilter">
                    <b-form-group :label="$t('search')" class="has-float-label mb-2">
                      <b-form-input type="text" @input="searchFood" v-model="foodFilters.search" :placeholder="$t('search')"/>
                    </b-form-group>
                    <b-form-group :label="$t('categories')" class="has-float-label mb-2">
                      <v-select :options="categories" @input="seachCategory"/>
                    </b-form-group>
                    <b-form-group :label="$t('vendors')" class="has-float-label mb-4">
                      <v-select :options="vendors" @input="seachVendors"/>
                    </b-form-group>
                  </div>
                </transition>
                <div
                  v-if="!loadFood"
                  class="dashboard-list-with-thumbs"
                  style="height: 600px !important; overflow-y: auto"
                >
                  <EmptyBox v-if="!loadFood && !dataFood.length"/>
                  <span>
                    <b-form-group>
                    <b-form-checkbox-group
                      id="checkbox-group-3"
                      v-model="form.foods"
                      name="flavour-3"
                    >
                      <b-form-checkbox v-for="(food, index) in checkedFoods" :value="food.id" :key="food.id" :class="{
                      'foods': !form.foods.length && form.foods.includes(food.id),
                      'activeFoods': form.foods.length && form.foods.includes(food.id)
                    }">
                        <foods-card
                          :order="food"
                          detail-path="#"
                        />
                      </b-form-checkbox>
                    </b-form-checkbox-group>
                  </b-form-group>
                  </span>
                </div>
                <div v-else class="text-center text-primary my-2 mt-5">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>{{ $t('loading') }}...</strong>
                </div>
              </b-tab>
<!--4-->
              <b-tab :title="$t('collection.banner')" v-if="form.id">
                <ImageEditor ref="imageEditor" @loaded="loadedImage"/>
                <remove-modal v-if="$store.getters.deleteModal.isShow" @removing="removeItem"/>
<!--                <b-card title="Banner" class="mb-4">-->
                  <h4 class="m-4">{{ $t('banner') }}</h4>
                  <div class="vendors" v-if="images.banner">
                    <img :src="images.banner.url">
                    <div class="image_action">
                      <div style="display: flex">
                        <span @click="$refs.imageEditor.open('collections', 'banner', form.id, images.banner)" class="simple-icon-pencil m-2 icon"></span>
                        <span @click="$store.commit('DELETE_MODAL', { isShow: true, data: images.banner})" class="simple-icon-trash m-2 icon"></span>
                      </div>
                    </div>
                  </div>
                  <b-button v-else variant="secondary default mt-3" style="width: 100%; border-radius: 5px" @click="$refs.imageEditor.open('collections', 'banner', form.id)">{{ $t('upload') }}</b-button>
<!--                </b-card>-->
<!--                <b-card title="Collection" class="mb-4">-->
                <h4 class="m-4">{{ $t('feature') }}</h4>
                  <div class="vendors" v-if="images.image">
                    <img :src="images.image.url">
                    <div class="image_action">
                      <div style="display: flex">
                        <span @click="$refs.imageEditor.open('collections', 'image', form.id, images.image.url)" class="simple-icon-pencil m-2 icon"></span>
                        <span @click="$store.commit('DELETE_MODAL', { isShow: true, data: images.image })" class="simple-icon-trash m-2 icon"></span>
                      </div>
                    </div>
                  </div>
                  <b-button v-else variant="secondary default mt-3" style="width: 100%; border-radius: 5px" @click="$refs.imageEditor.open('collections', 'image', form.id)">{{ $t('upload') }}</b-button>
<!--                </b-card>-->
<!--                <div style="margin: 20px 0">-->
<!--                  <h4>{{ // $t('banner') }}</h4>-->
<!--                </div>-->
<!--                <dropzone ref="dropzoneBanner" v-if="form.id" url="collections" :media="{ id: form.id, type: 'banner' }" :destroy="true"/>-->
<!--                <div style="margin: 20px 0">-->
<!--                  <h4>{{ $t('feature') }}</h4>-->
<!--                </div>-->
<!--                <dropzone ref="dropzoneFeature" v-if="form.id" url="collections" :media="{ id: form.id, type: 'image' }" :destroy="true"/>-->
              </b-tab>
            </b-tabs>
            <div v-else class="text-center text-primary my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>{{ $t('loading') }}...</strong>
            </div>
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
        <b-card :title="$t(`menu.foods_collection`)" class="mb-4">
          <b-table
            hover
            :items="items"
            :fields="fields"
            :busy="load"
            responsive
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
import EmptyBox from "../../../components/EmptyBox";
import ImageEditor from "../../../components/ImageEditor";
import moment from "moment";
import debounce from "debounce";
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
    ImageEditor,
    Pagination,
    EmptyBox
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
      },
      category: { required }
    }
  },
  mixins: [validationMixin],
  data() {
    this.searchFood = debounce(this.searchFood, 800);
    return {
      itemrender: false,
      activeTab: 0,
      images: {
        banner: null,
        image: null
      },
      isOpenFilter: false,
      fields: [
        {
          key: 'name',
          label: this.$t('name'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'category',
          label: this.$t('category'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'created_at',
          label: this.$t('created_at'),
          tdClass: 'text-muted'
        },
        {
          key: 'action',
          label: this.$t('action'),
          // tdClass: 'thirdRow'
        }
      ],
      foodFilters: {
        search: '',
        no_page: true,
        vendor_id: null,
        category_id: null
      },
      isValidCustom: false,
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
          text: this.$t('active'),
          value: true
        },
        {
          text: this.$t('inactive'),
          value: false
        }
      ],
      categories: [],
      displayMode: "list",
      sort: {},
      page: 1,
      search: "",
      from: 0,
      to: 0,
      selectedItems: []
    };
  },
  watch: {
    // activeTab (e) {
    //   if(e === 2) {
    //    this.list=this.filterFood(this.dataFood)
    //   }
    // },
    foods (e) {
      console.log(e)
    },
    'form.active': function (val) {
      console.log(val)
    }
  },
  computed: {
    checkedFoods() {
      return this.dataFood.filter(e => this.form.foods.includes(e.id));
    },
    unCheckedFoods() {
      return this.dataFood.filter(e => !this.form.foods.includes(e.id));
    },
    isRender (e) {
      console.log(e)
      return this.itemrender
    },
    ...mapGetters(getters(_page)),
    ...mapGetters(['dataFood', 'loadFood', 'dataVendors']),
    items() {
      return this.data.map(e => {
        return {
          ...e,
          action: ['edit', 'delete']
        }
      })
    },
    vendors () {
      return this.dataVendors.map(e => {
        const { first_name, last_name } = e.user
        return {
          label: first_name + ' ' + last_name,
          value: e.id
        }
      })
    },
  },
  mounted() {
    this.getData();
    this.getFood();
    // this.$store.dispatch('getFood', { no_page: true })
    this.$store.dispatch('getCategories', { no_page: true }).then(res => {
      this.categories = res.map(e => {
        return {
          label: e.name[this.$lang],
          value: e.id
        }
      })
    })
    this.$store.dispatch('getVendors', { no_page: true })
  },
  methods: {
    moment,
    loadedImage (e) {
      this.getMediaById()
    },
    getFood () {
      this.$store.dispatch('getFood', this.foodFilters)
    },
    submit() {
      this.$v.$touch();
      this.isValidCustom = true
      console.log(this.$v)
      if (this.$v.$invalid) {
        this.activeTab = 0
      }
      if (this.form.foods.length < 1) {
        this.activeTab = 1
      }
      if (!this.$v.$invalid && this.form.foods.length > 0) {
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
    getMediaById () {
      this.$store.dispatch(getById, this.form.id).then(res => {
        if (res.media && res.media.length) {
          res.media.forEach((e, i) => {
            if (e.type === 'banner') {
              this.images.banner = e
            } else if (e.type === 'image') {
              this.images.image = e
            }
          })
        }
      })
    },
    editItem (id) {
      this.$bvModal.show('crudModal')
      this.$store.dispatch(getById, id).then(res => {
        if (res.media && res.media.length) {
          res.media.forEach((e, i) => {
            if (e.type === 'banner') {
              this.images.banner = e
            } else if (e.type === 'image') {
              this.images.image = e
            }
          })
        }
        this.form = {
          id: res.id,
          name: res.name,
          foods: res.foods.map(e => e.id),
          position: res.position,
          active: res.active,
          category: res.category ? {
            label: res.category.name[this.$lang],
            value: res.category.id
          } : null
        }
      })
    },
    removeItem (id, data) {
      if (data.mediable_type) {
        this.$store.dispatch('deleteMedia', id).then(res => {
          this.$store.commit('DELETE_MODAL', {
            isShow: false,
            data: {}
          });
          this.images.banner = null
          this.getMediaById()
        })
      } else {
        this.$store.dispatch(remove, id).then(res => {
          this.$store.commit('DELETE_MODAL', {
            isShow: false,
            data: {}
          })
          this.getData()
        })
      }
    },
    searchFood (e) {
      this.getFood()
    },
    seachCategory (e) {
      this.foodFilters.category_id = e ? e.value : e
      this.getFood()
    },
    seachVendors (e) {
      this.foodFilters.vendor_id = e ? e.value : e
      this.getFood()
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
        foods: [],
          position: null,
          active: true,
          category: null
      }
      this.images = {
        banner: null,
        image: null
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
    searchChange(val) {
      this.search = val;
      this.page = 1;
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
.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}
.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}
.slide-enter-to, .slide-leave {
  max-height: 300px;
  overflow: hidden;
}
.slide-enter, .slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
//.modal-content {
//  height: 100vh;
//}
//.modal-body {
//  height: 100%;
//}
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
