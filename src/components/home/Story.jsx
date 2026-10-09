import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/brand/Reveal';
import { promises } from '@/data/site';

export default function Story() {
    return (
        <section className="py-20 md:py-32">
            <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
                <Reveal className="lg:col-span-7">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-wood">Our story</p>
                    <blockquote className="mt-6 font-display text-[clamp(2rem,5.4vw,3.4rem)] leading-[1.08] tracking-[-0.01em] text-indigo-deep">
                        “Why should we choose between <em className="italic text-indigo">nature</em> and results?”
                    </blockquote>
                    <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
                        Exia Organics started with that question. We pair herbal traditions with careful formulation to make haircare that is gentle
                        enough for every wash day and strong enough to show results.
                    </p>
                    <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo hover:underline hover:underline-offset-4">
                        Read our story <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                </Reveal>

                <ul className="grid gap-px self-end overflow-hidden rounded-md bg-line sm:grid-cols-2 lg:col-span-5">
                    {promises.map((p) => (
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
