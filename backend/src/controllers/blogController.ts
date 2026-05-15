import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import BlogPost from '../models/BlogPost';
import { logger } from '../lib/logger';

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  let slug = base;
  let n = 1;
  while (true) {
    const query = excludeId
      ? { slug, _id: { $ne: excludeId } }
      : { slug };
    const exists = await BlogPost.exists(query);
    if (!exists) return slug;
    slug = `${base}-${n++}`;
  }
}

// ── GET /api/blog (public) ──────────────────────────────────────────────────
export async function listPosts(_req: Request, res: Response): Promise<void> {
  try {
    const posts = await BlogPost.find({ published: true })
      .sort({ createdAt: -1 })
      .select('-content')
      .lean();
    res.json({ posts });
  } catch (err) {
    logger.error('[Blog] list failed', err);
    res.status(500).json({ error: 'Server error.' });
  }
}

// ── GET /api/blog/admin/all (admin) ─────────────────────────────────────────
export async function listAllPosts(_req: Request, res: Response): Promise<void> {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 }).lean();
    res.json({ posts });
  } catch (err) {
    logger.error('[Blog] admin list failed', err);
    res.status(500).json({ error: 'Server error.' });
  }
}

// ── GET /api/blog/:slug (public) ────────────────────────────────────────────
export async function getPost(req: Request, res: Response): Promise<void> {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true }).lean();
    if (!post) { res.status(404).json({ error: 'Not found.' }); return; }
    res.json({ post });
  } catch (err) {
    logger.error('[Blog] get failed', err);
    res.status(500).json({ error: 'Server error.' });
  }
}

// ── POST /api/blog/upload-image (admin) ─────────────────────────────────────
export async function uploadImage(req: Request, res: Response): Promise<void> {
  try {
    const { image, filename } = req.body as { image: string; filename: string };
    if (!image || !image.includes(',')) {
      res.status(400).json({ error: 'No image data.' });
      return;
    }

    const b64  = image.split(',')[1];
    const ext  = filename?.split('.').pop()?.toLowerCase() || 'jpg';
    const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const dir  = path.join(__dirname, '..', '..', 'public', 'blog');

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(path.join(dir, name), Buffer.from(b64, 'base64'));

    const base = process.env.BACKEND_URL || 'https://norm-painting-backend.onrender.com';
    res.json({ url: `${base}/static/blog/${name}` });
  } catch (err) {
    logger.error('[Blog] image upload failed', err);
    res.status(500).json({ error: 'Upload failed.' });
  }
}

// ── POST /api/blog (admin) ──────────────────────────────────────────────────
export async function createPost(req: Request, res: Response): Promise<void> {
  try {
    const { title, excerpt, date, image, content, published } = req.body;
    if (!title || !excerpt || !date) {
      res.status(400).json({ error: 'title, excerpt, and date are required.' });
      return;
    }
    const slug = await uniqueSlug(toSlug(title));
    const post = await BlogPost.create({ title, slug, excerpt, date, image, content, published });
    res.status(201).json({ post });
  } catch (err) {
    logger.error('[Blog] create failed', err);
    res.status(500).json({ error: 'Server error.' });
  }
}

// ── PUT /api/blog/:id (admin) ────────────────────────────────────────────────
export async function updatePost(req: Request, res: Response): Promise<void> {
  try {
    const { title, excerpt, date, image, content, published } = req.body;
    const existing = await BlogPost.findById(req.params.id);
    if (!existing) { res.status(404).json({ error: 'Not found.' }); return; }

    const newSlug = title !== existing.title
      ? await uniqueSlug(toSlug(title), req.params.id)
      : existing.slug;

    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { title, slug: newSlug, excerpt, date, image, content, published },
      { new: true },
    );
    res.json({ post });
  } catch (err) {
    logger.error('[Blog] update failed', err);
    res.status(500).json({ error: 'Server error.' });
  }
}

// ── DELETE /api/blog/:id (admin) ─────────────────────────────────────────────
export async function deletePost(req: Request, res: Response): Promise<void> {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    logger.error('[Blog] delete failed', err);
    res.status(500).json({ error: 'Server error.' });
  }
}
