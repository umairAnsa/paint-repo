import twilio from 'twilio';
import { logger } from '../lib/logger';
import type { LeadInput } from '../validation/leadSchema';

interface TwilioError extends Error {
  code?: number;
  moreInfo?: string;
  status?: number;
}

function buildWhatsAppMessage(data: LeadInput): string {
  return [
    '🎨 *New Lead — Norm Painting*',
    '',
    `👤 *Name:* ${data.name}`,
    `📞 *Phone:* ${data.phone || '—'}`,
    `📧 *Email:* ${data.email}`,
    '',
    `💬 *Message:*\n${data.description}`,
    '',
    `🕐 ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' })}`,
  ].join('\n');
}

function normaliseTo(raw: string): string {
  // Strip any leading "whatsapp:" prefix so we can rebuild it cleanly
  const digits = raw.replace(/^whatsapp:/, '').trim();
  return `whatsapp:${digits}`;
}

export function logTwilioConfig(): void {
  const sid    = process.env.TWILIO_SID;
  const auth   = process.env.TWILIO_AUTH;
  const from   = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';
  const admin  = process.env.ADMIN_PHONE;

  logger.info('[Twilio] Config check:', {
    TWILIO_SID:            sid   ? `${sid.slice(0, 8)}…`  : '❌ NOT SET',
    TWILIO_AUTH:           auth  ? '✅ set'                : '❌ NOT SET',
    TWILIO_WHATSAPP_FROM:  from,
    ADMIN_PHONE:           admin ? admin                   : '❌ NOT SET',
  });
}

export async function sendWhatsAppNotification(data: LeadInput): Promise<void> {
  const sid   = process.env.TWILIO_SID;
  const auth  = process.env.TWILIO_AUTH;
  const from  = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';
  const admin = process.env.ADMIN_PHONE;

  // ── Guard: missing credentials ────────────────────────────────────────────
  if (!sid || !auth) {
    logger.warn('[Twilio] TWILIO_SID or TWILIO_AUTH not set — skipping.');
    return;
  }
  if (!admin) {
    logger.warn('[Twilio] ADMIN_PHONE not set — skipping.');
    return;
  }

  // ── Guard: ADMIN_PHONE must include country code ──────────────────────────
  const rawAdmin = admin.replace(/^whatsapp:/, '').trim();
  if (!rawAdmin.startsWith('+')) {
    logger.error(
      '[Twilio] ADMIN_PHONE must start with + and country code (e.g. +61406342731). Current value: ' + admin,
    );
    return;
  }

  const to = normaliseTo(admin);

  try {
    const client  = twilio(sid, auth);
    const message = await client.messages.create({
      from: from.startsWith('whatsapp:') ? from : `whatsapp:${from}`,
      to,
      body: buildWhatsAppMessage(data),
    });

    logger.info('[Twilio] ✅ WhatsApp sent.', { messageSid: message.sid, to });
  } catch (err) {
    const e = err as TwilioError;
    // Surface the real Twilio error code so it's actionable in logs
    logger.error('[Twilio] ❌ WhatsApp failed.', {
      message:  e.message,
      code:     e.code,
      status:   e.status,
      moreInfo: e.moreInfo,
      from,
      to,
    });
    throw err; // re-throw so the caller can handle if needed
  }
}
