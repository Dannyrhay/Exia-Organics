export const products = [
    {
        id: 1,
        imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3JnYW5pYyUyMG9pbHxlbnwwfHwwfHx8MA%3D%3D",
        name: "Golden Jojoba Oil",
        tagline: "Pure hydration for skin & hair",
        price: 1299,
        originalPrice: 1599,
        offerText: "Save GHS 300",
        isCouponPrice: false,
        description: "Experience the pure essence of nature with our Golden Jojoba Oil. Cold-pressed and unrefined, this versatile oil mimics the skin's natural sebum, making it an excellent moisturizer for both skin and hair. It balances oil production, soothes dryness, and adds a healthy glow.",
        shippingCost: 50,
        currency: "GHS",
        tags: [
            { label: "Organic" },
            { label: "Cold Pressed" },
            { label: "Vegan" }
        ]
    },
    {
        id: 2,
        imageUrl: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b3JnYW5pYyUyMGNyZWFtfGVufDB8fDB8fHww",
        name: "Shea Butter Cream",
        tagline: "Intensive moisturizing therapy",
        price: 899,
        originalPrice: 1199,
        isCouponPrice: true,
        offerText: "Extra 10% Off",
        description: "Our ultra-rich Shea Butter Cream provides intensive moisturizing therapy for dry and compromised skin. Enriched with vitamins A and E, it deeply nourishes, restores elasticity, and protects against environmental stressors.",
        shippingCost: 50,
        currency: "GHS",
        tags: [
            { label: "Moisturizing" },
            { label: "Rich Texture" }
        ]
    },
    {
        id: 3,
        imageUrl: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXNzZW50aWFsJTIwb2lsc3xlbnwwfHwwfHx8MA%3D%3D",
        name: "Lavender Essential Oil",
        tagline: "Calming & relaxing aromatherapy",
        price: 649,
        originalPrice: 899,
        offerText: "Best Seller",
        description: "Unwind with the soothing scent of our Lavender Essential Oil. Perfect for aromatherapy, this 100% pure oil promotes relaxation, reduces stress, and helps improve sleep quality.",
        shippingCost: 40,
        currency: "GHS",
        tags: [
            { label: "Aromatherapy" },
            { label: "Calming" }
        ]
    },
    {
        id: 4,
        imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhlcmJhbCUyMHNoYW1wb298ZW58MHx8MHx8fDA%3D",
        name: "Herbal Revitalizing Shampoo",
        tagline: "Sulfate-free gentle cleansing",
        price: 799,
        originalPrice: 999,
        offerText: "Natural Care",
        description: "Cleanse your hair gently with our Herbal Revitalizing Shampoo. Free from harsh sulfates, this formula uses botanical extracts to strengthen hair roots and add volume without stripping natural oils.",
        shippingCost: 60,
        currency: "GHS",
        tags: [
            { label: "Sulfate-Free" },
            { label: "Herbal" }
        ]
    },
    {
        id: 5,
        imageUrl: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        name: "Rose Facial Mist",
        tagline: "Hydrating floral toner",
        price: 499,
        originalPrice: 699,
        offerText: "Summer Splash",
        description: "Refresh and hydrate your skin instantly with our Rose Facial Mist. Distilled from fresh rose petals, this toner balances pH, tightens pores, and leaves a dewy, glowing finish.",
        shippingCost: 40,
        currency: "GHS",
        tags: [
            { label: "Hydrating" },
            { label: "Toner" }
        ]
    },
    {
        id: 6,
        imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        name: "Bamboo Charcoal Scrub",
        tagline: "Detoxify and exfoliate",
        price: 849,
        originalPrice: 1099,
        isCouponPrice: true,
        offerText: "Deep Clean",
        description: "Detoxify your skin with our Bamboo Charcoal Scrub. It gently exfoliates dead skin cells and draws out impurities, leaving your skin smooth, clear, and revitalized.",
        shippingCost: 50,
        currency: "GHS",
        tags: [
            { label: "Exfoliating" },
            { label: "Detox" }
        ]
    },
    {
        id: 7,
        imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        name: "Aloe Vera Gel",
        tagline: "Soothing skin relief",
        price: 399,
        originalPrice: 499,
        offerText: "Pure & Healing",
        description: "Our pure Aloe Vera Gel is a soothing remedy for irritated or sunburnt skin. Lightweight and fast-absorbing, it provides instant relief and deep hydration.",
        shippingCost: 40,
        currency: "GHS",
        tags: [
            { label: "Soothing" },
            { label: "Natural" }
        ]
    },
    {
        id: 8,
        imageUrl: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        name: "Argan Hair Serum",
        tagline: "Frizz control & shine",
        price: 1199,
        originalPrice: 1599,
        offerText: "Frizz Free",
        description: "Tame frizz and add a brilliant shine with our Argan Hair Serum. Infused with Moroccan Argan oil, this non-greasy formula protects hair from heat damage and split ends.",
        shippingCost: 30,
        currency: "GHS",
        tags: [
            { label: "Hair Care" },
            { label: "Shine" }
        ]
    },
    {
        id: 9,
        imageUrl: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        name: "Eucalyptus Essential Oil",
        tagline: "Respiratory relief & clarity",
        price: 599,
        originalPrice: 799,
        offerText: "Breathe Easy",
        description: "Clear your mind and respiratory passages with Eucalyptus Essential Oil. Ideal for diffusers, steam inhalation, or massage to relieve congestion and boost mental clarity.",
        shippingCost: 40,
        currency: "GHS",
        tags: [
            { label: "Wellness" },
            { label: "Essential Oil" }
        ]
    },
    {
        id: 10,
        imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        name: "Vitamin C Serum",
        tagline: "Brightening antioxidant boost",
        price: 1499,
        originalPrice: 1999,
        offerText: "Glow Getter",
        description: "Brighten your complexion and fight signs of aging with our concentrated Vitamin C Serum. Packed with antioxidants, it helps fade dark spots and promotes collagen production.",
        shippingCost: 30,
        currency: "GHS",
        tags: [
            { label: "Anti-Aging" },
            { label: "Brightening" }
        ]
    },
    {
        id: 11,
        imageUrl: "https://images.unsplash.com/photo-1542452255191-c85a98f2c5d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        name: "Organic Coffee Scrub",
        tagline: "Energizing body exfoliant",
        price: 699,
        originalPrice: 899,
        offerText: "Wake Up",
        description: "Wake up your skin with our Organic Coffee Scrub. The caffeine boosts circulation while the coarse grounds exfoliate, reducing the appearance of cellulite and leaving skin firm.",
        shippingCost: 50,
        currency: "GHS",
        tags: [
            { label: "Exfoliating" },
            { label: "Body Care" }
        ]
    },
    {
        id: 12,
        imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        name: "Chamomile Tea Bags",
        tagline: "Soothing natural sleep aid",
        price: 299,
        originalPrice: 399,
        offerText: "Sleep Well",
        description: "Enjoy a peaceful night's sleep with our Organic Chamomile Tea. Naturally caffeine-free, its calming properties help relax the nervous system and relieve stress.",
        shippingCost: 20,
        currency: "GHS",
        tags: [
            { label: "Tea" },
            { label: "Relaxation" }
        ]
    }
];
