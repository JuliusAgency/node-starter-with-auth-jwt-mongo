import dotenv from 'dotenv';
// import { User } from '../users';
// import {
//   // BaseUser, // When the extended User is not defined
// } from '../lib/auth-jwt-sql-set';

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
}
