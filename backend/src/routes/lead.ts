import { Router, Request, Response } from "express";
import nodemailer from "nodemailer";
import { connectDB } from "../db";
import Lead from "../models/Lead";

const router = Router();

// ── helpers ────────────────────────────────────────────────────────────────────

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendAdminEmail(data: {
  name: string;
  email: string;
  phone: string;
  description: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Norm Painting Leads" <${process.env.EMAIL}>`,
    to: process.env.EMAIL,
    subject: "New Paint Service Lead",
    html: `
      <h2 style="color:#B64A2A;">New Lead Received</h2>
      <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:500px;">
        <tr><td><strong>Name</strong></td><td>${data.name}</td></tr>
        <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${data.phone || "—"}</td></tr>
        <tr><td><strong>Description</strong></td><td>${data.description}</td></tr>
      </table>
    `,
  });
}

async function sendWhatsAppNotification(data: {
  name: string;
  email: string;
  phone: string;
  description: string;
}) {
  const adminPhone = process.env.ADMIN_PHONE;
  if (!adminPhone) return;

  const message = `New Lead Received:\nName: ${data.name}\nPhone: ${data.phone || "—"}\nEmail: ${data.email}\nDescription: ${data.description}`;

  if (process.env.TWILIO_SID && process.env.TWILIO_AUTH) {
    const twilio = (await import("twilio")).default;
    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
    await client.messages.create({
      from: "whatsapp:+14155238886", // Replace with your approved Twilio number
      to: `whatsapp:${adminPhone}`,
      body: message,
    });
    return;
  }

  const waLink =
    "https://wa.me/" +
    adminPhone.replace(/\D/g, "") +
    "?text=" +
    encodeURIComponent(message);
  console.log("[WhatsApp fallback link]", waLink);
}

// ── POST /api/lead ─────────────────────────────────────────────────────────────

router.post("/", async (req: Request, res: Response) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim();
    const phone = String(req.body.phone || "").trim();
    const description = String(req.body.description || "").trim();

    if (!name) return void res.status(400).json({ error: "Name is required." });
    if (!email)
      return void res.status(400).json({ error: "Email is required." });
    if (!isValidEmail(email))
      return void res.status(400).json({ error: "Invalid email address." });
    if (!description)
      return void res.status(400).json({ error: "Description is required." });

    await connectDB();
    const lead = await Lead.create({ name, email, phone, description });

    sendAdminEmail({ name, email, phone, description }).catch((err) =>
      console.error("[Email error]", err),
    );

    sendWhatsAppNotification({ name, email, phone, description }).catch((err) =>
      console.error("[WhatsApp error]", err),
    );

    res
      .status(201)
      .json({ success: true, id: (lead._id as object).toString() });
  } catch (err) {
    console.error("[POST /api/lead]", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

// ── GET /api/lead (admin — fetch all leads) ────────────────────────────────────

router.get("/", async (_req: Request, res: Response) => {
  try {
    await connectDB();
    const leads = await Lead.find({}).sort({ createdAt: -1 }).lean();
    res.status(200).json({ success: true, leads });
  } catch (err) {
    console.error("[GET /api/lead]", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

export default router;
