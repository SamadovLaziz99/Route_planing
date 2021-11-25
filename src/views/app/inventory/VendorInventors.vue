<template>
  <div>
    <b-row v-if="!error">
      <b-colxx class="disable-text-selection">
        <crud-modal ref="crudModal" @closeable="closed" :name="form.id ? 'inventory.update' : 'inventory.create'">
          <div slot="content">
            <b-form class="av-tooltip tooltip-right-bottom">
              <b-form-group :label="$t('menu.inventory')" class="has-float-label mb-4">
                <v-select :options="inventorys" v-model.trim="$v.form.type.$model"  :state="!$v.form.type.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.type.required">{{ $t('please.enter') + $t('inventory') }}</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('vendor')" class="has-float-label mb-4">
                <v-select :options="vendors" v-model.trim="$v.form.vendor.$model"  :state="!$v.form.vendor.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.vendor.required">{{ $t('please.enter') + $t('vendor') }}</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('count')" class="has-float-label mb-4">
                <b-form-input type="number" v-model.trim="$v.form.count.$model"  :state="!$v.form.count.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.count.required">
                  {{ $t('please.enter') + $t('count') }}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('used')" class="has-float-label mb-4">
                <b-form-input type="number" v-model.trim="$v.form.used.$model"  :state="!$v.form.used.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.used.required">
                  {{ $t('please.enter') + $t('used') }}
                </b-form-invalid-feedback>
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
          :title="$t('menu.vendor_inventory')"
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
        <b-card :title="$t(`menu.vendor_inventory`)" class="mb-4">
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
            <template #cell(vendor)="{ item }">
              {{ vendors.filter(e => e.value === item.vendor)[0].label }}
            </template>
            <template #cell(action)="row">
              <div style="display: flex">
                <!--                <div class="glyph-icon simple-icon-eye mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer" @click="$router.push({ name: 'user_details', params: { id: row.item.id } })"></div>-->
                <div class="glyph-icon simple-icon-pencil mr-2" @click="edit(row)" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
                <div @click="$store.commit('DELETE_MODAL', { isShow: true, data: row.item})" class="glyph-icon simple-icon-trash mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
              </div>
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
import {required} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
import { actions, getters } from "../../../utils/store_schema";
import moment from 'moment'
const _page = 'vendorinv'
const { get, getById, put, post, remove } = actions(_page)
export default {
  components: {
    "list-page-heading": ListPageHeading,
    Pagination
    // TableSimple
  },
  validations: {
    form: {
      vendor: { required },
      type: { required },
      used: { required },
      count: { required },
    }
  },
  mixins: [validationMixin],
  data() {
    return {
      form: {
        vendor: null,
        count: null,
        used: null,
        type: null
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
          key: 'type.name',
          label: this.$t('name'),
          tdClass: 'w-30'
        },
        {
          key: 'vendor',
          label: this.$t('vendor'),
          // tdClass: 'w-100'
        },
        {
          key: 'count',
          label: this.$t('count'),
          // tdClass: 'w-100'
        },
        {
          key: 'used',
          label: this.$t('used'),
          // tdClass: 'w-100'
        },
        {
          key: 'action',
          label: this.$t('action'),
          // tdClass: 'w-30'
        }
      ],
      page: 1,
      from: 0,
      to: 0
    };
  },
  computed: {
    ...mapGetters(getters(_page)),
    ...mapGetters(['dataInventory', 'dataVendors']),
    inventorys () {
      return this.dataInventory.map(e => {
        return {
          label: e.name,
          value: e.id
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
    }
  },
  methods: {
    moment,
    closed (e) {
      console.log(e)
      this.clear()
    },
    clear() {
      this.$v.$reset()
      this.form = {
        id: null,
        vendor: null,
        count: null,
        used: null,
        type: null
      }
    },
    edit (item) {
      console.log(item)
      const _data = { ...item.item }
      this.form = _data
      this.form.vendor = this.vendors.filter(e => e.value === _data.vendor)[0]
      this.form.type = this.inventorys.filter(e => e.value === _data.type.id)[0]
      this.$bvModal.show('crudModal')
    },
    submit() {
      this.$v.$touch();
      console.log(this.$v)
      if (!this.$v.$invalid) {
        const _form = { ...this.form }
        delete _form.id
        _form.type_id = this.form.type.value
        _form.vendor = this.form.vendor.value
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
    this.$store.dispatch('getInventory')
    this.$store.dispatch('getVendors', {
      no_page: true
    })
    this.getData()
  }
};
</script>
<style>
</style>
