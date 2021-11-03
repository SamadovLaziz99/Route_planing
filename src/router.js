import Vue from "vue";
import VueRouter from "vue-router";
// import AuthGuard from "./utils/auth.guard";
import NewGuard from "./utils/new.guard"
import { adminRoot } from "./constants/config";
const roles = {
  super_admin: 'superadmin',
  operator: 'operator',
  courier_operator: 'courier_bro',
  marketolog: 'marketolog'
}
// import { UserRole } from "./utils/auth.roles";

Vue.use(VueRouter);
// const user = ;
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
        redirect: (JSON.parse(localStorage.getItem('detail')) && (JSON.parse(localStorage.getItem('detail')).role.role === roles.courier_operator)) ?`${adminRoot}/orders` : `${adminRoot}/dashboards/default`,
        meta: { roles: [roles.super_admin, roles.operator, roles.marketolog] },
        children: [
          {
            path: "default",
            component: () => import("./views/app/dashboards/Default"),
            meta: { roles: [roles.super_admin, roles.operator, roles.marketolog] },
            // meta: { roles: [UserRole.Admin] },
          }
        ]
      },
      {
        path: "orders",
        component: () => import("./views/app/pages"),
        redirect: `${adminRoot}/orders/list`,
        meta: { roles: [roles.super_admin, roles.operator, roles.courier_operator] },
        children: [
          {
            path: "list",
            name: 'order_list',
            component: () => import("./views/app/orders/List"),
            meta: { roles: [roles.super_admin, roles.operator, roles.courier_operator] },
            children: []
          },
          {
            path: "details/:id",
            name: "order_details",
            component: () => import("./views/app/orders/Details"),
            meta: { roles: [roles.super_admin, roles.operator, roles.courier_operator] },
            children: []
          },
          {
            path: "history",
            name: "order_history",
            component: () => import("./views/app/orders/History"),
            meta: { roles: [roles.super_admin, roles.operator] },
            children: []
          },
          {
            path: "transactions",
            component: () => import("./views/app/orders/Transactions"),
            meta: { roles: [roles.super_admin] },
            children: []
          },
        ]
      },
      {
        path: "foods",
        component: () => import("./views/app/pages"),
        redirect: `${adminRoot}/foods/list`,
        meta: { roles: [roles.super_admin, roles.operator] },
        children: [
          {
            path: "list",
            name: 'food_list',
            component: () => import("./views/app/foods/List"),
            meta: { roles: [roles.super_admin, roles.operator] },
            children: []
          },
          {
            path: "create",
            name: 'food_create',
            component: () => import("./views/app/foods/FoodCrud"),
            meta: { roles: [roles.super_admin, roles.operator] },
            children: []
          },
          {
            path: "update/:id",
            name: 'food_update',
            component: () => import("./views/app/foods/FoodCrud"),
            meta: { roles: [roles.super_admin, roles.operator] },
            children: []
          },
          {
            path: "details/:id",
            name: 'food_detail',
            component: () => import("./views/app/foods/Details"),
            meta: { roles: [roles.super_admin, roles.operator] },
            children: []
          },
          {
            path: "categories",
            name: "categories",
            component: () => import("./views/app/foods/Category"),
            meta: { roles: [roles.super_admin, roles.operator] },
            children: []
          },
          {
            path: "unit",
            component: () => import("./views/app/foods/Unit"),
            meta: { roles: [roles.super_admin, roles.operator] },
            children: []
          },
          {
            path: "collection",
            component: () => import("./views/app/foods/Collection"),
            meta: { roles: [roles.super_admin, roles.operator] },
            children: []
          },
        ]
      },
      {
        path: "users",
        name: 'users',
        component: () => import("./views/app/users/List"),
        meta: { roles: [roles.super_admin, roles.operator] },
        // redirect: `${adminRoot}/users/list`,
        children: []
      },
      {
        path: "employees",
        component: () => import("./views/app/pages"),
        redirect: `${adminRoot}/employees/vendors`,
        meta: { roles: [roles.super_admin, roles.operator] },
        children: [
          {
            path: "vendors",
            name: "vendors_list",
            component: () => import("./views/app/employees/ListVendors"),
            meta: { roles: [roles.super_admin, roles.operator] },
            children: []
          },
          {
            path: "vendors/create",
            name: 'vendor_create',
            component: () => import("./views/app/employees/VendorCrud"),
            meta: { roles: [roles.super_admin, roles.operator] },
            children: []
          },
          {
            path: "vendors/update/:id",
            name: 'vendor_update',
            component: () => import("./views/app/employees/VendorCrud"),
            meta: { roles: [roles.super_admin, roles.operator] },
            children: []
          },
          {
            path: "vendor-detail/:id",
            name: "vendor-detail",
            component: () => import("./views/app/employees/VendorDetails"),
            meta: { roles: [roles.super_admin, roles.operator] },
            children: []
          },
          {
            path: "couriers",
            component: () => import("./views/app/employees/Couriers"),
            meta: { roles: [roles.super_admin] },
            children: []
          },
          {
            path: "system_users",
            name: 'user',
            component: () => import("./views/app/employees/SystemUsers"),
            meta: { roles: [roles.super_admin] },
            children: []
          },
          {
            path: "applicants",
            name: 'applicants',
            component: () => import("./views/app/employees/Applicants"),
            meta: { roles: [roles.super_admin, roles.operator] },
            children: []
          }
        ]
      },
      {
        path: "maps",
        component: () => import("./views/app/map"),
        redirect: `${ adminRoot }/maps/map`,
        meta: { roles: [roles.super_admin, roles.courier_operator] },
        // meta: { roles: [UserRole.Admin, UserRole.Editor] },
        children: [
          {
            path: "map",
            name: "maps",
            component: () => import("./views/app/map/Map"),
            meta: { roles: [roles.super_admin, roles.courier_operator] },
            // meta: { roles: [UserRole.Admin] },
          }
        ]
      },
      {
        path: "vouchers",
        component: () => import("./views/app/map"),
        redirect: `${ adminRoot }/vouchers/v`,
        roles: [roles.super_admin, roles.courier_operator],
        // meta: { roles: [UserRole.Admin, UserRole.Editor] },
        children: [
          {
            path: "v",
            name: "vouchers",
            component: () => import("./views/app/settings/Vouchers"),
            roles: [roles.super_admin, roles.courier_operator],
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
