import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MAX_QTY } from '@/cart/cart-context';

/** − qty + control. `min` is 1 for a quantity picker, 0 when reaching zero should remove the line. */
export default function QuantityStepper({ value, onChange, label, min = 1, size = 'md', className }) {
    const btn = cn(
        'inline-flex items-center justify-center rounded-full text-indigo-deep transition-colors hover:bg-shea-deep disabled:opacity-35 disabled:hover:bg-transparent',
        size === 'sm' ? 'size-9' : 'size-11',
    );
    return (
        <div className={cn('inline-flex items-center rounded-full bg-paper ring-1 ring-line', className)} role="group" aria-label={`Quantity for ${label}`}>
            <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Decrease quantity of ${label}`}>
                <Minus className="size-4" aria-hidden="true" />
            </button>
            <span className={cn('min-w-7 text-center font-mono tabular-nums text-ink', size === 'sm' ? 'text-sm' : 'text-base')} aria-live="polite">
                {value}
            </span>
            <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= MAX_QTY} aria-label={`Increase quantity of ${label}`}>
                <Plus className="size-4" aria-hidden="true" />
            </button>
        </div>
    );
}
