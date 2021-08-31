<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <h1>Food {{ id ? $t('update') : $t('create') }}</h1>
        <piaf-breadcrumb/>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12" md="8">
        <b-card :title="$t('forms.basic')" class="mb-4">
          <b-form class="av-tooltip tooltip-right-bottom">

            <b-row>
              <b-colxx xxs="12" md="12">
                <b-tabs class="mb-4 customTab">
                  <b-tab :title="$t('uz')" style="padding-top: 10px">
                      <b-form-group :label="$t('name') + $t('uz')" class="has-float-label mb-4">
                        <b-form-input v-model="form.name.uz" type="text"/>
                        <!--                <b-form-invalid-feedback v-if="!$v.form.name.uz.required">{{ $t('please.enter') + $t('name') + $t('uz') }}</b-form-invalid-feedback>-->
                      </b-form-group>
                      <b-form-group :label="$t('description') + $t('uz')" class="has-float-label mb-2">
                        <b-textarea :rows="4" :max-rows="4"/>
                      </b-form-group>
<!--                    </b-colxx>-->
                  </b-tab>
                  <b-tab :title="$t('ru')" style="padding-top: 10px">
                    <b-form-group :label="$t('name') + $t('ru')" class="has-float-label mb-4">
                      <b-form-input v-model="form.name.ru" type="text"/>
                      <!--                <b-form-invalid-feedback v-if="!$v.form.name.uz.required">{{ $t('please.enter') + $t('name') + $t('uz') }}</b-form-invalid-feedback>-->
                    </b-form-group>
                    <b-form-group :label="$t('description') + $t('ru')" class="has-float-label mb-2">
                      <b-textarea :rows="4" :max-rows="4"/>
                    </b-form-group>
                    <!--                    </b-colxx>-->
                  </b-tab>
                  <b-tab :title="$t('oz')" style="padding-top: 10px">
                    <b-form-group :label="$t('name') + $t('oz')" class="has-float-label mb-4">
                      <b-form-input v-model="form.name.oz" type="text"/>
                      <!--                <b-form-invalid-feedback v-if="!$v.form.name.uz.required">{{ $t('please.enter') + $t('name') + $t('uz') }}</b-form-invalid-feedback>-->
                    </b-form-group>
                    <b-form-group :label="$t('description') + $t('oz')" class="has-float-label mb-2">
                      <b-textarea :rows="4" :max-rows="4"/>
                    </b-form-group>
                    <!--                    </b-colxx>-->
                  </b-tab>
                </b-tabs>
              </b-colxx>

              <b-colxx xxs="12" md="4">
                <b-form-group :label="$t('vendor')" class="has-float-label mb-4">
                  <v-select v-model="form.vendor_id" :options="categories"/>
                </b-form-group>
              </b-colxx>
              <b-colxx xxs="12" md="4">
                <b-form-group :label="$t('category')" class="has-float-label mb-4">
                  <v-select v-model="form.category" :options="categories"/>
                </b-form-group>
              </b-colxx>
              <b-colxx xxs="12" md="4">
                <b-form-group :label="$t('unit')" class="has-float-label mb-4">
                  <v-select v-model="form.unit" :options="categories"/>
                </b-form-group>
              </b-colxx>

              <b-colxx xxs="12" md="4">
                <b-form-group :label="$t('price')" class="has-float-label mb-4">
                  <b-form-input v-model="form.price" type="number"/>
                  <!--                <b-form-invalid-feedback v-if="!$v.form.name.uz.required">{{ $t('please.enter') + $t('name') + $t('uz') }}</b-form-invalid-feedback>-->
                </b-form-group>
              </b-colxx>
              <b-colxx xxs="12" md="4">
                <b-form-group :label="$t('sale_price')" class="has-float-label mb-4">
                  <b-form-input v-model="form.sale_price" type="number"/>
                  <!--                <b-form-invalid-feedback v-if="!$v.form.name.uz.required">{{ $t('please.enter') + $t('name') + $t('uz') }}</b-form-invalid-feedback>-->
                </b-form-group>
              </b-colxx>
              <b-colxx xxs="12" md="4">
                <b-form-group :label="$t('min_amount')" class="has-float-label mb-4">
                  <b-form-input v-model="form.min_amount" type="number"/>
                  <!--                <b-form-invalid-feedback v-if="!$v.form.name.uz.required">{{ $t('please.enter') + $t('name') + $t('uz') }}</b-form-invalid-feedback>-->
                </b-form-group>
              </b-colxx>

              <b-colxx xxs="12" md="4" class="has-float-label mb-2">
                <b-form-group :label="$t('video_url')">
                  <b-form-input v-model="form.video_url" type="text"/>
                </b-form-group>
              </b-colxx>
              <b-colxx xxs="12" md="4" class="has-float-label mb-2">
                <b-form-group :label="$t('preparation_time')">
                  <b-form-input v-model="form.preparation_time" type="number"/>
                </b-form-group>
              </b-colxx>
              <b-colxx xxs="12" md="4" class="mb-2">
                <div class="d-flex mt-2">
                  <span>Status</span>
                  <b-form-group class="ml-2">
                    <switches v-model="form.active" theme="custom" color="primary-inverse"
                              class="vue-switcher-small"></switches>
                  </b-form-group>
                </div>
              </b-colxx>

            </b-row>

          </b-form>
        </b-card>
      </b-colxx>
      <b-colxx xxs="12" md="4">
        <b-card :title="$t('ingredients')" class="mb-4">
          <b-form class="av-tooltip tooltip-right-bottom">
            <b-form-group :label="$t('ingredients')" class="has-float-label mb-4">
              <input-tag v-model="tags"></input-tag>
            </b-form-group>
          </b-form>
        </b-card>
        <b-card :title="$t('images')" class="mb-4">
          <image-uploader/>
        </b-card>
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
          <b-button variant="primary" class="ml-1">{{ id ? $t('update') : $t('save') }}</b-button>
        </b-card>
      </b-colxx>

      <!--      ACTION CONTENT-->
    </b-row>
  </div>
</template>

<script>
import Switches from "vue-switches";

export default {
  components: {
    'switches': Switches
  },
  name: "FoodCrud",
  data() {
    return {
      id: this.$route.params.id,
      tags: [],
      form: {
        name: { uz: '', ru: '', oz: '' },
        description: '',
        preparation_time: null,
        vendor_id: null,
        active: true,
        price: null,
        ingredients: [],
        video_url: '',
        min_amount: null,
        sale_price: null,
        category: null,
        unit: null
      },
      categories: [
        {
          label: "Cakes",
          value: "Cakes"
        },
        {
          label: "Cupcakes",
          value: "Cupcakes"
        },
        {
          label: "Desserts",
          value: "Desserts"
        }
      ],
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
