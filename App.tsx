import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import GeminiAssistant from './components/GeminiAssistant';
import SignIn from './components/SignIn';
import { Product, CartItem, Category } from './types';
import { db } from './services/db';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'signin' | 'product'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string>('');

  // Initialize Session / User ID with robust UUID
  useEffect(() => {
    let storedId = localStorage.getItem('desicart_user_id');
    if (!storedId) {
        // Generate a UUID for better database compatibility
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            storedId = crypto.randomUUID();
        } else {
            // Fallback for older browsers
            storedId = 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
        }
        localStorage.setItem('desicart_user_id', storedId);
    }
    setUserId(storedId);
  }, []);

  // Initial Data Load
  useEffect(() => {
    if (!userId) return; // Wait for user ID to be ready

    const loadData = async () => {
      try {
        const [fetchedProducts, fetchedCart] = await Promise.all([
          db.getProducts(),
          db.getCart(userId)
        ]);
        setProducts(fetchedProducts);
        setCartItems(fetchedCart);
      } catch (error) {
        console.error("Failed to load data from database", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [userId]);

  const addToCart = async (product: Product) => {
    // Optimistic Update for better UX
    const existing = cartItems.find(item => item.id === product.id);
    let newCart;
    if (existing) {
        newCart = cartItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
    } else {
        newCart = [...cartItems, { ...product, quantity: 1 }];
    }
    setCartItems(newCart);
    setIsCartOpen(true);

    // Sync with DB
    await db.addToCart(userId, product);
  };

  const updateQuantity = async (id: string, quantity: number) => {
    // Optimistic Update
    if (quantity === 0) {
        setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
        setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    }

    // Sync with DB
    await db.updateCartQuantity(userId, id, quantity);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('product');
    window.scrollTo(0, 0);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === Category.ALL || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, products]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (view === 'signin') {
      return <SignIn onNavigateHome={() => setView('home')} onSignIn={() => setView('home')} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#E3E6E6]">
      <Navbar 
        searchTerm={searchTerm} 
        setSearchTerm={(term) => {
            setSearchTerm(term);
            if(view !== 'home') setView('home');
        }}
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
        selectedCategory={selectedCategory}
        setSelectedCategory={(cat) => {
            setSelectedCategory(cat);
            if(view !== 'home') setView('home');
        }}
        onSignInClick={() => setView('signin')}
        onLogoClick={() => {
            setSearchTerm('');
            setSelectedCategory(Category.ALL);
            setView('home');
        }}
      />
      
      {view === 'product' && selectedProduct ? (
        <ProductDetail 
            product={selectedProduct} 
            onAddToCart={addToCart}
            onBack={() => setView('home')}
        />
      ) : (
        <main className="flex-1 pb-12">
            {/* Only show Hero on initial view or empty search */}
            {!searchTerm && selectedCategory === Category.ALL && <HeroCarousel />}

            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-6 -mt-10 relative z-10">
            
            {/* Section Header */}
            <div className="bg-white p-4 mb-4 rounded-sm shadow-sm flex items-baseline justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                {searchTerm ? `Results for "${searchTerm}"` : (selectedCategory === Category.ALL ? 'Blockbuster Deals' : `${selectedCategory} Store`)}
                </h2>
                <span className="text-sm text-gray-500">{filteredProducts.length} items found</span>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
                </div>
            ) : (
                /* Product Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredProducts.map(product => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAddToCart={addToCart}
                        onClick={handleProductClick}
                    />
                    ))}
                </div>
            )}

            {!isLoading && filteredProducts.length === 0 && (
                <div className="text-center py-20 bg-white rounded-sm mt-4">
                    <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                    <button 
                        onClick={() => {setSearchTerm(''); setSelectedCategory(Category.ALL);}} 
                        className="mt-4 text-[#007185] font-medium hover:underline"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
            </div>
        </main>
      )}

      {/* Footer */}
      <footer className="bg-[#232F3E] text-white py-10 text-center text-sm mt-auto">
         <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4 mb-8 text-left border-b border-gray-600 pb-8">
            <div>
                <h4 className="font-bold mb-4 text-white">Get to Know Us</h4>
                <ul className="space-y-2 text-gray-300 text-xs hover:text-white cursor-pointer">
                    <li className="hover:underline">About Us</li>
                    <li className="hover:underline">Press Releases</li>
                    <li className="hover:underline">DesiCart Science</li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4 text-white">Connect with Us</h4>
                <ul className="space-y-2 text-gray-300 text-xs hover:text-white cursor-pointer">
                    <li className="hover:underline">Facebook</li>
                    <li className="hover:underline">Twitter</li>
                    <li className="hover:underline">Instagram</li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4 text-white">Make Money with Us</h4>
                <ul className="space-y-2 text-gray-300 text-xs hover:text-white cursor-pointer">
                    <li className="hover:underline">Sell on DesiCart</li>
                    <li className="hover:underline">Protect and Build Your Brand</li>
                    <li className="hover:underline">DesiCart Global Selling</li>
                    <li className="hover:underline">Become an Affiliate</li>
                </ul>
            </div>
             <div>
                <h4 className="font-bold mb-4 text-white">Let Us Help You</h4>
                <ul className="space-y-2 text-gray-300 text-xs hover:text-white cursor-pointer">
                    <li className="hover:underline">COVID-19 and DesiCart</li>
                    <li className="hover:underline">Your Account</li>
                    <li className="hover:underline">Returns Centre</li>
                    <li className="hover:underline">100% Purchase Protection</li>
                    <li className="hover:underline">Help</li>
                </ul>
            </div>
         </div>
         <div className="pt-2">
             <div className="flex justify-center items-center gap-4 mb-4">
                 <span className="text-2xl font-bold tracking-tight text-white">
                    Desi<span className="text-brand-orange">Cart</span>
                 </span>
             </div>
             <p className="text-xs text-gray-400">&copy; 2024 DesiCart, Inc. or its affiliates. All rights reserved.</p>
         </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
      />

      <GeminiAssistant />
    </div>
  );
};

export default App;