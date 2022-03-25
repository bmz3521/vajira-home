import Resource from '@utils/resource';

export default new Resource('/UserInfos', {
  getUserInfos: {
    url: 'me',
    method: 'get',
  },
  getPatientHIEData: {
    url: 'checkUserVisitedByVerifiedFromHIE/{patientId}',
    method: 'get',
  },
  getPatientHIEImage: {
    url: `checkUserDetailFromHIE?patientId={patientId}`,
    method: 'get',
  },
  checkUserDetail: {
    url: `checkUserDetailFromHIE`,
    method: 'get',
  },
  fetchUserInfoByPatientId: {
    url: `userInfoByPatientId`,
    method: 'get',
  },
});
