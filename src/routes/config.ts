import { Router } from 'express';

import indexRouter from './index.js';


export type RouteConfig = {
  route: string;
  router: Router;
};

export const routerConfig: RouteConfig[] = [
  { route: '/', router: indexRouter },
];
