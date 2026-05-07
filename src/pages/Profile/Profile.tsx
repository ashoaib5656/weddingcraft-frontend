import React from "react";
import {
    Box,
    Grid,
    Paper,
    alpha,
    useTheme
} from "@mui/material";
import { useAuth } from "../../contexts/Auth/useAuth";
import ProfileSidebarHeader from "./ProfileSidebarHeader";
import GeneralSection from "./sections/GeneralSection";

const Profile: React.FC = () => {
    const theme = useTheme();
    const { role, userName } = useAuth();

    return (
        <Box sx={{ 
            p: { xs: 1, md: 1.5 }, 
            maxWidth: 1300, 
            margin: '0 auto', 
            minHeight: 'calc(100vh - 120px)'
        }}>
            <Grid container spacing={2}>
                {/* Left Column: Sticky Profile Overview */}
                <Grid item xs={12} md={3} lg={2.5}>
                    <Box sx={{ position: { md: 'sticky' }, top: 70 }}>
                        <ProfileSidebarHeader userName={userName} role={role} />
                    </Box>
                </Grid>

                {/* Right Column: Unified Settings Area */}
                <Grid item xs={12} md={9} lg={9.5}>
                    <Paper 
                        elevation={0}
                        sx={{ 
                            borderRadius: '16px',
                            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                            bgcolor: 'background.paper',
                            boxShadow: '0 2px 12px -5px rgba(0,0,0,0.02)',
                            overflow: 'hidden',
                            display: 'flex', 
                            flexDirection: 'column'
                        }}
                    >
                        {/* Content Display Area */}
                        <Box sx={{ p: { xs: 2, md: 3 }, flexGrow: 1 }}>
                            <GeneralSection />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;
