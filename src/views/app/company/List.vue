<template>
  <div>
    <b-row v-if="!error">
      <b-colxx class="disable-text-selection">
        <crud-modal ref="crudModal" @closeable="closed" :name="form.id ? 'company.update' : 'company.create'">
          <div slot="content">
            <b-form class="av-tooltip tooltip-right-bottom">
              <b-form-group :label="$t('name')" class="has-float-label mb-4">
                <b-form-input type="text" v-model.trim="$v.form.name.$model" :state="!$v.form.name.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.name.required">{{
                    $t('please.enter') + " " + $t('name')
                  }}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('phone')" class="has-float-label mb-4">
                <b-form-input type="text" v-model.trim="$v.form.phone_number.$model"
                              :state="!$v.form.phone_number.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.phone_number.required">{{
                    $t('please.enter') + $t('phone')
                  }}
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.phone_number.valid">{{ $t('phone') }} is error value. Ex: 998 XX
                  XXX
                  XX XX
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('address')" class="has-float-label mb-4">
                <b-form-input type="text" v-model.trim="form.address"/>
              </b-form-group>
              <b-card class="mb-4">
                <b-card-title>{{ $t("logo") }}</b-card-title>
                <div class="card-group">
                  <image-editor ref="imageEditor" @loaded="loadedMainPhoto"/>
                  <div class="vendors" v-if="mainPhoto">
                    <img class="imgClass" :src="$img + mainPhoto"/>
                    <div class="image_action">
                      <div style="display: flex">
                  <span
                    @click="$refs.imageEditor.open('4:3', mainPhoto)"
                    class="simple-icon-pencil m-2 icon cursor-pointer"
                  ></span>
                        <span
                          @click="
                      $store.commit('DELETE_MODAL', {
                        isShow: true,
                        data: { name: '4:3', logo: mainPhoto },
                      })
                    "
                          class="simple-icon-trash m-2 icon cursor-pointer"
                        ></span>
                      </div>
                    </div>
                  </div>
                  <b-button
                    v-if="!mainPhoto"
                    class="mt-1 w-100"
                    @click="$refs.imageEditor.open('4:3')"
                    variant="success default"
                  >{{ $t("uploadImage") }}
                  </b-button
                  >
                </div>
              </b-card>
              <b-form-group :label="$t('orders')" class="has-float-label mb-4">
                <v-select v-model="form.orders" label="name" value="id" :reduce="orders => orders.id"
                          :options="orders"/>
              </b-form-group>
            </b-form>
          </div>
          <div slot="action">
            <b-button @click="submit" type="submit"
                      :class="{'btn-multiple-state btn-shadow': true, 'show-spinner': pending }" variant="primary">
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
          :title="$t('company')"
          @filters="filtered"
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
        <b-card :title="$t('companies')" class="mb-4">
          <b-table
            hover
            :items="tableData"
            :fields="fields"
            :busy="load"
            responsive
          >
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>{{ $t('loading') }}...</strong>
              </div>
            </template>
            <template #cell(name)="row">
              {{ row.item.attributes.name }}
            </template>
            <template #cell(phone_number)="row">
              {{ row.item.attributes.phone_number ? row.item.attributes.phone_number : "-" }}
            </template>
            <template #cell(createdAt)="row">
              {{ moment(row.item.attributes.createdAt).format('YYYY-MM-DD HH:mm') }}
            </template>
            <template #cell(action)="row">
              <div style="display: flex">
                <div class="glyph-icon simple-icon-pencil mr-2" @click="edit(row)"
                     style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
                <div @click="$store.commit('DELETE_MODAL', { isShow: true, data: row.item})"
                     class="glyph-icon simple-icon-trash mr-2"
                     style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
              </div>
            </template>
          </b-table>
          <Pagination
            :page="pagination.page"
            :per-page="pagination.limit"
            :total="pagination.total"
            @changePagination="changePagination"
          />
        </b-card>
      </b-colxx>
    </b-row>
    <error-page v-else :error="error"/>
  </div>
</template>

<script>
import ListPageHeading from "./Heading";
import Pagination from "../../../components/TableComponents/Pagination";
import {mapGetters} from "vuex";
import {required} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
import {actions, getters} from "../../../utils/store_schema";
import moment from 'moment';

