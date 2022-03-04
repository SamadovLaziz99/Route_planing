<template>
  <div>
    <b-row v-if="!error">
      <b-colxx class="disable-text-selection">
        <crud-modal ref="crudModal" @closeable="closed" :name="form.id ? 'courier.update' : 'courier.create'">
          <div slot="content">
            <b-form class="av-tooltip tooltip-right-bottom">
              <b-form-group :label="$t('name')" class="has-float-label mb-4">
                <b-form-input type="text" v-model.trim="$v.form.name.$model" :state="!$v.form.name.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.name.required">{{ $t('please.enter') + $t('name') }}</b-form-invalid-feedback>
              </b-form-group>
              <!--              <b-form-group :label="$t('last.name')" class="has-float-label mb-4">-->
              <!--                <b-form-input type="text" v-model.trim="$v.form.last_name.$model" :state="!$v.form.last_name.$error"/>-->
              <!--                <b-form-invalid-feedback v-if="!$v.form.last_name.required">{{ $t('please.enter') + $t('last.name') }}</b-form-invalid-feedback>-->
              <!--              </b-form-group>-->
              <b-form-group :label="$t('phone')" class="has-float-label mb-4">
                <b-form-input type="text" v-model.trim="$v.form.phone.$model" :state="!$v.form.phone.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.phone.required">{{ $t('please.enter') + $t('phone') }}</b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.phone.valid">{{ $t('phone') }} is error value. Ex: +998 XX XXX XX XX</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('users')" class="has-float-label mb-4">
                <v-select :options="users" v-model.trim="$v.form.user.$model"  :state="!$v.form.user.$error"/>
                <b-form-invalid-feedback :style="`display: ${(isValidCustom && !$v.form.user.required) ? 'block' : 'none'}`">
                  {{ $t('please.enter') + $t('users') }}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('apelsin_account')" class="has-float-label mb-4">
                <b-form-input type="text" v-model="form.apelsin_account"/>
                <!--                <b-form-invalid-feedback v-if="!$v.form.name.required">{{ $t('please.enter') + $t('name') }}</b-form-invalid-feedback>-->
              </b-form-group>
              <!--              <b-form-group :label="$t('apelsin_token')" class="has-float-label mb-4">-->
              <!--                <b-form-input type="text" v-model="form.apelsin_token"/>-->
              <!--              </b-form-group>-->
              <b-form-group :label="$t('car_model')" class="has-float-label mb-4">
                <b-form-input type="text" v-model="form.details.car_model"/>
              </b-form-group>
              <b-form-group :label="$t('car_number')" class="has-float-label mb-4">
                <b-form-input type="text" v-model="form.details.car_number"/>
              </b-form-group>
              <b-form-group :label="$t('car_color')" class="has-float-label mb-4">
                <v-select :options="colors" v-model="form.details.car_color"/>
              </b-form-group>
              <b-form-group :label="$t('status')">
                <b-form-radio-group stacked class="pt-2" :options="statuses" v-model="form.active" />
              </b-form-group>
            </b-form>
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
          :title="$t('menu.applicants')"
          :changeOrderBy="changeOrderBy"
          :sort="sort"
          :searchChange="searchChange"
          :from="from"
          :to="to"
          :total="pagination.total"
          :perPage="15"
        />
<!--          <b-button-->
<!--            slot="action"-->
<!--            v-b-modal.crudModal-->
<!--            variant="primary"-->
<!--            size="lg"-->
<!--            :class="{ 'top-right-button': true }"-->
<!--          >{{ $t('pages.add-new') }}-->
<!--          </b-button>-->
<!--        </list-page-heading>-->
        <b-card :title="$t(`menu.applicants`)" class="mb-4">
          <b-tabs card v-model="activeTab">
            <b-tab style="padding: 0.6rem" v-for="tab in statuses" :key="tab">
              <template #title>
                <div style="display: flex">
                  <div style="margin-right: 10px">{{ $t(`statuses.${tab}`) }}</div>
                </div>
              </template>
            </b-tab>
          </b-tabs>
          <b-table
            hover
            :items="data"
            :fields="fields"
            :busy="load"
            responsive
          >
            <template #empty>
              <EmptyBox style="margin-top: 50px"/>
            </template>
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>{{ $t('loading') }}...</strong>
              </div>
            </template>
            <template #cell(action)="row">
              <div style="display: flex">
                <!--              <div class="glyph-icon simple-icon-eye mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280"></div>-->
