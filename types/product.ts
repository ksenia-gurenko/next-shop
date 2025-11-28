// types/product.ts
export interface Product {
  id: number | string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
  isLiked?: boolean;
  isCustom?: boolean;
}

export interface ProductFormData {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}