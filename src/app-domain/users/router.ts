import { Router } from 'express';

export const setupUserRouter = ({ isAuthorized, controller }) => {
  const router = Router();
  router.get(
    '/',
    // isAuthorized('read', 'users'),
    isAuthorized('read'),
    controller.getAllUsers,
  );
  router.get(
    '/:userId',
    // isAuthorized('read', 'users/:userId'),
    isAuthorized('read'),
    controller.getUserById,
  );
  return router;
};
