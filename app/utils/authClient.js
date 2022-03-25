import axios from 'axios';

import Config from '../config';

const instance = axios.create({
  baseURL: Config.VA_API_URL,
});

const authClient = {
  client: instance,
};

export default authClient;
