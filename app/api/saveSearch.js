import Resource from '@utils/resource';

export default new Resource('/Savesarches', {
  saveSearches: {
    url: '',
    method: 'put',
  },
  getSaveSearches: {
    url: '',
    method: 'get',
  },
  getSaveSearcheslimit: {
    url: '?filter[order]=id DESC&filter[limit]=3',
    method: 'get',
  },
});
