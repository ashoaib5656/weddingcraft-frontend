import React from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
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
    const navItems = [
        { label: 'General Info', icon: <PersonIcon /> },
        { label: 'Security', icon: <LockIcon /> },
        { label: 'Notifications', icon: <BellIcon /> },
    ];

    return (
        <Tabs
            value={activeTab}
            onChange={onTabChange}
            sx={{
                '& .MuiTabs-indicator': {
                    height: 3,
                    borderRadius: '3px 3px 0 0',
                    bgcolor: 'primary.main'
                },
                '& .MuiTab-root': {
                    minHeight: 55,
                    textTransform: 'none',
                    transition: '0.2s',
                    color: 'text.secondary',
                    fontSize: '0.95rem',
                    px: 4,
                    '&.Mui-selected': {
                        color: 'primary.main',
                        fontWeight: 800
                    }
                }
            }}
        >
            {navItems.map((item, i) => (
                <Tab
                    disableRipple
                    key={i}
                    label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            {item.icon}
                            <Typography variant="body2" sx={{ fontWeight: 'inherit' }}>
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
