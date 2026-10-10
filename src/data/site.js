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

    // Where customers send Mobile Money at checkout.
    // TODO(confirm): number, registered account name and accepted networks.
    momo: {
        number: '059 160 4923',
        accountName: 'Exia Organics',
        networks: 'MTN MoMo',
    },

    // TODO(confirm): fixed delivery zones, e.g. [{ id: 'accra', label: 'Accra', fee: 30 }].
    // While this is empty, customers type their area and the fee is agreed on WhatsApp.
    deliveryZones: [],
    deliveryNote: 'Delivery fee is confirmed on WhatsApp after you order.',
};

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
