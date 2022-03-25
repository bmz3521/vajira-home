import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('screen');

const ModalImagePicker = (props, ref) => {
  const [isShow, setIsShow] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setIsShow(true);
    },
  }));

  const RenderIcon = ({ iconName, label }) => {
    return (
      <View
        style={{
          paddingHorizontal: 15,
          alignItems: 'center',
          marginHorizontal: 10,
          paddingVertical: 15,
        }}
      >
        <Ionicons name={iconName} size={30} color="green" />
        <Text style={{ color: '#333' }}>{label}</Text>
      </View>
    );
  };

  return (
    <Modal visible={isShow} transparent>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsShow(false);
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View
              style={{
                backgroundColor: '#0A7C53',
                width: '100%',
                paddingVertical: 10,
              }}
            >
              <Text style={styles.titleText}>กรุณาเลือกเครื่องมือ</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  props.onPress('camera');
                  setIsShow(false);
                }}
              >
                <RenderIcon iconName="camera" label="Camera" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.onPress('gallery');
                  setIsShow(false);
                }}
              >
                <RenderIcon iconName="ios-image" label="Gallery" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default forwardRef(ModalImagePicker);

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.6)',
  },
  modalContainer: {
    width: '60%',
    minWidth: 250,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
