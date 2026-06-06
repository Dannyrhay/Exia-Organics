import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
    Check,
    Copy,
    Mail,
    Phone,
    FacebookIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SnapchatIcon, TikTokIcon, WhatsAppIcon } from '@/components/icons/SocialIcons';

const APP_EMAIL = 'exiaorganics@gmail.com';
const APP_PHONE = '+233 (591604923)';

function ContactPage() {
    const socialLinks = [
        {
            icon: FacebookIcon,
            href: 'https://facebook.com',
            label: 'Facebook',
        },
        {
            icon: TikTokIcon,
            href: 'https://tiktok.com',
            label: 'TikTok',
        },
        {
            icon: SnapchatIcon,
            href: 'https://snapchat.com',
            label: 'Snapchat',
        },
        {
            icon: WhatsAppIcon,
            href: 'https://whatsapp.com',
            label: 'WhatsApp',
        },
    ];

    return (
        <div className="min-h-screen w-full bg-white relative overflow-hidden">
            <div className="mx-auto h-full max-w-6xl lg:border-x border-[#f0eadd]">
                <div
                    aria-hidden
                    className="absolute inset-0 isolate -z-10 opacity-60 contain-strict pointer-events-none"
                >
                    <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(30,20%,90%,0.6)_0,hsla(30,20%,95%,0.1)_50%,transparent_80%)] absolute top-0 left-0 h-[320px] w-[140px] -translate-y-[87.5px] -rotate-45 rounded-full" />
                </div>

                <div className="flex grow flex-col justify-center px-4 md:px-6 pt-32 pb-16 text-center">
                    <h1 className="text-4xl font-bold md:text-5xl font-serif text-[#1e3a5f]">
                        Contact Us
                    </h1>
                    <p className="text-[#3a2e20]/70 mb-5 text-base mt-4 font-sans max-w-lg mx-auto">
                        We'd love to hear from you. Whether you have a question about our products, a partnership proposal, or just want to say hello.
                    </p>
                </div>

                <BorderSeparator />

                <div className="grid md:grid-cols-2">
                    <Box
                        icon={Mail}
                        title="Email"
                        description="We respond to all emails within 24 hours."
                        className="md:border-r border-[#f0eadd]"
                    >
                        <a
                            href={`mailto:${APP_EMAIL}`}
                            className="font-mono text-base font-medium tracking-wide hover:underline text-[#1e4b78]"
                        >
                            {APP_EMAIL}
                        </a>
                        <CopyButton className="size-6 text-[#1e4b78]" test={APP_EMAIL} />
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
                                    href={`tel:${APP_PHONE}`}
                                    className="block font-mono text-base font-medium tracking-wide hover:underline text-[#1e4b78]"
                                >
                                    {APP_PHONE}
                                </a>
                                <CopyButton className="size-6 text-[#1e4b78]" test={APP_PHONE} />
                            </div>
                        </div>
                    </Box>
                </div>

                <BorderSeparator />

                <div className="relative flex h-full min-h-[320px] items-center justify-center bg-[#fcfbf9]">
                    <div className="relative z-1 space-y-6 p-8 text-center">
                        <h2 className="text-center text-3xl font-bold md:text-4xl font-serif text-[#1e3a5f]">
                            Find us online
                        </h2>
                        <p className="text-[#3a2e20]/60">Follow our journey on social media</p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white hover:bg-[#f0eadd] transition-colors flex items-center gap-x-2 rounded-full border border-[#f0eadd] px-6 py-3 shadow-sm group"
                                >
                                    <link.icon className="size-5 text-[#3a2e20] group-hover:text-[#1e3a5f]" />
                                    <span className="font-sans text-sm font-medium tracking-wide text-[#3a2e20] group-hover:text-[#1e3a5f]">
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
    return <div className="h-px w-full bg-[#f0eadd]" />;
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
                'flex flex-col justify-between border-b md:border-b-0 border-[#f0eadd]',
                className,
            )}
        >
            <div className="bg-[#faf9f6] flex items-center gap-x-3 border-b border-[#f0eadd] p-4">
                <Icon className="text-[#1e3a5f] size-5" strokeWidth={1.5} />
                <h2 className="font-serif text-lg font-medium tracking-wider text-[#1e3a5f]">
                    {title}
                </h2>
            </div>
            <div className="flex items-center gap-x-2 p-8 py-12 justify-center">{children}</div>
            <div className="border-t border-[#f0eadd] p-4 bg-white">
                <p className="text-[#3a2e20]/60 text-sm text-center">{description}</p>
            </div>
        </div>
    );
}

function CopyButtonIcon({ copied }) {
    return (
        <>
            <div className={cn('transition-all', copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0')}>
                <Check className="size-3.5 stroke-emerald-500" aria-hidden="true" />
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
        await navigator.clipboard.writeText(test);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <Button
            variant={variant}
            size={size}
            className={cn('disabled:opacity-100 hover:bg-[#f0eadd]', className)}
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
