import Resource from '../utils/resource';

export default new Resource('/Doctors', {
  getDoctorInfo: {
    url: 'findone',
    method: 'get',
  },
  getDoctorNormal: {
    url: '?filter[limit]=8',
    method: 'get',
  },
  getDoctorlimit: {
    url: '?filter[limit]=12',
    method: 'get',
  },
  filter: {
    url: 'filter',
    method: 'get',
  },
  filterwhere: {
    url: 'filterwhere',
    method: 'get',
  },
});
