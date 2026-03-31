import React from 'react';
import { 
    Box, 
    Typography, 
    Grid, 
    Container, 
    useTheme, 
    alpha,
    Button,
    IconButton
} from '@mui/material';
import { 
    Delete as DeleteIcon, 
    Store as StoreIcon,
    Favorite as FavoriteIcon,
    ArrowBack as BackIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import VendorCard from '../../components/Vendors/VendorCard';
import type { Vendor } from '../../Types/vendor';
import { useNavigate } from 'react-router-dom';

// Mock Saved Vendors (Curated from the Marketplace)
const SAVED_VENDORS: Vendor[] = [
    {
        id: 'v1',
        name: 'Floral Dreams',
        description: 'Elegant floral arrangements and luxury décor to set the perfect mood for your celebration.',
        services: ['Exotic Flowers', 'Stage Backdrop', 'Car Decoration'],
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=100&w=1920',
        rating: 4.9,
        reviewCount: 450,
        priceRange: '₹50,000+',
        location: 'Mumbai, India',
        sectorId: 'floral'
    },
    {
        id: 'v3',
        name: 'Cinematic Visuals',
        description: 'Professional wedding films and photography that capture every raw emotion of your special day.',
        services: ['4K Video', 'Candid Photography', 'Drone Coverage'],
        image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=100&w=1920',
        rating: 5.0,
        reviewCount: 310,
        priceRange: '₹3,00,000+',
        location: 'Mumbai, India',
        sectorId: 'photography'
    },
    {
        id: 'v6',
        name: 'Gourmet Feast',
        description: 'A luxurious culinary experience with diverse international and local menu options.',
        services: ['Multi-cuisine', 'Signature Cocktails', 'Dessert Bars'],
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=100&w=1920',
        rating: 4.8,
        reviewCount: 420,
        priceRange: '₹1,500/Plate',
        location: 'Mumbai, India',
        sectorId: 'catering'
    }
];

const SavedVendorsPage: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 10 }}>
            {/* Premium Header Section */}
            <Box sx={{ 
                bgcolor: 'background.paper', 
                pt: 6, 
                pb: 5, 
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`
            }}>
                <Container maxWidth="xl">
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Button 
                            startIcon={<BackIcon />} 
                            onClick={() => navigate(-1)}
                            sx={{ fontWeight: 800, textTransform: 'none', color: 'text.secondary' }}
                        >
                            Return to Marketplace
                        </Button>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 3 }}>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                                <FavoriteIcon sx={{ color: 'error.main' }} />
                                <Typography variant="overline" sx={{ fontWeight: 700, color: 'text.disabled', letterSpacing: '0.2em' }}>
                                    Curated Selection
                                </Typography>
                            </Box>
                            <Typography 
                                variant="h2" 
                                sx={{ 
                                    fontWeight: 800, 
                                    fontSize: { xs: '2.2rem', md: '3.2rem' }, 
                                    letterSpacing: '-0.04em',
                                    color: 'text.primary'
                                }}
                            >
                                Your Saved Vendors
                            </Typography>
                        </Box>
                        
                        <Box sx={{ 
                            px: 3, 
                            py: 1.5, 
                            bgcolor: alpha(theme.palette.primary.main, 0.05), 
                            borderRadius: '16px',
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                            textAlign: 'right'
                        }}>
                            <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
                                {SAVED_VENDORS.length}
                            </Typography>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase' }}>
                                Partners Saved
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{ mt: 6 }}>
                {SAVED_VENDORS.length > 0 ? (
                    <Box>
                        <Grid container spacing={4}>
                            <AnimatePresence>
                                {SAVED_VENDORS.map((vendor) => (
                                    <Grid 
                                        item 
                                        xs={12} 
                                        sm={6} 
                                        lg={4} 
                                        key={vendor.id}
                                        component={motion.div}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        layout
                                    >
                                        <VendorCard 
                                            vendor={vendor} 
                                            actions={
                                                <IconButton 
                                                    size="small"
                                                    sx={{ 
                                                        color: 'text.disabled',
                                                        bgcolor: alpha(theme.palette.divider, 0.05),
                                                        borderRadius: '12px',
                                                        p: 1,
                                                        '&:hover': { 
                                                            color: 'error.main',
                                                            bgcolor: alpha(theme.palette.error.main, 0.08),
                                                            transform: 'scale(1.1)'
                                                        },
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    <DeleteIcon sx={{ fontSize: 18 }} />
                                                </IconButton>
                                            }
                                        />
                                    </Grid>
                                ))}
                            </AnimatePresence>
                        </Grid>
                    </Box>
                ) : (
                    <Box sx={{ 
                        textAlign: 'center', 
                        py: 15,
                        bgcolor: alpha(theme.palette.background.paper, 0.4),
                        borderRadius: '32px',
                        border: `2px dashed ${alpha(theme.palette.divider, 0.1)}`
                    }}>
                        <StoreIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 3, opacity: 0.5 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                            Your list is empty
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: '400px', mx: 'auto' }}>
                            You haven't saved any vendors yet. Explore the marketplace to find the perfect partners for your event.
                        </Typography>
                        <Button 
                            variant="contained" 
                            size="large"
                            onClick={() => navigate('/client/vendors')}
                            sx={{ 
                                borderRadius: '16px', 
                                px: 4, 
                                py: 1.5,
                                fontWeight: 700,
                                textTransform: 'none',
                                boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`
                            }}
                        >
                            Explore Marketplace
                        </Button>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default SavedVendorsPage;
