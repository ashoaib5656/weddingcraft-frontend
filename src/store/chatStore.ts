import { create } from 'zustand';
import { HubConnection } from '@microsoft/signalr';

export interface ChatMessage {
    id: string;
    userEmail: string;
    message: string;
    createdAt: string;
    status: 'sent' | 'delivered' | 'read';
    isOwn: boolean;
}

export interface Conversation {
    id: string;
    name: string;
    lastMessage?: string;
    lastMessageTime?: string;
    unreadCount: number;
    avatar?: string;
    isOnline: boolean;
}

interface ChatState {
    messages: ChatMessage[];
    conversations: Conversation[];
    activeConversationId: string | null;
    connection: HubConnection | null;
    connectionStatus: 'connected' | 'disconnected' | 'connecting';
    typingUsers: Set<string>;
    
    // Actions
    setConnection: (connection: HubConnection | null) => void;
    setConnectionStatus: (status: 'connected' | 'disconnected' | 'connecting') => void;
    addMessage: (message: ChatMessage) => void;
    setMessages: (messages: ChatMessage[]) => void;
    setConversations: (conversations: Conversation[]) => void;
    setActiveConversation: (id: string | null) => void;
    addTypingUser: (userEmail: string) => void;
    removeTypingUser: (userEmail: string) => void;
    updatePresence: (userEmail: string, isOnline: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
    messages: [],
    conversations: [],
    activeConversationId: null,
    connection: null,
    connectionStatus: 'disconnected',
    typingUsers: new Set(),

    setConnection: (connection) => set({ connection }),
    setConnectionStatus: (status) => set({ connectionStatus: status }),
    
    addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, message] 
    })),
    
    setMessages: (messages) => set({ messages }),
    
    setConversations: (conversations) => set({ conversations }),
    
    setActiveConversation: (id) => set({ activeConversationId: id }),
    
    addTypingUser: (userEmail) => set((state) => {
        const newSet = new Set(state.typingUsers);
        newSet.add(userEmail);
        return { typingUsers: newSet };
    }),
    
    removeTypingUser: (userEmail) => set((state) => {
        const newSet = new Set(state.typingUsers);
        newSet.delete(userEmail);
        return { typingUsers: newSet };
    }),

    updatePresence: (userEmail, isOnline) => set((state) => ({
        conversations: state.conversations.map(c => 
            c.name === userEmail ? { ...c, isOnline } : c
        )
    }))
}));
