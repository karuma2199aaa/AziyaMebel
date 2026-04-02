
import React from 'react';
import { AdminUser, Language } from '../types';

interface ProfileViewProps {
  currentUser: AdminUser;
  language: Language;
  darkMode: boolean;
  t: any;
}

const ProfileView: React.FC<ProfileViewProps> = ({ currentUser, darkMode, t }) => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      <div className={`mb-16 border-b pb-8 transition-colors ${darkMode ? 'border-gray-800' : 'border-[#E5E5E0]'}`}>
        <h1 className="text-4xl font-light tracking-tight mb-2">{t.profile}</h1>
        <p className="text-gray-400 text-sm uppercase tracking-widest">{currentUser.email}</p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-8">{t.myOrders}</h2>
          <div className={`p-12 text-center rounded-2xl border transition-colors ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-[#F9F9F7] border-[#E5E5E0]'}`}>
            <p className="text-gray-300 italic tracking-wide">{t.noOrders}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileView;
