import { DoctorConstants } from '@constants';

/* GET DOCTOR */
export function getDoctor(data) {
  return {
    type: DoctorConstants.GET_Doctor_REQUEST,
    data,
  };
}

export function getDoctorSuccess(result) {
  return {
    type: DoctorConstants.GET_Doctor_SUCCESS,
    result,
  };
}

export function getDoctorFailure(error) {
  return {
    type: DoctorConstants.GET_Doctor_FAILURE,
    error,
  };
}
