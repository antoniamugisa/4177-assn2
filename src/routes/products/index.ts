import { Router } from 'express';
import {
  createProduct,
  getAllProducts
} from './controller';
import { protect, authorize } from '../../middleware/auth';

const router = Router();

router.post('/', protect, authorize('vendor', 'admin'), createProduct);
router.get('/', protect, getAllProducts);

export default router;