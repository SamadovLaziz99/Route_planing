<template>
  <div>
    <b-row v-if="!error">
      <b-colxx class="disable-text-selection">
        <crud-modal ref="crudModal" @closeable="closed" :name="form.id ? 'user.update' : 'user.create'">
          <div slot="content">
            <b-form class="av-tooltip tooltip-right-bottom">
              <b-form-group :label="$t('first.name')" class="has-float-label mb-4">
                <b-form-input type="text" v-model.trim="$v.form.first_name.$model" :state="!$v.form.first_name.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.first_name.required">{{ $t('please.enter') + $t('first.name') }}</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('last.name')" class="has-float-label mb-4">
                <b-form-input type="text" v-model.trim="$v.form.last_name.$model" :state="!$v.form.last_name.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.last_name.required">{{ $t('please.enter') + $t('last.name') }}</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('phone')" class="has-float-label mb-4">
                <b-form-input type="text" v-model.trim="$v.form.phone.$model" :state="!$v.form.phone.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.phone.required">{{ $t('please.enter') + $t('phone') }}</b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.phone.valid">{{ $t('phone') }} is error value. Ex: +998 XX XXX XX XX</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('email')" class="has-float-label mb-4">
                <b-form-input type="text" v-model.trim="$v.form.email.$model" :state="!$v.form.email.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.email.required">{{ $t('please.enter') + $t('email') }}</b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.email.email">{{ $t('error.email') }}</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group v-if="!form.id" :label="$t('password')" class="has-float-label mb-4">
                <b-form-input type="text" v-model.trim="$v.form.password.$model" :state="!$v.form.password.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.password.required">{{ $t('please.enter') + $t('password') }}</b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.password.minLength">{{ $t('password') }} is minimumm 6 characters</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group v-if="!form.id" :label="$t('re.password')" class="has-float-label mb-4">
                <b-form-input type="text" v-model.trim="$v.form.re_password.$model" :state="!$v.form.re_password.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.re_password.sameAsPassword">{{ $t('re.password.error') }}</b-form-invalid-feedback>
              </b-form-group>
              <!--            <b-form-group :label="$t('pages.status')">-->
              <!--              <b-form-radio-group stacked class="pt-2" :options="statuses" v-model="form.is_active" />-->
              <!--            </b-form-group>-->
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
          :title="$t('menu.users')"
          :changeOrderBy="changeOrderBy"
          :sort="sort"
          @search="searchName"
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
                <div class="glyph-icon simple-icon-eye mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer" @click="$router.push({ name: 'user_details', params: { id: row.item.id } })"></div>
                <div class="glyph-icon simple-icon-pencil mr-2" @click="edit(row)" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
                <div @click="$store.commit('DELETE_MODAL', { isShow: true, data: row.item})" class="glyph-icon simple-icon-trash mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
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
import { actions, getters } from "../../../utils/store_schema";
import moment from 'moment'
const _page = 'users'
const { get, getById, put, post, remove } = actions(_page)
export default {
  components: {
    "list-page-heading": ListPageHeading,
    Pagination
    // TableSimple
  },
  validations: {
    form: {
      first_name: {
        required
      },
      last_name: {
        required
      },
      email: {
        required, email
      },
      phone: {
        required,
        valid: (e) => /^[+][9][9][8]\d{9}$/.test(e)
      },
      password: {
        required,
        minLength: minLength(6)
      },
      re_password: {
        sameAsPassword: sameAs('password')
      }
    }
  },
  mixins: [validationMixin],
  computed: {
    ...mapGetters(getters(_page)),
  },
  data() {
    return {
      form: {
        id: null,
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        password: null,
        re_password: null,
        balance: 0
      },
      sort: {
        column: "title",
        label: "Product Name"
      },
      search: "",
      fields: [
        {
          key: 'id',
          label: this.$t('id'),
          // tdClass: 'firstColumn'
        },
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
          key: 'count',
          label: this.$t('order.count'),
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
  methods: {
    moment,
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
      this.form = {
        id: null,
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        password: null,
        re_password: null,
        balance: 0
      }
    },
    edit (item) {
      const _data = { ...item.item }
      delete _data.date_joined
      delete _data.is_staff
      delete _data.is_superuser
      delete _data.last_login
      _data.re_password = _data.password
      console.log(_data)
      this.form = _data
      this.$bvModal.show('crudModal')
    },
    submit() {
      this.$v.$touch();
      console.log(this.$v)
      if (!this.$v.$invalid) {
        const _form = { ...this.form }
        delete _form.id
        delete _form.re_password
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
        search: this.search
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
    searchName(val) {
      console.log(val)
      this.search = val
      this.page = 1
      this.getData()
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
  // watch: {
  //   search() {
  //     this.page = 1;
  //   },
  // },
  mounted() {
    const _hash = this.$route.hash
    let _page;
    if (_hash) {
      _page = this.$route.hash.split('-')[1]
      this.page = parseInt(_page)
    }
    this.getData()
  }
};
</script>
<style>
</style>
