<template>
  <div :class="`h-100 ${$route.name !== 'maps' ? 'app_main' : ''}`">
    <router-view />
<!--    <color-switcher />-->
  </div>
</template>

<script>
// import ColorSwitcher from "./components/Common/ColorSwitcher";

import { getDirection } from "./utils";

export default {
  components: {
    // "color-switcher": ColorSwitcher
  },
  mounted() {
    console.log(process.env.VUE_APP_NAME)
  },
  // beforeMount() {
  //   const direction = getDirection();
  //   if (direction.isRtl) {
  //     document.body.classList.add("rtl");
  //     document.dir = "rtl";
  //     document.body.classList.remove("ltr");
  //   } else {
  //     document.body.classList.add("ltr");
  //     document.dir = "ltr";
  //     document.body.classList.remove("rtl");
  //   }
  // }
};
</script>
<style>
.overflow {
  overflow: hidden !important;
}
</style>
