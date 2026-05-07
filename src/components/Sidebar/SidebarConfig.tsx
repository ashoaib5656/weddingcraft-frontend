import {
    Wallet,
    ClipboardList,
    Users,
    BarChart3,
    Store,
    Search,
    FileText,
    CalendarCheck,
    Heart,
    ReceiptIndianRupee,
} from "lucide-react";
import type { ReactNode } from "react";

export interface MenuItem {
    text: string;
    icon: ReactNode;
    path: string;
}

export const MENU_CONFIG: Record<string, MenuItem[]> = {
  admin: [
    { text: "All Users", icon: <Users size={20} />, path: "/admin/users" },

    { text: "All Bookings", icon: <CalendarCheck size={20} />, path: "/admin/bookings" },
    { text: "Platform Revenue", icon: <ReceiptIndianRupee size={20} />, path: "/admin/revenue" },
    { text: "Analytics", icon: <BarChart3 size={20} />, path: "/admin/analytics" },
  ],

  manager: [
    { text: "Vendors", icon: <Store size={20} />, path: "/manager/vendors" },

    { text: "Bookings", icon: <CalendarCheck size={20} />, path: "/manager/bookings" },
    { text: "Staff", icon: <Users size={20} />, path: "/manager/staff" },
    { text: "Reports", icon: <BarChart3 size={20} />, path: "/manager/reports" }
  ],

  staff: [
    { text: "Assigned Bookings", icon: <CalendarCheck size={20} />, path: "/staff/bookings" },
    { text: "Tasks", icon: <ClipboardList size={20} />, path: "/staff/tasks" },
    { text: "Reports", icon: <FileText size={20} />, path: "/staff/reports" }
  ],

  vendor: [
    { text: "My Services", icon: <ClipboardList size={20} />, path: "/vendor/services" },
    { text: "My Bookings", icon: <CalendarCheck size={20} />, path: "/vendor/bookings" },
    { text: "Earnings", icon: <Wallet size={20} />, path: "/vendor/earnings" }
  ],

  client: [
    { text: "Browse Vendors", icon: <Search size={20} />, path: "/client/vendors" },

    { text: "My Bookings", icon: <CalendarCheck size={20} />, path: "/client/bookings" },
    { text: "Saved Vendors", icon: <Heart size={20} />, path: "/client/saved" }
  ]

};
