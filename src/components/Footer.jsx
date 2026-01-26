import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Facebook } from 'lucide-react';
import logo from '../assets/logo.JPG';
import { Link } from 'react-router-dom';

// Custom icons
const TikTokIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
)

const WhatsAppIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><path d="M16.95 14.45c.5.5.75 1.15.55 1.85-.25.9-1.5 1.55-2.6 1.4-3.55-.5-5.95-3.3-6.1-3.6-.15-.3-1-1.75-.4-2.85.35-.65 1.05-.9 1.55-.9.4 0 .7.2.85.45.2.4.6 1.5.7 1.7.1.25.05.5-.05.7-.1.25-.25.35-.5.55-.2.2-.45.3-.2.7.25.5 1.1 1.95 2.4 3.05.55.5 1.05.75 1.45.85.25.05.55-.05.7-.25.25-.3.65-.9.85-1.2" /></svg>
)

const SnapchatIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.5 9c0 0 3-4 7.5-4s7.5 4 7.5 4v5c0 0-1.5 1-2.5 1s-4.5-2.5-5-2.5-4 2.5-5 2.5-2.5-1-2.5-1z" /><circle cx="8" cy="12" r="1" /><circle cx="16" cy="12" r="1" /></svg>
)

const footerLinks = [
    {
        label: 'Product',
        links: [
            { title: 'Haircare', href: '/products' },
            { title: 'Bundles', href: '/products' },
            { title: 'Testimonials', href: '/testimonials' },
        ],
    },
    {
        label: 'Company',
        links: [
            { title: 'About Us', href: '/about' },
            { title: 'Our Story', href: '/about' },
            { title: 'Privacy Policy', href: 'https://www.termsfeed.com/live/60c05952-43e8-4527-9671-1873f70a2e78' },
            { title: 'Terms of Services', href: 'https://www.termsfeed.com/live/2292d25e-373a-4125-95ce-594ce6f112f3' },
        ],
    },
    {
        label: 'Support',
        links: [
            { title: 'FAQs', href: '/faqs' },
            { title: 'Contact Us', href: '/contact' },
        ],
    },
    {
        label: 'Social Links',
        links: [
            { title: 'Snapchat', href: 'https://snapchat.com', icon: SnapchatIcon },
            { title: 'Facebook', href: 'https://facebook.com', icon: Facebook },
            { title: 'TikTok', href: 'https://tiktok.com', icon: TikTokIcon },
            { title: 'WhatsApp', href: 'https://whatsapp.com', icon: WhatsAppIcon },
        ],
    },
];

const Footer = () => {
    return (
        <footer className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center border-t border-gray-100 bg-white pt-16 pb-8 px-6 lg:px-8 mt-12 mb-6 rounded-3xl shadow-sm">
            {/* Soft background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white -z-10 rounded-3xl" />

            <div className="grid w-full gap-12 xl:grid-cols-3 xl:gap-8">
                {/* Brand Column */}
                <AnimatedContainer className="flex flex-col items-start space-y-4">
                    <div className="flex items-center space-x-3">
                        <img src={logo} alt="Exia Organics" className="h-10 w-10 rounded-full object-cover" />
                        <span className="text-xl font-serif font-bold text-[#1e4b78]">Exia Organics</span>
                    </div>
                    <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                        Pure, sustainable, and ethically sourced. We bring nature's best to your daily routine.
                    </p>
                    <p className="text-gray-400 text-xs mt-8">
                        © {new Date().getFullYear()} Exia Organics. All rights reserved.
                    </p>
                </AnimatedContainer>

                {/* Links Grid */}
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2">
                    {footerLinks.map((section, index) => (
                        <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                            <div className="flex flex-col">
                                <h3 className="text-sm font-semibold text-[#1e4b78] uppercase tracking-wider mb-4">{section.label}</h3>
                                <ul className="space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link.title}>
                                            {/* Handle internal router links vs external/hash links */}
                                            {link.href.startsWith('/') ? (
                                                <Link
                                                    to={link.href}
                                                    className="text-gray-500 hover:text-[#9cae66] transition-colors text-sm flex items-center"
                                                >
                                                    {link.icon && <link.icon className="mr-2 h-4 w-4" />}
                                                    {link.title}
                                                </Link>
                                            ) : (
                                                <a
                                                    href={link.href}
                                                    className="text-gray-500 hover:text-[#9cae66] transition-colors text-sm flex items-center"
                                                >
                                                    {link.icon && <link.icon className="mr-2 h-4 w-4" />}
                                                    {link.title}
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimatedContainer>
                    ))}
                </div>
            </div>
        </footer>
    );
};

function AnimatedContainer({ className, delay = 0.1, children }) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay, duration: 0.6, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default Footer;
