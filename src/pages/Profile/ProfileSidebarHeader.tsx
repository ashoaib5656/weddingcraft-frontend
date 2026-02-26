import React from "react";
import {
    Box,
    Typography,
    Avatar,
    IconButton,
    Divider,
    alpha,
    useTheme
} from "@mui/material";
import {
    CameraAlt as CameraIcon,
    Email as EmailIcon,
    LocationOn as PinIcon,
    VerifiedUser as ShieldCheckIcon,
    CalendarMonth as CalendarIcon
} from "@mui/icons-material";
import { getInitials } from "../../utils/userUtils";
import DashboardCard from "../../components/Dashboard/DashboardCard/DashboardCard";

interface InfoItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    colorType?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, colorType = 'primary' }) => {
    const theme = useTheme();
    const mainColor = (theme.palette as unknown as Record<string, { main: string }>)[colorType]?.main || theme.palette.primary.main;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
                p: 1,
                borderRadius: 2,
                bgcolor: alpha(mainColor, 0.1),
                color: mainColor,
                display: 'flex'
            }}>
                {icon}
            </Box>
            <Box>
                <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: 600, lineHeight: 1 }}>{label}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>{value}</Typography>
            </Box>
        </Box>
    );
};

interface ProfileSidebarHeaderProps {
    userName: string | null;
    role: string | null;
}

const ProfileSidebarHeader: React.FC<ProfileSidebarHeaderProps> = ({ userName, role }) => {
    const theme = useTheme();

    return (
        <DashboardCard noPadding sx={{ height: '100%', overflow: 'hidden' }}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Profile Info Section */}
                <Box sx={{ px: 3, pb: 4, textAlign: 'center', mt: 2, position: 'relative', zIndex: 1, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Large Avatar */}
                    <Box sx={{ position: 'relative', display: 'inline-block', mb: 3, alignSelf: 'center' }}>
                        <Avatar
                            sx={{
                                width: 140,
                                height: 140,
                                fontSize: '3rem',
                                fontWeight: 800,
                                background: theme.palette.background.paper,
                                color: theme.palette.primary.main,
                                border: `8px solid ${theme.palette.background.paper}`,
                                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.3)',
                                borderRadius: 6
                            }}
                        >
                            {getInitials(userName || role || "")}
                        </Avatar>
                        <IconButton
                            size="small"
                            sx={{
                                position: 'absolute',
                                bottom: 8,
                                right: 8,
                                bgcolor: theme.palette.primary.main,
                                color: 'white',
                                boxShadow: theme.shadows[4],
                                border: `2px solid ${theme.palette.background.paper}`,
                                '&:hover': { bgcolor: theme.palette.primary.dark },
                                transition: '0.2s'
                            }}
                        >
                            <CameraIcon sx={{ fontSize: 15 }} />
                        </IconButton>
                    </Box>

                    <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', mb: 3 }}>
                        {userName}
                    </Typography>

                    <Divider sx={{ mb: 4, mx: -3 }} />


                    {/* Detailed Info List */}
                    <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <InfoItem icon={<EmailIcon fontSize="small" />} label="Email" value="admin@wedspot.com" />
                        <InfoItem icon={<PinIcon fontSize="small" />} label="Location" value="Mumbai, India" />
                        <InfoItem icon={<ShieldCheckIcon fontSize="small" />} label="Status" value="Verified Account" colorType="success" />
                        <InfoItem icon={<CalendarIcon fontSize="small" />} label="Joined" value="January 12, 2024" />
                    </Box>
                </Box>
            </Box>
        </DashboardCard>
    );
};

export default ProfileSidebarHeader;
