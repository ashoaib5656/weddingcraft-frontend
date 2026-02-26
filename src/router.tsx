import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import RegisterPage from "./pages/SignUp/RegisterPage";
import ChatbotPage from "./pages/Chatbot/ChatbotPage";
import Home from "./pages/Home/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService/TermsOfService";
import NotFound from "./pages/NotFound/NotFound";
import Users from "./pages/Users/Users";
import Vendors from "./pages/Vendors/Vendors";
import Requests from "./pages/Requests/Requests";
import Bookings from "./pages/Bookings/Bookings";
import Analytics from "./pages/Analytics/Analytics";
import Earnings from "./pages/Earnings/Earnings";
import SavedVendors from "./pages/Vendors/SavedVendors";
import Managers from "./pages/Managers/Managers";
import Revenue from "./pages/Revenue/Revenue";
import Staff from "./pages/Staff/Staff";
import Reports from "./pages/Reports/Reports";
import Tasks from "./pages/Tasks/Tasks";
import Products from "./pages/Products/Products";
import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard";
import ManagerDashboard from "./pages/Dashboard/Manager/ManagerDashboard";
import StaffDashboard from "./pages/Dashboard/Staff/StaffDashboard";
import ClientDashboard from "./pages/Dashboard/Client/ClientDashboard";
import VendorDashboard from "./pages/Dashboard/Vendor/VendorDashboard";
import Profile from "./pages/Profile/Profile";
import CartPage from "./pages/Cart/CartPage";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import { DashboardProvider } from "./contexts/DashboardContext";
import ProtectedRoute from "./contexts/Auth/requiresRole";
import PublicRoute from "./contexts/Auth/PublicRoute";
import { UserRole } from "./Types/auth.types";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout><Home /></MainLayout>,
    },
    { path: "/privacy", element: <MainLayout><PrivacyPolicy /></MainLayout> },
    { path: "/terms", element: <MainLayout><TermsOfService /></MainLayout> },
    { path: "*", element: <NotFound /> },
    {
        element: (
            <PublicRoute>
                <AuthLayout />
            </PublicRoute>
        ),
        children: [
            { path: "/login", element: <Login /> },
            { path: "/forgot-password", element: <ForgotPassword /> },
            { path: "/register", element: <RegisterPage /> },
        ],
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <DashboardProvider>
                    <DashboardLayout />
                </DashboardProvider>
            </ProtectedRoute>
        ),
        children: [
            {
                path: "admin-dashboard",
                element: <ProtectedRoute allowedRoles={[UserRole.ADMIN]}><AdminDashboard /></ProtectedRoute>
            },
            {
                path: "admin",
                element: <ProtectedRoute allowedRoles={[UserRole.ADMIN]} />,
                children: [
                    { path: "managers", element: <Managers /> },
                    { path: "users", element: <Users /> },
                    { path: "requests", element: <Requests /> },
                    { path: "bookings", element: <Bookings /> },
                    { path: "revenue", element: <Revenue /> },
                    { path: "analytics", element: <Analytics /> },
                ]
            },
            {
                path: "manager-dashboard",
                element: <ProtectedRoute allowedRoles={[UserRole.MANAGER]}><ManagerDashboard /></ProtectedRoute>
            },
            {
                path: "manager",
                element: <ProtectedRoute allowedRoles={[UserRole.MANAGER]} />,
                children: [
                    { path: "vendors", element: <Vendors /> },
                    { path: "requests", element: <Requests /> },
                    { path: "bookings", element: <Bookings /> },
                    { path: "staff", element: <Staff /> },
                    { path: "reports", element: <Reports /> },
                ]
            },
            {
                path: "staff-dashboard",
                element: <ProtectedRoute allowedRoles={[UserRole.STAFF]}><StaffDashboard /></ProtectedRoute>
            },
            {
                path: "staff",
                element: <ProtectedRoute allowedRoles={[UserRole.STAFF]} />,
                children: [
                    { path: "bookings", element: <Bookings /> },
                    { path: "tasks", element: <Tasks /> },
                    { path: "reports", element: <Reports /> },
                ]
            },
            {
                path: "vendor-dashboard",
                element: <ProtectedRoute allowedRoles={[UserRole.VENDOR]}><VendorDashboard /></ProtectedRoute>
            },
            {
                path: "vendor",
                element: <ProtectedRoute allowedRoles={[UserRole.VENDOR]} />,
                children: [
                    { path: "requests", element: <Requests /> },
                    { path: "bookings", element: <Bookings /> },
                    { path: "earnings", element: <Earnings /> },
                ]
            },
            {
                path: "client-dashboard",
                element: <ProtectedRoute allowedRoles={[UserRole.CLIENT]}><ClientDashboard /></ProtectedRoute>
            },
            {
                path: "client",
                element: <ProtectedRoute allowedRoles={[UserRole.CLIENT]} />,
                children: [
                    { path: "vendors", element: <Products /> },
                    { path: "requests", element: <Requests /> },
                    { path: "bookings", element: <Bookings /> },
                    { path: "saved", element: <SavedVendors /> },
                    { path: "profile", element: <Profile /> },
                ]
            },
            {
                path: "products",
                element: <Products />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "chatbot",
                element: <ChatbotPage />,
            },
            {
                path: "cart",
                element: <CartPage />,
            },
        ],
    },
]);
