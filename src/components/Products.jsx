import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

// Animated container component with reduced motion support
const AnimatedElement = ({ children, className, delay = 0, direction = 'up' }) => {
    const shouldReduceMotion = useReducedMotion();

    const directions = {
        up: { y: 30, x: 0 },
        down: { y: -30, x: 0 },
        left: { x: 30, y: 0 },
        right: { x: -30, y: 0 },
    };

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay, duration: 0.7, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Featured product card with premium styling
const FeaturedProductCard = ({ product, index }) => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 + index * 0.1, duration: 0.6, ease: "easeOut" }}
            whileHover={shouldReduceMotion ? {} : { y: -8 }}
            className="group relative"
        >
            <Link to={`/product/${product.id}`}>
                {/* Card Container */}
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 group-hover:shadow-2xl border border-gray-100/50">

                    {/* Decorative gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#9cae66]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

                    {/* Image Container */}
                    <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100">
                        <motion.img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Hover action overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#1e4b78]/90 via-[#1e4b78]/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <span className="flex items-center gap-2 bg-white text-[#1e4b78] py-3 px-6 rounded-full font-semibold text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                                View Details
                            </span>
                        </div>

                        {/* Tags */}
                        {product.tags && product.tags.length > 0 && (
                            <div className="absolute top-4 left-4 z-20">
                                <span className="inline-block bg-[#9cae66] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                                    {product.tags[0].label}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6">
                        {/* Product Name */}
                        <h3 className="font-serif text-lg sm:text-xl text-[#1e4b78] font-semibold mb-2 line-clamp-2 group-hover:text-[#9cae66] transition-colors duration-300">
                            {product.name}
                        </h3>

                        {/* Tagline */}
                        <p className="text-gray-500 text-sm mb-4 line-clamp-1">
                            {product.tagline}
                        </p>

                        {/* Divider with organic accent */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex-1 h-px bg-gradient-to-r from-[#9cae66]/40 to-transparent" />
                            <div className="w-2 h-2 rounded-full bg-[#9cae66]/30" />
                            <div className="flex-1 h-px bg-gradient-to-l from-[#9cae66]/40 to-transparent" />
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-[#1e4b78]">
                                {product.currency} {product.price}
                            </span>
                            <motion.span
                                className="text-[#9cae66] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1"
                                whileHover={shouldReduceMotion ? {} : { x: 3 }}
                            >
                                <span className="text-sm font-medium">Shop</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </motion.span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

const Products = () => {
    // Get featured products (first 4 products for the homepage section)
    const featuredProducts = products.slice(0, 4);

    return (
        <section className="relative w-full overflow-hidden py-20 md:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white">

            {/* Decorative organic elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#9cae66]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1e4b78]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            {/* Floating organic shapes */}
            <motion.div
                className="absolute top-20 left-10 w-24 h-24 opacity-20 pointer-events-none hidden lg:block"
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 0C60 20 100 30 100 50C100 70 60 80 50 100C40 80 0 70 0 50C0 30 40 20 50 0Z" fill="#9cae66" />
                </svg>
            </motion.div>

            <motion.div
                className="absolute bottom-32 right-16 w-16 h-16 opacity-15 pointer-events-none hidden lg:block"
                animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="50" fill="#1e4b78" />
                </svg>
            </motion.div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center mb-16 md:mb-20">
                    <AnimatedElement delay={0}>
                        <span className="inline-block text-[#9cae66] font-semibold text-sm uppercase tracking-widest mb-4">
                            Our Collection
                        </span>
                    </AnimatedElement>

                    <AnimatedElement delay={0.1}>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1e4b78] mb-6">
                            Nature's Best <span className="italic text-[#9cae66]">Essentials</span>
                        </h2>
                    </AnimatedElement>

                    <AnimatedElement delay={0.2}>
                        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Discover our curated selection of organic haircare products,
                            crafted with pure ingredients for your natural beauty.
                        </p>
                    </AnimatedElement>

                    <AnimatedElement delay={0.3}>
                        <div className="flex items-center justify-center gap-3 mt-8">
                            <div className="w-16 h-1 bg-gradient-to-r from-transparent to-[#9cae66] rounded-full" />
                            <div className="w-3 h-3 rounded-full bg-[#9cae66]" />
                            <div className="w-16 h-1 bg-gradient-to-l from-transparent to-[#9cae66] rounded-full" />
                        </div>
                    </AnimatedElement>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
                    {featuredProducts.map((product, index) => (
                        <FeaturedProductCard
                            key={product.id}
                            product={product}
                            index={index}
                        />
                    ))}
                </div>

                {/* View All Products CTA */}
                <AnimatedElement delay={0.5} className="text-center">
                    <Link
                        to="/products"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-[#1e4b78] text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#163657]"
                    >
                        <span>Explore All Products</span>
                        <motion.span
                            className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full"
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </motion.span>
                    </Link>

                    <p className="mt-4 text-gray-500 text-sm">
                        {products.length} premium products available
                    </p>
                </AnimatedElement>

            </div>

            {/* Bottom decorative wave */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#9cae66]/30 to-transparent" />
        </section>
    );
};

export default Products;
