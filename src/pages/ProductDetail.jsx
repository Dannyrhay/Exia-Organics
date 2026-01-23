import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductDetailPage } from '../components/ui/product-detail-page';
import { products } from '../data/products';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find the product by ID
    const product = products.find(p => p.id === parseInt(id));

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate('/products')}
                        className="text-primary hover:underline"
                    >
                        Browse all products
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="text-primary hover:underline"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    // Mock seller data for now
    const seller = {
        name: "Exia Organics",
        avatarUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=100&auto=format&fit=crop&q=60",
        rating: 4.9,
    };

    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: product.name, href: "#" },
    ];

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <ProductDetailPage
                product={product}
                seller={seller}
                breadcrumbs={breadcrumbs}
            />
        </div>
    );
};

export default ProductDetail;
