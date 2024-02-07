import express from 'express';
import {createUser, getAllUser, getUserById  } from '../controller/user.controller.js';
import {validateUserCreation} from '../validation/user.validation.js';

const router = express.Router();

router.post('/', validateUserCreation, createUser);
router.get('/', getAllUser);
router.get('/:userId', getUserById);

export default router;