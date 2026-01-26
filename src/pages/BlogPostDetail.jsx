import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const postsData = [
    {
        id: 1,
        title: "The Magic of Argan Oil: Liquid Gold for Your Hair",
        category: "Ingredients",
        imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=2669&auto=format&fit=crop",
        author: "Sarah Chen",
        views: 2180,
        readTime: 5,
        date: "Jan 15, 2024",
        content: (
            <>
                <p className="mb-6">
                    Argan oil has been a staple in beauty rituals for centuries, often referred to as "liquid gold" by those who know its transformative powers. Harvested from the kernels of the argan tree, native to Morocco, this rich oil is packed with essential nutrients that work wonders for hair health.
                </p>
                <h3 className="text-2xl font-serif text-[#1e3a5f] mb-4">Why Argan Oil?</h3>
                <p className="mb-6">
                    Rich in fatty acids and Vitamin E, Argan oil provides intense hydration without weighing hair down. It mimics the natural oils produced by our scalp, making it an excellent choice for balancing oil production while nourishing dry ends.
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Hydration:</strong> Deeply moisturizes strands from the inside out.</li>
                    <li><strong>Shine:</strong> Smooths the hair cuticle for a glass-like finish.</li>
                    <li><strong>Protection:</strong> Acts as a natural barrier against heat and environmental damage.</li>
                </ul>
            </>
        )
    },
    {
        id: 2,
        title: "Summer Hair Care Routine: Protect & Shine",
        category: "Tips & Tricks",
        imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2670&auto=format&fit=crop",
        author: "Marcus Rodriguez",
        views: 1456,
        readTime: 4,
        date: "Feb 10, 2024",
        content: (
            <>
                <p className="mb-6">
                    Summer brings sun, sea, and fun, but it can also be harsh on your hair. UV rays, saltwater, and chlorine can strip away moisture, leaving locks dry and brittle.
                </p>
                <h3 className="text-2xl font-serif text-[#1e3a5f] mb-4">Hydrate, Hydrate, Hydrate</h3>
                <p className="mb-6">
                    Just like your skin, your hair needs extra hydration in the heat. Switch to a moisturizing shampoo and conditioner, and don't skip the leave-in treatment.
                </p>
            </>
        )
    },
    {
        id: 3,
        title: "Sustainability at Exia: Our Promise to the Planet",
        category: "Sustainability",
        imageUrl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2669&auto=format&fit=crop",
        author: "Emma Thompson",
        views: 987,
        readTime: 6,
        date: "Mar 05, 2024",
        content: (
            <>
                <p className="mb-6">
                    At Exia Organics, we believe that beauty shouldn't come at a cost to the earth. That's why sustainability is at the core of everything we do.
                </p>
                <h3 className="text-2xl font-serif text-[#1e3a5f] mb-4">Ethical Sourcing</h3>
                <p className="mb-6">
                    We work directly with farmers who practice regenerative agriculture. This ensures that the soil remains healthy and that the communities we partner with are paid fair wages.
                </p>
            </>
        )
    },
    {
        id: 4,
        title: "DIY Hair Masks: Spa Day at Home",
        category: "Tutorials",
        imageUrl: "https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=2669&auto=format&fit=crop",
        author: "Lily Zhang",
        views: 1890,
        readTime: 7,
        date: "Mar 12, 2024",
        content: (
            <>
                <p className="mb-6">
                    Sometimes the best ingredients are found right in your kitchen. Creating your own hair mask is a fun and effective way to treat specific hair concerns while enjoying a relaxing spa moment at home.
                </p>
                <h3 className="text-2xl font-serif text-[#1e3a5f] mb-4">The Avocado Hydrator</h3>
                <p className="mb-6">
                    Mash half a ripe avocado with a tablespoon of honey and a teaspoon of olive oil. Apply to damp hair and let it sit for 20 minutes. Avocados are rich in biotin, which strengthens hair.
                </p>
                <h3 className="text-2xl font-serif text-[#1e3a5f] mb-4">The Rice Water Rinse</h3>
                <p className="mb-6">
                    Fermented rice water is an ancient secret for hair growth. Soak rinsed rice in water for 24 hours, then use the water as a final rinse after shampooing.
                </p>
            </>
        )
    },
    {
        id: 5,
        title: "Understanding Hair Porosity",
        category: "Education",
        imageUrl: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2669&auto=format&fit=crop",
        author: "Dr. Alana West",
        views: 3205,
        readTime: 8,
        date: "Mar 20, 2024",
        content: (
            <>
                <p className="mb-6">
                    Knowing your hair porosity is the key to choosing the right products. It determines how well your hair can absorb and retain moisture.
                </p>
                <h3 className="text-2xl font-serif text-[#1e3a5f] mb-4">The Float Test</h3>
                <p className="mb-6">
                    Take a clean strand of shed hair and place it in a glass of water. If it sinks immediately, you have high porosity. If it floats, you have low porosity. If it stays in the middle, you have medium porosity.
                </p>
                <h3 className="text-2xl font-serif text-[#1e3a5f] mb-4">Low Porosity Tips</h3>
                <p className="mb-6">
                    Use heat when conditioning to open up the cuticles. Avoid heavy oils that just sit on top of the strand.
                </p>
            </>
        )
    },
    {
        id: 6,
        title: "Protective Styles for Growth",
        category: "Styles",
        imageUrl: "https://images.unsplash.com/photo-1624898230588-468ac64b6389?q=80&w=2672&auto=format&fit=crop",
        author: "Zoe King",
        views: 2560,
        readTime: 6,
        date: "Apr 02, 2024",
        content: (
            <>
                <p className="mb-6">
                    Protective styling is a great way to give your hair a break from manipulation and environmental stress. Styles like braids, twists, and buns can help retain length using low tension.
                </p>
                <h3 className="text-2xl font-serif text-[#1e3a5f] mb-4">Box Braids Maintenance</h3>
                <p className="mb-6">
                    Keep your scalp moisturized with a light oil and sleep with a satin bonnet to prevent frizz. Don't keep them in for too long to avoid matting.
                </p>
            </>
        )
    },
    {
        id: 7,
        title: "The Ultimate Guide to Scalp Health",
        category: "Health",
        imageUrl: "https://images.unsplash.com/photo-1519699047748-40ba526612df?q=80&w=2670&auto=format&fit=crop",
        author: "Dr. Alana West",
        views: 2100,
        readTime: 7,
        date: "Apr 15, 2024",
        content: (
            <>
                <p className="mb-6">
                    Healthy hair starts with a healthy scalp. Issues like dandruff, itchiness, and oiliness often stem from an imbalanced scalp microbiome.
                </p>
                <h3 className="text-2xl font-serif text-[#1e3a5f] mb-4">Exfoliation is Key</h3>
                <p className="mb-6">
                    Just like your face, your scalp needs exfoliation to remove product buildup and dead skin cells. Use a dedicated scalp scrub once a week.
                </p>
            </>
        )
    },
    {
        id: 8,
        title: "Aloe Vera: Nature's Soothing Gel",
        category: "Ingredients",
        imageUrl: "https://images.unsplash.com/photo-1601646738981-2292025359a1?q=80&w=2576&auto=format&fit=crop",
        author: "Sarah Chen",
        views: 1800,
        readTime: 4,
        date: "Apr 28, 2024",
        content: (
            <>
                <p className="mb-6">
                    Aloe Vera is renowned for its soothing and moisturizing properties. It contains proteolytic enzymes which repair dead skin cells on the scalp.
                </p>
                <h3 className="text-2xl font-serif text-[#1e3a5f] mb-4">DIY Aloe Gel</h3>
                <p className="mb-6">
                    Harvest fresh gel from an aloe leaf and blend it. Apply it directly to your scalp for instant relief from irritation and itching.
                </p>
            </>
        )
    }
];

