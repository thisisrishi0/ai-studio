import React from 'react';
import { Product } from '../types';
import { CURRENCY_FORMATTER } from '../constants';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onClick?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onClick }) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="bg-white flex flex-col h-full border border-gray-200 hover:border-black transition-colors duration-300 relative group overflow-hidden">
      
      {/* Sponsored Tag */}
      {product.isSponsored && (
        <div className="absolute top-2 right-2 text-[10px] text-gray-500 flex items-center gap-1 z-10 uppercase tracking-wider">
            Sponsored
        </div>
      )}

      {/* Image Area */}
      <div 
        className="relative w-full h-64 bg-white p-6 flex items-center justify-center cursor-pointer"
        onClick={() => onClick && onClick(product)}
      >
         {product.isBestSeller && (
            <span className="absolute top-0 left-0 bg-black text-white text-[10px] font-bold px-3 py-1 z-10 uppercase tracking-wider">
                Best Seller
            </span>
        )}
        <img 
          src={product.image} 
          alt={product.title} 
          className="max-h-full max-w-full object-contain transition-all duration-500" 
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-4 bg-white">
        
        {/* Title */}
        <h3 
            className="text-black font-medium text-sm leading-snug mb-2 line-clamp-2 group-hover:underline cursor-pointer"
            onClick={() => onClick && onClick(product)}
        >
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <span className="text-xs font-bold text-black mr-1">{product.rating}</span>
          <div className="flex text-black text-xs">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Limited Time Deal Badge */}
        {product.limitedDeal && (
            <div className="mb-2">
                <span className="bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                    Limited Deal
                </span>
            </div>
        )}

        {/* Price Block */}
        <div className="mb-2 cursor-pointer" onClick={() => onClick && onClick(product)}>
           <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-black">
                    {product.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                </span>
                {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                        {CURRENCY_FORMATTER.format(product.originalPrice)}
                    </span>
                )}
           </div>
           {product.originalPrice && (
               <div className="text-xs text-gray-900 font-medium">
                   Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({discount}%)
               </div>
           )}
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-2">
          <button 
            onClick={() => onAddToCart(product)}
            className="w-full bg-black text-white text-xs font-bold uppercase tracking-wider py-3 hover:bg-gray-800 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;