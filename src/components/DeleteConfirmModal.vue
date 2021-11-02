<template>
  <b-modal @hide="hide" id="deleteModal" v-model="$store.getters.deleteModal.isShow" centered :title="$t('want.delete')">
    <span v-if="$store.getters.deleteModal.data.name">{{ $store.getters.deleteModal.data.name[$lang] || $store.getters.deleteModal.data.name }}</span>
    <span v-if="$store.getters.deleteModal.data.user">{{ $store.getters.deleteModal.data.user.first_name + ' ' +  $store.getters.deleteModal.data.user.last_name}}</span>
    <span v-if="$store.getters.deleteModal.data.first_name">{{ $store.getters.deleteModal.data.first_name + ' ' +  $store.getters.deleteModal.data.last_name}}</span>
    <template slot="modal-footer">
      <b-button variant="outline-secondary">{{ $t('cancel') }}</b-button>
      <b-button @click="remove" :class="{'btn-multiple-state btn-shadow': true, 'show-spinner': $store.getters[$ccase(`deleting ${ this.$route.name }`)] }" variant="primary">
            <span class="spinner d-inline-block">
                <span class="bounce1"></span>
                <span class="bounce2"></span>
                <span class="bounce3"></span>
            </span>
        <span class="label">{{ $t('delete') }}</span>
      </b-button>
    </template>
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
  methods: {
    remove () {
      this.$emit('removing', this.$store.getters.deleteModal.data.id)
    },
    hide (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>
