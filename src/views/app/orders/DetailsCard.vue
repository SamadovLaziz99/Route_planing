<template>
  <div class="icon-cards-row">
    <glide-component :settings="glideIconsOption">
      <icon-card
        v-if="item.status !== 'cancelled' && item.status !== 'finished'"
        :title="$t('status')"
        icon="simple-icon-pin"
        :value="$t(`order.${item.status}`)"
        v-b-modal.changeStatusModal
      />
      <icon-card
        v-else
        :title="$t('status')"
        icon="simple-icon-pin"
        :value="$t(`order.${item.status}`)"
      />
      <icon-card
        :title="$t('payment.type')"
        :icon="item.payment_type === 'cash' ? 'iconsminds-dollar' : 'iconsminds-credit-card'"
        :value="$t(item.payment_type)"
      />
      <icon-card :title="$t('created.time')" icon="iconsminds-clock" :value="moment(item.created_time).format('HH:mm')" />
      <icon-card :title="$t('delivery.time')" icon="iconsminds-clock" :value="moment(item.delivery_time).format('HH:mm')" />
    </glide-component>
  </div>
</template>
<script>
import GlideComponent from "@/components/Carousel/GlideComponent";
import IconCard from "@/components/Cards/IconCard";
import moment from "moment";
export default {
  components: {
    "glide-component": GlideComponent,
    "icon-card": IconCard
  },
  props: ['item'],
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
  },
  methods: {
    moment,
    closed (e) {
      console.log(e)
    },
    submit () {
      console.log('submit')
    }
  }
};
</script>
