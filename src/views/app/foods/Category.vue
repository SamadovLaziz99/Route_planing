<template>
  <div>
    <b-row v-if="!error">
      <b-colxx class="disable-text-selection">
        <crud-modal ref="crudModal" @closeable="closed" :name="form.id ? 'category.update' : 'category.create'">
          <div slot="content">
            <b-form v-if="!loadOne" class="av-tooltip tooltip-right-bottom">
              <b-form-group :label="$t('name')  + ' ' + $t('uz')" class="has-float-label mb-4">
                <b-form-input type="text" v-model.trim="$v.form.name.uz.$model" :state="!$v.form.name.uz.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.name.uz.required">{{ $t('please.enter') + $t('name') + ' ' +  $t('uz') }}</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('name') + ' ' +  $t('ru')" class="has-float-label mb-4">
                <b-form-input type="text" v-model.trim="$v.form.name.ru.$model" :state="!$v.form.name.ru.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.name.ru.required">{{ $t('please.enter') + $t('name') + ' ' + $t('ru') }}</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('name') + ' ' +  $t('oz')" class="has-float-label mb-4">
                <b-form-input type="text" v-model.trim="$v.form.name.oz.$model" :state="!$v.form.name.oz.$error"/>
                <b-form-invalid-feedback v-if="!$v.form.name.oz.required">{{ $t('please.enter') + $t('name') + ' ' + $t('oz') }}</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group v-if="form.id" :label="$t('position')" class="has-float-label mb-4">
                <v-select :options="categorys" v-model="position"/>
              </b-form-group>
            </b-form>
            <div v-else class="text-center text-primary my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>{{ $t('loading') }}...</strong>
            </div>
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
          :title="$t('menu.foods_category')"
          :displayMode="displayMode"
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
        <b-card :title="$t(`menu.foods_category`)" class="mb-4">
          <b-table
            hover
            :items="items"
            :fields="fields"
            :busy="load"
            responsive
          >
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>{{ $t('loading') }}...</strong>
              </div>
            </template>
            <template #cell(action)="row">
              <div style="display: flex">
                <div class="glyph-icon simple-icon-pencil mr-2" @click="editItem(row.item.id)" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
                <div @click="$store.commit('DELETE_MODAL', { isShow: true, data: row.item})" class="glyph-icon simple-icon-trash mr-2" style="font-size: 16px; font-weight: 700; color: #6B7280; cursor: pointer"></div>
              </div>
            </template>
            <template #cell(name)="row">
              <div>{{ row.item.name[$lang] }}</div>
            </template>
            <template #cell(created_at)="row">
              {{ moment(row.item.created_at).format('YYYY-MM-DD HH:mm') }}
            </template>
            <template #cell(selection)="{ rowSelected }">
              <template v-if="rowSelected">
                <div class="glyph-icon simple-icon-check"></div>
              </template>
              <template v-else>
                <!--          <div class="glyph-icon simple-icon-user"></div>-->
              </template>
            </template>
          </b-table>
          <Pagination :page="pagination.page" :per-page="15" :total="pagination.total" @changePagination="changePagination"/>
        </b-card>
<!--        <template v-if="!load">-->
<!--          <list-page-listing-->
<!--            ref="listPageListing"-->
<!--            :displayMode="displayMode"-->
<!--            :items="items"-->
<!--            :selectedItems="selectedItems"-->
<!--            :lastPage="Math.ceil(pagination.total / 15)"-->
<!--            :perPage="15"-->
<!--            :page="pagination.page"-->
<!--            :changePage="changePage"-->
<!--            :handleContextMenu="handleContextMenu"-->
<!--            :onContextMenuAction="onContextMenuAction"-->
<!--            @view="viewItem"-->
<!--            @edit="editItem"-->
<!--          ></list-page-listing>-->
<!--        </template>-->
      </b-colxx>
    </b-row>
    <error-page v-else :error="error"/>
  </div>
</template>

<script>
import ListPageHeading from "./ListHeading";
import ListPageListing from "./ListListing";
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import Pagination from "@/components/TableComponents/Pagination";
const _page = 'categories'
import { actions, getters } from "../../../utils/store_schema";
const { get, getById, put, post, remove } = actions(_page)
import moment from "moment";
export default {
  components: {
    "list-page-heading": ListPageHeading,
    "list-page-listing": ListPageListing,
    Pagination
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
      },
      // position: {
      //   required
      // }
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
        },
        position: null
      },
      position: null,
      displayMode: "list",
      page: 1,
      search: "",
      from: 0,
      to: 0,
      fields: [
        {
          key: 'name',
          label: this.$t('name'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'position',
          label: this.$t('position'),
          // tdClass: 'firstColumn'
        },
        {
          key: 'created_at',
          label: this.$t('reg.date'),
          tdClass: 'text-muted'
        },
        {
          key: 'action',
          label: this.$t('action'),
          // tdClass: 'thirdRow'
        }
      ],
    };
  },
  watch: {
    position (val) {
      console.log(val)
    }
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
    },
    categorys () {
      return this.data.map(e => {
        return {
          el: e,
          label: e.name[this.$lang],
          value: e.id
        }
      })
    }
  },
  mounted() {
    const _hash = this.$route.hash
    // const _query = this.$route.query
    // this.filters = _query
    let _page;
    if (_hash) {
      _page = this.$route.hash.slice(6)
      this.page = parseInt(_page)
    }
    this.getData()
  },
  methods: {
    moment,
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.position) {
          this.$store.dispatch(put, {
            id: this.position.el.id,
            data: {
              name: this.position.el.name,
              position: this.form.position
            }
          }).then(res => {
            // this.$refs.crudModal.hideModal()
          })
        }
        this.$store.dispatch(this.form.id ? put : post, {
          id: this.form.id,
          data: {
            name: this.form.name,
            position: this.position ? this.position.el.position : (this.form.position ? parseInt(this.form.position) : (this.data.length + 1))
            // position: this.form.position ? parseInt(this.form.position) : ((this.page - 1) * 15 + (this.items.length < 15 ? (this.items.length + 1) : 1))
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
      this.$bvModal.show('crudModal')
      this.$store.dispatch(getById, id).then(res => {
        this.form.id = res.id
        this.form.name = res.name
        this.form.position = res.position
      })
    },
    changePagination(e) {
      this.page = e
      this.getData()
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
      this.position = null
      this.form = {
        id: null,
        name: {
          uz: '',
          ru: '',
          oz: ''
        },
        position: null
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
    changePage(n) {
      this.page = n
      this.getData()
    },
    getData() {
      this.$store.dispatch(get, {
        // page: this.page,
        no_page: true
      }).then(res => {
        // res.forEach((e, i) => {
        //   if (e.position !== ((this.page - 1) * 15 + i + 1)) {
        //     this.$store.dispatch(put, {
        //       id: e.id,
        //       data: {
        //         name: e.name,
        //         position: (this.page - 1) * 15 + i + 1
        //       }
        //     })
        //   }
        // })
        this.to = this.pagination.page * 15 > this.pagination.total ? this.pagination.total : this.pagination.page * 15
        this.from = (this.pagination.page - 1) * 15
      })
    }
  },
};
</script>
