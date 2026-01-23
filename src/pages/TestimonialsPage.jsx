import React from 'react';
import CircularTestimonials from '../components/ui/CircularTestimonials';

const testimonials = [
    // Standard Testimonials (7)
    {
        quote: "I've tried countless organic brands, but Exia is in a league of its own. The Shampoo revitalized my hair in just two weeks!",
        name: "Sarah Jenkins",
        designation: "Verified Buyer",
        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop",
        isVideo: false
    },
    {
        quote: "The Face Oil is liquid gold. It absorbs perfectly and leaves my skin glowing without feeling greasy. Highly recommended!",
        name: "Michael Chen",
        designation: "Skincare Enthusiast",
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
        isVideo: false
    },
    {
        quote: "Finally, a brand that actually cares about sustainability. The packaging is beautiful and eco-friendly. Love it!",
        name: "Emily Rodriguez",
        designation: "Eco Blogger",
        src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
        isVideo: false
    },
    {
        quote: "Sensitive skin savior! The Aloe Gel calmed my redness overnight. I'm swapping all my products to Exia.",
        name: "David Kim",
        designation: "Verified Buyer",
        src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
        isVideo: false
    },
    {
        quote: "The aroma of the Lavender Oil is so pure and relaxing. It's now an essential part of my bedtime routine.",
        name: "Lisa Thompson",
        designation: "Wellness Coach",
        src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
        isVideo: false
    },
    {
        quote: "My hair has never felt softer. The ingredients list is so clean, I feel safe using it on my whole family.",
        name: "James Wilson",
        designation: "Parent",
        src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
        isVideo: false
    },
    {
        quote: "Incredible value for the quality. It feels like a high-end spa treatment every time I use the body scrub.",
        name: "Anna Petrova",
        designation: "Verified Buyer",
        src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop",
        isVideo: false
    },

    // Video Testimonials (3) - Styled with Play button overlay
    {
        quote: "Watch my full routine using the Exia collection. The transformation is real! [Video Review]",
        name: "Jessica Lee",
        designation: "Beauty Vlogger",
        src: "https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?q=80&w=1000&auto=format&fit=crop",
        isVideo: true,
        videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" // Sample placeholder
    },
    {
        quote: "I documented my 30-day journey with Exia Organics. See the results for yourself! [Video Review]",
        name: "Ryan Carter",
        designation: "Content Creator",
        src: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1000&auto=format&fit=crop",
        isVideo: true,
        videoSrc: "https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1" // Sample placeholder
    },
    {
        quote: "Unboxing the new Summer Bundle! You won't believe the scent of this Mist. [Video Review]",
        name: "Sophie Clark",
        designation: "Influencer",
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
        isVideo: true,
        videoSrc: "https://www.youtube.com/embed/p7Bqj5Z6C5s?autoplay=1" // Sample placeholder
    },
];

const TestimonialsPage = () => {
    return (
        <div className="pt-24 min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#1e4b78]">Real Stories</h1>
                <p className="text-[#9cae66] mt-4 text-lg font-medium">Community Love & Reviews</p>
                <div className="w-24 h-1 bg-[#9cae66] mx-auto mt-6 rounded-full"></div>
            </div>

            <div className="flex items-center justify-center py-10">
                <CircularTestimonials
                    testimonials={testimonials}
                    autoplay={true}
                    colors={{
                        name: "#1e4b78", // Primary Blue
                        designation: "#9cae66", // Accent Green
                        testimony: "#4b5563",
                        arrowBackground: "#ffffff",
                        arrowForeground: "#1e4b78",
                        arrowHoverBackground: "#1e4b78",
                        arrowHoverForeground: "#ffffff",
                    }}
                />
            </div>
        </div>
    );
};

export default TestimonialsPage;
