<template>
  <b-card :title="$t(name)">
    <vue-perfect-scrollbar
      class="scroll dashboard-list-with-user"
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
    >
      <list-with-user-item
        v-for="(ticket, index) in items"
        :data="ticket"
        :detail-path="ticket.vendor ? {
          name: 'vendor-detail',
          params: { id: ticket.vendor }
        } : '#'"
        :key="index"
      />
    </vue-perfect-scrollbar>
  </b-card>
</template>
<script>
import ListWithUserItem from "../../components/Listing/ListWithUserItem";
import tickets from "../../data/tickets";

export default {
  props: ['name', 'items'],
  components: {
    "list-with-user-item": ListWithUserItem
  },
  data() {
    return {
      tickets
    };
  }
};
</script>
