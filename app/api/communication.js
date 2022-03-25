import Resource from '@utils/resource';

export default new Resource('/Communications', {
  fetchTwilioToken: {
    url: 'getToken',
    method: 'get',
  },
});
