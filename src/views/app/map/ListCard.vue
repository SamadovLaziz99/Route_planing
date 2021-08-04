<template>
  <div class="d-flex flex-row p-2 justify-content-between align-items-center">
    <div class="d-flex flex-row">
      <router-link :to="detailPath">
        <img :src="data.thumb" style="border-radius: 50% !important;" :alt="data.title" class="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall" />
      </router-link>
      <div class="pl-3 pr-2">
        <router-link :to="detailPath">
          <p class="font-weight-medium mb-0 ">{{ data.title }}</p>
          <p class="text-muted mb-0 text-small">{{ data.detail }}</p>
        </router-link>
      </div>
    </div>
    <div :class="`simple-icon-arrow-down right position-relative ${ active ? 'collapsToggle' : '' }`"></div>
  </div>
</template>

<script>
export default {
  props: ['data', 'active', 'detailPath']
}
</script>
<style>
.collapsToggle {
  display: block;
  transition: all, .5s;
  transform: rotate(-180deg);
}
</style>
