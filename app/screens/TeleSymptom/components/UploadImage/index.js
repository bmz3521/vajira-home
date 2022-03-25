import React, { useState } from 'react';
import ImagePicker from 'react-native-image-picker';
import { TouchableHighlight, ActivityIndicator } from 'react-native';
import { Icon } from '@components';
import { BaseColor } from '@config';
import { uploadImageAsync } from '@utils/uploadImageHelper';

import { UploadView } from './style';
const options = {
  title: 'Select Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const UploadImage = ({ setImage }) => {
  const [loading, setLoading] = useState(false);

  const pickImage = () => {
    ImagePicker.showImagePicker(options, async response => {
      setLoading(true);

      if (response.didCancel) {
        setLoading(false);
      } else if (response.error) {
        setLoading(false);
      } else {
        try {
          const fileResult = await uploadImageAsync(response.uri);
          setImage(fileResult);
        } catch (e) {
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={loading ? () => null : pickImage}
    >
      <UploadView>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={BaseColor.primaryColor}
            style={{ paddingLeft: 5 }}
          />
        ) : (
          <Icon name="plus" size={18} color={BaseColor.blueColor} />
        )}
      </UploadView>
    </TouchableHighlight>
  );
};

export default UploadImage;
