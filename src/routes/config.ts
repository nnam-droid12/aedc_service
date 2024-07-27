import { Router } from 'express';

import authRouter from './authRoutes.js';
import indexRouter from './index.js';
import staffRouter from './staffRoutes.js';

export type RouteConfig = {
  route: string;
  router: Router;
};

export const routerConfig: RouteConfig[] = [
  { route: '/', router: indexRouter },
  { route: '/auth', router: authRouter },
  { route: '/staff', router: staffRouter }
];
