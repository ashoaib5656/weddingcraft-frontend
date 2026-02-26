import React from 'react';
import { Box, Typography, alpha, styled, keyframes } from '@mui/material';

interface DashboardHeaderProps {
    title: string;
    subtitle: string;
    tag?: string;
    live?: boolean;
    actions?: React.ReactNode;
}

const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.5; }
  100% { transform: scale(0.95); opacity: 1; }
`;

const HeaderContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spacing(3),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
}));

const LiveBadge = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    borderRadius: '50px',
    backgroundColor: alpha(theme.palette.success.main, 0.1),
    border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
}));

const PulseDot = styled(Box)(({ theme }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.success.main,
    boxShadow: `0 0 0 4px ${alpha(theme.palette.success.main, 0.2)}`,
    animation: `${pulse} 2s infinite ease-in-out`,
}));

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle, tag, live, actions }) => {
    return (
        <HeaderContainer>
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
                    <LiveBadge>
                        <PulseDot />
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
                    </LiveBadge>
                )}
                {actions && <Box sx={{ display: 'flex', gap: 2 }}>{actions}</Box>}
            </Box>
        </HeaderContainer>
    );
};

export default DashboardHeader;
