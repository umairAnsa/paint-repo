import { Router } from 'express';
import { createLead, getLeads } from '../controllers/leadController';
import { leadLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/', leadLimiter, createLead);
router.get('/',  getLeads);

export default router;
