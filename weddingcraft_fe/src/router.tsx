import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import RegisterPage from "./pages/SignUp/RegisterPage";
import ChatbotPage from "./pages/Chatbot/ChatbotPage";
import Home from "./pages/Home/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService/TermsOfService";
import NotFound from "./pages/NotFound/NotFound";
import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard";
import ManagerDashboard from "./pages/Dashboard/Manager/ManagerDashboard";
import StaffDashboard from "./pages/Dashboard/Staff/StaffDashboard";
import ClientDashboard from "./pages/Dashboard/Client/ClientDashboard";
import VendorDashboard from "./pages/Dashboard/Vendor/VendorDashboard";
import UserProfile from "./pages/Profile/UserProfile";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import { DashboardProvider } from "./contexts/DashboardContext";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./Routes/PublicRoute";
import { UserRole } from "./Types/auth.types";

export const router = createBrowserRouter([
    {
        children: [
            { path: "/", element: <MainLayout><Home /></MainLayout> },
            { path: "/privacy", element: <MainLayout><PrivacyPolicy /></MainLayout> },
            { path: "/terms", element: <MainLayout><TermsOfService /></MainLayout> },
            { path: "*", element: <NotFound /> },
        ],
    },
    {
        element: (
            <ProtectedRoute>
                <DashboardProvider>
                    <DashboardLayout />
                </DashboardProvider>
            </ProtectedRoute>
        ),
        children: [
            { path: "/chatbot", element: <ChatbotPage /> },
            {
                path: "/admin-dashboard",
                element: <ProtectedRoute allowedRoles={[UserRole.ADMIN]}><AdminDashboard /></ProtectedRoute>
            },
            {
                path: "/manager-dashboard",
                element: <ProtectedRoute allowedRoles={[UserRole.MANAGER]}><ManagerDashboard /></ProtectedRoute>
            },
            {
                path: "/staff-dashboard",
                element: <ProtectedRoute allowedRoles={[UserRole.STAFF]}><StaffDashboard /></ProtectedRoute>
            },
            {
                path: "/client-dashboard",
                element: <ProtectedRoute allowedRoles={[UserRole.CLIENT]}><ClientDashboard /></ProtectedRoute>
            },
            {
                path: "/vendor-dashboard",
                element: <ProtectedRoute allowedRoles={[UserRole.VENDOR]}><VendorDashboard /></ProtectedRoute>
            },
            { path: "/profile", element: <UserProfile /> },
        ],
    },
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
]);
