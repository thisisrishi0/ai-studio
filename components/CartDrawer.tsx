import React from 'react';
import { CartItem } from '../types';
import { CURRENCY_FORMATTER } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Drawer */}
      <div className={`relative w-full max-w-md bg-white h-full shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-white">
          <h2 className="text-xl font-bold text-black tracking-tight">Shopping Cart ({items.length})</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                <p className="text-sm uppercase tracking-widest">Your cart is empty</p>
                <button onClick={onClose} className="mt-6 text-black border-b border-black pb-0.5 text-sm font-medium hover:opacity-70">Start Shopping</button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-6">
                <div className="w-24 h-24 flex-shrink-0 border border-gray-200 p-2 flex items-center justify-center">
                  <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain transition-all" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-black line-clamp-2 mb-1">{item.title}</h4>
                    <div className="text-sm font-bold text-black">
                        {CURRENCY_FORMATTER.format(item.price)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-black">
                        <button 
                            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-black"
                        >
                            -
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-black"
                        >
                            +
                        </button>
                    </div>
                    <button 
                        onClick={() => onUpdateQuantity(item.id, 0)}
                        className="text-xs text-gray-500 underline hover:text-black"
                    >
                        Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-600 text-sm uppercase tracking-wider">Subtotal</span>
                    <span className="text-2xl font-bold text-black">
                        {CURRENCY_FORMATTER.format(subtotal)}
                    </span>
                </div>
                <button className="w-full bg-black text-white font-bold uppercase tracking-widest py-4 hover:bg-gray-900 transition-colors">
                    Checkout
                </button>
                <p className="text-center text-xs text-gray-500 mt-4">Shipping & taxes calculated at checkout</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;