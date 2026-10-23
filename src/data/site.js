// Brand contact details, MoMo and delivery settings. The values live in
// content/settings.json and are edited under "Site" in the admin dashboard (/admin).
import settings from '/content/settings.json';

const SOCIAL_LABELS = { facebook: 'Facebook', tiktok: 'TikTok', snapchat: 'Snapchat', instagram: 'Instagram', youtube: 'YouTube', x: 'X' };
const digits = (s = '') => String(s).replace(/\D/g, '');
const slugify = (s = '') => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const SITE = {
    name: 'Exia Organics',
    email: settings.email,
    // Display format, plus the forms tel: links and WhatsApp's wa.me links need.
    phoneDisplay: settings.phoneDisplay,
    phoneHref: `+${digits(settings.phoneDisplay)}`,
    whatsappNumber: digits(settings.whatsappNumber),
    hours: settings.hours,
    socials: (settings.socials ?? [])
        .filter((s) => s.url)
        .map((s) => ({ key: s.platform, label: SOCIAL_LABELS[s.platform] ?? s.platform, href: s.url })),

    // Where customers send Mobile Money at checkout.
    momo: settings.momo,

    // Fixed delivery zones with fees. While the list is empty, customers type their
    // area at checkout and the fee is agreed on WhatsApp.
    deliveryZones: (settings.deliveryZones ?? [])
        .filter((z) => z.label)
        .map((z) => ({ id: slugify(z.label), label: z.label, fee: Number(z.fee) || 0 })),
    deliveryNote: settings.deliveryNote,
};

/** Fills {momoNumber}-style placeholders in admin-written text with the current settings. */
export const fillPlaceholders = (text = '') =>
    text.replace(/\{(\w+)\}/g, (match, key) => {
        const values = {
            momoNumber: SITE.momo.number,
            momoName: SITE.momo.accountName,
            momoNetworks: SITE.momo.networks,
            phone: SITE.phoneDisplay,
            hours: SITE.hours,
            email: SITE.email,
        };
        return values[key] ?? match;
    });

export const formatPrice = (amount, currency = 'GHS') =>
    `${currency} ${Number(amount).toLocaleString('en-GH')}`;

/**
 * Pre-filled text for a WhatsApp question about `product` (or a general enquiry).
 * Orders themselves go through the cart; see src/cart/order.js.
 */
export function buildOrderMessage(product) {
    if (!product) return 'Hi Exia Organics, I have a question about your products.';
    return `Hi Exia Organics, I have a question about the ${product.name}.`;
}

/** wa.me link that opens a chat with Exia, pre-filled with `text`. */
export const whatsappTextUrl = (text) => `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const whatsappUrl = (product) => whatsappTextUrl(buildOrderMessage(product));

// Brand promises, as already stated across the site. Keep this list honest.
export const promises = [
    { title: 'Herbal formulas', body: 'Plant extracts and butters do the work. Every product is built around them.' },
    { title: 'Nothing harsh', body: 'No parabens, sulfates or synthetic fragrances, so hair keeps its natural oils.' },
    { title: 'Cruelty-free', body: 'Nothing we make is ever tested on animals.' },
    { title: 'Made in Ghana', body: 'Handcrafted at home, for the hair and climate we know best.' },
];
