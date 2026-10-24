import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
import { useCart } from '@/cart/cart-context';
import { shortName } from '@/data/products';
import { formatPrice, SITE } from '@/data/site';
import { useOverlay } from '@/lib/useOverlay';
import QuantityStepper from './QuantityStepper';

const ease = [0.22, 1, 0.36, 1];

export default function CartDrawer() {
    const { lines, count, subtotal, setQty, remove, isOpen, close } = useCart();
    const reduce = useReducedMotion();
    useOverlay(isOpen, close);

    // Portalled to <body> so no ancestor's transform/backdrop-filter can trap the fixed panel.
    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50">
                    <motion.div
                        aria-hidden="true"
                        className="absolute inset-0 bg-indigo-deep/50 backdrop-blur-[2px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                    />
                    <motion.aside
                        id="cart-drawer"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="cart-title"
                        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-shea pb-[env(safe-area-inset-bottom)] shadow-2xl"
                        initial={reduce ? { opacity: 0 } : { x: 48, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { x: 48, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                    >
                        <header className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
                            <h2 id="cart-title" className="font-display text-2xl text-indigo-deep">
                                Your cart <span className="font-mono text-sm text-ink-soft">({count})</span>
                            </h2>
                            <button
                                type="button"
                                onClick={close}
                                aria-label="Close cart"
                                className="inline-flex size-11 items-center justify-center rounded-full text-indigo-deep hover:bg-shea-deep"
                            >
                                <X className="size-6" aria-hidden="true" />
                            </button>
                        </header>

                        {lines.length === 0 ? (
                            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                                <p className="font-display text-3xl text-indigo-deep">
                                    Your cart is <em className="italic text-indigo">empty.</em>
                                </p>
                                <p className="text-sm text-ink-soft">Start with what your hair needs.</p>
                                <Link
                                    to="/products"
                                    onClick={close}
                                    className="mt-2 inline-flex min-h-12 items-center gap-2 rounded-full bg-indigo px-6 text-sm font-semibold text-shea hover:bg-indigo-deep"
                                >
                                    Browse the shop <ArrowRight className="size-4" aria-hidden="true" />
                                </Link>
                            </div>
                        ) : (
                            <>
                                <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
                                    {lines.map(({ product, qty, lineTotal }) => (
                                        <li key={product.id} className="grid grid-cols-[72px_1fr] gap-4 py-5">
                                            <Link to={`/product/${product.id}`} onClick={close} className="block overflow-hidden rounded-sm bg-shea-deep">
                                                <img src={product.imageUrl} alt="" className="aspect-[4/5] w-full object-cover object-[50%_72%]" />
                                            </Link>
                                            <div className="flex min-w-0 flex-col gap-2">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <Link to={`/product/${product.id}`} onClick={close} className="font-display text-lg leading-tight text-indigo-deep hover:underline hover:underline-offset-4">
                                                            {shortName(product)}
                                                        </Link>
                                                        <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
                                                            {product.size ?? 'Set'} · {formatPrice(product.price)}{product.onSale ? ' · Sale' : ''}
                                                        </p>
                                                    </div>
                                                    <p className="whitespace-nowrap font-mono text-sm text-indigo">{formatPrice(lineTotal)}</p>
                                                </div>
                                                <div className="flex items-center justify-between gap-3">
                                                    <QuantityStepper size="sm" label={product.name} value={qty} onChange={(q) => setQty(product.id, q)} />
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(product.id)}
                                                        className="min-h-9 px-1 text-xs text-ink-soft underline underline-offset-4 hover:text-indigo"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <footer className="shrink-0 border-t border-line bg-paper px-5 py-5">
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-sm text-ink-soft">Subtotal</span>
                                        <span className="font-mono text-xl text-indigo-deep">{formatPrice(subtotal)}</span>
                                    </div>
                                    <p className="mt-1 text-xs text-ink-soft">{SITE.deliveryZones.length ? 'Delivery is added at checkout.' : SITE.deliveryNote}</p>
                                    <Link
                                        to="/checkout"
                                        onClick={close}
                                        className="mt-4 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-indigo text-base font-semibold text-shea hover:bg-indigo-deep"
                                    >
                                        Checkout <ArrowRight className="size-4" aria-hidden="true" />
                                    </Link>
                                    <p className="mt-3 text-center text-xs text-ink-soft">Pay with Mobile Money · {SITE.momo.networks}</p>
                                </footer>
                            </>
                        )}
                    </motion.aside>
                </div>
            )}
        </AnimatePresence>,
        document.body,
    );
}
