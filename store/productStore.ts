// store/productStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductFormData } from '@/types/product';

interface ProductState {
  products: Product[];
  viewMode: 'all' | 'liked';
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
  
  setProducts: (products: Product[]) => void;
  addProduct: (product: ProductFormData) => void;
  updateProduct: (id: string | number, product: ProductFormData) => void;
  deleteProduct: (id: string | number) => void;
  toggleLike: (id: string | number) => void;
  setViewMode: (mode: 'all' | 'liked') => void;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      viewMode: 'all',
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 8,

      setProducts: (products) => set({ 
        products: products.map(p => ({ 
          ...p, 
          isLiked: false, 
          isCustom: false 
        }))
      }),

      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: `custom-${Date.now()}`,
          rating: { rate: 0, count: 0 },
          isLiked: false,
          isCustom: true
        };
        set((state) => ({ 
          products: [newProduct, ...state.products] 
        }));
      },

      updateProduct: (id, productData) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id
              ? { ...product, ...productData }
              : product
          )
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id)
        }));
      },

      toggleLike: (id) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id
              ? { ...product, isLiked: !product.isLiked }
              : product
          )
        }));
      },

      setViewMode: (mode) => set({ viewMode: mode, currentPage: 1 }),
      setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
      setCurrentPage: (page) => set({ currentPage: page }),
    }),
    {
      name: 'product-storage',
    }
  )
);