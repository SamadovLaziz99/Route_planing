<template>
  <div>
    <b-row v-if="!error">
      <b-colxx class="disable-text-selection">
        <crud-modal ref="crudModal" @closeable="closed" :name="form.id ? 'user.update' : 'user.create'">
          <div slot="content">
            <b-form class="av-tooltip tooltip-right-bottom">
              <b-form-group :label="$t('username')" class="has-float-label mb-4">
                <b-form-input type="text" v-model.trim="$v.form.username.$model" :state="!$v.form.username.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.username.required">{{
                    $t('please.enter') + $t('username')
                  }}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('phone')" class="has-float-label mb-4">
                <b-form-input type="text" v-model.trim="$v.form.phone.$model" :state="!$v.form.phone.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.phone.required">{{
                    $t('please.enter') + $t('phone')
                  }}
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.phone.valid">{{ $t('phone') }} is error value. Ex: 998 XX XXX
                  XX XX
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('email')" class="has-float-label mb-4">
                <b-form-input type="text" v-model.trim="form.email"/>
              </b-form-group>
              <b-form-group :label="$t('password')" class="has-float-label mb-4">
                <b-form-input type="text" v-model.trim="$v.form.password.$model" :state="!$v.form.password.$error"/>
                <!--                <b-form-invalid-feedback v-if="!$v.form.password.required">{{-->
                <!--                    $t('please.enter') + $t('password')-->
                <!--                  }}-->
                <!--                </b-form-invalid-feedback>-->
                <b-form-invalid-feedback v-if="!$v.form.password.minLength">{{ $t('password') }} is minimumm 6
                  characters
                </b-form-invalid-feedback>
              </b-form-group>
              <!--              <b-form-group v-if="!form.id" :label="$t('re.password')" class="has-float-label mb-4">-->
              <!--                <b-form-input type="text" v-model.trim="$v.form.re_password.$model"-->
              <!--                              :state="!$v.form.re_password.$error"/>-->
              <!--                <b-form-invalid-feedback v-if="!$v.form.re_password.sameAsPassword">{{-->
              <!--                    $t('re.password.error')-->
              <!--                  }}-->
              <!--                </b-form-invalid-feedback>-->
              <!--              </b-form-group>-->
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
          :title="$t('users')"
          :changeOrderBy="changeOrderBy"
          :sort="sort"
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
          <b-button
            slot="action"
            variant="primary"
            size="lg"
            :class="{ 'top-right-button': true }"
            class="ml-2"
            @click="excelReport"
          ><span class="iconsminds-data-download mr-2"></span>Экспорт Excel
          </b-button>
        </list-page-heading>
        <b-card :title="$t(`menu.users`)" class="mb-4">
          <b-table
            hover
            :items="data"
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
            <template #cell(action)="row">
              <div style="display: flex">
                <div class="glyph-icon simple-icon-eye mr-2"
                     style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"
                     @click="$router.push({ name: 'user_details', params: { id: row.item.id } })"></div>
                <div class="glyph-icon simple-icon-pencil mr-2" @click="edit(row)"
                     style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
                <div @click="$store.commit('DELETE_MODAL', { isShow: true, data: row.item})"
                     class="glyph-icon simple-icon-trash mr-2"
                     style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
              </div>
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
import {required, email, sameAs, minLength} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
import {actions, getters} from "../../../utils/store_schema";
import moment from 'moment'

const _page = 'users';
const {get, getById, put, post, remove} = actions(_page);
export default {
  components: {
    "list-page-heading": ListPageHeading,
    Pagination
    // TableSimple
  },
  data() {
    return {
      form: {
        id: null,
        username: "",
        phone: "",
        email: "",
        password: null,
        // re_password: null,
      },
      sort: {
        column: "title",
        label: "Product Name"
      },
      search: "",
      filters: null,
      fields: [
        {
          key: 'id',
          label: this.$t('id'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'username',
          label: this.$t('username'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'phone',
          label: this.$t('phone'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'email',
          label: this.$t('email'),
          class: 'text-center'
          // tdClass: 'firstColumn'
        },
        {
          key: 'phone',
          label: this.$t('phone'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'created_at',
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
  mixins: [validationMixin],
  computed: {
    ...mapGetters(getters(_page)),
  },
  methods: {
    moment,
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
        username: "",
        phone: "",
        email: "",
        role: 1,
        password: null,
        // re_password: null,
      }
    },
    edit(item) {
      const _data = {...item.item};
      console.log(_data)
      delete _data.car;
      delete _data.company;
      delete _data.blocked;
      delete _data.confirmed;
      delete _data.createdAt;
      delete _data.provider;
      delete _data.updatedAt;
      // delete _data.re_password;
      // _data.re_password = _data.password;
      this.form = _data;
      this.form.role = _data.role.id;
      console.log("_data: ", _data);
      this.$bvModal.show('crudModal');
    },
    submit() {
      this.$v.$touch();
      // console.log(this.$v);
      if (!this.$v.$invalid) {
        console.log('blabla');
        const _form = {...this.form};
        delete _form.id;
        delete _form.re_password;
        if (this.form.id) delete _form.password;
        if (_form.email === "") _form.email = `${_form.phone}@gmail.com`;
        // console.log(this.form);
        this.$store.dispatch(this.form.id ? put : post, {
          id: this.form.id,
          data: _form
        }).then(res => {
          console.log(res)
          this.$refs.crudModal.hideModal();
          this.getData();
        });
      }
    },
    getData(params) {
      this.$store.dispatch(get, {
        page: this.page,
        populate: "*",
        ...params
      }).then(res => {
        // console.log(res);
        this.to = this.pagination.page * 15 > this.pagination.total ? this.pagination.total : this.pagination.page * 15
        this.from = (this.pagination.page - 1) * 15
      });
    },
    changePagination(e) {
      this.page = e;
      this.getData();
      // let _query = { ...this.$route.query }
      // _query.page = e
      // _query.limit = this.pagination.limit
      // this.routePusher(_query)
    },
    changeOrderBy(sort) {
      this.sort = sort;
    },
    searchName(val) {
      console.log(val);
      this.search = val;
      this.page = 1;
      this.getData();
    },
    excelReport() {
      const {user_id, search, phone} = this.filters
      const link = document.createElement('a')
      link.href = process.env.VUE_APP_BASE_URL + `/users/download/?user_id=${user_id || ''}&search=${search || ''}&phone=${phone || ''}`
      console.log(link.href);
      link.setAttribute('download', 'Report');
      document.body.appendChild(link);
      link.click();
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
      username: {
        required
      },
      phone: {
        required,
        valid: (e) => /^[9][9][8]\d{9}$/.test(e)
      },
      password: {
        required,
        minLength: minLength(6)
      },
      // re_password: {
      //   sameAsPassword: sameAs('password')
      // }
    }
  },
};
</script>
<style>
</style>
