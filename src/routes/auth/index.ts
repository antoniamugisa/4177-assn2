import { Router } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../../models/User';

dotenv.config();
const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user: any = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
});

export default router;
