import Resource from '@utils/resource';

export default new Resource('/RecentlyClinics', {
  postVisit: {
    url: 'postVisit',
    method: 'post',
  },
});
