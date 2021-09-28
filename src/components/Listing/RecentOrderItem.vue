<template>
<div class="d-flex flex-row mb-3">
    <router-link :to="detailPath" class="d-block position-relative">
        <img :src="img" alt="" class="list-thumbnail border-0" @error="noloadImg"/>
        <b-badge variant="primary" pill class="position-absolute badge-top-right">{{order.count}}</b-badge>
    </router-link>
    <div class="pl-3 pt-2 pr-2 pb-2">
        <router-link :to="detailPath">
            <p class="list-item-heading">{{ order.food__name }}</p>
            <div class="pr-4">
                <p class="text-muted mb-1 text-small">{{ order.food__price }}</p>
            </div>
            <div class="text-primary text-small font-weight-medium d-none d-sm-block">{{ order.createDate }}</div>
        </router-link>
    </div>
</div>
</template>

<script>
import defImg from '../../assets/img/profiles/l-3.jpg'
import { imageProxy } from '../../utils';
export default {
    props: ['order', 'detailPath'],
    data () {
      return {
        img: imageProxy(this.order.image, '120x90')
      }
    },
    methods: {
      imageProxy,
      noloadImg (e) {
        console.log(e)
        this.img = imageProxy('https://trator-laravel-images.s3.eu-central-1.amazonaws.com/coozin/uploads/original/foods/63hL3dMMHTktBejUlvBScMFjXdk6hwToebTHaOx0.jpeg', '120x90')
      }
    },
}
</script>
