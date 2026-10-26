import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { needs, products, SHOP_TEXT, withCount } from '@/data/products';
import SectionHeading from '@/components/brand/SectionHeading';
import Reveal from '@/components/brand/Reveal';

const text = SHOP_TEXT.home.categories ?? {};
// One tile per category with at least one photographed product; sets have their own section.
const tiles = needs
    .filter((n) => !n.bundle)
    .map((n) => ({
        ...n,
        cover: products.find((p) => p.need === n.id && p.imageUrl),
        count: products.filter((p) => p.need === n.id).length,
    }))
    .filter((t) => t.cover);

export default function ShopByNeed() {
    if (tiles.length === 0) return null;
    return (
        <section className="border-y border-line bg-paper py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading eyebrow={text.eyebrow} title={text.title} accent={text.accent}>
                    {withCount(text.text)}
                </SectionHeading>

                <ul className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-6">
                    {tiles.map((t, i) => (
                        <Reveal as="li" key={t.id} delay={i * 0.06} className="w-[72%] shrink-0 snap-start sm:w-auto">
                            <Link to={`/products?need=${t.id}`} className="group flex flex-col gap-4">
                                <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-shea-deep">
                                    <img
                                        src={t.cover.imageUrl}
                                        alt=""
                                        loading="lazy"
                                        className="size-full object-cover object-[50%_66%] transition-transform duration-700 group-hover:scale-[1.05]"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-indigo-deep/85 via-indigo-deep/40 to-transparent p-4 pt-16">
                                        <h3 className="flex items-center justify-between font-display text-3xl text-shea">
                                            {t.label}
                                            <ArrowUpRight className="size-6 text-lid transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex items-baseline justify-between gap-3">
                                    <p className="text-sm text-ink-soft">{t.blurb}</p>
                                    <p className="whitespace-nowrap font-mono text-xs uppercase tracking-wider text-wood">
                                        {t.count} {t.count === 1 ? 'item' : 'items'}
                                    </p>
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </ul>
            </div>
        </section>
    );
}
