import { Request, Response } from 'express';
import Quote from '../models/Quote';
import Lead from '../models/Lead';
import { generateQuotePDF } from '../services/quotePdfService';
import { logger } from '../lib/logger';
import { Resend } from 'resend';

async function nextQuoteNumber(): Promise<string> {
  const count = await Quote.countDocuments();
  return `QT-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
}

function validityDate(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'object' && err !== null && 'message' in err) {
    const message = (err as { message?: unknown }).message;
    if (typeof message === 'string') return message;
  }
  return 'Unknown email error.';
}

// ── GET /api/quote ────────────────────────────────────────────────────────────

export async function listQuotes(_req: Request, res: Response): Promise<void> {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, quotes });
  } catch (err) {
    logger.error('[Quote] List failed.', err);
    res.status(500).json({ error: 'Server error.' });
  }
}

// ── GET /api/quote/leads ──────────────────────────────────────────────────────

export async function listLeads(_req: Request, res: Response): Promise<void> {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, leads });
  } catch (err) {
    logger.error('[Quote] Leads fetch failed.', err);
    res.status(500).json({ error: 'Server error.' });
  }
}

// ── POST /api/quote ───────────────────────────────────────────────────────────

export async function createQuote(req: Request, res: Response): Promise<void> {
  const { leadId, name, email, phone, service, price, gstPercentage, gstAmount, description, validityDays } = req.body;

  if (!name || !email || !service || !price) {
    res.status(400).json({ error: 'name, email, service and price are required.' });
    return;
  }

  try {
    const quoteNumber = await nextQuoteNumber();
    const parsedPrice = Number(price);
    const parsedGstPercentage = gstPercentage === undefined || gstPercentage === '' ? undefined : Number(gstPercentage);
    const fallbackGstAmount = gstAmount === undefined || gstAmount === '' ? undefined : Number(gstAmount);

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      res.status(400).json({ error: 'Price must be a positive number.' });
      return;
    }

    if (parsedGstPercentage !== undefined && (!Number.isFinite(parsedGstPercentage) || parsedGstPercentage < 0)) {
      res.status(400).json({ error: 'GST percentage must be a positive number.' });
      return;
    }

    if (
      parsedGstPercentage === undefined &&
      fallbackGstAmount !== undefined &&
      (!Number.isFinite(fallbackGstAmount) || fallbackGstAmount < 0)
    ) {
      res.status(400).json({ error: 'GST amount must be a positive number.' });
      return;
    }

    const calculatedGstAmount =
      parsedGstPercentage !== undefined
        ? Number(((parsedPrice * parsedGstPercentage) / 100).toFixed(2))
        : fallbackGstAmount;

    const quote = await Quote.create({
      quoteNumber,
      leadId: leadId || undefined,
      name, email, phone, service,
      price:       parsedPrice,
      gstPercentage: parsedGstPercentage,
      gstAmount:   calculatedGstAmount,
      description: description || undefined,
      validUntil:  validityDate(Number(validityDays) || 7),
    });

    logger.info('[Quote] Created.', { quoteNumber, name });
    res.status(201).json({ success: true, quote });
  } catch (err) {
    logger.error('[Quote] Create failed.', err);
    res.status(500).json({ error: 'Server error.' });
  }
}

// ── GET /api/quote/:id/pdf ────────────────────────────────────────────────────

export async function downloadPdf(req: Request, res: Response): Promise<void> {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) { res.status(404).json({ error: 'Quote not found.' }); return; }

    const pdf = await generateQuotePDF(quote);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${quote.quoteNumber}.pdf"`);
    res.send(pdf);
  } catch (err) {
    logger.error('[Quote] PDF failed.', err);
    res.status(500).json({ error: 'PDF generation failed.' });
  }
}

// ── POST /api/quote/:id/send ──────────────────────────────────────────────────

