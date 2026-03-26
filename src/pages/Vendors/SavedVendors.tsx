import {
    Box,
    Typography,
    Grid,
    IconButton,
    Button
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Store as StoreIcon
} from '@mui/icons-material';
import Product from '../../components/Product/Product';
import { alpha, useTheme } from '@mui/material/styles';

const mockSavedVendors = [
    { 
        id: '1', 
        name: 'Royal Heritage Banquet', 
        category: 'Venue', 
        rating: 4.8, 
        image: '/assets/products/minimal_product_showcase_4k_1774508739394.png' 
    },
    { 
        id: '3', 
        name: 'Cinematic Visuals (4K)', 
        category: 'Photography', 
        rating: 4.7, 
        image: '/assets/products/lifestyle_product_elegant_4k_1774508758859.png' 
    },
];

const SavedVendorsPage = () => {
    const theme = useTheme();

    return (
        <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
            <Typography 
                variant="h4" 
                sx={{ 
                    fontWeight: 900, 
                    mb: 5, 
                    letterSpacing: '-0.02em',
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                }}
            >
                Saved Vendors listing
            </Typography>
            {mockSavedVendors.length > 0 ? (
                <Grid container spacing={4}>
                    {mockSavedVendors.map((vendor) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={vendor.id}>
                            <Product
                                id={vendor.id}
                                title={vendor.name}
                                subtitle={vendor.category}
                                image={vendor.image}
                                rating={vendor.rating}
                                actionLabel="Book Now"
                                onAction={() => console.log('Booking', vendor.name)}
                                secondaryAction={
                                    <IconButton 
                                        size="small" 
                                        sx={{ 
                                            color: 'error.main',
                                            bgcolor: alpha(theme.palette.error.main, 0.05),
                                            borderRadius: '12px',
                                            '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.1) }
                                        }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                }
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box sx={{ textAlign: 'center', py: 10 }}>
                    <StoreIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 700 }}>No saved vendors yet.</Typography>
                    <Button variant="outlined" sx={{ mt: 2, borderRadius: 3 }}>Browse Vendors</Button>
                </Box>
            )}
        </Box>
    );
};

export default SavedVendorsPage;
