import { cn } from '@/lib/utils';
import { formatPrice } from '@/data/site';

/**
 * A product's price. During a sale it shows the sale price next to the regular
 * price struck through, with "Was"/"Now" for screen readers.
 */
export default function Price({ product, className, saleClassName = 'text-wood', compareClassName }) {
    if (!product.onSale) {
        return <span className={cn('whitespace-nowrap', className)}>{formatPrice(product.price, product.currency)}</span>;
    }
    return (
        <span className={cn('inline-flex flex-wrap items-baseline gap-x-2 whitespace-nowrap', className)}>
            <s className={cn('decoration-1 opacity-60', compareClassName)}>
                <span className="sr-only">Was </span>
                {formatPrice(product.compareAtPrice, product.currency)}
            </s>
            <span className={saleClassName}>
                <span className="sr-only">Now </span>
                {formatPrice(product.price, product.currency)}
            </span>
        </span>
    );
}
