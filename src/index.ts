import bodyParser from 'body-parser';
import express, {
  Express,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
import cors from 'cors';

import { configApp } from './config/config';
import { connect } from './lib/db-connection';
import {
  AuthJwtOptions,
  AuthJwtSetSetupOptions,
  BaseUser,
  authSetSetup,
} from '@juliusagency/auth-jwt-mongo-set';
// import { User } from './users';

const app: Express = express();

app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
    origin: [process.env.BACKEND_BASE_URL || 'http://localhost:3005'],
  }),
);

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

connect().then(() => {
  // Setup Auth with session and MongoDb
  const authJwtOptions: AuthJwtOptions = {
    secretKey: configApp.authJwt.secretKey,
    lifeTime: configApp.authJwt.lifeTime,
  };

  const config: AuthJwtSetSetupOptions = {
    // repository: '',
    User: BaseUser,
    authOpt: authJwtOptions,
  };

  const { authMiddleware, authRouter } = authSetSetup(config);

  // Auth middleware usage
  // Define the protected routes
  const protectedRoutes = ['/first', '/second'];
  app.use(protectedRoutes, authMiddleware);

  // Routers Setup
  const router = Router();
  // Auth router usage
  router.use('/auth', authRouter);

  router.get('/', (_req: Request, res: Response) => {
    res.json({ message: `Is live` });
  });

  // Setup 2 protected routes for test
  router.get('/first', (_req: Request, res: Response) => {
    res.json({ message: `You have reached the first protected route` });
  });

  router.get('/second', (_req: Request, res: Response) => {
    res.json({ message: `You have reached the second protected route` });
  });

  app.use(router);

  const port = configApp.app.port;
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});
