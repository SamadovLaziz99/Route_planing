<template>
<div class="d-flex flex-row mb-3 pb-3 border-bottom">
    <router-link :to="{name: 'user_details', params: { id: data.user } }">
        <img src="https://presaveio.s3.amazonaws.com/uploads/NoImage/no_img.png" :alt="data.title" class="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall" />
    </router-link>
    <div class="pl-3 pr-2">
        <router-link :to="{name: 'order_details', params: { id: data.order } }">
            <p class="font-weight-medium mb-0 ">{{ data.title || $t('not.comment') }}</p>
            <p class="text-muted mb-1 text-small">{{ moment(data.created_at).format('YYYY-MM-DD HH:mm') }}</p>
            <div>
                <stars :value="data.star" :disabled=true />
            </div>
        </router-link>
    </div>
</div>
</template>

<script>
import Stars from '../Common/Stars'
import moment from "moment";
export default {
    components: {
        'stars': Stars
    },
    props: ['data', 'detailPath'],
  methods: { moment }
}
</script>
