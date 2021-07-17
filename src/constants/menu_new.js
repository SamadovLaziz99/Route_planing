import { adminRoot } from "./config";
// import { UserRole } from "../utils/auth.roles";

const data = [
  {
    id: "dashboards",
    icon: "simple-icon-chart",
    label: "menu.dashboards",
    to: `${adminRoot}/dashboards`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: []
  },
  {
    id: "orders",
    icon: "iconsminds-shopping-cart",
    label: "menu.orders",
    to: `${adminRoot}/orders`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: "iconsminds-shop-4",
        label: "menu.orders_list",
        to: `${adminRoot}/orders/list`,
        // roles: [UserRole.Admin],
      },
      {
        icon: "iconsminds-cash-register-2",
        label: "menu.orders_history",
        to: `${adminRoot}/orders/history`,
        // roles: [UserRole.Admin],
      },
      {
        icon: "iconsminds-receipt-4",
        label: "menu.transactions",
        to: `${adminRoot}/orders/transactions`,
        // roles: [UserRole.Admin],
      },
    ]
  },
  {
    id: "foods",
    icon: "iconsminds-hamburger",
    label: "menu.foods",
    to: `${adminRoot}/foods`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: "iconsminds-hamburger",
        label: "menu.foods_list",
        to: `${adminRoot}/foods/list`,
        // roles: [UserRole.Admin],
      },
      {
        icon: "iconsminds-box-with-folders",
        label: "menu.foods_category",
        to: `${adminRoot}/foods/category`,
        // roles: [UserRole.Admin],
      },
      {
        icon: "iconsminds-pantone",
        label: "menu.foods_unit",
        to: `${adminRoot}/foods/unit`,
        // roles: [UserRole.Admin],
      },
      {
        icon: "simple-icon-grid",
        label: "menu.foods_collection",
        to: `${adminRoot}/foods/collection`,
        // roles: [UserRole.Admin],
      },
    ]
  },
  {
    id: "users",
    icon: "simple-icon-user",
    label: "menu.users",
    to: `${adminRoot}/users`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: "simple-icon-people",
        label: "menu.users_list",
        to: `${adminRoot}/users/list`,
        // roles: [UserRole.Admin],
      }
    ]
  },
  {
    id: "employees",
    icon: "iconsminds-business-man",
    label: "menu.employees",
    to: `${adminRoot}/employees`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: "iconsminds-chef-hat",
        label: "menu.vendors",
        to: `${adminRoot}/employees/vendors`,
        // roles: [UserRole.Admin],
      },
      {
        icon: "iconsminds-scooter",
        label: "menu.couriers",
        to: `${adminRoot}/employees/couriers`,
        // roles: [UserRole.Admin],
      },
      {
        icon: "iconsminds-conference",
        label: "menu.management_team",
        to: `${adminRoot}/employees/management_team`,
        // roles: [UserRole.Admin],
      }
    ]
  },
  {
    id: "settings",
    icon: "simple-icon-settings",
    label: "menu.settings",
    to: `${adminRoot}/settings`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: "iconsminds-key",
        label: "menu.roles",
        to: `${adminRoot}/settings/roles`,
        // roles: [UserRole.Admin],
      },
      {
        icon: "iconsminds-gear",
        label: "menu.main_settings",
        to: `${adminRoot}/settings/main_settings`,
        // roles: [UserRole.Admin],
      },
      {
        icon: "iconsminds-digital-drawing",
        label: "menu.banner",
        to: `${adminRoot}/settings/banner`,
        // roles: [UserRole.Admin],
      },
      {
        icon: "iconsminds-video",
        label: "menu.video_tutorial",
        to: `${adminRoot}/settings/video_tutorial`,
        // roles: [UserRole.Admin],
      },
      {
        icon: "iconsminds-digital-drawing",
        label: "menu.pages",
        to: `${adminRoot}/settings/pages`,
        // roles: [UserRole.Admin],
      }
    ]
  },
]
export default data;
