"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"
import logo from "../assets/logo.JPG"

const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    {
        name: "Blog",
        path: "/blog",
        type: "dropdown",
        items: [
            { name: "Our Journal", path: "/blog" },
            { name: "FAQs", path: "/faqs" }
        ]
    },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact Us", path: "/contact" }
]

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState(null)

    const toggleMenu = () => setIsOpen(!isOpen)
    const toggleDropdown = (name) => {
        if (activeDropdown === name) {
            setActiveDropdown(null)
        } else {
            setActiveDropdown(name)
        }
    }

    return (
        <div className="flex justify-center w-full py-6 px-4">
            <div className="flex items-center justify-between px-6 py-3 bg-white rounded-full shadow-lg w-full max-w-4xl relative z-40">
                <div className="flex items-center">
                    <motion.div
                        className="w-8 h-8 mr-6"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        whileHover={{ rotate: 10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Link to="/">
                            <img src={logo} alt="Exia Organics Logo" className="w-full h-full object-cover rounded-full" />
                        </Link>
                    </motion.div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    {navLinks.map((item) => {
                        if (item.type === "dropdown") {
                            return (
                                <div
                                    key={item.name}
                                    className="relative group"
                                    onMouseEnter={() => setActiveDropdown(item.name)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <button className="flex items-center text-sm text-gray-900 hover:text-gray-600 transition-colors font-medium">
                                        {item.name}
                                        <ChevronDown className="ml-1 w-4 h-4" />
                                    </button>

                                    <AnimatePresence>
                                        {activeDropdown === item.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2"
                                            >
                                                {item.items.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        to={subItem.path}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#f0eadd] hover:text-[#1e3a5f]"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )
                        }

                        return (
                            <motion.div
                                key={item.name}
                                whileHover={{ scale: 1.05 }}
                            >
                                <Link to={item.path} className="text-sm text-gray-900 hover:text-gray-600 transition-colors font-medium">
                                    {item.name}
                                </Link>
                            </motion.div>
                        )
                    })}
                </nav>

                {/* Desktop CTA Button */}
                <motion.div
                    className="hidden md:block"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <Link
                        to="/products"
                        className="inline-flex items-center justify-center px-5 py-2 text-sm text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
                    >
                        Shop Now
                    </Link>
                </motion.div>

                {/* Mobile Menu Button */}
                <motion.button className="md:hidden flex items-center" onClick={toggleMenu} whileTap={{ scale: 0.9 }}>
                    <Menu className="h-6 w-6 text-gray-900" />
                </motion.button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-white z-50 pt-24 px-6 md:hidden overflow-y-auto"
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <motion.button
                            className="absolute top-6 right-6 p-2"
                            onClick={toggleMenu}
                            whileTap={{ scale: 0.9 }}
                        >
                            <X className="h-6 w-6 text-gray-900" />
                        </motion.button>
                        <div className="flex flex-col space-y-6 pb-10">
                            {navLinks.map((item, i) => {
                                if (item.type === "dropdown") {
                                    return (
                                        <div key={item.name} className="flex flex-col gap-4">
                                            <div className="text-base text-gray-900 font-medium font-serif opacity-50 uppercase tracking-widest text-xs mt-2">
                                                {item.name}
                                            </div>
                                            {item.items.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    to={subItem.path}
                                                    className="text-xl text-gray-900 font-medium pl-4 border-l-2 border-[#f0eadd]"
                                                    onClick={toggleMenu}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )
                                }
                                return (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link to={item.path} className="text-2xl text-gray-900 font-medium font-serif" onClick={toggleMenu}>
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                )
                            })}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="pt-6"
                            >
                                <Link
                                    to="/products"
                                    className="inline-flex items-center justify-center w-full px-5 py-4 text-base text-white bg-black rounded-full hover:bg-gray-800 transition-colors "
                                    onClick={toggleMenu}
                                >
                                    Shop Now
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Navbar
