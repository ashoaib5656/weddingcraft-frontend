import { 
    Box, 
    Tabs, 
    Tab, 
    alpha, 
    useTheme,
    Container
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
            mb: 4,
            position: 'sticky',
            top: 0,
            zIndex: 10,
            bgcolor: 'background.paper',
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
        }}>
            <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 } }}>
                <Tabs
                    value={activeSectorId}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    sx={{
                        minHeight: '48px',
                        '& .MuiTabs-indicator': {
                            height: 3,
                            borderRadius: '4px 4px 0 0',
                            backgroundColor: 'primary.main',
                        },
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            minHeight: '48px',
                            minWidth: 80,
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            marginRight: 1,
                            color: 'text.secondary',
                            transition: 'all 0.2s ease',
                            '&.Mui-selected': {
                                color: 'primary.main',
                            },
                            '&:hover': {
                                color: 'primary.main',
                                bgcolor: alpha(theme.palette.primary.main, 0.02),
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
                        />
                    ))}
                </Tabs>
            </Container>
        </Box>
    );
};

export default SectorNavigation;
