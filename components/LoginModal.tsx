
import React, { useState } from 'react';

interface LoginModalProps {
  onLogin: (email: string) => void;
  onClose: () => void;
  t: any;
}

const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose, t }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
      <div className="bg-[#F9F9F7] w-full max-w-md p-10 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500 rounded-3xl border border-[#E5E5E0]">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-light tracking-widest uppercase">{t.login}</h2>
          <button onClick={onClose} className="p-2 text-gray-300 hover:text-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-2">{t.email}</label>
            <input 
              required
              type="email" 
              placeholder="example@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-[#E5E5E0] py-3 text-sm focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-black text-white py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-gray-800 transition-colors"
          >
            {t.login}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
