import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { products, shortName } from '@/data/products';
import { formatPrice } from '@/data/site';
import WhatsAppButton from '@/components/brand/WhatsAppButton';
import hero800 from '@/assets/hero-lineup-800.webp';
import hero1600 from '@/assets/hero-lineup-1600.webp';

const featured = products.find((p) => p.featured) ?? products[0];
const ease = [0.22, 1, 0.36, 1];

export default function HeroRitual() {
    const reduce = useReducedMotion();
    const rise = (delay) =>
        reduce
            ? {}
            : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease } };

    return (
        <section className="relative overflow-hidden">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 pt-8 sm:px-6 md:pt-14 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-8 lg:pb-20 lg:pt-10">
                {/* copy */}
                <div className="flex flex-col gap-6 lg:col-span-5 lg:pr-4">
                    <motion.p {...rise(0.05)} className="font-mono text-xs uppercase tracking-[0.2em] text-wood">
                        Handcrafted in Ghana · Est. 2020
                    </motion.p>
                    <motion.h1
                        {...rise(0.12)}
                        className="font-display text-[clamp(2.9rem,10.5vw,5.6rem)] leading-[0.95] tracking-[-0.02em] text-indigo-deep"
                    >
                        Herbal care for <em className="italic text-indigo">natural crowns.</em>
                    </motion.h1>
                    <motion.p {...rise(0.24)} className="max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
                        Shampoos, butters and oils for natural and textured hair. Pick what your hair needs and order it in a single WhatsApp message.
                    </motion.p>
                    <motion.div {...rise(0.34)} className="flex flex-wrap items-center gap-3">
                        <Link
                            to="/products"
                            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-indigo px-6 text-sm font-semibold text-shea transition-colors hover:bg-indigo-deep"
                        >
                            Shop the collection <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                        <WhatsAppButton variant="outline" className="min-h-12" />
                    </motion.div>
                </div>

                {/* photo + floating product card */}
                <div className="relative lg:col-span-7">
                    <motion.div
                        initial={reduce ? false : { opacity: 0, scale: 1.03 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.1, ease }}
                        className="relative overflow-hidden rounded-md bg-shea-deep sm:aspect-[5/4] max-sm:aspect-square"
                    >
                        <img
                            src={hero1600}
                            srcSet={`${hero800} 800w, ${hero1600} 1600w`}
                            sizes="(min-width: 1024px) 58vw, 100vw"
                            alt="The Exia Organics range lined up on a wooden table: repair oil, growth butter, leave-in conditioner, moisturizing shampoo, conditioner and herbal shampoo."
                            fetchPriority="high"
                            className="size-full object-cover object-[50%_88%]"
                        />
                        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-indigo-deep/25 to-transparent" />
                    </motion.div>

                    <motion.aside
                        aria-label="Bestseller"
                        initial={reduce ? false : { opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.55, ease }}
                        className="absolute inset-x-3 bottom-3 flex items-center gap-4 rounded-md bg-paper/95 p-3 shadow-[0_18px_50px_-20px_rgba(22,18,63,0.55)] backdrop-blur-sm sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[380px] lg:-left-10"
                    >
                        <Link to={`/product/${featured.id}`} className="shrink-0">
                            <img
                                src={featured.imageUrl}
                                alt=""
                                className="size-20 rounded-sm object-cover object-[50%_70%] sm:size-24"
                            />
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col gap-2">
                            <div className="flex items-baseline justify-between gap-2">
                                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-wood">Bestseller</p>
                                <p className="font-mono text-sm text-indigo">{formatPrice(featured.price, featured.currency)}</p>
                            </div>
                            <Link to={`/product/${featured.id}`} className="font-display text-xl leading-tight text-indigo-deep hover:underline hover:underline-offset-4">
                                {shortName(featured)}
                            </Link>
                            <WhatsAppButton product={featured} className="min-h-9 self-start px-4 text-xs">
                                Order now
                            </WhatsAppButton>
                        </div>
                    </motion.aside>
                </div>
            </div>
        </section>
    );
}
