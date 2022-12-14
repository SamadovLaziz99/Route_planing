import Vue from "vue";
import VueRouter from "vue-router";
// import AuthGuard from "./utils/auth.guard";
import NewGuard from "./utils/new.guard"
import { adminRoot } from "./constants/config";
const roles = {
  super_admin: 'superadmin',
  public: 'Public',
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
    redirect: `${adminRoot}/users`,
    meta: { loginRequired: true },
    /*
    define with Authorization :
    meta: { loginRequired: true, roles: [UserRole.Admin, UserRole.Editor] },
    */
    children: [
      // {
      //   path: "dashboards",
      //   component: () => import("./views/app/dashboards"),
      //   redirect: (JSON.parse(localStorage.getItem('detail')) && (JSON.parse(localStorage.getItem('detail')).role.role === roles.courier_operator)) ?`${adminRoot}/orders` : `${adminRoot}/dashboards/analytics`,
      //   meta: { roles: [roles.super_admin, roles.operator, roles.public, roles.marketolog] },
      //   children: [
      //     {
      //       path: "analytics",
      //       component: () => import("./views/app/dashboards/Default"),
      //       meta: { roles: [roles.super_admin, roles.operator, roles.public, roles.marketolog] },
      //       // meta: { roles: [UserRole.Admin] },
      //     }
      //   ]
      // },
      {
        path: "orders",
        component: () => import("./views/app/pages"),
        redirect: `${adminRoot}/orders/list`,
        meta: { roles: [roles.super_admin, roles.operator, roles.public, roles.courier_operator] },
        children: [
          {
            path: "list",
            name: 'order_list',
            component: () => import("./views/app/orders/List"),
            meta: { roles: [roles.super_admin, roles.operator, roles.public, roles.courier_operator] },
            children: []
          },
          {
            path: "details/:id",
            name: "order_details",
            component: () => import("./views/app/orders/Details"),
            meta: { roles: [roles.super_admin, roles.operator, roles.public, roles.courier_operator] },
            children: []
          },
          {
            path: "history",
            name: "order_history",
            component: () => import("./views/app/orders/History"),
            meta: { roles: [roles.super_admin, roles.operator, roles.public] },
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
      // {
      //   path: "foods",
      //   component: () => import("./views/app/pages"),
      //   redirect: `${adminRoot}/foods/list`,
      //   meta: { roles: [roles.super_admin, roles.operator, roles.public] },
      //   children: [
      //     {
      //       path: "list",
      //       name: 'food_list',
      //       component: () => import("./views/app/foods/List"),
      //       meta: { roles: [roles.super_admin, roles.operator, roles.public] },
      //       children: []
      //     },
      //     {
      //       path: "create",
      //       name: 'food_create',
      //       component: () => import("./views/app/foods/FoodCrud"),
      //       meta: { roles: [roles.super_admin, roles.operator, roles.public] },
      //       children: []
      //     },
      //     {
      //       path: "update/:id",
      //       name: 'food_update',
      //       component: () => import("./views/app/foods/FoodCrud"),
      //       meta: { roles: [roles.super_admin, roles.operator, roles.public] },
      //       children: []
      //     },
      //     {
      //       path: "details/:id",
      //       name: 'food_detail',
      //       component: () => import("./views/app/foods/Details"),
      //       meta: { roles: [roles.super_admin, roles.operator, roles.public] },
      //       children: []
      //     },
      //     {
      //       path: "categories",
      //       name: "categories",
      //       component: () => import("./views/app/foods/Category"),
      //       meta: { roles: [roles.super_admin, roles.operator, roles.public] },
      //       children: []
      //     },
      //     {
      //       path: "unit",
      //       component: () => import("./views/app/foods/Unit"),
      //       meta: { roles: [roles.super_admin, roles.operator, roles.public] },
      //       children: []
      //     },
      //     {
      //       path: "collection",
      //       component: () => import("./views/app/foods/Collection"),
      //       meta: { roles: [roles.super_admin, roles.operator, roles.public] },
      //       children: []
      //     },
      //   ]
      // },
      {
        path: "users",
        name: "users",
        component: () => import("./views/app/users/List"),
        meta: { roles: [roles.super_admin, roles.operator, roles.public, roles.public] },
        // redirect: `${adminRoot}/users/list`,
        children: []
      },
      {
        path: "users/:id",
        name: 'user_details',
        component: () => import("./views/app/users/Details"),
        meta: { roles: [roles.super_admin, roles.operator, roles.public] },
        // redirect: `${adminRoot}/users/list`,
        children: []
      },
      {
        path: "employees",
        component: () => import("./views/app/pages"),
        redirect: `${adminRoot}/employees/vendors`,
        meta: { roles: [roles.super_admin, roles.operator, roles.public] },
        children: [
          // {
          //   path: "vendors",
          //   name: "vendors_list",
          //   component: () => import("./views/app/employees/ListVendors"),
          //   meta: { roles: [roles.super_admin, roles.operator, roles.public] },
          //   children: []
          // },
          // {
          //   path: "vendors/create",
          //   name: 'vendor_create',
          //   component: () => import("./views/app/employees/VendorCrud"),
          //   meta: { roles: [roles.super_admin, roles.operator, roles.public] },
          //   children: []
          // },
          {
            path: "vendors/update/:id",
            name: 'vendor_update',
            component: () => import("./views/app/employees/VendorCrud"),
            meta: { roles: [roles.super_admin, roles.operator, roles.public] },
            children: []
          },
          {
            path: "vendor-detail/:id",
            name: "vendor-detail",
            component: () => import("./views/app/employees/VendorDetails"),
            meta: { roles: [roles.super_admin, roles.operator, roles.public] },
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
            meta: { roles: [roles.super_admin, roles.operator, roles.public] },
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
        meta: { roles: [roles.super_admin, roles.courier_operator] },
        children: [
          {
            path: "v",
            name: "vouchers",
            component: () => import("./views/app/settings/Vouchers"),
            meta: { roles: [roles.super_admin, roles.courier_operator] },
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
        meta: { roles: [roles.super_admin, roles.operator, roles.public, roles.marketolog, roles.courier_operator] },
        children: [
          {
            path: "roles",
            component: () => import("./views/app/pages/product/DataList"),
            children: []
          },
          {
            path: "main_settings",
            name: "main_settings",
            meta: { roles: [roles.super_admin, roles.operator, roles.public, roles.marketolog, roles.courier_operator] },
            component: () => import("./views/app/settings/settings"),
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
            meta: { roles: [roles.super_admin, roles.operator, roles.public, roles.marketolog, roles.courier_operator] },
            children: []
          },
          {
            path: "inventory",
            name: 'inventory',
            component: () => import("./views/app/inventory/Inventory"),
            meta: { roles: [roles.super_admin, roles.operator, roles.public, roles.marketolog, roles.courier_operator] },
            children: []
          },
          {
            path: "vendor_inventory",
            name: 'vendor_inventory',
            component: () => import("./views/app/inventory/VendorInventors"),
            meta: { roles: [roles.super_admin, roles.operator, roles.public, roles.marketolog, roles.courier_operator] },
            children: []
          },
          {
            path: "pages",
            component: () => import("./views/Defaults"),
            children: []
          },
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
      {
        path: "account",
        name: 'account',
        component: () => import("./views/app/account/Account"),
        meta: { roles: [roles.super_admin, roles.operator, roles.public, roles.courier_operator, roles.marketolog] },
        children: []
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
