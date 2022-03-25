import * as yup from 'yup';
import { Field, Form, Formik, FormikProps } from 'formik';
import { connect } from 'react-redux';
import { AuthActions } from '@actions';
import { bindActionCreators } from 'redux';
import React, { Fragment, useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import ProgressCircle from 'react-native-progress-circle';
import styles from './styles';
import { isEmpty } from 'lodash';
import axios from 'axios';

import storage from '@react-native-firebase/storage';
import Loading from '@components/Loading';
import raw from '@assets/raw_database.json';
import { uniq } from 'lodash';
import { useDispatch } from 'react-redux';
import {
  TextInput,
  Button,
  Text,
  Alert,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  Modal,
  Image,
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
// For Android, switch to this >>>
// import { Picker } from 'native-base';

import CheckBox from '@react-native-community/checkbox';

import * as Progress from 'react-native-progress';
import { RNCamera, FaceDetector } from 'react-native-camera';

import { Header, SafeAreaView, Icon } from '@components';
import { BaseStyle, BaseColor, Images } from '@config';
import config from '@_config';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import VajiraCard from '../../components/ImageCardComponent/vajira-card';
import CameraPicture from './CameraPicture';

import CameraMask from './CameraMask';
import text from './complianceText.js';

const UserRegistation = props => {
  const [modalOpen, setModal] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [complicanceModal, setComplicanceModal] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  const [failureModal, setFailureModal] = useState(false);
  const [photoUploadPressed, setPressed] = useState(false);
  const [secondScreen, moveToSecondScreen] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [photoImage, setPhotoShow] = useState(null);
  const [uploading, setUpload] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [registerData, setRegisterData] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [faceImage, setFaceImage] = useState(false);
  const [cIdImage, setCidImage] = useState(false);

  const [photoIdCard, setPhotoIdCard] = useState(null);
  const [photoImageIdCard, setPhotoShowIdCard] = useState(null);
  const [uploadingIdCard, setUploadIdCard] = useState(false);
  const [uploadedIdCard, setUploadedIdCard] = useState(false);

  const [formStep, setFormStep] = useState(0);
  const [registerStep, setRegisterStep] = useState(0);

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

  const [imageUploading, setImageUploading] = useState(false);
  const [transferred, setTransferred] = useState(false);

  const uniqRaw = uniq(raw.map(r => r.province));
  const [address, setAddress] = useState('');
  const [provinces, setProvinces] = useState(uniqRaw);
  const [newAmphoe, setNewAmphoe] = useState('');
  const [newDistrict, setNewDistrict] = useState('');
  const [newProvince, setNewProvince] = useState('');
  const [newPostalCode, setNewPostalCode] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [provinceError, setProvinceError] = useState(false);

  const [amphoes, setAmphoes] = useState(false);
  const [districts, setDistricts] = useState(false);
  const [loginCredential, setLoginCredential] = useState(null);
  const { actions, teleActions, navigation, auth, user } = props;
  const mediumRegex = /^[A-Za-z0-9_.]+$/;
  const env = process.env.NODE_ENV;

  // const changeSteps = step => {
  //   setRegisterStep(step);
  // };

  const changeFormSteps = step => {
    setFormStep(step);
  };

  useEffect(() => {
    if (auth.error) {
      const checkError = () => {
        if (auth.error.error.err.message.includes('Email already')) {
          Alert.alert(
            'เกิดข้อผิดพลาด!',
            'บัตรประชาชนนี้ได้มีการลงทะเบียนไว้แล้ว กรุณาลองใหม่อีกครั้ง',
            [
              {
                text: 'ตกลง',
                onPress: () => {
                  setFormStep(0);
                  setLoading(false);
                  setRegisterStep(0);
                },
              },
            ],
            { cancelable: false },
          );
        }
      };
      checkError();
    }

    if (faceImage && cIdImage) {
      uploadImageToPatient();
    }
  }, [props.auth]);

  const onChangeCurrentTime = (event, date) => {
    if (event.type === 'set') {
      setCurrentDate(date);
      setShow(false);
    }
    setShow(false);
  };

  const onChangeProvince = value => {
    let filterProvinces = raw.filter(r => r.province === value);
    let uniqAmphoes = uniq(
      filterProvinces.map(filterProvince => filterProvince.amphoe),
    );
    setAmphoes(uniqAmphoes);
    setNewAmphoe(uniqAmphoes[0]);
    onChangeAmphoe(uniqAmphoes[0]);
  };

  const onChangeAmphoe = value => {
    let filterAreas = raw.filter(r => r.amphoe === value);
    let uniqDistricts = uniq(
      filterAreas.map(filterArea => filterArea.district),
    );
    setDistricts(uniqDistricts);
    setNewDistrict(uniqDistricts[0]);
    onChangeDistrict(uniqDistricts[0]);
  };

  const onChangeDistrict = value => {
    let filterDistricts = raw.filter(r => r.district === value);
    let uniqZipcodes = uniq(
      filterDistricts.map(filterDistrict => filterDistrict.zipcode),
    );
    setNewPostalCode(uniqZipcodes[0].toString());
  };

  const handleSetPicture = data => {
    setRegisterStep(3);
    setPhoto(data);
    setPhotoShow(data.uri);
    setUploaded(true);
  };

  const handleSetPictureIdCard = data => {
    setRegisterStep(6);
    setPhotoIdCard(data);
    setPhotoShowIdCard(data.uri);
    setUploadedIdCard(true);
  };

  const uploadImage = async () => {
    setUpload(true);
    const { navigation } = props;

    var uri = photo.uri;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    var uriIdCard = photoIdCard.uri;
    const filenameIdCard = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUriIdCard =
      Platform.OS === 'ios' ? uriIdCard.replace('file://', '') : uriIdCard;

    const ext = uri.split('.').pop(); // Extract image extension
    const ext2 = uriIdCard.split('.').pop(); // Extract image extension
    const name = `${registerData.firstname}-${registerData.lastname}-${registerData.cId}`;
    const filename1 = `${name}-selfie.${ext}-${Date.now()}`; // Generate unique name
    const filename2 = `${name}-card.${ext2}-${Date.now()}`; // Generate unique name
    const reference1 = await storage()
      .ref(`/patient-kyc/${env}/${filename1}`)
      .putFile(uploadUri);
    const reference2 = await storage()
      .ref(`/patient-kyc/${env}/${filename2}`)
      .putFile(uploadUriIdCard);
    const imageUpload = await storage()
      .ref(`/patient-kyc/${env}/${filename1}`)
      .getDownloadURL();
    const imageCid = await storage()
      .ref(`/patient-kyc/${env}/${filename2}`)
      .getDownloadURL();

    setFaceImage(imageUpload);
    setCidImage(imageCid);

    setUpload(false);
    setPhoto(null);
  };

  const uploadImageToPatient = async () => {
    const resUpload = await axios.post(`${config.apiUrl}/kycPatientImages`, {
      patientId: props.auth.data.id,
      image: faceImage,
      cIdImage: cIdImage,
    });

    if (resUpload) {
      setLoading(false);
      setSuccessModal(true);
    } else {
      setFailureModal(true);
    }
  };

  const handleSuccessModal = () => {
    // setRegisterStep(8);
    setModal(false);
    setDone(true);
    setFaceImage(false);
    setCidImage(false);
    setSuccessModal(false);
    loginAfterRegister();
    navigation.navigate('SignIn2');
  };

  const handleFailureModal = () => {
    // setRegisterStep(8);
    setModal(false);
    setDone(true);
    setFaceImage(false);
    setCidImage(false);
    setFailureModal(false);
    navigation.navigate('SignIn2');
  };

  const registerUser = async () => {
    const addressInfo = {
      address: address,
      address2: newDistrict,
      area: newAmphoe,
      province: newProvince,
      postalCode: newPostalCode,
    };
    const data = {
      email: registerData.email,
      firstname: registerData.firstname,
      lastname: registerData.lastname,
      password: registerData.password,
      emailverified: true,
      gender: registerData.gender,
      logistic: registerData.logistic,
      birthDate: `${Number(registerData.year)}-${Number(
        registerData.month,
      )}-${Number(registerData.day)}`,
      hnId: registerData.hnId,
      cId: registerData.cId,
      mobileNumber: registerData.number,
      address: addressInfo,
      verified: false,
    };

    const response = await actions.register(data);
    console.log('RESPONSE', response);
    setLoginCredential({
      email: data.email,
      password: data.password,
    });
  };

  const loginAfterRegister = async () => {
    try {
      let response = await actions.login(loginCredential);
      await teleActions.loginTele();
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleStyleButton = (condition, error) => {
    if (
      condition.email === '' ||
      // condition.cId === '' ||
      // condition.hnId === '' ||
      condition.firstname === '' ||
      condition.lastname === '' ||
      condition.password === '' ||
      condition.confirmpassword === '' ||
      !isEmpty(error)
    ) {
      return '#5f5f5f';
    } else {
      return '#09B678';
    }
  };

  const checkAddress = () => {
    if (address.length > 0 && newProvince.length > 0) {
      setAddressError(false);
      setProvinceError(false);
      setRegisterStep(1);
    } else if (address.length === 0 && newProvince.length === 0) {
      setAddressError(true);
      setProvinceError(true);
    } else if (address.length === 0) {
      setProvinceError(false);
      setAddressError(true);
    } else if (newProvince.length === 0) {
      setAddressError(false);
      setProvinceError(true);
    }
  };

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  if (registerStep === 0 && formStep === 1) {
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        <Header
          title="สมัครเข้าใช้ระบบ"
          textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
          renderLeft={() => {
            return <Icon bold name="chevron-left" size={20} color="#fff" />;
          }}
          onPressLeft={() => {
            if (formStep === 1) {
              changeFormSteps(0);
            } else {
              navigation.navigate('Home');
            }
          }}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          style={{ flex: 1 }}
        >
          <View
            style={{
              // flex: 1,
              padding: 20,
              paddingTop: 10,
              width: '100%',
              backgroundColor: '#F5F5F5',
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 2, flexDirection: 'column' }}>
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
                    กรอกข้อมูลที่อยู่ปัจจุบัน
                  </Text>
                </View>
                <ProgressCircle
                  percent={50}
                  radius={30}
                  borderWidth={7}
                  color="#1DAF0C"
                  shadowColor="#E5E5E5"
                  bgColor="#F5F5F5"
                >
                  <Text style={{ fontSize: 15 }}>{'2/4'}</Text>
                </ProgressCircle>
              </View>

              <View style={{ marginBottom: 30 }} />

              <Text style={{ fontSize: 18 }}>เลขที่ / ถนน / อาคาร</Text>
              <TextInput
                onChangeText={setAddress}
                value={address}
                placeholder="เลขที่ / ถนน / อาคาร ที่อยู่ปัจจุบัน"
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
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderRadius: 12,
                  },
                ]}
              />
              {addressError && (
                <Text style={{ color: 'red' }}>
                  กรุณากรอกเลขที่ / ถนน / อาคาร
                </Text>
              )}
              <Text
                style={{
                  fontSize: 18,
                  marginLeft: 5,
                  marginTop: 10,
                }}
              >
                จังหวัด
              </Text>
              <View
                style={[
                  Platform.OS === 'android' ? styles.pickerContainer : {},
                ]}
              >
                <Picker
                  selectedValue={newProvince}
                  onValueChange={itemValue => {
                    onChangeProvince(itemValue);
                    setNewProvince(itemValue);
                    setProvinceError(false);
                  }}
                  style={[
                    Platform.OS === 'android'
                      ? styles.pickerAndSty
                      : styles.pickerIosSty,
                  ]}
                >
                  {provinces.map(province => (
                    <Picker.Item
                      key={province}
                      label={province}
                      value={province}
                    />
                  ))}
                </Picker>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  marginLeft: 5,
                  marginTop: 10,
                }}
              >
                เขต / อำเภอ
              </Text>
              <View
                style={[
                  Platform.OS === 'android' ? styles.pickerContainer : {},
                ]}
              >
                <Picker
                  selectedValue={newAmphoe}
                  onValueChange={itemValue => {
                    onChangeAmphoe(itemValue);
                    setNewAmphoe(itemValue);
                  }}
                  style={[
                    Platform.OS === 'android'
                      ? styles.pickerAndSty
                      : styles.pickerIosSty,
                  ]}
                >
                  {amphoes &&
                    amphoes.map(amphoe => (
                      <Picker.Item key={amphoe} label={amphoe} value={amphoe} />
                    ))}
                </Picker>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  marginLeft: 5,
                  marginTop: 10,
                }}
              >
                แขวง / ตำบล
              </Text>
              <View
                style={[
                  Platform.OS === 'android' ? styles.pickerContainer : {},
                ]}
              >
                <Picker
                  selectedValue={newDistrict}
                  onValueChange={itemValue => {
                    onChangeDistrict(itemValue);
                    setNewDistrict(itemValue);
                  }}
                  style={[
                    Platform.OS === 'android'
                      ? styles.pickerAndSty
                      : styles.pickerIosSty,
                  ]}
                >
                  {districts &&
                    districts.map(district => (
                      <Picker.Item
                        key={district}
                        label={district}
                        value={district}
                      />
                    ))}
                </Picker>
              </View>
              <Text style={{ fontSize: 18, marginTop: 10 }}>รหัสไปรษณีย์</Text>
              <TextInput
                defaultValue={newPostalCode}
                value={newPostalCode}
                onChangeText={text => setNewPostalCode(text)}
                placeholder="รหัสไปรษณีย์"
                placeholderTextColor="#7c7b7b"
                // editable={false}
                style={[
                  styles.textInput,
                  {
                    fontSize: 15,
                    padding: 10,
                    width: '80%',
                    margin: 5,
                    alignSelf: 'flex-start',
                    borderColor: '#CCCCCC',
                    borderWidth: 1,
                    borderRadius: 12,
                    color: '#7c7b7b',
                  },
                  Platform.OS === 'android' && {
                    marginHorizontal: 0,
                    width: '100%',
                    maxWidth: 400,
                    backgroundColor: '#f3f3f3',
                  },
                ]}
              />

              {addressError && (
                <View
                  style={{
                    marginHorizontal: 0,
                    marginTop: 20,
                  }}
                >
                  <Text style={{ color: 'red' }}>
                    กรุณากรอกเลขที่ / ถนน / อาคาร
                  </Text>
                </View>
              )}
              {provinceError && (
                <View
                  style={{
                    marginHorizontal: 0,
                    marginTop: 20,
                  }}
                >
                  <Text style={{ color: 'red' }}>
                    กรุณาเลือกเลขที่จังหวัด เขต และแขวง
                  </Text>
                </View>
              )}

              <View
                style={{
                  marginHorizontal: 0,
                  marginTop: 20,
                  marginBottom: 60,
                }}
              >
                <TouchableOpacity
                  full
                  activeOpacity={0.9}
                  style={{
                    borderRadius: 20,
                    width: '100%',
                    paddingHorizontal: 0,
                    paddingVertical: 15,
                    backgroundColor:
                      address.length > 0 && newProvince.length > 0
                        ? '#0A8C5C'
                        : '#5f5f5f',
                  }}
                  onPress={checkAddress}
                >
                  <Text
                    bold
                    style={{
                      textAlign: 'center',
                      fontSize: 20,
                      color: '#FFFFFF',
                    }}
                  >
                    ดำเนินการต่อ
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // Move this here to fix SafeAreaView bug in iOS
  if (registerStep === 7) {
    return (
      <View style={{ flex: 1 }}>
        {loading ? (
          <View style={styles.progressBarContainer}>
            <ActivityIndicator size="large" color="#000" />
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#535353',
              }}
            >
              กำลังลงทะเบียนการใช้งาน
            </Text>
          </View>
        ) : (
          <>
            <ScrollView>
              <View style={{ marginHorizontal: 15, marginTop: 30 }}>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#535353',
                  }}
                >
                  ส่งภาพเพื่อให้เจ้าหน้าที่ตรวจสอบ
                </Text>
              </View>

              {uploaded ? (
                <View style={{ paddingHorizontal: 20 }}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 30,
                      alignSelf: 'center',
                      marginTop: 60,
                      marginHorizontal: 30,
                      width: '80%',
                      height: 150,
                      borderWidth: 1,
                      borderColor: '#CCC',
                      flexDirection: 'row',
                    }}
                  >
                    <View style={{ flex: 0.6, justifyContent: 'center' }}>
                      <Image
                        style={{
                          flex: 1,
                          borderTopLeftRadius: 30,
                          borderBottomLeftRadius: 30,
                        }}
                        source={{ uri: photoImage }}
                      />
                    </View>
                  </TouchableOpacity>

                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 16,
                        color: '#656565',
                      }}
                    >
                      ภาพถ่ายคู่กับบัตรประชาชน
                    </Text>
                  </View>
                </View>
              ) : (
                <View />
              )}

              {uploadedIdCard ? (
                <View style={{ paddingHorizontal: 20 }}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 30,
                      alignSelf: 'center',
                      marginTop: 30,
                      marginHorizontal: 30,
                      width: '80%',
                      height: 150,
                      borderWidth: 1,
                      borderColor: '#CCC',
                      flexDirection: 'row',
                    }}
                  >
                    <View style={{ flex: 0.6, justifyContent: 'center' }}>
                      <Image
                        style={{
                          flex: 1,
                          borderTopLeftRadius: 30,
                          borderBottomLeftRadius: 30,
                        }}
                        source={{ uri: photoImageIdCard }}
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 16,
                        color: '#656565',
                      }}
                    >
                      ภาพถ่ายบัตรประชาชน
                    </Text>
                  </View>
                </View>
              ) : (
                <View />
              )}

              <View
                style={{
                  width: '90%',
                  marginHorizontal: 20,
                  marginTop: 50,
                  marginBottom: 50,
                }}
              >
                <LinearGradient
                  colors={['#0DA36D', '#0A7C53', '#086C48']}
                  style={styles.signInGradient}
                >
                  <TouchableOpacity
                    full
                    disabled={loading}
                    onPress={async () => {
                      setLoading(true);
                      await uploadImage();
                      await registerUser();
                    }}
                    style={{
                      borderRadius: 12,
                      width: '100%',
                      paddingHorizontal: 20,
                      paddingVertical: 15,
                      flexDirection: 'row',
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: 'center',
                        textAlign: 'center',
                        fontSize: 20,
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                      }}
                    >
                      ส่งข้อมูลเพื่อสมัคร
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </ScrollView>
          </>
        )}

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={successModal}
          >
            <View style={[styles.centeredView, { marginTop: 40 }]}>
              <View style={styles.modalViewSuccess}>
                <View style={styles.congratsContainer}>
                  <Icon
                    name="check-circle"
                    size={60}
                    style={{ color: '#1DAF0C', marginBottom: 20 }}
                  />
                  <Text style={styles.modalSuccessTitle}>ยินดีด้วย</Text>
                  <Text style={styles.modalSubtitle}>
                    ท่านสมัครสมาชิกเรียบร้อยแล้ว
                  </Text>
                  <Text style={{ fontSize: 16, textAlign: 'center' }}>
                    ท่านสามารถเข้าสู่ระบบ VAJIRA@HOME{'\n'}
                    เพื่อรับการแจ้งเตือนจากเจ้าหน้าที่ได้ทันที
                    หากเจ้าหน้าที่ตรวจสอบข้อมูลเรียบร้อยแล้ว
                  </Text>
                  <Text
                    style={{ fontSize: 12, marginTop: 10, color: '#797979' }}
                  >
                    การตรวจสอบข้อมูลโดยเจ้าหน้าที่จะใช้เวลา 1-3 วัน
                  </Text>
                </View>
                <ScrollView style={styles.thankyouContainer}>
                  <Text style={styles.modalSuccessTitle}>
                    โรงพยาบาลวชิรพยาบาล VAJIRA@HOME
                  </Text>
                  <Text style={[styles.modalSubtitle, { color: '#535353' }]}>
                    ขอขอบคุณที่ท่านเข้ามาใช้บริการ
                  </Text>
                  <TouchableOpacity
                    style={{
                      ...styles.openButton,
                      backgroundColor: '#0A8C5C',
                      marginVertical: 30,
                      padding: 20,
                      marginHorizontal: 20,
                    }}
                    onPress={() => handleSuccessModal()}
                  >
                    <Text style={[styles.textStyle, { fontSize: 18 }]}>
                      กลับสู่หน้าหลัก
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={failureModal}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
          >
            <View style={[styles.modalView, { justifyContent: 'center' }]}>
              <Icon
                name="times-circle"
                size={60}
                style={{ color: '#CC4344' }}
              />
              <Text style={styles.modalFailureTitle}>เกิดข้อผิดพลาด</Text>

              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: '#CC4344',
                  padding: 20,
                }}
                onPress={() => handleFailureModal()}
              >
                <Text style={[styles.textStyle, { fontSize: 16 }]}>
                  โปรดลองอีกครั้ง
                </Text>
              </TouchableHighlight>
            </View>
          </Modal>
        </View>
      </View>
    );
  }

  // console.log(new Date().getFullYear() + 543);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      {/* <View style={{ marginBottom: 60 }}> */}

      <Header
        title="สมัครเข้าใช้ระบบ"
        textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          if (registerStep === 1 && formStep === 1) {
            setRegisterStep(0);
            changeFormSteps(1);
          } else if (registerStep === 4 && formStep === 1) {
            setRegisterStep(1);
            changeFormSteps(1);
          } else if (registerStep === 2) {
            setRegisterStep(1);
          } else if (registerStep === 5) {
            setRegisterStep(4);
          } else {
            navigation.navigate('Home');
          }
        }}
      />

      <Loading isVisible={loading} />

      {registerStep === 0 ? (
        <>
          {/* {registerStep === 0 && formStep === 0 && (
            <View
              style={{ width: 170, height: 10, backgroundColor: '#284F30' }}
            />
          )}
          {formStep === 1 && (
            <View
              style={{ width: 270, height: 10, backgroundColor: '#284F30' }}
            />
          )} */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
          >
            <ScrollView>
              <Formik
                initialValues={{
                  email: registerData.email || '',
                  password: registerData.password || '',
                  confirmpassword: registerData.confirmpassword || '',
                  firstname: registerData.firstname || '',
                  lastname: registerData.lastname || '',
                  number: registerData.number || '',
                  gender: registerData.gender || 'male',
                  day: registerData.day || '',
                  month: registerData.month || '',
                  year: registerData.year || '',
                  hnId: '',
                  cId: '',
                  logistic: 'not available',
                  // breakfastTime: 'not available',
                  // lunchTime: 'not available',
                  // dinnerTime: 'not available',
                }}
                onSubmit={async values => {
                  // console.log('values');
                  // console.log(values);

                  setRegisterData(values);
                  changeFormSteps(1);
                }}
                validationSchema={yup.object().shape({
                  firstname: yup.string().required(),
                  lastname: yup.string().required(),
                  number: yup
                    .string()
                    .min(10, 'กรุณากรอกเบอร์มือถือให้ครบ 10 หลัก')
                    .matches(phoneRegExp, 'เบอร์มือถือผิด')
                    .required('กรุณากรอกเบอร์มือถือ'),
                  email: yup
                    // บัตรประชาชน
                    .string()
                    .min(13, 'กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก')
                    .required('กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง'),
                  day: yup
                    .number()
                    .max(31, 'วันที่ไม่ควรเกิน 31')
                    .typeError('วันที่เกิดควรจะเป็นหมายเลขเท่านั้น')
                    .positive('วันที่เกิดควรจะมากกว่า 0')
                    .required('กรุณากรอกวันที่เกิด'),
                  month: yup
                    .number()
                    .max(12, 'เดือนไม่ควรเกิน 12')
                    .typeError('เดือนเกิดควรจะเป็นหมายเลขเท่านั้น')
                    .positive('เดือนเกิดควรจะมากกว่า 0')
                    .required('กรุณากรอกเดือนเกิด'),
                  year: yup
                    .number()
                    .min(2400, 'กรุณากรอก พ.ศ. เกิดที่ถูกต้อง')
                    .max(
                      new Date().getFullYear() + 543,
                      'กรุณากรอก พ.ศ. เกิดที่ถูกต้อง',
                    )
                    .typeError('ปีเกิดควรจะเป็นหมายเลขเท่านั้น')
                    .required('กรุณากรอกปีเกิด'),

                  password: yup
                    .string()
                    .matches(
                      mediumRegex,
                      'การกรอกรหัสผ่านไม่ถูกต้อง(ภาษาอังกฤษ หรือ 0-9 เท่านั้น)',
                    )
                    .min(6, 'รหัสผ่านไม่ควรต่ำกว่า 6 ตัวอักษร')
                    .required('กรุณากรอกรหัสผ่านให้ถูกต้อง'),
                  confirmpassword: yup
                    .string()
                    .matches(
                      mediumRegex,
                      'การกรอกรหัสผ่านไม่ถูกต้อง(ภาษาอังกฤษ หรือ 0-9 เท่านั้น)',
                    )
                    .oneOf(
                      [yup.ref('password')],
                      'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน',
                    )
                    .required(''),
                  // password: yup
                  //   .string()
                  //   .min(6, 'รหัสผ่านไม่ควรต่ำกว่า 6 ตัวอักษร')
                  //   .required(),
                  // confirmpassword: yup
                  //   .string()
                  //   .oneOf(
                  //     [yup.ref('password')],
                  //     'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน',
                  //   )
                  //   .required(),
                  // hnId: yup.string().required(),
                  // cId: yup.string().required(),
                  // address: yup.string().required(),
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
                      <>
                        <View
                          style={{
                            flexDirection: 'row',
                          }}
                        >
                          <View style={{ flex: 2, flexDirection: 'column' }}>
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
                              กรอกข้อมูลส่วนตัวและตั้งรหัสผ่าน
                            </Text>
                          </View>
                          <ProgressCircle
                            percent={25}
                            radius={30}
                            borderWidth={7}
                            color="#1DAF0C"
                            shadowColor="#E5E5E5"
                            bgColor="#F5F5F5"
                          >
                            <Text style={{ fontSize: 15 }}>{'1/4'}</Text>
                          </ProgressCircle>
                        </View>

                        <View style={{ marginBottom: 30 }} />

                        <Text style={{ fontSize: 18 }}>
                          เลขบัตรประจำตัวประชาชน{' '}
                          <Text style={{ color: '#CC4344' }}>*</Text>
                        </Text>
                        <TextInput
                          keyboardType="number-pad"
                          value={values.email}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          autoCorrect={false}
                          placeholder="กรอกเลขบัตรประจำตัวประชาชน (จำนวน 13 หลัก)"
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
                        {/* <View style={{ flexDirection: 'row', marginTop: 2 }}>
                          <Text
                            style={{
                              fontSize: 10,
                              marginLeft: 5,
                              color: '#CC4344',
                              marginRight: 20,
                            }}
                          >
                            โปรดตรวจสอบเลขบัตรประจำตัวประชาชนให้ถูกต้องก่อนยืนยันการสมัคร
                          </Text>
                        </View> */}
                        <Text
                          style={{
                            fontSize: 11,
                            color: 'gray',
                            marginLeft: 5,
                          }}
                        ></Text>
                        {touched.email && errors.email && (
                          <Text
                            style={{
                              fontSize: 10,
                              color: '#CC4344',
                              marginLeft: 5,
                            }}
                          >
                            {errors.email}
                            {/* กรุณากรอกเลขบัตรประชาชนที่ถูกต้อง */}
                          </Text>
                        )}
                        <Text style={{ fontSize: 18 }}>
                          ชื่อ-นามสกุล{' '}
                          <Text style={{ color: '#CC4344' }}>*</Text>
                          <Text style={{ fontSize: 13, color: '#5E5E5E' }}>
                            {' '}
                            (ตามบัตรประจำตัวประชาชน)
                          </Text>
                        </Text>
                        <TextInput
                          value={values.firstname}
                          onChangeText={handleChange('firstname')}
                          onBlur={handleBlur('firstname')}
                          placeholder="ชื่อ (ภาษาไทย)"
                          placeholderTextColor="#7c7b7b"
                          style={[
                            styles.textInput,
                            {
                              fontSize: 18,
                              padding: 10,
                              width: '100%',
                              marginBottom: 8,
                              alignSelf: 'center',
                              borderColor: '#CCCCCC',
                              borderRadius: 12,
                              borderWidth: 1,
                            },
                          ]}
                        />
                        <TextInput
                          value={values.lastname}
                          onChangeText={handleChange('lastname')}
                          onBlur={handleBlur('lastname')}
                          placeholder="นามสกุล (ภาษาไทย)"
                          placeholderTextColor="#7c7b7b"
                          style={[
                            styles.textInput,
                            {
                              fontSize: 18,
                              padding: 10,
                              width: '100%',
                              marginTop: -1,
                              marginBottom: 2,
                              alignSelf: 'center',
                              borderColor: '#CCCCCC',
                              borderRadius: 12,
                              borderWidth: 1,
                            },
                          ]}
                        />
                        <View style={{ flexDirection: 'row', marginTop: 2 }}>
                          <Text
                            style={{
                              fontSize: 10,
                              marginLeft: 5,
                              color: '#CC4344',
                              marginRight: 20,
                            }}
                          >
                            โปรดตรวจสอบชื่อ-นามสกุลให้ถูกต้องก่อนยืนยันการสมัคร
                          </Text>
                        </View>
                        {touched.firstname && errors.firstname && (
                          <Text
                            style={{
                              fontSize: 10,
                              color: '#CC4344',
                            }}
                          >
                            กรุณากรอกชื่อ - นามสกุลให้ถูกต้อง
                          </Text>
                        )}
                        <View style={{ marginTop: 18 }}>
                          <Text style={{ fontSize: 18 }}>เพศ</Text>

                          <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{
                              width: '80%',
                            }}
                            defaultValue="male"
                            selectedValue={values.gender}
                            onValueChange={handleChange('gender')}
                          >
                            <Picker.Item label="ชาย" value="male" />
                            <Picker.Item label="หญิง" value="female" />
                          </Picker>
                        </View>
                        <View>
                          <Text
                            style={{
                              fontSize: 18,
                              marginTop: 20,
                              marginLeft: 5,
                            }}
                          >
                            วัน เดือน ปีเกิด{' '}
                            <Text style={{ color: '#CC4344' }}>*</Text>
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                            }}
                          >
                            <TextInput
                              keyboardType="number-pad"
                              placeholder="วัน"
                              placeholderTextColor="#7c7b7b"
                              keyboardType={'numeric'}
                              value={values.day}
                              onChangeText={handleChange('day')}
                              onBlur={handleBlur('day')}
                              style={[
                                {
                                  fontSize: 18,
                                  width: '20%',
                                  marginBottom: -1,
                                  borderColor: '#CCCCCC',
                                  backgroundColor: 'white',
                                  borderTopWidth: 1,
                                  borderBottomWidth: 1,
                                  marginTop: 10,
                                  borderRadius: 5,
                                  textAlign: 'center',
                                },
                              ]}
                            />
                            <TextInput
                              keyboardType="number-pad"
                              placeholder="เดือน"
                              placeholderTextColor="#7c7b7b"
                              keyboardType={'numeric'}
                              value={values.month}
                              onChangeText={handleChange('month')}
                              onBlur={handleBlur('month')}
                              style={[
                                styles.textInput,
                                {
                                  fontSize: 18,
                                  width: '20%',
                                  marginLeft: 10,
                                  marginBottom: -1,
                                  borderColor: '#CCCCCC',
                                  borderTopWidth: 1,
                                  borderBottomWidth: 1,
                                  borderRadius: 5,
                                  marginTop: 10,
                                  textAlign: 'center',
                                },
                              ]}
                            />
                            <TextInput
                              keyboardType="number-pad"
                              placeholder="ปี พ.ศ."
                              placeholderTextColor="#7c7b7b"
                              keyboardType={'numeric'}
                              value={values.year}
                              onChangeText={handleChange('year')}
                              onBlur={handleBlur('year')}
                              style={[
                                styles.textInput,
                                {
                                  fontSize: 18,
                                  width: '30%',
                                  marginLeft: 10,
                                  marginBottom: -1,
                                  borderColor: '#CCCCCC',
                                  borderTopWidth: 1,
                                  borderBottomWidth: 1,
                                  marginTop: 10,
                                  borderRadius: 5,
                                  textAlign: 'center',
                                },
                              ]}
                            />
                          </View>
                          {touched.day && errors.day && (
                            <Text style={{ fontSize: 10, color: '#CC4344' }}>
                              {errors.day}
                            </Text>
                          )}
                          {touched.month && errors.month && (
                            <Text style={{ fontSize: 10, color: '#CC4344' }}>
                              {errors.month}
                            </Text>
                          )}
                          {touched.year && errors.year && (
                            <Text style={{ fontSize: 10, color: '#CC4344' }}>
                              {errors.year}
                            </Text>
                          )}
                        </View>

                        <View style={{ marginBottom: 2 }} />

                        <Text
                          style={{
                            fontSize: 18,
                            marginTop: 20,
                          }}
                        >
                          หมายเลขโทรศัพท์ที่ติดต่อได้{' '}
                          <Text style={{ color: '#CC4344' }}>*</Text>
                        </Text>
                        <Text style={{ fontSize: 13, color: '#5E5E5E' }}>
                          {' '}
                          (เบอร์โทรศัพท์ที่ใช้ในปัจจุบัน)
                        </Text>
                        <TextInput
                          keyboardType="number-pad"
                          value={values.number}
                          onChangeText={handleChange('number')}
                          onBlur={handleBlur('number')}
                          placeholder="หมายเลขโทรศัพท์ (จำนวน 10 หลัก)"
                          placeholderTextColor="#7c7b7b"
                          style={[
                            styles.textInput,
                            {
                              fontSize: 18,
                              padding: 10,
                              width: '100%',
                              marginBottom: 8,
                              alignSelf: 'center',
                              borderColor: '#CCCCCC',
                              borderRadius: 12,
                              borderWidth: 1,
                            },
                          ]}
                        />
                        {touched.number && errors.number && (
                          <Text
                            style={{
                              fontSize: 10,
                              color: '#CC4344',
                              marginLeft: 5,
                            }}
                          >
                            กรุณากรอกเบอร์มือถือที่ถูกต้อง
                          </Text>
                        )}
                        <View style={{ marginBottom: 2 }} />

                        <Text
                          style={{
                            fontSize: 18,
                            marginTop: 20,
                          }}
                        >
                          ตั้งรหัสผ่าน
                          <Text style={{ color: '#CC4344' }}>*</Text>
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
                            placeholder="รหัสผ่าน"
                            placeholderTextColor="#7c7b7b"
                            onBlur={handleBlur('password')}
                            secureTextEntry={securePassword}
                            style={[
                              styles.textInput,
                              {
                                fontSize: 18,
                                padding: 10,
                                width: '100%',
                                marginBottom: 8,
                                alignSelf: 'center',
                                borderColor: '#CCCCCC',
                                borderRadius: 12,
                                borderWidth: 1,
                              },
                            ]}
                          />
                          <TouchableOpacity
                            style={{
                              position: 'absolute',
                              right: 10,
                              top: 25,
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
                            placeholder="กรอกรหัสผ่านซ้ำอีกครั้ง"
                            placeholderTextColor="#7c7b7b"
                            onBlur={handleBlur('confirmpassword')}
                            secureTextEntry={secureConfirmPassword}
                            style={[
                              styles.textInput,
                              {
                                fontSize: 18,
                                padding: 10,
                                width: '100%',
                                marginBottom: 8,
                                alignSelf: 'center',
                                borderColor: '#CCCCCC',
                                borderRadius: 12,
                                borderWidth: 1,
                              },
                            ]}
                          />
                          <TouchableOpacity
                            style={{
                              position: 'absolute',
                              right: 10,
                              top: 25,
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
                        {/*End add check Password*/}
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
                        {/* {touched.confirmpassword && errors.confirmpassword && (
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#CC4344',
                              marginLeft: 5,
                            }}
                          >
                            กรุณากรอกข้อมูลรหัสผ่าน
                          </Text>
                        )} */}
                        <View style={{ marginBottom: 30 }} />
                        <View
                          style={{
                            marginHorizontal: 0,
                            marginTop: 20,
                            marginBottom: 60,
                          }}
                        >
                          <TouchableOpacity
                            full
                            disabled={
                              errors.email !== undefined ||
                              errors.firstname !== undefined ||
                              errors.lastname !== undefined ||
                              errors.day !== undefined ||
                              errors.month !== undefined ||
                              errors.year !== undefined ||
                              errors.number !== undefined ||
                              errors.password !== undefined ||
                              errors.confirmpassword !== undefined ||
                              values.email === '' ||
                              values.firstname === '' ||
                              values.lastname === '' ||
                              values.day === '' ||
                              values.month === '' ||
                              values.year === '' ||
                              values.number === '' ||
                              values.number.length === 0 ||
                              values.password === '' ||
                              values.confirmpassword === '' ||
                              values.password !== values.confirmpassword ||
                              values.password.length < 5 ||
                              values.confirmpassword.length < 5
                            }
                            style={{
                              borderRadius: 20,
                              backgroundColor: handleStyleButton(
                                values,
                                errors,
                              ),
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
                              ดำเนินการต่อ
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    </View>
                  </Fragment>
                )}
              </Formik>
            </ScrollView>
          </KeyboardAvoidingView>

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={complicanceModal}
              onRequestClose={() => {
                navigation.navigate('Home');
              }}
            >
              <ScrollView>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalComplianceTitle}>
                      ข้อกําหนดและเงื่อนไขการใช้บริการ vajira@home
                    </Text>
                    <Text style={{ fontSize: 12 }}>{text}</Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: 15,
                        marginVertical: 30,
                      }}
                    >
                      <CheckBox
                        style={{
                          width: 30,
                          height: 30,
                        }}
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={newValue => setToggleCheckBox(newValue)}
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          marginHorizontal: 10,
                          marginRight: 30,
                        }}
                      >
                        ข้าพเจ้ายอมรับข้อกำหนดและเงื่อนไขการใช้บริการนี้
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={{
                        ...styles.openButton,
                        backgroundColor: toggleCheckBox ? '#0A8C5C' : 'grey',
                        marginTop: 20,
                        padding: 20,
                      }}
                      disabled={!toggleCheckBox}
                      onPress={() => setComplicanceModal(false)}
                    >
                      <Text style={[styles.textStyle, { fontSize: 16 }]}>
                        สมัครเข้าใช้ระบบ
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </Modal>
          </View>
        </>
      ) : (
        <View />
      )}

      {registerStep === 1 ? (
        <ScrollView>
          <View style={styles.contain}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 2, flexDirection: 'column' }}>
                <Text
                  bold
                  style={{
                    textAlign: 'left',
                    color: '#000',
                    fontSize: 20,
                  }}
                >
                  ขั้นตอนที่ 3:
                </Text>
                <Text
                  style={{
                    textAlign: 'left',
                    color: '#585858',
                    fontSize: 18,
                  }}
                >
                  ถ่ายภาพตัวท่านคู่กับด้านหน้าบัตรประชาชนเพื่อยืนยันตัวตน
                </Text>
              </View>
              <ProgressCircle
                percent={75}
                radius={30}
                borderWidth={7}
                color="#1DAF0C"
                shadowColor="#E5E5E5"
                bgColor="#F5F5F5"
              >
                <Text style={{ fontSize: 15 }}>{'3/4'}</Text>
              </ProgressCircle>
            </View>

            <View style={styles.imageContainer}>
              <View
                style={{
                  flexGrow: 1,
                }}
              >
                <View
                  style={{
                    marginBottom: 0,
                    paddingHorizontal: 0,
                    marginTop: 0,
                    paddingVertical: 10,
                    marginHorizontal: 10,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={Images.kycCard1}
                    style={{
                      width: '100%',
                      height: 230,
                      paddingHorizontal: 10,
                    }}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                marginBottom: 90,
                paddingHorizontal: 20,
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: '#535353',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: 15,
                  marginTop: 10,
                }}
              >
                กรุณาถ่ายภาพตัวท่านคู่กับด้านหน้าบัตรประชาชน
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#585858',
                  textAlign: 'center',
                  marginBottom: 16,
                }}
              >
                เจ้าหน้าที่โรงพยาบาลจะตรวจสอบภาพของท่าน
                เพื่อยืนยันตัวตนและเชื่อมโยงข้อมูลเข้าสู่ระบบ
              </Text>
              <TouchableOpacity
                style={[
                  styles.selectButton,
                  styles.addShadow,
                  { backgroundColor: '#09B678' },
                ]}
                onPress={() => setRegisterStep(2)}
              >
                <Icon name="camera" style={{ fontSize: 30, color: 'white' }} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View />
      )}

      {registerStep === 2 ? (
        <CameraPicture onTakePicture={handleSetPicture} />
      ) : (
        <View />
      )}

      {registerStep === 3 ? (
        <ImageBackground style={{ flex: 1 }} source={{ uri: photoImage }}>
          <View
            style={{ width: '85%', height: 10, backgroundColor: '#284F30' }}
          />

          <TouchableOpacity
            style={[styles.addShadow, styles.backStepButton]}
            onPress={() => setRegisterStep(2)}
          >
            <Icon
              name="chevron-left"
              style={{ fontSize: 30, alignSelf: 'center' }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setRegisterStep(4)}
            style={[
              styles.addShadow,
              styles.takePhotoButton,
              { backgroundColor: '#09B678' },
            ]}
          >
            <Icon
              name="check-circle"
              style={{ color: '#fff', fontSize: 30, alignSelf: 'center' }}
            />
          </TouchableOpacity>
        </ImageBackground>
      ) : (
        <View />
      )}

      {registerStep === 4 ? (
        <>
          <ScrollView>
            <View style={styles.contain}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 2, flexDirection: 'column' }}>
                  <Text
                    bold
                    style={{
                      textAlign: 'left',
                      color: '#000',
                      fontSize: 20,
                    }}
                  >
                    ขั้นตอนที่ 4:
                  </Text>
                  <Text
                    style={{
                      textAlign: 'left',
                      color: '#585858',
                      fontSize: 18,
                    }}
                  >
                    ถ่ายภาพด้านหน้าบัตรประชาชนของท่าน
                  </Text>
                </View>
                <ProgressCircle
                  percent={100}
                  radius={30}
                  borderWidth={7}
                  color="#1DAF0C"
                  shadowColor="#E5E5E5"
                  bgColor="#F5F5F5"
                >
                  <Text style={{ fontSize: 15 }}>{'4/4'}</Text>
                </ProgressCircle>
              </View>

              <View style={styles.imageContainer}>
                <View
                  style={{
                    flexGrow: 1,
                  }}
                >
                  <View
                    style={{
                      marginBottom: 0,
                      paddingHorizontal: 0,
                      marginTop: 0,
                      paddingVertical: 10,
                      marginHorizontal: 10,
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      source={Images.kycCard2}
                      style={{
                        width: '100%',
                        height: 230,
                        paddingHorizontal: 10,
                      }}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginBottom: 180,
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: '#535353',
                    textAlign: 'center',
                    marginBottom: 10,
                  }}
                >
                  กรุณาถ่ายภาพ{' '}
                  <Text style={{ fontWeight: 'bold' }}>"ด้านหน้า"</Text>{' '}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#535353',
                    textAlign: 'center',
                    marginBottom: 20,
                  }}
                >
                  บัตรประชาชนของท่าน
                </Text>
                <TouchableOpacity
                  style={[
                    styles.selectButton,
                    styles.addShadow,
                    { backgroundColor: '#09B678' },
                  ]}
                  onPress={() => setRegisterStep(5)}
                >
                  <Icon name="camera" style={{ fontSize: 30, color: '#fff' }} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      ) : (
        <View />
      )}

      {registerStep === 5 ? (
        <CameraPicture
          takeIdCard={true}
          onTakePicture={handleSetPictureIdCard}
        />
      ) : (
        <View />
      )}

      {registerStep === 6 ? (
        <ImageBackground style={{ flex: 1 }} source={{ uri: photoImageIdCard }}>
          <View
            style={{ width: '92%', height: 10, backgroundColor: '#284F30' }}
          />

          <TouchableOpacity
            style={[styles.addShadow, styles.backStepButton]}
            onPress={() => setRegisterStep(5)}
          >
            <Icon
              name="chevron-left"
              style={{ fontSize: 30, alignSelf: 'center' }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setRegisterStep(7)}
            style={[
              styles.addShadow,
              styles.takePhotoButton,
              { backgroundColor: '#09B678' },
            ]}
          >
            <Icon
              name="check-circle"
              style={{ color: '#fff', fontSize: 30, alignSelf: 'center' }}
            />
          </TouchableOpacity>
        </ImageBackground>
      ) : (
        <View />
      )}

      {registerStep === 8 ? (
        <ScrollView>
          <View style={{ marginTop: 30 }}>
            <View style={{ padding: 20 }}>
              <VajiraCard
                imgSrc={Images.freeChat}
                // titleTextSmall={'โรงพยาบาลวชิรพยาบาล'}
                smallTextColor="#284F30"
                // titleText={'Vajira @ Home'}
                // bodyText={'ขอขอบคุณที่ท่านเข้ามาใช้บริการ'}
                searchUrl="Bangkok"
                buttonText=""
                color="#484848"
                bodyColor="#5a5a5a"
                textColor="#284F30"
                position="52%"
              />
            </View>
            <View
              style={{
                marginBottom: 10,
                paddingHorizontal: 20,
                marginTop: 0,
                paddingVertical: 30,
              }}
            ></View>
          </View>
          <View
            style={{
              width: '90%',
              marginHorizontal: 20,
              marginTop: 50,
              marginBottom: 50,
            }}
          >
            <LinearGradient
              colors={['#0DA36D', '#0A7C53', '#086C48']}
              style={styles.signInGradient}
            >
              <TouchableOpacity
                full
                disabled={loading}
                onPress={() => navigation.navigate('SignIn2')}
                style={{
                  borderRadius: 12,
                  width: '100%',
                  paddingHorizontal: 20,
                  paddingVertical: 15,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    alignSelf: 'center',
                    textAlign: 'center',
                    fontSize: 20,
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                  }}
                >
                  ไปยังหน้าล๊อกอิน
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      ) : (
        <View />
      )}
      {/* </View> */}
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
    // teleActions: bindActionCreators(AuthTeleActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistation);
