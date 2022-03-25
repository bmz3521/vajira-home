import { TelemedicineConstants } from '@constants';

export function setTelemedicine(data) {
  return {
    type: TelemedicineConstants.SET_TELEMEDICINE,
    data,
  };
}

/* GET TELE-USER */
export function getUser() {
  return {
    type: TelemedicineConstants.GET_USER_REQUEST,
  };
}
export function getUserSuccess(result) {
  return {
    type: TelemedicineConstants.GET_USER_SUCCESS,
    result,
  };
}
export function getUserFailure(error) {
  return {
    type: TelemedicineConstants.GET_USER_FAILURE,
    error,
  };
}
