import { Connection } from 'mongoose';

import {
  initRules,
  ModelType,
  setupAuthorizationSet,
  AuthorizationJwtSetSetupOptions,
} from '@juliusagency/authorization-jwt-mongo-set';
import { aclData } from '../authorization-definitions/acl';
import { rbacData } from '../authorization-definitions/rbac';
import { configApp } from '../../config';

export { ModelType };

export const setupAuthorization = (connection: Connection, type: ModelType) => {
  const rules = type === ModelType.ACL ? aclData : rbacData;
  initRules(connection, type, rules);

  const config: AuthorizationJwtSetSetupOptions = {
    connection: connection,
    type: type,
    secret: configApp.authJwt.secretKey,
  };
  return setupAuthorizationSet(config);
};
