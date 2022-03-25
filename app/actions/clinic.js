import { ClinicConstants } from '@constants';

/* GET CLINIC */
export function getClinic(data) {
    return {
        type: ClinicConstants.GET_CLINIC_REQUEST,
        data,
    };
}

export function getClinicSuccess(result) {
    return {
        type: ClinicConstants.GET_CLINIC_SUCCESS,
        result,
    };
}

export function getClinicFailure(error) {
    return {
        type: ClinicConstants.GET_CLINIC_FAILURE,
        error,
    };
}
  