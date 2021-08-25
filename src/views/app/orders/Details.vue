<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.content')"/>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xl="6" lg="12">
        <icon-cards-carousel></icon-cards-carousel>
        <b-row>
          <b-colxx md="12">
            <b-card class="mb-4" :title="$t('dashboards.top-viewed-posts')">
              <yandex-map
                :controls="['zoomControl']"
                :coords="coords"
                :zoom="15"
                style="width: 100%; height: 300px"
              >
                <ymap-marker
                  :coords="coords"
                  marker-id="123"
                  hint-content="some hint"
                />
              </yandex-map>
            </b-card>
          </b-colxx>
        </b-row>
      </b-colxx>
      <b-colxx lg="12" xl="6">
        <b-card class="mb-4" :title="$t('dashboards.top-viewed-posts')">
          <div leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="height:auto !important;width:100% !important; font-family: Helvetica,Arial,sans-serif !important;">
            <center>
              <table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff;border:1px solid #e4e2e2;border-collapse:separate !important; border-radius:4px;border-spacing:0;color:#242128; margin:0;padding:40px;" heigth="auto">
                <tbody>
                  <tr>
                    <td align="left" valign="center" style="padding-bottom:40px;border-top:0;height:100% !important;width:100% !important;">
                      <img :src="$logo" class="w-20 h-20"/>
                    </td>
                    <td align="right" valign="center" style="padding-bottom:40px;border-top:0;height:100% !important;width:100% !important;">
                      <span style="color: #8f8f8f; font-weight: normal; line-height: 2; font-size: 14px;">02.02.2019</span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" style="padding-top:10px;">
                      <table style="width: 100%">
