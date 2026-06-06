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

function getImagePosition(index, activeIndex, testimonialsLength) {
    if (index === activeIndex) return "active";

    const previousIndex = (activeIndex - 1 + testimonialsLength) % testimonialsLength;
    const nextIndex = (activeIndex + 1) % testimonialsLength;

    if (index === previousIndex) return "left";
    if (index === nextIndex) return "right";
    return "hidden";
}

const IMAGE_STYLE_PRESETS = {
    active: {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        filter: "brightness(1)",
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    },
    left: {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        filter: "brightness(0.7)",
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    },
    right: {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        filter: "brightness(0.7)",
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    },
    hidden: {
        zIndex: 1,
        opacity: 0,
        pointerEvents: "none",
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    },
};

function getImageStyle(index, activeIndex, testimonialsLength, containerWidth) {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const position = getImagePosition(index, activeIndex, testimonialsLength);
    const baseStyle = IMAGE_STYLE_PRESETS[position];

    const transforms = {
        active: "translateX(0px) translateY(0px) scale(1) rotateY(0deg)",
        left: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        right: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        hidden: "translateX(0px) translateY(0px) scale(0.5)",
    };

    return {
        ...baseStyle,
        transform: transforms[position],
    };
}

const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

function AnimatedQuoteWords({ quote, fontSizeQuote, colorTestimony }) {
    return (
        <motion.p className="quote" style={{ color: colorTestimony, fontSize: fontSizeQuote }}>
            {quote.split(" ").map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut", delay: 0.025 * i }}
                    style={{ display: "inline-block" }}
                >
                    {word}&nbsp;
                </motion.span>
            ))}
        </motion.p>
    );
}

