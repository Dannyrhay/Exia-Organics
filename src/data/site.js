// Single source of truth for brand contact details.
// Every page that shows a phone number, email or social link reads from here.

export const SITE = {
    name: 'Exia Organics',
    email: 'exiaorganics@gmail.com',
    // Display format and the digits-only format WhatsApp's wa.me links need.
    phoneDisplay: '+233 59 160 4923',
    phoneHref: '+233591604923',
    whatsappNumber: '233591604923',
    hours: 'Mon–Fri, 9am–5pm',
    // TODO(handles): replace with the real profile URLs once confirmed.
    socials: [
        { label: 'Facebook', href: 'https://facebook.com', key: 'facebook' },
        { label: 'TikTok', href: 'https://tiktok.com', key: 'tiktok' },
        { label: 'Snapchat', href: 'https://snapchat.com', key: 'snapchat' },
    ],
};

export const formatPrice = (amount, currency = 'GHS') =>
    `${currency} ${Number(amount).toLocaleString('en-GH')}`;

/**
 * The text that pre-fills the customer's WhatsApp chat when they tap "Order".
 * `product` is an item from data/products.js, or undefined for a general enquiry.
 */
export function buildOrderMessage(product) {
    // TODO(Danny): shape this message — see the note in the PR/chat.
    if (!product) return 'Hi Exia Organics, I have a question about your products.';
    return `Hi Exia Organics, I'd like to order the ${product.name}.`;
}

export const whatsappUrl = (product) =>
    `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(buildOrderMessage(product))}`;

// Brand promises, as already stated across the site. Keep this list honest.
export const promises = [
    { title: 'Herbal formulas', body: 'Plant extracts and butters do the work. Every product is built around them.' },
    { title: 'Nothing harsh', body: 'No parabens, sulfates or synthetic fragrances, so hair keeps its natural oils.' },
    { title: 'Cruelty-free', body: 'Nothing we make is ever tested on animals.' },
    { title: 'Made in Ghana', body: 'Handcrafted at home, for the hair and climate we know best.' },
];
