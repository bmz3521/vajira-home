import Resource from '@utils/resource';

export default new Resource('/dashboardData', {
  getDashBoardInfoByPatientId: {
    url: '?filter[where][userId]={patientId}',
    method: 'get',
  },
  updateDashboardByDashBoardInfo: {
    url: '{dashboardId}',
    method: 'patch',
  },
  createDashBoardInfo: {
    url: '',
    method: 'patch',
  },
});
