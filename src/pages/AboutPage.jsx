import React from 'react';
import About from '../components/ui/About';
import AboutPreview from '../components/ui/AboutPreview';

const AboutPage = () => {
    return (
        <div className="pt-24 min-h-screen">
            {/* We'll re-use the Preview style but maybe slightly different context, 
                or just put the main About grid. A typical About page has a hero and then details.
                Let's stack them: Preview (Story) -> Features (Grid)
            */}
            <div className="container mx-auto px-4 mb-12 text-center">
                <h1 className="text-5xl font-bold font-serif text-[#1e4b78]">Who We Are</h1>
                <p className="text-gray-500 mt-4 text-lg">The story behind the purity.</p>
            </div>

            <AboutPreview />
            <About />
        </div>
    );
};

export default AboutPage;
