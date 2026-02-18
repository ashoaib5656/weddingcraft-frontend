import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { UserRole } from "../../Types/auth.types";
import { getDashboardPath } from "../../constants/roles";
import { Box, CircularProgress } from "@mui/material";

interface ProtectedRouteProps {
    allowedRoles?: UserRole[];
    children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
    const { isAuthenticated, role } = useAuth();
    const [isChecking, setIsChecking] = React.useState(true);

    React.useEffect(() => {
        // Simulate auth check delay
        const timer = setTimeout(() => setIsChecking(false), 100);
        return () => clearTimeout(timer);
    }, []);

    if (isChecking) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    bgcolor: "#f8fafc",
                }}
            >
                <CircularProgress size={48} sx={{ color: "#7c3aed" }} />
            </Box>
        );
    }

    // Not authenticated - redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Check role-based access if roles are specified
    if (allowedRoles && allowedRoles.length > 0) {
        const userRole = role as UserRole;

        if (!allowedRoles.includes(userRole)) {
            // User doesn't have permission - redirect to their correct dashboard
            const correctDashboard = getDashboardPath(userRole);
            return <Navigate to={correctDashboard} replace />;
        }
    }

    return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
