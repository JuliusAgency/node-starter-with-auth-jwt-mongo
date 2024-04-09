export const getConfigMapping = () => {
  const dbMap = configDbMapping;
  return {
    ...dbMap,
    ...configCommonMapping['cors'],
    ...configCommonMapping['logger'],
    ...configCommonMapping['mailer'],
    ...configAuthMapping,
    ...configAuthorizationMapping,
  };
};

// TO DO: Definitions - move to json files
const configDbMapping = {
  dbUrl: 'MONGO_URI',
  dbName: 'MONGO_NAME',
};

const configCommonMapping = {
  cors: {
    credentials: 'CORS_CREDENTIALS',
    origin: 'CORS_ORIGINAL',
  },
  logger: {
    loggerLevel: 'SIMPLE_LOGGER_LEVEL',
  },
  mailer: {
    clientUrl: 'CLIENT_URL',
    name: 'SMTP_NAME',
    user: 'SMTP_USERNAME',
    password: 'SMTP_PASSWORD',
  },
};

const configAuthMapping = {
  secretKey: 'SECRET_JWT',
  lifeTime: 'LIFE_TIME',
  salt: 'SALT_WORK_FACTOR',
};

const configAuthorizationMapping = {
  modelType: 'AUTHORIZATION_MODEL_TYPE',
  test: 'TEST',
};
