import { Connection } from 'mongoose';

import {
  initRules,
  ModelType,
  setupAuthorizationSet,
  AuthorizationJwtSetSetupOptions,
} from '@juliusagency/authorization-jwt-mongo-set';

import { configApp } from '../../config';

import { aclData } from '../authorization-definitions/acl';
import { rbacData } from '../authorization-definitions/rbac';

export { ModelType };

export const setupAuthorization = (connection: Connection) => {
  const modelType = configApp.authorization_type;
  const rules = modelType === ModelType.ACL ? aclData : rbacData;
  if (configApp.test) {
    initRules(connection, modelType, rules);
  }

  const config: AuthorizationJwtSetSetupOptions = {
    connection: connection,
    type: modelType,
    secret: configApp.authJwt.secretKey,
  };
  return setupAuthorizationSet(config);
};
