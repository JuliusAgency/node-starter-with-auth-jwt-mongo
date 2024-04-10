/**
 * The extended User
 */
import { setupUserController } from './controller';
import { setupUserRouter } from './router';

export { User } from './model';

export const setupUsers = ({ core }) => {
  const controller = setupUserController();
  return setupUserRouter({ core, controller });
};
