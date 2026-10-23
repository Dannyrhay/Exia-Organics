import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { promises } from '@/data/site';
import { useSeo } from '@/lib/seo';
import SectionHeading from '@/components/brand/SectionHeading';
import WhatsAppBand from '@/components/home/WhatsAppBand';
import about800 from '@/assets/about-lineup-800.webp';
import about1600 from '@/assets/about-lineup-1600.webp';

const AboutPage = () => {
    useSeo({
        title: 'Our story',
        description: 'Exia Organics makes herbal haircare by hand in Ghana for natural and textured hair, rooted in nature and grounded in care since 2020.',
    });
    return (
    <>
        <section className="pb-20 pt-12 md:pt-16">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:items-end lg:px-8">
                <div className="lg:col-span-6">
                    <SectionHeading as="h1" eyebrow="Our story · Est. 2020" title="Rooted in nature," accent="grounded in care." />
                    <div className="mt-8 flex max-w-xl flex-col gap-5 text-base leading-relaxed text-ink-soft md:text-lg">
                        <p>
                            Exia Organics began with a simple question: why should we choose between nature and results? We set out to make
                            haircare that respects both, drawing on herbal traditions and refining each formula until it earns its place on the shelf.
                        </p>
                        <p>
                            Every product is handcrafted in Ghana for natural and textured hair, from the anti-dandruff herbal shampoo to the growth
                            butter in its wood-grain jar. You order here, pay by Mobile Money, and can reach us on WhatsApp before, during and after your order.
                        </p>
                    </div>
                    <Link to="/products" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-indigo px-6 text-sm font-semibold text-shea hover:bg-indigo-deep">
                        Shop the collection <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                </div>
                <div className="lg:col-span-6">
                    <img
                        src={about1600}
                        srcSet={`${about800} 800w, ${about1600} 1600w`}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        alt="The full Exia Organics range on a wooden table."
                        className="aspect-[4/5] w-full rounded-md bg-shea-deep object-cover object-[50%_88%]"
                    />
                </div>
            </div>
        </section>

        <section className="border-t border-line bg-paper py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading eyebrow="What we promise" title="Four things we" accent="won't compromise on." />
                <ul className="mt-12 grid gap-px overflow-hidden rounded-md bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {promises.map((p) => (
                        <li key={p.title} className="flex flex-col gap-3 bg-paper p-6">
                            <h2 className="font-display text-2xl text-indigo-deep">{p.title}</h2>
                            <p className="text-sm leading-relaxed text-ink-soft">{p.body}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>

        <WhatsAppBand />
    </>
    );
};

export default AboutPage;
