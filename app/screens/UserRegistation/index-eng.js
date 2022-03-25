import * as yup from 'yup';
import { Field, Form, Formik, FormikProps } from 'formik';
import { connect } from 'react-redux';
import { AuthActions } from '../UserRegistrationCompliance/node_modules/@actions';
import { bindActionCreators } from 'redux';
import React, { Fragment, useState } from 'react';
import styles from './styles';

import { useDispatch } from 'react-redux';
import {
  TextInput,
  Button,
  Text,
  Alert,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  Header,
  SafeAreaView,
  Icon,
} from '../UserRegistrationCompliance/node_modules/@components';
import {
  BaseStyle,
  BaseColor,
} from '../UserRegistrationCompliance/node_modules/@config';
import { ScrollView } from 'react-native-gesture-handler';
import Loading from '@components/Loading';

const UserRegistation = props => {
  const { actions, teleActions, navigation, auth, user } = props;

  const registerUser = async values => {
    const data = {
      email: values.email,
      firstname: values.firstname,
      lastname: values.lastname,
      password: values.password,
      hnId: values.hnId,
      cId: values.cId,
      address: values.address,
      logistic: values.logistic,
      breakfastTime: values.breakfastTime,
      lunchTime: values.lunchTime,
      อาหารเย็นTime: values.อาหารเย็นTime,
    };

    await actions.register(data);
    // await actions.login(credential);
    // await teleActions.loginTele();

    Alert.alert(
      'ลงทะเบียนสำเร็จ!',
      'โปรดรอโรงพยาบาลยืนยัน เพื่อลงชื่อใช้งานบัญชี',
      [{ text: 'ตกลง', onPress: () => navigation.navigate('SignIn2') }],
      { cancelable: false },
    );

    // navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Loading isVisible={loading} />
      <Header
        title="Registation"
        renderLeft={() => {
          return (
            <Icon
              name="chevron-left"
              size={20}
              color={BaseColor.primaryColor}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmpassword: '',
            firstname: '',
            lastname: '',
            hnId: '',
            cId: '',
            address: '',
            logistic: '',
            breakfastTime: '',
            lunchTime: '',
            อาหารเย็นTime: '',
          }}
          onSubmit={async values => {
            await registerUser(values);
          }}
          validationSchema={yup.object().shape({
            firstname: yup.string().required(),
            lastname: yup.string().required(),
            email: yup
              .string()
              .email()
              .required(),
            password: yup
              .string()
              .min(6, 'Minimum length of 6')
              .required(),
            confirmpassword: yup
              .string()
              .oneOf([yup.ref('password')], 'Passwords do not match')
              .required(),
            hnId: yup.string().required(),
            cId: yup.string().required(),
            address: yup.string().required(),
            logistic: yup.string().required(),
            breakfastTime: yup.string().required(),
            lunchTime: yup.string().required(),
            อาหารเย็นTime: yup.string().required(),
          })}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            handleBlur,
            touched,
            isSubmitting,
          }) => (
            <Fragment>
              <View style={styles.contain}>
                <Text style={{ fontSize: 18, marginLeft: 18, marginTop: 20 }}>
                  Fullname
                </Text>
                <TextInput
                  value={values.firstname}
                  onChangeText={handleChange('firstname')}
                  onBlur={handleBlur('firstname')}
                  placeholder="ชื่อจริง"
                  style={[
                    styles.textInput,
                    {
                      fontSize: 18,
                      padding: 10,
                      width: 370,
                      marginBottom: -1,
                      alignSelf: 'center',
                      borderColor: '#CCCCCC',
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      borderWidth: 1,
                    },
                  ]}
                />
                <TextInput
                  value={values.lastname}
                  onChangeText={handleChange('lastname')}
                  onBlur={handleBlur('lastname')}
                  placeholder="นามสกุล"
                  style={[
                    styles.textInput,
                    {
                      fontSize: 18,
                      padding: 10,
                      width: 370,
                      marginTop: -1,
                      marginBottom: 2,
                      alignSelf: 'center',
                      borderColor: '#CCCCCC',
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      borderWidth: 1,
                    },
                  ]}
                />
                <Text style={{ fontSize: 11, color: 'gray', marginLeft: 18 }}>
                  กรุณาตรวจสอบ
                </Text>
                {touched.firstname && errors.firstname && (
                  <Text style={{ fontSize: 10, color: 'red', marginLeft: 18 }}>
                    {errors.firstname}
                  </Text>
                )}
                <Text style={{ fontSize: 18, marginLeft: 18 }}>Email</Text>
                <TextInput
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  autoCorrect={false}
                  autoCapitalize={false}
                  placeholder="E-mail"
                  style={[
                    styles.textInput,
                    {
                      fontSize: 18,
                      padding: 10,
                      width: 370,
                      margin: 5,
                      alignSelf: 'center',
                      borderColor: '#CCCCCC',
                      borderWidth: 1,
                    },
                  ]}
                />
                <Text style={{ fontSize: 11, color: 'gray', marginLeft: 18 }}>
                  We'll email you a reservation confirmation
                </Text>
                {touched.email && errors.email && (
                  <Text style={{ fontSize: 10, color: 'red', marginLeft: 18 }}>
                    {errors.email}
                  </Text>
                )}
                <Text style={{ fontSize: 18, marginLeft: 18 }}>Password</Text>
                <TextInput
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder="Password"
                  onBlur={handleBlur('password')}
                  secureTextEntry={true}
                  style={[
                    styles.textInput,
                    {
                      fontSize: 18,
                      padding: 10,
                      width: 370,
                      marginBottom: -1,
                      alignSelf: 'center',
                      borderColor: '#CCCCCC',
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      borderWidth: 1,
                    },
                  ]}
                />
                {touched.password && errors.password && (
                  <Text style={{ fontSize: 10, color: 'red', marginLeft: 18 }}>
                    {errors.password}
                  </Text>
                )}
                <TextInput
                  value={values.confirmpassword}
                  onChangeText={handleChange('confirmpassword')}
                  placeholder="Confirm Password"
                  onBlur={handleBlur('confirmpassword')}
                  secureTextEntry={true}
                  style={[
                    styles.textInput,
                    {
                      fontSize: 18,
                      padding: 10,
                      width: 370,
                      marginTop: -1,
                      marginBottom: 2,
                      alignSelf: 'center',
                      borderColor: '#CCCCCC',
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      borderWidth: 1,
                    },
                  ]}
                />
                {touched.confirmpassword && errors.confirmpassword && (
                  <Text style={{ fontSize: 10, color: 'red', marginLeft: 18 }}>
                    {errors.confirmpassword}
                  </Text>
                )}
                <Text style={{ fontSize: 18, marginLeft: 18 }}>
                  Hospital Number
                </Text>
                <TextInput
                  value={values.hnId}
                  onChangeText={handleChange('hnId')}
                  placeholder="Hospital Number"
                  onBlur={handleBlur('hnId')}
                  style={[
                    styles.textInput,
                    {
                      fontSize: 18,
                      padding: 10,
                      width: 370,
                      margin: 5,
                      alignSelf: 'center',
                      borderColor: '#CCCCCC',
                      borderWidth: 1,
                    },
                  ]}
                />
                {touched.hospitalnumber && errors.hospitalnumber && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.hospitalnumber}
                  </Text>
                )}
                <Text style={{ fontSize: 18, marginLeft: 18 }}>
                  Identification Number
                </Text>
                <TextInput
                  value={values.cId}
                  onChangeText={handleChange('cId')}
                  placeholder="Client Id"
                  onBlur={handleBlur('cId')}
                  style={[
                    styles.textInput,
                    {
                      fontSize: 18,
                      padding: 10,
                      width: 370,
                      margin: 5,
                      alignSelf: 'center',
                      borderColor: '#CCCCCC',
                      borderWidth: 1,
                    },
                  ]}
                />
                {touched.clientid && errors.clientid && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.clientid}
                  </Text>
                )}
                <Text style={{ fontSize: 18, marginLeft: 18 }}>Address</Text>
                <TextInput
                  value={values.address}
                  onChangeText={handleChange('address')}
                  placeholder="Address"
                  onBlur={handleBlur('address')}
                  style={[
                    styles.textInput,
                    {
                      fontSize: 18,
                      padding: 10,
                      width: 370,
                      margin: 5,
                      alignSelf: 'center',
                      borderColor: '#CCCCCC',
                      borderWidth: 1,
                    },
                  ]}
                />
                {touched.address && errors.address && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.address}
                  </Text>
                )}
                <Text style={{ fontSize: 18, marginLeft: 18 }}>
                  เวลาทานอาหารเช้า
                </Text>
                {/* <View
										style={{
											...(Platform.OS !== 'android' && {
												zIndex: 5000
											})
										}}
									>
										<DropDownPicker
											items={[
												// { label: '00:00', value: '00:00' },
												// { label: '01:00', value: '01:00' },
												// { label: '02:00', value: '02:00' },
												// { label: '03:00', value: '03:00' },
												// { label: '04:00', value: '04:00' },
												// { label: '05:00', value: '05:00' },
												{ label: '06:00', value: '06:00' },
												{ label: '07:00', value: '07:00' },
												{ label: '08:00', value: '08:00' },
												{ label: '09:00', value: '09:00' },
												{ label: '10:00', value: '10:00' },
												{ label: '11:00', value: '11:00' },
												// { label: '12:00', value: '12:00' },
												// { label: '13:00', value: '13:00' },
												// { label: '14:00', value: '14:00' },
												// { label: '15:00', value: '15:00' },
												// { label: '16:00', value: '16:00' },
												// { label: '17:00', value: '17:00' },
												// { label: '18:00', value: '18:00' },
												// { label: '19:00', value: '19:00' },
												// { label: '20:00', value: '20:00' },
												// { label: '21:00', value: '21:00' },
												// { label: '22:00', value: '22:00' },
												// { label: '23:00', value: '23:00' },
											]}
											defaultValue='06:00'
											style={{
												fontSize: 18,
												padding: 10,
												width: 370,
												margin: 5,
												alignSelf: 'center',
												borderColor: '#CCCCCC',
												borderWidth: 1,
											}}
											itemStyle={{
												justifyContent: 'flex-start'
											}}
											dropDownStyle={{
												fontSize: 18,
												padding: 10,
												width: 370,
												margin: 5,
												alignSelf: 'center',
												borderColor: '#CCCCCC',
												borderWidth: 1,
												backgroundColor: '#fafafa'
											}}
											onChangeText={handleChange('breakfastTime')}
											value={values.breakfastTime}
										/>
									</View> */}
                <TextInput
                  value={values.breakfastTime}
                  onChangeText={handleChange('breakfastTime')}
                  placeholder="breakfastTime"
                  onBlur={handleBlur('breakfastTime')}
                  style={[
                    styles.textInput,
                    {
                      fontSize: 18,
                      padding: 10,
                      width: 370,
                      margin: 5,
                      alignSelf: 'center',
                      borderColor: '#CCCCCC',
                      borderWidth: 1,
                    },
                  ]}
                />
                {touched.breakfastTime && errors.breakfastTime && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.breakfastTime}
                  </Text>
                )}
                <Text style={{ fontSize: 18, marginLeft: 18 }}>เวลาlunch</Text>
                <TextInput
                  value={values.lunchTime}
                  onChangeText={handleChange('lunchTime')}
                  placeholder="lunchTime"
                  onBlur={handleBlur('lunchTime')}
                  style={[
                    styles.textInput,
                    {
                      fontSize: 18,
                      padding: 10,
                      width: 370,
                      margin: 5,
                      alignSelf: 'center',
                      borderColor: '#CCCCCC',
                      borderWidth: 1,
                    },
                  ]}
                />
                {touched.lunchTime && errors.lunchTime && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.lunchTime}
                  </Text>
                )}
                <Text style={{ fontSize: 18, marginLeft: 18 }}>
                  เวลาอาหารเย็น
                </Text>
                <TextInput
                  value={values.อาหารเย็นTime}
                  onChangeText={handleChange('อาหารเย็นTime')}
                  placeholder="อาหารเย็นTime"
                  onBlur={handleBlur('อาหารเย็นTime')}
                  style={[
                    styles.textInput,
                    {
                      fontSize: 18,
                      padding: 10,
                      width: 370,
                      margin: 5,
                      alignSelf: 'center',
                      borderColor: '#CCCCCC',
                      borderWidth: 1,
                    },
                  ]}
                />
                {touched.อาหารเย็นTime && errors.อาหารเย็นTime && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.อาหารเย็นTime}
                  </Text>
                )}
                <Text style={{ fontSize: 18, marginLeft: 18 }}>
                  ช่องทางรับยา
                </Text>
                <TextInput
                  value={values.logistic}
                  onChangeText={handleChange('logistic')}
                  placeholder="logistic"
                  onBlur={handleBlur('logistic')}
                  style={[
                    styles.textInput,
                    {
                      fontSize: 18,
                      padding: 10,
                      width: 370,
                      margin: 5,
                      alignSelf: 'center',
                      borderColor: '#CCCCCC',
                      borderWidth: 1,
                    },
                  ]}
                />
                {touched.logistic && errors.logistic && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.logistic}
                  </Text>
                )}
                <Button
                  onPress={handleSubmit}
                  title="Sign up"
                  {...{ isSubmitting }}
                />
              </View>
            </Fragment>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistation);
