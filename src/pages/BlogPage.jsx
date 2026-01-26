import React, { useEffect } from 'react';
import { BlogPosts } from '@/components/ui/BlogPosts';

const BlogPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const posts = [
        {
            id: 1,
            title: "The Magic of Argan Oil: Liquid Gold for Your Hair",
            category: "Ingredients",
            imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=2669&auto=format&fit=crop",
            views: 2180,
            readTime: 5,
            rating: 5,
        },
        {
            id: 2,
            title: "Summer Hair Care Routine: Protect & Shine",
            category: "Tips & Tricks",
            imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2670&auto=format&fit=crop",
            views: 1456,
            readTime: 4,
            rating: 4
        },
        {
            id: 3,
            title: "Sustainability at Exia: Our Promise to the Planet",
            category: "Sustainability",
            imageUrl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2669&auto=format&fit=crop",
            views: 987,
            readTime: 6,
            rating: 5
        },
        {
            id: 4,
            title: "DIY Hair Masks: Spa Day at Home",
            category: "Tutorials",
            imageUrl: "https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=2669&auto=format&fit=crop",
            views: 1890,
            readTime: 7,
            rating: 5,
        },
        {
            id: 5,
            title: "Understanding Hair Porosity",
            category: "Education",
            imageUrl: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2669&auto=format&fit=crop",
            views: 3205,
            readTime: 8,
            rating: 4,
        },
        {
            id: 6,
            title: "Protective Styles for Growth",
            category: "Styles",
            imageUrl: "https://images.unsplash.com/photo-1624898230588-468ac64b6389?q=80&w=2672&auto=format&fit=crop",
            views: 2560,
            readTime: 6,
            rating: 5,
        },
        {
            id: 7,
            title: "The Ultimate Guide to Scalp Health",
            category: "Health",
            imageUrl: "https://images.unsplash.com/photo-1519699047748-40ba526612df?q=80&w=2670&auto=format&fit=crop",
            views: 2100,
            readTime: 7,
            rating: 4,
        },
        {
            id: 8,
            title: "Aloe Vera: Nature's Soothing Gel",
            category: "Ingredients",
            imageUrl: "https://images.unsplash.com/photo-1601646738981-2292025359a1?q=80&w=2576&auto=format&fit=crop",
            views: 1800,
            readTime: 4,
            rating: 5,
        }
    ];

    return (
        <div className="min-h-screen bg-white pt-10 pb-20">
            <BlogPosts
                title="Our Journal"
                description="Explore our curated collection of stories, tips, and insights into the world of natural beauty and organic care."
                backgroundLabel="JOURNAL"
                backgroundPosition="right"
                posts={posts}
            />
        </div>
    );
};

export default BlogPage;
