<template>
  <div>
    <b-row v-if="!error">
      <b-colxx class="disable-text-selection">
        <list-page-heading
          :title="$t('menu.transactions')"
          :displayMode="'list'"
          :sortOptions="sortOptions"
          :changeOrderBy="changeOrderBy"
          :sort="sort"
          :searchChange="searchChange"
          :from="from"
          :to="to"
          :total="pagination.total"
          :perPage="15"
        ></list-page-heading>
        <b-card :title="$t(`menu.transactions`)">
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
            <template #cell(create_date)="row">
              {{ moment(row.item.create_date).format('YYYY-MM-DD HH:mm') }}
            </template>
            <template #cell(pay_date)="row">
              {{ moment(row.item.pay_date).format('YYYY-MM-DD HH:mm') }}
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
import moment from "moment";
import { mapGetters } from "vuex";
const _page = 'transactions'
import { actions, getters } from "../../../utils/store_schema";
const { get, getById, put, post, remove } = actions(_page)
export default {
  components: {
    "list-page-heading": ListPageHeading,
    Pagination
  },
  data() {
    return {
      activeTab: 0,
      fields: [
        {
          key: 'external_id',
          label: 'External Id',
          // tdClass: 'firstColumn'
        },
        {
          key: 'state',
          label: 'State',
          // tdClass: 'firstColumn'
        },
        {
          key: 'pay_date',
          label: 'Pay date',
          // tdClass: 'firstColumn'
        },
        {
          key: 'create_date',
          label: 'Create date',
          // tdClass: 'firstColumn'
        },
        {
          key: 'action',
          label: 'Action',
          // tdClass: 'thirdRow'
        }
      ],
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
    items() {
      return this.data
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    moment,
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
    editItem (id) {
      this.$bvModal.show('crudModal')
      this.$store.dispatch(getById, id).then(res => {
        const e = res.media[0]
        setTimeout(() => {
          this.$refs.dropzoneBanner.setDefaultImage({
            size: e.size, name: e.path, type: e.mime_type, id: e.id
          }, e.url)
        }, 0)
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
        foods: [],
        position: null,
        active: true,
        category: null
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
