
import { Router } from 'express';

import { createVendor, getVendorById, getVendors, updateVendor } from '../controllers/vendor_controller.js';
import { authorize, restrictToRoles } from '../middleware/permission-middleware.js';

const router = Router();

router.get('/all', authorize, restrictToRoles(['staff', 'admin']), getVendors);
router.post('/', authorize, restrictToRoles(['staff']), createVendor);
router.get('/:id', authorize, restrictToRoles(['staff', 'admin']), getVendorById);
router.put('/:id', authorize, restrictToRoles(['staff']), updateVendor);

export default router;

