
export enum Language {
  RU = 'ru',
  UZ = 'uz'
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface AdminUser {
  email: string;
  role: UserRole;
  phone?: string;
  telegramChatId?: string;
  name?: string;
}

export interface Category {
  id: string;
  name: { [key in Language]: string };
  cover: string;
}

export type MaterialType = 'Teak' | 'Rattan' | 'Bamboo' | 'Stone' | 'Textile' | string;

export interface Product {
  id: string;
  name: { [key in Language]: string };
  description: { [key in Language]: string };
  price: number;
  images: string[];
  categoryId: string; // Ссылка на ID категории
  materialType: MaterialType;
  dimensions: string;
  materialDetail: { [key in Language]: string };
  inStock: boolean;
}
