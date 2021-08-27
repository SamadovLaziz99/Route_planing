<template>
  <b-modal id="deleteModal" v-model="isShow" centered :title="name">
    <p class="my-4">Vertically centered modal!</p>
  </b-modal>
</template>

<script>
export default {
  name: "DeleteConfirmModal",
  data() {
    return {
      isShow: false
    }
  },
  props: {
    name: {
      type: String,
      default: () => 'Delete Modal'
    }
  },
  methods: {
    show () {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style scoped>

</style>
