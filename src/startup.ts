import { getConfigMapping } from './initialization';
import { appConfig } from './configuration';
import { initDb } from './db';
import { initCore } from './core';
import { ServerOptions, startupServer } from './server';

import { User, setupAppDomain } from './app-domain';

export const startup = async () => {
  const configMapping = getConfigMapping();

  // extend config by extensions configurations
  const config = appConfig(configMapping);
  console.log(config);

  const db = await initDb(config);
  console.log(db.name);

  const serverOptions: ServerOptions = {
    config: config,
    db: db,
    core: initCore,
    user: User,
    appDomain: setupAppDomain,
  };

  startupServer(serverOptions);
};
