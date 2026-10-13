import { useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { needs, products } from '@/data/products';
import { ProductCard } from '@/components/ui/ProductCard';
import SectionHeading from '@/components/brand/SectionHeading';

const filters = [{ id: 'all', label: 'All' }, ...needs];

export default function ProductsPage() {
    const [params, setParams] = useSearchParams();
    const active = filters.some((f) => f.id === params.get('need')) ? params.get('need') : 'all';
    const shown = active === 'all' ? products : products.filter((p) => p.need === active);
    const activeNeed = needs.find((n) => n.id === active);

    const select = (id) => setParams(id === 'all' ? {} : { need: id }, { replace: true });

    return (
        <div className="pb-24 pt-12 md:pt-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading as="h1" eyebrow="Shop" title="The" accent="collection.">
                    {activeNeed ? activeNeed.blurb + '.' : 'Herbal haircare for natural and textured hair. Every order goes through WhatsApp.'}
                </SectionHeading>

                <div
                    role="group"
                    aria-label="Filter by concern"
                    className="sticky top-16 z-30 -mx-4 mt-10 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-b border-line bg-shea/95 px-4 py-3 backdrop-blur-md sm:mx-0 sm:px-0"
                >
                    {filters.map((f) => {
                        const count = f.id === 'all' ? products.length : products.filter((p) => p.need === f.id).length;
                        const isActive = f.id === active;
                        return (
                            <button
                                key={f.id}
                                type="button"
                                aria-pressed={isActive}
                                onClick={() => select(f.id)}
                                className={cn(
                                    'inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors',
                                    isActive ? 'bg-indigo text-shea' : 'bg-paper text-ink ring-1 ring-line hover:ring-indigo/40',
                                )}
                            >
                                {f.label}
                                <span className={cn('font-mono text-xs', isActive ? 'text-lid' : 'text-ink-soft')}>{count}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
                    {shown.map((product, i) => (
                        <ProductCard key={product.id} product={product} priority={i < 4} />
                    ))}
                </div>
            </div>
        </div>
    );
}
