
import React from 'react';
import { AdminUser, Language } from '../types';

interface ProfileViewProps {
  currentUser: AdminUser;
  language: Language;
  t: any;
}

const ProfileView: React.FC<ProfileViewProps> = ({ currentUser, t }) => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      <div className="mb-16 border-b border-[#E5E5E0] pb-8">
        <h1 className="text-4xl font-light tracking-tight mb-2">{t.profile}</h1>
        <p className="text-gray-400 text-sm uppercase tracking-widest">{currentUser.email}</p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-8">{t.myOrders}</h2>
          <div className="bg-[#F9F9F7] border border-[#E5E5E0] p-12 text-center rounded-2xl">
            <p className="text-gray-300 italic tracking-wide">{t.noOrders}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileView;
