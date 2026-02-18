import React, { createContext, useState, useEffect, useContext } from 'react';

interface DashboardContextType {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
    openSidebar: () => void;
    isMobile: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);

            if(!mobile) {
                setSidebarOpen(false);
            }

    };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, []);

    const value: DashboardContextType = {
    sidebarOpen,
    isMobile,
    openSidebar: () => setSidebarOpen(true),
    closeSidebar: () => setSidebarOpen(false),
    toggleSidebar: () => setSidebarOpen(p => !p),
  };

    return (
        <DashboardContext.Provider value = {value}>
            {children}
        </DashboardContext.Provider>
    );

};

export const useDashboard = (): DashboardContextType => {
    const context = useContext(DashboardContext);
    if(!context) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }

    return context;
}