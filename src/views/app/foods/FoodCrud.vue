<template>
  <div>
    <div v-if="!error">
      <div v-if="!loadOne">
        <b-row>
          <b-colxx xxs="12">
            <h1>{{ $t('food') }} {{ id ? $t('update') : $t('create') }}</h1>
            <piaf-breadcrumb/>
          </b-colxx>
        </b-row>
        <b-form @submit.prevent="submit" class="av-tooltip tooltip-right-bottom">
          <b-row>
            <b-colxx xxs="12" md="8">
              <b-card :title="id ? $t('form.edition') : $t('form.creation')" class="mb-4">
                <b-row>
                  <div class="lang-tabs">
                    <!--              <b-colxx xxs="12" md="12">-->
                    <!--                <b-tabs class="mb-4 customTab">-->
                    <!--                  <b-tab :title="$t('uz')" style="padding-top: 10px">-->
                    <!--                      <b-form-group :label="$t('name') + $t('uz')" class="has-float-label mb-4">-->
                    <!--                        <b-form-input v-model="form.name.uz" type="text"/>-->
                    <!--                        &lt;!&ndash;                <b-form-invalid-feedback v-if="!$v.form.name.uz.required">{{ $t('please.enter') + $t('name') + $t('uz') }}</b-form-invalid-feedback>&ndash;&gt;-->
                    <!--                      </b-form-group>-->
                    <!--                      <b-form-group :label="$t('description') + $t('uz')" class="has-float-label mb-2">-->
                    <!--                        <b-textarea :rows="4" :max-rows="4"/>-->
                    <!--                      </b-form-group>-->
                    <!--&lt;!&ndash;                    </b-colxx>&ndash;&gt;-->
                    <!--                  </b-tab>-->
                    <!--                  <b-tab :title="$t('ru')" style="padding-top: 10px">-->
                    <!--                    <b-form-group :label="$t('name') + $t('ru')" class="has-float-label mb-4">-->
                    <!--                      <b-form-input v-model="form.name.ru" type="text"/>-->
                    <!--                      &lt;!&ndash;                <b-form-invalid-feedback v-if="!$v.form.name.uz.required">{{ $t('please.enter') + $t('name') + $t('uz') }}</b-form-invalid-feedback>&ndash;&gt;-->
                    <!--                    </b-form-group>-->
                    <!--                    <b-form-group :label="$t('description') + $t('ru')" class="has-float-label mb-2">-->
                    <!--                      <b-textarea :rows="4" :max-rows="4"/>-->
                    <!--                    </b-form-group>-->
                    <!--                    &lt;!&ndash;                    </b-colxx>&ndash;&gt;-->
                    <!--                  </b-tab>-->
                    <!--                  <b-tab :title="$t('oz')" style="padding-top: 10px">-->
                    <!--                    <b-form-group :label="$t('name') + $t('oz')" class="has-float-label mb-4">-->
                    <!--                      <b-form-input v-model="form.name.oz" type="text"/>-->
                    <!--                      &lt;!&ndash;                <b-form-invalid-feedback v-if="!$v.form.name.uz.required">{{ $t('please.enter') + $t('name') + $t('uz') }}</b-form-invalid-feedback>&ndash;&gt;-->
                    <!--                    </b-form-group>-->
                    <!--                    <b-form-group :label="$t('description') + $t('oz')" class="has-float-label mb-2">-->
                    <!--                      <b-textarea :rows="4" :max-rows="4"/>-->
                    <!--                    </b-form-group>-->
                    <!--                    &lt;!&ndash;                    </b-colxx>&ndash;&gt;-->
                    <!--                  </b-tab>-->
                    <!--                </b-tabs>-->
                    <!--              </b-colxx>-->
                  </div>

                  <b-colxx xxs="12" md="12">
                    <b-form-group :label="$t('name')" class="has-float-label mb-4">
                      <b-form-input type="text" v-model.trim="$v.form.name.$model"  :state="!$v.form.name.$error"/>
                      <b-form-invalid-feedback v-if="!$v.form.name.required">
                        {{ $t('please.enter') + $t('name') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-colxx>

                  <b-colxx xxs="12" md="4">
                    <b-form-group :label="$t('vendor')" class="has-float-label mb-4">
                      <v-select :options="vendors" v-model.trim="$v.form.vendor.$model"  :state="!$v.form.vendor.$error"/>
                      <b-form-invalid-feedback :style="`display: ${(isValidCustom && !$v.form.vendor.required) ? 'block' : 'none'}`">
                        {{ $t('please.enter') + $t('vendor') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx xxs="12" md="4">
                    <b-form-group :label="$t('category')" class="has-float-label mb-4">
                      <v-select :options="categories" v-model.trim="$v.form.category.$model"  :state="!$v.form.category.$error"/>
                      <b-form-invalid-feedback :style="`display: ${(isValidCustom && !$v.form.category.required) ? 'block' : 'none'}`">
                        {{ $t('please.enter') + $t('category') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx xxs="12" md="4">
                    <b-form-group :label="$t('unit')" class="has-float-label mb-4">
                      <v-select :options="units" v-model.trim="$v.form.unit.$model"  :state="!$v.form.unit.$error"/>
                      <b-form-invalid-feedback :style="`display: ${(isValidCustom && !$v.form.unit.required) ? 'block' : 'none'}`">
                        {{ $t('please.enter') + $t('unit') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-colxx>

                  <b-colxx xxs="12" md="4">
                    <b-form-group :label="$t('price')" class="has-float-label mb-4">
                      <b-form-input type="number" v-model.trim="$v.form.price.$model"  :state="!$v.form.price.$error"/>
                      <b-form-invalid-feedback v-if="!$v.form.price.required">
                        {{ $t('please.enter') + $t('price') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx xxs="12" md="4">
                    <b-form-group :label="$t('sale_price')" class="has-float-label mb-4">
                      <b-form-input type="number" v-model="form.sale_price"/>
<!--                      <b-form-invalid-feedback v-if="!$v.form.sale_price.required">-->
<!--                        {{ $t('please.enter') + $t('sale_price') }}-->
<!--                      </b-form-invalid-feedback>-->
                    </b-form-group>
                  </b-colxx>
                  <b-colxx xxs="12" md="4">
                    <b-form-group :label="$t('min_amount')" class="has-float-label mb-4">
                      <b-form-input type="number" v-model.trim="$v.form.min_amount.$model"  :state="!$v.form.min_amount.$error"/>
                      <b-form-invalid-feedback v-if="!$v.form.min_amount.required">
                        {{ $t('please.enter') + $t('min_amount') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-colxx>

                  <b-colxx xxs="12" md="4" class="has-float-label mb-2">
                    <b-form-group :label="$t('video_url')">
                      <b-form-input v-model="form.video_url" type="text"/>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx xxs="12" md="4" class="has-float-label mb-2">
                    <b-form-group :label="$t('preparation_time')">
                      <b-form-input type="number" v-model.trim="$v.form.preparation_time.$model"  :state="!$v.form.preparation_time.$error"/>
                      <b-form-invalid-feedback v-if="!$v.form.preparation_time.required">
                        {{ $t('please.enter') + $t('preparation_time') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx xxs="12" md="4" class="mb-2">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex mt-2">
                        <span>{{ $t('status') }}</span>
                        <b-form-group class="ml-2">
                          <switches v-model="form.active" theme="custom" color="primary-inverse"
                                    class="vue-switcher-small"></switches>
                        </b-form-group>
                      </div>
                      <div class="d-flex mt-2">
                        <span>{{ $t('cola_combo') }}</span>
                        <b-form-group class="ml-2">
                          <switches v-model="form.cola_combo" theme="custom" color="primary-inverse"
                                    class="vue-switcher-small"></switches>
                        </b-form-group>
                      </div>
                    </div>
                  </b-colxx>

                  <b-colxx xxs="12" md="12">
                    <b-form-group :label="$t('description')" class="has-float-label mb-4">
                      <b-textarea v-model="form.description" :rows="4" :max-rows="4"/>
                    </b-form-group>
                  </b-colxx>

                </b-row>
              </b-card>
            </b-colxx>
            <b-colxx xxs="12" md="4">
              <b-card :title="$t('ingredients')" class="mb-4">
                <b-form-group :label="$t('ingredients')" class="has-float-label mb-4">
                  <input-tag v-model.trim="$v.form.ingredients.$model"  :state="!$v.form.ingredients.$error"></input-tag>
                  <b-form-invalid-feedback :style="`display: ${(isValidCustom && !$v.form.ingredients.required) ? 'block' : 'none'}`">
                    {{ $t('please.enter') + $t('unit') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-card>
              <b-card title="Food Images" class="mb-4">
                <ImageEditor ref="imageEditor"/>
                <remove-modal v-if="$store.getters.deleteModal.isShow" @removing="removeItem"/>
                <b-row>
                  <b-colxx xxs="12" md="6" v-for="img in images" :key="img.url" >
                    <div class="foods">
                      <img :src="img.url">
                      <div class="image_action">
                        <div style="display: flex">
                          <span @click="$refs.imageEditor.open(img.url)" class="simple-icon-pencil m-2 icon"></span>
                          <span @click="$store.commit('DELETE_MODAL', { isShow: true, data: img})" class="simple-icon-trash m-2 icon"></span>
                        </div>
                      </div>
                    </div>
                  </b-colxx>
                  <b-colxx xxs="12" md="12">
                    <b-button variant="secondary default mt-3" style="width: 100%; border-radius: 5px" @click="$refs.imageEditor.open('food', 'image', $route.params.id)">{{ $t('upload') }}</b-button>
                  </b-colxx>
                </b-row>
              </b-card>
<!--              <b-card>-->

<!--                <b-button @click="$refs.imageEditor.open()">Open Image Editor</b-button>-->
<!--              </b-card>-->
<!--              <dropzone ref="dropzone" v-if="$route.params.id" url="food" :media="{ id: $route.params.id, type: 'image' }"/>-->
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
import ImageEditor from "../../../components/ImageEditor";
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { mapGetters, mapActions } from "vuex";
const _page = 'food'
import { actions, getters } from "@/utils/store_schema";
const { getById, put, post } = actions(_page)
export default {
  components: {
    'switches': Switches,
    ImageEditor
  },
  mixins: [validationMixin],
  name: "FoodCrud",
  validations: {
    form: {
      name: {required},
      preparation_time: {required},
      vendor: {required},
      price: {required},
      ingredients: {required},
      min_amount: {required},
      // sale_price: { required },
      category: {required},
      unit: {required}
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      isValidCustom: false,
      images: [],
      form: {
        name: '',
        description: '',
        preparation_time: null,
        vendor: null,
        active: true,
        cola_combo: true,
        price: null,
        ingredients: [],
        video_url: '',
        min_amount: null,
        sale_price: null,
        category: null,
        unit: null
      }
    }
  },
  mounted() {
    if (this.id) {
      this.$store.dispatch(getById, this.id).then(res => {
        console.log(res)
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
        if (res.media && res.media.length > 0) {
          this.images = res.media.map(e => {
            return {
              url: e.url,
              id: e.id,
              path: e.path
            }
          })
        }
      })
    }
    this.getCategories()
    this.getUnits()
    this.getVendors()
  },
  computed: {
    ...mapGetters(['dataCategories', 'dataUnits', 'dataVendors']),
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
    }
  },
  methods: {
    ...mapActions(['getCategories', 'getUnits', 'getVendors']),
    clickMap(e) {
      this.coords = e.get('coords')
    },
    removeItem (e) {
      this.$store.dispatch('deleteMedia', e)
    },
    submit () {
      console.log(this.$v)
      this.isValidCustom = true
      this.$v.$touch();
      if (!this.$v.$invalid) {
          const _form = { ...this.form }
          delete _form.id
          _form.category_id = this.form.category?.value
          _form.vendor_id = this.form.vendor?.value
          _form.unit_id = this.form.unit?.value
          _form.min_amount = parseInt(this.form.min_amount)
          _form.preparation_time = parseInt(this.form.preparation_time)
          _form.price = parseInt(this.form.price)
          _form.sale_price = parseInt(this.form.sale_price)
          delete _form.category
          delete _form.unit
          delete _form.vendor
          console.log(_form)
          this.$store.dispatch(this.id ? put : post, {
            id: this.id,
            data: _form
          }).then(res => {
            this.$router.go(-1)
          })
        }
    }
  }
}
</script>

<style lang="scss">

</style>
