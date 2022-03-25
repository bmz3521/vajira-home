import axios from 'axios';
import _config from '@_config';
import { setAccessToken, getAccessToken } from './asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseURL = _config.apiUrl;

axios.defaults.baseURL = baseURL;
function buildURLFromTemplate(data, options) {
  let outputData;
  let outputURL;
  if (data instanceof FormData) {
    outputData = data;
    outputURL = options.url.replace(/\{(.+?)\}/g, (m, label) => {
      const value = outputData.get(label);
      if (value !== undefined) {
        outputData.delete(label);
      } else {
        throw new Error(`Cannot find ${label} in ${options.url}`);
      }
      return value;
    });
  } else {
    outputData = { ...options.defaultParams, ...data };
    outputURL = options.url.replace(/\{(.+?)\}/g, (m, label) => {
      const value = outputData[label];
      if (value !== undefined) {
        delete outputData[label];
      } else {
        throw new Error(`Cannot find ${label} in ${options.url}`);
      }
      return value;
    });
  }

  return {
    data: outputData,
    url: outputURL,
  };
}
export async function refreshToken(token) {
  const options = {
    method: 'post',
    url: '/users/token',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(options);
    await setAccessToken(response.data);
    return response;
  } catch (e) {
    throw e;
  }
}

// reset password with token only reset scope
export async function resetPassword(token, password) {
  const options = {
    method: 'post',
    url: '/users/reset-password',
    data: { newPassword: password },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (e) {
    throw e;
  }
}

export default async (data, options, extraOptions) => {
  const config = {};
  const typeOfUser = await AsyncStorage.getItem('USER_TYPE');
  const { data: outputData, url } = buildURLFromTemplate(data, options);
  axios.defaults.baseURL =
    typeOfUser === 'DOCTOR' ? _config.VA_API_URL : baseURL;
  config.url = url;
  switch (options.method) {
    case 'post':
      config.method = 'post';
      config.data = outputData;
      break;
    case 'get':
      config.method = 'get';
      config.params = outputData;
      break;
    case 'put':
      config.method = 'put';
      config.data = outputData;
      break;
    case 'delete':
      config.method = 'delete';
      config.params = outputData;
      break;
    case 'patch':
      config.method = 'patch';
      config.data = outputData;
      break;
    default:
      throw new Error('Http method not support');
  }
  // return axios.request(config).then((res) => res.data);
  try {
    // set header
    config.headers = {
      ...options.headers,
    };

    let token = await getAccessToken();
    if (!!token) {
      try {
        if (Date.now() - token.createdAt >= token.TTL - 120) {
          // call refresh token
          await refreshToken(token.refreshToken);
          token = await getAccessToken();
        }
        // check if require refresh token
        config.headers.Authorization = `Bearer ${token.id}`;
      } catch (e) {
        console.log(e);
        delete config.headers.Authorization;
      }
    }
    const result = await axios.request({ ...config, ...extraOptions });
    return result.data;
  } catch (e) {
    if (e.response && e.response.data && e.response.data.error) {
      e.response = e.response.data.error;
    }
    throw e;
  }
};
