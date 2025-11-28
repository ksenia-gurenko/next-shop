// app/products/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useProductStore } from '@/store/productStore';
import { ArrowLeft, Heart, Edit } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { products, toggleLike } = useProductStore();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const product = products.find(p => p.id.toString() === params.id);

  useEffect(() => {
    if (!product && products.length > 0 && isClient) {
      router.push('/');
    }
  }, [product, products, router, isClient]);

  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-6 w-32 bg-gray-200 rounded mb-6"></div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 bg-gray-50">
                <div className="w-full h-96 bg-gray-200 rounded"></div>
              </div>
              <div className="md:w-1/2 p-8">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Product not found.</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 text-blue-500 hover:text-blue-600"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "men's clothing": "from-blue-500 to-blue-700",
      "women's clothing": "from-pink-500 to-pink-700",
      "jewelery": "from-amber-500 to-amber-700",
      "electronics": "from-green-500 to-green-700"
    };
    return colors[category] || "from-gray-500 to-gray-700";
  };

  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      "men's clothing": "👕",
      "women's clothing": "👚",
      "jewelery": "💎",
      "electronics": "📱"
    };
    return emojis[category] || "📦";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Products
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-8 bg-gray-50 flex items-center justify-center">
            <div className={`w-full h-96 bg-gradient-to-br ${getCategoryColor(product.category)} rounded-lg flex items-center justify-center`}>
              <div className="text-white text-8xl">
                {getCategoryEmoji(product.category)}
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleLike(product.id)}
                  className={`p-2 rounded-full transition-colors ${
                    product.isLiked
                      ? 'text-red-500 bg-red-50'
                      : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${product.isLiked ? 'fill-current' : ''}`} />
                </button>
                
                {product.isCustom && (
                  <Link
                    href={`/edit-product/${product.id}`}
                    className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <Edit className="w-6 h-6" />
                  </Link>
                )}
              </div>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-green-600">${product.price}</span>
              <span className="ml-4 text-sm text-gray-500 capitalize bg-gray-100 px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            {product.rating && (
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">Rating:</span>
                    <span>{product.rating.rate}/5</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">Reviews:</span>
                    <span>{product.rating.count}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}