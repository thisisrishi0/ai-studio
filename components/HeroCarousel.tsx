import React from 'react';

const HeroCarousel: React.FC = () => {
  return (
    <div className="relative bg-gray-100 w-full overflow-hidden h-[200px] sm:h-[300px] md:h-[400px]">
      {/* Background with grayscale gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-gray-700 flex items-center justify-center text-white">
        
        <div className="text-center px-4 z-10 animate-fade-in-up">
            <h2 className="text-gray-300 text-lg sm:text-2xl font-light uppercase tracking-[0.2em] mb-2 drop-shadow-sm">
                The Modern Collection
            </h2>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 drop-shadow-lg tracking-tighter">
                BLACK & WHITE SALE
            </h1>
            <p className="text-lg sm:text-2xl font-light mb-6 tracking-wide">
                Up to <span className="bg-white text-black px-2 py-0 inline-block font-bold mx-1">80% OFF</span> on Top Brands
            </p>
            <button className="bg-white text-black px-10 py-3 font-bold text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors border border-transparent">
                Shop Now
            </button>
        </div>

        {/* Decorative Elements (Subtle geometry) */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-500 opacity-10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Fade Effect at bottom to blend with body */}
      <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-[#f9fafb] to-transparent"></div>
    </div>
  );
};

export default HeroCarousel;