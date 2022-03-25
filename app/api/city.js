import Resource from '@utils/resource';

export default new Resource('/Cities', {
  findWhere: {
    url: '?filter={query}',
    method: 'get',
  },
});
