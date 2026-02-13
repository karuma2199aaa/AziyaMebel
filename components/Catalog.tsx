
import React, { useState, useMemo } from 'react';
import { Product, Language, Category } from '../types';

interface CatalogProps {
  products: Product[];
  categories: Category[];
  language: Language;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onProductClick: (id: string) => void;
  t: any;
}

const Catalog: React.FC<CatalogProps> = ({ products, categories, language, searchQuery, setSearchQuery, onProductClick, t }) => {
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name[language].toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCatId || selectedCatId === 'All' || p.categoryId === selectedCatId;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCatId, language]);

  if (!selectedCatId && !searchQuery) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 animate-in fade-in">
        <div className="mb-24 text-center">
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter mb-4">{t.brandName}</h1>
          <p className="text-gray-400 tracking-[0.3em] uppercase text-xs">{t.tagline}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(cat => (
            <div key={cat.id} className="group relative aspect-[4/5] overflow-hidden cursor-pointer bg-[#F0F0EB]" onClick={() => setSelectedCatId(cat.id)}>
              <img src={cat.cover} alt={cat.name[language]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <h3 className="text-white text-2xl font-light tracking-widest uppercase mb-4">{cat.name[language]}</h3>
                <button className="text-[10px] text-white font-bold tracking-[0.3em] uppercase border-b border-white pb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {t.viewCategory}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentCategory = categories.find(c => c.id === selectedCatId);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in">
      <div className="flex flex-col md:flex-row gap-8 mb-16 items-center justify-between">
        <div className="flex items-center space-x-6">
          <button onClick={() => setSelectedCatId(null)} className="p-3 rounded-full border hover:bg-black hover:text-white transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h2 className="text-3xl font-light tracking-tight">{currentCategory ? currentCategory.name[language] : t.all}</h2>
        </div>
        <input type="text" placeholder={t.search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full md:w-64 bg-transparent border-b py-2 text-sm outline-none focus:border-black" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredProducts.map(product => (
          <div key={product.id} className="group cursor-pointer" onClick={() => onProductClick(product.id)}>
            <div className="aspect-[3/4] overflow-hidden bg-[#F0F0EB] mb-4">
              <img src={product.images[0]} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-light">{product.name[language]}</h3>
              <div className="text-sm font-medium">{product.price.toLocaleString()} {t.currency}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
