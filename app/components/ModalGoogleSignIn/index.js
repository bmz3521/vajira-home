import React, { useImperativeHandle, forwardRef, useState } from 'react';
import {
  Text,
  View,
  Modal,
  Dimensions,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Images } from '@config';
import { Image, Icon } from '@components';
import styles from './styles';

const { width, height } = Dimensions.get('screen');

const ModalGoogleSignIn = (props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [typeModal, setTypeModal] = useState('default');
  useImperativeHandle(ref, () => ({
    show(type) {
      setTypeModal(type);
      setIsVisible(true);
    },
    close() {
      setIsVisible(false);
    },
  }));
  return (
    <Modal transparent={true} visible={isVisible}>
      <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
        <View style={{ ...styles.modalContaimer, width, height }}>
          <TouchableWithoutFeedback>
            <View style={styles.innerContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsVisible(false)}
                style={styles.clostBtn}
              >
                <Icon name="times" size={22} color="#555" />
              </TouchableOpacity>
              <View>
                {typeModal === 'default' ? (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10,
                      }}
                    >
                      <Image source={Images.avata1} style={styles.vajiraIcon} />
                      <Icon
                        name="link"
                        size={16}
                        color="#aaaaaa"
                        style={{ marginHorizontal: 10, marginTop: 8 }}
                      />
                      <Image
                        source={Images.google_fit}
                        style={{ ...styles.fitIcon, marginLeft: 5 }}
                      />
                    </View>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#434343',
                        fontSize: 16,
                        marginTop: 15,
                      }}
                    >
                      เข้าสู่ระบบเพื่อดำเนินการต่อ
                    </Text>
                    <TouchableNativeFeedback
                      onPress={props.openFitness}
                      useForeground={false}
                    >
                      <View style={styles.buttonContainer}>
                        <View style={styles.bgIcon}>
                          <Image
                            source={Images.google}
                            style={styles.googleIcon}
                          />
                        </View>
                        <Text style={styles.fontSignIn}>
                          Sign in with Google
                        </Text>
                      </View>
                    </TouchableNativeFeedback>
                  </>
                ) : (
                  <View style={{ alignItems: 'center' }}>
                    <Image source={Images.google_fit} style={styles.fitIcon} />
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#434343',
                        fontSize: 16,
                        marginTop: 10,
                      }}
                    >
                      กรุณาดาวน์โหลด Google Fit
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginHorizontal: 20,
                      }}
                    >
                      <TouchableNativeFeedback
                        onPress={props.openFitness}
                        useForeground={true}
                      >
                        <View
                          style={{
                            ...styles.successContainer,
                            backgroundColor: 'transparent',
                            borderWidth: 1,
                            borderColor: '#666',
                          }}
                        >
                          <Text style={{ ...styles.fontSignIn, color: '#666' }}>
                            ไม่ต้องการ
                          </Text>
                        </View>
                      </TouchableNativeFeedback>
                      <TouchableNativeFeedback
                        onPress={() => {
                          Linking.openURL(
                            'http://play.google.com/store/apps/details?id=com.google.android.apps.fitness',
                          );
                          setIsVisible(false);
                        }}
                        useForeground={true}
                      >
                        <View style={styles.successContainer}>
                          <Text style={styles.fontSignIn}>ดาวน์โหลด</Text>
                        </View>
                      </TouchableNativeFeedback>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default forwardRef(ModalGoogleSignIn);
