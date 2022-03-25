import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import i18next from 'i18next';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from '@components';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-elements';
function ModalUI({
  title,
  message,
  children,
  hideLogoModal,
  buttonText,
  onOpenModal,
  onCustomUI,
  onPress,
  animated,
  setIsVisibleModal,
  cancelButton,
}) {
  const { navigate, goBack } = useNavigation();
  const { theme } = useTheme();
  return (
    <Modal
      animationType={animated === 'slide' ? 'fade' : 'fade'}
      transparent={true}
      visible={onOpenModal}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{
          flex: 1,
        }}
      >
        <View style={styles(theme).centeredView}>
          <View style={styles(theme).modalView}>{children}</View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default ModalUI;
