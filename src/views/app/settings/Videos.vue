<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <crud-modal ref="crudModal" @closeable="closed" :name="form.id ? 'videos.update' : 'videos.create'">
        <div slot="content">
          <b-form class="av-tooltip tooltip-right-bottom">
            <b-form-group :label="$t('name')" class="has-float-label mb-4">
              <b-form-input type="text" v-model.trim="$v.form.name.$model" :state="!$v.form.name.$error"/>
              <b-form-invalid-feedback v-if="!$v.form.name.required">{{ $t('please.enter') + $t('name')}}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group :label="$t('language')" class="has-float-label mb-4">
              <b-form-input type="text" v-model.trim="$v.form.language.$model" :state="!$v.form.language.$error"/>
              <b-form-invalid-feedback v-if="!$v.form.language.required">{{ $t('please.enter') + $t('language')}}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group :label="$t('url')" class="has-float-label mb-4">
              <b-form-input type="text" v-model.trim="$v.form.url.$model" :state="!$v.form.url.$error"/>
              <b-form-invalid-feedback v-if="!$v.form.url.required">{{ $t('please.enter') + $t('url')}}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group :label="$t('type')" class="has-float-label mb-4">
              <b-form-input type="text" v-model.trim="$v.form.type.$model" :state="!$v.form.type.$error"/>
              <b-form-invalid-feedback v-if="!$v.form.type.required">{{ $t('please.enter') + $t('type')}}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group :label="$t('category')" class="has-float-label mb-4">
              <v-select :options="categories" v-model.trim="$v.form.category.$model" :state="!$v.form.category.$error" />
<!--              <b-form-input type="text" v-model.trim="$v.form.category.$model" :state="!$v.form.category.$error"/>-->
              <b-form-invalid-feedback v-if="!$v.form.category.required">{{ $t('please.enter') + $t('category')}}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group :label="$t('vendor')" class="has-float-label mb-4">
              <v-select :options="vendors" v-model.trim="$v.form.vendor.$model" :state="!$v.form.vendor.$error" />
<!--              <b-form-input type="text" />-->
              <b-form-invalid-feedback v-if="!$v.form.vendor.required">{{ $t('please.enter') + $t('vendor')}}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group :label="$t('description')" class="has-float-label mb-4">
              <b-textarea v-model="form.description" :rows="3" :max-rows="5" />
<!--              <b-form-input type="text" v-model="form.description"/>-->
            </b-form-group>
          </b-form>
        </div>
        <div slot="action">
          <b-button @click="submit" type="submit" :class="{'btn-multiple-state btn-shadow': true, 'show-spinner': pending }" variant="primary">
            <span class="spinner d-inline-block">
                <span class="bounce1"></span>
                <span class="bounce2"></span>
                <span class="bounce3"></span>
            </span>
            <span class="label">{{ form.id ? $t('update') : $t('save') }}</span>
          </b-button>
        </div>
      </crud-modal>
      <remove-modal v-if="$store.getters.deleteModal.isShow" @removing="removeItem"/>
      <list-page-heading
        :title="$t('menu.videos')"
        :displayMode="displayMode"
        :sortOptions="sortOptions"
        :changeOrderBy="changeOrderBy"
        :sort="sort"
        :searchChange="searchChange"
        :from="from"
        :to="to"
        :total="pagination.total"
        :perPage="15"
      >
        <b-button
          slot="action"
          v-b-modal.crudModal
          variant="primary"
          size="lg"
          :class="{ 'top-right-button': true }"
        >{{ $t('pages.add-new') }}
        </b-button>
      </list-page-heading>
      <template v-if="!load">
        <list-page-listing
          ref="listPageListing"
          :displayMode="displayMode"
          :items="items"
          :selectedItems="selectedItems"
          :lastPage="Math.ceil(pagination.total / 15)"
          :perPage="15"
          :page="pagination.page"
          :changePage="changePage"
          :handleContextMenu="handleContextMenu"
          :onContextMenuAction="onContextMenuAction"
          @view="viewItem"
          @edit="editItem"
        ></list-page-listing>
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
    </b-colxx>
  </b-row>
