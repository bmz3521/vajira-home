import axios from 'axios';
import config from './config';
import store from '../store';

let { API_URL } = config;

const requestHeader = () => {
  // const state = store.default.getState();
  const headers = {
    'Authorization': `Bearer ${store.getState().Auth.accessToken}`,
  };
  return headers;
};
const instance = (apiUrl) => {
  const ins = axios.create({
    baseURL: apiUrl || `${API_URL}`,
    headers: requestHeader(),
  });
  ins.interceptors.response.use((response) => {
    if (!response.data.success && response.data.message) {
      return Promise.reject(new Error(response.data.message));
    }
    return Promise.resolve(response.data);
  }, (error) => {
    // console.log(error);
    return Promise.reject(error);
  });
  return ins;
};
export default function (endpoint, apiUrl) {
  return {
    async create(payload) {
      return instance(apiUrl).request({
        method: 'post',
        url: `${endpoint}`,
        data: payload,
      });
    },
    async update(payload) {
      const { id } = payload;
      return instance(apiUrl).request({
        method: 'patch',
        url: `${endpoint}/${id}`,
        data: payload,
      });
    },
    async find(payload) {
      return instance(apiUrl).request({
        method: 'get',
        url: `${endpoint}`,
        params: payload,
      });
    },
    async findById(payload) {
      const { id } = payload;
      return instance(apiUrl).request({
        method: 'get',
        url: `${endpoint}/${id}`,
        params: payload,
      });
    },
    async delete(payload) {
      const { id } = payload;
      return instance(apiUrl).request({
        method: 'delete',
        url: `${endpoint}/${id}`,
        params: payload,
      });
    },
    async request(options) {
      return instance(apiUrl).request(options);
    },
  };
}
export const APIURL = API_URL;
