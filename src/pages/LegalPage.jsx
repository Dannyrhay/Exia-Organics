import { Link } from 'react-router-dom';
import privacy from '/content/legal/privacy.json';
import terms from '/content/legal/terms.json';
import { fillPlaceholders } from '@/data/site';
import Markdown from '@/components/ui/Markdown';
import SectionHeading from '@/components/brand/SectionHeading';
import { useSeo } from '@/lib/seo';

// Edited under "Site → Privacy policy" and "Site → Terms & conditions" in the dashboard (/admin).
// Bodies are Markdown and may use {email}, {phone}, {hours}, {momoNumber}, {momoName}, {momoNetworks}.
const DOCS = {
    privacy: { ...privacy, path: '/privacy', other: { label: 'Terms & conditions', path: '/terms' } },
    terms: { ...terms, path: '/terms', other: { label: 'Privacy policy', path: '/privacy' } },
};

const dateLabel = (iso) =>
    iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : null;

/** The privacy policy or the terms, depending on `doc`. */
export default function LegalPage({ doc }) {
    const page = DOCS[doc];
    const updated = dateLabel(page.updated);
    useSeo({ title: page.title, description: page.summary });

    return (
        <section className="pb-24 pt-12 md:pt-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
                <SectionHeading as="h1" eyebrow="Legal" title={page.title} />
                {updated && (
                    <p className="mt-4 font-mono text-sm text-ink-soft">
                        Last updated <time dateTime={page.updated}>{updated}</time>
                    </p>
                )}
                <Markdown className="mt-10">{fillPlaceholders(page.body)}</Markdown>
                <p className="mt-16 border-t border-line pt-6 text-ink-soft">
                    See also our{' '}
                    <Link to={page.other.path} className="text-indigo underline underline-offset-4">
                        {page.other.label.toLowerCase()}
                    </Link>
                    .
                </p>
            </div>
        </section>
    );
}
