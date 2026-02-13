
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
  { id: 'cat1', name: { [Language.RU]: "Спальня", [Language.UZ]: "Yotoqxona" }, cover: "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=800" },
  { id: 'cat2', name: { [Language.RU]: "Гостиная", [Language.UZ]: "Mehmonxona" }, cover: "https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?auto=format&fit=crop&q=80&w=800" }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: { [Language.RU]: "Гарнитур 'Нара'", [Language.UZ]: "Nara to'plami" },
    description: { [Language.RU]: "Элегантная мебель.", [Language.UZ]: "Elegant mebel." },
    price: 32000000,
    images: ["https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=800"],
    categoryId: "cat1",
    materialType: "Teak",
    dimensions: "King Size",
    materialDetail: { [Language.RU]: "Тик", [Language.UZ]: "Tik" },
    inStock: true
  }
];
