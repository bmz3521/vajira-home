import Resource from '@utils/resource';

export default new Resource('/OmaAccessToken', {
  verify: {
    url: 'verifytoken',
    method: 'post',
  },
  createNewToken: {
    url: 'refreshtoken',
    method: 'post',
  },
});
