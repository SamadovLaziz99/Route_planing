<template>
  <div>
    <b-row v-if="!errorVendors">
      <div v-if="oneLoadVendors && !vendor" class="loading"></div>
      <b-colxx v-if="vendor" xxs="12">
        <h1>{{ vendor.user.first_name }} {{ vendor.user.last_name }}</h1>
<!--        <div class="top-right-button-container">-->
<!--          <b-dropdown id="ddown5" :text="$t('pages.actions')" size="lg" variant="outline-primary" class="top-right-button top-right-button-single" no-fade="true">-->
<!--            <b-dropdown-item>{{ $t('dashboards.last-week') }}</b-dropdown-item>-->
<!--            <b-dropdown-item>{{ $t('dashboards.this-month') }}</b-dropdown-item>-->
<!--          </b-dropdown>-->
<!--        </div>-->
        <piaf-breadcrumb />
        <b-tabs nav-class="separator-tabs ml-0 mb-5" content-class="tab-content" :no-fade="true">
          <b-tab :title="$t('pages.details')">
            <b-row>
              <b-colxx xxs="12" lg="4" class="mb-4 col-left">
                <b-card no-body class="mb-4">
                  <div class="position-absolute card-top-buttons">
                    <b-button variant="outline-white" class="icon-button">
                      <i class="simple-icon-pencil" />
                    </b-button>
                  </div>
                  <single-lightbox :thumb="vendorImage" :large="vendorImage" class-name="card-img-top" />
                  <b-card-body>
                    <p class="text-muted text-small mb-2">{{$t('menu.about')}}</p>
                    <p class="mb-3">{{ vendor.about_me }}</p>
                    <p class="text-muted text-small mb-2">{{$t('pages.location')}}</p>
                    <p class="mb-3">{{vendor.address}}</p>
                    <p class="text-muted text-small mb-2">{{$t('rating')}}</p>
                    <stars class="mb-2" :value="vendor.ratings_avg" :disabled="true"></stars>
                    <p class="text-muted text-small mb-2">{{$t('balance')}}</p>
                    <p class="mb-3">{{vendor.balance}}</p>
                    <p class="text-muted text-small mb-2">{{$t('working_hours')}}</p>
                    <p>
                      <b-badge class="mb-1" pill variant="outline-primary"><span class="simple-icon-clock"></span> {{ vendor.from_field }}</b-badge>
                      <b-badge class="mb-1" pill variant="outline-primary"><span class="simple-icon-clock"></span> {{ vendor.to }}</b-badge>
                    </p>
<!--                    <p class="mb-3"><span>From: </span> {{vendor.from_field}} <span class="ml-2">To: </span>{{vendor.to}} </p>-->
                    <p class="text-muted text-small mb-2">{{$t('menu.contact')}}</p>
                    <div class="social-icons">
                      <ul class="list-unstyled list-inline">
                        <li class="list-inline-item">
                          <router-link to="#"><i class="simple-icon-social-facebook"></i></router-link>
                        </li>
                        <li class="list-inline-item">
                          <router-link to="#"><i class="simple-icon-social-twitter"></i></router-link>
                        </li>
                        <li class="list-inline-item">
                          <router-link to="#"><i class="simple-icon-social-instagram"></i></router-link>
                        </li>
                      </ul>
                    </div>
                  </b-card-body>
                </b-card>
                <b-card :title="$t('maps.yandex')" class="mb-4">
                  <yandex-map :coords="[parseFloat(vendor.latitude), parseFloat(vendor.longitude)]" :zoom="15" class="map-item" map-type="map" :controls="['zoomControl']">
                    <ymap-marker marker-id="123" :coords="[parseFloat(vendor.latitude), parseFloat(vendor.longitude)]" :hint-content="vendor.user.first_name + ' ' + vendor.user.last_name" ></ymap-marker>
                  </yandex-map>
                </b-card>
<!--                <b-card no-body class="mb-4">-->
<!--                  <b-card-body>-->
<!--                    <b-card-title>{{$t('pages.recent-posts')}}</b-card-title>-->
<!--                    <div class="remove-last-border remove-last-margin remove-last-padding">-->
<!--                      <recent-post v-for="(post,postIndex) in recentPosts" :data="post" :key="`recent_post_${postIndex}`" />-->
<!--                    </div>-->
<!--                  </b-card-body>-->
<!--                </b-card>-->
              </b-colxx>

              <b-colxx xxs="12" lg="8" class="mb-4 col-right">
                <b-row>
                  <b-colxx v-for="(product, productIndex) in foods" xxs="12" lg="6" xl="4" class="mb-4" :key="`product_${productIndex}`">
                    <b-card no-body>
                      <div class="position-relative">
                        <router-link to="#" class="w-40 w-sm-100">
                          <b-card-img top :alt="product.name" :src="$imgProxy(product.image, '300x200')" />
                        </router-link>
                      </div>
                      <b-card-body>
                        <router-link to="#" class="w-40 w-sm-100">
                          <b-card-sub-title>{{product.name}}</b-card-sub-title>
                        </router-link>
                        <b-card-text class="text-muted text-small mb-0 font-weight-light">
                          {{product.description}}
                        </b-card-text>
                      </b-card-body>
                    </b-card>
                  </b-colxx>
                </b-row>
              </b-colxx>
            </b-row>
          </b-tab>

<!--          <b-tab :title="$t('pages.followers')">-->
<!--            <b-row>-->
<!--              <b-colxx v-for="(follower,followerIndex) in followers" xxs="12" md="6" lg="4" :key="`follower_${followerIndex}`">-->
<!--                <user-card-basic :data="follower" />-->
<!--              </b-colxx>-->
<!--            </b-row>-->
<!--          </b-tab>-->
        </b-tabs>

      </b-colxx>
    </b-row>
    <error-page v-else :error="errorVendors"/>
  </div>
</template>

<script>
import SingleLightbox from '../../../containers/pages/SingleLightbox';
import Stars from "../../../components/Common/Stars";
import RecentPost from '../../../components/Common/RecentPost';
import UserCardBasic from "../../../components/Cards/UserCardBasic";
import { mapGetters } from "vuex";
import produtcs from '../../../data/products'
import recentPosts from "../../../data/recentPosts";
import followers from "../../../data/follow";
import defImage from '@/assets/img/details/chef_placeholder.png'
export default {
  components: {
    stars: Stars,
    'single-lightbox': SingleLightbox,
    'recent-post': RecentPost,
    'user-card-basic': UserCardBasic,
  },
  data() {
    return {
      produtcs: produtcs.slice(0, 15),
      recentPosts,
      followers,
      vendor: null,
      defImage: defImage,
      vendorImage: null,
      foods: []
    }
  },
  computed: {
    ...mapGetters(['errorVendors', 'oneLoadVendors'])
  },
  methods: {},
  mounted() {
    this.$store.dispatch('getByIdVendors', this.$route.params.id).then(res => {
      console.log(res)
      this.vendor = res
      this.vendorImage = (res.media && res.media.length > 0) ? this.$imgProxy(res.media[0].url, '500x350') : this.defImage
    })
    this.$store.dispatch('getFood', {
      vendor_id: this.$route.params.id
    }).then(res => {
      this.foods = res
    })
  }
}
</script>
