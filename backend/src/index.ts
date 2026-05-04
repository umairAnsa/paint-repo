import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';

import { connectDB } from './db';
import { globalLimiter } from './middleware/rateLimiter';
import leadRouter from './routes/lead';
import { logger } from './lib/logger';
import { logTwilioConfig } from './services/twilioService';

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────────────────────────

app.set('trust proxy', 1); // required for rate-limit to read real IP behind proxies

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(express.json({ limit: '16kb' }));
app.use(globalLimiter);
app.use('/static', express.static(path.join(__dirname, '..', 'public')));

// ── Routes ──────────────────────────────────────────────────────────────────────

app.use('/api/lead', leadRouter);

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    server: 'Norm Painting Backend',
    time: new Date().toISOString(),
  });
});

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// ── Start ───────────────────────────────────────────────────────────────────────

async function start() {
  try {
    await connectDB();
    logTwilioConfig(); // prints env var status on every startup
    app.listen(PORT, () => {
      logger.info(`Norm Painting backend running on http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error('Failed to start server.', err);
    process.exit(1);
  }
}

start();
