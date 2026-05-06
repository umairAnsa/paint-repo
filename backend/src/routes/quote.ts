import { Router } from 'express';
import { adminAuth } from '../middleware/adminAuth';
import {
  listQuotes,
  listLeads,
  createQuote,
  downloadPdf,
  sendQuote,
  updateStatus,
  deleteQuote,
} from '../controllers/quoteController';

const router = Router();

router.use(adminAuth);

router.get('/',             listQuotes);
router.get('/leads',        listLeads);
router.post('/',            createQuote);
router.get('/:id/pdf',      downloadPdf);
router.post('/:id/send',    sendQuote);
router.patch('/:id/status', updateStatus);
router.delete('/:id',       deleteQuote);

export default router;
