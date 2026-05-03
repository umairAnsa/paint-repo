import "dotenv/config";
import express from "express";
import cors from "cors";

import leadRouter from "./routes/lead";

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ─────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────────────────────────
app.use("/api/lead", leadRouter);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", server: "Avine Backend", time: new Date() });
});

// ── Start ──────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Avine backend running on http://localhost:${PORT}`);
});
