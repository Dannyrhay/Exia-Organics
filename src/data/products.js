
import antiDandruff250 from '../assets/Anti-Dandruff Herbal Shampoo (250ml).png';
import antiDandruff500 from '../assets/Anti-Dandruff Herbal Shampoo (500ml).png';
import antiDandruffSet from '../assets/Anti-Dandruff Set.png';
import deepConditioner from '../assets/Deep Conditioner (250ml).png';
import hairGrowthButter from '../assets/Hair Growth Butter.png';
import hairGrowthSet from '../assets/Hair Growth Set.png';
import hairRepairOil60 from '../assets/Hair Repair Oil (60ml).png';
import hairRepairOil100 from '../assets/Hair Repair Oil (100ml).png';
import leaveInConditioner from '../assets/Leave in Conditioner (150ml).png';
import mildShampoo from '../assets/Mild Shampoo(500ml).png';
import moisturizingSet from '../assets/Moisturizing Set.png';
import moisturizingShampoo from '../assets/Moisturizing Shampoo(250ml).png';

export const products = [
    {
        id: 1,
        imageUrl: antiDandruff250,
        name: "Anti-Dandruff Herbal Shampoo (250ml)",
        tagline: "Soothes itchy scalp",
        price: 60,
        originalPrice: 0,
        offerText: null,
        isCouponPrice: false,
        description: "Our Anti-Dandruff Herbal Shampoo is specially formulated to soothe itchy scalps and eliminate dandruff flakes using natural herbal extracts.",
        shippingCost: 0,
        currency: "GHS",
        tags: [{ label: "Anti-Dandruff" }, { label: "Herbal" }]
    },
    {
        id: 2,
        imageUrl: antiDandruff500,
        name: "Anti-Dandruff Herbal Shampoo (500ml)",
        tagline: "Large family size",
        price: 80,
        originalPrice: 0,
        offerText: null,
        isCouponPrice: false,
        description: "The same effective anti-dandruff formula in a larger 500ml bottle for long-lasting care.",
        shippingCost: 0,
        currency: "GHS",
        tags: [{ label: "Value Size" }, { label: "Herbal" }]
    },
    {
        id: 3,
        imageUrl: antiDandruffSet,
        name: "Anti-Dandruff Set",
        tagline: "Complete scalp care",
        price: 350,
        originalPrice: 0,
        offerText: null,
        isCouponPrice: false,
        description: "A complete set designed to tackle dandruff and restore scalp health effectively.",
        shippingCost: 0,
        currency: "GHS",
        tags: [{ label: "Bundle" }, { label: "Scalp Care" }]
    },
    {
        id: 4,
        imageUrl: deepConditioner,
        name: "Deep Conditioner (250ml)",
        tagline: "Intensive moisture repair",
        price: 70,
        originalPrice: 0,
        offerText: null,
        isCouponPrice: false,
        description: "Restore hydration and softness to dry, damaged hair with our intensive Deep Conditioner.",
        shippingCost: 0,
        currency: "GHS",
        tags: [{ label: "Conditioning" }, { label: "Repair" }]
    },
    {
        id: 5,
        imageUrl: hairGrowthButter,
        name: "Hair Growth Butter",
        tagline: "Nourishes & stimulates",
        price: 60,
        originalPrice: 0,
        offerText: null,
        isCouponPrice: false,
        description: "A rich butter blend designed to nourish the scalp and stimulate healthy hair growth.",
        shippingCost: 0,
        currency: "GHS",
        tags: [{ label: "Growth" }, { label: "Nourishing" }]
    },
    {
        id: 6,
        imageUrl: hairGrowthSet,
        name: "Hair Growth Set",
        tagline: "Ultimate growth collection",
        price: 190,
        originalPrice: 0,
        offerText: null,
        isCouponPrice: false,
        description: "The ultimate collection of products working together to maximize hair growth and retention.",
        shippingCost: 0,
        currency: "GHS",
        tags: [{ label: "Bundle" }, { label: "Growth" }]
    },
    {
        id: 7,
        imageUrl: hairRepairOil60,
        name: "Hair Repair Oil (60ml)",
        tagline: "Fixes split ends",
        price: 60,
        originalPrice: 0,
        offerText: null,
        isCouponPrice: false,
        description: "A concentrated oil aimed at repairing split ends and adding shine to dull hair.",
        shippingCost: 0,
        currency: "GHS",
        tags: [{ label: "Repair" }, { label: "Oil" }]
    },
    {
        id: 8,
        imageUrl: hairRepairOil100,
        name: "Hair Repair Oil (100ml)",
        tagline: "Double the repair",
        price: 85,
        originalPrice: 0,
        offerText: null,
        isCouponPrice: false,
        description: "Our effective Hair Repair Oil in a larger size for continuous treatment.",
        shippingCost: 0,
        currency: "GHS",
        tags: [{ label: "Value Size" }, { label: "Repair" }]
    },
    {
        id: 9,
        imageUrl: leaveInConditioner,
        name: "Leave-In Conditioner (150ml)",
        tagline: "Daily moisture & detangling",
        price: 40,
        originalPrice: 0,
        offerText: null,
        isCouponPrice: false,
        description: "Lightweight leave-in conditioner that detangles, moisturizes, and protects hair throughout the day.",
        shippingCost: 0,
        currency: "GHS",
        tags: [{ label: "Daily Care" }, { label: "Moisture" }]
    },
    {
        id: 10,
        imageUrl: mildShampoo,
        name: "Mild Shampoo (500ml)",
        tagline: "Gentle daily cleanse",
        price: 70,
        originalPrice: 0,
        offerText: null,
        isCouponPrice: false,
        description: "A gentle shampoo perfect for frequent use, cleaning hair without stripping natural oils.",
        shippingCost: 0,
        currency: "GHS",
        tags: [{ label: "Gentle" }, { label: "Daily Use" }]
    },
    {
        id: 11,
        imageUrl: moisturizingSet,
        name: "Moisturizing Set",
        tagline: "Complete hydration system",
        price: 350,
        originalPrice: 0,
        offerText: null,
        isCouponPrice: false,
        description: "A curated set of moisturizing products to keep your hair hydrated and healthy.",
        shippingCost: 0,
        currency: "GHS",
        tags: [{ label: "Bundle" }, { label: "Hydration" }]
    },
    {
        id: 12,
        imageUrl: moisturizingShampoo,
        name: "Moisturizing Shampoo (250ml)",
        tagline: "Hydrates while cleaning",
        price: 45,
        originalPrice: 0,
        offerText: null,
        isCouponPrice: false,
        description: "Infused with moisturizing ingredients to hydrate dry hair while cleansing.",
        shippingCost: 0,
        currency: "GHS",
        tags: [{ label: "Moisturizing" }, { label: "Cleanse" }]
    }
];
