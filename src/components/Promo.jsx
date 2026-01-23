import React from 'react';

const Promo = () => {
    return (
        <section className="w-full bg-[#d8cfc4] py-20 px-6 md:px-16 overflow-hidden relative">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left: Text Content */}
                <div className="space-y-6 z-10 text-center md:text-left">
                    <h4 className="font-serif text-[#3a2e20] text-xl tracking-widest uppercase">Handmade & Natural Scents</h4>

                    <h2 className="font-serif text-[#1e3a5f] text-4xl md:text-6xl leading-tight">
                        NATURE'S TOUCH <br />
                        <span className="italic font-light">FOR BEAUTIFUL HAIR</span>
                    </h2>

                    <p className="font-sans text-[#3a2e20]/80 text-lg max-w-md mx-auto md:mx-0 leading-relaxed">
                        Pure, plant-derived formulas for naturally beautiful and healthy hair.
                        Transform your ritual with our exceptional aromas.
                    </p>

                    <button className="bg-[#1e4b78] hover:bg-[#163a5f] text-white font-sans text-lg px-10 py-3 rounded shadow-lg transition-transform transform hover:scale-105 mt-4 inline-block">
                        Discover More
                    </button>
                </div>

                {/* Right: Abstract Visuals (simulating the candle image vibe but for hair) */}
                <div className="relative flex justify-center items-center h-[400px]">
                    {/* Background geometric shape */}
                    <div className="absolute w-80 h-80 bg-white/30 rounded-full blur-3xl"></div>

                    {/* Main jar/container simulation */}
                    <div className="relative w-48 h-56 bg-[#5f4930] rounded-lg shadow-2xl flex flex-col items-center justify-center p-4 z-10 border-t-2 border-white/10">
                        <div className="w-full h-full border border-[#8da358]/30 rounded flex items-center justify-center relative">
                            <div className="bg-[#f0eadd] w-32 h-20 absolute top-8 shadow-inner flex items-center justify-center">
                                <span className="font-serif text-[10px] tracking-widest text-[#3a2e20]">HANDMADE</span>
                            </div>
                        </div>
                        {/* Lid */}
                        <div className="absolute -top-4 w-44 h-8 bg-black rounded-lg shadow-md"></div>
                    </div>

                    {/* Secondary element (stone/slab) */}
                    <div className="absolute bottom-0 right-10 md:right-20 w-40 h-16 bg-[#e6e2dd] rounded shadow-xl skew-x-12 z-0"></div>
                </div>

            </div>
        </section>
    );
};

export default Promo;
