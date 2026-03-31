import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Vendor } from '../Types/vendor';
import type { CartItem, CartContextType } from '../Types/cart';
import { useSnackbar } from './SnackbarContext';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

/**
 * Utility to extract a base numeric price from a range string (e.g., "$1,200 - $5,000" -> 1200)
 */
const extractNumericPrice = (priceRange: string): number => {
    if (!priceRange) return 0;
    // Remove symbols, commas, and white-space, then get the first number
    const match = priceRange.replace(/[,₹$]/g, '').match(/\d+/);
    const val = match ? parseInt(match[0], 10) : 0;
    return isNaN(val) ? 0 : val;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('wedding_craft_cart');
        if (!saved) return [];
        try {
            const parsed = JSON.parse(saved);
            // Re-validate and ensure numericPrice exists for migration safety
            return parsed.map((item: any) => ({
                ...item,
                numericPrice: item.numericPrice || extractNumericPrice(item.priceRange || '')
            }));
        } catch (e) {
            return [];
        }
    });
    
    const { warning, success, info } = useSnackbar();

    useEffect(() => {
        localStorage.setItem('wedding_craft_cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (vendor: Vendor, quantity: number = 1) => {
        const isCatering = vendor.sectorId.toLowerCase() === 'catering';
        const existingItem = items.find(item => item.vendorId === vendor.id);

        if (existingItem) {
            const prevQty = existingItem.quantity;
            const newQty = prevQty + quantity;
            const unit = isCatering ? 'plates' : 'items';

            if (isCatering) {
                // Update quantity for catering
                setItems(prev => prev.map(item => 
                    item.vendorId === vendor.id ? { ...item, quantity: newQty } : item
                ));
                success(`${vendor.name}: ${prevQty} → ${newQty} ${unit}`);
            } else {
                // Already added for general
                warning(`${vendor.name} is already in your booking list`);
            }
            return;
        }

        const newItem: CartItem = {
            id: vendor.id, // Unified ID for UI
            vendorId: vendor.id,
            name: vendor.name, // Unified name for UI
            vendorName: vendor.name,
            image: vendor.image,
            priceRange: vendor.priceRange,
            numericPrice: extractNumericPrice(vendor.priceRange),
            sectorId: vendor.sectorId,
            category: vendor.sectorId, // Mapping sector to category for display
            description: vendor.description,
            quantity: quantity,
            type: isCatering ? 'catering' : 'general'
        };

        setItems(prev => [...prev, newItem]);
        success(`${vendor.name} added to cart`);
    };

    const removeFromCart = (vendorId: string) => {
        setItems(prev => prev.filter(item => item.vendorId !== vendorId));
        info('Item removed from cart');
    };

    const updateQuantity = (vendorId: string, quantity: number) => {
        const item = items.find(i => i.vendorId === vendorId);
        if (!item) return;

        const prevQty = item.quantity;
        const unit = item.type === 'catering' ? 'plates' : 'items';

        setItems(prev => prev.map(item => 
            item.vendorId === vendorId ? { ...item, quantity } : item
        ));
        
        if (prevQty !== quantity) {
            info(`${item.vendorName}: ${prevQty} → ${quantity} ${unit}`);
        }
    };

    const clearCart = () => {
        setItems([]);
        localStorage.removeItem('wedding_craft_cart');
    };

    const isItemInCart = (vendorId: string) => {
        return items.some(item => item.vendorId === vendorId);
    };

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, isItemInCart }}>
            {children}
        </CartContext.Provider>
    );
};
