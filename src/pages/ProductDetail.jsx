import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { needs, products, shortName } from '@/data/products';
import { formatPrice, SITE, whatsappUrl } from '@/data/site';
import { ProductCard } from '@/components/ui/ProductCard';
import { useCart } from '@/cart/cart-context';
import AddToCartButton from '@/components/cart/AddToCartButton';
import QuantityStepper from '@/components/cart/QuantityStepper';
import NotFoundPage from './NotFoundPage';

const orderSteps = [
    'Add it to your cart and check out with your delivery details.',
    'Send the total by Mobile Money using the order reference shown.',
    'We confirm your payment on WhatsApp and send your order.',
];

/** Quantity + add/buy actions. Its own component so its state sits after ProductDetail's early return. */
function ProductPurchase({ product }) {
    const [qty, setQty] = useState(1);
    const { add } = useCart();
    const navigate = useNavigate();

    const buyNow = () => {
        add(product, qty);
        navigate('/checkout');
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
                <QuantityStepper label={product.name} value={qty} onChange={setQty} />
                <AddToCartButton product={product} qty={qty} openCart className="min-h-12 flex-1 px-6 text-base sm:flex-none" />
            </div>
            <button
                type="button"
                onClick={buyNow}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-base font-semibold text-indigo ring-1 ring-indigo/40 hover:bg-indigo hover:text-shea sm:w-auto sm:self-start"
            >
                Buy now <ArrowRight className="size-4" aria-hidden="true" />
            </button>
            <p className="text-sm text-ink-soft">
                Pay with Mobile Money at checkout. Questions first?{' '}
                <a href={whatsappUrl(product)} target="_blank" rel="noopener noreferrer" className="text-indigo underline underline-offset-4">
                    Ask about this product
                </a>{' '}
                or call {SITE.phoneDisplay}.
            </p>
        </div>
    );
}

export default function ProductDetail() {
    const { id } = useParams();
    const product = products.find((p) => p.id === Number(id));
    if (!product) return <NotFoundPage title="We couldn't find that product." />;

    const need = needs.find((n) => n.id === product.need);
    const related = products.filter((p) => p.need === product.need && p.id !== product.id).slice(0, 4);

    return (
        <div className="pb-24 pt-8 md:pt-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <nav aria-label="Breadcrumb">
                    <ol className="flex flex-wrap items-center gap-1 font-mono text-xs uppercase tracking-wider text-ink-soft">
                        <li className="flex items-center gap-1">
                            <Link to="/" className="inline-block py-2 hover:text-indigo">Home</Link>
                            <ChevronRight className="size-3.5" aria-hidden="true" />
                        </li>
                        <li className="flex items-center gap-1">
                            <Link to="/products" className="inline-block py-2 hover:text-indigo">Shop</Link>
                            <ChevronRight className="size-3.5" aria-hidden="true" />
                        </li>
                        <li><Link to={`/products?need=${need.id}`} className="inline-block py-2 hover:text-indigo">{need.label}</Link></li>
                    </ol>
                </nav>

                <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
                    <div className="lg:col-span-6">
                        <div className="overflow-hidden rounded-md bg-shea-deep lg:sticky lg:top-24">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                fetchPriority="high"
                                className="aspect-[4/5] w-full object-cover object-[50%_70%]"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 lg:col-span-6 lg:pt-4">
                        <div className="flex flex-col gap-4">
                            <p className="eyebrow text-wood">
                                {need.label}{product.size ? ` · ${product.size}` : ''}
                            </p>
                            <h1 className="font-display text-[clamp(2.4rem,7vw,4rem)] leading-[1] tracking-[-0.01em] text-indigo-deep">
                                {shortName(product)}
                            </h1>
                            <p className="font-display text-xl italic text-indigo">{product.tagline}</p>
                        </div>

                        <p className="font-mono text-2xl text-indigo-deep">{formatPrice(product.price, product.currency)}</p>

                        <ProductPurchase product={product} />

                        <div className="border-t border-line pt-8">
                            <h2 className="eyebrow text-wood">About this product</h2>
                            <p className="mt-4 max-w-prose text-base leading-relaxed text-ink md:text-lg">{product.description}</p>
                            <ul className="mt-5 flex flex-wrap gap-2">
                                {product.tags.map((t) => (
                                    <li key={t.label} className="rounded-full bg-paper px-3 py-1 text-xs text-ink-soft ring-1 ring-line">{t.label}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-md bg-paper p-6 ring-1 ring-line">
                            <h2 className="font-display text-2xl text-indigo-deep">How ordering works</h2>
                            <ol className="mt-5 flex flex-col gap-4">
                                {orderSteps.map((step, i) => (
                                    <li key={step} className="grid grid-cols-[2rem_1fr] items-baseline gap-3">
                                        <span className="font-mono text-sm text-wood">{i + 1}.</span>
                                        <span className="text-sm leading-relaxed text-ink">{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>

                {related.length > 0 && (
                    <section className="mt-24 border-t border-line pt-14">
                        <h2 className="font-display text-3xl text-indigo-deep md:text-4xl">
                            More for <em className="italic text-indigo">{need.label.toLowerCase()}</em>
                        </h2>
                        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
                            {related.map((p) => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