export async function sendQuote(req: Request, res: Response): Promise<void> {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) { res.status(404).json({ error: 'Quote not found.' }); return; }

    const sendToEmail = (req.body.overrideEmail as string | undefined)?.trim() || quote.email;

    const pdf    = await generateQuotePDF(quote);
    const quoteTotal = quote.price + (quote.gstAmount || 0);
    const price  = `$${quoteTotal.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`;
    const gstLabel = quote.gstPercentage ? `GST (${quote.gstPercentage}%)` : 'GST';
    const gstRow = quote.gstAmount
      ? `<tr><td style="padding:12px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;border-top:1px solid #e5e7eb;">${gstLabel}</td><td style="padding:12px 16px;font-size:14px;color:#111827;border-top:1px solid #e5e7eb;">$${quote.gstAmount.toLocaleString('en-AU', { minimumFractionDigits: 2 })}</td></tr>`
      : '';

    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    if (!resendApiKey) {
      logger.error('[Quote] Email failed. RESEND_API_KEY is not configured.');
      res.status(500).json({ success: false, error: 'Email is not configured on the live server. Set RESEND_API_KEY.' });
      return;
    }

    // ── Email via Resend ──────────────────────────────────────────────────────
    try {
      const resend = new Resend(resendApiKey);
      const from   = process.env.RESEND_FROM || 'Norm Painting <info@normpainting.com>';

      const { error } = await resend.emails.send({
        from,
        to:          [sendToEmail],
        replyTo:     process.env.EMAIL_TO || 'info@normpainting.com',
        subject:     `Your Quote from Norm Painting — ${quote.quoteNumber}`,
        html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
              <div style="background:#0c1f3d;padding:28px 32px;border-bottom:4px solid #f97316;">
                <img src="https://normpainting.com/logo.png" alt="Norm Painting" height="48" style="display:block;margin-bottom:12px;" />
                <h2 style="color:#ffffff;margin:0;font-size:20px;">Your Quote is Ready!</h2>
              </div>
              <div style="padding:32px;background:#ffffff;border:1px solid #e5e7eb;">
                <p style="color:#374151;">Hi <strong>${quote.name}</strong>,</p>
                <p style="color:#374151;">Thank you for your interest. Please find your quote attached.</p>
                <table style="width:100%;border-collapse:collapse;margin:20px 0;">
                  <tr style="background:#f8fafc;">
                    <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;">Quote Number</td>
                    <td style="padding:12px 16px;font-size:14px;color:#111827;font-weight:600;">${quote.quoteNumber}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;border-top:1px solid #e5e7eb;">Service</td>
                    <td style="padding:12px 16px;font-size:14px;color:#111827;border-top:1px solid #e5e7eb;">${quote.service}</td>
                  </tr>
                  <tr style="background:#f8fafc;">
                    <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;border-top:1px solid #e5e7eb;">Quote Total</td>
                    <td style="padding:12px 16px;font-size:16px;color:#f97316;font-weight:800;border-top:1px solid #e5e7eb;">${price}</td>
                  </tr>
                  ${gstRow}
                  <tr>
                    <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;border-top:1px solid #e5e7eb;">Valid Until</td>
                    <td style="padding:12px 16px;font-size:14px;color:#111827;border-top:1px solid #e5e7eb;">${new Date(quote.validUntil).toLocaleDateString('en-AU', { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                  </tr>
                  ${quote.description ? `<tr style="background:#f8fafc;"><td style="padding:12px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;border-top:1px solid #e5e7eb;">Notes</td><td style="padding:12px 16px;font-size:14px;color:#374151;border-top:1px solid #e5e7eb;">${quote.description}</td></tr>` : ''}
                </table>
                <p style="color:#374151;">To accept this quote, simply reply to this email or call us on <strong>0406 342 731</strong>.</p>
                <a href="tel:0406342731" style="display:inline-block;background:#f97316;color:#ffffff;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:100px;font-size:13px;margin-top:8px;">Call to Accept</a>
              </div>
              <div style="padding:16px 32px;background:#f8fafc;border:1px solid #e5e7eb;border-top:none;text-align:center;">
                <p style="margin:0;font-size:12px;color:#9ca3af;">Norm Painting · Melbourne VIC, Australia · ABN 84 673 345 054</p>
              </div>
            </div>
          `,
        attachments: [{ filename: `${quote.quoteNumber}.pdf`, content: pdf.toString('base64') }],
      });

      if (error) throw new Error(error.message);
      logger.info('[Quote] Email sent via Resend.', { to: sendToEmail });
    } catch (err) {
      const message = getErrorMessage(err);
      logger.error('[Quote] Email failed.', { message, to: sendToEmail });
      res.status(502).json({ success: false, error: `Email failed: ${message}` });
      return;
    }


    quote.status = 'Sent';
    await quote.save();

    res.json({ success: true });
  } catch (err) {
    logger.error('[Quote] Send failed.', err);
    res.status(500).json({ error: 'Server error.' });
  }
}

// ── PATCH /api/quote/:id/status ───────────────────────────────────────────────

export async function updateStatus(req: Request, res: Response): Promise<void> {
  const { status } = req.body;
  if (!['Draft', 'Sent', 'Accepted', 'Rejected'].includes(status)) {
    res.status(400).json({ error: 'Invalid status.' });
    return;
  }
  try {
    const quote = await Quote.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!quote) { res.status(404).json({ error: 'Quote not found.' }); return; }
    res.json({ success: true, quote });
  } catch (err) {
    logger.error('[Quote] Status update failed.', err);
    res.status(500).json({ error: 'Server error.' });
  }
}

// ── DELETE /api/quote/:id ─────────────────────────────────────────────────────

export async function deleteQuote(req: Request, res: Response): Promise<void> {
  try {
    await Quote.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    logger.error('[Quote] Delete failed.', err);
    res.status(500).json({ error: 'Server error.' });
  }
}
