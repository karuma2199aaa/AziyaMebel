
import React, { useState, useMemo } from 'react';
import { Product, Language } from '../types';
import { submitOrder } from '../services/orderService';

interface ProductDetailProps {
  product: Product;
  allProducts: Product[];
  language: Language;
  onBack: () => void;
  onProductClick: (id: string) => void;
  t: any;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, allProducts, language, onBack, onProductClick, t }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [orderForm, setOrderForm] = useState({ name: '', phone: '', email: '' });
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const similarProducts = useMemo(() => {
    return allProducts
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 3);
  }, [product, allProducts]);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdering(true);
    const success = await submitOrder(product, orderForm);
    setIsOrdering(false);
    if (success) {
      setOrderSuccess(true);
      setOrderForm({ name: '', phone: '', email: '' });
    } else {
      alert("Ошибка при автоматической отправке в Telegram. Убедитесь, что бот настроен.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <button 
        onClick={onBack}
        className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-black mb-12 transition-colors flex items-center"
      >
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        {t.catalog}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
        <div className="lg:col-span-7 space-y-6">
          <div className="aspect-[4/5] bg-[#F0F0EB] overflow-hidden rounded-sm">
            <img 
              src={product.images[activeImage]} 
              alt={product.name[language]}
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`aspect-square overflow-hidden border transition-colors ${activeImage === idx ? 'border-black' : 'border-transparent opacity-60'}`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight">{product.name[language]}</h1>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              {product.description[language]}
            </p>
            <div className="text-2xl font-medium pt-4">
              {product.price > 0 ? `${product.price.toLocaleString()} ${t.currency}` : ''}
            </div>
          </div>

          {!orderSuccess ? (
            <form onSubmit={handleOrder} className="bg-[#F9F9F7] p-8 space-y-6 mt-12 border border-[#E5E5E0] rounded-2xl shadow-sm">
              <h3 className="text-sm font-bold tracking-widest uppercase mb-4">Оформить заказ</h3>
              <input 
                required placeholder={t.name}
                value={orderForm.name} onChange={e => setOrderForm({...orderForm, name: e.target.value})}
                className="w-full bg-transparent border-b border-[#E5E5E0] py-3 text-sm focus:outline-none focus:border-black transition-colors"
              />
              <input 
                required placeholder={t.phone}
                value={orderForm.phone} onChange={e => setOrderForm({...orderForm, phone: e.target.value})}
                className="w-full bg-transparent border-b border-[#E5E5E0] py-3 text-sm focus:outline-none focus:border-black transition-colors"
              />
              <button 
                type="submit" disabled={isOrdering}
                className="w-full bg-black text-white py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-gray-800 transition-colors disabled:opacity-50 rounded-xl"
              >
                {isOrdering ? 'ОТПРАВКА...' : 'ЗАКАЗАТЬ В ОДИН КЛИК'}
              </button>
            </form>
          ) : (
            <div className="bg-[#F1F5E8] p-12 text-center space-y-6 animate-in slide-in-from-top-4 border border-[#8E9775]/20 rounded-3xl">
              <div className="w-12 h-12 bg-[#8E9775] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <p className="text-sm font-medium tracking-wide">ЗАКАЗ УСПЕШНО ОТПРАВЛЕН!</p>
              <p className="text-[10px] uppercase tracking-widest text-[#8E9775]">Администраторы уведомлены в Telegram</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
