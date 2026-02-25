import { useEffect, useRef, type JSX } from 'react';
import {
    Box,
    Typography,
    Container,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    IconButton,
    Button,
    Divider,
    alpha,
    useTheme,
    keyframes
} from '@mui/material';
import {
    Delete as DeleteIcon,
    ShoppingCart as CartIcon,
    ChevronRight as ChevronRightIcon,
    LocalMall as MallIcon
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../../store';
import { removeItem, clearCart } from '../../store/slices/cartSlice';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import gsap from 'gsap';


const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const CartPage = (): JSX.Element => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { success, info } = useSnackbar();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const listRef = useRef<HTMLDivElement>(null);

    const totalAmount = cartItems.reduce((acc, item) => {
        return acc + (item.numericPrice * item.quantity);
    }, 0);

    useEffect(() => {
        if (listRef.current && cartItems.length > 0) {
            gsap.fromTo(
                listRef.current.querySelectorAll('.cart-item-anim'),
                { opacity: 0, y: 20 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.6, 
                    stagger: 0.1, 
                    ease: "power3.out" 
                }
            );
        }
    }, [cartItems.length]);

    const handleRemove = (id: string, name: string) => {
        dispatch(removeItem(id));
        info(`${name} removed from cart`);
    };


    const handleCheckout = () => {
        success('Booking request submitted successfully!');
        dispatch(clearCart());
        navigate('/client-dashboard');
    };

    if (cartItems.length === 0) {
        return (
            <Container maxWidth="md" sx={{ py: 15, textAlign: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 4 }}>
                    <Box
                        sx={{
                            width: 140,
                            height: 140,
                            borderRadius: '50%',
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            animation: `${float} 3s ease-in-out infinite`
                        }}
                    >
                        <CartIcon sx={{ fontSize: 60, color: alpha(theme.palette.primary.main, 0.3) }} />
                    </Box>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, letterSpacing: '-0.02em' }}>
                    Your selections are waiting
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 5, fontSize: '1.1rem', maxWidth: 500, mx: 'auto' }}>
                    Your cart is currently empty. Explore our premium wedding services and start crafting your perfect celebration today.
                </Typography>
                <Button 
                    variant="contained" 
                    onClick={() => navigate('/products')}
                    startIcon={<MallIcon />}
                    sx={{ 
                        borderRadius: "15px", 
                        textTransform: 'none', 
                        px: 5, 
                        py: 2, 
                        fontWeight: 800,
                        fontSize: '1rem',
                        boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.3)}`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 15px 35px ${alpha(theme.palette.primary.main, 0.4)}`,
                        }
                    }}
                >
                    Explore Catalog
                </Button>
            </Container>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1400, mx: 'auto' }}>
            <DashboardHeader
                title="Your Booking Protocol"
                subtitle="Review and refine your selected premium services and products."
                tag="Selection Management"
            />

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 400px' }, gap: 5 }}>
                <Box ref={listRef}>
                    <Paper 
                        elevation={0} 
                        sx={{ 
                            borderRadius: 6, 
                            overflow: 'hidden', 
                            border: '1px solid', 
                            borderColor: 'divider',
                            background: 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(20px)',
                            p: 1
                        }}
                    >
                        <List disablePadding>
                            {cartItems.map((item, index) => (
                                <Box key={item.id} className="cart-item-anim">
                                    <ListItem
                                        sx={{
                                            p: 3,
                                            flexDirection: { xs: 'column', sm: 'row' },
                                            alignItems: { xs: 'flex-start', sm: 'center' },
                                            gap: 3,
                                            transition: 'background 0.3s ease',
                                            borderRadius: 4,
                                            '&:hover': {
                                                bgcolor: alpha(theme.palette.primary.main, 0.02)
                                            }
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar 
                                                variant="rounded" 
                                                src={item.image} 
                                                sx={{ 
                                                    width: 100, 
                                                    height: 100, 
                                                    borderRadius: 4,
                                                    boxShadow: '0 8px 16px rgba(0,0,0,0.08)' 
                                                }}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', color: '#1a1a2e' }}>
                                                    {item.name}
                                                </Typography>
                                            }
                                            secondary={
                                                <Box sx={{ mt: 0.5 }}>
                                                    <Typography variant="caption" sx={{ 
                                                        color: 'primary.main', 
                                                        fontWeight: 800, 
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: 0.5,
                                                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                                                        px: 1.5,
                                                        py: 0.5,
                                                        borderRadius: '20px'
                                                    }}>
                                                        {item.category}
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: '#f8fafc', p: 1, borderRadius: '15px' }}>
                                            {/* <IconButton 
                                                size="small" 
                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                sx={{ bgcolor: '#fff', '&:hover': { bgcolor: '#fff' } }}
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </IconButton> */}
                                            {/* <Typography sx={{ fontWeight: 800, minWidth: 25, textAlign: 'center', fontSize: '1.1rem' }}>
                                                {item.quantity}
                                            </Typography> */}
                                            {/* <IconButton 
                                                size="small" 
                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                sx={{ bgcolor: '#fff', '&:hover': { bgcolor: '#fff' } }}
                                            >
                                                <AddIcon fontSize="small" />
                                            </IconButton> */}
                                        </Box>

                                        <Box sx={{ textAlign: 'right', minWidth: 120 }}>
                                            <Typography sx={{ fontWeight: 900, fontSize: '1.3rem', color: 'primary.main' }}>
                                                ₹{(item.numericPrice * item.quantity).toLocaleString()}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                                {typeof item.price === 'string' ? item.price : `₹${item.price.toLocaleString()}`} each
                                            </Typography>
                                        </Box>

                                        <IconButton 
                                            edge="end" 
                                            onClick={() => handleRemove(item.id, item.name)}
                                            sx={{ 
                                                color: alpha(theme.palette.error.main, 0.4),
                                                '&:hover': { color: 'error.main', bgcolor: alpha(theme.palette.error.main, 0.1) }
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </ListItem>
                                    {index < cartItems.length - 1 && <Divider sx={{ mx: 3, opacity: 0.5 }} />}
                                </Box>
                            ))}
                        </List>
                    </Paper>
                </Box>

                <Box>
                    <Paper 
                        elevation={0} 
                        sx={{ 
                            p: 4, 
                            borderRadius: 6, 
                            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
                            border: '1px solid',
                            borderColor: alpha(theme.palette.primary.main, 0.1),
                            position: 'sticky',
                            top: 100,
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 900, mb: 4, letterSpacing: '-0.02em' }}>Order Summary</Typography>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2.5 }}>
                            <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>Service Subtotal</Typography>
                            <Typography sx={{ fontWeight: 800 }}>₹{totalAmount.toLocaleString()}</Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2.5 }}>
                            <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>Booking Fee</Typography>
                            <Box sx={{ textAlign: 'right' }}>
                                <Typography sx={{ fontWeight: 800, color: 'success.main' }}>FREE</Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Limited Time Offer</Typography>
                            </Box>
                        </Box>

                        <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5, alignItems: 'flex-end' }}>
                            <Box>
                                <Typography sx={{ fontWeight: 800, fontSize: '1rem' }}>Total Amount</Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Including all taxes</Typography>
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 950, color: 'primary.main', letterSpacing: '-0.03em' }}>
                                ₹{totalAmount.toLocaleString()}
                            </Typography>
                        </Box>

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            onClick={handleCheckout}
                            endIcon={<ChevronRightIcon />}
                            sx={{
                                borderRadius: 4,
                                py: 2.5,
                                textTransform: 'none',
                                fontWeight: 900,
                                fontSize: '1.1rem',
                                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                                boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: `0 15px 40px ${alpha(theme.palette.primary.main, 0.5)}`,
                                }
                            }}
                        >
                            Finalize Booking
                        </Button>

                        <Typography sx={{ mt: 3, textAlign: 'center', color: 'text.secondary', fontSize: '0.85rem', fontWeight: 500 }}>
                            Proceeding will notify vendors to prepare your official quote
                        </Typography>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default CartPage;
