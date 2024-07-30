import express from 'express';

import { createMeter } from '../controllers/meter_controller.js';
import { authorizeStaff, changePassword, loginStaff } from '../controllers/staff_controller.js';
import { authorize, restrictToRoles } from '../middleware/permission-middleware.js';

const router = express.Router();

router.post('/', authorize, restrictToRoles(['admin']), createMeter);
router.post('/login', loginStaff);
router.put('/change-password', authorize, changePassword);
router.post('/authorized', authorize, authorizeStaff);

export default router;
