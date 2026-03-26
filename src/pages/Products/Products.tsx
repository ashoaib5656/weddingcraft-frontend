import {
    Box,
    Typography,
    Grid
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../store/slices/cartSlice';
import { type RootState } from '../../store';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from '../../contexts/SnackbarContext';
import Product from '../../components/Product/Product';

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

const mockProducts: any[] = [
    {
        id: '1',
        name: 'Royal Heritage Banquet',
        category: 'Venue',
        price: '₹2,50,000 / day',
        numericPrice: 250000,
        rating: 4.8,
        reviews: 124,
        badge: 'Popular',
        image: '/assets/products/minimal_product_showcase_4k_1774508739394.png'
    },
    {
        id: '2',
        name: 'Elite Catering Protocol',
        category: 'Catering',
        price: '₹1,500 / plate',
        numericPrice: 1500,
        rating: 4.9,
        reviews: 89,
        badge: 'New',
        image: '/assets/products/lifestyle_product_elegant_4k_1774508758859.png'
    },
    {
        id: '3',
        name: 'Cinematic Visuals (4K)',
        category: 'Photography',
        price: '₹1,20,000 / event',
        numericPrice: 120000,
        rating: 4.7,
        reviews: 56,
        image: '/assets/products/closeup_texture_premium_4k_1774508774359.png'
    },
    {
        id: '4',
        name: 'Floral Design AI',
        category: 'Decor',
        price: '₹85,000 / theme',
        numericPrice: 85000,
        rating: 4.9,
        reviews: 210,
        image: '/assets/products/ui_style_mock_presentation_4k_1774508791055.png'
    },
];

const ProductsPage = () => {
    const theme = useTheme();
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
        <Box sx={{ p: 0, maxWidth: 1600, margin: '0 auto' }}>
            <Typography 
                variant="h4" 
                sx={{ 
                    fontWeight: 900, 
                    mb: 5, 
                    letterSpacing: '-0.02em',
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                }}
            >
                Premium Vendors
            </Typography>
            <Grid container spacing={4}>
                {mockProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Product
                            id={product.id}
                            title={product.name}
                            subtitle={product.category}
                            price={product.price}
                            image={product.image}
                            badge={product.badge}
                            onAction={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductsPage;
