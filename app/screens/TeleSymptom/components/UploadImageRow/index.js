import React from 'react';
import { View, ScrollView } from 'react-native';
import { Image } from '@components';
import ExpandIcon from '@assets/images/expand.png';
import { getImage } from '@utils/uploadImageHelper';

import ImageViewerModal from '../ImageViewerModal';
import UploadImage from '../UploadImage';

const UploadImageRow = ({ images, handleImagePicked }) => {
  renderItem = (value, index) => {
    return (
      <ImageViewerModal images={images} index={index}>
        <View>
          <Image
            source={{
              uri: getImage(value),
            }}
            style={{
              width: 100,
              height: 100,
              marginLeft: 15,
              borderRadius: 10,
            }}
          />
          <Image
            source={ExpandIcon}
            style={{
              width: 40,
              height: 40,
              position: 'absolute',
              bottom: -5,
              right: -2,
            }}
          />
        </View>
      </ImageViewerModal>
    );
  };
  console.log(images);
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: 15 }}
    >
      <UploadImage setImage={handleImagePicked} />
      <View style={{ flexDirection: 'row' }}>{images.map(renderItem)}</View>
    </ScrollView>
  );
};

export default UploadImageRow;
