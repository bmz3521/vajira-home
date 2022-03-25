import Resource from '@utils/resource';

export default new Resource('/Savelists', {
  addClinic: {
    url: '{id}/clinics/rel/{fk}',
    method: 'put',
  },
  removeClinic: {
    url: '{id}/clinics/rel/{fk}',
    method: 'delete',
  },
});
