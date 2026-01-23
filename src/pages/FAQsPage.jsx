import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
    {
        question: "Are your products 100% organic?",
        answer: "Yes, all Exia Organics products are certified 100% organic and free from synthetic preservatives."
    },
    {
        question: "Do you ship internationally?",
        answer: "We currently ship to the US, Canada, and select European countries. Check our shipping policy for more details."
    },
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day money-back guarantee on all unopened products. Please contact support to initiate a return."
    },
    {
        question: "How do I track my order?",
        answer: "Once your order is shipped, you will receive an email with a tracking number to monitor your delivery status."
    }
];

const FAQsPage = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="pt-32 pb-16 min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-5xl font-bold mb-12 text-center font-serif">Frequently Asked Questions</h1>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <button
                                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                                onClick={() => toggleAccordion(index)}
                            >
                                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                                {activeIndex === index ? (
                                    <ChevronUp className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-5 text-gray-600 border-t border-gray-100 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQsPage;
