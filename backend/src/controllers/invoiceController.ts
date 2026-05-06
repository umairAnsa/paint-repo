import { Request, Response } from 'express';
import Invoice from '../models/Invoice';
import Lead from '../models/Lead';
import { generateInvoicePDF } from '../services/pdfService';
import { logger } from '../lib/logger';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

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

    // Email
    if (process.env.EMAIL && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com', port: 465, secure: true,
          auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS },
        });

        await transporter.sendMail({
          from:    `"Norm Painting" <${process.env.EMAIL}>`,
          to:      invoice.email,
          replyTo: process.env.EMAIL,
          subject: `Invoice ${invoice.invoiceNumber} — Norm Painting`,
          html: `
            <p>Hi ${invoice.name},</p>
            <p>Please find attached your invoice <strong>${invoice.invoiceNumber}</strong> for <strong>${invoice.service}</strong>.</p>
            <p>Amount due: <strong>$${invoice.price.toLocaleString('en-AU', { minimumFractionDigits: 2 })}</strong></p>
            <p>If you have any questions, reply to this email or call <strong>0406 342 731</strong>.</p>
            <p>Thank you for choosing Norm Painting!</p>
          `,
          attachments: [{ filename: `${invoice.invoiceNumber}.pdf`, content: pdf }],
        });
        logger.info('[Invoice] Email sent.', { to: invoice.email });
      } catch (err) {
        logger.error('[Invoice] Email failed.', err);
        errors.push('Email failed.');
      }
    }

    // WhatsApp
    if (process.env.TWILIO_SID && process.env.TWILIO_AUTH && process.env.TWILIO_WHATSAPP_FROM && invoice.phone) {
      try {
        const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
        const to = invoice.phone.startsWith('+') ? invoice.phone : `+${invoice.phone}`;
        await client.messages.create({
          from: process.env.TWILIO_WHATSAPP_FROM,
          to:   `whatsapp:${to}`,
          body: `Hi ${invoice.name}! 🎨\n\nYour invoice *${invoice.invoiceNumber}* for *${invoice.service}* has been sent.\n\nAmount due: *$${invoice.price.toLocaleString('en-AU', { minimumFractionDigits: 2 })}*\n\nThank you for choosing Norm Painting! — 0406 342 731`,
        });
        logger.info('[Invoice] WhatsApp sent.', { to });
      } catch (err) {
        logger.error('[Invoice] WhatsApp failed.', err);
        errors.push('WhatsApp failed.');
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
