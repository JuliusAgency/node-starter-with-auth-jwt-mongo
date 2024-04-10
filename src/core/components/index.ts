/**
 * Setup package
 */
import { AuthenticationOptions, setupAuthentication } from './authentication';
import { setupAuthorization } from './authorization';

import { setupLogger } from './logger';
import { errorHandler, AppError, ResponseCode } from './error-handler';
// import * from './emailer';

export type CoreOptions = {
  config: undefined;
  db: undefined;
  user: undefined;
};

export const initCore = async (options: CoreOptions) => {
  const config = options.config;
  const db = options.db;

  const { logger, httpLogger } = setupLogger(config);

  const authOptions: AuthenticationOptions = {
    config: config,
    user: options.user,
  };

  const { authRouter, authMiddleware } = setupAuthentication(authOptions);

  const authorizationOptions = {
    config: config,
    db: db,
  };

  const { isAuthorized, initRules, ModelType } =
    await setupAuthorization(authorizationOptions);

  const handler = {
    errorHandler,
    AppError,
    ResponseCode,
  };

  return {
    logger,
    httpLogger,
    handler,
    authRouter,
    authMiddleware,
    isAuthorized,
    db,
    initRules,
    ModelType,
  };
};
