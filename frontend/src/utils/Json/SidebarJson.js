import { MdDashboard, MdInventory2, MdReceiptLong, MdSettings } from "react-icons/md";
import { FaFileInvoice, FaTruck, FaUserGroup } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";

export const sidebarConfig = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    id: "customers",
    label: "Customers",
    path: "/customers",
    icon: <FaUserGroup />,
  },
  {
    id: "products",
    label: "Products",
    path: "/products",
    icon: <MdInventory2 />,
  },
  {
    id: "invoices",
    label: "Invoices",
    path: "/invoices",
    icon: <FaFileInvoice />,
  },
  {
    id: "einvoice",
    label: "E-Invoice",
    path: "/e-invoice",
    icon: <MdReceiptLong />,
  },
  {
    id: "ewaybill",
    label: "E-Way Bill",
    path: "/e-way-bill",
    icon: <FaTruck />,
  },
  {
    id: "reports",
    label: "Reports",
    path: "/reports",
    icon: <BiSolidReport />,
    children: [
      {
        id: "sales-report",
        label: "Sales Report",
        path: "/reports/sales",
      },
      {
        id: "purchase-report",
        label: "Purchase Report",
        path: "/reports/purchase",
      },
    ],
  },
  {
    id: "users",
    label: "Users",
    path: "/users",
    icon: <FaUserGroup />,
  },
  {
    id: "settings",
    label: "Settings",
    path: "/settings",
    icon: <MdSettings />,
  },
];
