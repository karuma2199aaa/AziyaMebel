
import { Product, Language, AdminUser } from '../types';
import { ADMIN_TELEGRAM_NUMBER } from '../constants';

export interface OrderData {
  name: string;
  phone: string;
  email: string;
}

const formatOrderMessage = (product: Product, customer: OrderData): string => {
  return `
📦 НОВЫЙ ЗАКАЗ: ASIA FURNITURE
-------------------------
🪑 Товар: ${product.name[Language.RU]}
💰 Цена: ${product.price.toLocaleString()} сум
📏 Габариты: ${product.dimensions}
-------------------------
👤 Клиент: ${customer.name}
📞 Телефон: ${customer.phone}
📧 Email: ${customer.email}
-------------------------
`.trim();
};

export const submitOrder = async (product: Product, customer: OrderData): Promise<{ success: boolean; fallbackUrl?: string; error?: string }> => {
  const botToken = localStorage.getItem('iboolimi_bot_token');
  const admins: AdminUser[] = JSON.parse(localStorage.getItem('iboolimi_admins') || '[]');
  
  const message = formatOrderMessage(product, customer);
  const encodedMessage = encodeURIComponent(message);

  // Формат t.me/+номер является наиболее надежным для прямых ссылок на чат
  const fallbackUrl = `https://t.me/${ADMIN_TELEGRAM_NUMBER}?text=${encodedMessage}`;

  // Если токен есть, но нет админов с Chat ID
  const recipients = admins.filter(admin => admin.telegramChatId && admin.telegramChatId.trim() !== '');
  
  if (botToken && botToken.trim() !== '' && recipients.length === 0) {
    return { 
      success: false, 
      fallbackUrl, 
      error: "API токен введен, но в списке 'Команда' ни у одного админа не указан Chat ID. Заказ открыт в обычном чате." 
    };
  }

  if (!botToken || botToken.trim() === '' || recipients.length === 0) {
    return { success: false, fallbackUrl };
  }

  try {
    const sendPromises = recipients.map(admin => {
      return fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: admin.telegramChatId,
          text: message,
        })
      });
    });

    const results = await Promise.all(sendPromises);
    const anySuccessful = results.some(res => res.ok);

    return { 
      success: anySuccessful, 
      fallbackUrl: anySuccessful ? undefined : fallbackUrl 
    };
  } catch (error) {
    console.error("Telegram API Error:", error);
    return { success: false, fallbackUrl };
  }
};
