import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ABOUT } from '@/data/about';
import { fillPlaceholders } from '@/data/site';
import { useSeo } from '@/lib/seo';
import Markdown from '@/components/ui/Markdown';
import SectionHeading from '@/components/brand/SectionHeading';
import WhatsAppBand from '@/components/home/WhatsAppBand';
import about800 from '@/assets/about-lineup-800.webp';
import about1600 from '@/assets/about-lineup-1600.webp';

// Wording and photo are edited under "About us" in the dashboard (/admin).
// Until a photo is uploaded there, the built-in range shot is used, in two sizes.
const photo = ABOUT.photo
    ? { src: ABOUT.photo }
    : { src: about1600, srcSet: `${about800} 800w, ${about1600} 1600w`, sizes: '(min-width: 1024px) 50vw, 100vw' };

const AboutPage = () => {
    useSeo({ title: 'Our story', description: ABOUT.seoDescription });
    return (
    <>
        <section className="pb-20 pt-12 md:pt-16">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:items-end lg:px-8">
                <div className="lg:col-span-6">
                    <SectionHeading as="h1" eyebrow={ABOUT.eyebrow} title={ABOUT.title} accent={ABOUT.accent} />
                    <Markdown
                        prose={false}
                        className="mt-8 flex max-w-xl flex-col gap-5 text-base leading-relaxed text-ink-soft md:text-lg [&_a]:text-indigo [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-semibold [&_strong]:text-indigo-deep"
                    >
                        {fillPlaceholders(ABOUT.body)}
                    </Markdown>
                    <Link to="/products" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-indigo px-6 text-sm font-semibold text-shea hover:bg-indigo-deep">
                        Shop the collection <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                </div>
                <div className="lg:col-span-6">
                    <img
                        {...photo}
                        alt={ABOUT.photoAlt ?? ''}
                        className="aspect-[4/5] w-full rounded-md bg-shea-deep object-cover object-[50%_88%]"
                    />
                </div>
            </div>
        </section>

        {ABOUT.promises.length > 0 && (
            <section className="border-t border-line bg-paper py-20 md:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeading eyebrow="What we promise" title={ABOUT.promisesTitle} accent={ABOUT.promisesAccent} />
                    <ul className="mt-12 grid gap-px overflow-hidden rounded-md bg-line sm:grid-cols-2 lg:grid-cols-4">
                        {ABOUT.promises.map((p) => (
                            <li key={p.title} className="flex flex-col gap-3 bg-paper p-6">
                                <h2 className="font-display text-2xl text-indigo-deep">{p.title}</h2>
                                <p className="text-sm leading-relaxed text-ink-soft">{p.body}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        )}

        <WhatsAppBand />
    </>
    );
};

export default AboutPage;
