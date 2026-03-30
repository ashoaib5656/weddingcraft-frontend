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
    Add as AddIcon,
    Remove as RemoveIcon,
    DeleteOutline as DeleteIcon
} from '@mui/icons-material';

export interface CartItemProps {
    id: string;
    name: string;
    description: string;
    price: string | number;
    image: string;
    quantity: number;
    category?: string;
    onIncrement: () => void;
    onDecrement: () => void;
    onRemove: () => void;
}

/**
 * Premium Minimalist Cart Item Card
 * Optimized for a clean, production-grade e-commerce UI.
 */
const CartItemCard: React.FC<CartItemProps> = ({
    name,
    description,
    price,
    image,
    quantity,
    category,
    onIncrement,
    onDecrement,
    onRemove
}) => {
    const theme = useTheme();
    const formattedPrice = typeof price === 'number' ? `₹${price.toLocaleString()}` : price;

    return (
        <Card
            elevation={0}
            sx={{
                p: 2,
                borderRadius: '20px',
                border: '1px solid #e5e7eb',
                display: 'flex',
                gap: 2.5,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                bgcolor: '#ffffff',
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
                    alt={name}
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
                    <Box>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontSize: '1.05rem', 
                                fontWeight: 700, 
                                color: 'text.primary',
                                mb: 0.25,
                                lineHeight: 1.2
                            }}
                        >
                            {name}
                        </Typography>
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                fontSize: '0.85rem', 
                                color: 'text.secondary',
                                fontWeight: 500,
                                display: '-webkit-box',
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}
                        >
                            {description || category}
                        </Typography>
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
                    {/* Quantity Stepper */}
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1.5,
                            p: 0.5,
                            bgcolor: '#f8fafc',
                            borderRadius: '12px',
                            border: '1px solid #f1f5f9'
                        }}
                    >
                        <IconButton 
                            size="small" 
                            onClick={onDecrement}
                            disabled={quantity <= 1}
                            sx={{ 
                                p: 0.5, 
                                bgcolor: '#ffffff',
                                border: '1px solid #e2e8f0',
                                '&:hover': { bgcolor: '#f1f5f9' },
                                '&.Mui-disabled': { opacity: 0.4 }
                            }}
                        >
                            <RemoveIcon sx={{ fontSize: '0.9rem' }} />
                        </IconButton>
                        <Typography 
                            sx={{ 
                                fontWeight: 800, 
                                minWidth: 20, 
                                textAlign: 'center', 
                                fontSize: '0.95rem' 
                            }}
                        >
                            {quantity}
                        </Typography>
                        <IconButton 
                            size="small" 
                            onClick={onIncrement}
                            sx={{ 
                                p: 0.5, 
                                bgcolor: '#ffffff',
                                border: '1px solid #e2e8f0',
                                '&:hover': { bgcolor: '#f1f5f9' }
                            }}
                        >
                            <AddIcon sx={{ fontSize: '0.9rem' }} />
                        </IconButton>
                    </Box>

                    {/* Remove Action */}
                    <IconButton 
                        size="small" 
                        onClick={onRemove}
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
