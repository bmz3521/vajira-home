import Resource from '@utils/resource';

export default new Resource('/Clinics', {
  getClinic: {
    url: 'findone',
    method: 'get',
  },
  getClinicPremium: {
    url: '?filter[where][evergoplusclinic]=yes&filter[limit]=8',
    method: 'get',
  },
  getCloseToPublicTransport: {
    url: '?filter[where][closeToPublicTransport]=yes&filter[limit]=8',
    method: 'get',
  },
  getClinicNormal: {
    url: '?filter[limit]=8',
    method: 'get',
  },
  getCliniclimit: {
    url: '?filter[limit]=12',
    method: 'get',
  },
  getClinicProcedures: {
    url: '{id}/procedures',
    method: 'get',
  },
  /* Get Procedures */
  getOrthopedics: {
    url: '?filter[where][Procedures]=Orthopedics&filter[limit]=8',
    method: 'get',
  },
  getDentistry: {
    url: '?filter[where][closeToPublicTransport]=yes&filter[limit]=8',
    method: 'get',
  },
  getAesthetic: {
    url: '?filter[where][closeToPublicTransport]=yes&filter[limit]=8',
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
