<template>
  <app-layout>
    <!--    <transition name="fade">-->
    <router-view/>
    <!--    </transition>-->
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
  transition: all .7s;
}

.fade-enter, .fade-leave-to {
  /*transform: translateX(-140px);*/
  opacity: 0;
  /*display: none;*/
}
</style>

