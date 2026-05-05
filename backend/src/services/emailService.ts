import nodemailer from 'nodemailer';
import { logger } from '../lib/logger';
import type { LeadInput } from '../validation/leadSchema';

function buildEmailHtml(data: LeadInput): string {
  const phoneRow = data.phone
    ? `<a href="tel:${data.phone}" style="color:#1e3a8a;text-decoration:none;font-weight:600;">${data.phone}</a>`
    : '<span style="color:#9ca3af;">Not provided</span>';

  const callBtn = data.phone
    ? `<a href="tel:${data.phone}" style="display:inline-block;background:#061524;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:100px;">Call Now</a>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>New Lead – Norm Painting</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

          <!-- Header: white background so the dark logo is naturally visible -->
          <tr>
            <td style="background:#ffffff;border-radius:16px 16px 0 0;padding:32px 40px 24px;text-align:center;border-bottom:4px solid #f97316;">
              <img
                src="${process.env.BACKEND_URL || 'http://localhost:5000'}/static/logo.png"
                alt="Norm Painting"
                width="150"
                style="height:auto;display:block;margin:0 auto;"
              />
              <p style="margin:12px 0 0;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.14em;font-weight:700;">New Lead Notification</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px;">

              <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;">
                A new enquiry was submitted through your website. Details are below.
              </p>

              <!-- Details table -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;border-collapse:separate;">

                <tr style="background:#f8fafc;">
                  <td width="28%" style="padding:14px 18px;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.09em;border-bottom:1px solid #e5e7eb;">Name</td>
                  <td style="padding:14px 18px;font-size:14px;color:#111827;font-weight:600;border-bottom:1px solid #e5e7eb;">${data.name}</td>
                </tr>

                <tr>
                  <td width="28%" style="padding:14px 18px;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.09em;border-bottom:1px solid #e5e7eb;">Email</td>
                  <td style="padding:14px 18px;font-size:14px;border-bottom:1px solid #e5e7eb;">
                    <a href="mailto:${data.email}" style="color:#1e3a8a;text-decoration:none;font-weight:600;">${data.email}</a>
                  </td>
                </tr>

                <tr style="background:#f8fafc;">
                  <td width="28%" style="padding:14px 18px;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.09em;border-bottom:1px solid #e5e7eb;">Phone</td>
                  <td style="padding:14px 18px;font-size:14px;border-bottom:1px solid #e5e7eb;">${phoneRow}</td>
                </tr>

                <tr>
                  <td width="28%" style="padding:14px 18px;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.09em;vertical-align:top;">Message</td>
                  <td style="padding:14px 18px;font-size:14px;color:#374151;line-height:1.7;">
                    ${data.description.replace(/\n/g, '<br />')}
                  </td>
                </tr>

              </table>

              <!-- CTA buttons -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                <tr>
                  <td>
                    <a href="mailto:${data.email}?subject=Re%3A%20Your%20Painting%20Enquiry"
                      style="display:inline-block;background:#f97316;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:100px;margin-right:10px;">
                      Reply to ${data.name.split(' ')[0]}
                    </a>
                    ${callBtn}
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e5e7eb;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">Norm Painting · Geelong &amp; Melbourne VIC · ABN 52 704 401 415</p>
              <p style="margin:6px 0 0;font-size:11px;color:#d1d5db;">Automated notification from your website contact form.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function createTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
}

export async function sendLeadEmail(data: LeadInput): Promise<void> {
  if (!process.env.EMAIL || !process.env.EMAIL_PASS) {
    logger.warn('[Email] EMAIL or EMAIL_PASS not set — skipping email notification.');
    return;
  }

  const transporter = createTransporter();
  const toAddress = process.env.EMAIL_TO || process.env.EMAIL;

  await transporter.sendMail({
    from: `"Norm Painting Website" <${process.env.EMAIL}>`,
    to: toAddress,
    replyTo: data.email,
    subject: `New Lead: ${data.name} — Norm Painting`,
    html: buildEmailHtml(data),
  });

  logger.info('[Email] Lead notification sent.', { to: toAddress, from: data.name });
}
