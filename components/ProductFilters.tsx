// components/ProductFilters.tsx
'use client';

import { useProductStore } from '@/store/productStore';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ProductFilters() {
  const {
    viewMode,
    searchQuery,
    setViewMode,
    setSearchQuery,
  } = useProductStore();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            viewMode === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Products
        </button>
        <button
          onClick={() => setViewMode('liked')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            viewMode === 'liked'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Liked
        </button>
      </div>
    </div>
  );
}