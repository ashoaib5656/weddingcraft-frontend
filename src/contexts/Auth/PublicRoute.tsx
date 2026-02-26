import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, role } = useAuth();

    if (isAuthenticated) {
        const dashboardPath = role ? `/${role.toLowerCase()}-dashboard` : '/';
        return <Navigate to={dashboardPath} replace />;
    }

    return <>{children}</>;
};

export default PublicRoute;
