import { testimonials } from '../data/testimonials';
import SectionHeading from '@/components/brand/SectionHeading';
import WhatsAppBand from '@/components/home/WhatsAppBand';
import { useSeo } from '@/lib/seo';

// CSS columns give a masonry flow that reflows from 1 to 3 columns with no JS.
const TestimonialsPage = () => {
    useSeo({ title: 'Customer reviews', description: 'What customers say about Exia Organics herbal shampoos, conditioners, growth butter and repair oils.' });
    return (
    <>
        <section className="pb-24 pt-12 md:pt-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading as="h1" eyebrow="Reviews" title="In their" accent="own words.">
                    What customers say after a few wash days with Exia.
                </SectionHeading>

                <ul className="mt-12 gap-5 [column-fill:_balance] sm:columns-2 lg:columns-3">
                    {testimonials.map((t) => (
                        <li key={`${t.name}-${t.username}`} className="mb-5 break-inside-avoid">
                            <figure className="flex flex-col gap-5 rounded-md bg-paper p-6 ring-1 ring-line">
                                <blockquote className="font-display text-xl leading-snug text-indigo-deep">
                                    “{t.body}”
                                </blockquote>
                                <figcaption className="flex items-center gap-3">
                                    <img src={t.img} alt="" loading="lazy" className="size-10 shrink-0 rounded-full bg-shea-deep object-cover" />
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-ink">{t.name}</p>
                                        <p className="truncate font-mono text-xs uppercase tracking-wider text-wood">
                                            {t.username}{t.country ? ` · ${t.country}` : ''}
                                        </p>
                                    </div>
                                </figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
        <WhatsAppBand />
    </>
    );
};

export default TestimonialsPage;
