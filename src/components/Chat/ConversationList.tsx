import React from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Badge, alpha, useTheme, InputBase, IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { Search, MoreVertical, Filter, CheckCircle2, MessageSquare, UserCheck, ShieldAlert } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';

const ConversationList: React.FC = () => {
    const theme = useTheme();
    const { conversations, activeConversationId, setActiveConversation, setConversations } = useChatStore();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filterType, setFilterType] = React.useState<'all' | 'unread' | 'online'>('all');
    
    // Menu States
    const [filterAnchor, setFilterAnchor] = React.useState<null | HTMLElement>(null);
    const [moreAnchor, setMoreAnchor] = React.useState<null | HTMLElement>(null);

    const displayConversations = conversations.filter(conv => {
        const matchesSearch = conv.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' 
            || (filterType === 'unread' && conv.unreadCount > 0)
            || (filterType === 'online' && conv.isOnline);
        return matchesSearch && matchesFilter;
    });

    const handleSelectConversation = (id: string) => {
        setActiveConversation(id);
        // Clear unread count when opening
        setConversations(conversations.map(c => 
            c.id === id ? { ...c, unreadCount: 0 } : c
        ));
    };

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
                    <IconButton 
                        size="small" 
                        onClick={(e) => setFilterAnchor(e.currentTarget)}
                        sx={{ color: filterType !== 'all' ? 'primary.main' : 'inherit' }}
                    >
                        <Filter size={18} />
                    </IconButton>
                    <IconButton size="small" onClick={(e) => setMoreAnchor(e.currentTarget)}>
                        <MoreVertical size={18} />
                    </IconButton>
                </Box>

                {/* Filter Menu */}
                <Menu
                    anchorEl={filterAnchor}
                    open={Boolean(filterAnchor)}
                    onClose={() => setFilterAnchor(null)}
                    PaperProps={{ sx: { borderRadius: '12px', minWidth: 160, mt: 1, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' } }}
                >
                    <MenuItem onClick={() => { setFilterType('all'); setFilterAnchor(null); }} selected={filterType === 'all'}>
                        <ListItemIcon><MessageSquare size={16} /></ListItemIcon>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>All Messages</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => { setFilterType('unread'); setFilterAnchor(null); }} selected={filterType === 'unread'}>
                        <ListItemIcon><ShieldAlert size={16} /></ListItemIcon>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Unread</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => { setFilterType('online'); setFilterAnchor(null); }} selected={filterType === 'online'}>
                        <ListItemIcon><UserCheck size={16} /></ListItemIcon>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Online Now</Typography>
                    </MenuItem>
                </Menu>

                {/* More Settings Menu */}
                <Menu
                    anchorEl={moreAnchor}
                    open={Boolean(moreAnchor)}
                    onClose={() => setMoreAnchor(null)}
                    PaperProps={{ sx: { borderRadius: '12px', minWidth: 180, mt: 1, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' } }}
                >
                    <MenuItem onClick={() => {
                        setConversations(conversations.map(c => ({ ...c, unreadCount: 0 })));
                        setMoreAnchor(null);
                    }}>
                        <ListItemIcon><CheckCircle2 size={16} /></ListItemIcon>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Mark all as read</Typography>
                    </MenuItem>
                </Menu>
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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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
                        onClick={() => handleSelectConversation(conv.id)}
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
                        {/* Corrected Badge Placement */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.8, ml: 1, minWidth: 55 }}>
                            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '10px', fontWeight: 700 }}>
                                {conv.lastMessageTime}
                            </Typography>
                            <Box sx={{ height: 20 }}>
                                {conv.unreadCount > 0 && (
                                    <Badge 
                                        badgeContent={conv.unreadCount} 
                                        color="primary" 
                                        sx={{ 
                                            '& .MuiBadge-badge': { 
                                                height: 20, 
                                                minWidth: 20, 
                                                fontSize: '10px', 
                                                fontWeight: 800,
                                                position: 'static',
                                                transform: 'none'
                                            } 
                                        }}
                                    />
                                )}
                            </Box>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ConversationList;
