
import React, { useState, useRef, useEffect } from 'react';
import { Product, AdminUser, UserRole, Language, Category } from '../types';

interface AdminPanelProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  admins: AdminUser[];
  setAdmins: React.Dispatch<React.SetStateAction<AdminUser[]>>;
  currentUser: AdminUser;
  language: Language;
  darkMode: boolean;
  t: any;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  products, setProducts, categories, setCategories, admins, setAdmins, currentUser, language, darkMode, t, onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'team' | 'settings'>('products');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [newAdmin, setNewAdmin] = useState({ email: '', phone: '', chatId: '' });
  const [botToken, setBotToken] = useState(localStorage.getItem('iboolimi_bot_token') || '');
  const [myChatId, setMyChatId] = useState(currentUser.telegramChatId || '');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const isSuperAdmin = currentUser.role === UserRole.SUPER_ADMIN;

  const handleSaveProduct = () => {
    const p = editingProduct;
    if (!p?.name?.[Language.RU] || !p?.price || !p?.categoryId) {
      alert("Заполните Название (RU), Цену и выберите Раздел");
      return;
    }
    const finalProduct = {
      id: p.id || Date.now().toString(),
      name: p.name || { [Language.RU]: '', [Language.UZ]: '' },
      description: p.description || { [Language.RU]: '', [Language.UZ]: '' },
      price: p.price || 0,
      images: p.images || [],
      categoryId: p.categoryId,
      materialType: p.materialType || '',
      dimensions: p.dimensions || '',
      materialDetail: p.materialDetail || { [Language.RU]: '', [Language.UZ]: '' },
      inStock: p.inStock !== undefined ? p.inStock : true
    } as Product;
    if (p.id) {
      setProducts(products.map(item => item.id === p.id ? finalProduct : item));
    } else {
      setProducts([finalProduct, ...products]);
    }
    setEditingProduct(null);
  };

  const handleSaveCategory = () => {
    const c = editingCategory;
    if (!c?.name?.[Language.RU] || !c?.cover) {
      alert("Укажите название (RU) и обложку");
      return;
    }
    const finalCat = {
      id: c.id || `cat-${Date.now()}`,
      name: c.name || { [Language.RU]: '', [Language.UZ]: '' },
      cover: c.cover || ''
    } as Category;
    if (c.id) {
      setCategories(categories.map(item => item.id === c.id ? finalCat : item));
    } else {
      setCategories([...categories, finalCat]);
    }
    setEditingCategory(null);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('iboolimi_bot_token', botToken);
    // Обновляем Chat ID текущего пользователя в общем списке админов
    const updatedAdmins = admins.map(a => 
      a.email === currentUser.email ? { ...a, telegramChatId: myChatId } : a
    );
    setAdmins(updatedAdmins);
    alert("Настройки API сохранены. Убедитесь, что бот запущен!");
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      setIsCameraOpen(true);
      setTimeout(() => { if (videoRef.current) videoRef.current.srcObject = stream; }, 100);
    } catch (err) { alert("Камера недоступна"); }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      const data = canvas.toDataURL('image/jpeg');
      if (editingProduct) {
        setEditingProduct(prev => ({ ...prev, images: [...(prev?.images || []), data] }));
      } else if (editingCategory) {
        setEditingCategory(prev => ({ ...prev, cover: data }));
      }
      closeCamera();
    }
  };

  const closeCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    setIsCameraOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className={`flex flex-wrap items-center justify-between mb-12 border-b pb-6 gap-4 ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <h1 className="text-3xl font-light">{t.adminPanel}</h1>
        <div className="flex flex-wrap gap-6">
          <button onClick={() => setActiveTab('products')} className={`text-[10px] font-bold uppercase pb-1 border-b-2 transition-colors ${activeTab === 'products' ? (darkMode ? 'border-white text-white' : 'border-black text-black') : 'border-transparent text-gray-400'}`}>{t.catalog}</button>
          <button onClick={() => setActiveTab('categories')} className={`text-[10px] font-bold uppercase pb-1 border-b-2 transition-colors ${activeTab === 'categories' ? (darkMode ? 'border-white text-white' : 'border-black text-black') : 'border-transparent text-gray-400'}`}>{t.manageCategories}</button>
          <button onClick={() => setActiveTab('team')} className={`text-[10px] font-bold uppercase pb-1 border-b-2 transition-colors ${activeTab === 'team' ? (darkMode ? 'border-white text-white' : 'border-black text-black') : 'border-transparent text-gray-400'}`}>{t.team}</button>
          <button onClick={() => setActiveTab('settings')} className={`text-[10px] font-bold uppercase pb-1 border-b-2 transition-colors ${activeTab === 'settings' ? (darkMode ? 'border-white text-white' : 'border-black text-black') : 'border-transparent text-gray-400'}`}>API & Настройки</button>
          <button onClick={onLogout} className="text-[10px] font-bold uppercase text-red-400">Выйти</button>
        </div>
      </div>

      {activeTab === 'products' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="flex justify-end">
            <button onClick={() => setEditingProduct({ name: { [Language.RU]: '', [Language.UZ]: '' }, description: { [Language.RU]: '', [Language.UZ]: '' }, price: 0, images: [], categoryId: categories[0]?.id || '', materialType: '', dimensions: '', materialDetail: { [Language.RU]: '', [Language.UZ]: '' }, inStock: true })} className={`px-8 py-3 text-[10px] font-bold uppercase transition-colors ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
              + {t.addProduct}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products.map(p => (
              <div key={p.id} className={`border p-4 rounded group transition-colors ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="aspect-square mb-4 bg-gray-50 dark:bg-gray-800 overflow-hidden rounded">
                  <img src={p.images[0]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <h4 className="text-sm font-medium">{p.name[language]}</h4>
                <div className="flex justify-between mt-4">
                  <span className="text-xs text-gray-400">{p.price.toLocaleString()} {t.currency}</span>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingProduct(p)} className="text-gray-400 hover:text-blue-400 transition-colors">Edit</button>
                    <button onClick={() => setProducts(products.filter(it => it.id !== p.id))} className="text-red-300 hover:text-red-500 transition-colors">Del</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'categories' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="flex justify-end">
            <button onClick={() => setEditingCategory({ name: { [Language.RU]: '', [Language.UZ]: '' }, cover: '' })} className={`px-8 py-3 text-[10px] font-bold uppercase transition-colors ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
              + {t.addCategory}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map(c => (
              <div key={c.id} className={`border p-4 rounded relative group transition-colors ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <img src={c.cover} className="w-full h-32 object-cover mb-4 rounded" />
                <h3 className="text-sm font-medium">{c.name[language]}</h3>
                <div className="flex gap-4 mt-4">
                  <button onClick={() => setEditingCategory(c)} className="text-xs uppercase font-bold hover:underline">Правка</button>
                  <button onClick={() => setCategories(categories.filter(it => it.id !== c.id))} className="text-xs uppercase font-bold text-red-400 hover:text-red-600">Удалить</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {editingProduct && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl p-8 shadow-2xl transition-colors`}>
            <h2 className="text-2xl font-light mb-8">{editingProduct.id ? t.editProduct : t.addProduct}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <input placeholder="Название (RU)" value={editingProduct.name?.[Language.RU] || ''} onChange={e => setEditingProduct(prev => ({...prev, name: {...(prev?.name || {[Language.RU]:'',[Language.UZ]:''}), [Language.RU]: e.target.value}} as any))} className={`w-full border-b py-2 text-sm outline-none bg-transparent ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                <input placeholder="Название (UZ)" value={editingProduct.name?.[Language.UZ] || ''} onChange={e => setEditingProduct(prev => ({...prev, name: {...(prev?.name || {[Language.RU]:'',[Language.UZ]:''}), [Language.UZ]: e.target.value}} as any))} className={`w-full border-b py-2 text-sm outline-none bg-transparent ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                <input type="number" placeholder="Цена (сум)" value={editingProduct.price || ''} onChange={e => setEditingProduct(prev => ({...prev, price: Number(e.target.value)}))} className={`w-full border-b py-2 text-sm outline-none bg-transparent ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                <select value={editingProduct.categoryId} onChange={e => setEditingProduct(prev => ({...prev, categoryId: e.target.value}))} className={`w-full border-b py-2 text-sm outline-none bg-transparent ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                   <option value="">-- Выберите раздел --</option>
                   {categories.map(c => <option key={c.id} value={c.id} className="text-black">{c.name[Language.RU]}</option>)}
                </select>
                <textarea placeholder="Описание (RU)" value={editingProduct.description?.[Language.RU] || ''} onChange={e => setEditingProduct(prev => ({...prev, description: {...(prev?.description || {[Language.RU]:'',[Language.UZ]:''}), [Language.RU]: e.target.value}} as any))} className={`w-full p-2 text-sm h-24 outline-none border rounded ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`} />
                <textarea placeholder="Описание (UZ)" value={editingProduct.description?.[Language.UZ] || ''} onChange={e => setEditingProduct(prev => ({...prev, description: {...(prev?.description || {[Language.RU]:'',[Language.UZ]:''}), [Language.UZ]: e.target.value}} as any))} className={`w-full p-2 text-sm h-24 outline-none border rounded ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`} />
              </div>
              <div className="space-y-6">
                 <div className="grid grid-cols-3 gap-2">
                   {editingProduct.images?.map((img, idx) => (
                     <div key={idx} className="relative aspect-square border group">
                       <img src={img} className="w-full h-full object-cover" />
                       <button 
                         onClick={() => setEditingProduct(prev => ({...prev, images: prev?.images?.filter((_, i) => i !== idx)}))}
                         className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                       >
                         <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                         </svg>
                       </button>
                     </div>
                   ))}
                 </div>
                 <div className="flex gap-2">
                    <button onClick={openCamera} className={`flex-1 border py-3 text-[10px] font-bold uppercase transition-all ${darkMode ? 'border-gray-700 hover:bg-white hover:text-black' : 'border-gray-200 hover:bg-black hover:text-white'}`}>Фото с камеры</button>
                    <label className={`flex-1 border py-3 text-[10px] font-bold uppercase text-center cursor-pointer transition-all ${darkMode ? 'border-gray-700 hover:bg-white hover:text-black' : 'border-gray-200 hover:bg-black hover:text-white'}`}>
                      Файл <input type="file" multiple className="hidden" onChange={e => {
                        Array.from(e.target.files || []).forEach(f => {
                          const reader = new FileReader();
                          reader.onload = ev => setEditingProduct(prev => ({...prev, images: [...(prev?.images || []), ev.target?.result as string]}) as any);
                          reader.readAsDataURL(f as Blob);
                        });
                      }} />
                    </label>
                 </div>
                 <button onClick={handleSaveProduct} className={`w-full py-4 text-[10px] font-bold uppercase rounded-lg transition-colors ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>Сохранить</button>
                 <button onClick={() => setEditingProduct(null)} className="w-full text-[10px] font-bold uppercase py-2">Отмена</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editingCategory && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} w-full max-w-xl rounded-xl p-8 shadow-2xl transition-colors`}>
            <h2 className="text-2xl font-light mb-8">{editingCategory.id ? t.editCategory : t.addCategory}</h2>
            <div className="space-y-6">
              <div className="space-y-4">
                <input placeholder="Название (RU)" value={editingCategory.name?.[Language.RU] || ''} onChange={e => setEditingCategory(prev => ({...prev, name: {...(prev?.name || {[Language.RU]:'',[Language.UZ]:''}), [Language.RU]: e.target.value}} as any))} className={`w-full border-b py-2 text-sm outline-none bg-transparent ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                <input placeholder="Название (UZ)" value={editingCategory.name?.[Language.UZ] || ''} onChange={e => setEditingCategory(prev => ({...prev, name: {...(prev?.name || {[Language.RU]:'',[Language.UZ]:''}), [Language.UZ]: e.target.value}} as any))} className={`w-full border-b py-2 text-sm outline-none bg-transparent ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-gray-400">Обложка раздела</label>
                  {editingCategory.cover && (
                    <div className="relative aspect-video mb-2 border rounded overflow-hidden">
                      <img src={editingCategory.cover} className="w-full h-full object-cover" />
                      <button onClick={() => setEditingCategory(prev => ({...prev, cover: ''}))} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button onClick={openCamera} className={`flex-1 border py-3 text-[10px] font-bold uppercase transition-all ${darkMode ? 'border-gray-700 hover:bg-white hover:text-black' : 'border-gray-200 hover:bg-black hover:text-white'}`}>Камера</button>
                    <label className={`flex-1 border py-3 text-[10px] font-bold uppercase text-center cursor-pointer transition-all ${darkMode ? 'border-gray-700 hover:bg-white hover:text-black' : 'border-gray-200 hover:bg-black hover:text-white'}`}>
                      Файл <input type="file" className="hidden" onChange={e => {
                        const f = e.target.files?.[0];
                        if (f) {
                          const reader = new FileReader();
                          reader.onload = ev => setEditingCategory(prev => ({...prev, cover: ev.target?.result as string}));
                          reader.readAsDataURL(f);
                        }
                      }} />
                    </label>
                  </div>
                  <input placeholder="Или вставьте URL обложки" value={editingCategory.cover || ''} onChange={e => setEditingCategory(prev => ({...prev, cover: e.target.value}))} className={`w-full border-b py-2 text-sm outline-none bg-transparent ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={handleSaveCategory} className={`w-full py-4 text-[10px] font-bold uppercase rounded-lg transition-colors ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>Сохранить</button>
                <button onClick={() => setEditingCategory(null)} className="w-full text-[10px] font-bold uppercase py-2">Отмена</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'team' && (
        <div className="max-w-xl mx-auto space-y-8 animate-in fade-in">
          <div className={`p-8 border rounded-xl space-y-4 transition-colors ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-[#F9F9F7] border-gray-200'}`}>
             <h3 className="text-xs font-bold uppercase">Добавить админа</h3>
             <input placeholder="Email" value={newAdmin.email} onChange={e => setNewAdmin({...newAdmin, email: e.target.value})} className={`w-full border-b py-2 bg-transparent outline-none ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
             <input placeholder="Telegram Chat ID (числа)" value={newAdmin.chatId} onChange={e => setNewAdmin({...newAdmin, chatId: e.target.value.replace(/[^0-9-]/g, '')})} className={`w-full border-b py-2 bg-transparent outline-none ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
             <button onClick={() => { if(newAdmin.email && newAdmin.chatId) {setAdmins([...admins, { email: newAdmin.email, role: UserRole.ADMIN, telegramChatId: newAdmin.chatId }]); setNewAdmin({email:'',phone:'',chatId:''}); } }} className={`w-full py-3 text-[10px] font-bold uppercase transition-colors ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>Добавить</button>
          </div>
          <div className="space-y-2">
            {admins.map(a => (
              <div key={a.email} className={`p-4 border rounded flex justify-between items-center text-sm transition-colors ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <div>
                  <p>{a.email}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-tighter">ID: {a.telegramChatId || 'Не указан'}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`text-[10px] px-2 py-1 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>{a.role}</span>
                  {a.email !== currentUser.email && (
                    <button onClick={() => setAdmins(admins.filter(ad => ad.email !== a.email))} className="text-red-400 text-xs hover:text-red-600">Удалить</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="max-w-xl mx-auto space-y-8 animate-in fade-in">
          <div className={`p-12 border rounded-xl shadow-sm transition-colors ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
            <h2 className="text-xl font-light mb-8">Настройки уведомлений</h2>
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-400 block">Telegram Bot Token</label>
                <input type="password" value={botToken} onChange={e => setBotToken(e.target.value)} placeholder="Пример: 123456:ABC-DEF..." className={`w-full border-b py-2 outline-none text-sm font-mono bg-transparent ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                <p className="text-[9px] text-gray-400">Получите у @BotFather</p>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-400 block">Ваш личный Chat ID</label>
                <input type="text" value={myChatId} onChange={e => setMyChatId(e.target.value)} placeholder="Пример: 54321678" className={`w-full border-b py-2 outline-none text-sm font-mono bg-transparent ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                <p className="text-[9px] text-gray-400">Узнайте свой ID у @userinfobot. Без этого ID бот не сможет отправить вам заказ лично.</p>
              </div>

              <button onClick={handleSaveSettings} className={`w-full py-4 text-[10px] font-bold uppercase rounded-lg transition-colors ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
                Сохранить все настройки
              </button>
            </div>
          </div>
        </div>
      )}

      {isCameraOpen && (
        <div className="fixed inset-0 z-[110] bg-black flex flex-col">
          <div className="flex-grow flex items-center justify-center relative">
            <video ref={videoRef} autoPlay playsInline className="max-h-full max-w-full" />
            <canvas ref={canvasRef} className="hidden" />
          </div>
          <div className="h-32 flex items-center justify-around bg-black px-8">
            <button onClick={closeCamera} className="text-white text-xs uppercase">Отмена</button>
            <button onClick={capturePhoto} className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center"><div className="w-16 h-16 rounded-full bg-white active:scale-90 transition-transform" /></button>
            <div className="w-12" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
