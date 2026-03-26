import { 
    Box
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../../store';
import { removeItem, clearCart, updateQuantity } from '../../store/slices/cartSlice';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { useNavigate } from 'react-router-dom';
import CartList from '../../components/Cart/CartList';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { success, info } = useSnackbar();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const subtotal = cartItems.reduce((acc, item) => {
        return acc + (item.numericPrice * item.quantity);
    }, 0);

    const handleRemove = (id: string, name: string) => {
        dispatch(removeItem(id));
        info(`${name} removed from cart`);
    };

    const handleIncrement = (id: string) => {
        const item = cartItems.find(i => i.id === id);
        if (item) {
            dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
        }
    };

    const handleDecrement = (id: string) => {
        const item = cartItems.find(i => i.id === id);
        if (item && item.quantity > 1) {
            dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
        }
    };

    const handleCheckout = () => {
        success('Booking request submitted successfully!');
        dispatch(clearCart());
        navigate('/client-dashboard');
    };

    return (
        <Box sx={{ py: 4 }}>
            <CartList 
                items={cartItems.map(item => ({
                    ...item,
                    description: item.category || '', // Mapping category to description for the card
                    onIncrement: () => handleIncrement(item.id),
                    onDecrement: () => handleDecrement(item.id),
                    onRemove: () => handleRemove(item.id, item.name)
                }))}
                subtotal={subtotal}
                total={subtotal} // In this implementation, total == subtotal (fees are free)
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onRemove={handleRemove}
                onCheckout={handleCheckout}
                onExplore={() => navigate('/products')}
            />
        </Box>
    );
};

export default CartPage;
