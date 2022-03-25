import Resource from '@utils/resource';

export default new Resource('/Countries', {
  findWhere: {
    url: '?filter={query}',
    method: 'get',
  },
});
