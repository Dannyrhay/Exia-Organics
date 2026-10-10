import { useEffect, useRef, useState } from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/cart/cart-context';

const variants = {
    solid: 'bg-indigo text-shea hover:bg-indigo-deep',
    outline: 'text-indigo ring-1 ring-indigo/40 hover:bg-indigo hover:text-shea',
    light: 'bg-shea text-indigo-deep hover:bg-paper',
};

/**
 * Adds `product` × `qty` to the cart and confirms in place ("Added"), without
 * pulling the shopper away from the page. `openCart` also slides the cart open.
 */
export default function AddToCartButton({ product, qty = 1, variant = 'solid', openCart = false, className, children = 'Add to cart' }) {
    const { add, open } = useCart();
    const [added, setAdded] = useState(false);
    const timer = useRef();

    useEffect(() => () => clearTimeout(timer.current), []);

    const onClick = () => {
        add(product, qty);
        if (openCart) open();
        setAdded(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setAdded(false), 1600);
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors',
                variants[variant],
                added && 'bg-leaf text-shea ring-leaf hover:bg-leaf',
                className,
            )}
        >
            {added ? <Check className="size-4 shrink-0" aria-hidden="true" /> : <ShoppingBag className="size-4 shrink-0" aria-hidden="true" />}
            {added ? 'Added' : children}
        </button>
    );
}
