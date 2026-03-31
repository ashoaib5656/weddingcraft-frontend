import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Box, 
    Container, 
    Typography, 
    Grid, 
    Button, 
    Stack, 
    Tab, 
    Tabs,
    IconButton,
    alpha,
    useTheme,
    Divider,
    Avatar
} from '@mui/material';
import { 
    ArrowBack as BackIcon,
    LocationOn as LocationIcon,
    Stars as StarIcon,
    Verified as VerifiedIcon,
    Favorite as FavoriteIcon,
    Share as ShareIcon,
    CalendarMonth as CalendarIcon,
    ShoppingCart as CartIcon,
    CheckCircle as CheckIcon,
    Restaurant as FoodIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_VENDORS } from '../../constants/mockVendors';
import { useCart } from '../../contexts/CartContext';
import CateringDialog from '../../components/Vendors/CateringDialog';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && (
                <Box sx={{ py: 1 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

const VendorDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const { addToCart, isItemInCart } = useCart();
    const [activeTab, setActiveTab] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const vendor = MOCK_VENDORS.find(v => v.id === id);

    if (!vendor) {
        return (
            <Container sx={{ py: 10, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>Vendor not found</Typography>
                <Button 
                    startIcon={<BackIcon />} 
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

    const BookingButton = ({ fullWidth = false, size = "medium" as any }) => (
        <Button 
            variant={(isInCart && !isCatering) ? "outlined" : "contained"}
            color={isCatering ? "secondary" : "primary"}
            size={size}
            fullWidth={fullWidth}
            onClick={handleBookingAction}
            startIcon={(isInCart && !isCatering) ? <CheckIcon /> : (isCatering ? <FoodIcon /> : <CartIcon />)}
            sx={{ 
                borderRadius: '16px', 
                textTransform: 'none', 
                fontWeight: 800, 
                px: 3,
                height: size === "medium" ? 48 : 40,
                boxShadow: (isInCart && !isCatering) ? 'none' : `0 8px 20px ${alpha(isCatering ? theme.palette.secondary.main : theme.palette.primary.main, 0.2)}`,
                borderWidth: 2,
                '&:hover': { borderWidth: 2 }
            }}
        >
            {isCatering ? 'Reserve' : (isInCart ? 'Already Booked' : 'Book Now')}
        </Button>
    );

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 10 }}>
            {/* Top Navigation Bar - Sticky */}
            <Box sx={{ 
                position: 'sticky', 
                top: 0, 
                zIndex: 100, 
                bgcolor: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(20px)',
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                display: { xs: 'none', md: 'block' }
            }}>
                <Container maxWidth="xl" sx={{ height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button 
                        startIcon={<BackIcon />} 
                        onClick={() => navigate(-1)}
                        sx={{ fontWeight: 800, textTransform: 'none', color: 'text.primary' }}
                    >
                        Back to Discovery
                    </Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.secondary' }}>{vendor.name}</Typography>
                        <BookingButton size="small" />
                    </Box>
                </Container>
            </Box>

            {/* Mobile Header Nav */}
            <Box sx={{ px: 2, py: 2, display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 2 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: 'background.paper', boxShadow: 1, flexShrink: 0 }}>
                    <BackIcon />
                </IconButton>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, flexGrow: 1, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{vendor.name}</Typography>
                <IconButton sx={{ bgcolor: 'background.paper', boxShadow: 2, flexShrink: 0 }}>
                    <ShareIcon />
                </IconButton>
            </Box>

            {/* Content Area */}
            <Box sx={{ pt: { xs: 1, md: 2 } }}>
                <Container maxWidth="xl">
                    <Grid container spacing={4}>
                        {/* Left Column */}
                        <Grid item xs={12} md={8}>
                            {/* Hero Section */}
                            <Box 
                                component={motion.div}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                sx={{ 
                                    position: 'relative', 
                                    borderRadius: { xs: '20px', md: '32px' }, 
                                    overflow: 'hidden',
                                    height: { xs: 260, md: 450 },
                                    boxShadow: `0 20px 50px ${alpha(theme.palette.common.black, 0.08)}`,
                                    mb: 4
                                }}
                            >
                                <img 
                                    src={vendor.image} 
                                    alt={vendor.name} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                {/* Overlay Card */}
                                <Box sx={{ 
                                    position: 'absolute', 
                                    bottom: { xs: 12, md: 24 }, 
                                    left: { xs: 12, md: 24 }, 
                                    right: { xs: 12, md: 24 },
                                    bgcolor: alpha(theme.palette.background.paper, 0.75),
                                    backdropFilter: 'blur(24px)',
                                    p: { xs: 2, md: 3 },
                                    borderRadius: { xs: '16px', md: '24px' },
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    border: `1px solid ${alpha(theme.palette.common.white, 0.4)}`
                                }}>
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                            <VerifiedIcon sx={{ color: 'primary.main', fontSize: { xs: 18, md: 24 } }} />
                                            <Typography 
                                                variant="h3" 
                                                sx={{ 
                                                    fontWeight: 800, 
                                                    fontSize: { xs: '1.1rem', md: '2rem' }, 
                                                    color: 'text.primary', 
                                                    letterSpacing: '-0.02em' 
                                                }}
                                            >
                                                {vendor.name}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2.5 }, flexWrap: 'wrap' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <StarIcon sx={{ color: 'warning.main', fontSize: 16 }} />
                                                <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.85rem' }}>{vendor.rating}</Typography>
                                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>({vendor.reviewCount} Reviews)</Typography>
                                            </Box>
                                            <Divider orientation="vertical" flexItem sx={{ height: 14, my: 'auto', display: { xs: 'none', md: 'block' } }} />
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>{vendor.location}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
                                        <IconButton size="small" sx={{ bgcolor: 'white', '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.1), color: 'error.main' } }}>
                                            <FavoriteIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" sx={{ bgcolor: 'white' }}>
                                            <ShareIcon fontSize="small" />
                                        </IconButton>
                                    </Stack>
                                </Box>
                            </Box>

                            {/* Navigation Tabs */}
                            <Box sx={{ borderBottom: 1, borderColor: alpha(theme.palette.divider, 0.1), mb: 3 }}>
                                <Tabs 
                                    value={activeTab} 
                                    onChange={(_, newVal) => setActiveTab(newVal)}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    sx={{ 
                                        '& .MuiTab-root': { 
                                            fontWeight: 800, 
                                            textTransform: 'none', 
                                            fontSize: '1rem',
                                            color: 'text.disabled',
                                            '&.Mui-selected': { color: 'primary.main' }
                                        }
                                    }}
                                >
                                    <Tab label="Overview" />
                                    <Tab label="Services" />
                                    <Tab label="Portfolio" />
                                    <Tab label="Reviews" />
                                </Tabs>
                            </Box>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <TabPanel value={activeTab} index={0}>
                                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>About the Vendor</Typography>
                                        <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1.1rem', mb: 4 }}>
                                            {vendor.description} As a top-tier partner on our platform, {vendor.name} represents the gold standard in wedding services. Their commitment to flawless execution and artistic innovation ensures that your celebration is not just an event, but a lifetime memory.
                                        </Typography>
                                        {/* Highlights */}
                                        <Grid container spacing={3}>
                                            {[
                                                { label: 'Industry Leader', icon: <StarIcon /> },
                                                { label: '100% Reliable', icon: <CheckIcon /> },
                                                { label: 'Verified Partner', icon: <VerifiedIcon /> },
                                                { label: 'Prompt Service', icon: <CalendarIcon /> }
                                            ].map((highlight) => (
                                                <Grid item xs={6} sm={3} key={highlight.label}>
                                                    <Box sx={{ 
                                                        textAlign: 'center', 
                                                        p: 3, 
                                                        bgcolor: alpha(theme.palette.primary.main, 0.04), 
                                                        borderRadius: '24px',
                                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`
                                                    }}>
                                                        <Box sx={{ color: 'primary.main', mb: 1, display: 'flex', justifyContent: 'center' }}>
                                                            {highlight.icon}
                                                        </Box>
                                                        <Typography variant="caption" sx={{ fontWeight: 800, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                            {highlight.label}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </TabPanel>

                                    <TabPanel value={activeTab} index={1}>
                                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>Provided Services</Typography>
                                        <Grid container spacing={3}>
                                            {vendor.services.map((service) => (
                                                <Grid item xs={12} sm={6} key={service}>
                                                    <Box sx={{ 
                                                        p: 3, 
                                                        bgcolor: 'background.paper', 
                                                        borderRadius: '20px', 
                                                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 2.5
                                                    }}>
                                                        <Box sx={{ 
                                                            width: 48, height: 48, 
                                                            bgcolor: alpha(theme.palette.primary.main, 0.08), 
                                                            borderRadius: '14px', 
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center' 
                                                        }}>
                                                            <VerifiedIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.3 }}>{service}</Typography>
                                                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                                                Professional tier service
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </TabPanel>

                                    <TabPanel value={activeTab} index={2}>
                                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>Portfolio Gallery</Typography>
                                        <Grid container spacing={2}>
                                            {[1, 2, 3, 4, 5, 6].map((idx) => (
                                                <Grid item xs={12} sm={6} md={4} key={idx}>
                                                    <Box sx={{ borderRadius: '20px', overflow: 'hidden', height: 200, boxShadow: 1 }}>
                                                        <img src={`https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80`} alt="work" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    </Box>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </TabPanel>

                                    <TabPanel value={activeTab} index={3}>
                                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>Reviews & Feedback</Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Displaying historical user reviews...</Typography>
                                    </TabPanel>
                                </motion.div>
                            </AnimatePresence>
                        </Grid>

                        {/* Right Column: Dynamic Booking Widget */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{ position: 'sticky', top: 100 }}>
                                <Box 
                                    component={motion.div}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    sx={{ 
                                        p: 3, 
                                        bgcolor: 'background.paper', 
                                        borderRadius: '28px', 
                                        boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.04)}`,
                                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <Box sx={{ 
                                        position: 'absolute', top: 0, right: 0, left: 0, height: '6px', 
                                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                                    }} />

                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="overline" sx={{ color: 'text.disabled', fontWeight: 800, letterSpacing: '0.12em', fontSize: '0.65rem' }}>
                                            Starting Investment
                                        </Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
                                            {vendor.priceRange}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.7rem' }}>
                                            *Final pricing includes taxes and standard services.
                                        </Typography>
                                    </Box>

                                    <Stack spacing={2} sx={{ mb: 3 }}>
                                        <Box sx={{ 
                                            p: 1.5, 
                                            bgcolor: alpha(theme.palette.primary.main, 0.03), 
                                            borderRadius: '16px', 
                                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                            display: 'flex', alignItems: 'center', gap: 1.5
                                        }}>
                                            <CalendarIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.85rem' }}>Instant Confirmation</Typography>
                                                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.7rem' }}>Subject to slot verification.</Typography>
                                            </Box>
                                        </Box>
                                    </Stack>

                                    <BookingButton fullWidth />

                                    <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`, display: 'flex', gap: 1.5 }}>
                                        <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main', width: 32, height: 32 }}>
                                            <VerifiedIcon sx={{ fontSize: 18 }} />
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.8rem' }}>Buyer Protection</Typography>
                                            <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.2, display: 'block', fontSize: '0.7rem' }}>
                                                Safe payments and professional dispute resolution included.
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                
                                <Box sx={{ mt: 3, textAlign: 'center' }}>
                                    <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 600 }}>
                                        Questions? <span style={{ color: theme.palette.primary.main, cursor: 'pointer' }}>Chat with Support</span>
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <CateringDialog 
                open={isDialogOpen} 
                onClose={() => setIsDialogOpen(false)} 
                onAdd={(q) => addToCart(vendor, q)} 
                vendor={vendor} 
            />
        </Box>
    );
};

export default VendorDetails;
