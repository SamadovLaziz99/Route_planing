<template>
  <b-modal @hide="hide" id="deleteModal" v-model="visible" centered :title="$t('comment')">
    <p v-if="item">Изменить статус на {{ $t(`statuses.${item.status}`) }} -- <strong>{{ item.item.first_name + ' ' + item.item.last_name }}</strong></p>
    <b-form @submit.prevent="submit" class="av-tooltip tooltip-right-bottom">
      <b-form-group :label="$t('comment')" class="has-float-label mb-4">
        <b-textarea v-model.trim="$v.form.comment.$model" :state="!$v.form.comment.$error" :rows="4" :max-rows="4"/>
        <b-form-invalid-feedback v-if="!$v.form.comment.required">
          {{ $t('please.enter') + $t('comment') }}
        </b-form-invalid-feedback>
      </b-form-group>
    </b-form>
    <template slot="modal-footer">
      <b-button variant="outline-secondary" @click="hide">{{ $t('cancel') }}</b-button>
      <b-button @click="submit" :class="{'btn-multiple-state btn-shadow': true, 'show-spinner': false }" variant="primary">
            <span class="spinner d-inline-block">
                <span class="bounce1"></span>
                <span class="bounce2"></span>
                <span class="bounce3"></span>
            </span>
        <span class="label">{{ $t('submit') }}</span>
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    form: {
      comment: { required }
    }
  },
  data() {
    return {
      item: null,
      form: {
        comment: ''
      },
      visible: false
    }
  },
  methods: {
    clear () {
      this.item = null
      this.form = {
        comment: ''
      }
      this.$v.$reset()
    },
    hide () {
      this.visible = false
      this.clear()
    },
    show (data) {
      this.item = data
      this.visible = true
    },
    submit () {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('submitted', {
          id: this.item.item.id,
          status: this.item.status,
          comment: this.form.comment
        })
        // this.hide()
      }
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
