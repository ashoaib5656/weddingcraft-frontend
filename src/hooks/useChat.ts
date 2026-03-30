import { useEffect, useCallback } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useChatStore, type ChatMessage } from '../store/chatStore';
import { authStore } from '../utils/authSingleton';

const HUB_URL = (import.meta.env.VITE_API_BASE || "http://localhost:5000") + "/hubs/chat";

export const useChat = () => {
    const { 
        connection, 
        setConnection, 
        setConnectionStatus, 
        addMessage, 
        addTypingUser, 
        removeTypingUser,
        updatePresence 
    } = useChatStore();

    const currentUserEmail = authStore.getEmail(); 

    useEffect(() => {
        if (connection) return;

        const token = authStore.getAccessToken();
        const newConnection = new HubConnectionBuilder()
            .withUrl(HUB_URL, {
                accessTokenFactory: () => token ?? "",
                withCredentials: true,
            })
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        // Listeners
        newConnection.on("ReceiveMessage", (payload: any) => {
            const message: ChatMessage = {
                id: payload.id || Math.random().toString(36).substr(2, 9),
                userEmail: payload.userEmail || 'Guest',
                message: payload.message,
                createdAt: payload.createdAt || new Date().toISOString(),
                status: 'read',
                isOwn: payload.userEmail === currentUserEmail
            };
            addMessage(message);
        });

        newConnection.on("UserTyping", (userEmail: string) => {
            if (userEmail !== currentUserEmail) {
                addTypingUser(userEmail);
                setTimeout(() => removeTypingUser(userEmail), 3000);
            }
        });

        newConnection.on("UserPresence", (userEmail: string, isOnline: boolean) => {
            updatePresence(userEmail, isOnline);
        });

        const startConnection = async () => {
            try {
                setConnectionStatus('connecting');
                await newConnection.start();
                setConnection(newConnection);
                setConnectionStatus('connected');
                console.log("SignalR Connected.");
            } catch (err) {
                console.error("SignalR Connection Error: ", err);
                setConnectionStatus('disconnected');
                setTimeout(startConnection, 5000);
            }
        };

        startConnection();

        return () => {
            newConnection.stop();
            setConnection(null);
            setConnectionStatus('disconnected');
        };
    }, []);

    const sendMessage = useCallback(async (text: string) => {
        if (connection && text.trim()) {
            try {
                await connection.invoke("SendMessage", text);
            } catch (err) {
                console.error("SendMessage Error: ", err);
            }
        }
    }, [connection]);

    const sendTyping = useCallback(async () => {
        if (connection) {
            try {
                await connection.invoke("SendTyping");
            } catch (err) {
                // Ignore typing errors to avoid noise
            }
        }
    }, [connection]);

    return { sendMessage, sendTyping };
};
