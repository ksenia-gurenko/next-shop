'use client';

import { Product } from '@/types/product';
import { useProductStore } from '@/store/productStore';
import { truncateText } from '@/utils/helpers';
import Link from 'next/link';
import { Heart, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleLike, deleteProduct } = useProductStore();
  const [isClient, setIsClient] = useState(false);

  useState(() => {
    setIsClient(true);
  });

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isClient) {
      toggleLike(product.id);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isClient) {
      deleteProduct(product.id);
    }
  };

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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <Link href={`/products/${product.id}`} className="flex-1 flex flex-col">
        <div className={`relative h-48 bg-gradient-to-br ${getCategoryColor(product.category)} flex items-center justify-center`}>
          <div className="text-white text-6xl">
            {getCategoryEmoji(product.category)}
          </div>
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            {product.category}
          </div>
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {product.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 flex-1">
            {truncateText(product.description, 100)}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-green-600">
              ${product.price}
            </span>
            <span className="text-sm text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-4 border-t border-gray-100 flex justify-between items-center">
        <button
          onClick={handleLike}
          className={`p-2 rounded-full transition-colors ${
            product.isLiked && isClient
              ? 'text-red-500 bg-red-50'
              : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
          }`}
          disabled={!isClient}
        >
          <Heart className={`w-5 h-5 ${product.isLiked && isClient ? 'fill-current' : ''}`} />
        </button>
        
        <button
          onClick={handleDelete}
          className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          disabled={!isClient}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}