</template>

<script>
import ListPageHeading from "./ListHeading";
import ListPageListing from "./ListListing";
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { actions, getters } from "../../../utils/store_schema";
const _page = 'videos'
const { get, getById, put, post, remove } = actions(_page)
export default {
  components: {
    "list-page-heading": ListPageHeading,
    "list-page-listing": ListPageListing,
  },
  validations: {
    form: {
      name: {
        required
      },
      language: {
        required
      },
      url: {
        required
      },
      type: {
        required
      },
      category: {
        required
      },
      vendor: {
        required
      }
    }
  },
  mixins: [validationMixin],
  data() {
    return {
      form: {
        id: null,
        name: '',
        description: '',
        language: '',
        url: '',
        type: '',
        category: null,
        vendor: null
      },
      categories: [],
      vendors: [],
      displayMode: "list",
      sort: {},
      sortOptions: [
        {
          column: "name",
          label: "Name"
        },
        {
          column: "position",
          label: "Position"
        }
      ],
      page: 1,
      search: "",
      from: 0,
      to: 0,
      selectedItems: []
    };
  },
  computed: {
    ...mapGetters(getters(_page)),
    items() {
      return this.data.map(e => {
        return {
          ...e,
          action: ['edit', 'delete']
        }
      })
    }
  },
  mounted() {
    this.getData()
    this.$store.dispatch('getCategories').then(res => {
      this.categories = res.map(e => {
        return {
          label: e.name[this.$lang],
          value: e.id
        }
      })
    })
    this.$store.dispatch('getVendors').then(res => {
      this.vendors = res.map(e => {
        return {
          label: e.user.first_name + ' ' + e.user.last_name,
          value: e.id
        }
      })
    })
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const _form = { ...this.form }
        delete _form.id
        _form.category = this.form.category.value ? this.form.category.value : this.form.category
        _form.vendor = this.form.vendor.value ? this.form.vendor.value : this.form.vendor
        _form.slug = this.form.url
        this.$store.dispatch(this.form.id ? put : post, {
          id: this.form.id,
          data: _form
        }).then(res => {
          this.$refs.crudModal.hideModal()
          this.getData()
        })
      }
    },
    viewItem (id) {
      console.log(id)
    },
    editItem (id) {
      this.$store.dispatch(getById, id).then(res => {
        const _data = { ...res }
        delete _data.created_at
        delete _data.updated_at
        delete _data.slug
        this.form = _data
        this.$bvModal.show('crudModal')
      })
    },
    removeItem (id) {
      this.$store.dispatch(remove, id).then(res => {
        this.$store.commit('DELETE_MODAL', {
          isShow: false,
          data: {}
        })
        this.getData()
      })
    },
    clear() {
      this.$v.$reset()
      this.form = {
        id: null,
        name: '',
        description: '',
        language: '',
        url: '',
        type: '',
        category: null,
        vendor: null
      }
    },
    closed(e) {
      this.clear()
      console.log(e)
    },
    changeOrderBy(sort) {
      this.sort = sort;
    },
    searchChange(val) {
      this.search = val;
      this.page = 1;
    },
    handleContextMenu(vnode) {
      if (!this.selectedItems.includes(vnode.key)) {
        this.selectedItems = [vnode.key];
      }
    },
    onContextMenuAction(action) {
      console.log(
        "context menu item clicked - " + action + ": ",
        this.selectedItems
      );
    },
    changePage(n) {
      this.page = n
      this.getData()
    },
    getData() {
      this.$store.dispatch(get, {
        page: this.page
      }).then(res => {
        this.to = this.pagination.page * 15 > this.pagination.total ? this.pagination.total : this.pagination.page * 15
        this.from = (this.pagination.page - 1) * 15
      })
    }
  },
};
</script>
