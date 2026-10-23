import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { needs, shortName } from '@/data/products';
import { formatPrice } from '@/data/site';
import AddToCartButton from '@/components/cart/AddToCartButton';

const needLabel = Object.fromEntries(needs.map((n) => [n.id, n.label]));
const sizeLabel = (p) => p.size ?? (p.need === 'sets' ? 'Set' : '');

export function ProductCard({ product, className, priority = false }) {
    const href = `/product/${product.id}`;
    return (
        <article className={cn('group flex flex-col gap-3', className)}>
            <Link
                to={href}
                className="relative block aspect-[4/5] overflow-hidden rounded-md bg-shea-deep"
                aria-label={`${product.name}, ${formatPrice(product.price, product.currency)}`}
            >
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    loading={priority ? 'eager' : 'lazy'}
                    decoding="async"
                    className="size-full object-cover object-[50%_62%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute left-2.5 top-2.5 rounded-full bg-paper/90 px-2.5 py-1 eyebrow text-indigo-deep backdrop-blur-sm">
                    {needLabel[product.need]}
                </span>
                {!product.inStock && (
                    <span className="absolute right-2.5 top-2.5 rounded-full bg-indigo-deep px-2.5 py-1 eyebrow text-shea">Sold out</span>
                )}
            </Link>

            <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-lg leading-tight text-indigo-deep md:text-xl">
                    <Link to={href} className="hover:underline hover:decoration-1 hover:underline-offset-4">
                        {shortName(product)}
                    </Link>
                </h3>
                <div className="flex items-baseline justify-between gap-2 font-mono">
                    <span className="text-xs uppercase tracking-wider text-ink-soft">{sizeLabel(product)}</span>
                    <span className="whitespace-nowrap text-sm text-indigo">{formatPrice(product.price, product.currency)}</span>
                </div>
            </div>

            <AddToCartButton product={product} variant="outline" className="min-h-10 w-full px-3 text-xs" />
        </article>
    );
}
