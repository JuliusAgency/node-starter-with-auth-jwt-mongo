import { setupAuthorization as authorization } from '@juliusagency/authorization-jwt-checker';
import {
  ModelType,
  initRules,
  rulesRepository,
} from '@juliusagency/authorization-repo-mongo';

export type AuthorizationOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  db: any;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setupAuthorization = async ({ config, db }) => {
  const modelType = config.modelType === 'ACL' ? ModelType.ACL : ModelType.RBAC;

  const rulesRepo = rulesRepository(db, modelType);

  // // Init the authorization package
  const aConf = {
    secret: config.secretKey,
  };

  const isAuthorized = authorization({ rulesRepo }, aConf);

  return {
    isAuthorized,
    initRules,
    ModelType,
  };
};
