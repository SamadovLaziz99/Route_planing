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
            name: 'order_list',
            component: () => import("./views/app/orders/List"),
            children: []
          },
          {
            path: "details/:id",
            name: "order_details",
            component: () => import("./views/app/orders/Details"),
            children: []
          },
          {
            path: "history",
            name: "order_history",
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
            name: 'food_list',
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
            path: "details/:id",
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
        children: []
      },
      {
        path: "employees",
        component: () => import("./views/app/pages"),
        redirect: `${adminRoot}/employees/vendors`,
        children: [
          {
            path: "vendors",
            name: "vendors_list",
            component: () => import("./views/app/employees/ListVendors"),
            children: []
          },
          {
            path: "vendors/create",
            name: 'vendor_create',
            component: () => import("./views/app/employees/VendorCrud"),
            children: []
          },
          {
            path: "vendors/update/:id",
            name: 'vendor_update',
            component: () => import("./views/app/employees/VendorCrud"),
            children: []
          },
          {
            path: "vendor-detail/:id",
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
          {
            path: "applicants",
            name: 'applicants',
            component: () => import("./views/app/employees/Applicants"),
            children: []
          }
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
        path: "vouchers",
        component: () => import("./views/app/map"),
        redirect: `${ adminRoot }/vouchers/v`,
        // meta: { roles: [UserRole.Admin, UserRole.Editor] },
        children: [
          {
            path: "v",
            name: "vouchers",
            component: () => import("./views/app/settings/Vouchers"),
            // meta: { roles: [UserRole.Admin] },
          }
        ]
      },
      {
        path: "maps2",
        component: () => import("./views/app/map"),
        redirect: `${ adminRoot }/maps2/map2`,
        // meta: { roles: [UserRole.Admin, UserRole.Editor] },
        children: [
          {
            path: "map2",
            name: "maps2",
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
  mode: "hash",
});
router.beforeEach(NewGuard);
export default router;
