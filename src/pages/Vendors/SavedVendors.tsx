import {
    Box,
    Typography,
    Grid,
    CardMedia,
    Button,
    Rating,
    IconButton
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Store as StoreIcon
} from '@mui/icons-material';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';

const mockSavedVendors = [
    { id: '1', name: 'Royal Heritage Banquet', category: 'Venue', rating: 4.8, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800' },
    { id: '3', name: 'Cinematic Visuals (4K)', category: 'Photography', rating: 4.7, image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800' },
];

const SavedVendorsPage = () => {

    return (
        <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
            <DashboardHeader
                title="Saved Vendors"
                subtitle="Manage the vendors you've favorited for your upcoming event."
                tag="Collection"
            />

            {mockSavedVendors.length > 0 ? (
                <Grid container spacing={3}>
                    {mockSavedVendors.map((vendor) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={vendor.id}>
                            <DashboardCard sx={{ p: 0, overflow: 'hidden' }}>
                                <CardMedia
                                    component="img"
                                    height="160"
                                    image={vendor.image}
                                    alt={vendor.name}
                                />
                                <Box sx={{ p: 2 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 800, mb: 0.5 }}>{vendor.name}</Typography>
                                    <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: 600, mb: 1 }}>
                                        {vendor.category}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                                        <Rating value={vendor.rating} size="small" readOnly precision={0.1} />
                                        <Typography variant="caption" sx={{ fontWeight: 700 }}>{vendor.rating}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button variant="contained" fullWidth size="small" sx={{ borderRadius: 2 }}>Book Now</Button>
                                        <IconButton size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
                                    </Box>
                                </Box>
                            </DashboardCard>
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
