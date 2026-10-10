import { Link } from 'react-router-dom';
import { products, shortName } from '@/data/products';
import { formatPrice } from '@/data/site';
import SectionHeading from '@/components/brand/SectionHeading';
import WhatsAppButton from '@/components/brand/WhatsAppButton';
import Reveal from '@/components/brand/Reveal';

const sets = products.filter((p) => p.need === 'sets');

export default function Rituals() {
    return (
        <section className="bg-indigo-deep py-20 text-shea md:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading tone="light" eyebrow="Sets" title="Whole routines," accent="bundled.">
                    Each set pairs products that work together, so you can order a full routine in one go.
                </SectionHeading>

                <div className="mt-12 grid gap-6 lg:grid-cols-3">
                    {sets.map((set, i) => (
                        <Reveal key={set.id} delay={i * 0.08} className="flex flex-col overflow-hidden rounded-md bg-shea/[0.06] ring-1 ring-shea/10 sm:flex-row lg:flex-col">
                            <Link to={`/product/${set.id}`} className="group relative block aspect-[4/3] shrink-0 overflow-hidden bg-shea-deep sm:aspect-auto sm:min-h-64 sm:w-2/5 lg:aspect-[4/3] lg:min-h-0 lg:w-full">
                                <img
                                    src={set.imageUrl}
                                    alt=""
                                    loading="lazy"
                                    className="size-full object-cover object-[50%_70%] transition-transform duration-700 group-hover:scale-[1.04] sm:absolute sm:inset-0 lg:static"
                                />
                            </Link>
                            <div className="flex flex-1 flex-col gap-4 p-5">
                                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                                    <h3 className="font-display text-2xl">
                                        <Link to={`/product/${set.id}`} className="hover:text-lid">{shortName(set)}</Link>
                                    </h3>
                                    <p className="whitespace-nowrap font-mono text-sm text-lid">{formatPrice(set.price, set.currency)}</p>
                                </div>
                                <p className="text-sm leading-relaxed text-shea/70">{set.description}</p>
                                <WhatsAppButton product={set} variant="light" className="mt-auto w-full">
                                    Order this set
                                </WhatsAppButton>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
