<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md="10" class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
        <div class="position-relative image-side">
          <!--                <p class="text-white h2">{{ $t('dashboards.magic-is-in-the-details') }}</p>-->
          <!--                <p class="white mb-0">-->
          <!--                    Please use your credentials to login.-->
          <!--                    <br />If you are not a member, please-->
          <!--                    <router-link to="/user/register" class="white">register</router-link>.-->
          <!--                </p>-->
        </div>
        <div class="form-side">
          <div style="width: 100%; text-align: center">
            <logo/>
          </div>
          <h6 class="mb-4">{{ $t('user.login-title') }}</h6>

          <b-form @submit.prevent="onSubmit" class="av-tooltip tooltip-label-bottom">
            <b-form-group :label="$t('user.username')" class="has-float-label mb-4">
              <b-form-input type="text" v-model="$v.form.identifier.$model" :state="!$v.form.identifier.$error"/>
              <b-form-invalid-feedback v-if="!$v.form.identifier.required">Please enter your username
              </b-form-invalid-feedback>
              <!--                        <b-form-invalid-feedback v-else-if="!$v.form.email.email">Please enter a valid email address</b-form-invalid-feedback>-->
              <b-form-invalid-feedback v-else-if="!$v.form.identifier.minLength">Your username must be minimum 3
                characters
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group :label="$t('user.password')" class="has-float-label mb-4">
              <span class="simple-icon-eye showpass" @click="changePassType"></span>
              <b-form-input :type="type" v-model="$v.form.password.$model"
                            :state="!$v.form.password.$error"></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.password.required">Please enter your password
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-else-if="!$v.form.password.minLength || !$v.form.password.maxLength">Your
                password must be between 4 and 16 characters
              </b-form-invalid-feedback>
            </b-form-group>
            <div class="d-flex justify-content-between align-items-center">
              <router-link to="/user/forgot-password">{{ $t('user.forgot-password-question') }}</router-link>
              <b-button type="submit" variant="primary" size="lg" :disabled="fetchToken" :class="{'btn-multiple-state btn-shadow': true,
                          'show-spinner': fetchToken,
                          'show-success': !fetchToken && authError === false,
                          'show-fail': !fetchToken && authError }">
                            <span class="spinner d-inline-block">
                                <span class="bounce1"></span>
                                <span class="bounce2"></span>
                                <span class="bounce3"></span>
                            </span>
                <span class="icon success">
                                <i class="simple-icon-check"></i>
                            </span>
                <span class="icon fail">
                                <i class="simple-icon-exclamation"></i>
                            </span>
                <span class="label">{{ $t('user.login-button') }}</span>
              </b-button>
            </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>

<script>
import logo from '../../components/logo'
import {
  mapGetters,
  mapActions
} from "vuex";
import {
  validationMixin
} from "vuelidate";
import {adminRoot} from '../../constants/config';

const {
  required,
  maxLength,
  minLength,
  email
} = require("vuelidate/lib/validators");

export default {
  components: {
    logo
  },
  data() {
    return {
      type: 'password',
      form: {
        identifier: "",
        password: ""
      },
    };
  },
  mixins: [validationMixin],
  validations: {
    form: {
      password: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(4)
      },
      identifier: {
        required,
        minLength: minLength(4)
      }
    }
  },
  computed: {
    ...mapGetters(["currentUser", "fetchToken", "authError"])
  },
  methods: {
    ...mapActions(["getToken", "getUserDetail"]),
    changePassType() {
      if (this.type === 'password') this.type = 'text'
      else this.type = 'password'
    },
    onSubmit() {
      // this.$v.$touch();
      // this.form.email = "piaf-vue@coloredstrategies.com";
      // this.form.password = "piaf123";
      this.$v.form.$touch();
      if (!this.$v.$invalid) {
        this.getToken(this.form).then(res => {
          console.log(res);
          this.$router.push(adminRoot);
          // this.$router.push(adminRoot);
          // this.getUserDetail().then(res => {
          //   if (res.role) {
          //     if (res.role.role !== 'courier_bro') {
          //       this.$router.push(adminRoot);
          //     } else this.$router.push({name: 'order_list'});
          //   } else {
          //     this.$store.dispatch('warning_alert', {
          //       title: "???????? ?????????? ???????????????????????? ???? ??????????????!"
          //     });
          //     this.$store.dispatch('signOut');
          //   }
          // });
        });
      }
      // if (!this.$v.form.$anyError) {
      //      this.login({
      //          email: this.form.email,
      //          password: this.form.password
      //      });
      //}
    }
  },
  watch: {
    // currentUser(val) {
    //     if (val && val.uid && val.uid.length > 0) {
    //         setTimeout(() => {
    //             this.$router.push(adminRoot);
    //         }, 200);
    //     }
    // },
    loginError(val) {
      if (val != null) {
        this.$notify("error", "Login Error", val, {
          duration: 3000,
          permanent: false
        });

      }
    }
  }
};
</script>
