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
    onRemove
}) => {
    const theme = useTheme();
    const formattedPrice = typeof price === 'number' ? `₹${price.toLocaleString()}` : price.toString().replace('$', '₹');

    // Standardize display values
    const vendorTitle = name || 'Premium Vendor';
    const serviceTitle = serviceName || category || 'Wedding Service';
    const descText = description || '';

    return (
        <Card
            elevation={0}
            onClick={onClick}
            sx={{
                p: { xs: 1.2, sm: 1.5 },
                borderRadius: '20px',
                border: '1px solid #e5e7eb',
                display: 'flex',
                gap: { xs: 1.2, sm: 2 },
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
            {/* Image Section - Responsive Aspect Ratio */}
            <Box sx={{ 
                width: { xs: 70, sm: 95 }, 
                height: { xs: 70, sm: 95 }, 
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
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column-reverse', sm: 'row' },
                    justifyContent: 'space-between', 
                    alignItems: { xs: 'flex-start', sm: 'flex-start' }, 
                    mb: 0.5,
                    gap: { xs: 0.5, sm: 0 }
                }}>
                    <Box sx={{ flexGrow: 1, mr: { xs: 0, sm: 2 }, minWidth: 0 }}>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontSize: { xs: '0.9rem', sm: '0.95rem' }, 
                                fontWeight: 800, 
                                color: 'text.primary',
                                mb: 0.25,
                                lineHeight: 1.2,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {vendorTitle}
                        </Typography>
                        
                        <Typography 
                            variant="subtitle2" 
                            sx={{ 
                                fontSize: '0.75rem', 
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
                                    fontSize: '0.7rem', 
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
                            fontSize: { xs: '0.9rem', sm: '1rem' }, 
                            fontWeight: 800, 
                            color: 'primary.main',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {formattedPrice}
                    </Typography>
                </Box>

                <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1 }}>
                    {/* Quantity Label */}
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 0.75,
                            px: { xs: 1, sm: 1.5 },
                            py: { xs: 0.5, sm: 0.75 },
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                            borderRadius: '10px',
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        }}
                    >
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                fontWeight: 800, 
                                color: 'primary.main',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                fontSize: '0.6rem'
                            }}
                        >
                            Qty:
                        </Typography>
                        <Typography 
                            sx={{ 
                                fontWeight: 900, 
                                color: 'text.primary',
                                fontSize: { xs: '0.8rem', sm: '0.85rem' }
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
