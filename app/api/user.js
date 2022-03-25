import Resource from '@utils/resource';

export default new Resource('/Users', {
  login: {
    url: 'login',
    method: 'post',
  },
  getUser: {
    url: 'me',
    method: 'get',
  },
  getUserInfo: {
    url: 'me/userInformation',
    method: 'get',
  },
  getDoctorInfo: {
    url: 'me',
    method: 'get',
  },
  getBookings: {
    url: 'me/bookings',
    method: 'get',
  },
  register: {
    url: '',
    method: 'post',
  },
  reqreset: {
    url: 'reset',
    method: 'post',
  },
  changePassword: {
    url: 'change-password',
    method: 'post',
  },
  findWhere: {
    url: '?filter={query}',
    method: 'get',
  },
  getSavelist: {
    url: 'me/savelists',
    method: 'get',
  },
  savelist: {
    url: 'me/savelists',
    method: 'post',
  },
  thirdPartyLogin: {
    url: 'thirdPartyLogin',
    method: 'post',
  },
});
