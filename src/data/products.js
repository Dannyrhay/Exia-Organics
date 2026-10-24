// Products are edited in the admin dashboard (/admin) and stored one file each in
// content/products/*.json. This module turns those files into the shape the site uses.

// Shop filters, in display order. `id` matches each product's `need`.
// Keep in sync with the "need" options in public/admin/config.yml.
export const needs = [
    { id: 'scalp', label: 'Scalp care', blurb: 'Itchy, flaky or irritated scalp' },
    { id: 'growth', label: 'Growth', blurb: 'Length, thickness and retention' },
    { id: 'moisture', label: 'Moisture', blurb: 'Dry, thirsty, hard-to-detangle hair' },
    { id: 'repair', label: 'Repair', blurb: 'Split ends, breakage and dullness' },
    { id: 'sets', label: 'Sets', blurb: 'Complete routines, bundled' },
];

import { hasPassed } from '@/lib/schedule';

const files = import.meta.glob('/content/products/*.json', { eager: true, import: 'default' });

export const products = Object.entries(files)
    .map(([path, data]) => {
        // The file name is the product's permanent web address: /product/<slug>.
        const slug = path.split('/').pop().replace(/\.json$/, '');
        const images = (data.images ?? []).filter(Boolean);

        // A sale applies when a sale price below the regular price is set and its end
        // date (if any) hasn't passed. `price` is then what customers pay everywhere —
        // cart, checkout and the order message — and `compareAtPrice` is the crossed-out one.
        const regular = Number(data.price) || 0;
        const sale = Number(data.salePrice) || 0;
        const onSale = sale > 0 && sale < regular && !hasPassed(data.saleEnds);

        return {
            ...data,
            id: slug,
            slug,
            images,
            imageUrl: images[0] ?? '',
            size: data.size || null,
            price: onSale ? sale : regular,
            compareAtPrice: onSale ? regular : null,
            onSale,
            currency: 'GHS',
            tags: (data.tags ?? []).map((label) => ({ label })),
            inStock: data.inStock !== false,
        };
    })
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.name.localeCompare(b.name));

/** Finds a product by its slug, or by the numeric id it had before the dashboard existed. */
export const getProduct = (key) =>
    products.find((p) => p.slug === key) ?? products.find((p) => String(p.legacyId) === String(key));

// Display name without the size suffix, e.g. "Hair Repair Oil".
export const shortName = (product) => product.name.replace(/\s*\([^)]*\)\s*$/, '');