function TestimonialImages({
    testimonials,
    activeIndex,
    testimonialsLength,
    containerWidth,
    imageContainerRef,
    onCardClick,
}) {
    return (
        <div className="image-container" ref={imageContainerRef}>
            {testimonials.map((testimonial, index) => {
                const style = getImageStyle(index, activeIndex, testimonialsLength, containerWidth);

                return (
                    <div
                        key={testimonial.src + index}
                        className="testimonial-image-wrapper"
                        data-index={index}
                        style={{
                            ...style,
                            cursor: testimonial.isVideo ? "pointer" : "default",
                        }}
                        onClick={() => onCardClick(testimonial)}
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
    );
}

const DEFAULT_TESTIMONIAL_COLORS = {
    name: "#1e4b78",
    designation: "#9cae66",
    testimony: "#4b5563",
    arrowBackground: "#ffffff",
    arrowForeground: "#1e4b78",
    arrowHoverBackground: "#1e4b78",
    arrowHoverForeground: "#ffffff",
};

const DEFAULT_TESTIMONIAL_FONT_SIZES = {
    name: "2rem",
    designation: "0.925rem",
    quote: "1.125rem",
};

function resolveTestimonialTheme(colors, fontSizes) {
    const mergedColors = { ...DEFAULT_TESTIMONIAL_COLORS, ...colors };
    const mergedFontSizes = { ...DEFAULT_TESTIMONIAL_FONT_SIZES, ...fontSizes };

    return {
        colorName: mergedColors.name,
        colorDesignation: mergedColors.designation,
        colorTestimony: mergedColors.testimony,
        colorArrowBg: mergedColors.arrowBackground,
        colorArrowFg: mergedColors.arrowForeground,
        colorArrowHoverBg: mergedColors.arrowHoverBackground,
        colorArrowHoverFg: mergedColors.arrowHoverForeground,
        fontSizeName: mergedFontSizes.name,
        fontSizeDesignation: mergedFontSizes.designation,
        fontSizeQuote: mergedFontSizes.quote,
    };
}

function TestimonialNavButton({ className, onClick, arrowColors, icon: Icon, label }) {
    const [hovered, setHovered] = useState(false);

    return (
        <button
            className={className}
            onClick={onClick}
            style={{
                backgroundColor: hovered ? arrowColors.hoverBg : arrowColors.bg,
                color: hovered ? arrowColors.hoverFg : arrowColors.fg,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-label={label}
        >
            <Icon size={24} />
        </button>
    );
}

function TestimonialQuotePanel({
    activeIndex,
    activeTestimonial,
    colors,
    fontSizes,
    onPrev,
    onNext,
}) {
    const theme = resolveTestimonialTheme(colors, fontSizes);
    const arrowColors = {
        bg: theme.colorArrowBg,
        fg: theme.colorArrowFg,
        hoverBg: theme.colorArrowHoverBg,
        hoverFg: theme.colorArrowHoverFg,
    };

    return (
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
                    <h3 className="name" style={{ color: theme.colorName, fontSize: theme.fontSizeName }}>
                        {activeTestimonial.name}
                    </h3>
                    <p className="designation" style={{ color: theme.colorDesignation, fontSize: theme.fontSizeDesignation }}>
                        {activeTestimonial.designation}
                    </p>
                    <AnimatedQuoteWords
                        quote={activeTestimonial.quote}
                        fontSizeQuote={theme.fontSizeQuote}
                        colorTestimony={theme.colorTestimony}
                    />
                </motion.div>
            </AnimatePresence>
            <div className="arrow-buttons">
                <TestimonialNavButton
                    className="arrow-button prev-button"
                    onClick={onPrev}
                    arrowColors={arrowColors}
                    icon={ArrowLeft}
                    label="Previous testimonial"
                />
                <TestimonialNavButton
                    className="arrow-button next-button"
                    onClick={onNext}
                    arrowColors={arrowColors}
                    icon={ArrowRight}
                    label="Next testimonial"
                />
            </div>
        </div>
    );
}

function TestimonialVideoModal({ videoSrc, onClose }) {
    if (!videoSrc) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <iframe
                        src={videoSrc}
                        className="w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title="Testimonial Video"
                    />
                    <button
                        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                        onClick={onClose}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function useTestimonialCarousel(testimonials, autoplay) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [containerWidth, setContainerWidth] = useState(1200);
    const imageContainerRef = useRef(null);
    const autoplayIntervalRef = useRef(null);

    const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
    const activeTestimonial = useMemo(
        () => testimonials[activeIndex],
        [activeIndex, testimonials],
    );

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

    useEffect(() => {
        if (!autoplay) return undefined;

        autoplayIntervalRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonialsLength);
        }, 5000);

        return () => {
            if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
        };
    }, [autoplay, testimonialsLength]);

    const clearAutoplay = useCallback(() => {
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    }, []);

    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
        clearAutoplay();
    }, [testimonialsLength, clearAutoplay]);

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
        clearAutoplay();
    }, [testimonialsLength, clearAutoplay]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [handleNext, handlePrev]);

    return {
        activeIndex,
        activeTestimonial,
        testimonialsLength,
        containerWidth,
        imageContainerRef,
        handleNext,
        handlePrev,
    };
}

const CircularTestimonials = ({
    testimonials,
    autoplay = true,
    colors = {},
    fontSizes = {},
}) => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const {
        activeIndex,
        activeTestimonial,
        testimonialsLength,
        containerWidth,
        imageContainerRef,
        handleNext,
        handlePrev,
    } = useTestimonialCarousel(testimonials, autoplay);

    const handleCardClick = (testimonial) => {
        if (testimonial.isVideo && testimonial.videoSrc) {
            setSelectedVideo(testimonial.videoSrc);
        }
    };

    return (
        <>
            <div className="testimonial-container">
                <div className="testimonial-grid">
                    <TestimonialImages
                        testimonials={testimonials}
                        activeIndex={activeIndex}
                        testimonialsLength={testimonialsLength}
                        containerWidth={containerWidth}
                        imageContainerRef={imageContainerRef}
                        onCardClick={handleCardClick}
                    />
                    <TestimonialQuotePanel
                        activeIndex={activeIndex}
                        activeTestimonial={activeTestimonial}
                        colors={colors}
                        fontSizes={fontSizes}
                        onPrev={handlePrev}
                        onNext={handleNext}
                    />
                </div>
            </div>
            <TestimonialVideoModal videoSrc={selectedVideo} onClose={() => setSelectedVideo(null)} />
        </>
    );
};

export default CircularTestimonials;
