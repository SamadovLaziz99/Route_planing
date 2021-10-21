<template>
  <div>
    <b-row v-if="!error">
      <b-colxx class="disable-text-selection">
        <list-page-heading
          :title="$t('menu.transactions')"
          :displayMode="'list'"
          :searchChange="searchChange"
          :from="from"
          :to="to"
          :total="pagination.total"
          :perPage="15"
        >
          <div class="float-md-right pt-1">
            <span class="text-muted text-small mr-1 mb-2">{{ from }}-{{ to }} {{ $t('of') }} {{ pagination.total }}</span>
          </div>
        </list-page-heading>
        <b-card :title="$t(`menu.transactions`)" class="mb-4">
          <b-table
            hover
            :items="items"
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
          label: this.$t('external_id'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'state',
          label: this.$t('state'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'pay_date',
          label: this.$t('pay_date'),
          tdClass: 'w-25'
        },
        {
          key: 'create_date',
          label: this.$t('create_date'),
          tdClass: 'w-25'
        },
      ],
      page: 1,
      search: "",
      from: 0,
      to: 0,
    };
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
    changePagination(e) {
      this.page = e
      this.getData()
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
