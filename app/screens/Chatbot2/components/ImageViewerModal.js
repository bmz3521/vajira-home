import React, { useState } from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Icon } from '@components';

const ImageViewerModal = ({ images, children, index = 0 }) => {
  const [modalVisible, setModalVisible] = useState(false);

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
        <Icon name="times" style={{ color: '#fff', fontSize: 25 }} />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Modal visible={modalVisible} transparent={true}>
        <ImageViewer
          // index={index}
          renderIndicator={() => <View></View>}
          imageUrls={[{ url: '', props: { source: images } }]}
          enableImageZoom={true}
          onSwipeDown={() => setModalVisible(!modalVisible)}
          enableSwipeDown={true}
          useNativeDriver={true}
          renderHeader={renderCloseButton}
        />
      </Modal>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => setModalVisible(!modalVisible)}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
};
export default ImageViewerModal;
