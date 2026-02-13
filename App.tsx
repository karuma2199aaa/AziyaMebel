
import React, { useState, useEffect } from 'react';
import { Language, Product, AdminUser, UserRole, Category } from './types';
import { SUPER_ADMIN_EMAIL, INITIAL_PRODUCTS, TRANSLATIONS, ADMIN_TELEGRAM_NUMBER, INITIAL_CATEGORIES } from './constants';
import Navbar from './components/Navbar';
import Catalog from './components/Catalog';
import ProductDetail from './components/ProductDetail';
import AdminPanel from './components/AdminPanel';
import LoginModal from './components/LoginModal';
import ProfileView from './components/ProfileView';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.RU);
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('iboolimi_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('iboolimi_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });
  const [admins, setAdmins] = useState<AdminUser[]>(() => {
    const saved = localStorage.getItem('iboolimi_admins');
    return saved ? JSON.parse(saved) : [{ email: SUPER_ADMIN_EMAIL, role: UserRole.SUPER_ADMIN, phone: ADMIN_TELEGRAM_NUMBER }];
  });
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    const saved = sessionStorage.getItem('iboolimi_session');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [view, setView] = useState<{ type: 'catalog' | 'detail' | 'admin' | 'profile', productId?: string }>({ type: 'catalog' });
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('iboolimi_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('iboolimi_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('iboolimi_admins', JSON.stringify(admins));
    if (currentUser) {
      const updated = admins.find(a => a.email === currentUser.email);
      if (updated && JSON.stringify(updated) !== JSON.stringify(currentUser)) {
        setCurrentUser(updated);
        sessionStorage.setItem('iboolimi_session', JSON.stringify(updated));
      }
    }
  }, [admins, currentUser]);

  const handleLogin = (email: string) => {
    const foundAdmin = admins.find(a => a.email.toLowerCase() === email.toLowerCase());
    if (foundAdmin) {
      setCurrentUser(foundAdmin);
      sessionStorage.setItem('iboolimi_session', JSON.stringify(foundAdmin));
    } else {
      const user = { email, role: UserRole.USER };
      setCurrentUser(user);
      sessionStorage.setItem('iboolimi_session', JSON.stringify(user));
    }
    setShowLogin(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('iboolimi_session');
    setView({ type: 'catalog' });
  };

  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        language={language} 
        setLanguage={setLanguage}
        onAdminClick={() => !currentUser ? setShowLogin(true) : currentUser.role === UserRole.USER ? setView({ type: 'profile' }) : setView({ type: 'admin' })}
        onHomeClick={() => setView({ type: 'catalog' })}
        currentUser={currentUser}
        onLogout={handleLogout}
        t={t}
      />

      <main className="flex-grow">
        {view.type === 'catalog' && (
          <Catalog 
            products={products}
            categories={categories}
            language={language} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onProductClick={(id) => setView({ type: 'detail', productId: id })}
            t={t}
          />
        )}
        
        {view.type === 'detail' && view.productId && (
          <ProductDetail 
            product={products.find(p => p.id === view.productId)!}
            allProducts={products}
            language={language}
            onBack={() => setView({ type: 'catalog' })}
            onProductClick={(id) => setView({ type: 'detail', productId: id })}
            t={t}
          />
        )}

        {view.type === 'admin' && currentUser && (currentUser.role === UserRole.ADMIN || currentUser.role === UserRole.SUPER_ADMIN) && (
          <AdminPanel 
            products={products}
            setProducts={setProducts}
            categories={categories}
            setCategories={setCategories}
            admins={admins}
            setAdmins={setAdmins}
            currentUser={currentUser}
            language={language}
            t={t}
            onLogout={handleLogout}
          />
        )}

        {view.type === 'profile' && currentUser && (
          <ProfileView currentUser={currentUser} language={language} t={t} />
        )}
      </main>

      {showLogin && <LoginModal onLogin={handleLogin} onClose={() => setShowLogin(false)} t={t} />}

      <footer className="bg-gray-900 text-white py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <h3 className="text-2xl font-light tracking-[0.3em] mb-4">ASIA FURNITURE</h3>
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
