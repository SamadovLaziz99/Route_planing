<template>
  <b-card :title="$t(name)">
    <vue-perfect-scrollbar
      class="dashboard-logs scroll"
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
    >
      <log-list :logs="items" />
    </vue-perfect-scrollbar>
  </b-card>
</template>
<script>
import LogList from "../../components/Listing/LogList";
import logs from "../../data/logs";

export default {
  props: ['name', 'items'],
  components: {
    "log-list": LogList
  },
  data() {
    return {
      logs
    };
  }
};
</script>
