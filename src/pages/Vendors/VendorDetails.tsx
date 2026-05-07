import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Box, 
    Container, 
    Typography, 
    Grid, 
    Button, 
    Stack, 
    IconButton,
    alpha,
    useTheme,
    Divider,
    Breadcrumbs, 
    Link, 
    Chip,
} from '@mui/material';
import { 
    CalendarMonth as CalendarIcon,
    ShoppingCart as CartIcon,
    CheckCircle as CheckIcon,
    Restaurant as FoodIcon,
    NavigateNext as NavigateNextIcon,
    ChatBubbleOutline as MessageIcon,
    AccessTime as TimeIcon,
    WorkOutline as ExperienceIcon,
    TaskAlt as EventsIcon,
    Translate as LanguageIcon,
    FavoriteBorder as WishlistIcon,
    ChevronLeft as PrevIcon,
    ChevronRight as NextIcon,
    Verified as VerifiedIcon,
    LocationOn as LocationIcon,
    Stars as StarIcon,
    Share as ShareIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import USER_SERVICE from '../../api/services/users';
import { useCart } from '../../contexts/CartContext';
import CateringDialog from '../../components/Vendors/CateringDialog';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import { type Vendor as BaseVendor } from '../../Types/vendor';


// Extending BaseVendor to ensure compatibility with User fields and CateringDialog
interface Vendor extends BaseVendor {
    id: string; // Ensure string
}


const VendorDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const { addToCart, isItemInCart } = useCart();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [vendor, setVendor] = useState<Vendor | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVendor = async () => {
            try {
                const response = await USER_SERVICE.GetUserById(id!);
                const u = response.data.data;
                setVendor({
                    id: u.id,
                    name: u.vendorProfile?.businessName || u.name,
                    sectorId: u.category || 'General',
                    image: u.vendorProfile?.imageUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
                    rating: 4.5,
                    reviewCount: 0,
                    location: u.location || 'Local',
                    description: u.vendorProfile?.description || 'Elite professional wedding services provider committed to creating unforgettable memories with artistic innovation and flawless execution.',
                    services: u.products?.map((p: any) => p.name) || [u.category || 'General Services'],
                    reviews: [],
                    priceRange: (u.vendorProfile?.priceRange || 'Contact for pricing').replace('$', '₹')
                });
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        if (id) fetchVendor();
    }, [id]);

    if (isLoading) {
        return <Container sx={{ py: 10, textAlign: 'center' }}><Typography>Loading...</Typography></Container>;
    }

    if (!vendor) {
        return (
            <Container sx={{ py: 10, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>Vendor not found</Typography>
                <Button 
                    startIcon={<PrevIcon />} 
                    onClick={() => navigate(-1)} 
                    sx={{ mt: 3, fontWeight: 700, textTransform: 'none' }}
                >
                    Go Back
                </Button>
            </Container>
        );
    }

    const isCatering = vendor.sectorId.toLowerCase() === 'catering';
    const isInCart = isItemInCart(vendor.id);

    const handleBookingAction = () => {
        if (isCatering) {
            setIsDialogOpen(true);
        } else {
            addToCart(vendor, 1);
        }
    };

    const handleCateringAdd = (quantity: number) => {
        addToCart(vendor, quantity);
    };

    const BookingButton = ({ fullWidth = false, size = "large" as any }) => (
        <Button 
            variant={(isInCart && !isCatering) ? "outlined" : "contained"}
            color="primary"
            size={size}
            fullWidth={fullWidth}
            onClick={handleBookingAction}
            startIcon={(isInCart && !isCatering) ? <CheckIcon /> : (isCatering ? <FoodIcon /> : <CartIcon />)}
            sx={{ 
                borderRadius: '12px', 
                textTransform: 'none', 
                fontWeight: 800, 
                px: 3,
                height: 54,
                fontSize: '1rem',
                boxShadow: (isInCart && !isCatering) ? 'none' : `0 10px 25px ${alpha(theme.palette.primary.main, 0.25)}`,
                borderWidth: 2,
                '&:hover': { 
                    borderWidth: 2,
                    boxShadow: (isInCart && !isCatering) ? 'none' : `0 12px 30px ${alpha(theme.palette.primary.main, 0.35)}`,
                }
            }}
        >
            {isCatering ? 'Reserve Now' : (isInCart ? 'Already Booked' : 'Book Now')}
        </Button>
    );

    const mockGallery = [
        vendor.image,
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1465495910483-0d674983021e?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1522673607200-1648482cee98?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800',
    ];

    const whatsIncluded = [
        'High-resolution edited photos',
        '2 Photographers',
        'Online gallery',
        'Pre-wedding consultation',
        'Candid + traditional shots',
        '7 days delivery'
    ];

    const highlights = [
        { icon: <TimeIcon sx={{ fontSize: 20 }} />, label: 'Response time', value: 'Usually within a few hours', color: '#6366f1' },
        { icon: <ExperienceIcon sx={{ fontSize: 20 }} />, label: 'Experience', value: '7+ years', color: '#8b5cf6' },
        { icon: <EventsIcon sx={{ fontSize: 20 }} />, label: 'Completed events', value: '250+', color: '#d946ef' },
        { icon: <LanguageIcon sx={{ fontSize: 20 }} />, label: 'Languages', value: 'English, Hindi, Kannada', color: '#f43f5e' },
    ];

    return (
        <Box sx={{ bgcolor: alpha('#f8fafc', 0.5), minHeight: '100vh', pb: 10 }}>
            {/* Top Navigation Bar */}
            <Container maxWidth="xl">
                <Box sx={{ py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button 
                        startIcon={<PrevIcon sx={{ fontSize: 18 }} />} 
                        onClick={() => navigate('/customer/vendors')}
                        sx={{ 
                            textTransform: 'none', 
                            fontWeight: 700, 
                            color: 'text.secondary',
                            '&:hover': { color: 'primary.main', bgcolor: 'transparent' }
                        }}
                    >
                        Back to Marketplace
                    </Button>
                    
                    <Breadcrumbs 
                        separator={<NavigateNextIcon sx={{ fontSize: 16, color: 'text.disabled' }} />} 
                        aria-label="breadcrumb"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/customer/vendors"
                            onClick={(e) => { e.preventDefault(); navigate('/customer/vendors'); }}
                            sx={{ fontSize: '0.85rem', fontWeight: 600, color: 'text.secondary' }}
                        >
                            Marketplace
                        </Link>
                        <Typography color="text.secondary" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>Vendors</Typography>
                        <Typography color="primary" sx={{ fontSize: '0.85rem', fontWeight: 800 }}>Service</Typography>
                    </Breadcrumbs>
                </Box>
            </Container>

            <Container maxWidth="xl">
                <Grid container spacing={4}>
                    {/* Main Content Column */}
                    <Grid item xs={12} md={8}>
                        {/* Media Gallery */}
                        <Box sx={{ mb: 4 }}>
                            <Box 
                                component={motion.div}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                sx={{ 
                                    position: 'relative', 
                                    borderRadius: '24px', 
                                    overflow: 'hidden',
                                    height: { xs: 300, md: 500 },
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                    mb: 2
                                }}
                            >
                                <img 
                                    src={vendor.image} 
                                    alt={vendor.name} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <Chip 
                                    icon={<VerifiedIcon sx={{ fontSize: '16px !important', color: 'white !important' }} />}
                                    label="Premium Vendor" 
                                    sx={{ 
                                        position: 'absolute', top: 20, left: 20, 
                                        bgcolor: alpha(theme.palette.common.black, 0.6),
                                        backdropFilter: 'blur(10px)',
                                        color: 'white', fontWeight: 700, borderRadius: '8px',
                                        px: 1, py: 2
                                    }} 
                                />
                                <Box sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%', px: 2, display: 'flex', justifyContent: 'space-between' }}>
                                    <IconButton sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'white' } }} size="small"><PrevIcon /></IconButton>
                                    <IconButton sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'white' } }} size="small"><NextIcon /></IconButton>
                                </Box>
                                <Box sx={{ position: 'absolute', bottom: 20, right: 20, px: 1.5, py: 0.5, bgcolor: alpha(theme.palette.common.black, 0.5), borderRadius: '4px', color: 'white', fontSize: '0.75rem', fontWeight: 700 }}>
                                    1 / 12
                                </Box>
                            </Box>
                            <Grid container spacing={1.5}>
                                {mockGallery.map((img, idx) => (
                                    <Grid item xs={2} key={idx}>
                                        <Box sx={{ 
                                            borderRadius: '12px', overflow: 'hidden', height: 80, cursor: 'pointer',
                                            border: idx === 0 ? `2px solid ${theme.palette.primary.main}` : 'none',
                                            transition: 'transform 0.2s',
                                            '&:hover': { transform: 'scale(1.05)' },
                                            position: 'relative'
                                        }}>
                                            <img src={img} alt="gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            {idx === 5 && (
                                                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, bgcolor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>
                                                    +8
                                                </Box>
                                            )}
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>

                        {/* Info Section */}
                        <DashboardCard sx={{ p: { xs: 3, md: 5 }, borderRadius: '24px', mb: 4 }}>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h3" sx={{ fontWeight: 900, mb: 1.5, letterSpacing: '-0.02em', color: '#1e293b' }}>
                                    {vendor.name}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <Typography sx={{ fontWeight: 800, fontSize: '1.1rem' }}>4.5</Typography>
                                        <Box sx={{ display: 'flex' }}>
                                            {[1, 2, 3, 4].map(i => <StarIcon key={i} sx={{ color: '#FFD700', fontSize: 20 }} />)}
                                            <StarIcon sx={{ color: '#e2e8f0', fontSize: 20 }} />
                                        </Box>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>(120 Reviews)</Typography>
                                    </Box>
                                    <Divider orientation="vertical" flexItem sx={{ height: 20, my: 'auto' }} />
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <LocationIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                                        <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary' }}>Bengaluru, India</Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.secondary' }}>By Dream Moments</Typography>
                                <Chip 
                                    icon={<VerifiedIcon sx={{ fontSize: '14px !important' }} />}
                                    label="Verified Vendor" 
                                    size="small"
                                    sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', fontWeight: 800, borderRadius: '6px' }} 
                                />
                            </Box>

                            <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8, fontSize: '1.05rem', mb: 5 }}>
                                {vendor.description} We capture timeless moments with a blend of candid and editorial photography. Our goal is to tell your love story beautifully with natural emotions and artistic compositions.
                            </Typography>

                            <Divider sx={{ mb: 5 }} />

                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>What's Included</Typography>
                                <Grid container spacing={3}>
                                    {whatsIncluded.map((item, idx) => (
                                        <Grid item xs={12} sm={6} key={idx}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <CheckIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                                                <Typography sx={{ fontWeight: 600, color: '#1e293b' }}>{item}</Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </DashboardCard>
                    </Grid>

                    {/* Sidebar Column */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ position: 'sticky', top: 40 }}>
                            {/* Booking Card */}
                            <DashboardCard sx={{ p: 4, borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.04)', border: `1px solid ${alpha(theme.palette.divider, 0.05)}`, mb: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Starting From</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                                            <Typography variant="h3" sx={{ fontWeight: 900, color: '#1e293b' }}>{vendor.priceRange}</Typography>
                                            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>/event</Typography>
                                        </Box>
                                    </Box>
                                    <Chip label="PREMIUM" size="small" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', fontWeight: 900, borderRadius: '6px', fontSize: '0.65rem' }} />
                                </Box>

                                <Box sx={{ p: 2.5, borderRadius: '16px', bgcolor: alpha(theme.palette.success.main, 0.04), border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`, mb: 4 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <CheckIcon sx={{ color: 'success.main', fontSize: 18 }} />
                                        <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>Instant Booking</Typography>
                                    </Box>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.5, display: 'block' }}>
                                        Secure your date today with no hidden fees or surprise charges.
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
                                    <CalendarIcon sx={{ fontSize: 20, color: 'text.disabled' }} />
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary' }}>Flexible dates available for 2025</Typography>
                                </Box>

                                <Stack spacing={2}>
                                    <BookingButton fullWidth />
                                    <Button 
                                        variant="outlined" 
                                        fullWidth 
                                        startIcon={<MessageIcon />}
                                        sx={{ height: 54, borderRadius: '12px', textTransform: 'none', fontWeight: 800, borderColor: '#e2e8f0', color: '#1e293b' }}
                                    >
                                        Message Vendor
                                    </Button>
                                </Stack>

                                <Box sx={{ mt: 4, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                    <VerifiedIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                                    <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 800, letterSpacing: '0.05em' }}>
                                        SECURE BOOKING SYSTEM
                                    </Typography>
                                </Box>
                            </DashboardCard>

                            {/* Highlights Card */}
                            <DashboardCard sx={{ p: 4, borderRadius: '24px', mb: 3 }}>
                                <Stack spacing={3}>
                                    {highlights.map((h, i) => (
                                        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                                            <Box sx={{ width: 44, height: 44, borderRadius: '12px', bgcolor: alpha(h.color, 0.1), color: h.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {h.icon}
                                            </Box>
                                            <Box>
                                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, display: 'block' }}>{h.label}</Typography>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1e293b' }}>{h.value}</Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Stack>
                            </DashboardCard>

                            {/* Share/Save Actions */}
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button fullWidth variant="outlined" startIcon={<WishlistIcon />} sx={{ height: 48, borderRadius: '12px', textTransform: 'none', fontWeight: 800, color: '#1e293b', borderColor: '#e2e8f0' }}>Save</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button fullWidth variant="outlined" startIcon={<ShareIcon />} sx={{ height: 48, borderRadius: '12px', textTransform: 'none', fontWeight: 800, color: '#1e293b', borderColor: '#e2e8f0' }}>Share</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Catering Dialog */}
            <CateringDialog 
                open={isDialogOpen} 
                onClose={() => setIsDialogOpen(false)} 
                onAdd={handleCateringAdd}
                vendor={vendor} 
            />
        </Box>
    );
};

export default VendorDetails;
