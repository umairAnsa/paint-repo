import { Request, Response, NextFunction } from 'express';

export function adminAuth(req: Request, res: Response, next: NextFunction): void {
  const key    = req.headers['x-admin-key'] as string;
  const secret = process.env.ADMIN_SECRET;

  if (!secret || key !== secret) {
    res.status(401).json({ error: 'Unauthorized.' });
    return;
  }
  next();
}
