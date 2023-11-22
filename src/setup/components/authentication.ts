import {
  AuthJwtOptions,
  AuthJwtSetSetupOptions,
  // BaseUser,
  authSetSetup,
} from '@juliusagency/auth-jwt-mongo-set';

import { configApp } from '../../config';

import { User } from '../../app';
import { setupEmailer } from './emailer';

export const setupAuthentication = () => {
  const emailer = setupEmailer();

  // Setup Auth with jwt and Mongo Db
  const authJwtOptions: AuthJwtOptions = {
    secretKey: configApp.authJwt.secretKey,
    lifeTime: configApp.authJwt.lifeTime,
  };

  const config: AuthJwtSetSetupOptions = {
    User: User,
    authOpt: authJwtOptions,
    emailer: emailer,
  };

  return authSetSetup(config);
};
