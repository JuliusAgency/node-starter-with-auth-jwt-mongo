import { AuthJwtOptions, setupAuthMiddleware } from '@juliusagency/auth-jwt';
import { BaseUser, dBApi, Token } from '@juliusagency/base-user-mongo';
import { cryptUtils, CryptUtilsOptions } from '@juliusagency/auth-utils';
import { initVerify, VerifyOptions } from '@juliusagency/auth-verify-service';
import {
  initStrategy as InitLocal,
  StrategyOptions,
} from '@juliusagency/auth-strategy-local';
import { AuthMngrOptions, initAuthMngr } from '@juliusagency/auth-mngr';
import {
  UserMngrOPtions,
  setupUserManager,
} from '@juliusagency/auth-user-mngr';

// Reexport
export { BaseUser, Token };

// Setup Auth with session and Sql Db
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setupAuthentication = (authOptions: any) => {
  const { config, db, router, passport, User } = authOptions;
  // Wrap up the User and the Token
  console.log(db.name);
  const user = dBApi(User ? User : BaseUser);
  const token = dBApi(Token);

  // Setup the strategy and the user manager with the user
  // Strategy
  const cryptUtilsOptions: CryptUtilsOptions = {
    salt: Number(config.salt),
  };

  const utils = cryptUtils(cryptUtilsOptions);

  const verifyOptions: VerifyOptions = {
    dBApi: user,
    utils: utils,
  };

  const verifyUser = initVerify(verifyOptions);

  const strategyOptions: StrategyOptions = {
    verify: verifyUser,
    loginFieldName: config.loginFieldName,
  };

  const local = InitLocal(strategyOptions);

  // Auth middleware setup
  const authOpt: AuthJwtOptions = {
    lifeTime: config.lifeTime,
    secretKey: config.secretKey,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { authMiddleware, encodeToken } = setupAuthMiddleware(authOpt);

  // Auth manager
  const authMngrOptions: AuthMngrOptions = {
    router: router,
    passport: passport,
    session: false,
    encode: encodeToken,
    strategies: [local],
  };
  const authRouter = initAuthMngr(authMngrOptions);

  // User manager
  const userMngrOPtions: UserMngrOPtions = {
    User: user,
    Token: token,
    utils: utils,
    session: false,
    emailer: config.emailer,
  };
  const userMngrRouter = setupUserManager(userMngrOPtions);

  return { authRouter, userMngrRouter, authMiddleware };
};
