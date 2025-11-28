// app/create-product/page.tsx
'use client';

import { useProductStore } from '@/store/productStore';
import ProductForm from '@/components/ProductForm';
import { ProductFormData } from '@/types/product';

export default function CreateProductPage() {
  const { addProduct } = useProductStore();

  const handleSubmit = async (data: ProductFormData) => {
    addProduct(data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Product</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}