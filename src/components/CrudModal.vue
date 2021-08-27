<template>
  <b-modal
    id="crudModal"
    ref="crudModal"
    :title="$t(name)"
    @hide="hide"
    modal-class="modal-right"
  >
    <slot name="content"></slot>
    <template slot="modal-footer">
      <b-button
        variant="outline-secondary"
        @click="hideModal('crudModal')"
      >{{ $t('pages.cancel') }}</b-button>
      <slot name="action"></slot>
    </template>
  </b-modal>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: () => 'Simple Modal'
    }
  },
  data() {
    return {
    };
  },
  methods: {
    hideModal() {
      this.$refs.crudModal.hide();
    },
    hide(e) {
      this.$emit('closeable', 'closed')
    }
  }
};
</script>

