import { Request, Response, NextFunction } from 'express';

export function blogAuth(req: Request, res: Response, next: NextFunction): void {
  const key    = req.headers['x-blog-key'] as string;
  const secret = process.env.BLOG_SECRET;

  if (!secret || key !== secret) {
    res.status(401).json({ error: 'Unauthorized.' });
    return;
  }
  next();
}
