// app/edit-product/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useProductStore } from '@/store/productStore';
import ProductForm from '@/components/ProductForm';
import { ProductFormData } from '@/types/product';
import { useEffect } from 'react';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const { products, updateProduct } = useProductStore();
  
  const product = products.find(p => p.id.toString() === params.id && p.isCustom);

  useEffect(() => {
    if (!product) {
      router.push('/');
    }
  }, [product, router]);

  if (!product) {
    return null;
  }

  const handleSubmit = async (data: ProductFormData) => {
    updateProduct(product.id, data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Product</h1>
      <ProductForm 
        initialData={product} 
        onSubmit={handleSubmit} 
        isEditing={true} 
      />
    </div>
  );
}