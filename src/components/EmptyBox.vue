<template>
  <div class="error">
    <h1>No data</h1>
    <img :src="empty" alt="">
<!--    <div class="actions">-->
<!--      <b-button @click="$router.go(-1)" variant="outline-primary" class="mr-2 ml-2">Back</b-button>-->
<!--      <b-button @click="reload" variant="primary">Reload</b-button>-->
<!--    </div>-->
  </div>
</template>

<script>
import empty from '@/assets/svg/empty.svg'
export default {
  name: "EmptyBpx",
  data () {
    return {
      empty
    }
  }
}
</script>

<style scoped>

</style>
