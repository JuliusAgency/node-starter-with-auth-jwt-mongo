/**
 * Application domains
 */
import { setupUsers } from './users';
import { setupExamples } from './examples';

export { User } from './users';

export const setupAppDomain = ({ router, isAuthorized }) => {
  const usersRouter = setupUsers({ isAuthorized });
  const examplesRouter = setupExamples({ isAuthorized });
  router.use('/users', usersRouter);
  router.use('/examples', examplesRouter);

  return ['/users', '/examples'];
};
