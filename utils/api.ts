import { Product } from '@/types/product';

// Моковые данные без изображений (будем использовать CSS placeholders)
const mockProducts: Product[] = [
  {
    id: 1,
    title: "Fjallraven Backpack",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "",
    rating: { rate: 3.9, count: 120 }
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
    category: "men's clothing",
    image: "",
    rating: { rate: 4.1, count: 259 }
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description: "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing.",
    category: "men's clothing",
    image: "",
    rating: { rate: 4.7, count: 500 }
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit Jeans",
    price: 15.99,
    description: "The color could be slightly different between on the screen and in practice. Please note that body builds vary by person.",
    category: "men's clothing",
    image: "",
    rating: { rate: 2.1, count: 430 }
  },
  {
    id: 5,
    title: "Women's Gold & Silver Bracelet",
    price: 695,
    description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl.",
    category: "jewelery",
    image: "",
    rating: { rate: 4.6, count: 400 }
  },
  {
    id: 6,
    title: "Solid Gold Necklace",
    price: 168,
    description: "Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and sold by Hafeez Center in the United States.",
    category: "jewelery",
    image: "",
    rating: { rate: 3.9, count: 70 }
  },
  {
    id: 7,
    title: "White Gold Plated Ring",
    price: 9.99,
    description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary.",
    category: "jewelery",
    image: "",
    rating: { rate: 3, count: 400 }
  },
  {
    id: 8,
    title: "Pierced Owl Earrings",
    price: 10.99,
    description: "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    category: "jewelery",
    image: "",
    rating: { rate: 1.9, count: 100 }
  }
];

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch('https://fakestoreapi.com/products', {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ API data received');
    
    // Очищаем изображения - будем использовать CSS placeholders
    return data.map((product: Product) => ({
      ...product,
      image: "" // Пустая строка - используем CSS placeholder
    }));
  } catch (error) {
    console.warn('❌ API failed, using mock data with CSS placeholders');
    return mockProducts;
  }
};