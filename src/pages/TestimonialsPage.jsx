import React from 'react';
import TestimonialsShowcase from '../components/ui/TestimonialsShowcase';
import { testimonials } from '../data/testimonials';

const TestimonialsPage = () => {
    return (
        <div className="min-h-screen bg-shea pt-12 pb-16 md:pt-16">
            <div className="container mx-auto mb-12 px-4 text-center">
                <h1 className="font-serif text-4xl font-bold text-indigo md:text-5xl">Real Stories</h1>
                <p className="mt-4 text-lg font-medium text-wood">Community Love & Reviews</p>
                <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-wood" />
            </div>

            <div className="container mx-auto flex items-center justify-center px-4 py-6">
                <TestimonialsShowcase testimonials={testimonials} />
            </div>
        </div>
    );
};

export default TestimonialsPage;
