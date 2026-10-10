import { useState } from 'react';
import { Check, Copy, Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SocialIcon, WhatsAppIcon } from '@/components/icons/SocialIcons';
import { SITE, whatsappUrl } from '@/data/site';
import SectionHeading from '@/components/brand/SectionHeading';
import WhatsAppButton from '@/components/brand/WhatsAppButton';

function CopyButton({ value, label }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
        } catch {
            return; // clipboard blocked (e.g. insecure context); the text stays selectable
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? `${label} copied` : `Copy ${label}`}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-indigo hover:bg-shea-deep"
        >
            {copied ? <Check className="size-4 text-leaf" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        </button>
    );
}

function ContactRow({ icon: Icon, label, value, href, note }) {
    return (
        <li className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 border-b border-line py-6 sm:gap-x-4">
            <Icon className="size-5 self-start text-wood sm:mt-1" strokeWidth={1.5} aria-hidden="true" />
            <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-wood">{label}</p>
                <a href={href} className="mt-1 block [overflow-wrap:anywhere] font-display text-xl text-indigo-deep hover:underline hover:decoration-1 hover:underline-offset-4 min-[400px]:text-2xl sm:text-3xl">
                    {value.includes('@') ? <>{value.split('@')[0]}<wbr />@{value.split('@')[1]}</> : value}
                </a>
                <p className="mt-1 text-sm text-ink-soft">{note}</p>
            </div>
            <CopyButton value={value} label={label.toLowerCase()} />
        </li>
    );
}

function ContactPage() {
    const socials = [{ key: 'whatsapp', href: whatsappUrl(), label: 'WhatsApp' }, ...SITE.socials];

    return (
        <section className="pb-24 pt-12 md:pt-16">
            <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
                <div className="flex flex-col gap-8 lg:col-span-5">
                    <SectionHeading as="h1" eyebrow="Contact" title="We'd love to" accent="hear from you.">
                        Questions about a product, your hair, or a wholesale order? WhatsApp is the fastest way to reach us.
                    </SectionHeading>
                    <WhatsAppButton className="min-h-13 self-start px-7 text-base">Chat on WhatsApp</WhatsAppButton>
                </div>

                <div className="lg:col-span-7">
                    <ul className="border-t border-line">
                        <ContactRow icon={Phone} label="Phone" value={SITE.phoneDisplay} href={`tel:${SITE.phoneHref}`} note={SITE.hours} />
                        <ContactRow icon={Mail} label="Email" value={SITE.email} href={`mailto:${SITE.email}`} note="We reply within 24 hours." />
                    </ul>

                    <div className="mt-10">
                        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-wood">Follow along</p>
                        <ul className="mt-4 flex flex-wrap gap-3">
                            {socials.map((s) => (
                                <li key={s.key}>
                                    <a
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            'inline-flex min-h-11 items-center gap-2 rounded-full bg-paper px-5 text-sm font-medium text-ink ring-1 ring-line transition-colors hover:ring-indigo/40',
                                        )}
                                    >
                                        {s.key === 'whatsapp' ? <WhatsAppIcon className="size-4" /> : <SocialIcon name={s.key} className="size-4" />}
                                        {s.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactPage;
