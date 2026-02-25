import React, { useState } from "react";
import {
  Notifications as BellIcon,
  AccessTime as ClockIcon,
  CalendarToday as CalendarIcon,
  VerifiedUser as SecurityIcon,
  Close as CloseIcon,
  Settings as SettingsIcon,
  ArrowForward as ArrowRightIcon,
  Delete as TrashIcon,
  CheckCircle as CheckCircleIcon
} from "@mui/icons-material";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Chip,
  Stack,
  Paper,
  useTheme,
  alpha
} from "@mui/material";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'system' | 'event' | 'security';
  unread: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "System Update",
    message: "New version 2.4.0 is now live with enhanced AI algorithms.",
    time: "2 mins ago",
    type: 'system',
    unread: true
  },
  {
    id: "2",
    title: "Event Confirmed",
    message: "The Grande Wedding for 'Arjun & Sneha' has been locked.",
    time: "45 mins ago",
    type: 'event',
    unread: true
  },
  {
    id: "3",
    title: "Security Alert",
    message: "New login detected from Mumbai, India.",
    time: "2 hours ago",
    type: 'security',
    unread: false
  }
];

interface NotificationCenterProps {
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose }) => {
  const theme = useTheme();
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifs(prev => prev.filter(n => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifs([]);
  };

  const markAllAsRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const filteredNotifs = activeFilter === 'all'
    ? notifs
    : notifs.filter(n => n.unread);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'system': return <SettingsIcon sx={{ fontSize: 16 }} />;
      case 'event': return <CalendarIcon sx={{ fontSize: 16 }} />;
      case 'security': return <SecurityIcon sx={{ fontSize: 16 }} />;
      default: return <BellIcon sx={{ fontSize: 16 }} />;
    }
  };

  const getStatusColor = (type: Notification['type']) => {
    switch (type) {
      case 'system': return theme.palette.primary.main;
      case 'event': return theme.palette.success.main;
      case 'security': return theme.palette.warning.main;
      default: return theme.palette.info.main;
    }
  };

  return (
    <Box
      onClick={onClose}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1200,
        bgcolor: 'rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Paper
        onClick={(e) => e.stopPropagation()}
        sx={{
          position: 'absolute',
          top: 80,
          right: 20,
          width: { xs: 'calc(100% - 40px)', sm: 420 },
          maxWidth: 420,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'calc(100vh - 120px)',
          animation: 'slideInDown 0.4s ease',
          '@keyframes slideInDown': {
            from: { opacity: 0, transform: 'translateY(-15px)' },
            to: { opacity: 1, transform: 'translateY(0)' }
          }
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ position: 'relative', color: 'secondary.main', display: 'flex' }}>
              <BellIcon />
              {notifs.some(n => n.unread) && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -2,
                    right: -2,
                    width: 8,
                    height: 8,
                    bgcolor: 'error.main',
                    borderRadius: '50%',
                    border: '2px solid white',
                  }}
                />
              )}
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2 }}>Intelligence Center</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                {notifs.filter(n => n.unread).length} Pending Protocol{notifs.filter(n => n.unread).length !== 1 ? 's' : ''}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ bgcolor: alpha(theme.palette.text.primary, 0.05) }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Tabs */}
        <Box sx={{ px: 2, py: 1, display: 'flex', gap: 1, borderBottom: '1px solid', borderColor: 'divider', alignItems: 'center' }}>
          <Button
            size="small"
            onClick={() => setActiveFilter('all')}
            sx={{
              fontWeight: 700,
              color: activeFilter === 'all' ? 'primary.main' : 'text.secondary',
              bgcolor: activeFilter === 'all' ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
              '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.15) }
            }}
          >
            All Logs
          </Button>
          <Button
            size="small"
            onClick={() => setActiveFilter('unread')}
            sx={{
              fontWeight: 700,
              color: activeFilter === 'unread' ? 'primary.main' : 'text.secondary',
              bgcolor: activeFilter === 'unread' ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
              '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.15) }
            }}
          >
            Unread
          </Button>
          <Button
            size="small"
            onClick={handleClearAll}
            disabled={notifs.length === 0}
            sx={{ ml: 'auto', color: 'error.main', fontWeight: 700 }}
          >
            Clear Hub
          </Button>
        </Box>

        {/* List */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: 1.5 }}>
          {filteredNotifs.length > 0 ? (
            <Stack spacing={1}>
              {filteredNotifs.map((notif) => (
                <Box
                  key={notif.id}
                  sx={{
                    display: 'flex',
                    gap: 1.5,
                    p: 1.5,
                    borderRadius: 3,
                    transition: 'all 0.2s',
                    bgcolor: notif.unread ? alpha(theme.palette.primary.main, 0.03) : 'transparent',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      '& .delete-btn': { opacity: 1 }
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      bgcolor: alpha(getStatusColor(notif.type), 0.1),
                      color: getStatusColor(notif.type)
                    }}
                  >
                    {getIcon(notif.type)}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: 'text.primary' }}>{notif.title}</Typography>
                      <IconButton
                        className="delete-btn"
                        size="small"
                        onClick={(e) => handleDelete(notif.id, e)}
                        sx={{ opacity: 0, transition: 'opacity 0.2s', p: 0.5 }}
                      >
                        <TrashIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                    <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary', mb: 1, lineHeight: 1.4 }}>
                      {notif.message}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.disabled', fontSize: '0.75rem' }}>
                        <ClockIcon sx={{ fontSize: 12 }} />
                        {notif.time}
                      </Box>
                      {notif.unread && (
                        <Chip
                          label="New"
                          size="small"
                          sx={{
                            height: 18,
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: 'primary.main',
                            borderRadius: 1
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>
          ) : (
            <Box sx={{ py: 6, textAlign: 'center', color: 'text.disabled' }}>
              <CheckCircleIcon sx={{ fontSize: 48, mb: 1.5, opacity: 0.5 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.secondary' }}>Intelligence Hub Clear</Typography>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>No active protocols found.</Typography>
            </Box>
          )}
        </Box>

        {/* Footer */}
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
          <Button
            size="small"
            onClick={markAllAsRead}
            disabled={!notifs.some(n => n.unread)}
            sx={{ fontWeight: 700, color: 'text.secondary' }}
          >
            Mark all read
          </Button>
          <Button
            size="small"
            endIcon={<ArrowRightIcon sx={{ fontSize: 14 }} />}
            sx={{ fontWeight: 700 }}
          >
            View Analytics
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default NotificationCenter;
