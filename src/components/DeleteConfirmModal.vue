<template>
  <b-modal @hide="hide" id="deleteModal" v-model="$store.getters.deleteModal.isShow" centered :title="$t('want.delete')">
    <div class="imageViewConfirm" v-if="$store.getters.deleteModal.data.url">
      <img :src="$store.getters.deleteModal.data.url">
    </div>
    <span v-if="$store.getters.deleteModal.data.name">{{ $store.getters.deleteModal.data.name[$lang] || $store.getters.deleteModal.data.name }}</span>
    <span v-if="$store.getters.deleteModal.data.user">{{ $store.getters.deleteModal.data.user.first_name + ' ' +  $store.getters.deleteModal.data.user.last_name}}</span>
    <span v-if="$store.getters.deleteModal.data.first_name">{{ $store.getters.deleteModal.data.first_name + ' ' +  $store.getters.deleteModal.data.last_name}}</span>
    <span v-if="$store.getters.deleteModal.data.code">{{ $store.getters.deleteModal.data.code}}</span>
    <span v-if="$store.getters.deleteModal.data.type">{{ $store.getters.deleteModal.data.type.name}}</span>
    <template slot="modal-footer">
      <b-button variant="outline-secondary" @click="hide">{{ $t('cancel') }}</b-button>
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
  methods: {
    remove () {
      this.$emit('removing', this.$store.getters.deleteModal.data.id)
    },
    hide (e) {
      this.$store.commit('DELETE_MODAL', {
        isShow: false,
        data: {}
      })
    }
  }
}
</script>

<style lang="scss">
.imageViewConfirm {
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}
</style>
