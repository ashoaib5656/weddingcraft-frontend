import React from "react";
import {
    Box,
    Typography,
    Avatar,
    IconButton,
    Divider,
    alpha,
    useTheme,
    Button
} from "@mui/material";
import {
    CameraAlt as CameraIcon,
    VerifiedUser as ShieldCheckIcon,
    Logout as LogoutIcon
} from "@mui/icons-material";
import { getInitials } from "../../utils/userUtils";
import { useAuth } from "../../contexts/Auth/useAuth";

interface ProfileSidebarHeaderProps {
    userName: string | null;
    role: string | null;
}

const ProfileSidebarHeader: React.FC<ProfileSidebarHeaderProps> = ({ userName, role }) => {
    const theme = useTheme();
    const { logout } = useAuth();

    const onLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <Box sx={{ p: { xs: 2, md: 0 } }}>
            <Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' } }}>
                    <Box sx={{ position: 'relative', mb: 2 }}>
                        <Avatar
                            sx={{
                                width: 90,
                                height: 90,
                                fontSize: '2.2rem',
                                fontWeight: 800,
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: 'primary.main',
                                borderRadius: '18px',
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                            }}
                        >
                            {getInitials(userName || role || "")}
                        </Avatar>
                        <IconButton
                            size="small"
                            sx={{
                                position: 'absolute',
                                bottom: -8,
                                right: -8,
                                bgcolor: 'background.paper',
                                color: 'text.primary',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                border: `1px solid ${theme.palette.divider}`,
                                '&:hover': { bgcolor: 'grey.50' }
                            }}
                        >
                            <CameraIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 900, color: 'text.primary', mb: 0.5, letterSpacing: '-0.02em' }}>
                        {userName}
                    </Typography>
                    
                    <Box sx={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: 1,
                        px: 1.2, 
                        py: 0.4, 
                        bgcolor: alpha(theme.palette.primary.main, 0.08), 
                        color: 'primary.main', 
                        borderRadius: '6px',
                        mb: 3
                    }}>
                        <ShieldCheckIcon sx={{ fontSize: 12 }} />
                        <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.65rem' }}>
                            {role}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', mb: 0.2 }}>Member Since</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>January 12, 2024</Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 3, borderColor: alpha(theme.palette.divider, 0.5) }} />

                <Button
                    fullWidth
                    variant="text"
                    startIcon={<LogoutIcon sx={{ fontSize: 18 }} />}
                    onClick={onLogout}
                    sx={{ 
                        justifyContent: 'flex-start',
                        color: 'text.secondary',
                        fontWeight: 600,
                        py: 1,
                        fontSize: '0.875rem',
                        textTransform: 'none',
                        '&:hover': { color: 'error.main', bgcolor: alpha(theme.palette.error.main, 0.05) }
                    }}
                >
                    Sign Out Account
                </Button>
            </Box>
        </Box>
    );
};

export default ProfileSidebarHeader;
