<template>
  <div class="d-flex flex-row p-2 justify-content-between align-items-center">
    <div class="d-flex flex-row">
      <router-link :to="detailPath">
        <img v-if="data.thumb" :src="data.thumb" style="border-radius: 50% !important;" :alt="data.title || data.name" class="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall" />
        <img v-else :src="defImg" :alt="data.title || data.name" style="border-radius: 50% !important;" class="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall" />
      </router-link>
      <div class="pl-3 pr-2 d-flex align-items-center">
        <router-link :to="detailPath">
          <p class="font-weight-medium mb-0 ">{{ data.title || data.name }}</p>
          <p class="text-muted mb-0 text-small">{{ data.detail }}</p>
        </router-link>
      </div>
    </div>
    <div :class="`simple-icon-arrow-down right position-relative ${ active ? 'collapsToggle' : '' }`"></div>
  </div>
</template>

<script>
import defImg from '@/assets/img/profiles/l-2.jpg'
export default {
  props: ['data', 'active', 'detailPath'],
  data () {
    return {
      defImg
    }
  }
}
</script>
<style>
.collapsToggle {
  display: block;
  transition: all, .5s;
  transform: rotate(-180deg);
}
</style>
