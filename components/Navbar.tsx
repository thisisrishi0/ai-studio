import React from 'react';
import { Category } from '../types';

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  cartCount: number;
  setIsCartOpen: (isOpen: boolean) => void;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  onSignInClick: () => void;
  onLogoClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  cartCount, 
  setIsCartOpen,
  selectedCategory,
  setSelectedCategory,
  onSignInClick,
  onLogoClick
}) => {
  return (
    <nav className="bg-black text-white sticky top-0 z-40 border-b border-gray-800">
      {/* Top Belt */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 cursor-pointer group" onClick={onLogoClick}>
          <span className="text-2xl font-bold tracking-tight group-hover:opacity-80 transition-opacity">
            Desi<span className="font-light">Cart</span>
          </span>
          <span className="text-xs ml-1 mt-1 text-gray-400 hidden sm:inline">.in</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-3xl hidden sm:flex h-10">
          <div className="relative flex items-center w-full rounded-none overflow-hidden bg-white border border-white focus-within:border-gray-300">
            <select 
              className="h-full bg-gray-100 text-black text-xs px-2 border-r border-gray-200 outline-none cursor-pointer hover:bg-gray-200 transition-colors font-medium"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category)}
            >
              {Object.values(Category).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input 
              type="text" 
              className="flex-1 h-full px-4 text-black text-sm outline-none placeholder-gray-500"
              placeholder="Search DesiCart.in"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-black text-white hover:bg-gray-900 h-full px-5 flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Trigger (Icon Only) */}
        <div className="sm:hidden text-white">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-6">
          {/* Account Icon */}
          <div 
            className="flex flex-col items-center cursor-pointer hover:opacity-70 transition-opacity p-1 rounded-sm"
            onClick={onSignInClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          {/* Orders */}
          <div className="hidden md:flex flex-col cursor-pointer hover:opacity-70 transition-opacity p-1 rounded-sm">
            <span className="text-xs text-gray-400 leading-none">Returns</span>
            <span className="text-sm font-bold leading-none">& Orders</span>
          </div>

          {/* Cart */}
          <div 
            className="flex items-end cursor-pointer hover:opacity-70 transition-opacity p-1 rounded-sm relative"
            onClick={() => setIsCartOpen(true)}
          >
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-white text-black font-bold text-xs h-5 w-5 flex items-center justify-center rounded-full border border-black">
                {cartCount}
              </span>
            </div>
            <span className="font-bold text-sm hidden md:block mb-0.5 ml-1">Cart</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;