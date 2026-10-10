import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ui/ProductCard';
import SectionHeading from '@/components/brand/SectionHeading';
import Reveal from '@/components/brand/Reveal';

const picks = [5, 1, 9, 7].map((id) => products.find((p) => p.id === id));

export default function Bestsellers() {
    return (
        <section className="py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <SectionHeading eyebrow="Most ordered" title="The everyday" accent="essentials." />
                    <Link to="/products" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-indigo hover:underline hover:underline-offset-4 md:self-auto">
                        All {products.length} products <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
                    {picks.map((product, i) => (
                        <Reveal key={product.id} delay={i * 0.06}>
                            <ProductCard product={product} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
