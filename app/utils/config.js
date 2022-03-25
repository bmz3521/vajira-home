// import { Constants } from 'expo'
import Config from 'react-native-config';

const ENV = {
  dev: {
    API_URL: Config.API_URL || 'http://localhost:3000/api',
    OMISE_PUBLIC_KEY: 'pkey_test_5du95bxgm1k68tiheeu',
    FILE_CONTAINER: 'witsawa-evermed',
  },
  staging: {
    // API_URL: 'https://develop.backend.evermed.dev.witsawa.com/api'
    // API_URL: 'http://192.168.2.35:3000/api'
    OMISE_PUBLIC_KEY: 'pkey_test_5du95bxgm1k68tiheeu',
  },
  prod: {
    // API_URL: 'http://192.168.2.35:3000/api'
    OMISE_PUBLIC_KEY: 'pkey_test_5du95bxgm1k68tiheeu',
  },
};

function getEnvVars(env = '') {
  if (env === null || env === undefined || env === '') return ENV.dev;

  if (env.indexOf('dev') !== -1) return ENV.dev;
  else if (env.indexOf('staging') !== -1) return ENV.staging;
  else if (env.indexOf('prod') !== -1) return ENV.prod;
  else return ENV.staging;
}

export default ENV.dev;
