<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <crud-modal ref="crudModal" @closeable="closed" :name="form.id ? 'unit.update' : 'unit.create'">
        <div slot="content">
          <b-form class="av-tooltip tooltip-right-bottom">
            <b-form-group :label="$t('name') + $t('uz')" class="has-float-label mb-4">
              <b-form-input type="text" v-model.trim="$v.form.name.uz.$model" :state="!$v.form.name.uz.$error"/>
              <b-form-invalid-feedback v-if="!$v.form.name.uz.required">{{ $t('please.enter') + $t('name') + $t('uz') }}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group :label="$t('name') + $t('ru')" class="has-float-label mb-4">
              <b-form-input type="text" v-model.trim="$v.form.name.ru.$model" :state="!$v.form.name.ru.$error"/>
              <b-form-invalid-feedback v-if="!$v.form.name.ru.required">{{ $t('please.enter') + $t('name') + $t('ru') }}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group :label="$t('name') + $t('oz')" class="has-float-label mb-4">
              <b-form-input type="text" v-model.trim="$v.form.name.oz.$model" :state="!$v.form.name.oz.$error"/>
              <b-form-invalid-feedback v-if="!$v.form.name.oz.required">{{ $t('please.enter') + $t('name') + $t('oz') }}</b-form-invalid-feedback>
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
      <DeleteConfirmModal v-if="$store.getters.deleteModal.isShow" @removing="removeItem"/>
      <list-page-heading
        :title="$t('menu.foods_unit')"
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
import DeleteConfirmModal from "../../../components/DeleteConfirmModal";
import { mapGetters } from "vuex";
import { camelize } from "../../../utils";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
const _page = 'units'
const actions = {
  get: camelize(`get ${_page}`),
  getById: camelize(`get by id ${_page}`),
  post: camelize(`post ${_page}`),
  put: camelize(`put ${_page}`),
  remove: camelize(`delete ${_page}`),
}
const getters = {
  load: camelize(`load ${_page}`),
  data: camelize(`data ${_page}`),
  pending: camelize(`pending ${_page}`),
  deleting: camelize(`deleting ${_page}`),
  pagination: camelize(`pagination ${_page}`),
}
export default {
  components: {
    "list-page-heading": ListPageHeading,
    "list-page-listing": ListPageListing,
    DeleteConfirmModal
  },
  validations: {
    form: {
      name: {
        uz: {
          required
        },
        ru: {
          required
        },
        oz: {
          required
        }
      }
    }
  },
  mixins: [validationMixin],
  data() {
    return {
      form: {
        id: null,
        name: {
          uz: '',
          ru: '',
          oz: ''
        }
      },
      actions: actions,
      getters: getters,
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
    ...mapGetters({
      data: getters.data,
      load: getters.load,
      pending: getters.pending,
      deleting: getters.deleting,
      pagination: getters.pagination
    }),
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
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch(this.form.id ? actions.put : actions.post, {
          id: this.form.id,
          data: {
            name: this.form.name
          }
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
      this.$store.dispatch(actions.getById, id).then(res => {
        this.form.id = res.id
        this.form.name = res.name
        this.$bvModal.show('crudModal')
      })
    },
    removeItem (id) {
      this.$store.dispatch(actions.remove, id).then(res => {
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
        name: {
          uz: '',
          ru: '',
          oz: ''
        }
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
      this.$store.dispatch(actions.get, {
        page: this.page
      }).then(res => {
        this.to = this.pagination.page * 15 > this.pagination.total ? this.pagination.total : this.pagination.page * 15
        this.from = (this.pagination.page - 1) * 15
      })
    }
  },
};
</script>
