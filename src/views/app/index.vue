<template>
  <app-layout>
    <transition name="fade">
      <router-view />
    </transition>
  </app-layout>
</template>

<script>
import AppLayout from "../../layouts/AppLayout";

export default {
  components: {
    "app-layout": AppLayout
  }
};
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .8s;
  /*transform: translateY(0px);*/
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  /*transform: translateY(-50px);*/
  opacity: 0;
}
</style>

