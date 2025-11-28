// components/ProductForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ProductFormData, Product } from '@/types/product';
import { useRouter } from 'next/navigation';

const productSchema = z.object({
  title: z.string().min(1, 'Title is required').min(3, 'Title must be at least 3 characters'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  description: z.string().min(1, 'Description is required').min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  image: z.string().url('Must be a valid URL'),
});

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: ProductFormData) => void;
  isEditing?: boolean;
}

export default function ProductForm({ initialData, onSubmit, isEditing = false }: ProductFormProps) {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData ? {
      title: initialData.title,
      price: initialData.price,
      description: initialData.description,
      category: initialData.category,
      image: initialData.image,
    } : undefined,
  });

  const onFormSubmit = async (data: ProductFormData) => {
    await onSubmit(data);
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="max-w-2xl mx-auto space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Product Title *
        </label>
        <input
          {...register('title')}
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter product title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
          Price *
        </label>
        <input
          {...register('price', { valueAsNumber: true })}
          type="number"
          step="0.01"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="0.00"
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category *
        </label>
        <input
          {...register('category')}
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter category"
        />
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
          Image URL *
        </label>
        <input
          {...register('image')}
          type="url"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://example.com/image.jpg"
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter product description"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
        </button>
        
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}