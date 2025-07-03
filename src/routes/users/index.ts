import { Router } from 'express';
import { createUser, getUserById, updateUser } from './controller';
import { protect } from '../../middleware/auth';

const router = Router();

router.post('/', createUser);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);

export default router;