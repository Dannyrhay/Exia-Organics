import React from 'react';
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

const BlogSection = ({
    tagline = "Our Journal",
    heading = "Natural Living",
    description = "Explore our latest stories on organic hair care, sustainable sourcing, and natural beauty rituals.",
    buttonText = "Discover more",
    buttonUrl = "/blog",
    posts = [
        {
            id: "post-1",
            title: "The Magic of Argan Oil",
            summary:
                "Discover why Argan oil is known as 'liquid gold' and how it can transform your hair's health and shine naturally.",
            label: "Ingredients",
            author: "Sarah Chen",
            published: "1 Jan 2024",
            url: "/blog/post-1",
            image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=2669&auto=format&fit=crop",
        },
        {
            id: "post-2",
            title: "Summer Hair Care Routine",
            summary:
                "Protect your locks from the sun and sea with our expert tips for maintaining moisture and preventing damage during the summer months.",
            label: "Tips & Tricks",
            author: "Marcus Rodriguez",
            published: "10 Feb 2024",
            url: "/blog/post-2",
            image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2670&auto=format&fit=crop",
        },
        {
            id: "post-3",
            title: "Sustainability at Exia",
            summary:
                "Learn about our commitment to eco-friendly packaging and ethically sourced ingredients that are kind to the planet.",
            label: "Sustainability",
            author: "Emma Thompson",
            published: "5 Mar 2024",
            url: "/blog/post-3",
            image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2669&auto=format&fit=crop",
        },
    ],
}) => {
    return (
        <section className="py-32 bg-white">
            <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
                <div className="text-center">
                    <Badge variant="secondary" className="mb-6 bg-[#f0eadd] text-[#3a2e20] hover:bg-[#d8cfc4]">
                        {tagline}
                    </Badge>
                    <h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl font-serif text-[#1e3a5f]">
                        {heading}
                    </h2>
                    <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg font-sans text-[#3a2e20]/80">
                        {description}
                    </p>
                    <Button variant="link" className="w-full sm:w-auto text-[#1e4b78] hover:text-[#163a5f]" asChild>
                        <a href={buttonUrl}>
                            {buttonText}
                            <ArrowRight className="ml-2 size-4" />
                        </a>
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {posts.map((post) => (
                        <Card key={post.id} className="grid grid-rows-[auto_auto_1fr_auto] border-none shadow-lg overflow-hidden">
                            <div className="aspect-[16/9] w-full">
                                <a
                                    href={post.url}
                                    className="transition-opacity duration-200 fade-in hover:opacity-70"
                                >
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </a>
                            </div>
                            <CardHeader>
                                <h3 className="text-lg font-semibold hover:underline md:text-xl font-serif text-[#1e3a5f]">
                                    <a href={post.url}>
                                        {post.title}
                                    </a>
                                </h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground font-sans text-[#3a2e20]/70">{post.summary}</p>
                            </CardContent>
                            <CardFooter>
                                <a
                                    href={post.url}
                                    className="flex items-center text-foreground hover:underline text-[#1e4b78]"
                                >
                                    Read more
                                    <ArrowRight className="ml-2 size-4" />
                                </a>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { BlogSection };
