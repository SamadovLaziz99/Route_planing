<template>
  <div id="app-container" :class="getMenuType">
    <topnav />
    <sidebar />
    <main :class="`${($route.name === 'maps' || $route.name === 'maps2') ? 'responsiveMain' : ''}`">
      <div class="container-fluid">
        <slot></slot>
      </div>
    </main>
<!--    <footer-component v-if="$route.name !== 'maps' && $route.name !== 'maps2'" />-->
  </div>
</template>

<script>
import Sidebar from "../containers/navs/Sidebar";
import Topnav from "../containers/navs/Topnav";
import Footer from "../containers/navs/Footer";
import { mapGetters } from "vuex";

export default {
  components: {
    topnav: Topnav,
    sidebar: Sidebar,
    "footer-component": Footer
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapGetters(["getMenuType"]),
  },
  mounted() {
    setTimeout(() => {
      document.body.classList.add("default-transition");
    }, 100);
    setTimeout(() => {
      this.$root.$emit('lollipop', 'lol')
    }, 3000)
  }
};
</script>
<style>
.responsiveMain {
  margin: 0 !important;
  /*margin-left: 110px !important;*/
  /*margin-left: 121px !important;*/
  /*margin-right: 0 !important;*/
  /*margin-bottom: 0px!important;*/
  /*margin-top: 100px;*/
}
</style>
