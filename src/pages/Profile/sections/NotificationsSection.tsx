import React from "react";
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Switch,
    Divider,
    Button
} from "@mui/material";

const NotificationsSection: React.FC = () => {
    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Notification Preferences</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>Choose how you want to be notified by the platform.</Typography>

            <List disablePadding>
                {[
                    { title: 'Email Notifications', sub: 'Weekly digests and platform reports.', active: true },
                    { title: 'Push Notifications', sub: 'Real-time booking and request updates.', active: true },
                    { title: 'System Alerts', sub: 'Critical security and maintenance updates.', active: true },
                ].map((item, i) => (
                    <React.Fragment key={i}>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText
                                primary={item.title}
                                secondary={item.sub}
                                primaryTypographyProps={{ fontWeight: 800, variant: 'body1' }}
                                secondaryTypographyProps={{ variant: 'body2', sx: { mt: 0.5 } }}
                            />
                            <Switch defaultChecked={item.active} color="primary" sx={{ transform: 'scale(1.2)' }} />
                        </ListItem>
                        {i < 2 && <Divider />}
                    </React.Fragment>
                ))}
            </List>
            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="outlined" size="large" sx={{ borderRadius: 3, px: 4, py: 1.2, fontWeight: 800 }}>Reset Settings</Button>
            </Box>
        </Box>
    );
};

export default NotificationsSection;
