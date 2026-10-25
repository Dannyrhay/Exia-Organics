import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/brand/Reveal';
import { ABOUT, splitQuote } from '@/data/about';

// Edited under "About us → Home page teaser" in the dashboard (/admin).
const quote = splitQuote(ABOUT.home?.quote, ABOUT.home?.highlight);

export default function Story() {
    return (
        <section className="py-20 md:py-32">
            <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
                <Reveal className="lg:col-span-7">
                    <p className="eyebrow text-wood">Our story</p>
                    <blockquote className="mt-6 font-display text-[clamp(2rem,5.4vw,3.4rem)] leading-[1.08] tracking-[-0.01em] text-indigo-deep">
                        “{quote.before}
                        {quote.word && <em className="italic text-indigo">{quote.word}</em>}
                        {quote.after}”
                    </blockquote>
                    {ABOUT.home?.text && <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">{ABOUT.home.text}</p>}
                    <Link to="/about" className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-indigo hover:underline hover:underline-offset-4">
                        Read our story <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                </Reveal>

                <ul className="grid gap-px self-end overflow-hidden rounded-md bg-line sm:grid-cols-2 lg:col-span-5">
                    {ABOUT.promises.map((p) => (
                        <li key={p.title} className="flex flex-col gap-2 bg-shea p-5">
                            <h3 className="font-display text-xl text-indigo-deep">{p.title}</h3>
                            <p className="text-sm leading-relaxed text-ink-soft">{p.body}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
