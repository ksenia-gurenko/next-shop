'use client';

import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/productStore';
import { fetchProducts } from '@/utils/api';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import { Plus, RefreshCw } from 'lucide-react';

export default function HomePage() {
  const {
    products,
    viewMode,
    searchQuery,
    currentPage,
    itemsPerPage,
    setProducts,
  } = useProductStore();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isClient && products.length === 0) {
      loadProducts();
    } else {
      setIsLoading(false);
    }
  }, [isClient, products.length, setProducts]);

  // Filter and search logic
  const filteredProducts = products.filter((product) => {
    const matchesViewMode = viewMode === 'all' || (product.isLiked && isClient);
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesViewMode && matchesSearch;
  });

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  if (!isClient || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <Link
          href="/create-product"
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-800">{error}</p>
              <p className="text-yellow-600 text-sm mt-1">Using demo data</p>
            </div>
            <button
              onClick={loadProducts}
              className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        </div>
      )}

      <ProductFilters />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found.</p>
          {searchQuery && (
            <p className="text-gray-400 mt-2">Try changing your search query</p>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <Pagination totalItems={filteredProducts.length} />
        </>
      )}
    </div>
  );
}