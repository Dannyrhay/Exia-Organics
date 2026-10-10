import { useCallback, useEffect, useMemo, useState } from 'react';
import { products } from '@/data/products';
import { CartContext, MAX_QTY } from './cart-context';

// The cart lives in this browser only: no accounts, no server.
const STORAGE_KEY = 'exia-cart-v1';

const clampQty = (qty) => Math.max(0, Math.min(MAX_QTY, Math.floor(Number(qty) || 0)));

function loadItems() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
        if (!Array.isArray(saved)) return [];
        // Drop anything that no longer exists in the catalogue.
        return saved
            .map((i) => ({ id: Number(i.id), qty: clampQty(i.qty) }))
            .filter((i) => i.qty > 0 && products.some((p) => p.id === i.id));
    } catch {
        return [];
    }
}

export default function CartProvider({ children }) {
    const [items, setItems] = useState(loadItems);
    const [isOpen, setIsOpen] = useState(false);
    const [announcement, setAnnouncement] = useState('');

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {
            // storage blocked (private mode): the cart still works for this visit
        }
    }, [items]);

    // Keep several open tabs in step.
    useEffect(() => {
        const onStorage = (e) => e.key === STORAGE_KEY && setItems(loadItems());
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const add = useCallback((product, qty = 1) => {
        setItems((cur) => {
            const existing = cur.find((i) => i.id === product.id);
            if (existing) return cur.map((i) => (i.id === product.id ? { ...i, qty: clampQty(i.qty + qty) } : i));
            return [...cur, { id: product.id, qty: clampQty(qty) }];
        });
        setAnnouncement(`${product.name} added to your cart.`);
    }, []);

    const setQty = useCallback((id, qty) => {
        const next = clampQty(qty);
        setItems((cur) => (next === 0 ? cur.filter((i) => i.id !== id) : cur.map((i) => (i.id === id ? { ...i, qty: next } : i))));
    }, []);

    const remove = useCallback((id) => setItems((cur) => cur.filter((i) => i.id !== id)), []);
    const clear = useCallback(() => setItems([]), []);
    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    const value = useMemo(() => {
        const lines = items
            .map((i) => ({ ...i, product: products.find((p) => p.id === i.id) }))
            .filter((l) => l.product)
            .map((l) => ({ ...l, lineTotal: l.qty * l.product.price }));
        return {
            lines,
            count: lines.reduce((n, l) => n + l.qty, 0),
            subtotal: lines.reduce((sum, l) => sum + l.lineTotal, 0),
            add, setQty, remove, clear,
            isOpen, open, close,
        };
    }, [items, add, setQty, remove, clear, isOpen, open, close]);

    return (
        <CartContext.Provider value={value}>
            {children}
            <p className="sr-only" aria-live="polite">{announcement}</p>
        </CartContext.Provider>
    );
}