<!--                <div class="glyph-icon simple-icon-pencil mr-2" @click="edit(row)" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>-->
                <div @click="$store.commit('DELETE_MODAL', { isShow: true, data: row.item})" class="glyph-icon simple-icon-trash mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
              </div>
            </template>
            <template #cell(active)="row">
              <b-dropdown variant="secondary" size="xs" :text="$t(`statuses.${row.item.status}`)">
                <b-dropdown-item v-for="stat in statuses" :key="stat" @click="changeStatus(stat, row)">{{ $t(`statuses.${stat}`) }}</b-dropdown-item>
              </b-dropdown>
<!--              <b-badge pill variant="outline-primary">{{ row.item.status }}</b-badge>-->
<!--              <b-badge v-else pill variant="outline-light">In/active</b-badge>-->
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
import ListPageHeading from "./Heading";
import Pagination from "../../../components/TableComponents/Pagination";
import {mapGetters} from "vuex";
import {required, email, sameAs, minLength} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
import EmptyBox from "../../../components/EmptyBox";
import { actions, getters } from "../../../utils/store_schema";
import moment from 'moment'
const _page = 'applications'
const { get, getById, put, post, remove } = actions(_page)
export default {
  components: {
    EmptyBox,
    "list-page-heading": ListPageHeading,
    Pagination
    // TableSimple
  },
  validations: {
    form: {
      name: {
        required
      },
      phone: {
        required,
        valid: (e) => /^[+][9][9][8]\d{9}$/.test(e)
      },
      user: {
        required
      }
    }
  },
  mixins: [validationMixin],
  computed: {
    ...mapGetters(getters(_page)),
  },
  data() {
    return {
      isValidCustom: false,
      statuses: [
        'pending',
        'interview',
        'training',
        'teste',
        'in_process',
        'vendor'
      ],
      activeTab: 0,
      colors: [
        { label: this.$t('white'), value: 'white' },
        { label: this.$t('black'), value: 'Black' },
        { label: this.$t('blue'), value: 'blue' },
        { label: this.$t('light.green'), value: 'light-green' },
        { label: this.$t('choco'), value: 'choco' },
      ],
      form: {
        id: null,
        name: '',
        phone: '',
        details: {},
        user: null,
        active: true,
        apelsin_account: '',
        apelsin_token: ''
      },
      sort: {
        column: "title",
        label: "Product Name"
      },
      search: "",
      fields: [
        {
          key: 'first_name',
          label: this.$t('first.name'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'last_name',
          label: this.$t('last.name'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'phone',
          label: this.$t('phone'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'direction',
          label: this.$t('direction'),
          // tdClass: 'firstColumn'
        },
        // {
        //   key: 'details.car_model',
        //   label: this.$t('car_model'),
        //   // tdClass: 'firstColumn'
        // },
        // {
        //   key: 'details.car_number',
        //   label: this.$t('car_number'),
        //   // tdClass: 'firstColumn'
        // },
        // {
        //   key: 'details.car_color.label',
        //   label: this.$t('car_color'),
        //   // tdClass: 'firstColumn'
        // },
        {
          key: 'created_at',
          label: this.$t('reg.date'),
          tdClass: 'text-muted'
        },
        {
          key: 'active',
          label: this.$t('status'),
          // tdClass: 'text-muted'
        },
        {
          key: 'action',
          label: this.$t('action'),
          // tdClass: 'thirdRow'
        }
      ],

      page: 1,
      from: 0,
      to: 0,
      users: []
    };
  },
  methods: {
    moment,
    changeTabs (e) {
      console.log(e)
    },
    tabChange (i) {
      setTimeout(() => {
        this.activeTab = i
      }, 1)
    },
    statusNumber (index) {
      switch (index) {
        case 'pending': this.tabChange(0)
          break
        case 'interview': this.tabChange(1)
          break
        case 'training': this.tabChange(2)
          break
        case 'teste': this.tabChange(3)
          break
        case 'in_process': this.tabChange(4)
          break
        case 'vendor': this.tabChange(5)
          break
        default: break

      }
    },
    tabStatus (index) {
      const _ = this.statuses
      switch (index) {
          case 0: return _[0]
            break
          case 1: return _[1]
            break
          case 2: return _[2]
            break
          case 3: return _[3]
            break
          case 4: return _[4]
            break
          case 5: return _[5]
            break
          default: return _[0]
            break
        }
    },
    changeStatus (val, item) {
      console.log(val, item)
      const _id = item.item.id
      if (val !== item.item.status) {
        this.$store.dispatch('changeStatusApplicants', {
          id: _id,
          data: {
            status: val
          }
        }).then(res => {
          this.getData()
        })
      }
    },
    validPh (value) {
      console.log(value)
      return /^[+][9][9][8]\d{9}$/.test(value)
    },
    closed (e) {
      console.log(e)
      this.clear()
    },
    clear() {
      this.$v.$reset()
      this.isValidCustom = false
      this.form = {
        id: null,
        name: '',
        phone: '',
        details: {},
        user: null,
        active: true,
        apelsin_account: '',
        // apelsin_token: ''
      }
    },
    edit (item) {
      const _data = { ...item.item }
      delete _data.external_id
      delete _data.apelsin_token
      delete _data.created_at
      delete _data.updated_at
      console.log(_data)
      this.form = _data
      const _user = this.users.filter(e => e.value === _data.user)[0]
      if (_user) {
        this.form.user = {
          label: _user.label,
          value: _user.value
        }
      }
      this.$bvModal.show('crudModal')
    },
    submit() {
      this.$v.$touch();
      this.isValidCustom = true
      console.log(this.$v)
      if (!this.$v.$invalid) {
        const _form = { ...this.form }
        delete _form.id
        _form.user = this.form.user.value || this.form.user
        // if (this.form.id) delete _form.password
        this.$store.dispatch(this.form.id ? put : post, {
          id: this.form.id,
          data: _form
        }).then(res => {
          this.$refs.crudModal.hideModal()
          this.getData()
        })
      }
    },
    getData() {
      this.$store.dispatch(get, {
        page: this.page,
        status: this.$route.query.status
      }).then(res => {
        console.log(res)
        this.to = this.pagination.page * 15 > this.pagination.total ? this.pagination.total : this.pagination.page * 15
        this.from = (this.pagination.page - 1) * 15
      })
    },
    changePagination (e) {
      this.page = e
      this.getData()
      console.log(this.$route)
      // let _query = { ...this.$route.query }
      // _query.page = e
      // _query.limit = this.pagination.limit
      // this.routePusher(_query)
    },
    changeOrderBy(sort) {
      this.sort = sort;
    },
    searchChange(val) {
      this.search = val;
      this.page = 1;
    },
    removeItem(e) {
      this.$store.dispatch(remove, e).then(res => {
        this.$store.commit('DELETE_MODAL', {
          isShow: false,
          data: {}
        })
        this.getData()
      })
    }
  },
  watch: {
    search() {
      this.page = 1;
    },
    activeTab (e) {
      console.log(e)
      this.$router.replace({
        name: this.$route.name,
        query: {
          status: this.tabStatus(e)
        }
      })
      this.getData()
    }
  },
  mounted() {
    console.log('MOUNTTTTT')
    const _hash = this.$route.hash
    let _page;
    if (_hash) {
      console.log(_hash)
      _page = this.$route.hash.split('-')[1]
      this.page = parseInt(_page)
    }


    if (this.$route.query.status) {
      this.statusNumber(this.$route.query.status)
    }
    // this.statusNumber(this.tabStatus(0))
    this.getData()
    // this.$stores.dispatch('getUsers', { no_page: true }).then(res => {
    //   console.log(res)
    //   this.users = res.map(e => {
    //     return {
    //       label: e.first_name + ' ' + (e.last_name ? e.last_name : ''),
    //       value: e.id
    //     }
    //   })
    // })
  }
};
</script>
<style>
</style>
