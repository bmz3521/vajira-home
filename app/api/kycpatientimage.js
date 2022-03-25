import Resource from '@utils/resource';

export default new Resource('/kycPatientImages', {
  getKycPatientImages: {
    url: 'filterByPatientId?patientId={patientId}',
    method: 'get',
  },
});
