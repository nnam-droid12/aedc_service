import express from 'express';

import { getStaff, getStaffs } from '../controllers/staff_controller.js';
import { authorize, restrictToRoles } from '../middleware/permission-middleware.js';

const router = express.Router();

router.get('/all', authorize, restrictToRoles(['admin']), getStaffs);
router.get('/:id', authorize, restrictToRoles(['admin']), getStaff);

export default router;