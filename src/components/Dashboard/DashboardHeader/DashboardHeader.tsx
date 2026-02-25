import React from 'react';
import { Box, Typography, alpha, useTheme } from '@mui/material';

interface DashboardHeaderProps {
    title: string;
    subtitle: string;
    tag?: string;
    live?: boolean;
    actions?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle, tag, live, actions }) => {
    const theme = useTheme();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'flex-end' },
            gap: 3,
            mb: 5
        }}>
            <Box sx={{ flex: 1 }}>
                {tag && (
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'primary.main',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            mb: 1,
                            display: 'block'
                        }}
                    >
                        {tag}
                    </Typography>
                )}
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 900,
                        color: 'text.primary',
                        mb: 1,
                        letterSpacing: '-0.02em'
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.secondary',
                        fontWeight: 500,
                        maxWidth: 600
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {live && (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        px: 2,
                        py: 1,
                        borderRadius: '50px',
                        bgcolor: alpha(theme.palette.success.main, 0.1),
                        border: '1px solid',
                        borderColor: alpha(theme.palette.success.main, 0.2)
                    }}>
                        <Box sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: 'success.main',
                            boxShadow: `0 0 0 4px ${alpha(theme.palette.success.main, 0.2)}`,
                            '@keyframes pulse': {
                                '0%': { transform: 'scale(0.95)', opacity: 1 },
                                '50%': { transform: 'scale(1.2)', opacity: 0.5 },
                                '100%': { transform: 'scale(0.95)', opacity: 1 }
                            },
                            animation: 'pulse 2s infinite ease-in-out'
                        }} />
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'success.main',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                fontSize: '0.75rem',
                                letterSpacing: '0.05em'
                            }}
                        >
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
