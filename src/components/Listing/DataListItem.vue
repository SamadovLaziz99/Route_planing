<template>
  <b-card @click.prevent="toggleItem($event,data.id)"
          :class="{'d-flex flex-row':true,'active' : selectedItems.includes(data.id)}" no-body>
    <div class="pl-2 d-flex flex-grow-1 min-width-zero">
      <div
        class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
        <router-link :to="`?p=${data.id}`" class="w-40 w-sm-100">
          <p v-if="data.name" class="list-item-heading mb-0 truncate">{{ data.name[$lang] }}</p>
          <p v-if="data.title" class="list-item-heading mb-0 truncate">{{ data.title }}</p>
        </router-link>
        <p v-if="data.vendor" class="mb-0 text-muted text-small w-15 w-sm-100">{{ data.vendor }}</p>
        <p class="mb-0 text-muted text-small w-15 w-sm-100">{{ data.category }}</p>
        <p v-if="data.unit" class="mb-0 text-muted text-small w-15 w-sm-100">{{ data.unit }}</p>
        <p v-if="data.price" class="mb-0 text-muted text-small w-15 w-sm-100">{{ data.price }}</p>
        <p v-if="data.count" class="mb-0 text-muted text-small w-15 w-sm-100">{{ data.count }}</p>
        <p v-if="data.position" class="mb-0 text-muted text-small w-15 w-sm-100">{{ data.position }}</p>
        <p class="mb-0 text-muted text-small w-15 w-sm-100">{{ data.date }}</p>
        <div class="w-15 w-sm-100">
          <b-badge pill :variant="data.statusColor">{{ data.status }}</b-badge>
        </div>
      </div>
      <div v-if="data.action" class="d-flex custom-control custom-checkbox pl-1 align-self-center pr-4">
        <!--          <b-tooltip target="view_button" title="View"></b-tooltip>-->
        <div @click="view(data.id)" v-if="data.action.includes('view')" id="view_button"
             class="glyph-icon simple-icon-eye mr-2 action_button"></div>
        <!--          <b-tooltip target="edit_button" title="Edit"></b-tooltip>-->
        <div @click="edit(data.id)" v-if="data.action.includes('edit')" id="edit_button"
             class="glyph-icon simple-icon-pencil mr-2 action_button"></div>
        <!--          <b-tooltip target="delete_button" title="Delete"></b-tooltip>-->
        <div @click="remove(data.id)" v-if="data.action.includes('delete') && !$store.getters[$ccase(`deleting ${ this.$route.name }`)]" id="delete_button"
             class="glyph-icon simple-icon-trash mr-2 action_button"></div>
<!--        <b-spinner v-if="$store.getters[$ccase(`deleting ${ this.$route.name }`)]" variant="primary" label="Spinning"></b-spinner>-->
      </div>
    </div>
    <DeleteConfirmModal ref="deleteModel" :name="data.name[$lang]"/>
  </b-card>
</template>

<script>
import DeleteConfirmModal from "../DeleteConfirmModal";

export default {
  props: ['data', 'selectedItems'],
  components: {
    DeleteConfirmModal
  },
  // data() {
  //   return {
  //     // rm:
  //   }
  // },
  methods: {
    view(id) {
      this.$emit('view', id)
    },
    edit(id) {
      this.$emit('edit', id)
    },
    remove(id) {
      this.$refs.deleteModel.show()
      // this.$emit('remove', id)
    },
    toggleItem(event, itemId) {
      this.$emit('toggle-item', event, itemId)
    }
  },
  // computed: {
  //   ...mapGetters({
  //     deleting: this.rm
  //   })
  // }
}
</script>
