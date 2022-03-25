import Resource from '@utils/resource';

export default new Resource('/Assets', {
  upload: {
    url: 'upload',
    method: 'post',
    headers: {
      'content-type': 'multipart/form-data',
    },
  },
  download: {
    url: `download/{filename}`,
    method: 'post',
  },
});
