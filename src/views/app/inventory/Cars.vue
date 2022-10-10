<template>
  <div>
    <b-row v-if="!error">
      <b-colxx class="disable-text-selection">
        <crud-modal ref="crudModal" @closeable="closed" :name="form.id ? 'car.update' : 'car.create'">
          <div slot="content">
            <b-form class="av-tooltip tooltip-right-bottom">
              <b-form-group :label="$t('gov_number')" class="has-float-label mb-4">
                <b-form-input type="text" v-model.trim="$v.form.gov_number.$model" :state="!$v.form.gov_number.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.gov_number.required">{{
                    $t('please.enter') + " " + $t('gov_number')
                  }}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('color')" class="has-float-label mb-4">
                <v-select v-model="form.color" label="name" value="id" :reduce="color => color.id"
                          :options="colors"/>
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
          :title="$t('cars')"
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
        <b-card :title="$t('cars')" class="mb-4">
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
            <template #cell(gov_number)="row">
              {{ row.item.attributes.gov_number }}
            </template>
            <template #cell(color)="row">
              {{ row.item.attributes.color.data ? row.item.attributes.color.data.attributes.name : "-" }}
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

const _page = 'cars';
const {get, getById, put, post, remove} = actions(_page);
export default {
  components: {
    "list-page-heading": ListPageHeading,
    Pagination
  },
  data() {
    return {
      colors: [],
      tableData: [],
      form: {
        id: null,
        gov_number: "",
        color: [],
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
          key: 'gov_number',
          label: this.$t('gov_number'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'color',
          label: this.$t('color'),
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
  name: "cars",
  mixins: [validationMixin],
  computed: {
    ...mapGetters(getters(_page)),
  },
  methods: {
    moment,
    closed(e) {
      this.clear();
    },
    clear() {
      this.$v.$reset();
      this.form = {
        id: null,
        gov_number: "",
        color: [],
      }
    },
    edit(item) {
      const _data = {...item.item};
      this.form.id = _data.id;
      this.form.gov_number = _data.attributes.gov_number;
      this.form.color = _data.attributes.color.data ? _data.attributes.color.data.id : null;
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
      this.$store.dispatch('getColors').then(res => {
        this.colors = res.data.map(el => {
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
      gov_number: {
        required,
      },
    }
  },
};
</script>
<style>
</style>
