<template>
  <div class="icon-cards-row">
    <glide-component :settings="glideIconsOption">
      <icon-card :title="$t('active_users')" icon="simple-icon-user" :value="stats.active_users" />
      <icon-card
        :title="$t('all_couriers')"
        icon="iconsminds-scooter"
        :value="stats.all_couriers"
      />
      <icon-card :title="$t('all_vendors')" icon="iconsminds-chef-hat" :value="stats.all_vendors" />
      <icon-card
        :title="$t('all_users')"
        icon="simple-icon-people"
        :value="stats.all_users"
      />
    </glide-component>
  </div>
</template>
<script>
import GlideComponent from "../../components/Carousel/GlideComponent";
import IconCard from "../../components/Cards/IconCard";

export default {
  props: ['stats'],
  components: {
    "glide-component": GlideComponent,
    "icon-card": IconCard
  },
  data() {
    return {
      glideIconsOption: {
        gap: 5,
        perView: 4,
        type: "carousel",
        breakpoints: {
          320: {
            perView: 1
          },
          576: {
            perView: 2
          },
          1600: {
            perView: 3
          },
          1800: {
            perView: 4
          }
        },
        hideNav: true
      }
    };
  }
};
</script>
