import React from 'react';

const products = [
    { id: 1, name: "Volumizing Shampoo", price: "$28.00", color: "bg-amber-100" },
    { id: 2, name: "Scalp Treatment", price: "$32.00", color: "bg-stone-200" },
    { id: 3, name: "Bond Repair", price: "$45.00", color: "bg-emerald-100" },
    { id: 4, name: "Deep Conditioner", price: "$30.00", color: "bg-rose-100" },
];

const Products = () => {
    return (
        <section className="w-full bg-[#1e3a5f] py-20 px-6 md:px-16">

            {/* Header */}
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl md:text-5xl font-serif text-white tracking-wide">
                    EXPLORE OUR <span className="italic">PRODUCTS</span>
                </h2>
                <p className="text-white/80 font-sans text-lg max-w-2xl mx-auto">
                    Experience the pure essence of nature in your haircare ritual.
                </p>
                <div className="w-24 h-0.5 bg-white/30 mx-auto mt-6"></div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="group bg-white rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                    >
                        {/* Image Placeholder */}
                        <div className={`h-64 ${product.color} flex items-center justify-center relative overflow-hidden`}>
                            {/* Abstract Bottle Shape */}
                            <div className="w-20 h-32 bg-white/40 backdrop-blur-sm rounded-t-full rounded-b-xl shadow-sm border border-white/20"></div>
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="bg-white text-[#1e3a5f] py-2 px-6 rounded-full font-serif text-sm font-semibold shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                                    View
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 text-center space-y-2">
                            <h3 className="font-serif text-xl text-[#3a2e20]">{product.name}</h3>
                            <p className="font-sans text-[#8da358] font-bold">{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Products;
