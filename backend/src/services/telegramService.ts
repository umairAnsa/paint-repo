import { logger } from '../lib/logger';

export async function sendTelegramNotification(message: string): Promise<void> {
  const token  = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    logger.warn('[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — skipping.');
    return;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' }),
    });

    const data = await res.json() as { ok: boolean };
    if (!data.ok) throw new Error('Telegram API returned ok:false');
    logger.info('[Telegram] Notification sent.');
  } catch (err) {
    logger.error('[Telegram] Failed to send notification.', err);
  }
}
