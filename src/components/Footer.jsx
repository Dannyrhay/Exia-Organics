import { Link } from 'react-router-dom';
import { SITE, whatsappUrl } from '@/data/site';
import { needs } from '@/data/products';
import { SocialIcon, WhatsAppIcon } from '@/components/icons/SocialIcons';
import { BrandMark } from './Navbar';

const columns = [
    {
        label: 'Shop',
        links: needs.map((n) => ({ title: n.label, href: `/products?need=${n.id}` })),
    },
    {
        label: 'Exia',
        links: [
            { title: 'Our story', href: '/about' },
            { title: 'Journal', href: '/blog' },
            { title: 'Reviews', href: '/testimonials' },
            { title: 'FAQs', href: '/faqs' },
            { title: 'Contact', href: '/contact' },
        ],
    },
    {
        label: 'Legal',
        links: [
            { title: 'Privacy policy', href: 'https://www.termsfeed.com/live/60c05952-43e8-4527-9671-1873f70a2e78' },
            { title: 'Terms of service', href: 'https://www.termsfeed.com/live/2292d25e-373a-4125-95ce-594ce6f112f3' },
        ],
    },
];

const linkClass = 'inline-block py-1.5 text-sm text-shea/75 transition-colors hover:text-lid';

const Footer = () => (
    <footer className="bg-indigo-deep text-shea">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1.2fr_2fr] lg:px-8">
            <div className="flex flex-col gap-6">
                <BrandMark tone="light" />
                <p className="max-w-xs font-display text-2xl leading-snug text-shea/90">
                    Herbal care for natural crowns, <em className="italic text-lid">made in Ghana.</em>
                </p>
                <div className="flex flex-col items-start font-mono text-xs text-shea/60">
                    <a href={`mailto:${SITE.email}`} className="py-1.5 hover:text-lid">{SITE.email}</a>
                    <a href={`tel:${SITE.phoneHref}`} className="py-1.5 hover:text-lid">{SITE.phoneDisplay}</a>
                    <span className="py-1.5">{SITE.hours}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
                {columns.map((col) => (
                    <nav key={col.label} aria-label={col.label} className="flex flex-col gap-4">
                        <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-lid">{col.label}</h2>
                        <ul className="flex flex-col gap-0.5">
                            {col.links.map((link) => (
                                <li key={link.title}>
                                    {link.href.startsWith('/') ? (
                                        <Link to={link.href} className={linkClass}>{link.title}</Link>
                                    ) : (
                                        <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                                            {link.title}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                ))}
            </div>
        </div>

        <div className="border-t border-shea/10">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
                <p className="font-mono text-[11px] text-shea/50">© {new Date().getFullYear()} {SITE.name}</p>
                <ul className="flex items-center gap-1">
                    <li>
                        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                            className="inline-flex size-11 items-center justify-center rounded-full text-shea/70 hover:bg-shea/10 hover:text-lid">
                            <WhatsAppIcon className="size-5" />
                        </a>
                    </li>
                    {SITE.socials.map((s) => (
                            <li key={s.key}>
                                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                                    className="inline-flex size-11 items-center justify-center rounded-full text-shea/70 hover:bg-shea/10 hover:text-lid">
                                    <SocialIcon name={s.key} className="size-5" />
                                </a>
                            </li>
                    ))}
                </ul>
            </div>
        </div>
    </footer>
);

export default Footer;
