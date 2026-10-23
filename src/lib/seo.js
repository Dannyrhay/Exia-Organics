import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE } from '@/data/site';

const SUFFIX = 'Exia Organics';
const DEFAULT_DESCRIPTION =
    'Herbal shampoos, conditioners, growth butter and repair oils handcrafted in Ghana for natural and textured hair. Order online and pay with Mobile Money.';

/** The live origin: the build-time site URL if known, otherwise wherever the page is served from. */
export const siteOrigin = () => import.meta.env.VITE_SITE_URL || window.location.origin;

/** Turns a bundled asset path ("/assets/x.webp") into an absolute URL for crawlers and link previews. */
export const absoluteUrl = (pathOrUrl) => (/^https?:/.test(pathOrUrl) ? pathOrUrl : siteOrigin() + pathOrUrl);

// Create-or-update a <meta>/<link> in <head>, so tags from index.html are reused rather than duplicated.
function upsert(tag, keyAttr, keyValue, attrs) {
    let el = document.head.querySelector(`${tag}[${keyAttr}="${keyValue}"]`);
    if (!el) {
        el = document.createElement(tag);
        el.setAttribute(keyAttr, keyValue);
        document.head.appendChild(el);
    }
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}

/**
 * Sets the page's title, description, canonical URL and social-preview tags.
 * `title` is the page's own title; the brand is appended unless it is the home page.
 */
export function useSeo({ title, description = DEFAULT_DESCRIPTION, image = '/og-image.jpg', type = 'website', noindex = false } = {}) {
    const { pathname } = useLocation();

    useEffect(() => {
        const fullTitle = title ? `${title} | ${SUFFIX}` : `${SUFFIX} · Natural haircare from Ghana`;
        const url = siteOrigin() + pathname;
        const img = absoluteUrl(image);

        document.title = fullTitle;
        upsert('meta', 'name', 'description', { content: description });
        upsert('meta', 'name', 'robots', { content: noindex ? 'noindex, follow' : 'index, follow' });
        upsert('link', 'rel', 'canonical', { href: url });

        upsert('meta', 'property', 'og:type', { content: type });
        upsert('meta', 'property', 'og:site_name', { content: SITE.name });
        upsert('meta', 'property', 'og:title', { content: fullTitle });
        upsert('meta', 'property', 'og:description', { content: description });
        upsert('meta', 'property', 'og:url', { content: url });
        upsert('meta', 'property', 'og:image', { content: img });
        upsert('meta', 'name', 'twitter:card', { content: 'summary_large_image' });
        upsert('meta', 'name', 'twitter:title', { content: fullTitle });
        upsert('meta', 'name', 'twitter:description', { content: description });
        upsert('meta', 'name', 'twitter:image', { content: img });
    }, [title, description, image, type, noindex, pathname]);
}

/** The business itself, for the home page's structured data. */
export const organizationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    name: SITE.name,
    url: siteOrigin(),
    logo: absoluteUrl('/apple-touch-icon.png'),
    image: absoluteUrl('/og-image.jpg'),
    description: DEFAULT_DESCRIPTION,
    email: SITE.email,
    telephone: SITE.phoneHref,
    foundingDate: '2020',
    address: { '@type': 'PostalAddress', addressCountry: 'GH' },
    areaServed: { '@type': 'Country', name: 'Ghana' },
    currenciesAccepted: 'GHS',
    paymentAccepted: 'Mobile Money',
});

export const breadcrumbSchema = (items) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: siteOrigin() + item.path,
    })),
});
