import {
    Box,
    Typography,
    Grid,
    CardMedia,
    Button,
    Rating,
    Chip,
    IconButton
} from '@mui/material';
import {
    Favorite as FavoriteIcon,
    ShoppingCart as CartIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../store/slices/cartSlice';
import { type RootState } from '../../store';
import { useSnackbar } from '../../contexts/SnackbarContext';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';

interface Product {
    id: string;
    name: string;
    category: string;
    price: string;
    numericPrice: number;
    rating: number;
    reviews: number;
    image: string;
}

const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Royal Heritage Banquet',
        category: 'Venue',
        price: '₹2,50,000 / day',
        numericPrice: 250000,
        rating: 4.8,
        reviews: 124,
        image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: '2',
        name: 'Elite Catering Protocol',
        category: 'Catering',
        price: '₹1,500 / plate',
        numericPrice: 1500,
        rating: 4.9,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: '3',
        name: 'Cinematic Visuals (4K)',
        category: 'Photography',
        price: '₹1,20,000 / event',
        numericPrice: 120000,
        rating: 4.7,
        reviews: 56,
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: '4',
        name: 'Floral Design AI',
        category: 'Decor',
        price: '₹85,000 / theme',
        numericPrice: 85000,
        rating: 4.9,
        reviews: 210,
        image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800'
    },
];

const ProductsPage = () => {
    const dispatch = useDispatch();
    const { success, info } = useSnackbar();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const handleAddToCart = (product: Product) => {
        const isAlreadyInCart = cartItems.some(item => item.id === product.id);
        if (isAlreadyInCart) {
            info(`${product.name} is already in your cart!`);
            return;
        }
        dispatch(addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            numericPrice: product.numericPrice,
            image: product.image,
            type: 'product',
            category: product.category
        }));
        success(`${product.name} added to your cart!`);
    };

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <DashboardHeader
                title="Solutions Catalog"
                subtitle="Explore premium services and assets for your wedding protocol"
            />

            <Grid container spacing={3} sx={{ mt: 1 }}>
                {mockProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <DashboardCard sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            <Box sx={{ position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.image}
                                    alt={product.name}
                                />
                                <Chip
                                    label={product.category}
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 12,
                                        right: 12,
                                        bgcolor: 'rgba(255,255,255,0.9)',
                                        backdropFilter: 'blur(4px)',
                                        fontWeight: 800,
                                        color: 'primary.main',
                                        borderRadius: 1.5
                                    }}
                                />
                            </Box>

                            <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1.2 }}>
                                        {product.name}
                                    </Typography>
                                    <IconButton size="small" sx={{ color: 'error.light', p: 0.5 }}>
                                        <FavoriteIcon fontSize="small" />
                                    </IconButton>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
                                    <Rating value={product.rating} precision={0.1} size="small" readOnly />
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                        ({product.reviews})
                                    </Typography>
                                </Box>

                                <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 800, mb: 2 }}>
                                    {product.price}
                                </Typography>

                                <Box sx={{ mt: 'auto', display: 'flex', gap: 1 }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        size="small"
                                        startIcon={<CartIcon />}
                                        onClick={() => handleAddToCart(product)}
                                        sx={{
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            bgcolor: 'primary.main',
                                            boxShadow: 'none',
                                            '&:hover': { bgcolor: 'primary.dark', boxShadow: 'none' }
                                        }}
                                    >
                                        Quick Book
                                    </Button>
                                </Box>
                            </Box>
                        </DashboardCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductsPage;
