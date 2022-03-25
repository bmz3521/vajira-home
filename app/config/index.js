const env = process.env.NODE_ENV || 'defaultConfig';
let baseUrl = 'https://backend.oma.vajira.everapp.io';
let vajiraUrl = 'https://api.telemed.vajira.everapp.io';
// local test
// let baseUrl = 'https://dev.backend.oma.vajira.everapp.io';
// let vajiraUrl = 'http://localhost:3001';

let config = {
  baseUrl,
  apiUrl: `${baseUrl}/api`,
  VA_API_URL: `${vajiraUrl}/api`,
  FILE_CONTAINER: 'witsawa-evermed',
};

if (env === 'production') {
  baseUrl = 'https://backend.oma.vajira.everapp.io';
  vajiraUrl = 'https://api.telemed.vajira.everapp.io';
  config = {
    baseUrl,
    apiUrl: `${baseUrl}/api`,
    VA_API_URL: `${vajiraUrl}/api`,
    FILE_CONTAINER: 'witsawa-evermed',
  };
}

export default {
  ...config,
};
