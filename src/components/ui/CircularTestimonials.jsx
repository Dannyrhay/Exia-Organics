import React, {
    useEffect,
    useRef,
    useState,
    useMemo,
    useCallback,
} from "react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./CircularTestimonials.css";

function calculateGap(width) {
    const minWidth = 1024;
    const maxWidth = 1456;
    const minGap = 60;
    const maxGap = 86;
    if (width <= minWidth) return minGap;
    if (width >= maxWidth)
        return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
    return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
    testimonials,
    autoplay = true,
    colors = {},
    fontSizes = {},
}) => {
    // Color & font config
    const colorName = colors.name ?? "#1e4b78";
    const colorDesignation = colors.designation ?? "#9cae66";
    const colorTestimony = colors.testimony ?? "#4b5563";
    const colorArrowBg = colors.arrowBackground ?? "#ffffff";
    const colorArrowFg = colors.arrowForeground ?? "#1e4b78";
    const colorArrowHoverBg = colors.arrowHoverBackground ?? "#1e4b78";
    const colorArrowHoverFg = colors.arrowHoverForeground ?? "#ffffff";
    const fontSizeName = fontSizes.name ?? "2rem";
    const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
    const fontSizeQuote = fontSizes.quote ?? "1.125rem";

    // State
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoverPrev, setHoverPrev] = useState(false);
    const [hoverNext, setHoverNext] = useState(false);
    const [containerWidth, setContainerWidth] = useState(1200);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const imageContainerRef = useRef(null);
    const autoplayIntervalRef = useRef(null);

    const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
    const activeTestimonial = useMemo(
        () => testimonials[activeIndex],
        [activeIndex, testimonials]
    );

    // Responsive gap calculation
    useEffect(() => {
        function handleResize() {
            if (imageContainerRef.current) {
                setContainerWidth(imageContainerRef.current.offsetWidth);
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Autoplay
    useEffect(() => {
        if (autoplay) {
            autoplayIntervalRef.current = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % testimonialsLength);
            }, 5000);
        }
        return () => {
            if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
        };
    }, [autoplay, testimonialsLength]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
        // eslint-disable-next-line
    }, [activeIndex, testimonialsLength]);

    // Navigation handlers
    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    }, [testimonialsLength]);
    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    }, [testimonialsLength]);

    // Compute transforms for each image (always show 3: left, center, right)
    function getImageStyle(index) {
        const gap = calculateGap(containerWidth);
        const maxStickUp = gap * 0.8;
        // Calculate distance from active index handling wrap-around
        let offset = (index - activeIndex + testimonialsLength) % testimonialsLength;

        // Normalize offset to be -1, 0, or 1 for the immediate neighbors
        if (offset > testimonialsLength / 2) offset -= testimonialsLength;

        const isActive = index === activeIndex;
        const isLeft = offset === -1 || (index === (activeIndex - 1 + testimonialsLength) % testimonialsLength);
        const isRight = offset === 1 || (index === (activeIndex + 1) % testimonialsLength);


        if (isActive) {
            return {
                zIndex: 3,
                opacity: 1,
                pointerEvents: "auto",
                transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
                filter: "brightness(1)",
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        if (isLeft) {
            return {
                zIndex: 2,
                opacity: 1, // Fixed: Was 0.7, causing transparency issue
                pointerEvents: "auto",
                transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
                filter: "brightness(0.7)", // dimmed instead of transparent
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        if (isRight) {
            return {
                zIndex: 2,
                opacity: 1, // Fixed: Was 0.7, causing transparency issue
                pointerEvents: "auto",
                transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
                filter: "brightness(0.7)", // dimmed instead of transparent
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        // Hide all other images
        return {
            zIndex: 1,
            opacity: 0,
            pointerEvents: "none",
            transform: `translateX(0px) translateY(0px) scale(0.5)`, // Reset transform to center to avoid flying in from weird places
            transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
        };
    }

    // Framer Motion variants for quote
    const quoteVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    const handleCardClick = (testimonial) => {
        if (testimonial.isVideo && testimonial.videoSrc) {
            setSelectedVideo(testimonial.videoSrc);
        }
    };

    return (
        <>
            <div className="testimonial-container">
                <div className="testimonial-grid">
                    {/* Images */}
                    <div className="image-container" ref={imageContainerRef}>
                        {testimonials.map((testimonial, index) => {
                            const style = getImageStyle(index);
                            // Only render if opacity > 0 to save resources, but we need structure for transitions.
                            // Actually CSS handles opacity transition, so always render.
                            return (
                                <div
                                    key={testimonial.src + index}
                                    className="testimonial-image-wrapper"
                                    data-index={index}
                                    style={{
                                        ...style,
                                        cursor: testimonial.isVideo ? 'pointer' : 'default'
                                    }}
                                    onClick={() => handleCardClick(testimonial)}
                                >
                                    <img
                                        src={testimonial.src}
                                        alt={testimonial.name}
                                        className="testimonial-image"
                                    />
                                    {testimonial.isVideo && (
                                        <div className="play-overlay">
                                            <div className="play-icon">
                                                <Play fill="currentColor" size={24} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    {/* Content */}
                    <div className="testimonial-content">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                variants={quoteVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <h3
                                    className="name"
                                    style={{ color: colorName, fontSize: fontSizeName }}
                                >
                                    {activeTestimonial.name}
                                </h3>
                                <p
                                    className="designation"
                                    style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
                                >
                                    {activeTestimonial.designation}
                                </p>
                                <motion.p
                                    className="quote"
                                    style={{ color: colorTestimony, fontSize: fontSizeQuote }}
                                >
                                    {activeTestimonial.quote.split(" ").map((word, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{
                                                filter: "blur(10px)",
                                                opacity: 0,
                                                y: 5,
                                            }}
                                            animate={{
                                                filter: "blur(0px)",
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                duration: 0.22,
                                                ease: "easeInOut",
                                                delay: 0.025 * i,
                                            }}
                                            style={{ display: "inline-block" }}
                                        >
                                            {word}&nbsp;
                                        </motion.span>
                                    ))}
                                </motion.p>
                            </motion.div>
                        </AnimatePresence>
                        <div className="arrow-buttons">
                            <button
                                className="arrow-button prev-button"
                                onClick={handlePrev}
                                style={{
                                    backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
                                    color: hoverPrev ? colorArrowHoverFg : colorArrowFg
                                }}
                                onMouseEnter={() => setHoverPrev(true)}
                                onMouseLeave={() => setHoverPrev(false)}
                                aria-label="Previous testimonial"
                            >
                                <ArrowLeft size={24} />
                            </button>
                            <button
                                className="arrow-button next-button"
                                onClick={handleNext}
                                style={{
                                    backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
                                    color: hoverNext ? colorArrowHoverFg : colorArrowFg
                                }}
                                onMouseEnter={() => setHoverNext(true)}
                                onMouseLeave={() => setHoverNext(false)}
                                aria-label="Next testimonial"
                            >
                                <ArrowRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div
                            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                src={selectedVideo}
                                className="w-full h-full"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                title="Testimonial Video"
                            ></iframe>
                            <button
                                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                                onClick={() => setSelectedVideo(null)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CircularTestimonials;
