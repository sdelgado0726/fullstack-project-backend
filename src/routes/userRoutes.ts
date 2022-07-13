import { Router } from 'express';
import { createUser, loginUser, getUserProfile, getAllUser, updateUser } from '../controllers/userController';

const router = Router();

router.get('/', getAllUser);

router.post('/', createUser);

router.get('/:userId', getUserProfile);

router.put('/:userId', updateUser);

router.post('/login', loginUser);




export default router;