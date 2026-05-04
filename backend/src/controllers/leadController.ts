import { Request, Response } from 'express';
import { leadSchema } from '../validation/leadSchema';
import { sendLeadEmail } from '../services/emailService';
import { sendWhatsAppNotification } from '../services/twilioService';
import Lead from '../models/Lead';
import { logger } from '../lib/logger';

function logError(tag: string, err: unknown): void {
  if (err instanceof Error) {
    logger.error(tag, { message: err.message, stack: err.stack?.split('\n')[1]?.trim() });
  } else {
    logger.error(tag, err);
  }
}

// ── POST /api/lead ──────────────────────────────────────────────────────────────

export async function createLead(req: Request, res: Response): Promise<void> {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    res.status(400).json({ error: firstIssue?.message ?? 'Invalid input.' });
    return;
  }

  const data = parsed.data;

  try {
    const lead = await Lead.create(data);
    logger.info('[Lead] Saved.', { id: (lead._id as object).toString(), name: data.name });

    // Fire notifications — errors are logged but do NOT fail the response
    sendLeadEmail(data).catch((err) => logError('[Lead] Email failed.', err));
    sendWhatsAppNotification(data).catch((err) => logError('[Lead] WhatsApp failed.', err));

    res.status(201).json({
      success: true,
      message: 'Thank you! We will be in touch within one business day.',
      id: (lead._id as object).toString(),
    });
  } catch (err) {
    logError('[Lead] DB save failed.', err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
}

// ── GET /api/lead ───────────────────────────────────────────────────────────────

export async function getLeads(_req: Request, res: Response): Promise<void> {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 }).lean();
    res.status(200).json({ success: true, count: leads.length, leads });
  } catch (err) {
    logError('[Lead] Fetch failed.', err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
}
