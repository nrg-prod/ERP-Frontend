import { MenuItem } from "../core/components/sidebar-nav/sidebar-nav.model";

export const abc = 5;

export const SidenavItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "assets/images/dashboard.png",
    path: "/"
  },
  {
    id: "employment",
    label: "Employment",
    icon: "assets/images/employee.png",
    path: "/employment"
  },
  {
    id: "vendorAndCustomer",
    label: "Vendor & Customer",
    icon: "assets/images/vendor-customer.png",
    path: "/vendor-and-customer"
  },
  {
    id: "categoryAndProduct",
    label: "Category & Product",
    icon: "assets/images/category-product.png",
    path: "/category-and-product"
  },
  {
    id: "purchase",
    label: "Purchase",
    icon: "assets/images/circle-cropped.png",
    path: "/purchase"
  },
  {
    id: "sales",
    label: "Sales",
    icon: "assets/images/sales.png",
    path: "/sales"
  },
  /*{
    id: "finance",
    label: "Finance",
    icon: "assets/images/finance.png",
    path: "/finance"
  },
  {
    id: "stock",
    label: "Stock",
    icon: "assets/images/stock.png",
    path: "/stock"
  },
  {
    id: "report",
    label: "Report",
    icon: "assets/images/reports.png",
    path: "/report"
  },
  {
    id: "userManagement",
    label: "User Management",
    icon: "assets/images/usermgt.png",
    path: "/user-management"
  },*/
  {
    id: "logout",
    label: "Log Out",
    icon: "assets/images/logout.png",
    path: "/login"
  }
];
