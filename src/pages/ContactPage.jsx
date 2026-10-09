import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, Copy, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SocialIcon } from '@/components/icons/SocialIcons';
import { SITE, whatsappUrl } from '@/data/site';

const APP_EMAIL = SITE.email;
const APP_PHONE = SITE.phoneDisplay;

function ContactPage() {
    const socialLinks = [
        { key: 'whatsapp', href: whatsappUrl(), label: 'WhatsApp' },
        ...SITE.socials,
    ];

    return (
        <div className="min-h-screen w-full bg-paper relative overflow-hidden">
            <div className="mx-auto h-full max-w-6xl lg:border-x border-line">
                <div
                    aria-hidden
                    className="absolute inset-0 isolate -z-10 opacity-60 contain-strict pointer-events-none"
                >
                    <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(30,20%,90%,0.6)_0,hsla(30,20%,95%,0.1)_50%,transparent_80%)] absolute top-0 left-0 h-[320px] w-[140px] -translate-y-[87.5px] -rotate-45 rounded-full" />
                </div>

                <div className="flex grow flex-col justify-center px-4 md:px-6 pt-12 pb-16 md:pt-16 text-center">
                    <h1 className="text-4xl font-bold md:text-5xl font-serif text-indigo-deep">
                        Contact Us
                    </h1>
                    <p className="text-ink/70 mb-5 text-base mt-4 font-sans max-w-lg mx-auto">
                        We'd love to hear from you. Whether you have a question about our products, a partnership proposal, or just want to say hello.
                    </p>
                </div>

                <BorderSeparator />

                <div className="grid md:grid-cols-2">
                    <Box
                        icon={Mail}
                        title="Email"
                        description="We respond to all emails within 24 hours."
                        className="md:border-r border-line"
                    >
                        <a
                            href={`mailto:${APP_EMAIL}`}
                            className="font-mono text-base font-medium tracking-wide hover:underline text-indigo"
                        >
                            {APP_EMAIL}
                        </a>
                        <CopyButton className="size-6 text-indigo" test={APP_EMAIL} />
                    </Box>

                    <Box
                        icon={Phone}
                        title="Phone"
                        description="We're available Mon-Fri, 9am-5pm."
                        className="border-b-0"
                    >
                        <div>
                            <div className="flex items-center gap-x-2">
                                <a
                                    href={`tel:${SITE.phoneHref}`}
                                    className="block font-mono text-base font-medium tracking-wide hover:underline text-indigo"
                                >
                                    {APP_PHONE}
                                </a>
                                <CopyButton className="size-6 text-indigo" test={APP_PHONE} />
                            </div>
                        </div>
                    </Box>
                </div>

                <BorderSeparator />

                <div className="relative flex h-full min-h-[320px] items-center justify-center bg-paper">
                    <div className="relative z-1 space-y-6 p-8 text-center">
                        <h2 className="text-center text-3xl font-bold md:text-4xl font-serif text-indigo-deep">
                            Find us online
                        </h2>
                        <p className="text-ink/60">Follow our journey on social media</p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-paper hover:bg-line transition-colors flex items-center gap-x-2 rounded-full border border-line px-6 py-3 shadow-sm group"
                                >
                                    <SocialIcon name={link.key} className="size-5 text-ink group-hover:text-indigo-deep" />
                                    <span className="font-sans text-sm font-medium tracking-wide text-ink group-hover:text-indigo-deep">
                                        {link.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BorderSeparator() {
    return <div className="h-px w-full bg-line" />;
}

function Box({
    title,
    description,
    className,
    icon: Icon,
    children,
}) {
    return (
        <div
            className={cn(
                'flex flex-col justify-between border-b md:border-b-0 border-line',
                className,
            )}
        >
            <div className="bg-paper flex items-center gap-x-3 border-b border-line p-4">
                <Icon className="text-indigo-deep size-5" strokeWidth={1.5} />
                <h2 className="font-serif text-lg font-medium tracking-wider text-indigo-deep">
                    {title}
                </h2>
            </div>
            <div className="flex items-center gap-x-2 p-8 py-12 justify-center">{children}</div>
            <div className="border-t border-line p-4 bg-paper">
                <p className="text-ink/60 text-sm text-center">{description}</p>
            </div>
        </div>
    );
}

function CopyButtonIcon({ copied }) {
    return (
        <>
            <div className={cn('transition-all', copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0')}>
                <Check className="size-3.5 stroke-leaf" aria-hidden="true" />
            </div>
            <div className={cn('absolute transition-all', copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100')}>
                <Copy aria-hidden="true" className="size-3.5" />
            </div>
        </>
    );
}

function CopyButton({ className, variant = 'ghost', size = 'icon', test, ...props }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(test);
        } catch {
            return; // clipboard blocked (e.g. insecure context); the text stays selectable
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <Button
            variant={variant}
            size={size}
            className={cn('disabled:opacity-100 hover:bg-line', className)}
            onClick={handleCopy}
            aria-label={copied ? 'Copied' : 'Copy to clipboard'}
            disabled={copied || props.disabled}
            {...props}
        >
            <CopyButtonIcon copied={copied} />
        </Button>
    );
}

export default ContactPage;
