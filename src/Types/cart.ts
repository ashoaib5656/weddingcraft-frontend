import type { Vendor } from './vendor';

export interface CartItem {
    id: string; // Unified ID (maps to vendorId)
    vendorId: string;
    name: string; // Unified name (maps to vendorName)
    vendorName: string;
    image: string;
    priceRange: string;
    numericPrice: number; // For subtotal calculations
    sectorId: string;
    category?: string; // For display on cards
    description?: string; // One-line summary
    quantity: number;
    type: 'general' | 'catering';
}

export interface CartContextType {
    items: CartItem[];
    addToCart: (vendor: Vendor, quantity?: number) => void;
    removeFromCart: (vendorId: string) => void;
    updateQuantity: (vendorId: string, quantity: number) => void;
    clearCart: () => void;
    isItemInCart: (vendorId: string) => boolean;
}
