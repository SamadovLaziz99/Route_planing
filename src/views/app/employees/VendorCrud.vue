<template>
  <div>
    <div v-if="!error">
      <div v-if="!loadOne">
        <b-row>
          <b-colxx xxs="12">
            <h1>Food {{ id ? $t('update') : $t('create') }}</h1>
            <piaf-breadcrumb/>
          </b-colxx>
        </b-row>
        <b-form @submit.prevent="submit" class="av-tooltip tooltip-right-bottom">
          <b-row>
            <b-colxx xxs="12" md="8">
              <b-card :title="$t('forms.basic')" class="mb-4">
                <b-row>

                  <b-colxx xxs="12" md="12">
                    <b-form-group :label="$t('users')" class="has-float-label mb-4">
                      <v-select :options="users" v-model.trim="$v.form.user.$model"  :state="!$v.form.user.$error"/>
                      <b-form-invalid-feedback :style="`display: ${(isValidCustom && !$v.form.user.required) ? 'block' : 'none'}`">
                        {{ $t('please.enter') + $t('users') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group :label="$t('address')" class="has-float-label mb-4">
                      <b-form-input type="text" v-model.trim="$v.form.address.$model"  :state="!$v.form.address.$error"/>
                      <b-form-invalid-feedback v-if="!$v.form.address.required">
                        {{ $t('please.enter') + $t('address') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-colxx>

<!--                  <b-colxx xxs="12" md="4">-->
<!--                    <b-form-group :label="$t('price')" class="has-float-label mb-4">-->
<!--                      <b-form-input type="number" v-model.trim="$v.form.price.$model"  :state="!$v.form.price.$error"/>-->
<!--                      <b-form-invalid-feedback v-if="!$v.form.price.required">-->
<!--                        {{ $t('please.enter') + $t('price') }}-->
<!--                      </b-form-invalid-feedback>-->
<!--                    </b-form-group>-->
<!--                  </b-colxx>-->
<!--                  <b-colxx xxs="12" md="4">-->
<!--                    <b-form-group :label="$t('sale_price')" class="has-float-label mb-4">-->
<!--                      <b-form-input type="number" v-model.trim="$v.form.sale_price.$model"  :state="!$v.form.sale_price.$error"/>-->
<!--                      <b-form-invalid-feedback v-if="!$v.form.sale_price.required">-->
<!--                        {{ $t('please.enter') + $t('sale_price') }}-->
<!--                      </b-form-invalid-feedback>-->
<!--                    </b-form-group>-->
<!--                  </b-colxx>-->
<!--                  <b-colxx xxs="12" md="4">-->
<!--                    <b-form-group :label="$t('min_amount')" class="has-float-label mb-4">-->
<!--                      <b-form-input type="number" v-model.trim="$v.form.min_amount.$model"  :state="!$v.form.min_amount.$error"/>-->
<!--                      <b-form-invalid-feedback v-if="!$v.form.min_amount.required">-->
<!--                        {{ $t('please.enter') + $t('min_amount') }}-->
<!--                      </b-form-invalid-feedback>-->
<!--                    </b-form-group>-->
<!--                  </b-colxx>-->

                  <b-colxx xxs="12" md="4" class="has-float-label mb-2">
                    <b-form-group :label="$t('from_field')">
                      <b-form-input v-model="form.from_field" type="text"/>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx xxs="12" md="4" class="has-float-label mb-2">
                    <b-form-group :label="$t('to')">
                      <b-form-input v-model="form.to" type="text"/>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx xxs="12" md="4" class="has-float-label mb-2">
                    <b-form-group :label="$t('cola_food')">
                      <b-form-input v-model="form.cola_food" type="number"/>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx xxs="12" md="6" class="has-float-label mb-2">
                    <b-form-group :label="$t('apelsin_account')">
                      <b-form-input v-model="form.apelsin_account" type="text"/>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx xxs="12" md="6" class="has-float-label mb-2">
                    <b-form-group :label="$t('apelsin_token')">
                      <b-form-input v-model="form.apelsin_token" type="text"/>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx xxs="12" md="12" class="mb-2">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex mt-2">
                        <span>Verified</span>
                        <b-form-group class="ml-2">
                          <switches v-model="form.verified" theme="custom" color="primary-inverse"
                                    class="vue-switcher-small"></switches>
                        </b-form-group>
                      </div>
                      <div class="d-flex mt-2">
                        <span>Status</span>
                        <b-form-group class="ml-2">
                          <switches v-model="form.active" theme="custom" color="primary-inverse"
                                    class="vue-switcher-small"></switches>
                        </b-form-group>
                      </div>
                      <div class="d-flex mt-2">
                        <span>Cola sponsor</span>
                        <b-form-group class="ml-2">
                          <switches v-model="form.cola_sponsor" theme="custom" color="primary-inverse"
                                    class="vue-switcher-small"></switches>
                        </b-form-group>
                      </div>
                    </div>
                  </b-colxx>

                  <b-colxx xxs="12" md="12">
                    <b-form-group :label="$t('about_me')" class="has-float-label mb-4">
                      <b-textarea v-model="form.about_me" :rows="4" :max-rows="4"/>
                    </b-form-group>
                  </b-colxx>

                </b-row>
              </b-card>
            </b-colxx>
            <b-colxx xxs="12" md="4">
              <b-card :title="$t('location')" class="mb-4">
                <yandex-map @click="clickMap" :coords="coords" :zoom="12" class="map-item" map-type="map" :controls="['zoomControl']">
                  <ymap-marker marker-id="123" :coords="coords" hint-content="Vendor point" ></ymap-marker>
                </yandex-map>
              </b-card>
              <dropzone ref="dropzone" v-if="$route.params.id" :media="{ id: $route.params.id, type: 'image' }"/>
            </b-colxx>
            <!--      ACTION CONTENT-->
            <b-colxx xxs="12" md="12">
              <b-card class="mb-4 d-flex align-items-end">
                <b-button
                  variant="outline-secondary"
                  @click="$router.go(-1)"
                >{{ $t('cancel') }}
                </b-button>
                <b-button
                  class="ml-1"
                  variant="outline-secondary"
                >{{ $t('clear') }}
                </b-button>
                <!--                <b-button type="submit" variant="primary" class="ml-1">{{ id ? $t('update') : $t('save') }}</b-button>-->
                <b-button type="submit" :class="{'btn-multiple-state btn-shadow': true, 'show-spinner': pending }" variant="primary">
                  <span class="spinner d-inline-block">
                      <span class="bounce1"></span>
                      <span class="bounce2"></span>
                      <span class="bounce3"></span>
                  </span>
                  <span class="label">{{ id ? $t('update') : $t('save') }}</span>
                </b-button>
              </b-card>
            </b-colxx>
            <!--      ACTION CONTENT-->
          </b-row>
        </b-form>
      </div>
      <template v-else>
        <div class="loading"></div>
      </template>
    </div>
    <error-page v-else :error="error"/>
  </div>
</template>

<script>
import Switches from "vue-switches";
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { mapGetters, mapActions } from "vuex";
const _page = 'vendors'
import { actions, getters } from "@/utils/store_schema";
const { getById, put, post } = actions(_page)
export default {
  components: {
    'switches': Switches
  },
  mixins: [validationMixin],
  validations: {
    form: {
      // name: {required},
      // preparation_time: {required},
      // // vendor: {required},
      // price: {required},
      // ingredients: {required},
      // min_amount: {required},
      // sale_price: { required },
      // category: {required},
      user: {required},
      address: {required},
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      isValidCustom: false,
      coords: [ 41.312947, 69.280204 ],
      form: {
        address: '',
        about_me: '',
        user: null,
        active: true,
        verified: true,
        from_field: '',
        to: '',
        apelsin_account: '',
        apelsin_token: '',
        cola_sponsor: false,
        cola_food: 0
      }
    }
  },
  mounted() {
    if (this.id) {
      this.$store.dispatch(getById, this.id).then(res => {
        const _form = this.form
        _form.name = res.name
        _form.active = res.active
        _form.cola_combo = res.cola_combo
        _form.price = res.price
        _form.sale_price = res.sale_price
        _form.min_amount = res.min_amount
        _form.video_url = res.video_url
        _form.preparation_time = res.preparation_time
        _form.description = res.description
        _form.ingredients = res.ingredients
        _form.category = {
          label: res.category.name[this.$lang],
          value: res.category.id
        }
        _form.unit = {
          label: res.unit.name[this.$lang],
          value: res.unit.id
        }
        const { first_name, last_name } = res.vendor.user
        _form.vendor = {
          label: first_name + ' ' + last_name,
          value: res.vendor.id
        }
        console.log(res)
        setTimeout(() => {
          if (res.media && res.media.length) {
            res.media.forEach(e => {
              if (!e.small_size_url)
                this.$refs.dropzone.setDefaultImage({
                  size: e.size, name: e.path, type: e.mime_type, id: e.id
                }, e.url)
            })
          }
        }, 100)
      })
    }
    this.getUsers()
  },
  computed: {
    ...mapGetters(['dataUsers']),
    ...mapGetters(getters(_page)),
    categories () {
      return this.dataCategories.map(e => {
        return {
          label: e.name[this.$lang],
          value: e.id
        }
      })
    },
    units () {
      return this.dataUnits.map(e => {
        return {
          label: e.name[this.$lang],
          value: e.id
        }
      })
    },
    vendors () {
      return this.dataVendors.map(e => {
        const { first_name, last_name } = e.user
        return {
          label: first_name + ' ' + last_name,
          value: e.id
        }
      })
    },
    users () {
      return this.dataUsers.map(e => {
        const { first_name, last_name } = e
        return {
          label: first_name + ' ' + last_name,
          value: e.id
        }
      })
    }
  },
  methods: {
    ...mapActions(['getCategories', 'getUnits', 'getVendors', 'getUsers']),
    clickMap(e) {
      this.coords = e.get('coords')
    },
    submit () {
      console.log(this.$v)
      this.isValidCustom = true
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const _form = { ...this.form }
        delete _form.id
        _form.category = this.form.category?.value
        _form.vendor = this.form.vendor?.value
        _form.unit = this.form.unit?.value
        _form.min_amount = parseInt(this.form.min_amount)
        _form.preparation_time = parseInt(this.form.preparation_time)
        _form.price = parseInt(this.form.price)
        _form.sale_price = parseInt(this.form.sale_price)
        console.log(_form)
        this.$store.dispatch(this.id ? put : post, {
          id: this.id,
          data: _form
        }).then(res => {
          console.log(res)
        })
      }
    }
  }
}
</script>

<style lang="scss">
.customTab {
  .nav-tabs {
    border: none;
  }
}
</style>
