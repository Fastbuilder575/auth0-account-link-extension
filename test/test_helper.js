import nconf from 'nconf';
import path from 'path';
import request from 'request';
import createServer from '../server/init';

const createRequest = (options) => (
  new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(res);
    });
  })
);

const startServer = (configFile =  '../server/config.json') => {
  nconf.argv().env().file(path.join(__dirname, configFile)).defaults({
    AUTH0_RTA: 'auth0.auth0.com',
    DATA_CACHE_MAX_AGE: 1000 * 10,
    NODE_ENV: 'test',
    HOSTING_ENV: 'default',
    PORT: 3001,
    USE_OAUTH2: false,
    LOG_COLOR: true
  });


  return new Promise((resolve, reject) => {
    const server = createServer(key => nconf.get(key), null);

    server.start((err) => {
      console.log(" I AM BOOTING", server.info.uri);
      if (err) {
        reject(err);
      }

      resolve(server);

      console.info(`Server running at: ${server.info.uri}`);
    });
  });
};

export {
  startServer,
  createRequest as request
};