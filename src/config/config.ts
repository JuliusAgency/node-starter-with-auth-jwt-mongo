import dotenv from 'dotenv';
import { LoggerOptions } from '@juliusagency/simple-logger';

dotenv.config();

export const configApp: Configuration = {
  app: {
    port: Number(process.env.PORT) || 3000,
  },
  mongoDb: {
    url: process.env.MONGO_URI,
    dbName: process.env.MONGO_NAME,
  },
  authJwt: {
    secretKey: process.env.SECRET_JWT,
    lifeTime: 5,
  },
  emailer: {
    name: 'gmail',
    user: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
  },
  logger: {
    loggerLevel: process.env.SIMPLE_LOGGER_LEVEL,
  },
};

interface Configuration {
  app: {
    port: number;
  };
  mongoDb: {
    url: string;
    dbName: string;
  };
  authJwt: {
    secretKey: string;
    lifeTime: number;
  };
  emailer: {
    name: string;
    user: string;
    password: string;
  };
  logger: LoggerOptions;
}
