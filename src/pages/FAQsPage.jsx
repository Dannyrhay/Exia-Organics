import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE } from '@/data/site';
import SectionHeading from '@/components/brand/SectionHeading';
import WhatsAppBand from '@/components/home/WhatsAppBand';

// TODO(Danny): confirm delivery areas, payment methods and the returns policy.
const faqs = [
    {
        question: 'How do I place an order?',
        answer: (
            <>
                Add products to your cart and go to checkout. Enter your delivery details, send the total by Mobile Money with the order
                reference we show you, then type in your MoMo transaction ID. We'll confirm on WhatsApp once your payment arrives.
            </>
        ),
    },
    {
        question: 'Do you deliver?',
        answer: <>Yes. Send your location on WhatsApp and we'll confirm the delivery fee and timing before you pay.</>,
    },
    {
        question: 'Which product is right for my hair?',
        answer: (
            <>
                Start with the concern that sounds most like you in the <Link to="/products" className="text-indigo underline underline-offset-4">shop</Link>{' '}
                (scalp care, growth, moisture or repair), or message us and we'll suggest a routine.
            </>
        ),
    },
    {
        question: "What's in your products?",
        answer: <>Our formulas are built around herbal extracts and natural butters, and are free from parabens, sulfates and synthetic fragrances.</>,
    },
    {
        question: 'How do I pay?',
        answer: (
            <>
                By Mobile Money ({SITE.momo.networks}) to {SITE.momo.number}, account name {SITE.momo.accountName}. Use your order reference as the
                payment note so we can match it. We will never ask for your MoMo PIN.
            </>
        ),
    },
    {
        question: 'Something is wrong with my order. What now?',
        answer: <>Message us on WhatsApp or call {SITE.phoneDisplay} ({SITE.hours}) and we'll put it right.</>,
    },
];

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
                        <p className="max-w-prose pb-6 leading-relaxed text-ink-soft">{faq.answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </li>
    );
}

const FAQsPage = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <>
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
