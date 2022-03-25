import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
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
export default ChangePassword = ({ navigation, route }) => {
  const userInfo = route?.params?.data;
  const [pressOtp, setPressOtp] = useState(false);
  const [registerData, setRegisterData] = useState(false);
  const [phoneNumberData, setPhoneNumberData] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [errorOtp, setErrorOtp] = useState('');
  const [otpStatus, setOtpStatus] = useState('');
  const [timeOutOtp, setTimeOutOtp] = useState('');
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const resetOtpAgain = async () => {
    console.log('phoneNumberData ==== ', phoneNumberData);
    if (
      phoneNumberData.length < 10 ||
      phoneNumberData === '' ||
      phoneNumberData === undefined
    ) {
      alert('โปรดกรอกเบอร์โทรศัพท์ให้ถูกต้อง');
    } else {
      const checkNumber = await checkMobileNumber(phoneNumberData);
      if (checkNumber.status === 'success') {
        setTimeOutOtp(true);
        setPressOtp(checkNumber.token);
        var minutes = 30;
        startTimer(minutes);
      }
    }
  };

  const startTimer = duration => {
    var timer = duration,
      minutes,
      seconds;
    const intervalID = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      let showTime = minutes + ':' + seconds;
      setTimeOutOtp(showTime);
      if (--timer < 0) {
        timer = duration;
        setTimeOutOtp(false);
        clearInterval(intervalID);
      }
    }, 1000);
  };

  const checkMobileNumber = async numberData => {
    try {
      const { data } = await axios.post(
        `${config.apiUrl}/UserInfos/requestResetPassword/`,
        {
          cId: userInfo?.cId || '',
          mobileNumber: numberData,
        },
      );
      return data.data;
    } catch (error) {
      return error;
      console.log(error);
    }
  };

  const confirmOtp = async otp => {
    console.log(
      `confirmOtp =========== is a ${otp} 00000 ${pressOtp} 99999 ${phoneNumberData}`,
    );
    try {
      const { data } = await axios.post(
        `${config.apiUrl}/UserInfos/verifyResetPasswordOtp/`,
        {
          cId: userInfo?.cId || '',
          mobileNumber: phoneNumberData,
          otp: otp,
          otpToken: pressOtp,
        },
      );
      console.log(`data =========== is a ${JSON.stringify(data)}`);
      return data;
    } catch (error) {
      return false;
    }
  };

  const handleStyleButton = (condition, error) => {
    console.log('condition ====,  ', condition);
    setPhoneNumberData(condition.phoneNumber);
  };
  // const onOTPChange = code => {
  //   setEnteredOtp(code);
  // };
  const onVerifyOTP = async code => {
    const checkOtp = await confirmOtp(code);
    if (checkOtp) {
      setOtpStatus(checkOtp.resetPasswordStatus);
      setErrorOtp('');
      navigation.navigate('CheckPasswordOtp', {
        userId: userInfo.userId,
        statusOtp: checkOtp.resetPasswordStatus,
        numberData: phoneNumberData,
      });
    } else {
      alert('รหัส OTP ของคุณไม่ถูกต้อง');
      setEnteredOtp('');
    }
  };
  const isEmptyString = string => {
    return string ? false : true;
  };
  return (
    <>
      <Formik
        initialValues={{
          phoneNumber: userInfo ? userInfo.mobileNumber : '',
          code: registerData.code || '',
        }}
        onSubmit={async values => {
          console.log('values');
          console.log(navigation);

          setRegisterData(values);
        }}
        validationSchema={yup.object().shape({
          phoneNumber: yup
            .string()
            .min(10, 'เบอร์มือถือผิด')
            .max(10, 'เบอร์มือถือผิด')
            .matches(phoneRegExp, 'เบอร์มือถือผิด')
            .required('กรุณากรอกเบอร์มือถือ'),
          code: yup
            .string()
            .min(6, 'รหัส OTP ไม่ครบ 6 หลัก')
            .required('กรุณากรอกรหัส OTP ให้ถูกต้อง'),
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
                    ขั้นตอนที่ 1:
                  </Text>
                  <Text
                    style={{
                      textAlign: 'left',
                      color: '#585858',
                      fontSize: 18,
                    }}
                  >
                    {userInfo !== 'forgot_password'
                      ? 'กรอกข้อมูลเบอร์โทรศัพท์และขอรหัส OTP'
                      : 'กรอกข้อมูลเบอร์โทรศัพท์และขอรหัส OTP'}
                  </Text>
                </View>
              </View>
              <View style={styles.contain}>
                <Text style={styles.contentTitle}>
                  หมายเลขโทรศัพท์ที่ใช้สมัครแอปพลิเคชั่น{' '}
                  <Text style={{ color: '#CC4344' }}>*</Text>
                </Text>
                <TextInput
                  maxLength={10}
                  keyboardType="number-pad"
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  autoCorrect={false}
                  placeholder="กรอกหมายเลขโทรศัพท์"
                  placeholderTextColor="#7c7b7b"
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
                {touched.phoneNumber && errors.phoneNumber && (
                  <Text
                    style={{
                      fontSize: 10,
                      color: '#CC4344',
                      marginLeft: 5,
                    }}
                  >
                    {errors.phoneNumber}
                  </Text>
                )}

                {pressOtp ? (
                  <>
                    <View style={[styles.contentTitle, { marginTop: 20 }]}>
                      <Text headline semibold>
                        กรอกรหัส OTP 6 หลัก
                      </Text>
                    </View>
                    <OTPInputView
                      style={{ width: '90%', height: 140 }}
                      pinCount={6}
                      codeInputFieldStyle={styles.underlineStyleBase}
                      codeInputHighlightStyle={styles.underlineStyleHighLighted}
                      code={enteredOtp} // Take from state
                      onCodeChanged={code => {
                        setFieldValue('code', code);
                        setEnteredOtp(code);
                      }}
                      autoFocusOnLoad
                      onCodeFilled={code => onVerifyOTP(code)}
                      clearInputs={isEmptyString(enteredOtp)} // Check if the enteredOTP is reset.
                    />
                    {touched.code && errors.code && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#CC4344',
                          marginLeft: 5,
                        }}
                      >
                        {errors.code}
                      </Text>
                    )}
                    {errorOtp !== '' ? (
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#CC4344',
                          marginLeft: 5,
                        }}
                      >
                        {errorOtp}
                      </Text>
                    ) : (
                      <Text></Text>
                    )}
                  </>
                ) : (
                  <Text></Text>
                )}
                <Text>{timeOutOtp}</Text>
                <View>
                  {timeOutOtp ? (
                    <TouchableOpacity disabled>
                      <Text
                        style={{
                          marginTop: 5,
                          color: '#707070',
                        }}
                      >
                        ขอรหัส OTP อีกครั้ง
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        resetOtpAgain();
                      }}
                    >
                      <Text
                        style={{
                          marginTop: 5,
                          color: '#095A3B',
                        }}
                      >
                        {pressOtp ? 'ขอรหัส OTP อีกครั้ง' : 'ขอรหัส OTP'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                padding: 20,
                backgroundColor: handleStyleButton(values, errors),
              }}
            ></View>
          </SafeAreaView>
        )}
      </Formik>
    </>
  );
};
