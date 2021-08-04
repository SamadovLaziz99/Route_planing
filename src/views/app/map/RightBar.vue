<template>
      <vue-perfect-scrollbar
        class="rightbar_container yandexRightBar pr-3 pl-3"
        :settings="{ suppressScrollX: true, wheelPropagation: false }"
      >
        <b-card no-body class="d-flex mb-2 shadow" v-for="( item, index) in tickets" :key="`faq_${index}`">
          <div :class="`pl-3 pr-3 ${ active === index ? 'collapse_top' : '' }`">
            <div @click="clicked(index)">
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
            <div class="pl-4 pt-4">
              <TimeLine @get="getRoute" :route="route"/>
            </div>
          </b-collapse>
        </b-card>
      </vue-perfect-scrollbar>
</template>
<script>
import tickets from "../../../data/tickets";
import ListCard from "./ListCard";
import TimeLine from "./TimeLine";
export default {
  props: ['route'],
  components: {
    ListCard,
    TimeLine
  },
  data() {
    return {
      active: -1,
      tickets
    };
  },
  watch: {
    active (val) {
      console.log(val)
    }
  },
  methods: {
    getRoute (e) {
      this.$emit('getOneRoute', e)
    },
    clicked (id) {
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
