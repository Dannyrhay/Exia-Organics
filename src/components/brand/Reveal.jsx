import { motion, useReducedMotion } from 'motion/react';

/**
 * Lifts children into place once when they scroll into view. Only `y` animates, never
 * opacity, so content is readable at rest (screenshots, crawlers, slow devices).
 * Static under reduced motion.
 */
export default function Reveal({ as = 'div', delay = 0, className, children }) {
    const reduce = useReducedMotion();
    const Tag = motion[as];

    if (reduce) {
        const Plain = as;
        return <Plain className={className}>{children}</Plain>;
    }

    return (
        <Tag
            className={className}
            initial={{ y: 28 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </Tag>
    );
}
