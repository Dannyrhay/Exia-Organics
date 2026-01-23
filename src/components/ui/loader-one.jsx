import React from 'react'
import { motion } from "framer-motion";
import logo from "../../assets/logo.JPG";

const LoaderOne = () => {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
            <img src={logo} alt="Exia Organics Logo" className="w-36 h-24 rounded-[50%] object-cover mb-8" />
            <div className="flex items-center justify-center gap-1">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="h-4 w-4 rounded-full bg-blue-500"
                        initial={{ y: 0 }}
                        animate={{
                            y: [0, -15, 0],
                            opacity: [0.6, 1, 0.6],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default LoaderOne
