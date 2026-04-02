
import React from 'react';
import { Language, AdminUser } from '../types';

interface NavbarProps {
  language: Language;
  setLanguage: (l: Language) => void;
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
  onAdminClick: () => void;
  onHomeClick: () => void;
  currentUser: AdminUser | null;
  onLogout: () => void;
  t: any;
}

const Navbar: React.FC<NavbarProps> = ({ 
  language, 
  setLanguage, 
  darkMode,
  setDarkMode,
  onAdminClick, 
  onHomeClick, 
  currentUser,
  onLogout,
  t 
}) => {
  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${darkMode ? 'bg-gray-950/90 border-gray-800' : 'bg-[#F9F9F7]/90 border-[#E5E5E0]'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className={`text-2xl font-light tracking-[0.3em] cursor-pointer hover:opacity-70 transition-opacity ${darkMode ? 'text-white' : 'text-gray-900'}`}
          onClick={onHomeClick}
        >
          {t.brandName}
        </div>
        
        <div className="flex items-center space-x-8">
          <div className={`flex items-center space-x-2 border-r pr-8 mr-2 ${darkMode ? 'border-gray-800' : 'border-[#E5E5E0]'}`}>
            <button 
              onClick={() => setLanguage(Language.RU)}
              className={`text-[10px] font-bold tracking-widest transition-colors ${language === Language.RU ? (darkMode ? 'text-white' : 'text-black') : 'text-gray-400'}`}
            >
              RU
            </button>
            <span className="text-gray-400 text-[10px]">/</span>
            <button 
              onClick={() => setLanguage(Language.UZ)}
              className={`text-[10px] font-bold tracking-widest transition-colors ${language === Language.UZ ? (darkMode ? 'text-white' : 'text-black') : 'text-gray-400'}`}
            >
              UZ
            </button>
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full border transition-all ${darkMode ? 'border-gray-700 hover:bg-gray-800 text-yellow-400' : 'border-gray-300 hover:border-black text-gray-600'}`}
              title={darkMode ? "Light Mode" : "Dark Mode"}
            >
              {darkMode ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464l-.707-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414zm2.121 10.607a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM5 11a1 1 0 110-2H4a1 1 0 110 2h1z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {currentUser ? (
              <div className="flex items-center space-x-6">
                <button 
                  onClick={onAdminClick}
                  className={`p-2 rounded-full border transition-all ${darkMode ? 'border-white hover:bg-white hover:text-black text-white' : 'border-black hover:bg-black hover:text-white text-black'}`}
                  title={t.adminPanel}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <button 
                  onClick={onLogout}
                  className="text-xs font-medium tracking-widest uppercase text-red-400 hover:text-red-600 transition-colors"
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <button 
                onClick={onAdminClick}
                className={`p-2 rounded-full border transition-colors ${darkMode ? 'border-gray-700 hover:border-white text-gray-400 hover:text-white' : 'border-gray-300 hover:border-black text-gray-600 hover:text-black'}`}
                title={t.login}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
