<template>
  <div>
    <b-row v-if="!errorUsers">
      <div v-if="oneLoadUsers && !user" class="loading"></div>
      <b-colxx v-if="user" xxs="12">
        <h1>{{ user.first_name }} {{ user.last_name }} - #{{ $route.params.id }}</h1>
        <piaf-breadcrumb/>
        <b-row>
          <b-colxx xxs="12" lg="4" class="mb-4">
            <b-card class="mb-4" no-body>
              <!--              <div class="position-absolute card-top-buttons">-->
              <!--                <b-button variant="outline-white" class="icon-button">-->
              <!--                  <i class="simple-icon-pencil"/>-->
              <!--                </b-button>-->
              <!--              </div>-->
              <img :src="defImage" alt="Detail" class="card-img-top"/>
              <b-card-body>
                <p class="text-muted text-small mb-2">{{ $t('first.name') }}</p>
                <p class="mb-3">{{ user.first_name }}</p>
                <p class="text-muted text-small mb-2">{{ $t('last.name') }}</p>
                <p class="mb-3">{{ user.last_name }}</p>
                <p class="text-muted text-small mb-2">{{ $t('phone') }}</p>
                <p class="mb-3">{{ user.phone }}</p>
                <p class="text-muted text-small mb-2">{{ $t('balance') }}</p>
                <p class="mb-3">{{ new Intl.NumberFormat().format(user.balance) }} {{ $t('sum') }}</p>
                <p class="text-muted text-small mb-2">{{ $t('created_at') }}</p>
                <p>{{ moment(user.created_at).format('YYYY-MM-DD HH:mm') }}</p>
              </b-card-body>
            </b-card>
          </b-colxx>
          <b-colxx xxs="12" lg="8">
            <b-card class="mb-4" :title="$t('menu.orders')">
              <b-table
                hover
                :items="orders"
                :fields="fields"
                :busy="loadOrders"
                show-empty
                responsive
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
                <template #cell(action)="{ item }">
                  <div style="display: flex">
                    <div @click="$router.push({ name: 'order_details', params: { id: item.id } })"
                         class="glyph-icon simple-icon-eye mr-2 w-100 text-center action_button" id="view_button"
                         style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
                  </div>
                </template>
                <template #cell(status)="{ item }">
                  <b-badge pill :variant="badgeType(item.status)">{{ $t(`order.${item.status}`) }}</b-badge>
                </template>
                <template #cell(time)="{ item }">
                  {{ moment(item.created_at).format('YYYY-MM-DD HH:mm') }}
                </template>
                <template #cell(id)="{ item }">
                  <div>#{{ item.id }}</div>
                </template>
                <template #cell(payment_type)="{ item }">
                  <div v-if="item.payment_type === 'cash'" style="font-size: 28px"
                       class="iconsminds-dollar text-primary"></div>
                  <div v-if="item.payment_type === 'balance'" style="font-size: 28px"
                       class="iconsminds-wallet text-primary"></div>
                  <div v-if="item.payment_type === 'card'" style="font-size: 28px"
                       class="simple-icon-credit-card text-primary"></div>
                </template>
                <template #cell(delivery_time)="{ item }">
                  {{ moment(item.delivery_time).format('YYYY-MM-DD HH:mm') }}
                </template>
                <template #cell(vendor)="{ item }">
                  {{ item.vendor.user.first_name + ' ' + item.vendor.user.last_name }}
                </template>
                <template #cell(customer)="{ item }">
                  {{ item.user.first_name + ' ' + item.user.last_name }}
                </template>
              </b-table>
            </b-card>
          </b-colxx>
        </b-row>
      </b-colxx>
    </b-row>
    <error-page v-else :error="errorUsers"/>
  </div>
</template>

<script>
import {comments} from "../../../data/comments";
import EmptyBox from "../../../components/EmptyBox";
import moment from "moment";
import {mapGetters} from "vuex";

export default {
  components: {
    EmptyBox
  },
  data() {
    return {
      isLoad: false,
      comments: comments.slice(0, 5),
      user: null,
      fields: [
        {
          key: 'id',
          label: this.$t('id'),
          tdClass: 'firstColumn'
        },
        {
          key: 'customer',
          label: this.$t('customer'),
          tdClass: 'firstColumn'
        },
        {
          key: 'vendor',
          label: this.$t('vendor'),
          tdClass: 'text-muted'
        },
        {
          key: 'additional_phone',
          label: this.$t('phone'),
          tdClass: 'text-muted'
        },
        {
          key: 'payment_type',
          label: this.$t('payment_type'),
          tdClass: 'text-muted',
          class: 'text-center'
        },
        {
          key: 'order_price',
          label: this.$t('order_price'),
          tdClass: 'text-muted',
          class: 'text-center'
        },
        {
          key: 'time',
          label: this.$t('order_time'),
          tdClass: 'text-muted'
        },
        {
          key: 'delivery_time',
          label: this.$t('delivery_time'),
          tdClass: 'text-muted'
        },
        {
          key: 'status',
          label: this.$t('status'),
          class: 'text-center'
          // tdClass: 'secondColumn'
        },
        {
          key: 'action',
          label: this.$t('action'),
          class: 'text-center'
        }
      ],
      defImage: '/assets/img/profiles/8.jpg',
      userImage: null,
      orders: []
    };
  },
  methods: {
    moment,
    badgeType(type) {
      switch (type) {
        case 'pending':
          return 'info'
          break;
        case 'accepted':
          return 'secondary'
          break;
        case 'in_process':
          return 'light'
          break;
        case 'shipping':
          return 'dark'
          break;
        case 'finished':
          return 'success'
          break;
        case 'cancelled':
          return 'danger'
          break;
        default:
          return 'primary'
          break;
      }
    },
  },
  computed: {
    ...mapGetters(['errorUsers', 'oneLoadUsers', 'loadOrders']),
  },
  mounted() {
    this.$store.dispatch('getOrders', {
      user_id: this.$route.params.id,
      no_page: true
    }).then(res => {
      this.orders = res;
      console.log(res);
    })
    this.$store.dispatch('getByIdUsers', this.$route.params.id).then(res => {
      this.user = res
    })
  }
};
</script>
