<template>
  <div>
    <b-colxx xxs="12">
      <h1>{{ $t('menu.main_settings') }}</h1>
      <piaf-breadcrumb/>
    </b-colxx>
    <b-card class="mb-4 d-flex">
      <b-row>
        <b-colxx xxs="12" md="10">
          <b-form-group label="Шеф-повар недели" class="has-float-label">
            <v-select v-if="vendors" :options="vendors" v-model="vendor"/>
          </b-form-group>
        </b-colxx>
        <b-colxx xxs="12" md="2">
          <b-button
            variant="primary"
            size="lg"
            @click="chefWeek"
            :class="{ 'top-right-button': true }"
            class="ml-2"
          >
            <span v-if="loader" class="spinner d-inline-block">
                <span class="bounce1"></span>
                <span class="bounce2"></span>
                <span class="bounce3"></span>
            </span>
            <span v-else class="simple-icon-check mr-2"></span>
            Принят
          </b-button>
        </b-colxx>
      </b-row>
    </b-card>
    <b-row>
      <b-colxx xxs="12" md="8">
        <b-card class="mb-4" title="Sort Menu Items">
          <draggable v-model="array" @change="sort" class="row">
            <b-card v-for="ar in array" :key="ar" class="mb-2 w-100">{{ ar }}</b-card>
          </draggable>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import Draggable from "vuedraggable";

export default {
  components: {
    'draggable': Draggable
  },
  data() {
    return {
      array: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      vendors: null,
      vendor: null,
      loader: false,
      sortable: null
    }
  },
  methods: {
    sort(e) {
      console.log(e)
    },
    chefWeek() {
      if (this.vendor) {
        this.loader = true
        this.$store.dispatch('chefWeek', {
          vendor_id: this.vendor.value
        }).then(res => {
          this.$store.dispatch('success_alert', {
            title: 'Chef Of Week Selected', message: ''
          })
        }).finally(() => {
          this.loader = false
        })
      }
    }
  },
  watch: {
    array(val) {
      console.log(val)
    }
  },
  mounted() {
    this.$store.dispatch('getVendors', {no_page: true}).then(res => {
      this.vendors = res.map(e => {
        const {first_name, last_name} = e.user
        return {
          label: first_name + ' ' + last_name,
          value: e.id
        }
      })
    })
  }
}
</script>

<style scoped>

</style>
