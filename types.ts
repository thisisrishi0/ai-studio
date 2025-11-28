export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  isBestSeller?: boolean;
  deliveryDate?: string;
  description: string;
  // New fields for Enhanced Storefront
  bankOffers?: string[];
  isSponsored?: boolean;
  limitedDeal?: boolean;
  features?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export enum Category {
  ALL = 'All',
  MOBILES = 'Mobiles',
  FASHION = 'Fashion',
  HOME = 'Home',
  ELECTRONICS = 'Electronics',
  GROCERY = 'Grocery'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}