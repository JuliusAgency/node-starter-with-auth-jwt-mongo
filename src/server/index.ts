import express, { Express, Router, Request, Response } from 'express';

import { setupCors } from './cors';
import { setupHeaders } from './headers';

export type ServerOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  db: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  core: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appDomain: any;
};

export const startupServer = async (options: ServerOptions) => {
  const config = options.config;

  const app: Express = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(setupCors(config));

  app.use(setupHeaders());

  const router = Router();

  const coreOptions = {
    config: config,
    db: options.db,
    user: options.user,
  };

  const core = await options.core(coreOptions);

  const protectedRoutes = options.appDomain({
    router,
    isAuthorized: core.isAuthorized,
  });

  const logger = core.logger;
  app.use(core.httpLogger);

  app.use(router);
  router.get('/', (_req: Request, res: Response) => {
    res.json({ message: `Is live` });
  });

  router.use('/auth', core.authRouter);

  app.use(protectedRoutes, core.authMiddleware);

  app.use(core.errorHandler);

  app.listen(config.port, () => {
    logger.info(`⚡️[server]: Server is running
      at: ${config.baseUrl}:${config.port}
      in: ${config.env} environment`);
  });
};