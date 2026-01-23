import React from 'react';
import Hero from '../components/Hero';
import AboutPreview from '../components/ui/AboutPreview';
import Products from '../components/Products';
import Promo from '../components/Promo';

const HomePage = () => {
    return (
        <>
            <Hero />
            <AboutPreview />
            <Products />
            <Promo />
        </>
    );
};

export default HomePage;