const _page = 'companies';
const {get, getById, put, post, remove} = actions(_page);
export default {
  components: {
    "list-page-heading": ListPageHeading,
    Pagination
  },
  data() {
    return {
      orders: [],
      tableData: [],
      mainPhoto: null,
      form: {
        id: null,
        name: "",
        phone_number: "",
        address: "",
        logo: null,
        orders: [],
      },
      // sort: {
      //   column: "title",
      //   label: "Product Name"
      // },
      search: "",
      filters: null,
      fields: [
        {
          key: 'id',
          label: this.$t('id'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'name',
          label: this.$t('name'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'phone_number',
          label: this.$t('phone_number'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'createdAt',
          label: this.$t('reg.date'),
          tdClass: 'text-muted'
        },
        {
          key: 'action',
          label: this.$t('action'),
          // tdClass: 'thirdRow'
        }
      ],
      page: 1,
      from: 0,
      to: 0
    };
  },
  name: "companies",
  mixins: [validationMixin],
  computed: {
    ...mapGetters(getters(_page)),
  },
  methods: {
    moment,
    loadedMainPhoto(e) {
      this.form.logo = this.$imgFormat(e);
      this.mainPhoto = this.$imgFormat(e);
    },
    validPh(value) {
      console.log(value);
      return /^[9][9][8]\d{9}$/.test(value);
    },
    closed(e) {
      this.clear();
    },
    clear() {
      this.$v.$reset();
      this.form = {
        id: null,
        name: "",
        phone_number: "",
        address: "",
        logo: null,
        orders: [],
      }
    },
    edit(item) {
      const _data = {...item.item};
      console.log(_data)
      this.form.id = _data.id;
      this.form.name = _data.attributes.name;
      this.form.phone_number = _data.attributes.phone_number;
      this.form.address = _data.attributes.address;
      this.form.logo = _data.attributes.logo.data ? _data.attributes.logo.data.name : null;
      this.mainPhoto = _data.attributes.logo.data ? _data.attributes.logo.data.name : null;
      // this.form.color = _data.attributes.color.data ? _data.attributes.color.data.id : null;
      this.$bvModal.show('crudModal');
    },
    submit() {
      this.$v.$touch();
      // console.log(this.$v);
      if (!this.$v.$invalid) {
        const _form = {...this.form};
        delete _form.id;
        this.$store.dispatch(this.form.id ? put : post, {
          id: this.form.id,
          data: {
            data: {
              ..._form
            }
          }
        }).then(res => {
          this.$refs.crudModal.hideModal();
          this.getData();
        });
      }
    },
    getData(params) {
      this.$store.dispatch(get, {
        // page: this.page,
        populate: "*",
        ...params
      }).then(res => {
        this.tableData = res.data;
        this.to = this.pagination.page * 15 > this.pagination.total ? this.pagination.total : this.pagination.page * 15
        this.from = (this.pagination.page - 1) * 15
      });
    },
    getDirectories() {
      this.$store.dispatch('getOrders').then(res => {
        this.orders = res.data.map(el => {
          return {
            name: el.attributes.name,
            id: el.id
          }
        });
      });
    },
    changePagination(e) {
      this.page = e;
      this.getData();
      // let _query = { ...this.$route.query };
      // _query.page = e;
      // _query.limit = this.pagination.limit;
      // this.routePusher(_query);
    },
    // changeOrderBy(sort) {
    //   this.sort = sort;
    // },
    searchName(val) {
      console.log(val);
      this.search = val;
      this.page = 1;
      this.getData();
    },
    filtered(val) {
      this.filters = val;
      this.page = 1;
      this.$router.push({name: this.$route.name, query: this.filters});
      this.getData(val);
    },
    removeItem(e) {
      this.$store.dispatch(remove, e).then(res => {
        this.$store.commit('DELETE_MODAL', {
          isShow: false,
          data: {}
        })
        this.getData();
      })
    }
  },
  mounted() {
    this.getDirectories();
    const _hash = this.$route.hash;
    const _query = this.$route.query;
    this.filters = _query;
    let _page;
    if (_hash) {
      _page = this.$route.hash.split('-')[1];
      this.page = parseInt(_page);
    }
    this.getData(_query);
  },
  validations: {
    form: {
      name: {
        required,
      },
      phone_number: {
        required,
        valid: (e) => /^[9][9][8]\d{9}$/.test(e)
      }
    }
  },
};
</script>
<style>
</style>
