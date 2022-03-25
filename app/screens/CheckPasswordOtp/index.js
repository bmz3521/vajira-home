import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
  Modal,
} from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import { Header, SafeAreaView, Icon, Text, Button } from '@components';
import styles from './styles';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { FastField, Formik } from 'formik';
import { isEmpty } from 'lodash';
import * as yup from 'yup';
import axios from 'axios';
import config from '@_config';
export default CheckPasswordOtp = ({ navigation, route }) => {
  const [newPassword, setNewPassword] = useState(false);
  const [phoneNumberData, setPhoneNumberData] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  const [cannotResetPassword, setCannotResetPassword] = useState(true);
  const mediumRegex = /^[A-Za-z0-9_.]+$/;
  const handleStyleButton = (condition, error) => {
    console.log('condition ====,  ', condition);
    setPhoneNumberData(condition.phoneNumber);
    if (
      condition.password === '' ||
      condition.confirmpassword === '' ||
      !isEmpty(error)
    ) {
      return '#5f5f5f';
    } else {
      return '#09B678';
    }
  };
  const checkNewPasswordByOtpStatus = async newPassword => {
    try {
      const param = {
        newPassword: newPassword,
        status: route.params.statusOtp,
        mobileNumber: route.params.numberData,
      };

      const { data } = await axios.post(
        `${config.apiUrl}/UserInfos/resetPassword/`,
        param,
      );
      console.log('-------', data);
      return data;
    } catch (error) {
      return false;
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          password: newPassword.password || '',
          confirmpassword: newPassword.confirmpassword || '',
        }}
        onSubmit={async values => {
          console.log('values');
          console.log(navigation);
          setNewPassword(values);
          if (await checkNewPasswordByOtpStatus(values.confirmpassword)) {
            setSuccessModal(true);
          } else {
            setSuccessModal(true);
            setCannotResetPassword(false);
          }
        }}
        validationSchema={yup.object().shape({
          password: yup
            .string()
            .matches(
              mediumRegex,
              'การกรอกรหัสผ่านไม่ถูกต้อง(ภาษาอังกฤษ หรือ 0-9 เท่านั้น)',
            )
            .min(6, 'รหัสผ่านไม่ควรต่ำกว่า 6 ตัวอักษร')
            .required(),
          confirmpassword: yup
            .string()
            .matches(
              mediumRegex,
              'การกรอกรหัสผ่านไม่ถูกต้อง(ภาษาอังกฤษ หรือ 0-9 เท่านั้น)',
            )
            .oneOf([yup.ref('password')], 'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน')
            .required(),
        })}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <SafeAreaView
            style={BaseStyle.safeAreaView}
            forceInset={{ top: 'always' }}
          >
            <Header
              title="เปลี่ยนรหัสผ่าน"
              textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
              renderLeft={() => {
                return <Icon bold name="chevron-left" size={20} color="#fff" />;
              }}
              onPressLeft={() => {
                navigation.goBack();
              }}
            />
            <ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <View style={{ flex: 2, flexDirection: 'column', padding: 20 }}>
                  <Text
                    bold
                    style={{
                      textAlign: 'left',
                      color: '#000',
                      fontSize: 20,
                    }}
                  >
                    ขั้นตอนที่ 2:
                  </Text>
                  <Text
                    style={{
                      textAlign: 'left',
                      color: '#585858',
                      fontSize: 18,
                    }}
                  >
                    กรอกรหัสผ่านใหม่ของท่าน
                  </Text>
                </View>
              </View>
              <View style={styles.contain}>
                <Text style={styles.contentTitle}>
                  รหัสผ่านใหม่ <Text style={{ color: '#CC4344' }}>*</Text>
                </Text>
                <Text
                  style={[
                    styles.contentTitle,
                    {
                      textAlign: 'left',
                      color: '#585858',
                      fontSize: 14,
                    },
                  ]}
                >
                  {'(กรอกรหัสผ่านใหม่ด้านล่างอย่างต่ำ 6 ตัวอักษร)'}
                </Text>
                <View
                  style={{
                    position: 'relative',
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                  }}
                >
                  <TextInput
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder="รหัสบัญชีผู้ใช้ (จำนวน 6 หลักขั้นต่ำ)"
                    placeholderTextColor="#7c7b7b"
                    onBlur={handleBlur('password')}
                    secureTextEntry={securePassword}
                    style={[
                      styles.textInput,
                      {
                        fontSize: 15,
                        padding: 10,
                        width: '100%',
                        margin: 5,
                        alignSelf: 'center',
                        borderColor: '#CCCCCC',
                        borderWidth: 1,
                        borderRadius: 12,
                      },
                    ]}
                  />
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: 20,
                    }}
                  >
                    <Icon
                      name={securePassword ? 'eye-slash' : 'eye'}
                      size={20}
                      color="#7c7b7b"
                      onPress={() => setSecurePassword(!securePassword)}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text
                    style={{
                      fontSize: 10,
                      color: '#CC4344',
                      marginLeft: 5,
                    }}
                  >
                    {errors.password}
                  </Text>
                )}

                <View style={{ marginBottom: 20 }} />

                <Text style={styles.contentTitle}>
                  กรอกรหัสผ่านใหม่อีกครั้ง{' '}
                  <Text style={{ color: '#CC4344' }}>*</Text>
                </Text>
                <Text
                  style={[
                    styles.contentTitle,
                    {
                      textAlign: 'left',
                      color: '#585858',
                      fontSize: 14,
                    },
                  ]}
                >
                  {'(กรอกรหัสผ่านใหม่ด้านล่างอีกครั้ง เพื่อยืนยัน)'}
                </Text>
                <View
                  style={{
                    position: 'relative',
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                  }}
                >
                  <TextInput
                    value={values.confirmpassword}
                    onChangeText={handleChange('confirmpassword')}
                    placeholder="กรอกรหัสผ่านใหม่ของท่านอีกครั้ง"
                    placeholderTextColor="#7c7b7b"
                    onBlur={handleBlur('confirmpassword')}
                    secureTextEntry={secureConfirmPassword}
                    style={[
                      styles.textInput,
                      {
                        fontSize: 15,
                        padding: 10,
                        width: '100%',
                        margin: 5,
                        alignSelf: 'center',
                        borderColor: '#CCCCCC',
                        borderWidth: 1,
                        borderRadius: 12,
                      },
                    ]}
                  />
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: 20,
                    }}
                  >
                    <Icon
                      name={secureConfirmPassword ? 'eye-slash' : 'eye'}
                      size={20}
                      color="#7c7b7b"
                      onPress={() =>
                        setSecureConfirmPassword(!secureConfirmPassword)
                      }
                    />
                  </TouchableOpacity>
                </View>
                {touched.confirmpassword && errors.confirmpassword && (
                  <Text
                    style={{
                      fontSize: 10,
                      color: '#CC4344',
                      marginLeft: 5,
                    }}
                  >
                    {errors.confirmpassword}
                  </Text>
                )}
              </View>
            </ScrollView>
            <View style={{ padding: 20 }}>
              <TouchableOpacity
                full
                disabled={
                  errors.password !== undefined ||
                  errors.confirmpassword !== undefined ||
                  values.password === '' ||
                  values.confirmpassword === '' ||
                  values.password !== values.confirmpassword ||
                  values.password.length < 5 ||
                  values.confirmpassword.length < 5
                }
                style={{
                  borderRadius: 20,
                  backgroundColor: handleStyleButton(values, errors),
                  width: '100%',
                  paddingHorizontal: 0,
                  paddingVertical: 15,
                }}
                onPress={handleSubmit}
              >
                <Text
                  bold
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                  }}
                >
                  ยืนยันรหัสผ่านใหม่
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </Formik>
      <Modal animationType="slide" transparent={true} visible={successModal}>
        <View style={[styles.centeredView]}>
          <View style={styles.modalViewSuccess}>
            <View style={styles.congratsContainer}>
              {cannotResetPassword ? (
                <>
                  <Icon
                    name="check-circle"
                    size={60}
                    style={{ color: '#1DAF0C', marginBottom: 20 }}
                  />
                  <Text style={styles.modalSuccessTitle}>สำเร็จ</Text>
                  <Text style={styles.modalSubtitle}>
                    ท่านได้เปลี่ยนรหัสผ่านเรียบร้อย
                  </Text>
                  <Text style={{ fontSize: 16, textAlign: 'center' }}>
                    สามารถใช้รหัสผ่านใหม่ล็อคอินได้แล้ว
                  </Text>
                  <View
                    style={{ width: '100%', bottom: 0, position: 'absolute' }}
                  >
                    <TouchableOpacity
                      style={{
                        ...styles.openButton,
                        backgroundColor: '#0A8C5C',
                        marginVertical: 30,
                        padding: 20,
                        marginHorizontal: 20,
                      }}
                      onPress={() => navigation.navigate('Home')}
                    >
                      <Text style={[styles.textStyle, { fontSize: 18 }]}>
                        กลับสู่หน้าหลัก
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <Icon
                    name="minus-circle"
                    size={60}
                    style={{ color: 'red', marginBottom: 20 }}
                  />
                  <Text style={styles.modalSuccessTitle}>ไม่สำเร็จ</Text>
                  <Text style={styles.modalSubtitle}>
                    เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน
                  </Text>
                  <Text style={{ fontSize: 16, textAlign: 'center' }}>
                    โปรดลองใหม่อีกครั้ง
                  </Text>
                  <View
                    style={{ width: '100%', bottom: 0, position: 'absolute' }}
                  >
                    <TouchableOpacity
                      style={{
                        ...styles.openButton,
                        backgroundColor: '#0A8C5C',
                        marginVertical: 30,
                        padding: 20,
                        marginHorizontal: 20,
                      }}
                      onPress={() => navigation.navigate('Home')}
                    >
                      <Text style={[styles.textStyle, { fontSize: 18 }]}>
                        ลองใหม่อีกครั้ง
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
