import dotenv from 'dotenv';
import { LoggerOptions } from '@juliusagency/simple-logger';
import { ModelType } from '@juliusagency/authorization-jwt-mongo-set';

dotenv.config();

export const configApp: Configuration = {
  test: process.env.TEST === 'true' ? true : false,
  app: {
    port: Number(process.env.PORT) || 3000,
  },
  mongoDb: {
    url: process.env.MONGO_URI,
    dbName: process.env.MONGO_NAME,
  },
  emailer: {
    name: 'gmail',
    user: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
  },
  logger: {
    loggerLevel: process.env.SIMPLE_LOGGER_LEVEL,
  },
  authJwt: {
    secretKey: process.env.SECRET_JWT,
    lifeTime: 5,
  },
  authorization_type:
    process.env.AUTHORIZATION_MODEL_TYPE === 'RBAC'
      ? ModelType.RBAC
      : ModelType.ACL,
};

interface Configuration {
  test: boolean;
  app: {
    port: number;
  };
  mongoDb: {
    url: string;
    dbName: string;
  };
  emailer: {
    name: string;
    user: string;
    password: string;
  };
  logger: LoggerOptions;
  authJwt: {
    secretKey: string;
    lifeTime: number;
  };
  authorization_type: ModelType;
}
