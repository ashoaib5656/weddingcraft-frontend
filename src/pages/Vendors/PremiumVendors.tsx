import React, { useState, useMemo } from 'react';
import { 
    Box, 
    Typography, 
    Grid, 
    Container, 
    useTheme, 
    alpha,
    InputAdornment,
    TextField,
    Button,
    Skeleton,
    IconButton,
    Pagination
} from '@mui/material';
import { 
    Search as SearchIcon, 
    FilterList as FilterIcon,
    Verified as VerifiedIcon,
    Star as StarIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import VendorCard from '../../components/Vendors/VendorCard';
import SectorNavigation from '../../components/Vendors/SectorNavigation';
import type { Vendor, VendorSector } from '../../Types/vendor';
import { MOCK_VENDORS } from '../../constants/mockVendors';

// Local reference to avoid possible shadowing or reference issues
const ALL_VENDORS = MOCK_VENDORS;

// Mock Sectors (Wedding Focused)
const SECTORS: VendorSector[] = [
    { id: 'floral', name: 'Floral Decoration', icon: '🌸', description: 'Artisanal floral designs for every theme' },
    { id: 'coordination', name: 'Wedding Coordination', icon: '📋', description: 'Seamless planning and on-day execution' },
    { id: 'photography', name: 'Cinematic Photoshoot', icon: '📸', description: 'Visual storytelling at its finest' },
    { id: 'makeup', name: 'Luxury Makeup Artist', icon: '💄', description: 'Premium bridal and party beaty services' },
    { id: 'invitations', name: 'Elegant Invitations', icon: '✉️', description: 'Custom-designed stationery and invites' },
    { id: 'catering', name: 'Premium Catering', icon: '🍽️', description: 'Gourmet culinary experiences' },
];

const ITEMS_PER_PAGE = 6;

const PremiumVendors: React.FC = () => {
    const theme = useTheme();
    const [activeSector, setActiveSector] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    // Reset page on filter/search
    React.useEffect(() => {
        setPage(1);
    }, [activeSector, searchQuery]);

    // Filter Logic
    const filteredVendors = useMemo(() => {
        return ALL_VENDORS.filter((vendor: Vendor) => {
            const matchesSector = activeSector === 'all' || vendor.sectorId === activeSector;
            const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                vendor.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSector && matchesSearch;
        });
    }, [activeSector, searchQuery]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredVendors.length / ITEMS_PER_PAGE);
    const paginatedVendors = useMemo(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        return filteredVendors.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredVendors, page]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setIsLoading(true);
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setIsLoading(false), 400);
    };

    const handleSectorChange = (id: string) => {
        setIsLoading(true);
        setActiveSector(id);
        // Simulate loading delay for premium feel
        setTimeout(() => setIsLoading(false), 400);
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 10 }}>
            {/* Header Section */}
            <Box sx={{ 
                bgcolor: 'background.paper', 
                pt: 8, 
                pb: 6, 
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`
            }}>
                <Container maxWidth="xl">
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography 
                            variant="h1" 
                            sx={{ 
                                fontWeight: 800, 
                                fontSize: { xs: '2rem', md: '3.5rem' }, 
                                mb: 2, 
                                letterSpacing: '-0.04em',
                                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Service Marketplace
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 600, maxWidth: '700px', mx: 'auto', lineHeight: 1.6 }}>
                            Discover and collaborate with the world's most elite providers across multiple industry sectors.
                        </Typography>
                    </Box>

                    {/* Search & Stats Bar */}
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        gap: 3,
                        px: 3,
                        py: 2.5,
                        bgcolor: alpha(theme.palette.background.paper, 0.4),
                        backdropFilter: 'blur(10px)',
                        borderRadius: 5,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 4 }, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <VerifiedIcon sx={{ color: 'primary.main', fontSize: 18 }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: { xs: '0.75rem', md: '0.875rem' } }}>{ALL_VENDORS.length} Verified Partners</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <StarIcon sx={{ color: 'warning.main', fontSize: 18 }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: { xs: '0.75rem', md: '0.875rem' } }}>4.9/5 Average Rating</Typography>
                            </Box>
                        </Box>

                        <TextField
                            placeholder="Find your perfect wedding partner..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{
                                width: { xs: '100%', md: 420 },
                                '& .MuiOutlinedInput-root': {
                                    height: '56px',
                                    borderRadius: '20px',
                                    bgcolor: alpha(theme.palette.background.paper, 0.8),
                                    backdropFilter: 'blur(12px)',
                                    fontWeight: 700,
                                    fontSize: '0.95rem',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                    '& fieldset': { border: 'none' },
                                    '&:hover': {
                                        bgcolor: alpha(theme.palette.background.paper, 1),
                                        boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.08)}`,
                                        transform: 'translateY(-1px)'
                                    },
                                    '&.Mui-focused': {
                                        bgcolor: alpha(theme.palette.background.paper, 1),
                                        boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.12)}`,
                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                    }
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" sx={{ mr: 1.5 }}>
                                        <Box sx={{ 
                                            p: 0.8, 
                                            display: 'flex', 
                                            borderRadius: '12px', 
                                            bgcolor: alpha(theme.palette.primary.main, 0.08) 
                                        }}>
                                            <SearchIcon sx={{ color: 'primary.main', fontSize: 22 }} />
                                        </Box>
                                    </InputAdornment>
                                ),
                                endAdornment: searchQuery && (
                                    <InputAdornment position="end">
                                        <IconButton 
                                            size="small" 
                                            onClick={() => setSearchQuery('')}
                                            sx={{ 
                                                bgcolor: alpha(theme.palette.divider, 0.05),
                                                '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.1), color: 'error.main' }
                                            }}
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{ mt: 0 }}>
                {/* Sector Navigation */}
                <SectorNavigation 
                    sectors={SECTORS} 
                    activeSectorId={activeSector} 
                    onSectorChange={handleSectorChange} 
                />

                {/* Vendors Grid */}
                <Box>
                    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.02em' }}>
                            {activeSector === 'all' ? 'Featured Vendors' : `Top Providers in ${SECTORS.find(s => s.id === activeSector)?.name}`}
                        </Typography>
                        <Button startIcon={<FilterIcon />} sx={{ fontWeight: 700, textTransform: 'none', color: 'text.secondary' }}>Sort & Filter</Button>
                    </Box>

                    <Grid container spacing={4} component={motion.div} layout>
                        <AnimatePresence mode="popLayout">
                            {isLoading ? (
                                Array.from(new Array(6)).map((_, index) => (
                                    <Grid item xs={12} sm={6} lg={4} key={`skeleton-${index}`}>
                                        <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 4 }} />
                                        <Box sx={{ pt: 2 }}>
                                            <Skeleton width="60%" height={32} />
                                            <Skeleton width="40%" height={24} />
                                        </Box>
                                    </Grid>
                                ))
                            ) : paginatedVendors.length > 0 ? (
                                paginatedVendors.map((vendor: Vendor) => (
                                    <Grid 
                                        item 
                                        xs={12} 
                                        sm={6} 
                                        lg={4} 
                                        key={vendor.id}
                                        component={motion.div}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        layout
                                    >
                                        <VendorCard vendor={vendor} />
                                    </Grid>
                                ))
                            ) : (
                                <Box sx={{ width: '100%', py: 10, textAlign: 'center' }}>
                                    <Typography variant="h6" sx={{ color: 'text.disabled', fontWeight: 700 }}>
                                        No vendors found matching your current filters.
                                    </Typography>
                                </Box>
                            )}
                        </AnimatePresence>
                    </Grid>

                    {/* Pagination Section */}
                    {totalPages > 1 && (
                        <Box sx={{ 
                            mt: 8, 
                            display: 'flex', 
                            justifyContent: 'center',
                            '& .MuiPagination-ul': { gap: 1 },
                            '& .MuiPaginationItem-root': {
                                borderRadius: '12px',
                                fontWeight: 800,
                                fontSize: '0.9rem',
                                transition: 'all 0.3s ease',
                                '&.Mui-selected': {
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                    }
                                },
                                '&:hover': {
                                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                                    transform: 'translateY(-2px)'
                                }
                            }
                        }}>
                            <Pagination 
                                count={totalPages} 
                                page={page} 
                                onChange={handlePageChange}
                                size="large"
                                color="primary"
                                shape="rounded"
                            />
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default PremiumVendors;
