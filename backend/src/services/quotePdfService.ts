import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';
import type { IQuote } from '../models/Quote';

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

export function generateQuotePDF(quote: IQuote): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc    = new PDFDocument({ margin: 0, size: 'A4' });
    const chunks: Buffer[] = [];

    doc.on('data',  (c: Buffer) => chunks.push(c));
    doc.on('end',   () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const W  = 595.28;
    const H  = 841.89;
    const ML = 50;
    const MR = 50;
    const CW = W - ML - MR;

    // ── 1. Navy header ────────────────────────────────────────────────────────
    doc.rect(0, 0, W, 90).fill(NAVY);

    const logoExists = fs.existsSync(LOGO_PATH);
    if (logoExists) {
      doc.image(LOGO_PATH, ML, 18, { height: 52, fit: [160, 52] });
    } else {
      doc.fontSize(18).font('Helvetica-Bold').fillColor(WHITE).text('NORM PAINTING', ML, 33);
    }

    doc.fontSize(26).font('Helvetica-Bold').fillColor(WHITE)
       .text('QUOTE', 0, 24, { align: 'right', width: W - MR });
    doc.fontSize(11).font('Helvetica').fillColor(ORANGE)
       .text(quote.quoteNumber, 0, 56, { align: 'right', width: W - MR });

    // ── 2. Orange accent ──────────────────────────────────────────────────────
    doc.rect(0, 90, W, 3).fill(ORANGE);

    // ── 3. Company info ───────────────────────────────────────────────────────
    let y = 113;
    doc.fontSize(9).font('Helvetica-Bold').fillColor(DARK).text('Norm Painting Pty Ltd', ML, y);
    doc.fontSize(8).font('Helvetica').fillColor(GRAY);
    doc.text('Geelong & Melbourne VIC', ML, y + 13);
    doc.text('ABN: 52 704 401 415', ML, y + 25);
    doc.text('0406 342 731  ·  normpainting.com', ML, y + 37);

    // ── 4. Quote meta (right) ─────────────────────────────────────────────────
    const rightX = W - MR - 200;

    function metaRow(label: string, value: string, rowY: number) {
      doc.fontSize(8).font('Helvetica-Bold').fillColor(GRAY).text(label, rightX, rowY, { width: 90 });
      doc.fontSize(8).font('Helvetica').fillColor(DARK).text(value, rightX + 95, rowY, { width: 105, align: 'right' });
    }

    metaRow('QUOTE DATE:',   fmtDate(quote.createdAt), y);
    metaRow('VALID UNTIL:',  fmtDate(quote.validUntil), y + 14);

    // Total box
    doc.rect(rightX, y + 32, 200, 36).fill(NAVY);
    doc.fontSize(8).font('Helvetica').fillColor('rgba(255,255,255,0.55)')
       .text('QUOTE TOTAL', rightX + 10, y + 40);
    doc.fontSize(14).font('Helvetica-Bold').fillColor(WHITE)
       .text(fmtCurrency(quote.price), rightX + 10, y + 52, { width: 180, align: 'right' });

    // ── 5. Divider ────────────────────────────────────────────────────────────
    y = 178;
    doc.moveTo(ML, y).lineTo(W - MR, y).strokeColor(BORDER).lineWidth(0.8).stroke();

    // ── 6. Prepared For ───────────────────────────────────────────────────────
    y = 192;
    doc.fontSize(8).font('Helvetica-Bold').fillColor(GRAY).text('PREPARED FOR', ML, y);
    y += 13;
    doc.fontSize(11).font('Helvetica-Bold').fillColor(DARK).text(quote.name, ML, y);
    y += 15;
    doc.fontSize(9).font('Helvetica').fillColor(GRAY).text(quote.email, ML, y);
    y += 13;
    if (quote.phone) { doc.text(quote.phone, ML, y); y += 13; }

    // ── 7. Section heading ────────────────────────────────────────────────────
    y += 18;
    doc.fontSize(10).font('Helvetica-Bold').fillColor(DARK).text('Scope of Work', ML, y);
    y += 18;

    // ── 8. Table header ───────────────────────────────────────────────────────
    const COL = {
      service: { x: ML,       w: 280 },
      qty:     { x: ML + 285, w:  50 },
      unit:    { x: ML + 340, w:  95 },
      total:   { x: ML + 440, w: 105 },
    };

    const TH = 24;
    doc.rect(ML, y, CW, TH).fill(NAVY);

    function thCell(text: string, col: { x: number; w: number }, align: 'left' | 'right' = 'left') {
      doc.fontSize(7.5).font('Helvetica-Bold').fillColor(WHITE)
         .text(text, col.x + 6, y + 8, { width: col.w - 8, align });
    }
    thCell('SERVICE / DESCRIPTION', COL.service);
    thCell('QTY',   COL.qty,   'right');
    thCell('PRICE', COL.unit,  'right');
    thCell('TOTAL', COL.total, 'right');

    // ── 9. Table row ──────────────────────────────────────────────────────────
    y += TH;
    const ROW_H = 40;
    doc.rect(ML, y, CW, ROW_H).fill(WHITE).strokeColor(BORDER).lineWidth(0.5).stroke();
    [COL.qty.x, COL.unit.x, COL.total.x].forEach(cx =>
      doc.moveTo(cx, y).lineTo(cx, y + ROW_H).strokeColor(BORDER).lineWidth(0.5).stroke()
    );

    const mid = y + 14;
    doc.fontSize(9).font('Helvetica-Bold').fillColor(DARK)
       .text(quote.service, COL.service.x + 6, mid, { width: COL.service.w - 8 });
    doc.fontSize(8).font('Helvetica').fillColor(DARK)
       .text('1',                  COL.qty.x   + 6, mid, { width: COL.qty.w   - 8, align: 'right' });
    doc.text(fmtCurrency(quote.price), COL.unit.x  + 6, mid, { width: COL.unit.w  - 8, align: 'right' });
    doc.font('Helvetica-Bold')
       .text(fmtCurrency(quote.price), COL.total.x + 6, mid, { width: COL.total.w - 8, align: 'right' });

    // ── 10. Total ─────────────────────────────────────────────────────────────
    y += ROW_H + 16;
    const totX = W - MR - 200;

    doc.moveTo(totX, y).lineTo(totX + 200, y).strokeColor(BORDER).lineWidth(0.5).stroke();
    y += 6;
    doc.rect(totX, y, 200, 30).fill(NAVY);
    doc.fontSize(9).font('Helvetica').fillColor('rgba(255,255,255,0.55)')
       .text('TOTAL', totX + 10, y + 8);
    doc.fontSize(13).font('Helvetica-Bold').fillColor(ORANGE)
       .text(fmtCurrency(quote.price), totX + 10, y + 8, { width: 180, align: 'right' });

    // ── 11. Description / Notes ───────────────────────────────────────────────
    if (quote.description) {
      y += 50;
      doc.rect(ML, y, CW, 1).fill(BORDER);
      y += 12;
      doc.fontSize(8).font('Helvetica-Bold').fillColor(GRAY).text('NOTES', ML, y);
      y += 13;
      doc.fontSize(9).font('Helvetica').fillColor(DARK)
         .text(quote.description, ML, y, { width: CW, lineGap: 3 });
      y += doc.heightOfString(quote.description, { width: CW }) + 10;
    } else {
      y += 50;
    }

    // ── 12. Acceptance box ────────────────────────────────────────────────────
    y += 10;
    doc.rect(ML, y, CW, 60).fill(LIGHT).strokeColor(ORANGE).lineWidth(1).stroke();
    doc.rect(ML, y, 4, 60).fill(ORANGE);

    doc.fontSize(9).font('Helvetica-Bold').fillColor(DARK)
       .text('How to Accept This Quote', ML + 16, y + 10);
    doc.fontSize(8.5).font('Helvetica').fillColor(GRAY)
       .text('Reply to this email or call us on 0406 342 731 to accept and schedule your job.', ML + 16, y + 24, { width: CW - 24 });
    doc.fontSize(8).fillColor(GRAY)
       .text(`This quote is valid until ${fmtDate(quote.validUntil)}. Quote reference: ${quote.quoteNumber}`, ML + 16, y + 40, { width: CW - 24 });

    // ── 13. Footer ────────────────────────────────────────────────────────────
    const footerY = H - 80;
    doc.rect(0, footerY, W, 80).fill(NAVY);
    doc.moveTo(0, footerY).lineTo(W, footerY).strokeColor(ORANGE).lineWidth(3).stroke();

    doc.fontSize(11).font('Helvetica-Bold').fillColor(WHITE)
       .text('Thank you for considering Norm Painting!', 0, footerY + 18, { align: 'center', width: W });
    doc.fontSize(8).font('Helvetica').fillColor('rgba(255,255,255,0.50)')
       .text('0406 342 731  ·  normpainting.com  ·  Geelong & Melbourne VIC', 0, footerY + 36, { align: 'center', width: W });

    if (logoExists) {
      doc.image(LOGO_PATH, ML, footerY + 12, { height: 36, fit: [100, 36] });
    }

    doc.end();
  });
}
