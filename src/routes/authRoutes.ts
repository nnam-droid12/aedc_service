import express from 'express';

import { changePassword, createStaff, loginStaff } from '../controllers/staff_controller.js';
import { authorize, restrictToRoles } from '../middleware/permission-middleware.js';

const router = express.Router();

router.post('/register', authorize, restrictToRoles(['admin']), createStaff);
router.post('/login', loginStaff);
router.put('/change-password', authorize, changePassword);

export default router;
