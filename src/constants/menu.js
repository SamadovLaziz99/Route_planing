import {adminRoot} from "./config";

const roles = {
  super_admin: 'superadmin',
  public: 'Public',
  operator: 'operator',
  courier_operator: 'courier_bro',
  marketolog: 'marketolog'
}
// // import { UserRole } from "../utils/auth.roles";
// const { admin, super_admin, operator, courier_operator, marketolog } = roles
const data = [
  // {
  //   id: "dashboards",
  //   icon: "simple-icon-chart",
  //   label: "menu.dashboards",
  //   to: `${adminRoot}/dashboards`,
  //   roles: [roles.super_admin, roles.operator, roles.marketolog],
  //   subs: []
  // },
  {
    id: "orders",
    icon: "iconsminds-shopping-cart",
    label: "menu.orders",
    to: `${adminRoot}/orders`,
    // roles: [roles.super_admin, roles.operator, roles.courier_operator],
    subs: [
      {
        icon: "iconsminds-shop-4",
        label: "menu.orders_list",
        to: `${adminRoot}/orders/list?type=pending`,
        // roles: [roles.super_admin, roles.operator, roles.courier_operator],
      },
      {
        icon: "iconsminds-cash-register-2",
        label: "menu.orders_history",
        to: `${adminRoot}/orders/history?type=finished`,
        // roles: [roles.super_admin, roles.operator],
      },
      {
        icon: "iconsminds-receipt-4",
        label: "menu.transactions",
        to: `${adminRoot}/orders/transactions`,
        // roles: [roles.super_admin],
        // roles: [UserRole.Admin],
      },
    ]
  },
  // {
  //   id: "foods",
  //   icon: "iconsminds-hamburger",
  //   label: "menu.foods",
  //   to: `${adminRoot}/foods`,
  //   roles: [roles.super_admin, roles.operator],
  //   subs: [
  //     {
  //       icon: "iconsminds-hamburger",
  //       label: "menu.foods_list",
  //       to: `${adminRoot}/foods/list`,
  //       roles: [roles.super_admin, roles.operator],
  //       // roles: [UserRole.Admin],
  //     },
  //     {
  //       icon: "iconsminds-box-with-folders",
  //       label: "menu.foods_category",
  //       to: `${adminRoot}/foods/categories`,
  //       roles: [roles.super_admin, roles.operator],
  //       // roles: [UserRole.Admin],
  //     },
  //     {
  //       icon: "iconsminds-pantone",
  //       label: "menu.foods_unit",
  //       to: `${adminRoot}/foods/unit`,
  //       roles: [roles.super_admin, roles.operator],
  //       // roles: [UserRole.Admin],
  //     },
  //     {
  //       icon: "simple-icon-grid",
  //       label: "menu.foods_collection",
  //       to: `${adminRoot}/foods/collection`,
  //       roles: [roles.super_admin, roles.operator],
  //       // roles: [UserRole.Admin],
  //     },
  //   ]
  // },
  {
    id: "users",
    icon: "simple-icon-user",
    label: "menu.users",
    to: `${adminRoot}/users`,
    // roles: [roles.super_admin, roles.operator, roles.public],
    subs: []
    // subs: [
    //   {
    //     icon: "simple-icon-people",
    //     label: "menu.users_list",
    //     to: `${adminRoot}/users/list`,
    //     // roles: [UserRole.Admin],
    //   }
    // ]
  },
  {
    id: "employees",
    icon: "iconsminds-business-man",
    label: "menu.employees",
    to: `${adminRoot}/employees`,
    // roles: [roles.super_admin, roles.operator, roles.public],
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      // {
      //   icon: "iconsminds-chef-hat",
      //   label: "menu.vendors",
      //   to: `${adminRoot}/employees/vendors`,
      //   roles: [roles.super_admin, roles.operator, roles.public],
      //   // roles: [UserRole.Admin],
      // },
      // {
      //   icon: "simple-icon-user-follow",
      //   label: "menu.applicants",
      //   to: `${adminRoot}/employees/applicants`,
      //   roles: [roles.super_admin, roles.operator, roles.public],
      //   // roles: [UserRole.Admin],
      // },
      {
        icon: "iconsminds-scooter",
        label: "menu.couriers",
        to: `${adminRoot}/employees/couriers`,
        // roles: [roles.super_admin],
        // roles: [UserRole.Admin],
      },
      // {
      //   icon: "iconsminds-conference",
      //   label: "menu.management_team",
      //   to: `${adminRoot}/employees/management_team`,
      //   // roles: [UserRole.Admin],
      // },
      {
        icon: "iconsminds-conference",
        label: "menu.system_users",
        to: `${adminRoot}/employees/system_users`,
        // roles: [roles.super_admin],
        // roles: [UserRole.Admin],
      }
    ]
  },
  {
    id: "maps",
    icon: "simple-icon-map",
    label: "menu.maps",
    to: `${adminRoot}/maps`,
    // roles: [roles.super_admin, roles.courier_operator],
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: []
  },
  {
    id: "vouchers",
    icon: "simple-icon-tag",
    label: "menu.vouchers",
    to: `${adminRoot}/vouchers`,
    // roles: [roles.super_admin, roles.courier_operator],
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: []
  },
  {
    id: "company",
    icon: "iconsminds-office",
    label: "company",
    to: `${adminRoot}/company`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: []
  },
  {
    id: "settings",
    icon: "simple-icon-settings",
    label: "menu.settings",
    to: `${adminRoot}/settings`,
    // roles: [roles.super_admin, roles.operator, roles.public, roles.courier_operator],
    subs: [
      // {
      //   icon: "iconsminds-key",
      //   label: "menu.roles",
      //   to: `${adminRoot}/settings/roles`,
      //   // roles: [UserRole.Admin],
      // },
      // {
      //   icon: "iconsminds-gear",
      //   label: "menu.main_settings",
      //   to: `${adminRoot}/settings/main_settings`,
      //   // roles: [UserRole.Admin],
      // },
      // {
      //   icon: "iconsminds-digital-drawing",
      //   label: "menu.banner",
      //   to: `${adminRoot}/settings/banner`,
      //   // roles: [UserRole.Admin],
      // },
      // {
      //   icon: "iconsminds-video",
      //   label: "menu.video_tutorial",
      //   to: `${adminRoot}/settings/video_tutorial`,
      //   roles: [roles.super_admin, roles.operator, roles.public, roles.courier_operator],
      // },
      {
        icon: "iconsminds-car",
        label: "cars",
        to: `${adminRoot}/settings/cars`,
        // roles: [roles.super_admin, roles.operator, roles.public, roles.courier_operator],
      },
      {
        icon: "iconsminds-magic-wand",
        label: "colors",
        to: `${adminRoot}/settings/colors`,
        // roles: [roles.super_admin, roles.operator, roles.public, roles.courier_operator],
      },
      // {
      //   icon: "iconsminds-cupcake",
      //   label: "menu.vendor_inventory",
      //   to: `${adminRoot}/settings/vendor_inventory`,
      // roles: [roles.super_admin, roles.operator, roles.public, roles.courier_operator],
      // },
      // {
      //   icon: "simple-icon-settings",
      //   label: "menu.main_settings",
      //   to: `${adminRoot}/settings/main_settings`,
      // roles: [roles.super_admin, roles.operator, roles.public, roles.courier_operator],
      // },
      // {
      //   icon: "iconsminds-digital-drawing",
      //   label: "menu.pages",
      //   to: `${adminRoot}/settings/pages`,
      //   // roles: [UserRole.Admin],
      // }
    ]
  },
]
export default data;
