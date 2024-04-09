import { AuthJwtOptions, setupAuthMiddleware } from '@juliusagency/auth-jwt';
import {
  initStrategy,
  StrategyOptions,
} from '@juliusagency/auth-strategy-local';
import { BaseUser, dBApi, Token } from '@juliusagency/base-user-mongo';
import {
  AuthMngrOPtions,
  setupAuthManager,
} from '@juliusagency/base-user-mngr';
import { EmailerConfigOptions, emailerSetup } from './emailer';

export type AuthenticationOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
};

export const setupAuthentication = (options: AuthenticationOptions) => {
  // Wrap up the User and the Token
  const User = options.user;
  const user = dBApi(User ? User : BaseUser);
  const token = dBApi(Token);

  // Setup the strategy and the user manager with the user
  // Strategy
  const strategyOptions: StrategyOptions = {
    dBApi: user,
    salt: options.config.salt,
  };

  // Strategies
  const strategy = initStrategy(strategyOptions);

  // Auth middleware setup
  const authOpt: AuthJwtOptions = {
    lifeTime: options.config.lifeTime,
    secretKey: options.config.secretKey,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { authMiddleware, encodeToken } = setupAuthMiddleware(authOpt);

  // Emailer
  const emailerOptions: EmailerConfigOptions = {
    name: options.config.name,
    user: options.config.user,
    password: options.config.password,
  };

  const emailer = emailerSetup(emailerOptions);

  // User manager
  const authMngrOPtions: AuthMngrOPtions = {
    User: user,
    strategy: strategy,
    encode: encodeToken,
    session: false,
    Token: token,
    emailer: emailer,
    salt: options.config.salt,
  };
  const authRouter = setupAuthManager(authMngrOPtions);

  return { authRouter, authMiddleware };
};
