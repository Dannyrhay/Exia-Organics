import { Link } from 'react-router-dom';
import { isBundle, products, SHOP_TEXT, shortName } from '@/data/products';
import SectionHeading from '@/components/brand/SectionHeading';
import AddToCartButton from '@/components/cart/AddToCartButton';
import Reveal from '@/components/brand/Reveal';
import Price from '@/components/ui/Price';

// Products in the category ticked "This is the sets / bundles category" in the dashboard.
const sets = products.filter(isBundle);
const text = SHOP_TEXT.home.sets ?? {};

export default function Rituals() {
    if (sets.length === 0) return null;
    return (
        <section className="bg-indigo-deep py-20 text-shea md:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading tone="light" eyebrow={text.eyebrow} title={text.title} accent={text.accent}>
                    {text.text}
                </SectionHeading>

                <div className="mt-12 grid gap-6 lg:grid-cols-3">
                    {sets.map((set, i) => (
                        <Reveal key={set.id} delay={i * 0.08} className="flex flex-col overflow-hidden rounded-md bg-shea/[0.06] ring-1 ring-shea/10 sm:flex-row lg:flex-col">
                            <Link to={`/product/${set.id}`} className="group relative block aspect-[4/3] shrink-0 overflow-hidden bg-shea-deep sm:aspect-auto sm:min-h-64 sm:w-2/5 lg:aspect-[4/3] lg:min-h-0 lg:w-full">
                                <img
                                    src={set.imageUrl}
                                    alt=""
                                    loading="lazy"
                                    className="size-full object-cover object-[50%_66%] transition-transform duration-700 group-hover:scale-[1.04] sm:absolute sm:inset-0 lg:static"
                                />
                            </Link>
                            <div className="flex flex-1 flex-col gap-4 p-5">
                                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                                    <h3 className="font-display text-2xl">
                                        <Link to={`/product/${set.id}`} className="hover:text-lid">{shortName(set)}</Link>
                                    </h3>
                                    <Price product={set} className="font-mono text-sm text-lid" saleClassName="text-lid" />
                                </div>
                                <p className="text-sm leading-relaxed text-shea/70">{set.description}</p>
                                <AddToCartButton product={set} variant="light" className="mt-auto w-full">
                                    Add set to cart
                                </AddToCartButton>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
