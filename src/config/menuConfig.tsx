import { type ReactNode } from "react";
import { icons } from "./iconMap";

export interface MenuItem {
    text: string;
    icon: ReactNode;
    path: string;
}

export const MENU_CONFIG: Record<string, MenuItem[]> = {
    admin: [
        { text: "Managers", icon: icons.Managers, path: "/admin/managers" },
        { text: "All Users", icon: icons.Users, path: "/admin/users" },
        { text: "All Requests", icon: icons.Requests, path: "/admin/requests" },
        { text: "All Bookings", icon: icons.Bookings, path: "/admin/bookings" },
        { text: "Platform Revenue", icon: icons.Revenue, path: "/admin/revenue" },
        { text: "Analytics", icon: icons.Analytics, path: "/admin/analytics" },
    ],

    manager: [
        { text: "Vendors", icon: icons.Vendors, path: "/manager/vendors" },
        { text: "Requests", icon: icons.Requests, path: "/manager/requests" },
        { text: "Bookings", icon: icons.Bookings, path: "/manager/bookings" },
        { text: "Staff", icon: icons.Staff, path: "/manager/staff" },
        { text: "Reports", icon: icons.Reports, path: "/manager/reports" }
    ],

    staff: [
        { text: "Assigned Bookings", icon: icons.Bookings, path: "/staff/bookings" },
        { text: "Tasks", icon: icons.Tasks, path: "/staff/tasks" },
        { text: "Reports", icon: icons.Reports, path: "/staff/reports" }
    ],

    vendor: [
        { text: "Incoming Requests", icon: icons.File, path: "/vendor/requests" },
        { text: "My Bookings", icon: icons.Bookings, path: "/vendor/bookings" },
        { text: "Earnings", icon: icons.Earning, path: "/vendor/earnings" }
    ],

    client: [
        { text: "Browse Vendors", icon: icons.Search, path: "/client/vendors" },
        { text: "My Requests", icon: icons.File, path: "/client/requests" },
        { text: "My Bookings", icon: icons.Bookings, path: "/client/bookings" },
        { text: "Saved Vendors", icon: icons.Favorite, path: "/client/saved" }
    ]
};
