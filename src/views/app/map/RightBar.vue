<template>
<!--    <b-tab :title="$t('pages.details')">-->
      <vue-perfect-scrollbar
        class="rightbar_container yandexRightBar pr-3 pl-3"
        :settings="{ suppressScrollX: true, wheelPropagation: false }"
      >
        <b-tabs fill content-class="tab-content" nav-class="separator-tabs" @input="tabChange">
          <b-tab :title="$t('order.all').toUpperCase()">
            <TimeLine v-if="!loadOrders" :items="dataOrders" @selectedItem="selectedItem" @reload="reloadData"/>
            <div v-else class="text-center text-primary my-2 mt-5">
              <b-spinner class="align-middle"></b-spinner>
              <strong>{{ $t('loading') }}...</strong>
            </div>
            <EmptyBox v-if="!loadOrders && !dataOrders.length"/>
          </b-tab>
          <b-tab :title="$t('menu.couriers').toUpperCase()">
            <div class="mt-3">
              <b-card no-body class="d-flex mb-2 shadow" v-for="( item, index) in dataCouriers.filter(e => e.active)" :key="`faq_${index}`">
                <div :class="`pl-3 pr-3 ${ active === index ? 'collapse_top' : '' }`">
                  <div @click="clicked(index, item)">
                    <list-card
                      v-b-toggle="`faq_${index}`"
                      style="cursor: pointer"
                      :active="active === index"
                      :data="item"
                      detail-path="#"
                      :key="index"
                    />
                  </div>
                </div>
                <b-collapse :id="`faq_${index}`" accordion="faq-accordion" role="tabpanel">
                  <div class="pl-2 pt-2">
<!--                    <TimeLine :items="courier_orders"/>-->
                    <TimeLine v-if="!loadOrders" :items="courier_orders" @selectedItem="selectedItem"/>
                    <EmptyBox v-if="!loadOrders && !courier_orders.length"/>
                    <div v-else class="text-center text-primary my-2 mt-1">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong>{{ $t('loading') }}}...</strong>
                    </div>
                  </div>
                </b-collapse>
              </b-card>
            </div>
          </b-tab>
        </b-tabs>
      </vue-perfect-scrollbar>
<!--    </b-tab>-->
<!--  </b-tabs>-->
</template>
<script>
import ListCard from "./ListCard";
import TimeLine from "./TimeLine";
import { mapGetters } from "vuex";
import EmptyBox from "../../../components/EmptyBox";

export default {
  props: ['route'],
  components: {
    ListCard,
    TimeLine,
    EmptyBox
  },
  data() {
    return {
      active: -1,
      courier_orders: []
    };
  },
  computed: {
    ...mapGetters(['dataCouriers', 'dataOrders', 'loadOrders'])
  },
  mounted() {
    this.$store.dispatch('getCouriers')
  },
  methods: {
    selectedItem (e) {
      this.$emit('selectedItem', e)
    },
    reloadData () {
      this.$store.dispatch('getOrders', {
        status: 'map'
      })
    },
    tabChange (e) {
      // console.log(e)
      if (e === 0) {
        this.$store.dispatch('getOrders', {
          status: 'map'
        })
      }
    },
    clicked (id, item) {
      this.$store.dispatch('getOrders', {
        courier_id: item.id,
        status: 'map'
      }).then(res => {
        this.courier_orders = res
      })
      this.active = id
    }
  }
};
</script>
<style>
.collapse_top {
  border-radius: 0.75rem;
  background: #f1f1f1;
}
</style>
