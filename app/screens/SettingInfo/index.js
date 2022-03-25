import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Picker,
  ActivityIndicator,
  Dimensions,
  LogBox,
  Platform,
} from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import storage from '@react-native-firebase/storage';
import Lightbox from 'react-native-lightbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserActions } from '@actions';
import axios from 'axios';
import { getAccessToken } from '@utils/asyncStorage';
import config from '@_config';
import LinearGradient from 'react-native-linear-gradient';
import { BaseStyle, Images } from '@config';
import { Header, SafeAreaView, Icon, Image } from '@components';
import moment from 'moment';
import * as Yup from 'yup';
import raw from '@assets/raw_database.json';
import { uniq } from 'lodash';
import styles from './styles';
import CameraPicture from '../UserRegistation/CameraPicture';
import style from '../Logistic/style';

const { width, height } = Dimensions.get('window');
const env = process.env.NODE_ENV;

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

function SettingInfo({ navigation, user, userTele, actions }) {
  const uniqRaw = uniq(raw.map(r => r.province));
  const [successModal, setSuccessModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [genderModal, setGenderModal] = useState(false);
  const [birthDateModal, setBirthDateModal] = useState(false);
  const [failModal, setFailModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('-');
  const [genderError, setGenderError] = useState(false);
  const [showBirthDate, setShowBirthDate] = useState('-');
  const [birthDate, setBirthDate] = useState('-');
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [newAddressNo, setNewAddressNo] = useState('');
  const [provinces, setProvinces] = useState(uniqRaw);
  const [amphoes, setAmphoes] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [newAmphoe, setNewAmphoe] = useState('');
  const [newDistrict, setNewDistrict] = useState('');
  const [newProvince, setNewProvince] = useState('');
  const [newPostalCode, setNewPostalCode] = useState('');
  const [addressNoError, setAddressNoError] = useState(false);
  const [provinceError, setProvinceError] = useState(false);
  const [postalCodeError, setpostalCodeError] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState(false);

  const [kycId, setKycId] = useState(0);
  const [kyc1, setKyc1] = useState(null);
  const [kyc2, setKyc2] = useState(null);

  const [showSample1, setShowSample1] = useState(false);
  const [showSample2, setShowSample2] = useState(false);

  const [kyc1Taken, setKyc1Taken] = useState(false);
  const [kyc2Taken, setKyc2Taken] = useState(false);

  const [upload, setUpload] = useState(false);
  const [takePicture1, setTakePicture1] = useState(false);
  const [takePicture2, setTakePicture2] = useState(false);

  useEffect(() => {
    const retrieveKyc = async () => {
      const ACCESS_TOKEN = await getAccessToken();

      try {
        const { data } = await axios.get(
          `${config.apiUrl}/kycPatientImages?filter[where][patientId]=${user.data.userInformation.userId}&access_token=${ACCESS_TOKEN.id}`,
        );

        setKycId(data[0].id);
        setKyc1(data[0].image);
        setKyc2(data[0].cIdImage);

        return data;
      } catch (error) {
        console.log('error retriving kyc images', error);
      }
    };

    retrieveKyc();
  }, []);

  useEffect(() => {
    //   console.log('effect....');

    setFirstName(user.data.userInformation.firstname);
    setLastName(user.data.userInformation.lastname);
    if (user.data.userInformation.gender !== null) {
      setGender(user.data.userInformation.gender);
    }

    setBirthDate(user?.data?.userInformation?.birthDate);
    setShowBirthDate(
      moment(new Date(user?.data?.userInformation?.birthDate)).format(
        'DD MMMM YYYY',
      ),
    );

    setNewAddressNo(user.data.userInformation.address.address);
    setMobileNumber(user.data.userInformation.mobileNumber);

    setNewProvince(user.data.userInformation.address.province);
    // setNewAmphoe(user.data.userInformation.address.area);
    // setNewDistrict(user.data.userInformation.address.address2);

    let filterProvinces = raw.filter(
      r => r.province === user.data.userInformation.address.province,
    );

    if (filterProvinces.length === 0) {
      filterProvinces = raw.filter(r => r.province === uniqRaw[0]);
    }

    let uniqAmphoes = uniq(
      filterProvinces.map(filterProvince => filterProvince.amphoe),
    );
    setAmphoes(uniqAmphoes);
    setNewAmphoe(user.data.userInformation.address.area);

    let filterAreas = raw.filter(
      r => r.amphoe === user.data.userInformation.address.area,
    );

    if (filterAreas.length === 0) {
      filterAreas = raw.filter(r => r.amphoe === uniqAmphoes[0]);
    }

    let uniqDistricts = uniq(
      filterAreas.map(filterArea => filterArea.district),
    );
    setDistricts(uniqDistricts);
    setNewDistrict(user.data.userInformation.address.address2);

    let filterDistricts = raw.filter(
      r => r.district === user.data.userInformation.address.address2,
    );

    if (filterDistricts.length === 0) {
      filterDistricts = raw.filter(r => r.district === uniqDistricts[0]);
    }

    let uniqZipcodes = uniq(
      filterDistricts.map(filterDistrict => filterDistrict.zipcode),
    );

    user?.data?.userInformation?.address?.postalCode
      ? setNewPostalCode(user?.data?.userInformation?.address?.postalCode)
      : setNewPostalCode(uniqZipcodes[0].toString());
  }, []);

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

  const fetchInfo = async () => {
    try {
      await actions.getUpdateInfo();
      //   console.log('update info successfully!!!! ...');
    } catch (error) {
      console.log('Error fetching Info', error);
    }
  };

  const checkGender = () => {
    if (gender !== '-') {
      setGenderError(false);
      setGenderModal(false);
    } else {
      setGenderError(true);
    }
  };

  const checkName = () => {
    if (firstName.length > 0 && lastName.length > 0) {
      setFirstNameError(false);
      setLastNameError(false);
      setEditModal(false);
    } else if (firstName.length === 0 && lastName.length === 0) {
      setFirstNameError(true);
      setLastNameError(true);
    } else if (firstName.length === 0) {
      setFirstNameError(true);
      setLastNameError(false);
    } else if (lastName.length === 0) {
      setLastNameError(true);
      setFirstNameError(false);
    }
  };

  const checkBeforeSubmit = () => {
    if (
      newAddressNo.length > 0 &&
      newProvince.length > 0 &&
      newPostalCode.length === 5 &&
      mobileNumber.length === 10
    ) {
      setAddressNoError(false);
      setProvinceError(false);
      setpostalCodeError(false);
      setMobileNumberError(false);
      updateInfo();
    } else if (
      newAddressNo.length === 0 &&
      newProvince.length === 0 &&
      newPostalCode.length !== 5 &&
      mobileNumber.length !== 10
    ) {
      setAddressNoError(true);
      setProvinceError(true);
      setpostalCodeError(true);
      setMobileNumberError(true);
    } else if (
      newAddressNo.length === 0 &&
      newPostalCode.length !== 5 &&
      mobileNumber.length !== 10
    ) {
      setAddressNoError(true);
      setMobileNumberError(true);
      setpostalCodeError(true);
      setProvinceError(false);
    } else if (mobileNumber.length !== 10 && newPostalCode.length !== 5) {
      setpostalCodeError(true);
      setMobileNumberError(true);
      setAddressNoError(false);
      setProvinceError(false);
    } else if (newAddressNo.length === 0 && newPostalCode.length !== 5) {
      setAddressNoError(true);
      setpostalCodeError(true);
      setMobileNumberError(false);
      setProvinceError(false);
    } else if (newAddressNo.length === 0 && mobileNumber.length !== 10) {
      setAddressNoError(true);
      setMobileNumberError(true);
      setpostalCodeError(false);
      setProvinceError(false);
    } else if (newAddressNo.length === 0) {
      setProvinceError(false);
      setMobileNumberError(false);
      setpostalCodeError(false);
      setAddressNoError(true);
    } else if (newProvince.length === 0) {
      setAddressNoError(false);
      setMobileNumberError(false);
      setpostalCodeError(false);
      setProvinceError(true);
    } else if (newPostalCode.length !== 5) {
      setAddressNoError(false);
      setMobileNumberError(false);
      setProvinceError(false);
      setpostalCodeError(true);
    } else if (mobileNumber.length !== 10) {
      setAddressNoError(false);
      setProvinceError(false);
      setpostalCodeError(false);
      setMobileNumberError(true);
    }
  };

  const updateInfo = async () => {
    const ACCESS_TOKEN = await getAccessToken();

    try {
      await axios.patch(
        `${config.apiUrl}/UserInfos/${user.data.userInformation.id}?access_token=${ACCESS_TOKEN.id}`,
        {
          mobileNumber: mobileNumber,
          firstname: firstName,
          lastname: lastName,
          gender: gender,
          birthDate: birthDate,
          address: {
            address: newAddressNo,
            address2: newDistrict,
            area: newAmphoe,
            province: newProvince,
            postalCode: newPostalCode,
          },
        },
      );

      if (kyc1Taken || kyc2Taken) {
        await uploadImageToPatient();
      }

      setSuccessModal(true);
      await fetchInfo();
    } catch (error) {
      setFailModal(true);
      console.log('Error From updateInfo', error);
    }
  };

  const setBirthDateData = values => {
    // date won't work without leading 0 in a single digit value like 4
    var combined = `${values.year}-${('0' + values.month).slice(-2)}-${(
      '0' + values.day
    ).slice(-2)}`;

    setBirthDate(moment(new Date(combined)).format());
    setShowBirthDate(moment(new Date(combined)).format('DD MMMM YYYY'));
    calculateAge();
    setBirthDateModal(false);
  };

  function calculateAge() {
    var ageDifMs = Date.now() - new Date(birthDate).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return 543 - Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const handleSetPicture1 = data => {
    setTakePicture1(false);
    setKyc1(data.uri);
    setKyc1Taken(true);
    setShowSample1(true);
  };

  const handleSetPicture2 = data => {
    setTakePicture2(false);
    setKyc2(data.uri);
    setKyc2Taken(true);
    setShowSample2(true);
  };

  // console.log('kyc1');
  // console.log(kyc1);
  // console.log('kyc2');
  // console.log(kyc2);

  // disbaled warning logs caused by the 3rd party lib
  // LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreLogs(['Animated.event']);
  LogBox.ignoreLogs(['Animated']);

  // LogBox.ignoreAllLogs();

  const uploadFaceImage = async () => {
    setUpload(true);

    const filename = kyc1.substring(kyc1.lastIndexOf('/') + 1);
    const uploadUri =
      Platform.OS === 'ios' ? kyc1.replace('file://', '') : kyc1;

    const ext = kyc1.split('.').pop(); // Extract image extension
    const name = `${user.data.userInformation.firstname}-${user.data.userInformation.lastname}-${user.data.userInformation.cId}`;
    const filename1 = `${name}-selfie.${ext}-${Date.now()}`; // Generate unique name
    await storage()
      .ref(`/patient-kyc/${env}/${filename1}`)
      .putFile(uploadUri);
    const imageUpload = await storage()
      .ref(`/patient-kyc/${env}/${filename1}`)
      .getDownloadURL();

    setUpload(false);
    return imageUpload;
  };

  const uploadCidImage = async () => {
    setUpload(true);

    const filenameIdCard = kyc2.substring(kyc2.lastIndexOf('/') + 1);
    const uploadUriIdCard =
      Platform.OS === 'ios' ? kyc2.replace('file://', '') : kyc2;

    const ext2 = kyc2.split('.').pop(); // Extract image extension
    const name = `${user.data.userInformation.firstname}-${user.data.userInformation.lastname}-${user.data.userInformation.cId}`;
    const filename2 = `${name}-card.${ext2}-${Date.now()}`; // Generate unique name
    await storage()
      .ref(`/patient-kyc/${env}/${filename2}`)
      .putFile(uploadUriIdCard);
    const imageCid = await storage()
      .ref(`/patient-kyc/${env}/${filename2}`)
      .getDownloadURL();

    setUpload(false);
    return imageCid;
  };

  const uploadImageToPatient = async () => {
    setUpload(true);

    let faceImage = null;
    let cIdImage = null;

    if (kyc1Taken) faceImage = await uploadFaceImage();
    if (kyc2Taken) cIdImage = await uploadCidImage();

    let data = null;

    if (faceImage !== null && cIdImage !== null) {
      data = {
        id: kycId,
        image: faceImage,
        cIdImage: cIdImage,
      };
    } else if (faceImage !== null) {
      data = {
        id: kycId,
        image: faceImage,
      };
    } else if (cIdImage !== null) {
      data = {
        id: kycId,
        cIdImage: cIdImage,
      };
    }

    try {
      await axios.patch(`${config.apiUrl}/kycPatientImages`, data);
      setUpload(false);
    } catch (error) {
      setUpload(false);
      setFailModal(true);
      console.log('Error From updating kyc image', error);
    }
  };

  if (takePicture1) {
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        <Header
          title="ข้อมูลส่วนบุคคล"
          textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
          renderLeft={() => {
            return <Icon bold name="chevron-left" size={20} color="#fff" />;
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <CameraPicture onTakePicture={handleSetPicture1} />
      </SafeAreaView>
    );
  }

  if (takePicture2) {
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        <Header
          title="ข้อมูลส่วนบุคคล"
          textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
          renderLeft={() => {
            return <Icon bold name="chevron-left" size={20} color="#fff" />;
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <CameraPicture onTakePicture={handleSetPicture2} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : ''}
        style={styles.container}
      >
        <Header
          title="ข้อมูลส่วนบุคคล"
          textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
          renderLeft={() => {
            return <Icon bold name="chevron-left" size={20} color="#fff" />;
          }}
          onPressLeft={() => (upload ? null : navigation.goBack())}
        />
        {/* <View style={styles.container}> */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.topCard}>
            {user?.data?.HIEimage ? (
              <Image
                style={styles.profile}
                source={{
                  uri: `data:image/png;base64,${user?.data?.HIEimage}`,
                }}
              />
            ) : (
              <Image style={styles.profile} source={Images.avata2} />
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setEditModal(true)}
              >
                <Icon name="edit" />
              </TouchableOpacity>
              <Text style={styles.name}>
                {firstName} {lastName}
              </Text>
            </View>
          </View>
          <View style={styles.bottomCard}>
            <View style={styles.category}>
              <View>
                <Text style={styles.cText}>เลขบัตรประจำตัวประชาชน</Text>
                <Text style={styles.cText2}>
                  {user?.data?.userInformation?.cId ?? '-'}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setGenderModal(true)}
                  >
                    <Icon name="edit" style={styles.editIcon} />
                  </TouchableOpacity>
                  <Text style={styles.cText}>เพศ</Text>
                </View>
                {gender === 'male' ? (
                  <Text style={styles.cText2}>ชาย</Text>
                ) : gender === 'female' ? (
                  <Text style={styles.cText2}>หญิง</Text>
                ) : (
                  <Text style={styles.cText2}>{gender}</Text>
                )}
              </View>
            </View>
            <View style={styles.category}>
              <View style={{ alignItems: 'flex-start' }}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setBirthDateModal(true)}
                  >
                    <Icon name="edit" />
                  </TouchableOpacity>
                  <Text style={styles.cText}>วัน เดือน ปี (พ.ศ.) เกิด</Text>
                </View>
                <Text style={styles.cText2}>{showBirthDate}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.cText}>อายุ</Text>
                <Text style={styles.cText2}>
                  {/* {user?.data?.userInformation?.age ?? '-'} */}
                  {calculateAge()} ปี
                </Text>
              </View>
            </View>

            <View style={styles.dataContainer}>
              <View style={styles.formLabel}>
                <Text style={styles.cText}>หมายเลขโทรศัพท์ที่ติดต่อได้</Text>
                <Text style={[styles.cText, { fontSize: 12 }]}>
                  *(เบอร์โทรศัพท์ที่ใช้ในปัจจุบัน)
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TextInput
                  keyboardType="numeric"
                  maxLength={10}
                  placeholderTextColor="#6e6969"
                  // placeholder={user.data.userInformation.mobileNumber}
                  style={{
                    fontSize: 18,
                    color: '#0c0c0c',
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    borderColor: '#c0c0c0',
                    borderWidth: 1,
                    padding: 15,
                    marginVertical: 10,
                    marginRight: 20,
                  }}
                  onChangeText={setMobileNumber}
                  value={mobileNumber}
                  width="100%"
                />
              </View>
              {mobileNumberError && (
                <Text style={{ color: 'red' }}>
                  กรุณากรอกเบอร์มือถือที่ถูกต้อง
                </Text>
              )}

              <View style={styles.formLabel}>
                <Text style={styles.cText}>เลขที่ / ถนน / อาคาร</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TextInput
                  maxLength={300}
                  placeholderTextColor="#6e6969"
                  // placeholder="0"
                  style={{
                    fontSize: 18,
                    color: '#0c0c0c',
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    borderColor: '#c0c0c0',
                    borderWidth: 1,
                    padding: 15,
                    marginVertical: 10,
                    marginRight: 20,
                  }}
                  onChangeText={setNewAddressNo}
                  value={newAddressNo}
                  width="100%"
                />
              </View>
              {addressNoError && (
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
                  // enabled={false}
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
              <View style={styles.formLabel}>
                <Text style={styles.cText}>รหัสไปรษณีย์</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TextInput
                  minLength={5}
                  maxLength={5}
                  placeholderTextColor="#6e6969"
                  style={[
                    Platform.OS === 'android'
                      ? {
                          fontSize: 18,
                          color: '#0c0c0c',
                          paddingHorizontal: 10,
                        }
                      : {
                          fontSize: 18,
                          color: '#0c0c0c',
                          backgroundColor: '#fff',
                          borderRadius: 12,
                          borderColor: '#c0c0c0',
                          borderWidth: 1,
                          padding: 15,
                          marginVertical: 10,
                          marginRight: 20,
                        },
                  ]}
                  // editable={false}
                  onChangeText={text => setNewPostalCode(text)}
                  value={newPostalCode}
                  // defaultValue={user.data.userInformation.address.postalCode}
                  width="100%"
                />
              </View>

              {mobileNumberError && (
                <Text style={{ color: 'red' }}>
                  กรุณากรอกเบอร์มือถือที่ถูกต้อง
                </Text>
              )}

              {addressNoError && (
                <Text style={{ color: 'red' }}>
                  กรุณากรอกเลขที่ / ถนน / อาคาร
                </Text>
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

              {postalCodeError && (
                <Text style={{ color: 'red' }}>
                  กรุณากรอกรหัสไปรษณีย์ที่ถูกต้อง
                </Text>
              )}

              {kyc1 && kyc2 && (
                <View style={styles.kycContainer}>
                  <View
                    style={{
                      flex: 1,
                      width: width / 2,
                      height: 150,
                      borderRadius: 10,
                      margin: 4,
                    }}
                  >
                    <TouchableOpacity
                      style={{ marginBottom: 10 }}
                      activeOpacity={0.9}
                      onPress={() => setTakePicture1(true)}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Icon
                          name="edit"
                          style={{ marginLeft: 5, marginRight: 5 }}
                        />
                        <Text style={styles.cText}>ภาพคู่บัตรประชาชน</Text>
                      </View>
                    </TouchableOpacity>
                    <Lightbox
                      activeProps={{
                        style: {
                          width: width,
                          height: height,
                        },
                        resizeMode: 'contain',
                      }}
                      underlayColor="#E5E5E5"
                    >
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 10,
                          margin: 3,
                          resizeMode: 'contain',
                        }}
                        source={{
                          uri: kyc1,
                        }}
                      />
                    </Lightbox>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      width: width / 2,
                      height: 150,
                      borderRadius: 10,
                      margin: 4,
                    }}
                  >
                    <TouchableOpacity
                      style={{ marginBottom: 10 }}
                      activeOpacity={0.9}
                      onPress={() => setTakePicture2(true)}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Icon
                          name="edit"
                          style={{ marginLeft: 5, marginRight: 5 }}
                        />
                        <Text style={styles.cText}>ภาพบัตรประชาชน</Text>
                      </View>
                    </TouchableOpacity>
                    <Lightbox
                      activeProps={{
                        style: {
                          width: width,
                          height: height,
                        },
                        resizeMode: 'contain',
                      }}
                      underlayColor="#E5E5E5"
                    >
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 10,
                          margin: 3,
                          resizeMode: 'contain',
                        }}
                        source={{
                          uri: kyc2,
                        }}
                      />
                    </Lightbox>
                  </View>
                </View>
              )}

              <LinearGradient
                style={styles.add}
                colors={['#0A905F', '#095C3E']}
              >
                <TouchableOpacity
                  underlayColor="grey"
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  disabled={false}
                  onPress={() => (upload ? null : checkBeforeSubmit())}
                >
                  {upload ? (
                    <ActivityIndicator size="large" color="#fff" />
                  ) : (
                    <Text style={styles.buttonTextAdd}>บันทึก</Text>
                  )}
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>

          <KeyboardAwareScrollView>
            <Modal animationType="slide" transparent={true} visible={editModal}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={[styles.modalTitle, { color: '#095C3E' }]}>
                    แก้ไขชื่อ - สกุล
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <TextInput
                      placeholder="ชื่อ"
                      placeholderTextColor="#6e6969"
                      style={{
                        fontSize: 18,
                        color: '#0c0c0c',
                        backgroundColor: '#fff',
                        borderRadius: 12,
                        borderColor: '#c0c0c0',
                        borderWidth: 1,
                        padding: 15,
                        marginVertical: 10,
                        marginRight: 20,
                      }}
                      onChangeText={setFirstName}
                      value={firstName}
                      width="100%"
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <TextInput
                      placeholder="สกุล"
                      placeholderTextColor="#6e6969"
                      style={{
                        fontSize: 18,
                        color: '#0c0c0c',
                        backgroundColor: '#fff',
                        borderRadius: 12,
                        borderColor: '#c0c0c0',
                        borderWidth: 1,
                        padding: 15,
                        marginVertical: 10,
                        marginRight: 20,
                      }}
                      onChangeText={setLastName}
                      value={lastName}
                      width="100%"
                    />
                  </View>

                  {firstNameError && (
                    <Text style={{ color: 'red' }}>กรุณากรอกชื่อ</Text>
                  )}

                  {lastNameError && (
                    <Text style={{ color: 'red' }}>กรุณากรอกนามสกุล</Text>
                  )}

                  <Text style={{ color: '#095C3E', fontSize: 14 }}>
                    กรุณากดปุ่ม "บันทึก" ทุกครั้งเมื่อแก้ไขข้อมูล
                  </Text>

                  <View style={styles.modalButtonContainer}>
                    <LinearGradient
                      style={[styles.add, { marginBottom: 5 }]}
                      colors={['#0A905F', '#095C3E']}
                    >
                      <TouchableOpacity
                        style={{ width: '100%', alignItems: 'center' }}
                        disabled={false}
                        onPress={checkName}
                      >
                        <Text style={styles.buttonTextAdd}>ตกลง</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
              </View>
            </Modal>
          </KeyboardAwareScrollView>

          <Modal animationType="slide" transparent={true} visible={genderModal}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={[styles.modalTitle, { color: '#095C3E' }]}>
                  แก้ไขเพศ
                </Text>

                <TouchableOpacity
                  style={[
                    styles.activityBox,
                    gender === 'male' ? { backgroundColor: '#095C3E' } : null,
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {
                    setGender('male');
                  }}
                >
                  <Text
                    style={[
                      { textAlign: 'center', fontSize: 18 },
                      gender === 'male' ? { color: '#fff' } : null,
                    ]}
                  >
                    ชาย
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.activityBox,
                    { marginBottom: 10 },
                    gender === 'female' ? { backgroundColor: '#095C3E' } : null,
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {
                    setGender('female');
                  }}
                >
                  <Text
                    style={[
                      { textAlign: 'center', fontSize: 18 },
                      gender === 'female' ? { color: '#fff' } : null,
                    ]}
                  >
                    หญิง
                  </Text>
                </TouchableOpacity>

                {genderError && (
                  <Text style={{ color: 'red' }}>กรุณาเลือกเพศ</Text>
                )}

                <Text style={{ color: '#095C3E', fontSize: 14 }}>
                  กรุณากดปุ่ม "บันทึก" ทุกครั้งเมื่อแก้ไขข้อมูล
                </Text>

                <View style={styles.modalButtonContainer}>
                  <LinearGradient
                    style={[styles.add, { marginBottom: 5 }]}
                    colors={['#0A905F', '#095C3E']}
                  >
                    <TouchableOpacity
                      style={{ width: '100%', alignItems: 'center' }}
                      disabled={false}
                      onPress={checkGender}
                    >
                      <Text style={styles.buttonTextAdd}>ตกลง</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </Modal>

          <KeyboardAwareScrollView>
            <Modal
              animationType="slide"
              transparent={true}
              visible={birthDateModal}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={[styles.modalTitle, { color: '#095C3E' }]}>
                    แก้ไข วัน เดือน ปี (พ.ศ.) เกิด
                  </Text>
                  <Formik
                    initialValues={{
                      day: moment(new Date(birthDate)).format('DD') || '',
                      month: moment(new Date(birthDate)).format('MM') || '',
                      year: moment(new Date(birthDate)).format('YYYY') || '',
                    }}
                    onSubmit={async values => {
                      setBirthDateData(values);
                    }}
                    validationSchema={yup.object().shape({
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
                    })}
                  >
                    {({
                      values,
                      handleChange,
                      handleSubmit,
                      errors,
                      handleBlur,
                      touched,
                    }) => (
                      <View style={styles.contain}>
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                            }}
                          >
                            <TextInput
                              keyboardType="number-pad"
                              placeholder={moment(new Date(birthDate)).format(
                                'DD',
                              )}
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
                              placeholder={moment(new Date(birthDate)).format(
                                'MM',
                              )}
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
                              placeholder={moment(new Date(birthDate)).format(
                                'YYYY',
                              )}
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
                                  padding: 10,
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
                            color: '#095C3E',
                            fontSize: 14,
                            marginTop: 10,
                            textAlign: 'center',
                          }}
                        >
                          กรุณากดปุ่ม "บันทึก" ทุกครั้งเมื่อแก้ไขข้อมูล
                        </Text>

                        <LinearGradient
                          style={[styles.add, { marginBottom: 5 }]}
                          colors={['#0A905F', '#095C3E']}
                        >
                          <TouchableOpacity
                            full
                            disabled={
                              errors.day !== undefined ||
                              errors.month !== undefined ||
                              errors.year !== undefined ||
                              values.day === '' ||
                              values.month === '' ||
                              values.year === ''
                            }
                            style={{ width: '100%', alignItems: 'center' }}
                            onPress={handleSubmit}
                          >
                            <Text style={styles.buttonTextAdd}>ตกลง</Text>
                          </TouchableOpacity>
                        </LinearGradient>
                      </View>
                    )}
                  </Formik>
                </View>
              </View>
            </Modal>

            <Modal animationType="slide" transparent={true} visible={failModal}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Icon
                    name="times-circle"
                    size={100}
                    style={[styles.okIcon, { color: '#CC4344' }]}
                  />
                  <Text style={[styles.modalTitle, { color: '#CC4344' }]}>
                    เกิดข้อผิดพลาด
                  </Text>

                  <Text style={[styles.modalText, { color: '#000' }]}>
                    ไม่สามารถบันทึก
                  </Text>
                  <Text style={[styles.modalText, { color: '#000' }]}>
                    ได้ในขณะนี้
                  </Text>

                  <View style={styles.modalButtonContainer}>
                    <LinearGradient
                      style={[styles.add, { marginBottom: 5 }]}
                      colors={['#0A905F', '#095C3E']}
                    >
                      <TouchableOpacity
                        underlayColor="grey"
                        style={{ width: '100%', alignItems: 'center' }}
                        disabled={false}
                        onPress={() => {
                          setFailModal(false);
                        }}
                      >
                        <Text style={styles.buttonTextAdd}>ตกลง</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
              </View>
            </Modal>
          </KeyboardAwareScrollView>

          <Modal
            animationType="slide"
            transparent={true}
            visible={successModal}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Icon name="check-circle" size={100} style={styles.okIcon} />
                <Text style={[styles.modalTitle, { color: '#095C3E' }]}>
                  บันทึกเสร็จสิ้น
                </Text>

                <View style={styles.modalButtonContainer}>
                  <LinearGradient
                    style={[styles.add, { marginBottom: 5 }]}
                    colors={['#0A905F', '#095C3E']}
                  >
                    <TouchableOpacity
                      style={{ width: '100%', alignItems: 'center' }}
                      disabled={false}
                      onPress={() => {
                        setSuccessModal(false);
                        navigation.pop();
                      }}
                    >
                      <Text style={styles.buttonTextAdd}>ตกลง</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </Modal>

          <Modal animationType="slide" transparent={true} visible={showSample1}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  style={{
                    width: '100%',
                    height: height / 2,
                    borderRadius: 13,
                    margin: 3,
                    resizeMode: 'contain',
                  }}
                  source={{
                    uri: kyc1,
                  }}
                />
                <Text
                  style={[
                    styles.modalText,
                    { color: '#095C3E', marginTop: 10 },
                  ]}
                >
                  กดบันทึกทุกครั้งเมื่อแก้ไขข้อมูล
                </Text>
                <View style={styles.modalButtonContainer}>
                  <LinearGradient
                    style={[styles.add, { marginBottom: 5 }]}
                    colors={['#0A905F', '#095C3E']}
                  >
                    <TouchableOpacity
                      style={{ width: '100%', alignItems: 'center' }}
                      disabled={false}
                      onPress={() => {
                        setShowSample1(false);
                      }}
                    >
                      <Text style={styles.buttonTextAdd}>ตกลง</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </Modal>

          <Modal animationType="slide" transparent={true} visible={showSample2}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  style={{
                    width: '100%',
                    height: height / 2,
                    borderRadius: 13,
                    margin: 3,
                    resizeMode: 'contain',
                  }}
                  source={{
                    uri: kyc2,
                  }}
                />
                <Text
                  style={[
                    styles.modalText,
                    { color: '#095C3E', marginTop: 10 },
                  ]}
                >
                  กดบันทึกทุกครั้งเมื่อแก้ไขข้อมูล
                </Text>
                <View style={styles.modalButtonContainer}>
                  <LinearGradient
                    style={[styles.add, { marginBottom: 5 }]}
                    colors={['#0A905F', '#095C3E']}
                  >
                    <TouchableOpacity
                      style={{ width: '100%', alignItems: 'center' }}
                      disabled={false}
                      onPress={() => {
                        setShowSample2(false);
                      }}
                    >
                      <Text style={styles.buttonTextAdd}>ตกลง</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
        {/* </View> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
    userTele: state.userTele,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(UserActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingInfo);
