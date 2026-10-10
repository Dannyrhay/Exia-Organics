import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/cart/cart-context';

export default function CartButton() {
    const { count, open, isOpen } = useCart();
    return (
        <button
            type="button"
            onClick={open}
            aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}
            aria-expanded={isOpen}
            aria-controls="cart-drawer"
            className="relative inline-flex size-11 items-center justify-center rounded-full text-indigo-deep hover:bg-shea-deep"
        >
            <ShoppingBag className="size-6" aria-hidden="true" />
            {count > 0 && (
                <span className="absolute right-0.5 top-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-wood px-1 font-mono text-[11px] leading-5 text-shea">
                    {count}
                </span>
            )}
        </button>
    );
}
