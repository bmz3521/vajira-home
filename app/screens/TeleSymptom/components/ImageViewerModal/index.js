import React, { useState } from 'react';
import _ from 'lodash';
import { View, Modal, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Icon } from '@components';
import { getImage } from '@utils/uploadImageHelper';

const ImageViewerModal = ({ images, children, index = 0 }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const imageUrls = images.map(d => {
    return { url: getImage(d) };
  });

  const renderCloseButton = () => {
    return (
      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={{
          position: 'absolute',
          right: 20,
          top: 30,
          zIndex: 100,
          padding: 8,
        }}
      >
        <Icon name="times" style={{ color: '#fff', fontSize: 20 }} />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Modal visible={modalVisible} transparent={true}>
        <ImageViewer
          index={index}
          imageUrls={imageUrls}
          enableImageZoom={true}
          onSwipeDown={() => setModalVisible(!modalVisible)}
          enableSwipeDown={true}
          renderHeader={renderCloseButton}
        />
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        {children}
      </TouchableOpacity>
    </View>
  );
};
export default ImageViewerModal;
