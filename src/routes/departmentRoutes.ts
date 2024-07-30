import express from 'express';

import {
  createDepartment,
  deleteDepartment,
  getDepartment,
  getDepartments,
  updateDepartment
} from '../controllers/department_controller.js';
import { authorize, restrictToRoles } from '../middleware/permission-middleware.js';

const router = express.Router();

router.post('/', authorize, restrictToRoles(['admin']), createDepartment);
router.get('/:id', authorize, restrictToRoles(['admin']), getDepartment);
router.get('/', authorize, restrictToRoles(['admin']), getDepartments);
router.put('/', authorize, restrictToRoles(['admin']), updateDepartment);
router.delete('/', authorize, restrictToRoles(['admin']), deleteDepartment);

export default router;
