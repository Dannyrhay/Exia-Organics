import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SITE } from '@/data/site';
import WhatsAppButton from '@/components/brand/WhatsAppButton';
import logo from '../assets/logo.webp';

const navLinks = [
    { name: 'Shop', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Journal', path: '/blog' },
    { name: 'Reviews', path: '/testimonials' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Contact', path: '/contact' },
];

export function BrandMark({ className, tone = 'dark' }) {
    return (
        <Link to="/" className={cn('flex min-h-11 items-center gap-2.5', className)}>
            <img src={logo} alt="" width="36" height="36" className="size-9 rounded-full object-cover" />
            <span className={cn('font-display text-xl leading-none', tone === 'light' ? 'text-shea' : 'text-indigo-deep')}>
                Exia <em className="italic">Organics</em>
            </span>
            <span className="sr-only">home</span>
        </Link>
    );
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const reduce = useReducedMotion();

    // Lock page scroll while the menu sheet is open.
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <header className="sticky top-0 z-40 border-b border-line/70 bg-shea/90 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
                <BrandMark />

                <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
                    {navLinks.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                cn(
                                    'text-sm font-medium transition-colors hover:text-indigo',
                                    isActive ? 'text-indigo underline decoration-lid decoration-2 underline-offset-8' : 'text-ink',
                                )
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <WhatsAppButton className="hidden sm:inline-flex" variant="solid">
                        Order
                    </WhatsAppButton>
                    <button
                        type="button"
                        className="inline-flex size-11 items-center justify-center rounded-full text-indigo-deep hover:bg-shea-deep lg:hidden"
                        onClick={() => setIsOpen(true)}
                        aria-label="Open menu"
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                    >
                        <Menu className="size-6" />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menu"
                        className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-indigo-deep px-6 pb-10 pt-[max(1rem,env(safe-area-inset-top))] text-shea lg:hidden"
                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: '-4%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="flex h-12 items-center justify-between">
                            <BrandMark tone="light" />
                            <button
                                type="button"
                                className="inline-flex size-11 items-center justify-center rounded-full hover:bg-shea/10"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close menu"
                            >
                                <X className="size-6" />
                            </button>
                        </div>

                        <nav aria-label="Mobile" className="mt-10 flex flex-col">
                            {[{ name: 'Home', path: '/' }, ...navLinks].map((item, i) => (
                                <motion.div
                                    key={item.path}
                                    initial={reduce ? false : { opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 + i * 0.04 }}
                                >
                                    <NavLink
                                        to={item.path}
                                        end={item.path === '/'}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) =>
                                            cn(
                                                'flex items-baseline justify-between border-b border-shea/15 py-4 font-display text-4xl',
                                                isActive ? 'italic text-lid' : 'text-shea',
                                            )
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                </motion.div>
                            ))}
                        </nav>

                        <div className="mt-auto flex flex-col gap-3 pt-10">
                            <WhatsAppButton variant="light" className="min-h-13 text-base" />
                            <p className="text-center font-mono text-xs text-shea/60">{SITE.phoneDisplay} · {SITE.hours}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
