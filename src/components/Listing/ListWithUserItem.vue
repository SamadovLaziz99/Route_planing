<template>
<div class="d-flex flex-row mb-3 pb-3 border-bottom">
    <router-link :to="detailPath">
        <img :src="data.thumb || defImg" alt="" class="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall" />
    </router-link>
    <div class="pl-3 pr-2">
        <router-link :to="detailPath">
            <p class="font-weight-medium mb-0 ">{{ data.vendor__user__first_name || data.user__first_name }} {{ data.vendor__user__last_name || data.user__last_name }}</p>
            <p v-if="data.sales_count" class="text-muted mb-0 text-small">{{ $t('sales') }}: {{ data.sales_count }}</p>
            <p v-if="data.order_count" class="text-muted mb-0 text-small">{{ $t('orders_count') }}: {{ data.order_count }}</p>
            <p v-if="data.total_sum" class="text-muted mb-0 text-small">{{ $t('salary') }}: {{ data.total_sum }}</p>
            <p v-if="data.user__created_at" class="text-muted mb-0 text-small">{{ $t('reg.date') }}: {{ moment(data.user__created_at).format('YYYY-MM-DD') }}</p>
        </router-link>
    </div>
</div>
</template>

<script>
import defImg from '../../assets/img/profiles/l-1.jpg'
import moment from "moment";
export default {
    props: ['data', 'detailPath'],
    data() {
      return {
        defImg
      }
    },
    methods: {
      moment
    }
}
</script>
