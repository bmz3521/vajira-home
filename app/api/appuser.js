import Resource from '@utils/resource';

export default new Resource('/AppUserIdentities', {
  fetchAppUserIdentity: {
    url: '?filter[where][appUserId]={id}',
    method: 'get',
  },
});
