
import { Router } from 'express';

import { createVendor, getVendor, getVendors, updateVendor } from '../controllers/vendor_controller.js';
import { authorize, restrictToRoles } from '../middleware/permission-middleware.js';

const router = Router();

router.get('/all', authorize, restrictToRoles(['admin']), getVendors);
router.post('/', authorize, restrictToRoles(['admin']), createVendor);
router.get('/:id', authorize, restrictToRoles(['admin']), getVendor);
router.put('/:id', authorize, restrictToRoles(['admin']), updateVendor);

export default router;

