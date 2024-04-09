/**
 * Setup package
 */
import { AuthenticationOptions, setupAuthentication } from './authentication';
import { setupAuthorization } from './authorization';

import { setupLogger } from './logger';
import { errorHandler } from './error-handler';
// import * from './emailer';

export type CoreOptions = {
  config: undefined;
  db: undefined;
  user: undefined;
};

export const initCore = async (options: CoreOptions) => {
  const config = options.config;

  const { logger, httpLogger } = setupLogger(config);

  const authOptions: AuthenticationOptions = {
    config: config,
    user: options.user,
  };

  const { authRouter, authMiddleware } = setupAuthentication(authOptions);

  const authorizationOptions = {
    config: config,
    db: options.db,
  };

  const isAuthorized = await setupAuthorization(authorizationOptions);

  return {
    logger,
    errorHandler,
    httpLogger,
    authRouter,
    authMiddleware,
    isAuthorized,
  };
};
