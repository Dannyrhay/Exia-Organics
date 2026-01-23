import React from "react";
import { ProductCard } from "../components/ui/ProductCard";
import { motion } from "motion/react";
import { products } from "../data/products";

// Animation variants for the container and items
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, // Delay between each child animation
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
        },
    },
};

export default function ProductsPage() {
    return (
        <div className="w-full bg-slate-50 min-h-screen px-4 py-24">
            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 font-serif">
                        Nature's Embrace
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">Curated organic essentials for your daily routine</p>
                </div>

                {/* Responsive Product Grid with Staggered Animation */}
                <motion.div
                    className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {products.map((product) => (
                        <motion.div key={product.id} variants={itemVariants}>
                            <ProductCard {...product} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
