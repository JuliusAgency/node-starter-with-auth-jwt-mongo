import { setupAuthorization as authorization } from '@juliusagency/authorization-jwt-checker';
import {
  ModelType,
  initRules,
  rulesRepository,
} from '@juliusagency/authorization-repo-mongo';

import { aclData, rbacData } from '../authorization-definitions';

export type AuthorizationOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  db: any;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setupAuthorization = async ({ config, db }) => {
  const modelType = config.modelType === 'ACL' ? ModelType.ACL : ModelType.RBAC;
  if (config.test) {
    const rules = modelType === ModelType.ACL ? aclData : rbacData;

    await initRules(db, modelType, rules);
    console.log(`authorization rules for ${config.modelType} created`);
  }

  const rulesRepo = rulesRepository(db, modelType);

  // // Init the authorization package
  const aConf = {
    secret: config.secretKey,
  };

  return authorization({ rulesRepo }, aConf);
};
