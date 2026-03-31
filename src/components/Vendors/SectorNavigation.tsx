import React from 'react';
import { 
    Box, 
    Tabs, 
    Tab, 
    alpha, 
    useTheme
} from '@mui/material';
import type { VendorSector } from '../../Types/vendor';

interface SectorNavigationProps {
    sectors: VendorSector[];
    activeSectorId: string;
    onSectorChange: (id: string) => void;
}

const SectorNavigation: React.FC<SectorNavigationProps> = ({ sectors, activeSectorId, onSectorChange }) => {
    const theme = useTheme();

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        onSectorChange(newValue);
    };

    return (
        <Box sx={{ 
            width: '100%', 
            mb: 6,
            position: 'sticky',
            top: 0,
            zIndex: 10,
            bgcolor: alpha(theme.palette.background.default, 0.8),
            backdropFilter: 'blur(10px)',
            py: 2,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}`
        }}>
            <Tabs
                value={activeSectorId}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{
                    '& .MuiTabs-indicator': {
                        height: 4,
                        borderRadius: '4px 4px 0 0',
                        backgroundColor: 'primary.main',
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    },
                    '& .MuiTab-root': {
                        textTransform: 'none',
                        minWidth: 100,
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        marginRight: 2,
                        color: 'text.secondary',
                        transition: 'all 0.3s ease',
                        '&.Mui-selected': {
                            color: 'primary.main',
                        },
                        '&:hover': {
                            color: 'primary.main',
                            bgcolor: alpha(theme.palette.primary.main, 0.03),
                            borderRadius: 2
                        }
                    },
                }}
            >
                <Tab label="All Sectors" value="all" />
                {sectors.map((sector) => (
                    <Tab 
                        key={sector.id} 
                        label={sector.name} 
                        value={sector.id} 
                        iconPosition="start"
                    />
                ))}
            </Tabs>
        </Box>
    );
};

export default SectorNavigation;
