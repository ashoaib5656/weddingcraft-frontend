import React from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Badge, alpha, useTheme, InputBase, IconButton } from '@mui/material';
import { Search, MoreVertical, Filter } from 'lucide-react';
import { useChatStore, type Conversation } from '../../store/chatStore';

const ConversationList: React.FC = () => {
    const theme = useTheme();
    const { conversations, activeConversationId, setActiveConversation } = useChatStore();

    // Mock initial conversations if none exist for demo purposes
    const displayConversations: Conversation[] = conversations.length > 0 ? conversations : [
        { id: '1', name: 'Support Team', lastMessage: 'How can we help you today?', lastMessageTime: '10:30 AM', unreadCount: 2, isOnline: true },
        { id: '2', name: 'Vendor: Royal Banquet', lastMessage: 'The venue is available for...', lastMessageTime: 'Yesterday', unreadCount: 0, isOnline: false },
        { id: '3', name: 'Priya Sharma (Client)', lastMessage: 'Thank you for the update!', lastMessageTime: 'Monday', unreadCount: 0, isOnline: true },
    ];

    return (
        <Box sx={{ 
            width: { xs: '100%', md: 360 }, 
            height: '100%', 
            borderRight: '1px solid', 
            borderColor: alpha(theme.palette.divider, 0.05),
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.paper'
        }}>
            {/* Header */}
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary' }}>Messages</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small"><Filter size={18} /></IconButton>
                    <IconButton size="small"><MoreVertical size={18} /></IconButton>
                </Box>
            </Box>

            {/* Search */}
            <Box sx={{ px: 2, mb: 2 }}>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    bgcolor: alpha(theme.palette.divider, 0.03), 
                    borderRadius: '12px', 
                    px: 1.5,
                    py: 0.5,
                    boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.divider, 0.05)}`
                }}>
                    <Search size={18} color={theme.palette.text.disabled} />
                    <InputBase 
                        placeholder="Search conversations..." 
                        sx={{ ml: 1, flex: 1, fontSize: '14px', fontWeight: 500 }}
                    />
                </Box>
            </Box>

            {/* List */}
            <List sx={{ flex: 1, overflowY: 'auto', py: 0 }}>
                {displayConversations.map((conv) => (
                    <ListItem 
                        key={conv.id}
                        button
                        onClick={() => setActiveConversation(conv.id)}
                        sx={{
                            px: 2,
                            py: 1.5,
                            bgcolor: activeConversationId === conv.id ? alpha(theme.palette.primary.main, 0.05) : 'transparent',
                            borderLeft: '4px solid',
                            borderColor: activeConversationId === conv.id ? theme.palette.primary.main : 'transparent',
                            transition: 'all 0.2s ease',
                            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.03) }
                        }}
                    >
                        <ListItemAvatar>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                                color={conv.isOnline ? "success" : "default"}
                                sx={{ '& .MuiBadge-badge': { width: 10, height: 10, borderRadius: '50%', border: '2px solid white' } }}
                            >
                                <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', fontWeight: 700 }}>
                                    {conv.name[0]}
                                </Avatar>
                            </Badge>
                        </ListItemAvatar>
                        <ListItemText
                            primary={conv.name}
                            secondary={conv.lastMessage}
                            primaryTypographyProps={{ 
                                sx: { fontWeight: conv.unreadCount > 0 ? 800 : 600, fontSize: '14px', color: 'text.primary' } 
                            }}
                            secondaryTypographyProps={{ 
                                sx: { 
                                    fontSize: '12px', 
                                    color: conv.unreadCount > 0 ? 'text.primary' : 'text.secondary',
                                    fontWeight: conv.unreadCount > 0 ? 600 : 400,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                } 
                            }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5, ml: 1 }}>
                            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '10px', fontWeight: 700 }}>
                                {conv.lastMessageTime}
                            </Typography>
                            {conv.unreadCount > 0 && (
                                <Badge 
                                    badgeContent={conv.unreadCount} 
                                    color="primary" 
                                    sx={{ '& .MuiBadge-badge': { height: 18, minWidth: 18, fontSize: '10px', fontWeight: 800 } }}
                                />
                            )}
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ConversationList;
