import React from 'react';
import { Box, alpha, useTheme, useMediaQuery } from '@mui/material';
import ConversationList from './ConversationList';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import { useChat } from '../../hooks/useChat';

const ChatContainer: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { sendMessage, sendTyping } = useChat();

    return (
        <Box sx={{ 
            display: 'flex', 
            height: 'calc(100vh - 120px)', // Adjust based on layout
            maxHeight: 900,
            bgcolor: 'background.paper',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.08)}`,
            border: `1px solid ${alpha(theme.palette.divider, 0.05)}`
        }}>
            {/* Sidebar - HIDDEN on mobile for now, or use drawer */}
            {!isMobile && <ConversationList />}

            {/* Chat Window */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <ChatHeader />
                <MessageList />
                <ChatInput onSend={sendMessage} onTyping={sendTyping} />
            </Box>
        </Box>
    );
};

export default ChatContainer;
