import { Router } from 'express';

import authRouter from './authRoutes.js';
import departmentRouter from './departmentRoutes.js';
import indexRouter from './index.js';
import staffRouter from './staffRoutes.js';
import vendorRouter from './vendorRoutes.js';

export type RouteConfig = {
  route: string;
  router: Router;
};

export const routerConfig: RouteConfig[] = [
  { route: '/', router: indexRouter },
  { route: '/auth', router: authRouter },
  { route: '/staff', router: staffRouter },
  { route: '/department', router: departmentRouter },
  { route: '/vendors', router: vendorRouter }
];
