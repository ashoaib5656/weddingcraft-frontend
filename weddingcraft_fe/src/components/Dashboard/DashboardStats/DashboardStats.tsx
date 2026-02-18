import React from 'react';
import "./DashboardStats.scss";
import { Box, Typography, LinearProgress, type SvgIconProps } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';
import DashboardCard from '../DashboardCard/DashboardCard';

interface DashboardStatsProps {
    label: string;
    value: string | number;
    change?: string;
    icon: React.ElementType<SvgIconProps>;
    color: string;
    progress?: number;
    trend?: 'up' | 'down';
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
    label,
    value,
    change,
    icon: Icon,
    color,
    progress,
    trend = 'up',
}) => {
    return (
        <DashboardCard
            className="dash-stats-card"
            style={{
                '--stat-color': color,
                '--stat-color-soft': `${color}15`
            } as React.CSSProperties}
        >
            <Box className="dash-stats-header">
                <Box className="dash-stats-icon-box">
                    <Icon />
                </Box>
                {change && (
                    <Box className="dash-stats-trend-box">
                        <Box className={`trend-tag ${trend}`}>
                            <TrendingUp sx={{ fontSize: 14 }} />
                            {change}
                        </Box>
                        <Typography variant="caption" className="trend-label">
                            vs last month
                        </Typography>
                    </Box>
                )}
            </Box>

            <Typography variant="body2" className="dash-stats-label">
                {label}
            </Typography>

            <Typography variant="h4" className="dash-stats-value">
                {value}
            </Typography>

            {progress !== undefined && (
                <Box className="dash-stats-progress-container">
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        className="analysis-progress"
                        sx={{
                            backgroundColor: `${color}10`,
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: color,
                            },
                        }}
                    />
                </Box>
            )}
        </DashboardCard>
    );
};

export default DashboardStats;
