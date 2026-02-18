import React from 'react';
import "./DashboardCard.scss";
import { Card, type CardProps, Box } from '@mui/material';

interface DashboardCardProps extends CardProps {
    children: React.ReactNode;
    noPadding?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ children, className, noPadding = false, ...props }) => {
    return (
        <Card
            className={`dash-card-container ${noPadding ? 'no-padding' : ''} ${className || ''}`}
            {...props}
        >
            <Box className="dash-card-content">
                {children}
            </Box>
        </Card>
    );
};

export default DashboardCard;