<!--                        <tr>-->
<!--                          <td colSpan="2" style="padding-bottom:20px;">-->
<!--&lt;!&ndash;                            <h3 style="color:#303030; font-size:18px; line-height: 1.6; font-weight:500;">Order Summary</h3>&ndash;&gt;-->
<!--                            <p style="color:#8f8f8f; font-size: 14px; padding-bottom: 20px; line-height: 1.4; margin-bottom:0;">-->
<!--                              Dynamically target high-payoff intellectual capital for customized technologies. Objectively integrate emerging core competencies before process-centric communities. Dramatically evisculate holistic innovation rather than client-centric data.<br /><br />Progressively maintain extensive infomediaries via extensible niches.</p>-->
<!--                          </td>-->
<!--                        </tr>-->

                        <tr>
                          <td style="padding-top:0px; padding-bottom:20px; width:140px ">
                            <img src="https://coloredstrategies.com/mailing/product-1.jpg" style="width: 113px; height: 85px; object-fit: cover; border-radius: 3px; " />
                          </td>
                          <td style="padding-top:0px; padding-bottom:20px;">
                            <h4 style="font-size: 16px; line-height: 1; margin-bottom:20px;"><a href="#" style="text-decoration: none; color:#303030; font-weight:500;">Marble Cake</a></h4>
                            <p href="#" style="font-size: 12px; text-decoration: none; line-height: 1; color:#909090; margin-top:0px; margin-bottom:0;">3 pcs</p>
                            <p style="font-size: 12px; line-height: 1; color:#909090; margin-top:5px;">Standart Package</p>
                          </td>
                          <td style="padding-top:0px; padding-bottom:20px; text-align: right;">
                            <p style="font-size: 13px; line-height: 1; color:#f18024;  margin-top:5px; vertical-align:top; white-space:nowrap;">$14.82</p>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="3" style="border-top:1px solid #e4e2e2">&nbsp;</td>
                        </tr>

                        <tr>
                          <td style="padding-top:0px; padding-bottom:20px; width:140px ">
                            <img src="https://coloredstrategies.com/mailing/product-2.jpg" style="width: 113px; height: 85px; object-fit: cover; border-radius: 3px; " />
                          </td>
                          <td style="padding-top:0px; padding-bottom:20px;">
                            <h4 style="font-size: 16px; line-height: 1; margin-bottom:20px;"><a href="#" style="text-decoration: none; color:#303030; font-weight:500;">Chocolate Cake</a></h4>
                            <p href="#" style="font-size: 12px; text-decoration: none; line-height: 1; color:#909090; margin-top:0px; margin-bottom:0;">2 pcs</p>
                            <p style="font-size: 12px; line-height: 1; color:#909090; margin-top:5px;">Standart Package</p>
                          </td>
                          <td style="padding-top:0px; padding-bottom:20px; text-align: right;">
                            <p style="font-size: 13px; line-height: 1; color:#f18024;  margin-top:5px; vertical-align:top; white-space:nowrap;">$4.24</p>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="3" style="border-top:1px solid #e4e2e2">&nbsp;</td>
                        </tr>

                        <tr>
                          <td style="padding-top:0px; padding-bottom:20px; width:140px ">
                            <img src="https://coloredstrategies.com/mailing/product-3.jpg" style="width: 113px; height: 85px; object-fit: cover; border-radius: 3px; " />
                          </td>
                          <td style="padding-top:0px; padding-bottom:20px;">
                            <h4 style="font-size: 16px; line-height: 1; margin-bottom:20px;"><a href="#" style="text-decoration: none; color:#303030; font-weight:500;">Fat Rascal</a></h4>
                            <p href="#" style="font-size: 12px; text-decoration: none; line-height: 1; color:#909090; margin-top:0px;  margin-bottom:0;">1 pcs</p>
                            <p style="font-size: 12px; line-height: 1; color:#909090; margin-top:5px;">Standart Package</p>
                          </td>
                          <td style="padding-top:0px; padding-bottom:20px; text-align: right;">
                            <p style="font-size: 13px; line-height: 1; color:#f18024;  margin-top:5px; vertical-align:top; white-space:nowrap;">$12.91</p>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="3" style="border-top:1px solid #e4e2e2">&nbsp;</td>
                        </tr>

                        <tr>
                          <td style="padding-top:0px; padding-bottom:20px; width:140px ">
                            <img src="https://coloredstrategies.com/mailing/product-4.jpg" style="width: 113px; height: 85px; object-fit: cover; border-radius: 3px; " />
                          </td>
                          <td style="padding-top:0px; padding-bottom:20px;">
                            <h4 style="font-size: 16px; line-height: 1; margin-bottom:20px;"><a href="#" style="text-decoration: none; color:#303030; font-weight:500;">Cremeschnitte</a></h4>
                            <p href="#" style="font-size: 12px; text-decoration: none; line-height: 1; color:#909090; margin-top:0px; margin-bottom:0;">4 pcs</p>
                            <p style="font-size: 12px; line-height: 1; color:#909090; margin-top:5px;">Standart Package</p>
                          </td>
                          <td style="padding-top:0px; padding-bottom:20px; text-align: right;">
                            <p style="font-size: 13px; line-height: 1; color:#f18024;  margin-top:5px; vertical-align:top; white-space:nowrap;">$54.20</p>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="3" style="border-top:1px solid #e4e2e2">&nbsp;</td>
                        </tr>

                        <tr>
                          <td colSpan="2" style="padding-top:0px; padding-bottom:5px; text-align: right; color:#909090;">
                            <p style="font-size: 12px; line-height: 1; margin-top:5px; vertical-align:top;  margin-bottom: 0;">Subtotal:&nbsp;</p>
                          </td>
                          <td style="padding-top:0px; padding-bottom:5px; text-align: right; padding-left: 15px;">
                            <p style="font-size: 13px; line-height: 1; margin-top:5px; vertical-align:top; color:#f18024; white-space:nowrap; margin-bottom: 0;">$124.20</p>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" style="padding-top:0px; padding-bottom:5px; text-align: right; color:#909090;">
                            <p style="font-size: 12px; line-height: 1; margin-top:5px; vertical-align:top; margin-bottom: 0;">Shipping:&nbsp;</p>
                          </td>
                          <td style="padding-top:0px; padding-bottom:5px; text-align: right; padding-left: 15px;">
                            <p style="font-size: 13px; line-height: 1; margin-top:5px; vertical-align:top; color:#f18024; white-space:nowrap; margin-bottom: 0;">$4.04</p>
                          </td>
                        </tr>

                        <tr>
                          <td colSpan="2" style="padding-top:0px; padding-bottom:5px; text-align: right; color:#909090;">
                            <p style="font-size: 12px; line-height: 1; margin-top:5px; vertical-align:top; margin-bottom: 0;">Taxes:&nbsp;</p>
                          </td>
                          <td style="padding-top:0px; padding-bottom:5px; text-align: right; padding-left: 15px;">
                            <p style="font-size: 13px; line-height: 1; margin-top:5px; vertical-align:top; color:#f18024; white-space:nowrap; margin-bottom: 0;">$9.14</p>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" style="padding-top:0px; padding-bottom:5px; text-align: right; color:#909090;">
                            <p style="font-size: 12px; line-height: 1; margin-top:5px; vertical-align:top; margin-bottom: 0;"><strong>Total:&nbsp;</strong></p>
                          </td>
                          <td style="padding-top:0px; padding-bottom:5px; text-align: right; padding-left: 15px;">
                            <p style="font-size: 13px; line-height: 1; margin-top:5px; vertical-align:top; color:#f18024; white-space:nowrap; margin-bottom: 0;"><strong>$137.38</strong></p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </center>
          </div>
        </b-card>
      </b-colxx>
    </b-row>
