import Vue from "vue";
import VueRouter from "vue-router";
// import AuthGuard from "./utils/auth.guard";
import NewGuard from "./utils/new.guard"
import { adminRoot } from "./constants/config";
// import { UserRole } from "./utils/auth.roles";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: `${adminRoot}`,
    component: () => import(/* webpackChunkName: "home" */ "./views/home"),
  },
  {
    path: adminRoot,
    component: () => import(/* webpackChunkName: "app" */ "./views/app"),
    redirect: `${adminRoot}/dashboards`,
    meta: { loginRequired: true },
    /*
    define with Authorization :
    meta: { loginRequired: true, roles: [UserRole.Admin, UserRole.Editor] },
    */
    children: [
      {
        path: "dashboards",
        component: () => import("./views/app/dashboards"),
        redirect: `${adminRoot}/dashboards/default`,
        // meta: { roles: [UserRole.Admin, UserRole.Editor] },
        children: [
          {
            path: "default",
            component: () => import("./views/app/dashboards/Default"),
            // meta: { roles: [UserRole.Admin] },
          }
        ]
      },
      {
        path: "orders",
        component: () => import("./views/app/pages"),
        redirect: `${adminRoot}/orders/list`,
        children: [
          {
            path: "list",
            component: () => import("./views/app/orders/List"),
            children: []
          },
          {
            path: "details/:id",
            name: "orderDetails",
            component: () => import("./views/app/orders/Details"),
            children: []
          },
          {
            path: "history",
            component: () => import("./views/app/orders/History"),
            children: []
          },
          {
            path: "transactions",
            component: () => import("./views/app/orders/Transactions"),
            children: []
          },
        ]
      },
      {
        path: "foods",
        component: () => import("./views/app/pages"),
        redirect: `${adminRoot}/foods/list`,
        children: [
          {
            path: "list",
            component: () => import("./views/app/foods/List"),
            children: []
          },
          {
            path: "create",
            name: 'food_create',
            component: () => import("./views/app/foods/FoodCrud"),
            children: []
          },
          {
            path: "update/:id",
            name: 'food_update',
            component: () => import("./views/app/foods/FoodCrud"),
            children: []
          },
          {
            path: "details",
            name: 'food_detail',
            component: () => import("./views/app/foods/Details"),
            children: []
          },
          {
            path: "categories",
            name: "categories",
            component: () => import("./views/app/foods/Category"),
            children: []
          },
          {
            path: "unit",
            component: () => import("./views/app/foods/Unit"),
            children: []
          },
          {
            path: "collection",
            component: () => import("./views/app/foods/Collection"),
            children: []
          },
        ]
      },
      {
        path: "users",
        name: 'users',
        component: () => import("./views/app/users/List"),
        // redirect: `${adminRoot}/users/list`,
        children: [
          // {
          //   path: "list",
          //   name: 'users',
          //   component: () => import("./views/app/users/List"),
          //   children: []
          // }
        ]
      },
      {
        path: "employees",
        component: () => import("./views/app/pages"),
        redirect: `${adminRoot}/employees/list`,
        children: [
          {
            path: "vendors",
            name: "vendors",
            component: () => import("./views/app/employees/Vendors"),
            children: []
          },
          {
            path: "vendors/create",
            name: 'vendor_create',
            component: () => import("./views/app/employees/VendorCrud"),
            children: []
          },
          {
            path: "vendor-detail",
            name: "vendor-detail",
            component: () => import("./views/app/employees/VendorDetails"),
            children: []
          },
          {
            path: "couriers",
            component: () => import("./views/app/employees/Couriers"),
            children: []
          },
          {
            path: "system_users",
            name: 'user',
            component: () => import("./views/app/employees/SystemUsers"),
            children: []
          },
          // {
          //   path: "maps",
          //   name: 'maps',
          //   component: () => import("./views/app/map/Map"),
          //   children: []
          // },
          // {
          //   path: "management_team",
          //   component: () => import("./views/app/employees/ManagementTeam"),
          //   children: []
          // }
        ]
      },
      {
        path: "maps",
        component: () => import("./views/app/map"),
        redirect: `${ adminRoot }/maps/map`,
        // meta: { roles: [UserRole.Admin, UserRole.Editor] },
        children: [
          {
            path: "map",
            name: "maps",
            component: () => import("./views/app/map/Map"),
            // meta: { roles: [UserRole.Admin] },
          }
        ]
      },
      {
        path: "settings",
        component: () => import("./views/app/pages"),
        redirect: `${adminRoot}/settings/list`,
        children: [
          {
            path: "roles",
            component: () => import("./views/app/pages/product/DataList"),
            children: []
          },
          {
            path: "main_settings",
            component: () => import("./views/app/pages/product/ThumbList"),
            children: []
          },
          {
            path: "banner",
            component: () => import("./views/app/pages/product/Details"),
            children: []
          },
          {
            path: "video_tutorial",
            name: 'videos',
            component: () => import("./views/app/settings/Videos"),
            children: []
          },
          {
            path: "pages",
            component: () => import("./views/Defaults"),
            children: []
          },
        ]
      },

























      // {
      //   path: "foods",
      //   component: () =>
      //     import(/* webpackChunkName: "applications" */ "./views/app/applications"),
      //   redirect: `${adminRoot}/applications/todo`,
      //   children: [
      //     {
      //       path: "todo",
      //       component: () =>
      //         import(/* webpackChunkName: "applications" */ "./views/app/applications/Todo")
      //     },
      //     {
      //       path: "survey",
      //       component: () =>
      //         import(/* webpackChunkName: "applications" */ "./views/app/applications/Survey")
      //     },
      //     {
      //       path: "survey/:id",
      //       component: () =>
      //         import(/* webpackChunkName: "applications" */ "./views/app/applications/SurveyDetail"),
      //       props: true
      //     },
      //     {
      //       path: "chat",
      //       component: () =>
      //         import(/* webpackChunkName: "applications" */ "./views/app/applications/Chat")
      //     }
      //   ]
      // },
      // {
      //   path: "ui",
      //   component: () => import(/* webpackChunkName: "ui" */ "./views/app/ui"),
      //   redirect: `${adminRoot}/ui/forms`,
      //   children: [
      //     {
      //       path: "forms",
      //       component: () =>
      //         import(/* webpackChunkName : "forms" */ "./views/app/ui/forms"),
      //       redirect: `${adminRoot}/ui/forms/layouts`,
      //       children: [
      //         {
      //           path: "layouts",
      //           component: () =>
      //             import(/* webpackChunkName: "forms" */ "./views/app/ui/forms/Layouts")
      //         },
      //         {
      //           path: "components",
      //           component: () =>
      //             import(/* webpackChunkName: "forms" */ "./views/app/ui/forms/Components")
      //         },
      //         {
      //           path: "validations",
      //           component: () =>
      //             import(/* webpackChunkName: "forms" */ "./views/app/ui/forms/Validations")
      //         },
      //         {
      //           path: "wizard",
      //           component: () =>
      //             import(/* webpackChunkName: "forms" */ "./views/app/ui/forms/Wizard")
      //         },
      //       ]
      //     },
      //     {
      //       path: "datatables",
      //       component: () =>
      //         import(/* webpackChunkName : "datatables" */ "./views/app/ui/datatables"),
      //       redirect: `${adminRoot}/ui/datatables/divided-table`,
      //       children: [
      //         {
      //           path: "divided-table",
      //           component: () =>
      //             import(/* webpackChunkName: "datatables" */ "./views/app/ui/datatables/DividedTable")
      //         },
      //         {
      //           path: "scrollable",
      //           component: () =>
      //             import(/* webpackChunkName: "datatables" */ "./views/app/ui/datatables/Scrollable")
      //         },
      //         {
      //           path: "default",
      //           component: () =>
      //             import(/* webpackChunkName: "datatables" */ "./views/app/ui/datatables/Default")
      //         }
      //       ]
      //     },
      //     {
      //       path: "components",
      //       component: () =>
      //         import(/* webpackChunkName : "components" */ "./views/app/ui/components"),
      //       redirect: `${adminRoot}/ui/components/alerts`,
      //       children: [
      //         {
      //           path: "alerts",
      //           component: () =>
      //             import(/* webpackChunkName: "components" */ "./views/app/ui/components/Alerts")
      //         },
      //         {
      //           path: "badges",
      //           component: () =>
      //             import(/* webpackChunkName: "components" */ "./views/app/ui/components/Badges")
      //         },
      //         {
      //           path: "buttons",
      //           component: () =>
      //             import(/* webpackChunkName: "components" */ "./views/app/ui/components/Buttons")
      //         },
      //         {
      //           path: "cards",
      //           component: () =>
      //             import(/* webpackChunkName: "components" */ "./views/app/ui/components/Cards")
      //         },
      //         {
      //           path: "carousel",
      //           component: () =>
      //             import(/* webpackChunkName: "components" */ "./views/app/ui/components/Carousel")
      //         },
      //         {
      //           path: "charts",
      //           component: () =>
      //             import(/* webpackChunkName: "components" */ "./views/app/ui/components/Charts")
      //         },
      //         {
      //           path: "collapse",
      //           component: () =>
      //             import(/* webpackChunkName: "components" */ "./views/app/ui/components/Collapse")
      //         },
      //         {
      //           path: "dropdowns",
      //           component: () =>
      //             import(/* webpackChunkName: "components" */ "./views/app/ui/components/Dropdowns")
      //         },
      //         {
      //           path: "editors",
      //           component: () =>
      //             import(/* webpackChunkName: "components" */ "./views/app/ui/components/Editors")
      //         },
      //         {
      //           path: "icons",
      //           component: () =>
      //             import(/* webpackChunkName: "components" */ "./views/app/ui/components/Icons")
      //         },
      //         {
      //           path: "input-groups",
      //           component: () =>
      //             import(/* webpackChunkName: "components" */ "./views/app/ui/components/InputGroups")
      //         },
      //         {
      //           path: "jumbotron",
      //           component: () =>
      //             import(/* webpackChunkName: "components" */ "./views/app/ui/components/Jumbotron")
      //         },
      //         {
      //           path: "maps",
      //           component: () =>
      //             import(/* webpackChunkName: "components" */ "./views/app/ui/components/Maps")
      //         },
      //         {
      //           path: "modal",
      //           component: () =>
      //             import(/* webpackChunkName: "components" */ "./views/app/ui/components/Modal")
      //         },
      //         {
      //           path: "navigation",
      //           component: () =>
      //             import(/* webpackChunkName: "components" */ "./views/app/ui/components/Navigation")
      //         },
      //         {
      //           path: "popover-tooltip",
      //           component: () =>
      //             import(/* webpackChunkName: "components" */ "./views/app/ui/components/PopoverTooltip")
      //         },
      //         {
      //           path: "sortable",
      //           component: () =>
      //             import(/* webpackChunkName: "components" */ "./views/app/ui/components/Sortable")
      //         },
      //         {
      //           path: "tables",
      //           component: () =>
      //             import(/* webpackChunkName: "components" */ "./views/app/ui/components/Tables")
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   path: "menu",
      //   component: () =>
      //     import(/* webpackChunkName: "menu" */ "./views/app/menu"),
      //   redirect: `${adminRoot}/menu/types`,
      //   children: [
      //     {
      //       path: "types",
      //       component: () =>
      //         import(/* webpackChunkName : "menu-types" */ "./views/app/menu/Types")
      //     },
      //     {
      //       path: "levels",
      //       component: () =>
      //         import(/* webpackChunkName : "menu-levels" */ "./views/app/menu/levels"),
      //       redirect: `${adminRoot}/menu/levels/third-level-1`,
      //       children: [
      //         {
      //           path: "third-level-1",
      //           component: () =>
      //             import(/* webpackChunkName: "menu-levels" */ "./views/app/menu/levels/Third-level-1")
      //         },
      //         {
      //           path: "third-level-2",
      //           component: () =>
      //             import(/* webpackChunkName: "menu-levels" */ "./views/app/menu/levels/Third-level-2")
      //         },
      //         {
      //           path: "third-level-3",
      //           component: () =>
      //             import(/* webpackChunkName: "menu-levels" */ "./views/app/menu/levels/Third-level-3")
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   path: "blank-page",
      //   component: () =>
      //     import(/* webpackChunkName: "blank-page" */ "./views/app/blank-page")
      // }
    ]
  },
  {
    path: "/error",
    name: "error",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  },
  {
    path: "/unauthorized",
    name: "unauthorized",
    component: () => import(/* webpackChunkName: "error" */ "./views/Unauthorized")
  },
  {
    path: "/user",
    component: () => import(/* webpackChunkName: "user" */ "./views/user"),
    redirect: "/user/login",
    children: [
      {
        path: "login",
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Login")
      },
      {
        path: "register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Register")
      },
      {
        path: "forgot-password",
        name: "forgot-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/ForgotPassword")
      },
      {
        path: "reset-password",
        name: "reset-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/ResetPassword")
      },

    ]
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  }
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history",
});
router.beforeEach(NewGuard);
export default router;
