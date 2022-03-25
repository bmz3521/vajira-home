import { DashBoardDataAPI } from '@api';

export function getDashboardData(patientId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await DashBoardDataAPI.getDashBoardInfoByPatientId({
        patientId: patientId,
      });
      resolve(response);
    } catch (e) {
      console.log('getDashboardData reject =====', e);
      reject({ err: e.response });
    }
  });
}

export function updateDashboard({ dashboardId, data }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await DashBoardDataAPI.updateDashboardByDashBoardInfo({
        dashboardId,
        ...data,
      });
      resolve(response);
    } catch (e) {
      console.log('updateDashboard reject =====', e);
      reject({ err: e.response });
    }
  });
}

export function createDashboard(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await DashBoardDataAPI.createDashBoardInfo(data);
      console.log('createDashboard response ========', response);
      resolve(response);
    } catch (e) {
      console.log('checkUserDetail reject =====', e);
      reject({ err: e.response });
    }
  });
}
