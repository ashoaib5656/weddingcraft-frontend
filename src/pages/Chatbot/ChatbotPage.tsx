import { useEffect, type JSX } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { CHAT_SERVICE } from "../../api/services/chat";
import { authStore } from "../../utils/authSingleton";
import { useChatStore, type ChatMessage } from "../../store/chatStore";
import ChatContainer from "../../components/Chat/ChatContainer";

const ChatbotPage = (): JSX.Element => {
    const theme = useTheme();
    const { setMessages } = useChatStore();
    const currentUserEmail = authStore.getEmail();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await CHAT_SERVICE.GetHistory(1, 200);
                const mappedMessages: ChatMessage[] = (data.items || []).map((m: any) => ({
                    id: m.id || Math.random().toString(36).substr(2, 9),
                    userEmail: m.userEmail || 'Guest',
                    message: m.message,
                    createdAt: m.createdAt || new Date().toISOString(),
                    status: 'read',
                    isOwn: m.userEmail === currentUserEmail
                }));
                setMessages(mappedMessages);
            } catch (e) {
                console.error("failed to fetch history", e);
            }
        };
        fetchHistory();
    }, [currentUserEmail, setMessages]);

    return (
        <Box sx={{ p: 0, maxWidth: 1600, margin: "0 auto" }}>
            <Box sx={{ mb: 4 }}>
                <Typography 
                    variant="h4" 
                    sx={{ 
                        fontWeight: 900, 
                        letterSpacing: '-0.02em',
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block'
                    }}
                >
                    Chat & Support
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mt: 0.5 }}>
                    Real-time collaboration with your team and vendors.
                </Typography>
            </Box>

            <ChatContainer />
        </Box>
    );
};

export default ChatbotPage;
