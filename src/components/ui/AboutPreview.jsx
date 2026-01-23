import React from "react";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPreview() {
    return (
        <section className="py-24 px-4 bg-slate-50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16">
                {/* Image / Video Placeholder */}
                <div className="relative shadow-2xl shadow-[#9cae66]/20 rounded-2xl overflow-hidden shrink-0 transform rotate-2 hover:rotate-0 transition-all duration-500">
                    <img className="max-w-md w-full object-cover rounded-2xl h-[500px]"
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop"
                        alt="CEO of Exia Organics" />

                    <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors"></div>

                    {/* Play Button Overlay (Decorative) */}
                    <div className="gap-1 max-w-72 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white size-16 flex items-center justify-center aspect-square backdrop-blur-md rounded-full cursor-pointer hover:scale-110 transition-transform">
                        <Play className="fill-white text-white ml-1" size={24} />
                    </div>
                </div>

                {/* Content */}
                <div className="text-sm text-gray-600 max-w-lg">
                    <h2 className="text-xl uppercase font-bold tracking-widest text-[#1e4b78] mb-4">Our Story</h2>
                    <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-[#1e4b78] to-[#9cae66] mb-8"></div>

                    <h3 className="text-3xl font-serif text-gray-900 mb-6 leading-tight">Rooted in Nature, <br />Grounded in Science.</h3>

                    <p className="mb-6 leading-relaxed">
                        Exia Organics began with a simple question: "Why should we choose between nature and efficacy?"
                        Founded by visionary eco-entrepreneurs, we bridge the gap between ancient herbal wisdom and modern dermatological science.
                    </p>
                    <p className="mb-6 leading-relaxed">
                        Sustainable beauty isn't just a trend for us; it's our ethos. From ethically sourced ingredients to zero-waste packaging,
                        we ensure that looking good feels good—for you and the planet.
                    </p>

                    <Link to="/about">
                        <button
                            className="flex items-center gap-2 mt-4 group bg-[#1e4b78] hover:bg-[#163a5f] py-3 px-8 rounded-full text-white transition-all shadow-lg hover:shadow-xl">
                            <span className="font-medium tracking-wide">Read Our Full Story</span>
                            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                                <path
                                    d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                                    fill="#fff" />
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
