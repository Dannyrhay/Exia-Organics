import antiDandruff250 from '../assets/products/anti-dandruff-herbal-shampoo-250ml.webp';
import antiDandruff500 from '../assets/products/anti-dandruff-herbal-shampoo-500ml.webp';
import antiDandruffSet from '../assets/products/anti-dandruff-set.webp';
import deepConditioner from '../assets/products/deep-conditioner-250ml.webp';
import hairGrowthButter from '../assets/products/hair-growth-butter.webp';
import hairGrowthSet from '../assets/products/hair-growth-set.webp';
import hairRepairOil60 from '../assets/products/hair-repair-oil-60ml.webp';
import hairRepairOil100 from '../assets/products/hair-repair-oil-100ml.webp';
import leaveInConditioner from '../assets/products/leave-in-conditioner-150ml.webp';
import mildShampoo from '../assets/products/mild-shampoo-500ml.webp';
import moisturizingSet from '../assets/products/moisturizing-set.webp';
import moisturizingShampoo from '../assets/products/moisturizing-shampoo-250ml.webp';

// Shop filters, in display order. `id` matches each product's `need`.
export const needs = [
    { id: 'scalp', label: 'Scalp care', blurb: 'Itchy, flaky or irritated scalp' },
    { id: 'growth', label: 'Growth', blurb: 'Length, thickness and retention' },
    { id: 'moisture', label: 'Moisture', blurb: 'Dry, thirsty, hard-to-detangle hair' },
    { id: 'repair', label: 'Repair', blurb: 'Split ends, breakage and dullness' },
    { id: 'sets', label: 'Sets', blurb: 'Complete routines, bundled' },
];

export const products = [
    {
        id: 1,
        imageUrl: antiDandruff250,
        name: 'Anti-Dandruff Herbal Shampoo (250ml)',
        tagline: 'Soothes itchy scalp',
        size: '250ml',
        need: 'scalp',
        price: 60,
        description: 'Our Anti-Dandruff Herbal Shampoo is specially formulated to soothe itchy scalps and eliminate dandruff flakes using natural herbal extracts.',
        currency: 'GHS',
        tags: [{ label: 'Anti-Dandruff' }, { label: 'Herbal' }],
    },
    {
        id: 2,
        imageUrl: antiDandruff500,
        name: 'Anti-Dandruff Herbal Shampoo (500ml)',
        tagline: 'Large family size',
        size: '500ml',
        need: 'scalp',
        price: 80,
        description: 'The same effective anti-dandruff formula in a larger 500ml bottle for long-lasting care.',
        currency: 'GHS',
        tags: [{ label: 'Value Size' }, { label: 'Herbal' }],
    },
    {
        id: 3,
        imageUrl: antiDandruffSet,
        name: 'Anti-Dandruff Set',
        tagline: 'Complete scalp care',
        size: null,
        need: 'sets',
        price: 350,
        description: 'A complete set designed to tackle dandruff and restore scalp health effectively.',
        currency: 'GHS',
        tags: [{ label: 'Bundle' }, { label: 'Scalp Care' }],
    },
    {
        id: 4,
        imageUrl: deepConditioner,
        name: 'Deep Conditioner (250ml)',
        tagline: 'Intensive moisture repair',
        size: '250ml',
        need: 'moisture',
        price: 70,
        description: 'Restore hydration and softness to dry, damaged hair with our intensive Deep Conditioner.',
        currency: 'GHS',
        tags: [{ label: 'Conditioning' }, { label: 'Repair' }],
    },
    {
        id: 5,
        imageUrl: hairGrowthButter,
        name: 'Hair Growth Butter',
        tagline: 'Nourishes & stimulates',
        size: null,
        need: 'growth',
        price: 60,
        featured: true,
        description: 'A rich butter blend designed to nourish the scalp and stimulate healthy hair growth.',
        currency: 'GHS',
        tags: [{ label: 'Growth' }, { label: 'Nourishing' }],
    },
    {
        id: 6,
        imageUrl: hairGrowthSet,
        name: 'Hair Growth Set',
        tagline: 'Ultimate growth collection',
        size: null,
        need: 'sets',
        price: 190,
        description: 'The ultimate collection of products working together to maximize hair growth and retention.',
        currency: 'GHS',
        tags: [{ label: 'Bundle' }, { label: 'Growth' }],
    },
    {
        id: 7,
        imageUrl: hairRepairOil60,
        name: 'Hair Repair Oil (60ml)',
        tagline: 'Fixes split ends',
        size: '60ml',
        need: 'repair',
        price: 60,
        description: 'A concentrated oil aimed at repairing split ends and adding shine to dull hair.',
        currency: 'GHS',
        tags: [{ label: 'Repair' }, { label: 'Oil' }],
    },
    {
        id: 8,
        imageUrl: hairRepairOil100,
        name: 'Hair Repair Oil (100ml)',
        tagline: 'Double the repair',
        size: '100ml',
        need: 'repair',
        price: 85,
        description: 'Our effective Hair Repair Oil in a larger size for continuous treatment.',
        currency: 'GHS',
        tags: [{ label: 'Value Size' }, { label: 'Repair' }],
    },
    {
        id: 9,
        imageUrl: leaveInConditioner,
        name: 'Leave-In Conditioner (150ml)',
        tagline: 'Daily moisture & detangling',
        size: '150ml',
        need: 'moisture',
        price: 40,
        description: 'Lightweight leave-in conditioner that detangles, moisturizes, and protects hair throughout the day.',
        currency: 'GHS',
        tags: [{ label: 'Daily Care' }, { label: 'Moisture' }],
    },
    {
        id: 10,
        imageUrl: mildShampoo,
        name: 'Mild Shampoo (500ml)',
        tagline: 'Gentle daily cleanse',
        size: '500ml',
        need: 'moisture',
        price: 70,
        description: 'A gentle shampoo perfect for frequent use, cleaning hair without stripping natural oils.',
        currency: 'GHS',
        tags: [{ label: 'Gentle' }, { label: 'Daily Use' }],
    },
    {
        id: 11,
        imageUrl: moisturizingSet,
        name: 'Moisturizing Set',
        tagline: 'Complete hydration system',
        size: null,
        need: 'sets',
        price: 350,
        description: 'A curated set of moisturizing products to keep your hair hydrated and healthy.',
        currency: 'GHS',
        tags: [{ label: 'Bundle' }, { label: 'Hydration' }],
    },
    {
        id: 12,
        imageUrl: moisturizingShampoo,
        name: 'Moisturizing Shampoo (250ml)',
        tagline: 'Hydrates while cleaning',
        size: '250ml',
        need: 'moisture',
        price: 45,
        description: 'Infused with moisturizing ingredients to hydrate dry hair while cleansing.',
        currency: 'GHS',
        tags: [{ label: 'Moisturizing' }, { label: 'Cleanse' }],
    },
];

// Display name without the size suffix, e.g. "Hair Repair Oil".
export const shortName = (product) => product.name.replace(/\s*\([^)]*\)\s*$/, '');
