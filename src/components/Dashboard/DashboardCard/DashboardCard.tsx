import React from 'react';
import { Card, type CardProps, Box, useTheme } from '@mui/material';

interface DashboardCardProps extends CardProps {
    children: React.ReactNode;
    noPadding?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ children, sx, noPadding = false, ...props }) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                p: noPadding ? 0 : 3,
                position: 'relative',
                overflow: 'hidden',
                transition: theme.dashboard.transition,
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 'inherit',
                    padding: '1px',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), transparent, rgba(255, 255, 255, 0.1))',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    pointerEvents: 'none',
                },
                ...sx
            }}
            {...props}
        >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                {children}
            </Box>
        </Card >
    );
};

export default DashboardCard;
