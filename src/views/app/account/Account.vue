<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <h1>{{ $t('account.settings') }}</h1>
        <piaf-breadcrumb/>
      </b-colxx>
    </b-row>
    <b-form @submit.prevent="submit" class="av-tooltip tooltip-right-bottom">
      <b-row>
        <b-colxx xxs="12" md="12" class="mb-4">
          <b-card>
            <b-row>
              <b-colxx xxs="12" md="6">
                <b-form-group :label="$t('first.name')" class="has-float-label mb-4">
                  <b-form-input type="text" v-model.trim="$v.form.first_name.$model"  :state="!$v.form.first_name.$error"/>
                  <b-form-invalid-feedback v-if="!$v.form.first_name.required">
                    {{ $t('please.enter') + $t('first.name') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-colxx>
              <b-colxx xxs="12" md="6">
                <b-form-group :label="$t('last.name')" class="has-float-label mb-4">
                  <b-form-input type="text" v-model.trim="$v.form.last_name.$model"  :state="!$v.form.last_name.$error"/>
                  <b-form-invalid-feedback v-if="!$v.form.last_name.required">
                    {{ $t('please.enter') + $t('last.name') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-colxx>

              <b-colxx xxs="12" md="4">
                <b-form-group :label="$t('username')" class="has-float-label mb-4">
                  <b-form-input type="text" v-model.trim="$v.form.username.$model"  :state="!$v.form.username.$error"/>
                  <b-form-invalid-feedback v-if="!$v.form.username.required">
                    {{ $t('please.enter') + $t('username') }}
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback v-if="!$v.form.username.minLength">{{ $t('username') }} is minimumm 6 characters</b-form-invalid-feedback>
                </b-form-group>
              </b-colxx>
              <b-colxx xxs="12" md="4">
                <b-form-group :label="$t('password')" class="has-float-label mb-4">
                  <b-form-input type="text" v-model.trim="$v.form.password.$model"  :state="!$v.form.password.$error"/>
                  <b-form-invalid-feedback v-if="!$v.form.password.required">
                    {{ $t('please.enter') + $t('password') }}
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback v-if="!$v.form.password.minLength">{{ $t('password') }} is minimumm 6 characters</b-form-invalid-feedback>
                </b-form-group>
              </b-colxx>
              <b-colxx xxs="12" md="4">
                <b-form-group :label="$t('re.password')" class="has-float-label mb-4">
                  <b-form-input type="text" v-model.trim="$v.form.re_password.$model"  :state="!$v.form.re_password.$error"/>
                  <b-form-invalid-feedback v-if="!$v.form.re_password.sameAsPassword">{{ $t('re.password.error') }}</b-form-invalid-feedback>
                </b-form-group>
              </b-colxx>
            </b-row>
          </b-card>
        </b-colxx>
        <!--      ACTION CONTENT-->
        <b-colxx xxs="12" md="12">
          <b-card class="mb-4 d-flex align-items-end">
            <b-button
              class="mr-2"
              variant="outline-secondary"
              @click="$router.go(-1)"
            >{{ $t('cancel') }}
            </b-button>
            <b-button type="submit" :class="{'btn-multiple-state btn-shadow': true, 'show-spinner': pending }" variant="primary">
                  <span class="spinner d-inline-block">
                      <span class="bounce1"></span>
                      <span class="bounce2"></span>
                      <span class="bounce3"></span>
                  </span>
              <span class="label">{{ $t('save') }}</span>
            </b-button>
          </b-card>
        </b-colxx>
        <!--      ACTION CONTENT-->
      </b-row>
    </b-form>
  </div>
</template>

<script>
import {minLength, required, sameAs} from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
const user_data = JSON.parse(localStorage.getItem('detail'))
export default {
  mixins: [validationMixin],
  validations: {
    form: {
      first_name: {required},
      last_name: {required},
      username: {
        required,
        minLength: minLength(4)
      },
      password: {
        required,
        minLength: minLength(6)
      },
      re_password: {
        sameAsPassword: sameAs('password')
      }
    }
  },
  data() {
    return {
      pending: false,
      form: {
        first_name: user_data.first_name,
        last_name: user_data.last_name,
        username: user_data.username,
        password: null,
        re_password: null
      }
    }
  },
  methods: {
    submit () {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const _form = { ...this.form }
        delete _form.re_password
        this.pending = true
        this.$store.dispatch('changeUserDetails', {
          id: user_data.id,
          data: _form
        }).then(res => {
          this.$store.dispatch('success_alert', {
            message: 'Your account was updated'
          })
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.pending = false
        })
      }
    }
  }
}
</script>
