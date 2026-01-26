import * as React from "react";
import { ChevronRight, Star, ShoppingCart, Send, Camera, Heart, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// A small component for rendering rating stars
const StarRating = ({ rating, className }) => (
    <div className={cn("flex items-center gap-0.5", className)}>
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={cn(
                    "h-4 w-4",
                    i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"
                )}
            />
        ))}
        <span className="ml-2 text-sm font-medium text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
);

export const ProductDetailPage = ({ product, seller, breadcrumbs }) => {
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    // Use the single image provided in the product data for the gallery
    // If there were multiple images, we would map specific ones here.
    const images = [product.imageUrl];

    const handleContactSeller = () => {
        // Create a pre-filled WhatsApp message
        const text = encodeURIComponent(`Hi, I am interested in ${product.name}. Is it available?`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8 bg-white text-gray-900">
            {/* Breadcrumbs Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center text-sm text-muted-foreground mb-4">
                {breadcrumbs.map((item, index) => (
                    <React.Fragment key={index}>
                        <a href={item.href} className="hover:text-primary transition-colors">{item.label}</a>
                        {index < breadcrumbs.length - 1 && <ChevronRight className="h-4 w-4 mx-1" />}
                    </React.Fragment>
                ))}
            </nav>

            <div className="flex justify-between items-center mb-6">
                <div /> {/* Spacer */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Heart className="h-5 w-5" />
                        <span className="sr-only">Favorite</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Share2 className="h-5 w-5" />
                        <span className="sr-only">Share</span>
                    </Button>
                </div>
            </div>


            {/* Main content grid */}
            <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {/* Image Gallery Section */}
                <div className="flex flex-col gap-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm"
                        >
                            <img
                                src={images[currentImageIndex]}
                                alt={`${product.name} image`}
                                className="object-cover w-full h-full"
                            />
                        </motion.div>
                    </AnimatePresence>
                    {/* Only show thumbnails if multiple images exist (future proofing) */}
                    {images.length > 1 && (
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={cn(
                                            "h-2 w-2 rounded-full transition-colors",
                                            currentImageIndex === index ? "bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                        )}
                                        aria-label={`View image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Product Details Section */}
                <div className="flex flex-col">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-[#1e3a5f]">{product.name}</h1>
                    <p className="text-lg text-gray-500 mt-2 italic">{product.tagline}</p>

                    <div className="mt-4 flex items-baseline gap-4">
                        <span className="text-4xl font-bold text-[#8da358]">
                            {new Intl.NumberFormat("en-GH", {
                                style: "currency",
                                currency: "GHS",
                                minimumFractionDigits: 0,
                            }).format(product.price).replace("GHS", product.currency)}
                        </span>
                    </div>




                    <div className="flex gap-2 my-8">
                        <Button size="lg" className="flex-1 gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white" onClick={handleContactSeller}>
                            <Send className="h-5 w-5" /> Contact Seller via WhatsApp
                        </Button>
                    </div>

                    {/* Tags/Badges */}


                    {/* Description */}
                    <div className="prose prose-stone text-gray-600 leading-relaxed">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                        <p>{product.description}</p>
                    </div>

                    {/* Seller Information */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={seller.avatarUrl} alt={seller.name} />
                                    <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-gray-900">{seller.name}</p>
                                    <p className="text-sm text-gray-500">Verified Seller</p>
                                    <StarRating rating={seller.rating} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
