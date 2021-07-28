<template>
<b-card class="d-flex flex-row mb-3" no-body>
    <div class="d-flex flex-grow-1 min-width-zero">
        <b-card-body class="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <router-link :to="detailPath" class="list-item-heading mb-1 truncate w-40 w-xs-100">
              {{ data.name }}
            </router-link>
            <p v-if="data.phone" class="mb-1 text-muted text-small w-15 w-xs-100">{{ data.phone }}</p>
<!--            <p v-if="data.payment_type" class="mb-1 text-muted text-small w-15 w-xs-100">{{ data.payment_type }}</p>-->
<!--            <p v-if="data.price" class="mb-1 text-muted text-small w-20 w-xs-100">{{ data.price }}</p>-->
            <p v-if="data.time" class="mb-1 text-muted text-small w-15 w-xs-100">{{ data.time }}</p>
            <p v-if="data.delivery" class="mb-1 text-muted text-small w-15 w-xs-100">{{ data.delivery }}</p>
            <p v-if="data.date" class="mb-1 text-muted text-small w-15 w-xs-100">{{ data.date }}</p>
            <div class="w-15 w-xs-100 text-right">
                <b-badge pill :variant="data.statusColor">{{ data.status }}</b-badge>
            </div>
        </b-card-body>
    </div>
</b-card>
</template>

<script>
export default {
    props: ['data', 'detailPath']
}
</script>