<!--    <b-row>-->
<!--      <b-colxx lg="4" md="6" class="mb-4">-->
<!--        <cakes></cakes>-->
<!--      </b-colxx>-->
<!--      <b-colxx lg="8" md="12" class="mb-4">-->
<!--        <new-comments></new-comments>-->
<!--      </b-colxx>-->
<!--    </b-row>-->
<!--    <b-row>-->
<!--      <b-colxx sm="12" md="6" class="mb-4">-->
<!--        <website-visit-chart-card></website-visit-chart-card>-->
<!--      </b-colxx>-->
<!--      <b-colxx sm="12" md="6" class="mb-4">-->
<!--        <converconversion-rates-chart-card></converconversion-rates-chart-card>-->
<!--      </b-colxx>-->
<!--    </b-row>-->
<!--    <b-row>-->
<!--      <b-colxx lg="4" class="mb-4">-->
<!--        <gradient-with-radial-progress-card-->
<!--          icon="iconsminds-clock"-->
<!--          :title="`5 ${$t('dashboards.posts')}`"-->
<!--          :detail="$t('dashboards.pending-for-publish')"-->
<!--          :percent="5*100/12"-->
<!--          progressText="5/12"-->
<!--        />-->
<!--      </b-colxx>-->
<!--      <b-colxx lg="4" class="mb-4">-->
<!--        <gradient-with-radial-progress-card-->
<!--          icon="iconsminds-male"-->
<!--          :title="`4 ${$t('dashboards.users')}`"-->
<!--          :detail="$t('dashboards.on-approval-process')"-->
<!--          :percent="4*100/6"-->
<!--          progressText="4/6"-->
<!--        />-->
<!--      </b-colxx>-->
<!--      <b-colxx lg="4" class="mb-4">-->
<!--        <gradient-with-radial-progress-card-->
<!--          icon="iconsminds-bell"-->
<!--          :title="`8 ${$t('dashboards.alerts')}`"-->
<!--          :detail="$t('dashboards.waiting-for-notice')"-->
<!--          :percent="8*100/10"-->
<!--          progressText="8/10"-->
<!--        />-->
<!--      </b-colxx>-->
<!--    </b-row>-->
  </div>
</template>

<script>
import BestSellers from "../../../containers/dashboards/BestSellers";
import Cakes from "../../../containers/dashboards/Cakes";
import ConversionRatesChartCard from "../../../containers/dashboards/ConversionRatesChartCard";
import IconCardsCarousel from "../../../containers/dashboards/IconCardsCarousel";
import NewComments from "../../../containers/dashboards/NewComments";
import QuickPost from "../../../containers/dashboards/QuickPost";
import WebsiteVisitsChartCard from "../../../containers/dashboards/WebsiteVisitsChartCard";
import GradientWithRadialProgressCard from "../../../components/Cards/GradientWithRadialProgressCard";
export default {
  components: {
    "best-sellers": BestSellers,
    cakes: Cakes,
    "converconversion-rates-chart-card": ConversionRatesChartCard,
    "icon-cards-carousel": IconCardsCarousel,
    "new-comments": NewComments,
    "quick-post": QuickPost,
    "gradient-with-radial-progress-card": GradientWithRadialProgressCard,
    "website-visit-chart-card": WebsiteVisitsChartCard
  },
  data() {
    return {
      coords: [41.324174, 69.290130],
    }
  },
  methods: {
  }
};
</script>
