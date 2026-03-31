import React from 'react';
import {
    Box,
    Typography,
    IconButton,
    Card,
    CardMedia,
    alpha,
    useTheme
} from '@mui/material';
import {
    DeleteOutline as DeleteIcon
} from '@mui/icons-material';

export interface CartItemProps {
    id: string;
    name: string; // Vendor Name
    serviceName?: string; // Service Name/Category
    description?: string; // One-line summary
    price: string | number;
    image: string;
    quantity: number;
    category?: string;
    onClick?: () => void;
    onUpdateQuantity?: (newQty: number) => void;
    onRemove: () => void;
}

/**
 * Premium Minimalist Cart Item Card
 * Optimized for a clean, production-grade e-commerce UI.
 */
const CartItemCard: React.FC<CartItemProps> = ({
    name,
    serviceName,
    description,
    price,
    image,
    quantity,
    category,
    onClick,
    onUpdateQuantity,
    onRemove
}) => {
    const theme = useTheme();
    const formattedPrice = typeof price === 'number' ? `₹${price.toLocaleString()}` : price;

    // Standardize display values
    const vendorTitle = name || 'Premium Vendor';
    const serviceTitle = serviceName || category || 'Wedding Service';
    const descText = description || '';

    return (
        <Card
            elevation={0}
            onClick={onClick}
            sx={{
                p: 2,
                borderRadius: '20px',
                border: '1px solid #e5e7eb',
                display: 'flex',
                gap: 2.5,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                bgcolor: '#ffffff',
                cursor: onClick ? 'pointer' : 'default',
                '&:hover': {
                    borderColor: alpha(theme.palette.primary.main, 0.2),
                    boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                    transform: 'translateY(-2px)'
                }
            }}
        >
            {/* Image Section - 1:1 Aspect Ratio */}
            <Box sx={{ 
                width: 110, 
                height: 110, 
                flexShrink: 0,
                borderRadius: '16px',
                overflow: 'hidden',
                bgcolor: '#f8fafc',
                border: '1px solid #f1f5f9'
            }}>
                <CardMedia
                    component="img"
                    image={image}
                    alt={name || 'Service Image'}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </Box>

            {/* Content Section */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                    <Box sx={{ flexGrow: 1, mr: 2 }}>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontSize: '1.05rem', 
                                fontWeight: 800, 
                                color: 'text.primary',
                                mb: 0.25,
                                lineHeight: 1.2
                            }}
                        >
                            {vendorTitle}
                        </Typography>
                        
                        <Typography 
                            variant="subtitle2" 
                            sx={{ 
                                fontSize: '0.8rem', 
                                color: 'primary.main',
                                fontWeight: 700,
                                textTransform: 'capitalize',
                                mb: 0.5
                            }}
                        >
                            {serviceTitle}
                        </Typography>

                        {descText && (
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    fontSize: '0.75rem', 
                                    color: 'text.secondary',
                                    fontWeight: 500,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    opacity: 0.8
                                }}
                            >
                                {descText}
                            </Typography>
                        )}
                    </Box>
                    <Typography 
                        sx={{ 
                            fontSize: '1.1rem', 
                            fontWeight: 700, 
                            color: 'primary.main' 
                        }}
                    >
                        {formattedPrice}
                    </Typography>
                </Box>

                <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Quantity Label - Now interactive */}
                    <Box 
                        onClick={(e) => {
                            if (onUpdateQuantity) {
                                e.stopPropagation();
                                const step = category?.toLowerCase() === 'catering' ? 10 : 1;
                                onUpdateQuantity(quantity + step);
                            }
                        }}
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1,
                            px: 2,
                            py: 1,
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                            borderRadius: '12px',
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                            cursor: onUpdateQuantity ? 'pointer' : 'default',
                            transition: 'all 0.2s ease',
                            '&:hover': onUpdateQuantity ? {
                                bgcolor: alpha(theme.palette.primary.main, 0.08),
                                transform: 'scale(1.02)',
                                borderColor: alpha(theme.palette.primary.main, 0.2)
                            } : {}
                        }}
                    >
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                fontWeight: 800, 
                                color: 'primary.main',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                fontSize: '0.7rem'
                            }}
                        >
                            Qty:
                        </Typography>
                        <Typography 
                            sx={{ 
                                fontWeight: 900, 
                                color: 'text.primary',
                                fontSize: '1rem' 
                            }}
                        >
                            {quantity}
                        </Typography>
                    </Box>

                    {/* Remove Action */}
                    <IconButton 
                        size="small" 
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove();
                        }}
                        sx={{ 
                            color: 'text.disabled',
                            transition: 'all 0.2s ease',
                            '&:hover': { 
                                color: 'error.main', 
                                bgcolor: alpha(theme.palette.error.main, 0.05) 
                            }
                        }}
                    >
                        <DeleteIcon sx={{ fontSize: '1.1rem' }} />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
};

export default CartItemCard;
