import { Router } from 'express';
import { blogAuth } from '../middleware/blogAuth';
import {
  listPosts,
  listAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  uploadImage,
} from '../controllers/blogController';

const router = Router();

// Public routes
router.get('/', listPosts);
router.get('/:slug', getPost);

// Blog admin routes (separate key: x-blog-key / BLOG_SECRET)
router.get('/admin/all', blogAuth, listAllPosts);
router.post('/upload-image', blogAuth, uploadImage);
router.post('/', blogAuth, createPost);
router.put('/:id', blogAuth, updatePost);
router.delete('/:id', blogAuth, deletePost);

export default router;
