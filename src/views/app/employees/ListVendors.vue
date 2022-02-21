<template>
  <div>
    <b-row v-if="!error">
      <b-colxx class="disable-text-selection">
        <remove-modal v-if="$store.getters.deleteModal.isShow" @removing="removeItem"/>
        <list-page-heading
          :title="$t('menu.vendors')"
          :displayMode="displayMode"
          @filters="filterChanging"
          :from="from"
          :to="to"
          :total="pagination.total"
          :perPage="15"
        >
          <b-button
            slot="action"
            variant="primary"
            size="lg"
            @click="$router.push({ name: 'vendor_create' })"
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
        <b-card :title="$t(`menu.vendors`)" class="mb-4">
          <!--          <div class="all_table w-100">-->
          <b-table
            hover
            :items="items"
            :fields="fields"
            :busy="load"
            responsive
            show-empty
          >
            <template #empty>
              <EmptyBox style="margin-top: 50px"/>
            </template>
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>{{ $t('loading') }}...</strong>
              </div>
            </template>
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>{{ $t('loading') }}...</strong>
              </div>
            </template>
            <template #cell(action)="row">
              <div style="display: flex">
                <div class="glyph-icon simple-icon-eye mr-2" @click="$router.push({ name: 'vendor-detail', params: { id: row.item.id } })" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
                <div class="glyph-icon simple-icon-pencil mr-2" @click="$router.push({ name: 'vendor_update', params: { id: row.item.id } })" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
                <div @click="$store.commit('DELETE_MODAL', { isShow: true, data: row.item})" class="glyph-icon simple-icon-trash mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
              </div>
            </template>
            <template #cell(image)="row">
              <img class="food_img" :src="row.item.img" :alt="row.item.name">
            </template>
            <template #cell(category)="row">
              <div>{{ row.item.category ? row.item.category.name[$lang] : '' }}</div>
            </template>
            <template #cell(name)="{ item }">
              <div>{{ item.user ? (item.user.first_name + ' '  + item.user.last_name) : '' }}</div>
            </template>
            <template #cell(unit)="row">
              <div>{{ row.item.unit ? row.item.unit.name[$lang] : '' }}</div>
            </template>
            <template #cell(vendor)="row">
              <div>{{ row.item.vendor ? row.item.vendor.user.first_name + ' ' + row.item.vendor.user.last_name : '' }}</div>
            </template>
          </b-table>
          <Pagination v-if="pagination.total > 15" :page="pagination.page" :total="pagination.total" @changePagination="changePage"/>
          <!--          </div>-->
        </b-card>
      </b-colxx>
    </b-row>
    <error-page v-else :error="error"/>
  </div>
</template>

<script>
import ListPageHeading from "./Heading";
import ListPageListing from "./Listing";
import { mapGetters } from "vuex";
import { actions, getters } from "../../../utils/store_schema";
import Pagination from "../../../components/TableComponents/Pagination";
import { imageProxy } from "../../../utils";
import EmptyBox from "../../../components/EmptyBox";
import moment from "moment";
const _page = 'vendors'
const { get, getById, put, post, remove } = actions(_page)
export default {
  components: {
    EmptyBox,
    "list-page-heading": ListPageHeading,
    "list-page-listing": ListPageListing,
    Pagination
  },
  data() {
    return {
      foods: [],
      categories: [],
      displayMode: "thumb",
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
      from: 0,
      to: 0,
      filters: null,
      fields: [
        {
          key: 'id',
          label: this.$t('id')
        },
        {
          key: 'image',
          label: this.$t('image')
        },
        {
          key: 'name',
          label: this.$t('name'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'user.phone',
          label: this.$t('phone'),
          // tdClass: 'firstColumn'
        },
        // {
        //   key: 'user.email',
        //   label: this.$t('email'),
        //   // tdClass: 'firstColumn'
        // },
        {
          key: 'from_field',
          label: this.$t('from_field'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'to',
          label: this.$t('to'),
          // tdClass: 'firstColumn'
        },
        // {
        //   key: 'price',
        //   label: this.$t('price'),
        //   // tdClass: 'firstColumn'
        // },
        // {
        //   key: 'sale_price',
        //   label: this.$t('sale_price'),
        //   // tdClass: 'firstColumn'
        // },
        // {
        //   key: 'preparation_time',
        //   label: this.$t('preparation_time'),
        //   tdClass: 'firstColumn'
        // },
        {
          key: 'action',
          label: this.$t('action'),
          // tdClass: 'thirdRow'
        }
      ],
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
      return this.data.map(e => {
        return {
          ...e,
          img: e.image ? imageProxy(e.image, '120x120') : undefined
        }
      })
    }
  },
  mounted() {
    this.$store.dispatch('getExcelVendors')
    const _hash = this.$route.hash
    const _query = this.$route.query
    this.filters = _query
    let _page;
    if (_hash) {
      _page = this.$route.hash.split('-')[1]
      this.page = parseInt(_page)
    }
    this.getData(_query)
  },
  methods: {
    moment,
    filterChanging (val) {
      this.filters = val
      this.page = 1
      this.$router.push({ name: this.$route.name, query: this.filters })
      this.getData({
        name: val.name,
        id: val.id,
        registration_from: val.registration_from,
        registration_to: val.registration_to
      })
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const _form = { ...this.form }
        delete _form.id
        _form.category = this.form.category?.value
        _form.position = parseInt(this.form.position)
        this.$store.dispatch(this.form.id ? put : post, {
          id: this.form.id,
          data: _form
        }).then(res => {
          this.$refs.crudModal.hideModal()
          this.getData()
        })
      }
    },
    excelReport () {
      const { name, registration_from, registration_to, id } = this.filters
      const link = document.createElement('a')
      link.href = process.env.VUE_APP_BASE_URL + `/vendors/download/?id=${id || ''}&name=${name || ''}&registration_from=${registration_from || ''}&registration_to=${registration_to || ''}`
      // link.href = process.env.VUE_APP_BASE_URL + `/vendors/download/name=id=registration_from=registration_to`
      console.log(link.href)
      link.setAttribute('download', 'Report')
      document.body.appendChild(link)
      link.click()
    },
    viewItem (id) {
      console.log(id)
      this.$router.push({ name: 'food_detail', params: { id: id } })
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
        position: null,
        active: true
      }
    },
    closed(e) {
      this.clear()
      console.log(e)
    },
    changeOrderBy(sort) {
      this.sort = sort;
    },
    changePage(n) {
      this.page = n
      this.getData()
    },
    getData(params) {
      this.$store.dispatch(get, {
        page: this.page,
        ...params
        // ...this.filters
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
.food_img {
  border-radius: 10px;
}
</style>
