import React, { useState } from 'react';
import { Product } from '../types';
import { CURRENCY_FORMATTER } from '../constants';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

const MOCK_REVIEWS = [
  { user: 'Rahul S.', rating: 5, date: '12 Oct 2023', title: 'Excellent product!', text: 'Value for money. Delivery was super fast by DesiCart. Highly recommended!' },
  { user: 'Priya M.', rating: 4, date: '05 Nov 2023', title: 'Good quality', text: 'The quality is as described. Happy with the purchase.' },
  { user: 'Amit K.', rating: 5, date: '20 Sep 2023', title: 'Just go for it', text: 'Best in class features at this price point. Loved it.' },
  { user: 'Sneha D.', rating: 3, date: '15 Aug 2023', title: 'Average', text: 'It is okay, but I expected better packaging.' },
];

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onBack }) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const [selectedImage, setSelectedImage] = useState(product.image);

  return (
    <div className="bg-white min-h-screen pb-12 text-black">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-3 px-4 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">
         <span className="cursor-pointer hover:text-black transition-colors" onClick={onBack}>Home</span> 
         <span className="mx-2">/</span> 
         <span className="cursor-pointer hover:text-black transition-colors">{product.category}</span>
         <span className="mx-2">/</span>
         <span className="text-black font-medium truncate">{product.title}</span>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Images */}
          <div className="lg:w-[45%] flex gap-6">
             {/* Thumbnail List */}
             <div className="hidden sm:flex flex-col gap-4">
                {[product.image, product.image, product.image].map((img, idx) => (
                    <div 
                        key={idx} 
                        className={`w-16 h-16 border cursor-pointer flex items-center justify-center p-2 transition-all ${selectedImage === img ? 'border-black' : 'border-gray-200 hover:border-gray-400'}`}
                        onMouseEnter={() => setSelectedImage(img)}
                    >
                        <img src={img} alt="thumbnail" className="max-h-full max-w-full" />
                    </div>
                ))}
             </div>
             
             {/* Main Image */}
             <div className="flex-1 flex items-center justify-center bg-white border border-gray-100 p-8 sticky top-24">
                 <img src={selectedImage} alt={product.title} className="max-h-[500px] max-w-full object-contain transition-all duration-500" />
             </div>
          </div>

          {/* Middle Column: Product Details */}
          <div className="lg:w-[35%]">
            <h1 className="text-3xl font-light text-black mb-2 leading-tight tracking-tight">{product.title}</h1>
            
            {/* Rating Link */}
            <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
               <span className="text-sm font-bold text-black mr-2">{product.rating}</span>
                <div className="flex text-black text-sm gap-0.5">
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
               <span className="text-xs text-gray-500 ml-3 hover:text-black cursor-pointer uppercase tracking-wide">
                 {product.reviewCount.toLocaleString()} Reviews
               </span>
            </div>

            {/* Price Block */}
            <div className="mb-6">
                 {product.limitedDeal && (
                     <span className="bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider inline-block mb-3">
                        Limited Time Deal
                     </span>
                 )}
                 <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-black mr-3">
                        {product.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                    </span>
                    {product.originalPrice && (
                        <span className="text-lg text-gray-400 line-through font-light">
                            {CURRENCY_FORMATTER.format(product.originalPrice)}
                        </span>
                    )}
                 </div>
                 {product.originalPrice && (
                    <div className="text-gray-900 text-xs font-medium mt-1">
                        You Save: ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({discount}%)
                    </div>
                 )}
                 <div className="text-gray-500 text-xs mt-2">
                    Inclusive of all taxes
                 </div>
            </div>

            {/* Offers */}
            <div className="mb-8">
                <h4 className="font-bold text-xs text-black uppercase tracking-widest mb-3 flex items-center gap-2">
                    Offers
                </h4>
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {product.bankOffers?.map((offer, idx) => (
                        <div key={idx} className="min-w-[160px] max-w-[160px] border border-black p-3 text-sm bg-white">
                            <div className="font-bold text-[10px] uppercase tracking-wider mb-1">Bank Offer</div>
                            <div className="text-gray-800 text-xs line-clamp-3 leading-relaxed">{offer}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Specs / Features */}
            <div className="border-t border-gray-100 pt-6">
                <h4 className="font-bold text-sm text-black uppercase tracking-widest mb-4">About this item</h4>
                <ul className="list-disc pl-4 space-y-2">
                    {product.features?.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-700 leading-relaxed pl-2">{feature}</li>
                    ))}
                    <li className="text-sm text-gray-700 leading-relaxed pl-2">{product.description}</li>
                </ul>
            </div>
          </div>

          {/* Right Column: Buy Box */}
          <div className="lg:w-[20%]">
              <div className="border border-black p-6 bg-white sticky top-24">
                   <div className="text-xl font-bold text-black mb-2">
                       {product.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                   </div>
                   
                   <div className="text-sm text-gray-600 mb-4 leading-relaxed">
                        FREE delivery <span className="font-bold text-black">{product.deliveryDate || 'Monday, 25 Oct'}</span>.
                   </div>
                   
                   <div className="text-sm text-black font-bold mb-6 uppercase tracking-wide">In Stock</div>

                   <div className="text-xs text-gray-500 mb-6 space-y-2">
                       <div className="flex justify-between"><span>Ships from</span> <span className="text-black">DesiCart</span></div>
                       <div className="flex justify-between"><span>Sold by</span> <span className="text-black">Appario Retail</span></div>
                   </div>

                   <button 
                        onClick={() => onAddToCart(product)}
                        className="w-full bg-white hover:bg-gray-50 border border-black text-black font-bold text-xs uppercase tracking-widest py-3 mb-3 transition-colors"
                   >
                       Add to Cart
                   </button>
                   <button className="w-full bg-black hover:bg-gray-900 text-white font-bold text-xs uppercase tracking-widest py-3 mb-4 transition-colors">
                       Buy Now
                   </button>

                   <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-wider">
                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                       <span>Secure transaction</span>
                   </div>
              </div>
          </div>

        </div>

        {/* Reviews Section */}
        <div className="border-t border-gray-200 mt-16 pt-10">
            <div className="flex flex-col md:flex-row gap-16">
                <div className="md:w-1/3">
                    <h2 className="text-xl font-light text-black mb-4 uppercase tracking-widest">Customer reviews</h2>
                    <div className="flex items-center mb-2">
                         <div className="flex text-black text-lg mr-3 gap-0.5">
                            {'★'.repeat(Math.floor(product.rating))}
                            {'☆'.repeat(5 - Math.floor(product.rating))}
                        </div>
                        <span className="text-black font-bold">{product.rating} out of 5</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-6 uppercase tracking-wide">{product.reviewCount.toLocaleString()} global ratings</div>
                    
                    {/* Mock Rating Bars */}
                    <div className="space-y-3 max-w-xs">
                        {[5,4,3,2,1].map((star, i) => (
                             <div key={star} className="flex items-center text-xs text-gray-600">
                                <span className="w-12 font-medium">{star} star</span>
                                <div className="flex-1 h-2 bg-gray-100 mx-3">
                                    <div className={`h-full bg-black`} style={{width: `${[70, 20, 5, 3, 2][i]}%`}}></div>
                                </div>
                                <span className="w-8 text-right">{[70, 20, 5, 3, 2][i]}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="md:w-2/3">
                     <h3 className="font-bold text-sm text-black mb-6 uppercase tracking-widest">Top reviews from India</h3>
                     <div className="space-y-8">
                         {MOCK_REVIEWS.map((review, idx) => (
                             <div key={idx} className="border-b border-gray-100 pb-6 last:border-0">
                                 <div className="flex items-center gap-3 mb-2">
                                     <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-bold">
                                        {review.user[0]}
                                     </div>
                                     <span className="text-sm text-black font-bold">{review.user}</span>
                                 </div>
                                 <div className="flex items-center mb-2">
                                      <div className="flex text-black text-xs mr-3 gap-0.5">
                                        {'★'.repeat(review.rating)}
                                        {'☆'.repeat(5 - review.rating)}
                                      </div>
                                      <span className="text-sm font-bold text-black">{review.title}</span>
                                 </div>
                                 <div className="text-xs text-gray-400 mb-3">Reviewed in India on {review.date}</div>
                                 <p className="text-sm text-gray-800 mb-3 leading-relaxed">{review.text}</p>
                             </div>
                         ))}
                     </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;