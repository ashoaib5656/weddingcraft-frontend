import React from 'react';
import { Box, Typography, Avatar, IconButton, Badge, alpha, useTheme, Tooltip } from '@mui/material';
import { Phone, Video, Info, Search } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';

const ChatHeader: React.FC = () => {
    const theme = useTheme();
    const { conversations, activeConversationId } = useChatStore();
    
    const activeConv = conversations.find(c => c.id === activeConversationId) || {
        name: 'Support Team',
        isOnline: true,
        avatar: ''
    };

    return (
        <Box sx={{ 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: alpha(theme.palette.divider, 0.05),
            zIndex: 1
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    color={activeConv.isOnline ? "success" : "default"}
                    sx={{ '& .MuiBadge-badge': { width: 12, height: 12, borderRadius: '50%', border: '2px solid white' } }}
                >
                    <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', fontWeight: 700, width: 40, height: 40 }}>
                        {activeConv.name[0]}
                    </Avatar>
                </Badge>
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2, color: 'text.primary' }}>
                        {activeConv.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: activeConv.isOnline ? 'success.main' : 'text.disabled', fontWeight: 700, fontSize: '11px' }}>
                        {activeConv.isOnline ? 'Online now' : 'Last seen Monday'}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Tooltip title="Audio Call">
                    <IconButton size="small"><Phone size={18} /></IconButton>
                </Tooltip>
                <Tooltip title="Video Call">
                    <IconButton size="small"><Video size={18} /></IconButton>
                </Tooltip>
                <Tooltip title="Search Messages">
                    <IconButton size="small"><Search size={18} /></IconButton>
                </Tooltip>
                <Tooltip title="Conversation Details">
                    <IconButton size="small"><Info size={18} /></IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default ChatHeader;
