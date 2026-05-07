import React from "react";
import { Box, Typography, Tabs, Tab, useTheme, alpha } from "@mui/material";
import {
    Person as PersonIcon,
    Lock as LockIcon,
    Notifications as BellIcon
} from "@mui/icons-material";

interface ProfileTopNavProps {
    activeTab: number;
    onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const ProfileTopNav: React.FC<ProfileTopNavProps> = ({ activeTab, onTabChange }) => {
    const theme = useTheme();
    const navItems = [
        { label: 'General Information', icon: <PersonIcon size={18} /> },
        { label: 'Security & Privacy', icon: <LockIcon size={18} /> },
        { label: 'Notifications', icon: <BellIcon size={18} /> },
    ];

    return (
        <Tabs
            value={activeTab}
            onChange={onTabChange}
            sx={{
                minHeight: 48,
                '& .MuiTabs-indicator': {
                    height: 2,
                    borderRadius: 2,
                    bgcolor: 'primary.main'
                },
                '& .MuiTab-root': {
                    minHeight: 48,
                    textTransform: 'none',
                    transition: '0.2s',
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    px: 3,
                    mr: 2,
                    '&:hover': {
                        color: 'text.primary',
                        bgcolor: alpha(theme.palette.text.primary, 0.03)
                    },
                    '&.Mui-selected': {
                        color: 'primary.main',
                        fontWeight: 700
                    }
                }
            }}
        >
            {navItems.map((item, i) => (
                <Tab
                    disableRipple
                    key={i}
                    label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {/* Replaced Icon logic for simplicity */}
                            <Typography variant="body2" sx={{ fontWeight: 'inherit', fontSize: 'inherit' }}>
                                {item.label}
                            </Typography>
                        </Box>
                    }
                />
            ))}
        </Tabs>
    );
};

export default ProfileTopNav;
