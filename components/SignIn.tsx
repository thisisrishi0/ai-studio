import React, { useState } from 'react';

interface SignInProps {
  onNavigateHome: () => void;
  onSignIn: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onNavigateHome, onSignIn }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
        // Simulate sign in
        onSignIn();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center text-black">
      <div className="w-full flex flex-col items-center pt-12 pb-8">
          {/* Logo */}
          <div className="mb-8 cursor-pointer" onClick={onNavigateHome}>
            <span className="text-4xl font-bold tracking-tight text-black">
                Desi<span className="font-light">Cart</span>
            </span>
            <span className="text-xs ml-1 text-gray-500">.in</span>
          </div>

          {/* Sign In Box */}
          <div className="w-[350px] border border-black p-8">
            <h1 className="text-2xl font-light mb-6 text-black">Sign in</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">Email</label>
                    <input 
                        type="text" 
                        className="w-full border-b border-gray-400 px-0 py-2 focus:border-black outline-none transition-colors bg-transparent text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <button className="w-full bg-black text-white hover:bg-gray-900 border border-transparent py-3 text-xs font-bold uppercase tracking-widest transition-colors">
                    Continue
                </button>
            </form>
            
            <p className="text-xs mt-6 leading-relaxed text-gray-500">
                By continuing, you agree to DesiCart's <span className="text-black underline cursor-pointer">Conditions of Use</span> and <span className="text-black underline cursor-pointer">Privacy Notice</span>.
            </p>
          </div>

          {/* New Account Divider */}
          <div className="w-[350px] mt-8 relative text-center">
             <div className="absolute top-1/2 left-0 w-full border-t border-gray-200"></div>
             <span className="relative bg-white px-4 text-xs text-gray-500 uppercase tracking-wider">New here?</span>
          </div>

          {/* Create Account Button */}
          <button className="w-[350px] mt-6 bg-white hover:bg-gray-50 border border-black py-3 text-xs font-bold uppercase tracking-widest text-black transition-colors" onClick={onNavigateHome}>
              Create your account
          </button>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-gray-100 mt-auto py-8 bg-white">
           <div className="flex justify-center gap-8 text-xs text-gray-500 uppercase tracking-wide">
               <span className="hover:text-black cursor-pointer transition-colors">Conditions</span>
               <span className="hover:text-black cursor-pointer transition-colors">Privacy</span>
               <span className="hover:text-black cursor-pointer transition-colors">Help</span>
           </div>
           <div className="text-center text-xs text-gray-400 mt-4 font-light">
               © 2024 DesiCart
           </div>
      </div>
    </div>
  );
};

export default SignIn;