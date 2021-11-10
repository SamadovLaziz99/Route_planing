<template>
  <div>
    <b-row v-if="!error">
      <b-colxx class="disable-text-selection">
        <crud-modal ref="crudModal" @closeable="closed" :name="form.id ? 'voucher.update' : 'voucher.create'">
          <div slot="content">
            <b-form class="av-tooltip tooltip-right-bottom">
              <b-form-group :label="$t('count')" class="has-float-label mb-4">
                <b-form-input type="number" v-model.trim="$v.form.count.$model" :state="!$v.form.count.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.count.required">{{ $t('please.enter') + $t('count') }}</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('amount')" class="has-float-label mb-4">
                <b-form-input type="number" v-model.trim="$v.form.amount.$model" :state="!$v.form.amount.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.amount.required">{{ $t('please.enter') + $t('amount') }}</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('active_date_from')" class="has-float-label mb-4">
                <datepicker
                    :bootstrap-styling="true"
                    :format="(val) => moment(val).format('YYYY-MM-DD')"
                    :language="ru"
                    :placeholder="$t('form-components.date')"
                    v-model="$v.form.active_date_from.$model"
                    :state="!$v.form.active_date_from.$error"
                ></datepicker>
                <b-form-invalid-feedback v-if="!$v.form.active_date_from.required">{{ $t('please.enter') + $t('active_date_from') }}</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('active_date_to')" class="has-float-label mb-4">
                <datepicker
                    :bootstrap-styling="true"
                    :format="(val) => moment(val).format('YYYY-MM-DD')"
                    :language="ru"
                    :placeholder="$t('form-components.date')"
                    v-model="$v.form.active_date_to.$model"
                    :state="!$v.form.active_date_to.$error"
                ></datepicker>
                <b-form-invalid-feedback v-if="!$v.form.active_date_to.required">{{ $t('please.enter') + $t('active_date_to') }}</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('tag')" class="has-float-label mb-4">
                <b-form-input type="text" v-model.trim="$v.form.tag.$model" :state="!$v.form.tag.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.tag.required">{{ $t('please.enter') + $t('tag') }}</b-form-invalid-feedback>
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
          :title="$t('menu.vouchers')"
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
              <div style="display: flex; justify-content: center">
                <!--              <div class="glyph-icon simple-icon-eye mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280"></div>-->
<!--                <div class="glyph-icon simple-icon-pencil mr-2" @click="edit(row)" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>-->
                <div @click="$store.commit('DELETE_MODAL', { isShow: true, data: row.item})" class="glyph-icon simple-icon-trash mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
              </div>
            </template>
            <template #cell(code)="{ item }">
              <div class="code" v-clipboard:copy="item.code" v-clipboard:success="onCopy">
                {{item.code}}
              </div>
            </template>
            <template #cell(used)="{ item }">
              <b-badge pill :variant="item.used ? 'primary' : 'dark'">{{ item.used ? $t('used') : $t('unused') }}</b-badge>
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
import Pagination from "../../../components/TableComponents/Pagination";
import {mapGetters} from "vuex";
import {required, email, sameAs, minLength} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
import { actions, getters } from "../../../utils/store_schema";
import Datepicker from "vuejs-datepicker";
import {ru} from 'vuejs-datepicker/dist/locale'
import moment from 'moment'
import debounce from "debounce";
const _page = 'vouchers'
const { get, getById, put, post, remove } = actions(_page)
export default {
  components: {
    "list-page-heading": ListPageHeading,
    Pagination,
    datepicker: Datepicker
    // TableSimple
  },
  validations: {
    form: {
      count: { required },
      active_date_from: { required },
      active_date_to: { required },
      amount: { required },
      tag: { required }
    }
  },
  mixins: [validationMixin],
  computed: {
    ...mapGetters(getters(_page)),
  },
  data() {
    this.searchChange = debounce(this.searchChange, 800)
    return {
      ru: ru,
      code: '',
      form: {
        id: null,
        count: null,
        amount: null,
        active_date_from: null,
        active_date_to: null,
        tag: null
      },
      search: "",
      sort: {
        column: "title",
        label: "Product Name"
      },
      fields: [
        {
          key: 'id',
          label: this.$t('id'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'code',
          label: this.$t('code'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'amount',
          label: this.$t('amount'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'tag',
          label: this.$t('tag'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'used',
          label: this.$t('used'),
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
          class: 'text-center'
        }
      ],
      page: 1,
      from: 0,
      to: 0
    };
  },
  methods: {
    moment,
    onCopy (e) {
      this.$store.dispatch('success_alert', {
        title: 'Copied',
        message: e.text
      })
      console.log('Copied:', e.text)
    },
    closed (e) {
      console.log(e)
      this.clear()
    },
    clear() {
      this.$v.$reset()
      this.form = {
        id: null,
        count: null,
        amount: null,
        active_date_from: null,
        active_date_to: null,
        tag: null
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
      if (this.form.active_date_from) this.form.active_date_from = moment(this.form.active_date_from).format('YYYY-MM-DD')
      if (this.form.active_date_to) this.form.active_date_to = moment(this.form.active_date_to).format('YYYY-MM-DD')
      this.$v.$touch();
      console.log(this.$v)
      console.log(this.form)
      if (!this.$v.$invalid) {
        const _form = { ...this.form }
        delete _form.id
        _form.amount = parseInt(this.form.amount)
        _form.count = parseInt(this.form.count)
        // if (this.form.id) delete _form.password
        this.$store.dispatch(this.form.id ? put : 'batchVoucher', {
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
        tag: this.search
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
      console.log(val)
      this.search = val;
      this.page = 1;
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
  watch: {
    search() {
      this.page = 1;
    },
  },
  mounted() {
    const _hash = this.$route.hash
    let _page;
    if (_hash) {
      _page = this.$route.hash.slice(this.$route.hash.length - 1)
      this.page = parseInt(_page)
    }
    this.getData()
  }
};
</script>
<style>
.code {
  cursor: pointer;
  text-align: center;
  padding: 2px 4px;
  border-radius: 5px;
  transition: all, .3s;
}
.code:hover {
  background: #cbcbcb;
}
</style>
