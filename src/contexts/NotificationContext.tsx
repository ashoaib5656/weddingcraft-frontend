import React, { createContext, useContext, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useAuth } from './Auth/useAuth';
import { useSnackbar } from './SnackbarContext';
import { API_BASE } from '../api/axios';

interface Notification {
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    timestamp: string;
}

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotifications = () => {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
    return ctx;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { accessToken, isAuthenticated } = useAuth();
    const { info, success, error: showError, warning } = useSnackbar();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (!isAuthenticated || !accessToken) return;

        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${API_BASE}/hubs/notifications`, {
                accessTokenFactory: () => accessToken
            })
            .withAutomaticReconnect()
            .build();

        connection.on('ReceiveNotification', (notif: Notification) => {
            setNotifications(prev => [notif, ...prev]);
            setUnreadCount(prev => prev + 1);
            
            // Show toast
            switch (notif.type) {
                case 'success': success(notif.message); break;
                case 'error': showError(notif.message); break;
                case 'warning': warning(notif.message); break;
                default: info(notif.message); break;
            }
        });

        connection.start()
            .then(() => console.log('SignalR Notification Hub Connected'))
            .catch(err => console.error('SignalR Connection Error: ', err));

        return () => {
            connection.stop();
        };
    }, [isAuthenticated, accessToken]);

    const clearNotifications = () => {
        setNotifications([]);
        setUnreadCount(0);
    };

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, clearNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};
