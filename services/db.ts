import { Product, CartItem } from '../types';
import { PRODUCTS } from '../constants';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// --- CONFIGURATION ---
// 1. Set USE_CLOUD_DB = true to switch from Local Storage to Supabase
// 2. Fill in your SUPABASE_URL and SUPABASE_KEY
const USE_CLOUD_DB = false; 

const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_KEY = 'YOUR_PUBLIC_ANON_KEY';

/**
 * ==========================================
 *  DATABASE SETUP INSTRUCTIONS (SQL SCHEMAS)
 * ==========================================
 * Run the following SQL in your Supabase SQL Editor to build a secure backend.
 * 
 * -- 1. Products Table
 * create table products (
 *   id text primary key,
 *   title text not null,
 *   category text,
 *   price numeric,
 *   original_price numeric,
 *   rating numeric,
 *   review_count integer,
 *   image text,
 *   is_best_seller boolean,
 *   delivery_date text,
 *   description text,
 *   bank_offers text[],
 *   is_sponsored boolean,
 *   limited_deal boolean,
 *   features text[]
 * );
 * 
 * -- 2. Cart Items Table (Linked to User Session)
 * create table cart_items (
 *   id uuid default gen_random_uuid() primary key,
 *   user_id text not null,
 *   product_id text references products(id),
 *   quantity integer default 1,
 *   created_at timestamp with time zone default timezone('utc'::text, now()),
 *   unique(user_id, product_id) -- Prevents duplicate rows for same item
 * );
 * 
 * -- 3. Security (Row Level Security)
 * alter table products enable row level security;
 * alter table cart_items enable row level security;
 * 
 * -- Allow public read access to products
 * create policy "Public products are viewable by everyone." on products for select using (true);
 * 
 * -- Allow users to manage their own cart (Logic matches the user_id column)
 * create policy "Users can manage their own cart." on cart_items for all using (user_id = current_setting('app.current_user_id', true));
 * -- Note: For this demo, we handle user_id filtering in the query, but real Auth would use auth.uid()
 */

interface IDatabaseService {
  getProducts(): Promise<Product[]>;
  getCart(userId: string): Promise<CartItem[]>;
  addToCart(userId: string, product: Product): Promise<CartItem[]>;
  updateCartQuantity(userId: string, productId: string, quantity: number): Promise<CartItem[]>;
}

// --- 1. LOCAL STORAGE IMPLEMENTATION (Fallback) ---
const DB_KEYS = {
  PRODUCTS: 'desicart_products_v1',
  CART: 'desicart_cart_v1'
};

class LocalDB implements IDatabaseService {
  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(DB_KEYS.PRODUCTS)) {
      localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(PRODUCTS));
    }
  }

  async getProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate latency
    const data = localStorage.getItem(DB_KEYS.PRODUCTS);
    return data ? JSON.parse(data) : PRODUCTS;
  }

  async getCart(userId: string): Promise<CartItem[]> {
    // Local storage implementation is simplified to share one cart for the browser
    const data = localStorage.getItem(DB_KEYS.CART);
    return data ? JSON.parse(data) : [];
  }

  async addToCart(userId: string, product: Product): Promise<CartItem[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const cart = await this.getCart(userId);
    const existing = cart.find(item => item.id === product.id);
    
    let newCart;
    if (existing) {
      newCart = cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    
    localStorage.setItem(DB_KEYS.CART, JSON.stringify(newCart));
    return newCart;
  }

  async updateCartQuantity(userId: string, productId: string, quantity: number): Promise<CartItem[]> {
     const cart = await this.getCart(userId);
     let newCart;
     if (quantity <= 0) {
       newCart = cart.filter(item => item.id !== productId);
     } else {
       newCart = cart.map(item => 
         item.id === productId ? { ...item, quantity } : item
       );
     }
     localStorage.setItem(DB_KEYS.CART, JSON.stringify(newCart));
     return newCart;
  }
}

// --- 2. CLOUD DATABASE IMPLEMENTATION (Robust) ---
class CloudDB implements IDatabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  async getProducts(): Promise<Product[]> {
    try {
      const { data, error } = await this.supabase
        .from('products')
        .select('*');
      
      if (error) throw error;
      
      // Map DB snake_case to Product interface if needed (auto-mapping assumed here)
      return data.map((p: any) => ({
        id: p.id,
        title: p.title,
        category: p.category,
        price: Number(p.price),
        originalPrice: p.original_price ? Number(p.original_price) : undefined,
        rating: Number(p.rating),
        reviewCount: p.review_count,
        image: p.image,
        isBestSeller: p.is_best_seller,
        deliveryDate: p.delivery_date,
        description: p.description,
        bankOffers: p.bank_offers,
        isSponsored: p.is_sponsored,
        limitedDeal: p.limited_deal,
        features: p.features
      }));
    } catch (err) {
      console.error("CloudDB: Failed to fetch products", err);
      // Fallback to constants if DB fails (Robustness)
      return PRODUCTS;
    }
  }

  async getCart(userId: string): Promise<CartItem[]> {
    try {
      // Fetch cart items and join with products table
      const { data, error } = await this.supabase
        .from('cart_items')
        .select(`
          quantity,
          products (*)
        `)
        .eq('user_id', userId);

      if (error) throw error;
      if (!data) return [];

      // Transform nested structure to flat CartItem
      return data
        .filter((item: any) => item.products !== null) // Safety check
        .map((item: any) => ({
          id: item.products.id,
          title: item.products.title,
          category: item.products.category,
          price: Number(item.products.price),
          originalPrice: item.products.original_price,
          rating: item.products.rating,
          reviewCount: item.products.review_count,
          image: item.products.image,
          description: item.products.description,
          features: item.products.features,
          quantity: item.quantity
        }));
    } catch (err) {
      console.error("CloudDB: Failed to fetch cart", err);
      return [];
    }
  }

  async addToCart(userId: string, product: Product): Promise<CartItem[]> {
    try {
      // 1. Check if item exists (Read)
      const { data: existing } = await this.supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('user_id', userId)
        .eq('product_id', product.id)
        .single();

      if (existing) {
        // 2. Update existing (Write)
        await this.supabase
          .from('cart_items')
          .update({ quantity: existing.quantity + 1 })
          .eq('id', existing.id);
      } else {
        // 2. Insert new (Write)
        await this.supabase
          .from('cart_items')
          .insert({ 
            user_id: userId, 
            product_id: product.id, 
            quantity: 1 
          });
      }

      // 3. Return updated cart state
      return this.getCart(userId);
    } catch (err) {
      console.error("CloudDB: Failed to add to cart", err);
      return [];
    }
  }

  async updateCartQuantity(userId: string, productId: string, quantity: number): Promise<CartItem[]> {
    try {
      if (quantity <= 0) {
        // Delete
        await this.supabase
          .from('cart_items')
          .delete()
          .eq('user_id', userId)
          .eq('product_id', productId);
      } else {
        // Update
        await this.supabase
          .from('cart_items')
          .update({ quantity: quantity })
          .eq('user_id', userId)
          .eq('product_id', productId);
      }
      return this.getCart(userId);
    } catch (err) {
      console.error("CloudDB: Failed to update quantity", err);
      return [];
    }
  }
}

// Export the active DB based on config
export const db = USE_CLOUD_DB ? new CloudDB() : new LocalDB();