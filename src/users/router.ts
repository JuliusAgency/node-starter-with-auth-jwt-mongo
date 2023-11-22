import { Router } from 'express';

import { setupUserController } from './controller';

export const setupUserRouter = ({ isAuthorized }) => {
  const cnt = setupUserController();
  const router = Router();
  router.get('/', isAuthorized('read', 'users'), cnt.getAllUsers);
  router.get('/user', isAuthorized('read', 'users/user'), cnt.getUserById);
  return router;
};
