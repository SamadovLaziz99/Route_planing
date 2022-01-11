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
                <div class="glyph-icon simple-icon-eye mr-2" @click="showItem(row.item)" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
<!--                <div @click="$store.commit('DELETE_MODAL', { isShow: true, data: row.item})" class="glyph-icon simple-icon-trash mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>-->
              </div>
            </template>
            <template #cell(create_date)="row">
              {{ moment(row.item.create_date).format('YYYY-MM-DD HH:mm') }}
            </template>
            <template #cell(pay_date)="row">
              {{ moment(row.item.pay_date).format('YYYY-MM-DD HH:mm') }}
            </template>
            <template #cell(receipts_first_state)="{ item }">
              <div v-if="item.receipts">{{ getStateType(item.receipts[0].state) }}</div>
            </template>
            <template #cell(receipts_second_state)="{ item }">
              <div v-if="item.receipts">{{ getStateType(item.receipts[1].state) }}</div>
            </template>
            <template #cell(state)="{ item }">
              <div v-if="item.state">{{ getStateType(item.state) }}</div>
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
          <b-modal v-model="info.show" title="Информация о транзакциях">
            <dvi v-if="info.data">
              <p>ID: #{{ info.data.id }}</p>
              <p>Количество продукта: {{ info.data.detail.productAmount }}</p>
              <p>Сумма доставки: {{ info.data.detail.deliveryAmount }}</p>
              <p>Статус транзакция: {{ getStateType(info.data.state) }}</p>
<!--              <h3><strong>Receipts: </strong></h3>-->
              <div v-if="info.data.receipts" style="display: flex; justify-content: space-between">
                <div>
                  <h3><strong>Повар: </strong></h3>
                  <hr>
                  <p>Количество: {{ info.data.receipts[0].amount }}</p>
                  <p>Комиссия: {{ info.data.receipts[0].commission }}</p>
                  <p>Статус: {{ getStateType(info.data.receipts[0].state) }}</p>
                  <p>Дата: {{ moment(info.data.receipts[0].createDate).format('YYYY-MM-DD HH:mm') }}</p>
                </div>
                <div>
                  <h3><strong>Курьер: </strong></h3>
                  <hr>
                  <p>Количество: {{ info.data.receipts[1].amount }}</p>
                  <p>Комиссия: {{ info.data.receipts[1].commission }}</p>
                  <p>Статус: {{ getStateType(info.data.receipts[1].state) }}</p>
                  <p>Дата: {{ moment(info.data.receipts[1].createDate).format('YYYY-MM-DD HH:mm') }}</p>
                </div>
              </div>
            </dvi>
          </b-modal>
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
          key: 'id',
          label: this.$t('id'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'amount',
          label: this.$t('all_price'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'external_id',
          label: this.$t('external_id'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'receipts_first_state',
          label: this.$t('stats.tr.vendor'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'receipts_second_state',
          label: this.$t('stats.tr.courier'),
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
          // tdClass: 'w-25'
        },
        {
          key: 'create_date',
          label: this.$t('create_date'),
          class: 'text-center',
          tdClass: 'text-muted',
          // tdClass: 'w-25'
        },
        {
          key: 'action',
          label: this.$t('action'),
          class: 'text-center',
          tdClass: 'text-muted',
          // tdClass: 'w-25'
        },
      ],
      info: {
        show: false,
        data: null
      },
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
    const _hash = this.$route.hash
    let _page;
    if (_hash) {
      _page = this.$route.hash.split('-')[1]
      this.page = parseInt(_page)
    }
    this.getData()
  },
  methods: {
    moment,
    showItem (e) {
      this.info.show = true
      this.info.data = e
      // console.log(e)
    },
    getStateType (key) {
      let val;
      switch (key) {
        case 0: val = this.$t('trans.CREATED')
          break;
        case 5: val = this.$t('trans.HOLD')
          break;
        case 4: val = this.$t('trans.SUCCESS')
          break;
        case 50: val = this.$t('trans.REVERSED')
          break;
        case 51: val = this.$t('trans.CANCELLED')
          break;
        case 52: val = this.$t('trans.FAILED')
          break;
        case 28: val = this.$t('trans.WAIT_HOLD_CONFIRMATION')
          break;
        case 29: val = this.$t('trans.CONFIRM_AND_WAIT_SEND_ABS')
          break;
        case 30: val = this.$t('trans.WAITING')
          break;
        default: break;
      }
      return val
    },
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
