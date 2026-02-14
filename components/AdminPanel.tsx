
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
  t: any;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  products, setProducts, categories, setCategories, admins, setAdmins, currentUser, language, t, onLogout 
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
      <div className="flex flex-wrap items-center justify-between mb-12 border-b pb-6 gap-4">
        <h1 className="text-3xl font-light">{t.adminPanel}</h1>
        <div className="flex flex-wrap gap-6">
          <button onClick={() => setActiveTab('products')} className={`text-[10px] font-bold uppercase pb-1 border-b-2 ${activeTab === 'products' ? 'border-black' : 'border-transparent text-gray-400'}`}>{t.catalog}</button>
          <button onClick={() => setActiveTab('categories')} className={`text-[10px] font-bold uppercase pb-1 border-b-2 ${activeTab === 'categories' ? 'border-black' : 'border-transparent text-gray-400'}`}>{t.manageCategories}</button>
          <button onClick={() => setActiveTab('team')} className={`text-[10px] font-bold uppercase pb-1 border-b-2 ${activeTab === 'team' ? 'border-black' : 'border-transparent text-gray-400'}`}>{t.team}</button>
          <button onClick={() => setActiveTab('settings')} className={`text-[10px] font-bold uppercase pb-1 border-b-2 ${activeTab === 'settings' ? 'border-black' : 'border-transparent text-gray-400'}`}>API & Настройки</button>
          <button onClick={onLogout} className="text-[10px] font-bold uppercase text-red-400">Выйти</button>
        </div>
      </div>

      {activeTab === 'products' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="flex justify-end">
            <button onClick={() => setEditingProduct({ name: { [Language.RU]: '', [Language.UZ]: '' }, description: { [Language.RU]: '', [Language.UZ]: '' }, price: 0, images: [], categoryId: categories[0]?.id || '', materialType: '', dimensions: '', materialDetail: { [Language.RU]: '', [Language.UZ]: '' }, inStock: true })} className="bg-black text-white px-8 py-3 text-[10px] font-bold uppercase">
              + {t.addProduct}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products.map(p => (
              <div key={p.id} className="bg-white border p-4 rounded group">
                <div className="aspect-square mb-4 bg-gray-50 overflow-hidden">
                  <img src={p.images[0]} className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
                </div>
                <h4 className="text-sm font-medium">{p.name[language]}</h4>
                <div className="flex justify-between mt-4">
                  <span className="text-xs text-gray-400">{p.price.toLocaleString()}</span>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingProduct(p)} className="text-gray-400 hover:text-black">Edit</button>
                    <button onClick={() => setProducts(products.filter(it => it.id !== p.id))} className="text-red-300">Del</button>
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
            <button onClick={() => setEditingCategory({ name: { [Language.RU]: '', [Language.UZ]: '' }, cover: '' })} className="bg-black text-white px-8 py-3 text-[10px] font-bold uppercase">
              + {t.addCategory}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map(c => (
              <div key={c.id} className="bg-white border p-4 rounded relative group">
                <img src={c.cover} className="w-full h-32 object-cover mb-4 rounded" />
                <h3 className="text-sm font-medium">{c.name[language]}</h3>
                <div className="flex gap-4 mt-4">
                  <button onClick={() => setEditingCategory(c)} className="text-xs uppercase font-bold hover:underline">Правка</button>
                  <button onClick={() => setCategories(categories.filter(it => it.id !== c.id))} className="text-xs uppercase font-bold text-red-400">Удалить</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {editingProduct && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl p-8 shadow-2xl">
            <h2 className="text-2xl font-light mb-8">{editingProduct.id ? t.editProduct : t.addProduct}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <input placeholder="Название (RU)" value={editingProduct.name?.[Language.RU] || ''} onChange={e => setEditingProduct(prev => ({...prev, name: {...(prev?.name || {[Language.RU]:'',[Language.UZ]:''}), [Language.RU]: e.target.value}} as any))} className="w-full border-b py-2 text-sm outline-none" />
                <input placeholder="Название (UZ)" value={editingProduct.name?.[Language.UZ] || ''} onChange={e => setEditingProduct(prev => ({...prev, name: {...(prev?.name || {[Language.RU]:'',[Language.UZ]:''}), [Language.UZ]: e.target.value}} as any))} className="w-full border-b py-2 text-sm outline-none" />
                <input type="number" placeholder="Цена (сум)" value={editingProduct.price || ''} onChange={e => setEditingProduct(prev => ({...prev, price: Number(e.target.value)}))} className="w-full border-b py-2 text-sm outline-none" />
                <select value={editingProduct.categoryId} onChange={e => setEditingProduct(prev => ({...prev, categoryId: e.target.value}))} className="w-full border-b py-2 text-sm outline-none bg-white">
                   <option value="">-- Выберите раздел --</option>
                   {categories.map(c => <option key={c.id} value={c.id}>{c.name[Language.RU]}</option>)}
                </select>
                <textarea placeholder="Описание (RU)" value={editingProduct.description?.[Language.RU] || ''} onChange={e => setEditingProduct(prev => ({...prev, description: {...(prev?.description || {[Language.RU]:'',[Language.UZ]:''}), [Language.RU]: e.target.value}} as any))} className="w-full bg-gray-50 p-2 text-sm h-24 outline-none border" />
                <textarea placeholder="Описание (UZ)" value={editingProduct.description?.[Language.UZ] || ''} onChange={e => setEditingProduct(prev => ({...prev, description: {...(prev?.description || {[Language.RU]:'',[Language.UZ]:''}), [Language.UZ]: e.target.value}} as any))} className="w-full bg-gray-50 p-2 text-sm h-24 outline-none border" />
              </div>
              <div className="space-y-6">
                 <div className="grid grid-cols-3 gap-2">
                   {editingProduct.images?.map((img, idx) => (
                     <div key={idx} className="relative aspect-square border"><img src={img} className="w-full h-full object-cover" /></div>
                   ))}
                 </div>
                 <div className="flex gap-2">
                    <button onClick={openCamera} className="flex-1 border py-3 text-[10px] font-bold uppercase hover:bg-black hover:text-white transition-all">Фото с камеры</button>
                    <label className="flex-1 border py-3 text-[10px] font-bold uppercase text-center cursor-pointer hover:bg-black hover:text-white transition-all">
                      Файл <input type="file" multiple className="hidden" onChange={e => {
                        Array.from(e.target.files || []).forEach(f => {
                          const reader = new FileReader();
                          reader.onload = ev => setEditingProduct(prev => ({...prev, images: [...(prev?.images || []), ev.target?.result as string]}) as any);
                          reader.readAsDataURL(f as Blob);
                        });
                      }} />
                    </label>
                 </div>
                 <button onClick={handleSaveProduct} className="w-full bg-black text-white py-4 text-[10px] font-bold uppercase rounded-lg">Сохранить</button>
                 <button onClick={() => setEditingProduct(null)} className="w-full text-[10px] font-bold uppercase py-2">Отмена</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'team' && (
        <div className="max-w-xl mx-auto space-y-8 animate-in fade-in">
          <div className="bg-[#F9F9F7] p-8 border rounded-xl space-y-4">
             <h3 className="text-xs font-bold uppercase">Добавить админа</h3>
             <input placeholder="Email" value={newAdmin.email} onChange={e => setNewAdmin({...newAdmin, email: e.target.value})} className="w-full border-b py-2 bg-transparent outline-none" />
             <input placeholder="Telegram Chat ID (числа)" value={newAdmin.chatId} onChange={e => setNewAdmin({...newAdmin, chatId: e.target.value.replace(/[^0-9-]/g, '')})} className="w-full border-b py-2 bg-transparent outline-none" />
             <button onClick={() => { if(newAdmin.email && newAdmin.chatId) {setAdmins([...admins, { email: newAdmin.email, role: UserRole.ADMIN, telegramChatId: newAdmin.chatId }]); setNewAdmin({email:'',phone:'',chatId:''}); } }} className="w-full bg-black text-white py-3 text-[10px] font-bold uppercase">Добавить</button>
          </div>
          <div className="space-y-2">
            {admins.map(a => (
              <div key={a.email} className="bg-white p-4 border rounded flex justify-between items-center text-sm">
                <div>
                  <p>{a.email}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-tighter">ID: {a.telegramChatId || 'Не указан'}</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-gray-100 px-2 py-1 rounded">{a.role}</span>
                  {a.email !== currentUser.email && (
                    <button onClick={() => setAdmins(admins.filter(ad => ad.email !== a.email))} className="text-red-400 text-xs">Удалить</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="max-w-xl mx-auto space-y-8 animate-in fade-in">
          <div className="bg-white p-12 border rounded-xl shadow-sm">
            <h2 className="text-xl font-light mb-8">Настройки уведомлений</h2>
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-400 block">Telegram Bot Token</label>
                <input type="password" value={botToken} onChange={e => setBotToken(e.target.value)} placeholder="Пример: 123456:ABC-DEF..." className="w-full border-b py-2 outline-none text-sm font-mono" />
                <p className="text-[9px] text-gray-400">Получите у @BotFather</p>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-400 block">Ваш личный Chat ID</label>
                <input type="text" value={myChatId} onChange={e => setMyChatId(e.target.value)} placeholder="Пример: 54321678" className="w-full border-b py-2 outline-none text-sm font-mono" />
                <p className="text-[9px] text-gray-400">Узнайте свой ID у @userinfobot. Без этого ID бот не сможет отправить вам заказ лично.</p>
              </div>

              <button onClick={handleSaveSettings} className="w-full bg-black text-white py-4 text-[10px] font-bold uppercase rounded-lg hover:bg-gray-800 transition-colors">
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
