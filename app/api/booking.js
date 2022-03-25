import Resource from '@utils/resource';

export default new Resource('/Bookings', {
  createMobileBooking: {
    url: 'mobile',
    method: 'post',
  },
  getMobileBooking: {
    url: '{id}/mobile',
    method: 'get',
  },
  getMobileBookings: {
    url: 'mobile',
    method: 'get',
  },
  getConversation: {
    url: '{id}/mobile/chats',
    method: 'get',
  },
  createConversation: {
    url: '{id}/mobile/chats',
    method: 'post',
  },
  fetchDoctorBooking: {
    url:
      '?filter[include]=doctor&filter[include]=patient&filter[include]=prescription',
    method: 'get',
  },
});
