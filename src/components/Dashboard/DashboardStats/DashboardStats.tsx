import React from 'react';
import { Box, Typography, LinearProgress, type SvgIconProps, alpha, useTheme } from '@mui/material';
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
    const theme = useTheme();

    return (
        <DashboardCard
            sx={{
                '&:hover': {
                    boxShadow: theme.shadows[4],
                }
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: alpha(color, 0.1),
                    color: color,
                }}>
                    <Icon />
                </Box>
                {change && (
                    <Box sx={{ textAlign: 'right' }}>
                        <Box sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.5,
                            px: 1,
                            py: 0.25,
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            bgcolor: trend === 'up' ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.error.main, 0.1),
                            color: trend === 'up' ? theme.palette.success.main : theme.palette.error.main,
                        }}>
                            <TrendingUp sx={{ fontSize: 14 }} />
                            {change}
                        </Box>
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary', fontWeight: 500 }}>
                            vs last month
                        </Typography>
                    </Box>
                )}
            </Box>

            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 0.5 }}>
                {label}
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: progress !== undefined ? 2 : 0 }}>
                {value}
            </Typography>

            {progress !== undefined && (
                <Box sx={{ mt: 'auto' }}>
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: alpha(color, 0.1),
                            '& .MuiLinearProgress-bar': {
                                bgcolor: color,
                                borderRadius: 3,
                            },
                        }}
                    />
                </Box>
            )}
        </DashboardCard>
    );
};

export default DashboardStats;
