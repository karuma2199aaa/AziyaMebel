
import React, { useState } from 'react';

interface LoginModalProps {
  onLogin: (email: string) => void;
  onClose: () => void;
  darkMode: boolean;
  t: any;
}

const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose, darkMode, t }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
      <div className={`w-full max-w-md p-10 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500 rounded-3xl border transition-colors ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-[#F9F9F7] border-[#E5E5E0]'}`}>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-light tracking-widest uppercase">{t.login}</h2>
          <button onClick={onClose} className={`p-2 transition-colors ${darkMode ? 'text-gray-600 hover:text-white' : 'text-gray-300 hover:text-black'}`}>
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
              className={`w-full bg-transparent border-b py-3 text-sm focus:outline-none transition-colors ${darkMode ? 'border-gray-800 focus:border-white' : 'border-[#E5E5E0] focus:border-black'}`}
            />
          </div>
          <button 
            type="submit"
            className={`w-full py-5 text-[10px] font-bold tracking-[0.3em] uppercase transition-colors rounded-xl ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
          >
            {t.login}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
