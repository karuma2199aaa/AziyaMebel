
import React from 'react';
import { Language, AdminUser } from '../types';

interface NavbarProps {
  language: Language;
  setLanguage: (l: Language) => void;
  onAdminClick: () => void;
  onHomeClick: () => void;
  currentUser: AdminUser | null;
  onLogout: () => void;
  t: any;
}

const Navbar: React.FC<NavbarProps> = ({ 
  language, 
  setLanguage, 
  onAdminClick, 
  onHomeClick, 
  currentUser,
  onLogout,
  t 
}) => {
  return (
    <nav className="sticky top-0 z-50 bg-[#F9F9F7]/90 backdrop-blur-xl border-b border-[#E5E5E0]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="text-2xl font-light tracking-[0.3em] cursor-pointer hover:opacity-70 transition-opacity"
          onClick={onHomeClick}
        >
          {t.brandName}
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2 border-r border-[#E5E5E0] pr-8 mr-2">
            <button 
              onClick={() => setLanguage(Language.RU)}
              className={`text-[10px] font-bold tracking-widest transition-colors ${language === Language.RU ? 'text-black' : 'text-gray-300'}`}
            >
              RU
            </button>
            <span className="text-gray-200 text-[10px]">/</span>
            <button 
              onClick={() => setLanguage(Language.UZ)}
              className={`text-[10px] font-bold tracking-widest transition-colors ${language === Language.UZ ? 'text-black' : 'text-gray-300'}`}
            >
              UZ
            </button>
          </div>

          <div className="flex items-center space-x-6">
            {currentUser ? (
              <div className="flex items-center space-x-6">
                <button 
                  onClick={onAdminClick}
                  className="p-2 rounded-full border border-black hover:bg-black hover:text-white transition-all"
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
                className="p-2 rounded-full border border-gray-300 hover:border-black transition-colors"
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
