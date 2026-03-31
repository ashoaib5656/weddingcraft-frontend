import React, { useState } from 'react';
import { 
    Card, 
    CardMedia, 
    CardContent, 
    Typography, 
    Box, 
    Button, 
    Chip, 
    alpha, 
    useTheme,
    Stack
} from '@mui/material';
import { 
    LocationOn as LocationIcon, 
    Stars as StarsIcon,
    CheckCircle as CheckIcon,
    ShoppingCart as CartIcon,
    Restaurant as FoodIcon
} from '@mui/icons-material';
import type { Vendor } from '../../Types/vendor';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import CateringDialog from './CateringDialog';

interface VendorCardProps {
    vendor: Vendor;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { addToCart, isItemInCart } = useCart();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const isCatering = vendor.sectorId.toLowerCase() === 'catering';
    const isInCart = isItemInCart(vendor.id);

    const handleNavigate = () => {
        const currentPath = window.location.pathname;
        if (currentPath.includes('client')) {
            navigate(`/client/vendors/${vendor.id}`);
        } else {
            navigate(`/products/${vendor.id}`);
        }
    };

    const handleBooking = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isCatering) {
            setIsDialogOpen(true);
        } else {
            addToCart(vendor, 1);
        }
    };

    return (
        <>
            <Card
                component={motion.div}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={handleNavigate}
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.03)}`,
                    '&:hover': {
                        boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.08)}`,
                        borderColor: alpha(theme.palette.primary.main, 0.2),
                    }
                }}
            >
                {/* Image Section */}
                <Box sx={{ position: 'relative', pt: '65%' }}>
                    <CardMedia
                        component="img"
                        image={vendor.image}
                        alt={vendor.name}
                        loading="lazy"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease',
                        }}
                    />
                    
                    {/* Price Overlay */}
                    <Box sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        bgcolor: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(10px)',
                        px: 1.5,
                        py: 1,
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        zIndex: 1
                    }}>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 800, display: 'block', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1 }}>
                            Starting At
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 900, fontSize: '0.9rem' }}>
                            {vendor.priceRange}
                        </Typography>
                    </Box>

                    {/* Sector Badge */}
                    <Box sx={{
                        position: 'absolute',
                        bottom: 12,
                        left: 12,
                        bgcolor: alpha(isCatering ? theme.palette.secondary.main : theme.palette.primary.main, 0.9),
                        backdropFilter: 'blur(4px)',
                        px: 1.2,
                        py: 0.6,
                        borderRadius: '10px',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.7,
                        boxShadow: 2,
                        zIndex: 1
                    }}>
                        {isCatering ? <FoodIcon sx={{ fontSize: 14 }} /> : <CartIcon sx={{ fontSize: 14 }} />}
                        <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.6rem' }}>
                            {vendor.sectorId}
                        </Typography>
                    </Box>

                    {/* Rating Badge */}
                    <Box sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(4px)',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        zIndex: 1
                    }}>
                        <StarsIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.primary' }}>{vendor.rating}</Typography>
                    </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 2.5, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ mb: 1.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, color: 'text.primary', lineHeight: 1.2 }}>
                            {vendor.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <LocationIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                {vendor.location}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Services Section */}
                    <Box sx={{ mb: 2 }}>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {vendor.services.slice(0, 3).map((service, idx) => (
                                <Chip
                                    key={idx}
                                    label={service}
                                    size="small"
                                    sx={{
                                        height: 22,
                                        fontSize: '0.65rem',
                                        fontWeight: 700,
                                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                                        color: 'primary.main',
                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                                    }}
                                />
                            ))}
                        </Stack>
                    </Box>

                    <Box sx={{ 
                        borderTop: `1px solid ${alpha(theme.palette.divider, 0.06)}`, 
                        pt: 2, 
                        mt: 'auto', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <Button
                            variant="text"
                            size="small"
                            onClick={(e) => { e.stopPropagation(); handleNavigate(); }}
                            sx={{
                                color: 'text.secondary',
                                fontWeight: 700,
                                textTransform: 'none',
                                fontSize: '0.8rem',
                                borderRadius: '10px'
                            }}
                        >
                            Details
                        </Button>

                        <Button
                            variant={(isInCart && !isCatering) ? "outlined" : "contained"}
                            color={isCatering ? "secondary" : "primary"}
                            size="small"
                            onClick={handleBooking}
                            startIcon={ (isInCart && !isCatering) ? <CheckIcon /> : (isCatering ? <FoodIcon sx={{ fontSize: 16 }} /> : <CartIcon sx={{ fontSize: 16 }} />)}
                            sx={{
                                borderRadius: '10px',
                                textTransform: 'none',
                                fontWeight: 800,
                                px: 2,
                                height: 36,
                                flexShrink: 0,
                                boxShadow: (isInCart && !isCatering) ? 'none' : `0 4px 12px ${alpha(isCatering ? theme.palette.secondary.main : theme.palette.primary.main, 0.2)}`,
                            }}
                        >
                            {isCatering ? 'Reserve' : (isInCart ? 'Booked' : 'Book Now')}
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <CateringDialog 
                open={isDialogOpen} 
                onClose={() => setIsDialogOpen(false)} 
                onAdd={(q) => addToCart(vendor, q)} 
                vendor={vendor} 
            />
        </>
    );
};

export default VendorCard;