const BlogPostDetail = () => {
    const { id } = useParams();
    const post = postsData.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <h1 className="text-2xl font-serif text-[#1e3a5f] mb-4">Post not found</h1>
                <Link to="/blog" className="text-[#1e4b78] hover:underline flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pb-20 overflow-x-hidden">
            {/* Hero Image */}
            <div className="w-full h-[50vh] relative">
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 container mx-auto">
                    <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border-none text-md px-3 py-1">
                        {post.category}
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-serif text-white font-bold leading-tight max-w-4xl drop-shadow-lg">
                        {post.title}
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-8">
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 text-[#3a2e20]/60 mb-8 border-b border-[#f0eadd] pb-8">
                        <div className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            <span>{post.readTime} min read</span>
                        </div>
                    </div>

                    {/* Article Body */}
                    <div className="prose prose-lg max-w-none text-[#3a2e20]/80 font-sans leading-relaxed">
                        {post.content}
                    </div>

                    <div className="mt-12 pt-8 border-t border-[#f0eadd]">
                        <Link to="/blog" className="inline-flex items-center text-[#1e4b78] hover:text-[#163a5f] font-medium transition-colors">
                            <ArrowLeft className="mr-2 h-5 w-5" />
                            Back to all articles
                        </Link>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-[#f0eadd] p-8 rounded-2xl">
                        <h3 className="text-xl font-serif text-[#1e3a5f] mb-4">About Exia Organics</h3>
                        <p className="text-[#3a2e20]/70 mb-6">
                            We craft premium, organic hair care products inspired by nature. Join our community for more tips and exclusive offers.
                        </p>
                        <Link to="/products" className="block w-full text-center bg-[#1e4b78] text-white py-3 rounded-md hover:bg-[#163a5f] transition-colors">
                            Shop Products
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPostDetail;
