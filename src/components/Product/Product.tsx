import React from 'react';
import { 
    Box, 
    Typography, 
    Card, 
    CardMedia, 
    alpha, 
    useTheme,
    Button,
    Chip
} from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';

/**
 * Interface for Product component props
 */
export interface ProductProps {
    /** Product ID */
    id: string;
    /** Product name/title */
    title: string;
    /** Short description or category */
    subtitle: string;
    /** Formatted price string (optional) */
    price?: string;
    /** Image URL */
    image: string;
    /** Optional badge text (e.g., "Popular", "New") */
    badge?: string;
    /** Optional rating */
    rating?: number;
    /** Optional action button label (default: "Reserve") */
    actionLabel?: string;
    /** Callback when card is clicked */
    onClick?: () => void;
    /** Callback when book/buy button is clicked */
    onAction?: (e: React.MouseEvent) => void;
    /** Optional secondary action (e.g., delete button) */
    secondaryAction?: React.ReactNode;
}

/**
 * Premium Minimalist Product Card Component
 * Optimized for MUI v5 and a high-end SaaS/Marketplace aesthetic.
 */
const Product: React.FC<ProductProps> = ({
    title,
    subtitle,
    price,
    image,
    badge,
    rating,
    actionLabel = "Reserve",
    onClick,
    onAction,
    secondaryAction
}) => {
    const theme = useTheme();

    return (
        <Card
            onClick={onClick}
            sx={{
                borderRadius: '24px', // Standardized to 24px (1.5rem)
                border: '1px solid #e5e7eb',
                bgcolor: '#ffffff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                cursor: onClick ? 'pointer' : 'default',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden',
                position: 'relative',
                '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
                    borderColor: alpha(theme.palette.primary.main, 0.1),
                    '& .product-image': {
                        transform: 'scale(1.05)',
                    }
                }
            }}
        >
            {/* Image Section - 16:9 Aspect Ratio */}
            <Box sx={{ 
                position: 'relative', 
                pt: '56.25%', // 16:9 aspect ratio
                width: '100%',
                overflow: 'hidden',
                borderRadius: '16px',
                m: 1.5,
                mb: 0,
                alignSelf: 'center',
                maxWidth: 'calc(100% - 24px)',
                bgcolor: '#f8fafc'
            }}>
                <CardMedia
                    className="product-image"
                    component="img"
                    image={image}
                    alt={title}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                />
                
                {badge && (
                    <Chip
                        label={badge}
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            bgcolor: alpha(theme.palette.background.paper, 0.8),
                            backdropFilter: 'blur(8px)',
                            fontWeight: 700,
                            fontSize: '0.65rem',
                            color: 'primary.main',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                            px: 0.5
                        }}
                    />
                )}
            </Box>

            {/* Content Section */}
            <Box sx={{ p: 2.5, pt: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 2 }}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontSize: '1.1rem', 
                            fontWeight: 600, 
                            color: 'text.primary',
                            mb: 0.5,
                            lineHeight: 1.2
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            fontSize: '0.85rem', 
                            color: 'text.secondary',
                            fontWeight: 500
                        }}
                    >
                        {subtitle}
                    </Typography>
                </Box>

                {rating !== undefined && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                        <Box sx={{ display: 'flex', color: '#f59e0b' }}>
                            <StarIcon sx={{ fontSize: '1rem' }} />
                        </Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary' }}>
                            {rating}
                        </Typography>
                    </Box>
                )}

                <Box sx={{ 
                    mt: 'auto', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    gap: 1
                }}>
                    {price && (
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontSize: '1.05rem', 
                                fontWeight: 700, 
                                color: 'text.primary' 
                            }}
                        >
                            {price}
                        </Typography>
                    )}
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: price ? 0 : 'auto', width: price ? 'auto' : '100%' }}>
                        <Button
                            size="small"
                            variant="contained"
                            fullWidth={!price}
                            onClick={onAction}
                            sx={{
                                borderRadius: '12px',
                                textTransform: 'none',
                                fontWeight: 600,
                                px: price ? 2 : 0,
                                minWidth: price ? '100px' : 'none',
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: 'none',
                                    filter: 'brightness(1.05)'
                                }
                            }}
                        >
                            {actionLabel}
                        </Button>
                        {secondaryAction}
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};

export default Product;
