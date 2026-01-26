import React from 'react';
import Hero from '../components/Hero';
import AboutPreview from '../components/ui/AboutPreview';
import Products from '../components/Products';
import { BlogSection } from '../components/Block/BlogSection';

const HomePage = () => {
    return (
        <>
            <Hero />
            <AboutPreview />
            <Products />
            <BlogSection />
        </>
    );
};

export default HomePage;
