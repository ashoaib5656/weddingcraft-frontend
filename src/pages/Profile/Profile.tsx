import React, { useState } from "react";
import {
    Box,
    Grid,
    Fade
} from "@mui/material";
import { useAuth } from "../../contexts/Auth/useAuth";
import DashboardCard from "../../components/Dashboard/DashboardCard/DashboardCard";

// Import reorganized components from final locations
import ProfileSidebarHeader from "./ProfileSidebarHeader";
import ProfileTopNav from "./ProfileTopNav";
import GeneralSection from "./sections/GeneralSection";
import SecuritySection from "./sections/SecuritySection";
import NotificationsSection from "./sections/NotificationsSection";

const Profile: React.FC = () => {
    const { role, userName } = useAuth();
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ p: { xs: 2, md: 2 }, maxWidth: 1400, margin: '0 auto', animation: 'fadeIn 0.6s ease-out' }}>
            <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
                {/* Left Column: Full-Height Profile Overview */}
                <Grid item xs={12} md={4} lg={3.5}>
                    <ProfileSidebarHeader userName={userName} role={role} />
                </Grid>

                {/* Right Column: Content Area with Unified Navigation */}
                <Grid item xs={12} md={8} lg={8.5}>
                    <DashboardCard noPadding sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 550 }}>
                        {/* Integrated Top Navigation */}
                        <Box sx={{ px: 1, pt: 1, borderBottom: 1, borderColor: 'divider' }}>
                            <ProfileTopNav activeTab={activeTab} onTabChange={handleTabChange} />
                        </Box>

                        {/* Content Display Area */}
                        <Box sx={{ p: 4, flexGrow: 1 }}>
                            <Fade in={activeTab === 0} timeout={1000}>
                                <Box hidden={activeTab !== 0}>
                                    <GeneralSection userName={userName} />
                                </Box>
                            </Fade>
                            <Fade in={activeTab === 1} timeout={1000}>
                                <Box hidden={activeTab !== 1}>
                                    <SecuritySection />
                                </Box>
                            </Fade>
                            <Fade in={activeTab === 2} timeout={1000}>
                                <Box hidden={activeTab !== 2}>
                                    <NotificationsSection />
                                </Box>
                            </Fade>
                        </Box>
                    </DashboardCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;
