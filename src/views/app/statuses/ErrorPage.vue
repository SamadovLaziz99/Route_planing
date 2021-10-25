<template>
  <b-card>
    <div class="error">
      <h1 v-if="status === 500">{{ $t('errors.internal_server_error') }}</h1>
      <h1 v-if="status === 404">{{ $t('errors.not_found') }}</h1>
      <h1 v-if="status === 401">{{ $t('errors.unauthorized') }}</h1>
      <h1 v-if="status === 'timeout'">{{ $t('errors.timeout') }}</h1>
      <h1 v-if="status === 'network'">{{ $t('errors.network') }}</h1>
      <img v-if="status === 404" :src="images.not" alt="">
      <img v-if="status === 401" :src="images.unauth" alt="">
      <img v-if="status === 500" :src="images.internal" alt="">
      <img v-if="status === 'timeout'" :src="images.slow" alt="">
      <img v-if="status === 'network'" :src="images.net" alt="">
      <div class="actions">
        <b-button @click="$router.go(-1)" variant="outline-primary" class="mr-2 ml-2">{{ $t('back') }}</b-button>
        <b-button @click="reload" variant="primary">{{ $t('reload') }}</b-button>
      </div>
    </div>
  </b-card>
</template>

<script>
import not from '@/assets/svg/404.svg'
import unauth from '@/assets/svg/401.svg'
import internal from '@/assets/svg/500.svg'
import timeout from '@/assets/svg/timeout.svg'
import net from '@/assets/svg/network_error.svg'
import slow from '@/assets/svg/slow_network.svg'
export default {
  name: "ErrorPage",
  props: ['error'],
  data () {
    return {
      status: null,
      images: {
        not: not,
        unauth: unauth,
        internal: internal,
        timeout: timeout,
        net: net,
        slow: slow
      }
    }
  },
  methods: {
    reload () {
      document.location.reload()
    }
  },
  mounted() {
    // console.log(this.error.message === 'Network Error')
    this.status = (this.error.message.startsWith('timeout') || this.error.message.startsWith('Network Error')) ? (this.error.message.startsWith('Network Error') ? 'network' : 'timeout') : this.error.response.status
  }
}
</script>

<style lang="scss">
.error {
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  img {
    width: 30%;
    height: 30%;
    transform: translateY(-20px);
    margin-top: 15px;
  }
  .actions {
    display: flex;
  }
}
</style>
