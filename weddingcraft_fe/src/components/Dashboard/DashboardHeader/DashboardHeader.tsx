import React from 'react';
import "./DashboardHeader.scss";
import { Box, Typography } from '@mui/material';

interface DashboardHeaderProps {
    title: string;
    subtitle: string;
    tag?: string;
    live?: boolean;
    actions?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle, tag, live, actions }) => {
    return (
        <Box className="dash-header-section">
            <Box className="dash-header-info">
                {tag && (
                    <Typography variant="caption" className="dash-header-tag">
                        {tag}
                    </Typography>
                )}
                <Typography variant="h3" className="dash-header-title">
                    {title}
                </Typography>
                <Typography variant="body1" className="dash-header-subtitle">
                    {subtitle}
                </Typography>
            </Box>

            <Box className="dash-header-actions">
                {live && (
                    <Box className="dash-live-badge">
                        <Box className="live-dot" />
                        <Typography variant="body2" className="live-text">
                            System Live
                        </Typography>
                    </Box>
                )}
                {actions && <Box sx={{ display: 'flex', gap: 2 }}>{actions}</Box>}
            </Box>
        </Box>
    );
};

export default DashboardHeader;
