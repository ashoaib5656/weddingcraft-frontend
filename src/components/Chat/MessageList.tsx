import React, { useRef, useEffect } from 'react';
import { Box, Typography, alpha, useTheme, Divider } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import { useChatStore } from '../../store/chatStore';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const MessageList: React.FC = () => {
    const theme = useTheme();
    const { messages, typingUsers } = useChatStore();
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, typingUsers.size]);

    const renderDateDivider = (currentDate: string, prevDate?: string) => {
        const current = dayjs(currentDate);
        const prev = prevDate ? dayjs(prevDate) : null;
        
        if (!prev || !current.isSame(prev, 'day')) {
            let label = current.format('MMMM D, YYYY');
            if (current.isSame(dayjs(), 'day')) label = 'Today';
            else if (current.isSame(dayjs().subtract(1, 'day'), 'day')) label = 'Yesterday';

            return (
                <Box sx={{ display: 'flex', alignItems: 'center', my: 3, px: 2 }}>
                    <Divider sx={{ flex: 1, borderColor: alpha(theme.palette.divider, 0.05) }} />
                    <Typography 
                        sx={{ 
                            mx: 2, 
                            fontSize: '11px', 
                            fontWeight: 700, 
                            color: 'text.disabled',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}
                    >
                        {label}
                    </Typography>
                    <Divider sx={{ flex: 1, borderColor: alpha(theme.palette.divider, 0.05) }} />
                </Box>
            );
        }
        return null;
    };

    return (
        <Box 
            sx={{ 
                flex: 1, 
                overflowY: 'auto', 
                p: 2, 
                display: 'flex', 
                flexDirection: 'column',
                gap: 0.5,
                background: `linear-gradient(to bottom, transparent, ${alpha(theme.palette.background.paper, 0.3)})`,
                '&::-webkit-scrollbar': { width: '6px' },
                '&::-webkit-scrollbar-thumb': { bgcolor: alpha(theme.palette.divider, 0.1), borderRadius: '10px' },
                '&::-webkit-scrollbar-track': { bgcolor: 'transparent' }
            }}
        >
            <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                    <React.Fragment key={m.id}>
                        {renderDateDivider(m.createdAt, messages[i-1]?.createdAt)}
                        <MessageBubble message={m} />
                    </React.Fragment>
                ))}
            </AnimatePresence>
            
            {typingUsers.size > 0 && (
                <Box sx={{ mt: 1 }}>
                    <TypingIndicator />
                </Box>
            )}
            
            <div ref={scrollRef} />
        </Box>
    );
};

export default MessageList;
