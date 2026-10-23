import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSeo } from '@/lib/seo';

export default function NotFoundPage({ title = "This page doesn't exist." }) {
    useSeo({ title: 'Page not found', noindex: true });
    return (
        <section className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-start justify-center gap-6 px-4 py-20 sm:px-6">
            <p className="eyebrow text-wood">404</p>
            <h1 className="font-display text-[clamp(2.4rem,7vw,4rem)] leading-[1.02] text-indigo-deep">
                {title} <em className="italic text-indigo">Let's get you back.</em>
            </h1>
            <div className="flex flex-wrap gap-3">
                <Link to="/products" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-indigo px-6 text-sm font-semibold text-shea hover:bg-indigo-deep">
                    Browse the shop <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link to="/" className="inline-flex min-h-12 items-center rounded-full px-6 text-sm font-semibold text-indigo ring-1 ring-indigo/30 hover:ring-indigo">
                    Go home
                </Link>
            </div>
        </section>
    );
}
