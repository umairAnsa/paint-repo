import { Router } from 'express';
import { adminAuth } from '../middleware/adminAuth';
import {
  listInvoices,
  listLeads,
  createInvoice,
  downloadPdf,
  sendInvoice,
  updateStatus,
  deleteInvoice,
} from '../controllers/invoiceController';

const router = Router();

router.use(adminAuth);

router.get('/',              listInvoices);
router.get('/leads',         listLeads);
router.post('/',             createInvoice);
router.get('/:id/pdf',       downloadPdf);
router.post('/:id/send',     sendInvoice);
router.patch('/:id/status',  updateStatus);
router.delete('/:id',        deleteInvoice);

export default router;
