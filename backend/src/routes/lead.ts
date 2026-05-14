import { Router, json } from 'express';
import { createLead, createLeadWithPhotos, getLeads } from '../controllers/leadController';
import { leadLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/',             leadLimiter, createLead);
router.post('/with-photos',  json({ limit: '25mb' }), leadLimiter, createLeadWithPhotos);
router.get('/',              getLeads);

export default router;
