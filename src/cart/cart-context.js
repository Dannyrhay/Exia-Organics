import { createContext, useContext } from 'react';

export const CartContext = createContext(null);

export const MAX_QTY = 20;

/** Cart state and actions. Must be used inside <CartProvider>. */
export function useCart() {
    const cart = useContext(CartContext);
    if (!cart) throw new Error('useCart must be used inside <CartProvider>');
    return cart;
}
