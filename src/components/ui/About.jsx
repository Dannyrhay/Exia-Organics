import React from "react";
import { Leaf, Award, Recycle, Heart, Droplet, ShieldCheck } from "lucide-react";

export default function About() {
    return (
        <section className="py-20 px-8 md:px-16 bg-white">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            <h1 className="text-4xl font-serif font-semibold text-center mx-auto text-[#1e4b78]">Our Promise</h1>
            <p className="text-base text-gray-500 text-center mt-4 max-w-2xl mx-auto">
                At Exia Organics, we believe in the power of nature. Every product is a testament to our commitment to purity, sustainability, and effective natural care.
            </p>
            <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 pt-16">
                <div className="size-[520px] -top-80 left-1/2 -translate-x-1/2 rounded-full absolute blur-[300px] -z-10 bg-[#eef5d8]"></div>

                <div>
                    <div className="size-12 p-2 bg-[#f4f7eb] border border-[#d8e3b8] rounded-full flex items-center justify-center">
                        <Leaf className="text-[#9cae66]" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-lg font-medium text-gray-800">100% Organic Ingredients</h3>
                        <p className="text-sm text-gray-500">Sourced directly from certified organic farms, ensuring no harmful chemicals touch your skin.</p>
                    </div>
                </div>

                <div>
                    <div className="size-12 p-2 bg-[#f4f7eb] border border-[#d8e3b8] rounded-full flex items-center justify-center">
                        <Award className="text-[#9cae66]" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-lg font-medium text-gray-800">Certified Excellence</h3>
                        <p className="text-sm text-gray-500">Our formulas are dermatologically tested and certified for safety and efficacy.</p>
                    </div>
                </div>

                <div>
                    <div className="size-12 p-2 bg-[#f4f7eb] border border-[#d8e3b8] rounded-full flex items-center justify-center">
                        <Recycle className="text-[#9cae66]" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-lg font-medium text-gray-800">Eco-Friendly Packaging</h3>
                        <p className="text-sm text-gray-500">We love the planet as much as you do. Our packaging is recyclable and biodegradable.</p>
                    </div>
                </div>

                <div>
                    <div className="size-12 p-2 bg-[#f4f7eb] border border-[#d8e3b8] rounded-full flex items-center justify-center">
                        <Heart className="text-[#9cae66]" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-lg font-medium text-gray-800">Cruelty-Free</h3>
                        <p className="text-sm text-gray-500">Compassion is our core. None of our products are ever tested on animals.</p>
                    </div>
                </div>

                <div>
                    <div className="size-12 p-2 bg-[#f4f7eb] border border-[#d8e3b8] rounded-full flex items-center justify-center">
                        <Droplet className="text-[#9cae66]" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-lg font-medium text-gray-800">Pure Formulations</h3>
                        <p className="text-sm text-gray-500">Free from parabens, sulfates, and synthetic fragrances. Just pure goodness.</p>
                    </div>
                </div>

                <div>
                    <div className="size-12 p-2 bg-[#f4f7eb] border border-[#d8e3b8] rounded-full flex items-center justify-center">
                        <ShieldCheck className="text-[#9cae66]" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-lg font-medium text-gray-800">Transparency First</h3>
                        <p className="text-sm text-gray-500">We believe in full disclosure. Every ingredient is listed with its purpose and origin.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
