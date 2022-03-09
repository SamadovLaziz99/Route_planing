<template>
  <div>
    <b-row v-if="!error">
      <b-colxx class="disable-text-selection">
        <remove-modal v-if="$store.getters.deleteModal.isShow" @removing="removeItem"/>
        <confirm-modal ref="confirmModal" @submitted="updateStatus"/>
        <list-page-heading
          :title="$t('menu.applicants')"
          :from="from"
          :to="to"
          :total="pagination.total"
          :perPage="15"
        />
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
            show-empty
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
  },
  computed: {
    ...mapGetters(getters(_page)),
  },
  data() {
    return {
      statuses: [
        'pending',
        'interview',
        'training',
        'teste',
        'in_process',
        'vendor'
      ],
      activeTab: 0,
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
      to: 0
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
      this.$refs.confirmModal.show({
        status: val,
        item: item.item
      })
    },
    updateStatus (val) {
      this.$store.dispatch('changeStatusApplicants', {
        id: val.id,
        data: {
          status: val.status,
          comment: val.comment
        }
      }).then(res => {
        this.$refs.confirmModal.hide()
        this.getData()
      })
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
    const _hash = this.$route.hash
    let _page;
    if (_hash) {
      _page = this.$route.hash.split('-')[1]
      this.page = parseInt(_page)
    }
    if (this.$route.query.status) {
      this.statusNumber(this.$route.query.status)
    }
    this.getData()
  }
};
</script>
<style>
</style>
