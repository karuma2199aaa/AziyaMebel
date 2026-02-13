
import { Language, Product, UserRole, Category } from './types';

export const SUPER_ADMIN_EMAIL = 'iboolimi@gmail.com';
export const ADMIN_TELEGRAM_NUMBER = '+998955200299';

export const TRANSLATIONS = {
  [Language.RU]: {
    brandName: "ASIA FURNITURE",
    tagline: "Цифровое святилище вашего дома",
    catalog: "Коллекции",
    search: "Поиск гармонии...",
    categories: "Разделы",
    price: "Стоимость",
    currency: "сум",
    order: "Заказать в Telegram",
    specifications: "Детализация",
    dimensions: "Габариты",
    material: "Материал",
    name: "Ваше имя",
    phone: "Номер телефона",
    email: "Email",
    submitOrder: "Отправить заказ в Telegram",
    relatedProducts: "Аналоги и дополнения",
    adminPanel: "Управление",
    profile: "Личный кабинет",
    logout: "Выйти",
    login: "Войти",
    addProduct: "Добавить позицию",
    editProduct: "Правка",
    delete: "Удалить",
    save: "Сохранить",
    cancel: "Отмена",
    team: "Команда",
    noProducts: "В данный момент этот раздел пуст",
    orderSuccess: "Заказ сформирован!",
    uzbekistan: "Узбекистан",
    all: "Все коллекции",
    quickView: "Посмотреть",
    imageUpload: "Загрузить фото",
    takePhoto: "Сделать фото",
    viewCategory: "Перейти",
    myOrders: "Мои заказы",
    noOrders: "У вас пока нет заказов",
    manageCategories: "Разделы",
    addCategory: "Новый раздел",
    editCategory: "Правка раздела",
    categoryName: "Название раздела",
    categoryCover: "Обложка (URL или фото)"
  },
  [Language.UZ]: {
    brandName: "ASIA FURNITURE",
    tagline: "Uyingizning raqamli maskani",
    catalog: "To'plamlar",
    search: "Qidirish...",
    categories: "Bo'limlar",
    price: "Narxi",
    currency: "so'm",
    order: "Telegram orqali",
    specifications: "Tafsilotlar",
    dimensions: "O'lchamlari",
    material: "Material",
    name: "Ismingiz",
    phone: "Telefon",
    email: "Email",
    submitOrder: "Telegram-ga yuborish",
    relatedProducts: "O'xshash mahsulotlar",
    adminPanel: "Boshqaruv",
    profile: "Profil",
    logout: "Chiqish",
    login: "Kirish",
    addProduct: "Mahsulot qo'shish",
    editProduct: "Tahrirlash",
    delete: "O'chirish",
    save: "Saqlash",
    cancel: "Bekor qilish",
    team: "Jamoa",
    noProducts: "Hozirda bo'sh",
    orderSuccess: "Buyurtma yuborildi!",
    uzbekistan: "O'zbekiston",
    all: "Barcha to'plamlar",
    quickView: "Ko'rish",
    imageUpload: "Rasm yuklash",
    takePhoto: "Rasmga olish",
    viewCategory: "O'tish",
    myOrders: "Mening buyurtmalarim",
    noOrders: "Sizda buyurtmalar yo'q",
    manageCategories: "Bo'limlar",
    addCategory: "Yangi bo'lim",
    editCategory: "Bo'limni tahrirlash",
    categoryName: "Bo'lim nomi",
    categoryCover: "Muqova rasmi"
  }
};

export const INITIAL_CATEGORIES: Category[] = [
  { 
    id: 'cat1', 
    name: { [Language.RU]: "Спальные гарнитуры", [Language.UZ]: "Yotoqxona to'plamlari" }, 
    cover: "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=1200" 
  },
  { 
    id: 'cat2', 
    name: { [Language.RU]: "Шкафы и хранение", [Language.UZ]: "Shkaflar va saqlash" }, 
    cover: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1200" 
  },
  { 
    id: 'cat3', 
    name: { [Language.RU]: "Детская мебель", [Language.UZ]: "Bolalar mebeli" }, 
    cover: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1200" 
  },
  { 
    id: 'cat4', 
    name: { [Language.RU]: "Гостиные", [Language.UZ]: "Mehmonxonalar" }, 
    cover: "https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?auto=format&fit=crop&q=80&w=1200" 
  },
  { 
    id: 'cat5', 
    name: { [Language.RU]: "Кухонные гарнитуры", [Language.UZ]: "Oshxona to'plamlari" }, 
    cover: "https://images.unsplash.com/photo-1556911223-e153e99660ed?auto=format&fit=crop&q=80&w=1200" 
  },
  { 
    id: 'cat6', 
    name: { [Language.RU]: "Предметы декора", [Language.UZ]: "Interyer buyumlari" }, 
    cover: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=1200" 
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: { [Language.RU]: "Гарнитур 'Нара'", [Language.UZ]: "Nara to'plami" },
    description: { [Language.RU]: "Полный комплект для спальни из массива тика.", [Language.UZ]: "Yotoqxona uchun to'liq to'plam." },
    price: 32000000,
    images: ["https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=800"],
    categoryId: "cat1",
    materialType: "Teak",
    dimensions: "King Size",
    materialDetail: { [Language.RU]: "Массив тика", [Language.UZ]: "Tik massivi" },
    inStock: true
  },
  {
    id: "p2",
    name: { [Language.RU]: "Шкаф 'Минимализм'", [Language.UZ]: "Minimalizm shkafi" },
    description: { [Language.RU]: "Вместительный шкаф-купе с фасадами из светлого бамбука.", [Language.UZ]: "Bambuk fasadli sig'imli shkaf." },
    price: 18500000,
    images: ["https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800"],
    categoryId: "cat2",
    materialType: "Bamboo",
    dimensions: "240x60x220 см",
    materialDetail: { [Language.RU]: "Бамбук, МДФ", [Language.UZ]: "Bambuk, MDF" },
    inStock: true
  },
  {
    id: "p3",
    name: { [Language.RU]: "Детская 'Маленький Дзен'", [Language.UZ]: "Kichik Dzen bolalar xonasi" },
    description: { [Language.RU]: "Экологически чистая мебель из ротанга и сосны.", [Language.UZ]: "Rotang va qarag'aydan yasalgan ekologik toza bolalar mebeli." },
    price: 14200000,
    images: ["https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800"],
    categoryId: "cat3",
    materialType: "Rattan",
    dimensions: "Custom",
    materialDetail: { [Language.RU]: "Ротанг, Сосна", [Language.UZ]: "Rotang, Qarag'ay" },
    inStock: true
  },
  {
    id: "p4",
    name: { [Language.RU]: "Гостиная 'Осака'", [Language.UZ]: "Osaka mehmonxonasi" },
    description: { [Language.RU]: "Модульная система для гостиной из состаренного тика.", [Language.UZ]: "Eskirtirilgan tik daraxtidan yasalgan modulli tizim." },
    price: 24500000,
    images: ["https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?auto=format&fit=crop&q=80&w=800"],
    categoryId: "cat4",
    materialType: "Teak",
    dimensions: "Модульная",
    materialDetail: { [Language.RU]: "Массив тика", [Language.UZ]: "Tik massivi" },
    inStock: true
  }
];
