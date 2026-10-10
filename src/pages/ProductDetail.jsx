import { Link, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { needs, products, shortName } from '@/data/products';
import { formatPrice, SITE } from '@/data/site';
import { ProductCard } from '@/components/ui/ProductCard';
import WhatsAppButton from '@/components/brand/WhatsAppButton';
import NotFoundPage from './NotFoundPage';

const orderSteps = [
    'Tap “Order on WhatsApp”. Your message is written for you.',
    'We confirm price, stock and delivery in the chat.',
    'Pay as agreed and your order is on its way.',
];

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
                    <ol className="flex flex-wrap items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
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
                            <p className="font-mono text-xs uppercase tracking-[0.18em] text-wood">
                                {need.label}{product.size ? ` · ${product.size}` : ''}
                            </p>
                            <h1 className="font-display text-[clamp(2.4rem,7vw,4rem)] leading-[1] tracking-[-0.01em] text-indigo-deep">
                                {shortName(product)}
                            </h1>
                            <p className="font-display text-xl italic text-indigo">{product.tagline}</p>
                        </div>

                        <p className="font-mono text-2xl text-indigo-deep">{formatPrice(product.price, product.currency)}</p>

                        <div className="flex flex-col gap-3">
                            <WhatsAppButton product={product} className="min-h-13 w-full text-base sm:w-auto sm:self-start sm:px-8" />
                            <p className="text-sm text-ink-soft">
                                Questions first? Call <a href={`tel:${SITE.phoneHref}`} className="text-indigo underline underline-offset-4">{SITE.phoneDisplay}</a>, {SITE.hours}.
                            </p>
                        </div>

                        <div className="border-t border-line pt-8">
                            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-wood">About this product</h2>
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
