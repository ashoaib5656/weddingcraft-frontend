import React from "react";
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Switch,
    Button,
    alpha,
    useTheme
} from "@mui/material";

const NotificationsSection: React.FC = () => {
    const theme = useTheme();
    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: '-0.03em', mb: 0.5 }}>
                    Notification Settings
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Customize your preferred channels for receiving platform updates.
                </Typography>
            </Box>

            <List disablePadding>
                {[
                    { title: 'Email Notifications', sub: 'Weekly digests, platform reports, and marketing updates.', active: true },
                    { title: 'Push Notifications', sub: 'Real-time booking confirmations and customer messages.', active: true },
                    { title: 'System Alerts', sub: 'Critical account security notices and maintenance schedules.', active: true },
                    { title: 'Third-party Integrations', sub: 'Sync updates from connected external calendar services.', active: false },
                ].map((item, i) => (
                    <ListItem 
                        key={i} 
                        sx={{ 
                            py: 2, 
                            px: 0, 
                            borderBottom: i < 3 ? `1px solid ${alpha(theme.palette.divider, 0.05)}` : 'none' 
                        }}
                    >
                        <ListItemText
                            primary={item.title}
                            secondary={item.sub}
                            primaryTypographyProps={{ 
                                fontWeight: 700, 
                                variant: 'body2',
                                color: 'text.primary',
                                mb: 0.2
                            }}
                            secondaryTypographyProps={{ 
                                variant: 'caption',
                                color: 'text.secondary',
                                fontWeight: 500
                            }}
                        />
                        <Switch 
                            defaultChecked={item.active} 
                            size="small"
                            color="primary" 
                            sx={{ 
                                '& .MuiSwitch-switchBase.Mui-checked': { color: 'primary.main' },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: 'primary.main' }
                            }} 
                        />
                    </ListItem>
                ))}
            </List>
            
            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                    variant="outlined" 
                    size="medium" 
                    sx={{ 
                        borderRadius: '10px', 
                        px: 4, 
                        py: 1.2, 
                        fontWeight: 700,
                        textTransform: 'none',
                        color: 'text.secondary',
                        borderColor: alpha(theme.palette.divider, 0.2),
                        '&:hover': {
                            bgcolor: 'grey.50',
                            borderColor: theme.palette.divider
                        }
                    }}
                >
                    Reset Defaults
                </Button>
            </Box>
        </Box>
    );
};

export default NotificationsSection;
