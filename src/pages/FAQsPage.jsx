import { useId, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import faqData from '/content/faqs.json';
import { fillPlaceholders } from '@/data/site';
import Markdown from '@/components/ui/Markdown';
import SectionHeading from '@/components/brand/SectionHeading';
import WhatsAppBand from '@/components/home/WhatsAppBand';
import JsonLd from '@/components/seo/JsonLd';
import { useSeo } from '@/lib/seo';

// Questions and answers are edited under "Site → FAQs" in the dashboard (/admin).
// Answers are Markdown and may use {momoNumber}, {momoName}, {momoNetworks}, {phone}, {hours}.
const faqs = (faqData.items ?? [])
    .filter((f) => f.question && f.answer)
    .map((f) => {
        const answer = fillPlaceholders(f.answer);
        // Plain text for search engines: drop Markdown links/emphasis, keep the words.
        const plain = answer.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`#>]/g, '').trim();
        return { question: f.question, answer, plain };
    });

function FaqItem({ faq, open, onToggle }) {
    const id = useId();
    const reduce = useReducedMotion();
    return (
        <li className="border-b border-line">
            <h2>
                <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={id}
                    onClick={onToggle}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                    <span className="font-display text-xl leading-snug text-indigo-deep md:text-2xl">{faq.question}</span>
                    <Plus className={cn('size-5 shrink-0 text-wood transition-transform duration-300', open && 'rotate-45')} aria-hidden="true" />
                </button>
            </h2>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={id}
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <Markdown prose={false} className="max-w-prose pb-6 leading-relaxed text-ink-soft [&_a]:text-indigo [&_a]:underline [&_a]:underline-offset-4 [&_p+p]:mt-3">{faq.answer}</Markdown>
                    </motion.div>
                )}
            </AnimatePresence>
        </li>
    );
}

const FAQsPage = () => {
    const [openIndex, setOpenIndex] = useState(0);
    useSeo({ title: 'FAQs: ordering, delivery and payment', description: 'How to order from Exia Organics, delivery, Mobile Money payment, ingredients and which product suits your hair.' });

    return (
        <>
            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.plain } })),
                }}
            />
            <section className="pb-24 pt-12 md:pt-16">
                <div className="mx-auto max-w-3xl px-4 sm:px-6">
                    <SectionHeading as="h1" eyebrow="FAQs" title="Questions," accent="answered." />
                    <ul className="mt-12 border-t border-line">
                        {faqs.map((faq, i) => (
                            <FaqItem key={faq.question} faq={faq} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
                        ))}
                    </ul>
                </div>
            </section>
            <WhatsAppBand />
        </>
    );
};

export default FAQsPage;
