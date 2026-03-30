import React from 'react';
import {
    Box,
    Typography,
    Button,
    Divider,
    alpha,
    useTheme
} from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';

export interface CartSummaryProps {
    subtotal: number;
    tax?: number;
    shipping?: number;
    total: number;
    onCheckout: () => void;
    disabled?: boolean;
}

/**
 * Premium Sticky Cart Summary Component
 */
const CartSummary: React.FC<CartSummaryProps> = ({
    subtotal,
    tax = 0,
    total,
    onCheckout,
    disabled = false
}) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                p: 4,
                borderRadius: '24px',
                bgcolor: '#ffffff',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                position: 'sticky',
                top: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5
            }}
        >
            <Typography 
                variant="h6" 
                sx={{ 
                    fontWeight: 700, 
                    fontSize: '1.25rem', 
                    letterSpacing: '-0.02em',
                    mb: 1
                }}
            >
                Order Summary
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>Subtotal</Typography>
                    <Typography sx={{ fontWeight: 600 }}>₹{subtotal.toLocaleString()}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>Booking Fee</Typography>
                    <Typography sx={{ fontWeight: 600, color: 'success.main' }}>FREE</Typography>
                </Box>

                {tax > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>Taxes</Typography>
                        <Typography sx={{ fontWeight: 600 }}>₹{tax.toLocaleString()}</Typography>
                    </Box>
                )}
            </Box>

            <Divider sx={{ my: 1, borderStyle: 'dotted' }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 2 }}>
                <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>Total Amount</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                        Including all platform taxes
                    </Typography>
                </Box>
                <Typography 
                    variant="h4" 
                    sx={{ 
                        fontWeight: 800, 
                        color: 'primary.main', 
                        letterSpacing: '-0.02em',
                        fontSize: '1.75rem'
                    }}
                >
                    ₹{total.toLocaleString()}
                </Typography>
            </Box>

            <Button
                fullWidth
                variant="contained"
                size="large"
                disabled={disabled}
                onClick={onCheckout}
                endIcon={<ChevronRightIcon />}
                sx={{
                    borderRadius: '16px',
                    py: 2,
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.2)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 16px 40px ${alpha(theme.palette.primary.main, 0.3)}`,
                    },
                    '&.Mui-disabled': {
                        bgcolor: alpha(theme.palette.action.disabledBackground, 0.1),
                        color: theme.palette.text.disabled,
                        boxShadow: 'none'
                    }
                }}
            >
                Checkout Now
            </Button>

            <Typography 
                sx={{ 
                    textAlign: 'center', 
                    color: 'text.disabled', 
                    fontSize: '0.75rem', 
                    fontWeight: 600,
                    px: 2
                }}
            >
                Secure payment handled by SSL encryption. By proceeding, you agree to our Terms of Service.
            </Typography>
        </Box>
    );
};

export default CartSummary;
