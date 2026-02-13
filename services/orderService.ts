
import { Product, Language, AdminUser } from '../types';

export interface OrderData {
  name: string;
  phone: string;
  email: string;
}

/**
 * Автоматически отправляет заказ всем администраторам через Telegram Bot.
 * Не требует действий от покупателя.
 */
export const submitOrder = async (product: Product, customer: OrderData): Promise<boolean> => {
  // Получаем настройки и список админов из хранилища
  const botToken = localStorage.getItem('iboolimi_bot_token');
  const admins: AdminUser[] = JSON.parse(localStorage.getItem('iboolimi_admins') || '[]');

  if (!botToken) {
    console.warn("Telegram Bot Token не настроен в панели управления.");
    return false;
  }

  const message = `
📦 *НОВЫЙ ЗАКАЗ: ASIA FURNITURE*
-------------------------
🪑 *Товар:* ${product.name[Language.RU]}
💰 *Цена:* ${product.price.toLocaleString()} сум
📏 *Габариты:* ${product.dimensions}
-------------------------
👤 *Клиент:* ${customer.name}
📞 *Телефон:* ${customer.phone}
📧 *Email:* ${customer.email}
-------------------------
_Заказ отправлен автоматически_
  `.trim();

  const recipients = admins.filter(admin => admin.telegramChatId);

  if (recipients.length === 0) {
    console.warn("Нет администраторов с указанным Telegram Chat ID.");
    return false;
  }

  const sendPromises = recipients.map(admin => {
    return fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: admin.telegramChatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });
  });

  try {
    const results = await Promise.all(sendPromises);
    const someOk = results.some(res => res.ok);
    return someOk;
  } catch (error) {
    console.error("Ошибка при отправке в Telegram:", error);
    return false;
  }
};
