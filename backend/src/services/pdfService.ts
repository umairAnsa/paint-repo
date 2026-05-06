import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';
import type { IInvoice } from '../models/Invoice';

const NAVY   = '#0c1f3d';
const ORANGE = '#f97316';
const GRAY   = '#6b7280';
const LIGHT  = '#f8fafc';
const DARK   = '#111827';
const WHITE  = '#ffffff';
const BORDER = '#e5e7eb';

const LOGO_PATH = path.join(__dirname, '..', '..', 'public', 'logo.png');

function fmtCurrency(n: number) {
  return `$${n.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function generateInvoicePDF(invoice: IInvoice): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc    = new PDFDocument({ margin: 0, size: 'A4' });
    const chunks: Buffer[] = [];

    doc.on('data',  (c: Buffer) => chunks.push(c));
    doc.on('end',   () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const W  = 595.28;   // A4 width pts
    const H  = 841.89;   // A4 height pts
    const ML = 50;       // left margin
    const MR = 50;       // right margin
    const CW = W - ML - MR; // content width

    // ─────────────────────────────────────────────────────────────────────────
    // 1. Navy top bar
    // ─────────────────────────────────────────────────────────────────────────
    doc.rect(0, 0, W, 90).fill(NAVY);

    // Logo (top-left inside navy bar)
    const logoExists = fs.existsSync(LOGO_PATH);
    if (logoExists) {
      doc.image(LOGO_PATH, ML, 18, { height: 52, fit: [160, 52] });
    } else {
      doc.fontSize(18).font('Helvetica-Bold').fillColor(WHITE)
         .text('NORM PAINTING', ML, 33);
    }

    // "INVOICE" label (top-right)
    doc.fontSize(26).font('Helvetica-Bold').fillColor(WHITE)
       .text('INVOICE', 0, 24, { align: 'right', width: W - MR });

    doc.fontSize(11).font('Helvetica').fillColor(ORANGE)
       .text(invoice.invoiceNumber, 0, 56, { align: 'right', width: W - MR });

    // ─────────────────────────────────────────────────────────────────────────
    // 2. Orange accent line
    // ─────────────────────────────────────────────────────────────────────────
    doc.rect(0, 90, W, 3).fill(ORANGE);

    // ─────────────────────────────────────────────────────────────────────────
    // 3. Company info (below bar, left)
    // ─────────────────────────────────────────────────────────────────────────
    let y = 113;
    doc.fontSize(9).font('Helvetica-Bold').fillColor(DARK).text('Norm Painting Pty Ltd', ML, y);
    doc.fontSize(8).font('Helvetica').fillColor(GRAY);
    doc.text('Geelong & Melbourne VIC', ML, y + 13);
    doc.text('ABN: 52 704 401 415', ML, y + 25);
    doc.text('0406 342 731  ·  normpainting.com', ML, y + 37);

    // ─────────────────────────────────────────────────────────────────────────
    // 4. Invoice meta (right column)
    // ─────────────────────────────────────────────────────────────────────────
    const rightX = W - MR - 200;

    function metaRow(label: string, value: string, rowY: number) {
      doc.fontSize(8).font('Helvetica-Bold').fillColor(GRAY).text(label, rightX, rowY, { width: 90 });
      doc.fontSize(8).font('Helvetica').fillColor(DARK).text(value, rightX + 95, rowY, { width: 105, align: 'right' });
    }

    metaRow('INVOICE DATE:', fmtDate(invoice.date),    y);
    metaRow('DUE DATE:',     fmtDate(invoice.dueDate), y + 14);

    // Balance Due box
    doc.rect(rightX, y + 32, 200, 36).fill(NAVY).stroke();
    doc.fontSize(8).font('Helvetica').fillColor('rgba(255,255,255,0.55)')
       .text('BALANCE DUE', rightX + 10, y + 40);
    doc.fontSize(14).font('Helvetica-Bold').fillColor(WHITE)
       .text(fmtCurrency(invoice.price), rightX + 10, y + 52, { width: 180, align: 'right' });

    // ─────────────────────────────────────────────────────────────────────────
    // 5. Divider
    // ─────────────────────────────────────────────────────────────────────────
    y = 178;
    doc.moveTo(ML, y).lineTo(W - MR, y).strokeColor(BORDER).lineWidth(0.8).stroke();

    // ─────────────────────────────────────────────────────────────────────────
    // 6. Bill To
    // ─────────────────────────────────────────────────────────────────────────
    y = 192;
    doc.fontSize(8).font('Helvetica-Bold').fillColor(GRAY).text('BILL TO', ML, y);
    y += 13;
    doc.fontSize(11).font('Helvetica-Bold').fillColor(DARK).text(invoice.name, ML, y);
    y += 15;
    doc.fontSize(9).font('Helvetica').fillColor(GRAY).text(invoice.email, ML, y);
    y += 13;
    if (invoice.phone) { doc.text(invoice.phone, ML, y); y += 13; }

    // ─────────────────────────────────────────────────────────────────────────
    // 7. "For Services Rendered" heading
    // ─────────────────────────────────────────────────────────────────────────
    y += 18;
    doc.fontSize(10).font('Helvetica-Bold').fillColor(DARK).text('For Services Rendered', ML, y);
    y += 18;

    // ─────────────────────────────────────────────────────────────────────────
    // 8. Table header
    // ─────────────────────────────────────────────────────────────────────────
    const COL = {
      service: { x: ML,       w: 180 },
      desc:    { x: ML + 185, w: 140 },
      qty:     { x: ML + 330, w:  50 },
      unit:    { x: ML + 385, w:  70 },
      total:   { x: ML + 458, w:  87 },
    };

    const TH = 24;
    doc.rect(ML, y, CW, TH).fill(NAVY);

    function thCell(text: string, col: { x: number; w: number }, align: 'left'|'right' = 'left') {
      doc.fontSize(7.5).font('Helvetica-Bold').fillColor(WHITE)
         .text(text, col.x + 6, y + 8, { width: col.w - 8, align });
    }

    thCell('PRODUCT / SERVICE', COL.service);
    thCell('DESCRIPTION',       COL.desc);
    thCell('QTY',               COL.qty,   'right');
    thCell('UNIT PRICE',        COL.unit,  'right');
    thCell('TOTAL',             COL.total, 'right');

    // ─────────────────────────────────────────────────────────────────────────
    // 9. Table row
    // ─────────────────────────────────────────────────────────────────────────
    y += TH;
    const ROW_H = 38;

    doc.rect(ML, y, CW, ROW_H).fill(WHITE).strokeColor(BORDER).lineWidth(0.5).stroke();

    // Vertical column dividers
    [COL.desc.x, COL.qty.x, COL.unit.x, COL.total.x].forEach(cx => {
      doc.moveTo(cx, y).lineTo(cx, y + ROW_H).strokeColor(BORDER).lineWidth(0.5).stroke();
    });

    const midRow = y + 14;
    doc.fontSize(9).font('Helvetica-Bold').fillColor(DARK)
       .text(invoice.service, COL.service.x + 6, midRow, { width: COL.service.w - 8 });
    doc.fontSize(8).font('Helvetica').fillColor(GRAY)
       .text('Professional painting services', COL.desc.x + 6, midRow, { width: COL.desc.w - 8 });
    doc.fontSize(9).font('Helvetica').fillColor(DARK)
       .text('1', COL.qty.x + 6, midRow, { width: COL.qty.w - 8, align: 'right' });
    doc.text(fmtCurrency(invoice.price), COL.unit.x + 6, midRow, { width: COL.unit.w - 8, align: 'right' });
    doc.font('Helvetica-Bold')
       .text(fmtCurrency(invoice.price), COL.total.x + 6, midRow, { width: COL.total.w - 8, align: 'right' });

    // ─────────────────────────────────────────────────────────────────────────
    // 10. Subtotal / Total rows (right-aligned)
    // ─────────────────────────────────────────────────────────────────────────
    y += ROW_H + 16;

    const totalsX  = W - MR - 200;
    const totalsW  = 200;
    const gst      = +(invoice.price * 0.1).toFixed(2);
    const subtotal = +(invoice.price - gst).toFixed(2);

    function totalRow(label: string, value: string, rowY: number, bold = false, highlight = false) {
      if (highlight) {
        doc.rect(totalsX, rowY - 4, totalsW, 26).fill(NAVY);
        doc.fontSize(10).font('Helvetica-Bold').fillColor(WHITE)
           .text(label, totalsX + 8, rowY + 2, { width: 100 });
        doc.fontSize(10).font('Helvetica-Bold').fillColor(ORANGE)
           .text(value, totalsX + 8, rowY + 2, { width: totalsW - 16, align: 'right' });
      } else {
        doc.fontSize(8.5)
           .font(bold ? 'Helvetica-Bold' : 'Helvetica')
           .fillColor(GRAY)
           .text(label, totalsX + 8, rowY, { width: 100 });
        doc.fontSize(8.5).font(bold ? 'Helvetica-Bold' : 'Helvetica').fillColor(DARK)
           .text(value, totalsX + 8, rowY, { width: totalsW - 16, align: 'right' });
      }
    }

    totalRow('Subtotal',          fmtCurrency(subtotal),       y);      y += 18;
    totalRow('GST (10%)',         fmtCurrency(gst),            y);      y += 18;
    doc.moveTo(totalsX, y).lineTo(totalsX + totalsW, y).strokeColor(BORDER).lineWidth(0.5).stroke();
    y += 6;
    totalRow('Total',             fmtCurrency(invoice.price),  y, false, true); y += 34;

    // ─────────────────────────────────────────────────────────────────────────
    // 11. Payment details
    // ─────────────────────────────────────────────────────────────────────────
    y += 10;
    doc.rect(ML, y, CW, 56).fill(LIGHT).strokeColor(BORDER).lineWidth(0.5).stroke();
    doc.fontSize(8).font('Helvetica-Bold').fillColor(DARK).text('PAYMENT DETAILS', ML + 12, y + 10);
    doc.fontSize(8).font('Helvetica').fillColor(GRAY)
       .text('Bank Transfer  ·  BSB: 000-000  ·  Account: 000 000 000', ML + 12, y + 23);
    doc.text(`Reference: ${invoice.invoiceNumber}  ·  Due: ${fmtDate(invoice.dueDate)}`, ML + 12, y + 36);

    // ─────────────────────────────────────────────────────────────────────────
    // 12. Footer
    // ─────────────────────────────────────────────────────────────────────────
    const footerY = H - 80;
    doc.rect(0, footerY, W, 80).fill(NAVY);
    doc.moveTo(0, footerY).lineTo(W, footerY).strokeColor(ORANGE).lineWidth(3).stroke();

    doc.fontSize(11).font('Helvetica-Bold').fillColor(WHITE)
       .text('Thanks for your business!', 0, footerY + 18, { align: 'center', width: W });
    doc.fontSize(8).font('Helvetica').fillColor('rgba(255,255,255,0.50)')
       .text('Questions? Call 0406 342 731 or email us at normpainting.com', 0, footerY + 36, { align: 'center', width: W });

    if (logoExists) {
      doc.image(LOGO_PATH, ML, footerY + 12, { height: 36, fit: [100, 36] });
    }

    doc.end();
  });
}
