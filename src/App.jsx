import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import { runSplash } from './splash';
import CartProvider from './cart/CartProvider';
import CartDrawer from './components/cart/CartDrawer';
import AnnouncementBar from './components/promo/AnnouncementBar';
import PromoPopup from './components/promo/PromoPopup';

// Home ships in the main bundle; everything else loads when visited.
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostDetail = lazy(() => import('./pages/BlogPostDetail'));
const FAQsPage = lazy(() => import('./pages/FAQsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function App() {
    // After the first commit the hero photo is in the DOM, so the splash can wait on it.
    useEffect(() => {
        runSplash();
    }, []);

    return (
        <Router>
            <CartProvider>
            <ScrollToTop />
            <div className="flex min-h-screen flex-col overflow-x-clip bg-shea">
                <a
                    href="#main"
                    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-indigo focus:px-4 focus:py-2 focus:text-shea"
                >
                    Skip to content
                </a>
                <AnnouncementBar />
                <Navbar />
                <main id="main" className="flex-grow">
                    <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/products" element={<ProductsPage />} />
                            <Route path="/product/:id" element={<ProductDetail />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/blog/:id" element={<BlogPostDetail />} />
                            <Route path="/testimonials" element={<TestimonialsPage />} />
                            <Route path="/faqs" element={<FAQsPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
            </div>
            <CartDrawer />
            <PromoPopup />
            </CartProvider>
        </Router>
    );
}

export default App;
