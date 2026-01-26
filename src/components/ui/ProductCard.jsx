import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";

const ProductCard = React.forwardRef(
    (
        {
            className,
            id,
            imageUrl,
            name,
            tagline,
            price,
            currency = "GHS",
            isCouponPrice = false,
            originalPrice,
            offerText,
            ...props
        },
        ref
    ) => {
        // Price formatter for consistent currency display
        const formatPrice = (amount) => {
            return new Intl.NumberFormat("en-GH", {
                style: "currency",
                currency: "GHS",
                minimumFractionDigits: 0,
            })
                .format(amount)
                .replace("GHS", `${currency}`);
        };

        return (
            <motion.div
                ref={ref}
                className={cn(
                    "group relative flex h-full w-full flex-col items-center justify-start overflow-hidden rounded-xl border bg-card p-6 text-center text-card-foreground shadow-sm transition-all duration-300 ease-in-out hover:shadow-md bg-white",
                    className
                )}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                {...props}
            >
                {/* Product Image */}
                <div className="relative mb-4 flex h-40 w-full items-center justify-center">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                {/* Product Details */}
                <div className="flex flex-grow flex-col items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{name}</h3>
                    <p className="text-sm text-gray-500">{tagline}</p>
                </div>

                {/* Pricing and Offers */}
                {/* Pricing removed as per request */}
                <div className="mt-4 flex flex-col items-center gap-2"></div>
                <div className="mt-4 w-full">
                    <Link to={`/product/${id}`} className="block w-full">
                        <button className="w-full rounded-full bg-[#1e3a5f] py-2 text-sm font-semibold text-white transition-colors hover:bg-[#152a45]">
                            View Details
                        </button>
                    </Link>
                </div>
            </motion.div>
        );
    }
);

ProductCard.displayName = "ProductCard";

export { ProductCard };
