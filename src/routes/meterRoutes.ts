import express from 'express';

import { createMeter, getMeter, getMeters, updateMeter } from '../controllers/meter_controller.js';
import { authorize, restrictToRoles } from '../middleware/permission-middleware.js';

const router = express.Router();

router.post('/', authorize, restrictToRoles(['admin']), createMeter);
router.get('/', getMeters);
router.get('/:id', getMeter);
router.put('/update-meter', authorize, updateMeter);

export default router;
