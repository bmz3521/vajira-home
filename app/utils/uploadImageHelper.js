import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Config from '../config';

const coverImage =
  'https://www.solidbackgrounds.com/images/2560x1600/2560x1600-dark-gray-solid-color-background.jpg';

export const getImage = (image, defaultImage = coverImage) => {
  if (image) {
    if (image.substring(0, 4) === 'http') {
      return image;
    }
    return `${Config.TELE_API_URL}Containers/${Config.FILE_CONTAINER}/download/${image}`;
  }
  return defaultImage;
};

export async function uploadImageAsync(uri) {
  const apiUrl = `${Config.TELE_API_URL}/Containers/${Config.FILE_CONTAINER}/upload`;

  const uriParts = uri.split('.');
  const fileType = uriParts[uriParts.length - 1];

  const formData = new FormData();
  const file = {
    uri,
    type: `image/${fileType}`,
    name: `file-${uuidv4()}.${fileType}`,
  };
  formData.append('file', file);

  const result = await axios({
    method: 'post',
    url: apiUrl,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result.data.result.files.file[0].name;
}
