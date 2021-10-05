<template>
<b-card class="d-flex flex-row mb-3" no-body>
    <div class="d-flex flex-grow-1 min-width-zero">
        <b-card-body class="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <router-link :to="detailPath" class="list-item-heading mb-1 truncate w-40 w-xs-100">
              {{ data.user ? (data.user.first_name + ' ' + data.user.last_name) : '' }}
            </router-link>
            <p v-if="data.user.phone" class="mb-1 text-muted text-small w-15 w-xs-100">{{ data.user.phone }}</p>
<!--            <p v-if="data.payment_type" class="mb-1 text-muted text-small w-15 w-xs-100">{{ data.payment_type }}</p>-->
<!--            <p v-if="data.price" class="mb-1 text-muted text-small w-20 w-xs-100">{{ data.price }}</p>-->
            <p v-if="data.total_price" class="mb-1 text-muted text-small w-15 w-xs-100">{{ data.total_price }}</p>
            <p v-if="data.user_address" class="mb-1 text-muted text-small w-15 w-xs-100">{{ data.user_address.address_name }}</p>
<!--            <p v-if="data.date" class="mb-1 text-muted text-small w-15 w-xs-100">{{ data.date }}</p>-->
            <div class="w-15 w-xs-100 text-right">
              <b-badge pill :variant="badgeType(data.status)">{{ $t(`order.${data.status}`) }}</b-badge>
            </div>
        </b-card-body>
    </div>
</b-card>
</template>

<script>
export default {
    props: ['data', 'detailPath'],
  methods: {
    badgeType(type) {
      switch (type) {
        case 'pending': return 'info'
          break;
        case 'accepted': return 'secondary'
          break;
        case 'in_process': return 'light'
          break;
        case 'shipping': return 'dark'
          break;
        case 'finished': return 'success'
          break;
        case 'cancelled': return 'danger'
          break;
        default: return 'primary'
          break;
      }
    }
  }
}
</script>
