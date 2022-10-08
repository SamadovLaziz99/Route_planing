<template>
  <div>
    <b-row v-if="!error">
      <b-colxx class="disable-text-selection">
        <crud-modal ref="crudModal" @closeable="closed" :name="form.id ? 'inventory.update' : 'inventory.create'">
          <div slot="content">
            <b-form class="av-tooltip tooltip-right-bottom">
              <b-form-group :label="$t('name')" class="has-float-label mb-4">
                <b-form-input type="text" v-model.trim="$v.form.name.$model" :state="!$v.form.name.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.name.required">{{
                    $t('please.enter') + $t('name')
                  }}
                </b-form-invalid-feedback>
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
          :title="$t('menu.inventory')"
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
        <b-card :title="$t(`menu.inventory`)" class="mb-4">
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
                <!--                <div class="glyph-icon simple-icon-eye mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer" @click="$router.push({ name: 'user_details', params: { id: row.item.id } })"></div>-->
                <div class="glyph-icon simple-icon-pencil mr-2" @click="edit(row)"
                     style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
                <div @click="$store.commit('DELETE_MODAL', { isShow: true, data: row.item})"
                     class="glyph-icon simple-icon-trash mr-2"
                     style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
              </div>
            </template>
          </b-table>
          <Pagination :page="pagination.page" :per-page="pagination.limit" :total="pagination.total"
                      @changePagination="changePagination"/>
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
import moment from 'moment'

const _page = 'inventory'
const {get, getById, put, post, remove} = actions(_page)
export default {
  components: {
    "list-page-heading": ListPageHeading,
    Pagination
    // TableSimple
  },
  validations: {
    form: {
      name: {
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
      form: {
        name: ''
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
          key: 'name',
          label: this.$t('name'),
          tdClass: 'w-100'
        },
        {
          key: 'action',
          label: this.$t('action'),
          tdClass: 'w-30 right'
        }
      ],
      page: 1,
      from: 0,
      to: 0
    };
  },
  methods: {
    moment,
    closed(e) {
      console.log(e)
      this.clear()
    },
    clear() {
      this.$v.$reset()
      this.form = {
        id: null,
        name: ''
      }
    },
    edit(item) {
      const _data = {...item.item}
      this.form = _data
      this.$bvModal.show('crudModal')
    },
    submit() {
      this.$v.$touch();
      console.log(this.$v)
      if (!this.$v.$invalid) {
        const _form = {...this.form}
        delete _form.id
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
    changePagination(e) {
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
    this.getData()
  }
};
</script>
<style>
</style>
