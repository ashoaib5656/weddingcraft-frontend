import {
    LayoutDashboard,
    Users,
    ClipboardList,
    CalendarCheck,
    ReceiptIndianRupee,
    BarChart3,
    Store,
    FileText,
    Wallet,
    Search,
    Heart,
    UserCheck,
    MessageSquare,
    Home,
    LogOut,
    User
} from "lucide-react";
import { type ReactNode } from "react";

export const icons: Record<string, ReactNode> = {
    Dashboard: <LayoutDashboard size={20} />,
    Users: <Users size={20} />,
    Managers: <UserCheck size={20} />,
    Requests: <ClipboardList size={20} />,
    Bookings: <CalendarCheck size={20} />,
    Revenue: <ReceiptIndianRupee size={20} />,
    Analytics: <BarChart3 size={20} />,
    Vendors: <Store size={20} />,
    Staff: <Users size={20} />,
    Reports: <BarChart3 size={20} />,
    Tasks: <ClipboardList size={20} />,
    Earning: <Wallet size={20} />,
    Search: <Search size={20} />,
    Favorite: <Heart size={20} />,
    Chat: <MessageSquare size={20} />,
    Home: <Home size={20} />,
    Profile: <User size={20} />,
    Logout: <LogOut size={20} />,
    File: <FileText size={20} />
};
