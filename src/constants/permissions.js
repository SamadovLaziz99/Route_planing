const roles = {
  admin: 'admin',
  super_admin: 'superadmin',
  operator: 'operator',
  courier_operator: 'courier_operator',
  marketolog: 'marketolog'

}

const permissions = [
  "Dashboard",
  "Order list",
  "Order history",
  "Transaction",
  "Food list",
  "Food category",
  "Food units",
  "Collections",
  "User list",
  "Vendors",
  "Prevendors",
  "Couriers",
  "System users",
  "Map",
  "Settings"
]
export default { roles, permissions }
