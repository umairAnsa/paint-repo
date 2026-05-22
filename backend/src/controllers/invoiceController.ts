import { Request, Response } from 'express';
import Invoice from '../models/Invoice';
import Lead from '../models/Lead';
import { generateInvoicePDF } from '../services/pdfService';
import { logger } from '../lib/logger';
import { Resend } from 'resend';

// ── Helpers ───────────────────────────────────────────────────────────────────

async function nextInvoiceNumber(): Promise<string> {
  const count = await Invoice.countDocuments();
  const year  = new Date().getFullYear();
  return `INV-${year}-${String(count + 1).padStart(4, '0')}`;
}

function dueDate(days = 14): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

// ── GET /api/invoice ──────────────────────────────────────────────────────────

export async function listInvoices(_req: Request, res: Response): Promise<void> {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, invoices });
  } catch (err) {
    logger.error('[Invoice] List failed.', err);
    res.status(500).json({ error: 'Server error.' });
  }
}

// ── GET /api/invoice/leads ────────────────────────────────────────────────────

export async function listLeads(_req: Request, res: Response): Promise<void> {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, leads });
  } catch (err) {
    logger.error('[Invoice] Leads fetch failed.', err);
    res.status(500).json({ error: 'Server error.' });
  }
}

// ── POST /api/invoice ─────────────────────────────────────────────────────────

export async function createInvoice(req: Request, res: Response): Promise<void> {
  const { leadId, name, email, phone, service, price } = req.body;

  if (!name || !email || !service || !price) {
    res.status(400).json({ error: 'name, email, service and price are required.' });
    return;
  }

  try {
    const invoiceNumber = await nextInvoiceNumber();
    const invoice = await Invoice.create({
      invoiceNumber,
      leadId: leadId || undefined,
      name, email, phone, service,
      price: Number(price),
      date: new Date(),
      dueDate: dueDate(14),
    });

    logger.info('[Invoice] Created.', { invoiceNumber, name });
    res.status(201).json({ success: true, invoice });
  } catch (err) {
    logger.error('[Invoice] Create failed.', err);
    res.status(500).json({ error: 'Server error.' });
  }
}

// ── GET /api/invoice/:id/pdf ──────────────────────────────────────────────────

export async function downloadPdf(req: Request, res: Response): Promise<void> {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) { res.status(404).json({ error: 'Invoice not found.' }); return; }

    const pdf = await generateInvoicePDF(invoice);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${invoice.invoiceNumber}.pdf"`);
    res.send(pdf);
  } catch (err) {
    logger.error('[Invoice] PDF generation failed.', err);
    res.status(500).json({ error: 'PDF generation failed.' });
  }
}

// ── POST /api/invoice/:id/send ────────────────────────────────────────────────

export async function sendInvoice(req: Request, res: Response): Promise<void> {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) { res.status(404).json({ error: 'Invoice not found.' }); return; }

    const pdf = await generateInvoicePDF(invoice);
    const errors: string[] = [];

    // Email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const from   = process.env.RESEND_FROM || 'Norm Painting <onboarding@resend.dev>';
        const price  = `$${invoice.price.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`;

        const { error } = await resend.emails.send({
          from,
          to:      [invoice.email],
          replyTo: process.env.EMAIL_TO || 'info@normpainting.com',
          subject: `Invoice ${invoice.invoiceNumber} — Norm Painting`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
              <div style="background:#0c1f3d;padding:28px 32px;border-bottom:4px solid #f97316;">
                <img src="https://normpainting.com/logo.png" alt="Norm Painting" height="48" style="display:block;margin-bottom:12px;" />
                <h2 style="color:#ffffff;margin:0;font-size:20px;">Invoice from Norm Painting</h2>
              </div>
              <div style="padding:32px;background:#ffffff;border:1px solid #e5e7eb;">
                <p style="color:#374151;">Hi <strong>${invoice.name}</strong>,</p>
                <p style="color:#374151;">Please find your invoice attached. Here's a summary:</p>
                <table style="width:100%;border-collapse:collapse;margin:20px 0;">
                  <tr style="background:#f8fafc;">
                    <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;">Invoice Number</td>
                    <td style="padding:12px 16px;font-size:14px;color:#111827;font-weight:600;">${invoice.invoiceNumber}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;border-top:1px solid #e5e7eb;">Service</td>
                    <td style="padding:12px 16px;font-size:14px;color:#111827;border-top:1px solid #e5e7eb;">${invoice.service}</td>
                  </tr>
                  <tr style="background:#f8fafc;">
                    <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;border-top:1px solid #e5e7eb;">Amount Due</td>
                    <td style="padding:12px 16px;font-size:16px;color:#f97316;font-weight:800;border-top:1px solid #e5e7eb;">${price}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;border-top:1px solid #e5e7eb;">Due Date</td>
                    <td style="padding:12px 16px;font-size:14px;color:#111827;border-top:1px solid #e5e7eb;">${new Date(invoice.dueDate).toLocaleDateString('en-AU', { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                  </tr>
                </table>
                <p style="color:#374151;">If you have any questions, reply to this email or call <strong>0406 342 731</strong>.</p>
                <a href="tel:0406342731" style="display:inline-block;background:#f97316;color:#ffffff;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:100px;font-size:13px;margin-top:8px;">Call Us</a>
              </div>
              <div style="padding:16px 32px;background:#f8fafc;border:1px solid #e5e7eb;border-top:none;text-align:center;">
                <p style="margin:0;font-size:12px;color:#9ca3af;">Norm Painting · Melbourne VIC, Australia · ABN 84 673 345 054</p>
              </div>
            </div>
          `,
          attachments: [{ filename: `${invoice.invoiceNumber}.pdf`, content: pdf.toString('base64') }],
        });

        if (error) throw new Error(error.message);
        logger.info('[Invoice] Email sent via Resend.', { to: invoice.email });
      } catch (err) {
        logger.error('[Invoice] Email failed.', err);
        errors.push('Email failed.');
      }
    }

    // Update status to Sent
    invoice.status = 'Sent';
    await invoice.save();

    res.json({ success: true, errors });
  } catch (err) {
    logger.error('[Invoice] Send failed.', err);
    res.status(500).json({ error: 'Server error.' });
  }
}

// ── PATCH /api/invoice/:id/status ────────────────────────────────────────────

export async function updateStatus(req: Request, res: Response): Promise<void> {
  const { status } = req.body;
  if (!['Pending', 'Sent', 'Paid'].includes(status)) {
    res.status(400).json({ error: 'Invalid status.' });
    return;
  }
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!invoice) { res.status(404).json({ error: 'Invoice not found.' }); return; }
    res.json({ success: true, invoice });
  } catch (err) {
    logger.error('[Invoice] Status update failed.', err);
    res.status(500).json({ error: 'Server error.' });
  }
}

// ── DELETE /api/invoice/:id ───────────────────────────────────────────────────

export async function deleteInvoice(req: Request, res: Response): Promise<void> {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    logger.error('[Invoice] Delete failed.', err);
    res.status(500).json({ error: 'Server error.' });
  }
}
