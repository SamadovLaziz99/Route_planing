<template>
  <b-card @click.prevent="toggleItem($event,data.id)" :class="{'d-flex flex-row card-hover':true,'active' : selectedItems.includes(data.id)}" no-body>
    <div class="d-flex">
      <img :src="data.img || image" class="list-thumbnail responsive border-0" :alt="data.name"/>
    </div>
    <div class="pl-2 d-flex flex-grow-1 min-width-zero">
      <div
        class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
        <router-link :to="data.router ? data.router : '#'" class="w-40 w-sm-100">
          <p v-if="data.fullname" class="list-item-heading mb-0 truncate">{{ data.fullname }}</p>
          <p v-else class="list-item-heading mb-0 truncate">{{ data.name }}</p>
          <p v-if="data.user" class="list-item-heading mb-0 truncate">{{ data.user.first_name + ' ' + data.user.last_name }}</p>
        </router-link>
        <p v-if="data.slug" class="mb-0 text-muted text-small w-15 w-sm-100">{{ data.slug }}</p>
        <p v-if="data.phone" class="mb-0 text-muted text-small w-15 w-sm-100">{{ data.phone }}</p>
        <p v-if="data.category" class="mb-0 text-muted text-small w-15 w-sm-100">{{ $t(data.category.name[$lang]) }}</p>
        <p v-if="data.vendor && data.vendor.user" class="mb-0 text-muted text-small w-15 w-sm-100">{{ data.vendor.user.first_name }}</p>
        <p v-if="data.car_model" class="mb-0 text-muted text-small w-15 w-sm-100">{{ data.car_model }}</p>
        <p v-if="data.plate_number" class="mb-0 text-muted text-small w-15 w-sm-100">{{ data.plate_number }}</p>
        <p v-if="data.unit && data.unit.name" class="mb-0 text-muted text-small w-15 w-sm-100">{{ $t(data.unit.name[$lang]) }}</p>
        <p v-if="data.price" class="mb-0 text-muted text-small w-15 w-sm-100">{{ data.price }}</p>
        <p v-if="data.from_field" class="mb-0 text-muted text-small w-15 w-sm-100">{{ data.from_field }}</p>
        <p v-if="data.to" class="mb-0 text-muted text-small w-15 w-sm-100">{{ data.to }}</p>
        <p v-if="data.position" class="mb-0 text-muted text-small w-15 w-sm-100">{{ data.position }}</p>
        <p v-if="data.description" class="mb-0 text-muted text-small w-20 w-sm-100">{{ data.description }}</p>
        <p v-if="data.address" class="mb-0 text-muted text-small w-15 w-sm-100">{{ data.address }}</p>
        <p v-if="data.ingredients" class="mb-0 text-muted text-small w-30">
          <b-badge style="margin: 2px" v-for="ing in data.ingredients" :key="ing" pill variant="outline-primary">{{ing}}</b-badge>
        </p>
<!--        <p v-if="data.about_me" class="mb-0 text-muted text-small w-15 w-sm-100">{{ data.about_me }}</p>-->
        <div v-if="data.is_parent" class="w-15 w-sm-100">
          <b-badge pill variant="primary">{{ data.is_parent === 'active' ? 'Parent' : 'Child' }}</b-badge>
        </div>
        <p class="mb-0 text-muted text-small w-15 w-sm-100">{{ data.date }}</p>
        <div class="w-15 w-sm-100">
          <b-badge pill :variant="data.statusColor">{{ data.status }}</b-badge>
        </div>
      </div>
      <div v-if="data.action" class="d-flex custom-control custom-checkbox pl-1 align-self-center pr-4">
        <!--          <b-tooltip target="view_button" title="View"></b-tooltip>-->
        <div v-if="data.action.includes('view')" id="view_button"
             class="glyph-icon simple-icon-eye mr-2 action_button"></div>
        <!--          <b-tooltip target="edit_button" title="Edit"></b-tooltip>-->
        <div @click="$router.push(data.router ? data.router : '#')" v-if="data.action.includes('edit')" id="edit_button"
             class="glyph-icon simple-icon-pencil mr-2 action_button"></div>
        <!--          <b-tooltip target="delete_button" title="Delete"></b-tooltip>-->
        <div v-if="data.action.includes('delete')" id="delete_button"
             class="glyph-icon simple-icon-trash mr-2 action_button"></div>
      </div>
      <!--        <div class="custom-control custom-checkbox pl-1 align-self-center pr-4">-->
      <!--            <b-form-checkbox :checked="selectedItems.includes(data.id)" class="itemCheck mb-0" />-->
      <!--        </div>-->
    </div>
  </b-card>
</template>

<script>
import defaultImage from '@/assets/img/cards/thumb-1.jpg'
import defaultImageProfile from '@/assets/img/profiles/4.jpg'
export default {
  props: ['data', 'selectedItems'],
  data() {
    return {
      image: this.$route.name === 'vendors' ? defaultImageProfile : defaultImage
    }
  },
  methods: {
    toggleItem(event, itemId) {
      this.$emit('toggle-item', event, itemId)
    }
  }
}
</script>
<style>
.action_button {
  font-size: 16px;
  font-weight: 700;
  color: #6B7280;
  cursor: pointer;
  transition: all, .2s;
}

#view_button:hover {
  color: #2563EB;
  transform: scale(1.1);
}

#edit_button:hover {
  color: #D97706;
  transform: scale(1.1);
}

#delete_button:hover {
  color: #DC2626;
  transform: scale(1.1);
}
</style>
