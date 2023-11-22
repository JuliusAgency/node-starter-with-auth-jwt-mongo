import express, { Express, Router } from 'express';

import { configApp } from './config';
import { connect } from './lib/db-connection';
import { setupAuthentication, setupCors } from './setup/';
import { setupExamplesRouter, setupUserRouter } from './app';

const app: Express = express();

app.use(express.json());
setupCors(app);

connect();
// setup base packages
const { authMiddleware, authRouter } = setupAuthentication();

// Auth middleware usage
// Define the protected routes
const protectedRoutes = ['/examples', '/users'];
app.use(protectedRoutes, authMiddleware);

// const isAuthorized = setupAuthorization();

// Routers Setup
const router = Router();
// Auth router usage
router.use('/auth', authRouter);
router.use('/users', setupUserRouter());
router.use('/examples', setupExamplesRouter());

app.use(router);

const port = configApp.app.port;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
