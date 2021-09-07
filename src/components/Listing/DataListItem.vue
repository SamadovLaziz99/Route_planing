<template>
  <b-card @click.prevent="toggleItem($event,data.id)"
          :class="{'d-flex flex-row':true,'active' : selectedItems.includes(data.id)}" no-body>
    <div class="pl-2 d-flex flex-grow-1 min-width-zero">
      <div
        class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
        <div class="w-40 w-sm-100">
          <p v-if="data.name" class="list-item-heading mb-0 truncate">{{ data.name[$lang] || data.name }}</p>
          <p v-if="data.title" class="list-item-heading mb-0 truncate">{{ data.title }}</p>
        </div>
        <p v-if="data.vendor" class="mb-0 text-muted text-small w-15 w-sm-100">{{ data.vendor }}</p>
        <p v-if="data.category" class="mb-0 text-muted text-small w-15 w-sm-100">{{ data.category }}</p>
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

        <div @click="view(data.id)" v-if="data.action.includes('view')" id="view_button"
             class="glyph-icon simple-icon-eye mr-2 action_button"></div>

        <div @click="edit(data.id)" v-if="data.action.includes('edit')" id="edit_button"
             class="glyph-icon simple-icon-pencil mr-2 action_button"></div>

        <div @click="$store.commit('DELETE_MODAL', {
          isShow: true,
          data: data
        })" v-if="data.action.includes('delete')" id="delete_button"
             class="glyph-icon simple-icon-trash mr-2 action_button"></div>
      </div>
    </div>
  </b-card>
</template>

<script>
import DeleteConfirmModal from "../DeleteConfirmModal";

export default {
  props: ['data', 'selectedItems'],
  components: {
    DeleteConfirmModal
  },
  methods: {
    view(id) {
      this.$emit('view', id)
    },
    edit(id) {
      this.$emit('edit', id)
    },
    remove(id) {
      this.$emit('remove', id)
    },
    toggleItem(event, itemId) {
      this.$emit('toggle-item', event, itemId)
    }
  },
}
</script>
