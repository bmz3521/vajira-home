import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Picker,
  Modal,
} from 'react-native';
import ErrorMessage from './ErrorMessage';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { Header, SafeAreaView, Icon, Image } from '@components';
import { BaseStyle, BaseColor, Images } from '@config';
import { connect } from 'react-redux';
import { getAccessToken } from '@utils/asyncStorage';
import config from '@_config';
import axios from 'axios';
import styles from './styles';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationGlucoseSchema = Yup.object().shape({
  value: Yup.number()
    .integer('กรุณาระบุค่าให้ถูกต้อง')
    .required('กรุณาระบุค่าน้ำตาล')
    .min(1, 'กรุณาระบุค่าน้ำตาล')
    .typeError('กรุณากรอกเลขเท่านั้น')
    .label('Value'),
});

const validationPressureSchema = Yup.object().shape({
  above: Yup.number()
    .required('กรุณาระบุค่าความดันโลหิตตัวบน')
    .integer('กรุณาระบุค่าให้ถูกต้อง')
    .min(1, 'กรุณาระบุค่าความดันโลหิตตัวบน')
    .typeError('กรุณากรอกเลขเท่านั้น')
    .label('ValueHigh'),
  below: Yup.number()
    .required('กรุณาระบุค่าความดันโลหิตตัวล่าง')
    .integer('กรุณาระบุค่าให้ถูกต้อง')
    .min(1, 'กรุณาระบุค่าความดันโลหิตตัวล่าง')
    .typeError('กรุณากรอกเลขเท่านั้น')
    .label('ValueLow'),
});

const validationBmiSchema = Yup.object().shape({
  weight: Yup.number()
    .required('กรุณาระบุค่าน้ำหนัก')
    .min(20, 'ค่าน้ำหนักไม่ควรต่ำกว่า 20 กก.')
    .max(250, 'ค่าน้ำหนักไม่ควรเกิน 250 กก.')
    .typeError('กรุณากรอกเลขเท่านั้น')
    .label('weight'),
  height: Yup.number()
    .required('กรุณาระบุค่าส่วนสูง')
    .min(50, 'ค่าส่วนสูงไม่ควรต่ำกว่า 50 ซม.')
    .max(250, 'ค่าส่วนสูงไม่ควรเกิน 250 ซม.')
    .typeError('กรุณากรอกเลขเท่านั้น')
    .label('height'),
});

const validationTempSchema = Yup.object().shape({
  value: Yup.number()
    .required('กรุณาระบุอุณหภูมิ')
    .min(1, 'กรุณาระบุอุณหภูมิ')
    .typeError('กรุณากรอกเลขเท่านั้น')
    .label('Value'),
});

const validationOxygenSchema = Yup.object().shape({
  value: Yup.number()
    .required('กรุณาระบุค่าออกซิเจน')
    .min(1, 'กรุณาระบุค่าออกซิเจน')
    .typeError('กรุณากรอกเลขเท่านั้น')
    .label('Value'),
});

const activityList = [
  { id: 1, title: 'ฉุกเฉิน' },
  { id: 2, title: 'ตื่นนอน' },
  { id: 3, title: 'ก่อนอาหารเช้า' },
  { id: 4, title: 'หลังอาหารเช้า' },
  { id: 5, title: 'ก่อนอาหารกลางวัน' },
  { id: 6, title: 'หลังอาหารกลางวัน' },
  { id: 7, title: 'ก่อนอาหารเย็น' },
  { id: 8, title: 'หลังอาหารเย็น' },
  { id: 9, title: 'เข้านอน' },
];

const glucoseAbove = [
  { id: 1, title: 'ไม่ทราบสาเหตุ' },
  { id: 2, title: 'ทานอาหารที่มีน้ำตาลสูง' },
  { id: 3, title: 'ทานอาหารต่อมื้อมากขึ้น' },
  { id: 4, title: 'ลืมทานยา หรือฉีด insulin' },
  { id: 5, title: 'แพทย์ปรับลดยา' },
];

const glucoseBelow = [
  { id: 1, title: 'ไม่ทราบสาเหตุ' },
  { id: 2, title: 'ไม่ได้ทานอาหารมื้อล่าสุด' },
  { id: 3, title: 'ทานอาหารต่อมื้อได้น้อยลง' },
  { id: 4, title: 'ใช้ยามากกว่าที่แพทย์ระบุ' },
  { id: 5, title: 'แพทย์ปรับยาเพิ่ม' },
  { id: 6, title: 'ออกกำลังกายหนัก' },
  { id: 7, title: 'ดื่มเครื่องดื่มแอลกอฮอล์' },
];

const pressureAbove = [
  { id: 1, title: 'ไม่ทราบสาเหตุ' },
  { id: 2, title: 'ทานอาหารที่มีรสเค็ม' },
  { id: 3, title: 'ลืมทานยา' },
  { id: 4, title: 'แพทย์ปรับลดยา' },
  { id: 5, title: 'เครียด' },
];

const pressureBelow = [
  { id: 1, title: 'ไม่ทราบสาเหตุ' },
  { id: 2, title: 'ทานยามากกว่าที่แพทย์ระบุ' },
  { id: 3, title: 'แพทย์ปรับเพิ่มยา' },
  { id: 4, title: 'เปลี่ยนท่าจาก ลุก นั่ง นอน เร็วเกินไป' },
  { id: 5, title: 'อาเจียนหรือถ่ายเหลวปริมาณมาก' },
];

function MonitorAddData({ navigation, user, userTele, route }) {
  const {
    type,
    no,
    above,
    below,
    defaultTopHigh,
    defaultTopLow,
    defaultBottomHigh,
    defaultBottomLow,
    dangerous,
    low,
    extractedHeight,
  } = route.params;

  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState(null);
  const [reasonInput, setReasonInput] = useState(null);
  const [activity, setActivity] = useState(null);
  const [activityInput, setActivityInput] = useState(null);
  const [modalActivity, setModalActivity] = useState(false);
  const [warning, setWarning] = useState(false);
  const [modalAbove, setModalAbove] = useState(false);
  const [modalBelow, setModalBelow] = useState(false);
  const [reasonsforAbove, setReasonsForAbove] = useState();
  const [reasonsforBelow, setReasonsForBelow] = useState();

  useEffect(() => {
    if (type === 'glucose') {
      setReasonsForAbove(glucoseAbove);
      setReasonsForBelow(glucoseBelow);
    } else if (type === 'pressure') {
      setReasonsForAbove(pressureAbove);
      setReasonsForBelow(pressureBelow);
    }
  }, []);

  const addGlucoseReport = async (data, { resetForm }) => {
    if (data.value < below && reason === null) {
      //  console.log('ต่ำกว่าเกณฑ์');
      return setModalBelow(true);
    } else if (data.value > above && reason === null) {
      //   console.log('สูงกว่าเกณฑ์');
      return setModalAbove(true);
    }

    let converted = parseInt(data.value);

    const ACCESS_TOKEN = await getAccessToken();

    try {
      setLoading(true);
      await axios.post(
        `${config.apiUrl}/monitoringReports?access_token=${ACCESS_TOKEN.id}`,
        {
          detail: {
            timeStamp: moment().format(),
            period: activity,
            measurements: {
              glucoseMeasurements: {
                glucose: converted,
                reason: reason,
                timeStamp: moment().format(),
              },
              pressureMeasurements: false,
              weightMeasurements: false,
              temperatureMeasurements: false,
              oxygenMeasurements: false,
            },
          },
          appUserId: user.data.userInformation.userId,
        },
      );
      setLoading(false);
      navigation.push('HealthActivity');
    } catch (error) {
      console.log('Error From MonitorAddData', error);
    }
    setActivity(null);
    setReason(null);
    resetForm();
  };

  const addPressureReport = async (data, { resetForm }) => {
    if (
      (data.below < defaultBottomLow || data.above < defaultTopLow) &&
      reason === null
    ) {
      //  console.log('ต่ำกว่าเกณฑ์');
      return setModalBelow(true);
    } else if (
      (data.below > defaultBottomHigh || data.above > defaultTopHigh) &&
      reason === null
    ) {
      //  console.log('สูงกว่าเกณฑ์');
      return setModalAbove(true);
    }

    let convertedAbove = parseInt(data.above);
    let convertedBelow = parseInt(data.below);

    const ACCESS_TOKEN = await getAccessToken();

    try {
      setLoading(true);
      await axios.post(
        `${config.apiUrl}/monitoringReports?access_token=${ACCESS_TOKEN.id}`,
        {
          detail: {
            timeStamp: moment().format(),
            period: activity,
            measurements: {
              glucoseMeasurements: false,
              pressureMeasurements: {
                high: convertedAbove,
                low: convertedBelow,
                reason: reason,
                timeStamp: moment().format(),
              },
              weightMeasurements: false,
              temperatureMeasurements: false,
              oxygenMeasurements: false,
            },
          },
          appUserId: user.data.userInformation.userId,
        },
      );
      setLoading(false);
      navigation.push('HealthActivity');
    } catch (error) {
      console.log('Error From MonitorAddData', error);
    }

    setActivity(null);
    setReason(null);
    resetForm();
  };

  const addBmiReport = async (data, { resetForm }) => {
    let weight = parseFloat(data.weight);
    let height = parseFloat(data.height);

    const bmi = (weight / (height * height)) * 10000;
    const stringBmi = bmi.toFixed(2);

    const ACCESS_TOKEN = await getAccessToken();

    try {
      setLoading(true);
      await axios.post(
        `${config.apiUrl}/monitoringReports?access_token=${ACCESS_TOKEN.id}`,
        {
          detail: {
            timeStamp: moment().format(),
            measurements: {
              glucoseMeasurements: false,
              pressureMeasurements: false,
              weightMeasurements: {
                weight: weight,
                height: height,
                bmi: parseFloat(stringBmi),
                timeStamp: moment().format(),
              },
              temperatureMeasurements: false,
              oxygenMeasurements: false,
            },
          },
          appUserId: user.data.userInformation.userId,
        },
      );
      setLoading(false);
      navigation.push('HealthActivity');
    } catch (error) {
      console.log('Error From MonitorAddData', error);
    }

    setReason(null);
    resetForm();
  };

  const addTemperatureReport = async (data, { resetForm }) => {
    const ACCESS_TOKEN = await getAccessToken();

    try {
      setLoading(true);
      await axios.post(
        `${config.apiUrl}/monitoringReports?access_token=${ACCESS_TOKEN.id}`,
        {
          detail: {
            timeStamp: moment().format(),
            measurements: {
              glucoseMeasurements: false,
              pressureMeasurements: false,
              weightMeasurements: false,
              temperatureMeasurements: {
                celsius: parseFloat(data.value),
                timeStamp: moment().format(),
              },
              oxygenMeasurements: false,
            },
          },
          appUserId: user.data.userInformation.userId,
        },
      );
      setLoading(false);
      navigation.push('HealthActivity');
    } catch (error) {
      console.log('Error From MonitorAddData', error);
    }
    setActivity(null);
    setReason(null);
    resetForm();
  };

  const addOxygenReport = async (data, { resetForm }) => {
    const ACCESS_TOKEN = await getAccessToken();

    try {
      setLoading(true);
      await axios.post(
        `${config.apiUrl}/monitoringReports?access_token=${ACCESS_TOKEN.id}`,
        {
          detail: {
            timeStamp: moment().format(),
            measurements: {
              glucoseMeasurements: false,
              pressureMeasurements: false,
              weightMeasurements: false,
              temperatureMeasurements: false,
              oxygenMeasurements: {
                percent: parseInt(data.value),
                timeStamp: moment().format(),
              },
            },
          },
          appUserId: user.data.userInformation.userId,
        },
      );
      setLoading(false);
      navigation.push('HealthActivity');
    } catch (error) {
      console.log('Error From MonitorAddData', error);
    }
    setActivity(null);
    setReason(null);
    resetForm();
  };

  const selectActivity = () => {
    if (activityInput !== '' && activityInput !== null) {
      setActivity(activityInput);
    }
    setActivityInput(null);
    setWarning(false);
    setModalActivity(false);
  };

  const selectReason = () => {
    if (reasonInput !== '' && reasonInput !== null) {
      setReason(reasonInput);
    }
    setReasonInput(null);
    setModalAbove(false);
    setModalBelow(false);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{ flex: 1 }}
      >
        <Header
          title="รายละเอียดข้อมูล"
          textStyle={styles.headerText}
          renderLeft={() => {
            return <Icon bold name="chevron-left" size={20} color="#fff" />;
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
          {type === 'glucose' ? (
            <>
              <View style={styles.listContainer}>
                <View style={styles.header}>
                  <View style={styles.left}>
                    <Image source={Images.diabetes} style={styles.image} />
                    <Text style={styles.leftText}>
                      บันทึกค่าน้ำตาลในเลือด (ครั้งที่ {no + 1})
                    </Text>
                  </View>
                </View>
                <View style={styles.leftTime}>
                  <View>
                    <Icon name="calendar" style={styles.calendar} />
                  </View>
                  <View>
                    <Text style={styles.leftText}>วันและเวลาที่บันทึก</Text>
                    <Text
                      style={[
                        styles.leftText,
                        { fontWeight: 'normal', fontSize: 14 },
                      ]}
                    >
                      วันที่ {moment().format('D MMMM YYYY')} เวลา{' '}
                      {moment().format('HH:mm')} น.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.dataContainer}>
                <Formik
                  initialValues={{ value: '' }}
                  onSubmit={addGlucoseReport}
                  validationSchema={validationGlucoseSchema}
                >
                  {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    handleBlur,
                    touched,
                  }) => (
                    <>
                      <Text style={styles.leftText}>ค่าน้ำตาลในเลือด</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <TextInput
                          keyboardType="numeric"
                          maxLength={3}
                          placeholderTextColor="#6e6969"
                          placeholder="0"
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
                          onBlur={handleBlur('value')}
                          onChangeText={handleChange('value')}
                          value={values.value}
                          width={120}
                        />

                        <Text>มก./ดล.</Text>
                      </View>
                      {
                        <ErrorMessage
                          error={errors.value}
                          visible={touched.value}
                        />
                      }
                      <Text
                        style={[
                          styles.leftText,
                          { marginTop: 10, marginBottom: 5 },
                        ]}
                      >
                        กิจกรรม
                      </Text>
                      <TouchableOpacity
                        style={[
                          styles.activityContainer,
                          warning
                            ? { borderColor: 'red', borderWidth: 1 }
                            : null,
                        ]}
                        activeOpacity={0.9}
                        onPress={() => setModalActivity(true)}
                      >
                        {activity === null ? (
                          <Text>เลือก</Text>
                        ) : (
                          <Text>{activity}</Text>
                        )}
                      </TouchableOpacity>

                      {reason ? (
                        <Text
                          style={[
                            styles.leftText,
                            { marginTop: 10, marginBottom: 5 },
                          ]}
                        >
                          สาเหตุ: {reason}
                        </Text>
                      ) : null}

                      {activity === null ? (
                        <LinearGradient
                          style={styles.add}
                          colors={['#fff', '#fff']}
                        >
                          <TouchableOpacity
                            underlayColor="grey"
                            style={{ width: '100%', alignItems: 'center' }}
                            disabled={false}
                            onPress={() => setWarning(true)}
                          >
                            <Text
                              style={[
                                styles.buttonTextAdd,
                                { color: '#c0c0c0' },
                              ]}
                            >
                              บันทึก
                            </Text>
                          </TouchableOpacity>
                        </LinearGradient>
                      ) : (
                        <LinearGradient
                          style={styles.add}
                          colors={['#0A905F', '#095C3E']}
                        >
                          <TouchableOpacity
                            underlayColor="grey"
                            style={{ width: '100%', alignItems: 'center' }}
                            disabled={false}
                            onPress={handleSubmit}
                          >
                            <Text style={styles.buttonTextAdd}>บันทึก</Text>
                          </TouchableOpacity>
                        </LinearGradient>
                      )}
                    </>
                  )}
                </Formik>
              </View>
            </>
          ) : null}

          {type === 'pressure' ? (
            <>
              <View style={styles.listContainer}>
                <View style={styles.header}>
                  <View style={styles.left}>
                    <Image source={Images.diabetes} style={styles.image} />
                    <Text style={styles.leftText}>
                      บันทึกค่าความดันโลหิต (ครั้งที่ {no + 1})
                    </Text>
                  </View>
                </View>
                <View style={styles.leftTime}>
                  <View>
                    <Icon name="calendar" style={styles.calendar} />
                  </View>
                  <View>
                    <Text style={styles.leftText}>วันและเวลาที่บันทึก</Text>
                    <Text
                      style={[
                        styles.leftText,
                        { fontWeight: 'normal', fontSize: 14 },
                      ]}
                    >
                      วันที่ {moment().format('D MMMM YYYY')} เวลา{' '}
                      {moment().format('HH:mm')} น.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.dataContainer}>
                <Formik
                  initialValues={{ above: '', below: '' }}
                  onSubmit={addPressureReport}
                  validationSchema={validationPressureSchema}
                >
                  {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    handleBlur,
                    touched,
                  }) => (
                    <>
                      <Text style={styles.leftText}>ค่าความดันโลหิตตัวบน</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <TextInput
                          keyboardType="numeric"
                          maxLength={3}
                          placeholderTextColor="#6e6969"
                          placeholder="0"
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
                          onBlur={handleBlur('above')}
                          onChangeText={handleChange('above')}
                          value={values.above}
                          width={120}
                        />

                        <Text>มม./ปรอท.</Text>
                      </View>
                      {
                        <ErrorMessage
                          error={errors.above}
                          visible={touched.above}
                        />
                      }
                      <Text style={styles.leftText}>
                        ค่าความดันโลหิตตัวล่าง
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <TextInput
                          keyboardType="numeric"
                          maxLength={5}
                          placeholderTextColor="#6e6969"
                          placeholder="0"
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
                          onBlur={handleBlur('below')}
                          onChangeText={handleChange('below')}
                          value={values.below}
                          width={120}
                        />

                        <Text>มม./ปรอท.</Text>
                      </View>
                      {
                        <ErrorMessage
                          error={errors.below}
                          visible={touched.below}
                        />
                      }
                      <Text
                        style={[
                          styles.leftText,
                          { marginTop: 10, marginBottom: 5 },
                        ]}
                      >
                        กิจกรรม
                      </Text>
                      <TouchableOpacity
                        style={[
                          styles.activityContainer,
                          warning
                            ? { borderColor: 'red', borderWidth: 1 }
                            : null,
                        ]}
                        activeOpacity={0.9}
                        onPress={() => setModalActivity(true)}
                      >
                        {activity === null ? (
                          <Text>เลือก</Text>
                        ) : (
                          <Text>{activity}</Text>
                        )}
                      </TouchableOpacity>

                      {reason ? (
                        <Text
                          style={[
                            styles.leftText,
                            { marginTop: 10, marginBottom: 5 },
                          ]}
                        >
                          สาเหตุ: {reason}
                        </Text>
                      ) : null}

                      {activity === null ? (
                        <LinearGradient
                          style={styles.add}
                          colors={['#fff', '#fff']}
                        >
                          <TouchableOpacity
                            underlayColor="grey"
                            style={{ width: '100%', alignItems: 'center' }}
                            disabled={false}
                            onPress={() => setWarning(true)}
                          >
                            <Text
                              style={[
                                styles.buttonTextAdd,
                                { color: '#c0c0c0' },
                              ]}
                            >
                              บันทึก
                            </Text>
                          </TouchableOpacity>
                        </LinearGradient>
                      ) : (
                        <LinearGradient
                          style={styles.add}
                          colors={['#0A905F', '#095C3E']}
                        >
                          <TouchableOpacity
                            underlayColor="grey"
                            style={{ width: '100%', alignItems: 'center' }}
                            disabled={false}
                            onPress={handleSubmit}
                          >
                            <Text style={styles.buttonTextAdd}>บันทึก</Text>
                          </TouchableOpacity>
                        </LinearGradient>
                      )}
                    </>
                  )}
                </Formik>
              </View>
            </>
          ) : null}

          {type === 'bmi' ? (
            <>
              <View style={styles.listContainer}>
                <View style={styles.header}>
                  <View style={styles.left}>
                    <Image source={Images.bmi} style={styles.image} />
                    <Text style={styles.leftText}>
                      บันทึกค่าดัชนีมวลกาย (ครั้งที่ {no + 1})
                    </Text>
                  </View>
                </View>
                <View style={styles.leftTime}>
                  <View>
                    <Icon name="calendar" style={styles.calendar} />
                  </View>
                  <View>
                    <Text style={styles.leftText}>วันและเวลาที่บันทึก</Text>
                    <Text
                      style={[
                        styles.leftText,
                        { fontWeight: 'normal', fontSize: 14 },
                      ]}
                    >
                      วันที่ {moment().format('D MMMM YYYY')} เวลา{' '}
                      {moment().format('HH:mm')} น.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.dataContainer}>
                <Formik
                  initialValues={{
                    weight: '',
                    height: extractedHeight.toString(),
                  }}
                  onSubmit={addBmiReport}
                  validationSchema={validationBmiSchema}
                >
                  {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    handleBlur,
                    touched,
                  }) => (
                    <>
                      <Text style={styles.leftText}>ค่าน้ำหนัก</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <TextInput
                          keyboardType="numeric"
                          maxLength={5}
                          placeholderTextColor="#6e6969"
                          placeholder="0"
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
                          onBlur={handleBlur('weight')}
                          onChangeText={handleChange('weight')}
                          value={values.weight}
                          width={120}
                        />

                        <Text>กก.</Text>
                      </View>
                      {
                        <ErrorMessage
                          error={errors.weight}
                          visible={touched.weight}
                        />
                      }
                      <Text style={styles.leftText}>ค่าส่วนสูง</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <TextInput
                          keyboardType="numeric"
                          maxLength={5}
                          placeholder={extractedHeight.toString()}
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
                          onBlur={handleBlur('height')}
                          onChangeText={handleChange('height')}
                          value={values.height}
                          width={120}
                        />

                        <Text>ซม.</Text>
                      </View>
                      {
                        <ErrorMessage
                          error={errors.height}
                          visible={touched.height}
                        />
                      }

                      <LinearGradient
                        style={styles.add}
                        colors={['#0A905F', '#095C3E']}
                      >
                        <TouchableOpacity
                          underlayColor="grey"
                          style={{ width: '100%', alignItems: 'center' }}
                          disabled={false}
                          onPress={handleSubmit}
                        >
                          <Text style={styles.buttonTextAdd}>บันทึก</Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    </>
                  )}
                </Formik>
              </View>
            </>
          ) : null}

          {type === 'temperature' ? (
            <>
              <View style={styles.listContainer}>
                <View style={styles.header}>
                  <View style={styles.left}>
                    <Image source={Images.temperature} style={styles.image} />
                    <Text style={styles.leftText}>
                      บันทึกค่าอุณหภูมิ (ครั้งที่ {no + 1})
                    </Text>
                  </View>
                </View>
                <View style={styles.leftTime}>
                  <View>
                    <Icon name="calendar" style={styles.calendar} />
                  </View>
                  <View>
                    <Text style={styles.leftText}>วันและเวลาที่บันทึก</Text>
                    <Text
                      style={[
                        styles.leftText,
                        { fontWeight: 'normal', fontSize: 14 },
                      ]}
                    >
                      วันที่ {moment().format('D MMMM YYYY')} เวลา{' '}
                      {moment().format('HH:mm')} น.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.dataContainer}>
                <Formik
                  initialValues={{ value: '' }}
                  onSubmit={addTemperatureReport}
                  validationSchema={validationTempSchema}
                >
                  {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    handleBlur,
                    touched,
                  }) => (
                    <>
                      <Text style={styles.leftText}>ค่าอุณหภูมิ</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <TextInput
                          keyboardType="numeric"
                          maxLength={5}
                          placeholderTextColor="#6e6969"
                          placeholder="0"
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
                          onBlur={handleBlur('value')}
                          onChangeText={handleChange('value')}
                          value={values.value}
                          width={120}
                        />

                        <Text>ซ.</Text>
                      </View>
                      {
                        <ErrorMessage
                          error={errors.value}
                          visible={touched.value}
                        />
                      }
                      <LinearGradient
                        style={styles.add}
                        colors={['#0A905F', '#095C3E']}
                      >
                        <TouchableOpacity
                          underlayColor="grey"
                          style={{ width: '100%', alignItems: 'center' }}
                          disabled={false}
                          onPress={handleSubmit}
                        >
                          <Text style={styles.buttonTextAdd}>บันทึก</Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    </>
                  )}
                </Formik>
              </View>
            </>
          ) : null}

          {type === 'oxygen' ? (
            <>
              <View style={styles.listContainer}>
                <View style={styles.header}>
                  <View style={styles.left}>
                    <Image source={Images.oxygen} style={styles.image} />
                    <Text style={styles.leftText}>
                      บันทึกค่าออกซิเจน (ครั้งที่ {no + 1})
                    </Text>
                  </View>
                </View>
                <View style={styles.leftTime}>
                  <View>
                    <Icon name="calendar" style={styles.calendar} />
                  </View>
                  <View>
                    <Text style={styles.leftText}>วันและเวลาที่บันทึก</Text>
                    <Text
                      style={[
                        styles.leftText,
                        { fontWeight: 'normal', fontSize: 14 },
                      ]}
                    >
                      วันที่ {moment().format('D MMMM YYYY')} เวลา{' '}
                      {moment().format('HH:mm')} น.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.dataContainer}>
                <Formik
                  initialValues={{ value: '' }}
                  onSubmit={addOxygenReport}
                  validationSchema={validationOxygenSchema}
                >
                  {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    handleBlur,
                    touched,
                  }) => (
                    <>
                      <Text style={styles.leftText}>ค่าออกซิเจน</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <TextInput
                          keyboardType="numeric"
                          maxLength={3}
                          placeholderTextColor="#6e6969"
                          placeholder="0"
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
                          onBlur={handleBlur('value')}
                          onChangeText={handleChange('value')}
                          value={values.value}
                          width={120}
                        />

                        <Text>%</Text>
                      </View>
                      {
                        <ErrorMessage
                          error={errors.value}
                          visible={touched.value}
                        />
                      }
                      <LinearGradient
                        style={styles.add}
                        colors={['#0A905F', '#095C3E']}
                      >
                        <TouchableOpacity
                          underlayColor="grey"
                          style={{ width: '100%', alignItems: 'center' }}
                          disabled={false}
                          onPress={handleSubmit}
                        >
                          <Text style={styles.buttonTextAdd}>บันทึก</Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    </>
                  )}
                </Formik>
              </View>
            </>
          ) : null}

          {modalActivity && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalActivity}
            >
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                style={{ flex: 1 }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalActivity}>
                    <Text
                      style={[
                        styles.modalTitle,
                        { color: '#095C3E', paddingHorizontal: 60 },
                      ]}
                    >
                      เลือกกิจกรรม
                    </Text>
                    <View style={{ height: 230 }}>
                      <ScrollView>
                        {activityList.map(item => (
                          <TouchableOpacity
                            key={item.id}
                            style={[
                              styles.activityBox,
                              activity === item.title && activityInput === null
                                ? { backgroundColor: '#095C3E' }
                                : null,
                            ]}
                            activeOpacity={0.9}
                            onPress={() => {
                              setActivityInput(null);
                              setActivity(item.title);
                            }}
                          >
                            <Text
                              style={[
                                { textAlign: 'center', fontSize: 18 },
                                activity === item.title &&
                                activityInput === null
                                  ? { color: '#fff' }
                                  : null,
                              ]}
                            >
                              {item.title}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>

                    <TextInput
                      maxLength={50}
                      placeholderTextColor="#6e6969"
                      placeholder="อื่นๆ"
                      style={{
                        fontSize: 18,
                        color: '#0c0c0c',
                        backgroundColor: '#fff',
                        borderRadius: 12,
                        borderColor: '#c0c0c0',
                        borderWidth: 1,
                        padding: 15,
                        marginVertical: 10,
                      }}
                      onChangeText={setActivityInput}
                      value={activityInput}
                      width={235}
                    />

                    <View style={styles.modalButtonContainer}>
                      <LinearGradient
                        style={styles.add}
                        colors={['#0A905F', '#095C3E']}
                      >
                        <TouchableOpacity
                          underlayColor="grey"
                          style={{ width: '100%', alignItems: 'center' }}
                          disabled={false}
                          onPress={selectActivity}
                        >
                          <Text style={styles.buttonTextAdd}>เลือก</Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </Modal>
          )}

          {modalAbove && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalAbove}
            >
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                style={{ flex: 1 }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    {type === 'pressure' ? (
                      <>
                        <Text style={styles.modalTitle}>
                          ค่าความดันท่านสูงกว่าเกณฑ์ !
                        </Text>
                        <Text style={styles.modalText}>
                          ระบุสาเหตุที่ท่านคาดว่า
                        </Text>
                        <Text style={styles.modalText}>
                          ทำให้ระดับความดันของท่านสูงกว่าเกณฑ์
                        </Text>
                      </>
                    ) : (
                      <>
                        <Text style={styles.modalTitle}>
                          ค่าน้ำตาลท่านสูงกว่าเกณฑ์ !
                        </Text>
                        <Text style={styles.modalText}>
                          ระบุสาเหตุที่ท่านคาดว่า
                        </Text>
                        <Text style={styles.modalText}>
                          ทำให้ระดับน้ำตาลของท่านสูงกว่าเกณฑ์
                        </Text>
                      </>
                    )}

                    <View style={{ height: 230, marginTop: 10 }}>
                      <ScrollView>
                        {reasonsforAbove.map(item => (
                          <TouchableOpacity
                            key={item.id}
                            style={[
                              styles.activityBox,
                              reason === item.title && reasonInput === null
                                ? { backgroundColor: '#095C3E' }
                                : null,
                            ]}
                            activeOpacity={0.9}
                            onPress={() => {
                              setReasonInput(null);
                              setReason(item.title);
                            }}
                          >
                            <Text
                              style={[
                                { textAlign: 'center', fontSize: 18 },
                                reason === item.title && reasonInput === null
                                  ? { color: '#fff' }
                                  : null,
                              ]}
                            >
                              {item.title}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>

                    <TextInput
                      maxLength={50}
                      placeholderTextColor="#6e6969"
                      placeholder="อื่นๆ"
                      style={{
                        fontSize: 18,
                        color: '#0c0c0c',
                        backgroundColor: '#fff',
                        borderRadius: 12,
                        borderColor: '#c0c0c0',
                        borderWidth: 1,
                        padding: 15,
                        marginVertical: 10,
                      }}
                      onChangeText={setReasonInput}
                      value={reasonInput}
                      width={265}
                    />

                    <View style={styles.modalButtonContainer}>
                      <LinearGradient
                        style={styles.add}
                        colors={['#0A905F', '#095C3E']}
                      >
                        <TouchableOpacity
                          underlayColor="grey"
                          style={{ width: '100%', alignItems: 'center' }}
                          disabled={false}
                          onPress={selectReason}
                        >
                          <Text style={styles.buttonTextAdd}>เลือก</Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </Modal>
          )}

          {modalBelow && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalBelow}
            >
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                style={{ flex: 1 }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    {type === 'pressure' ? (
                      <>
                        <Text style={[styles.modalTitle, { color: '#3997EA' }]}>
                          ค่าความดันท่านต่ำกว่าเกณฑ์ !
                        </Text>

                        <Text style={[styles.modalText, { color: '#3997EA' }]}>
                          ระบุสาเหตุที่ท่านคาดว่า
                        </Text>
                        <Text style={[styles.modalText, { color: '#3997EA' }]}>
                          ทำให้ระดับความดันของท่านต่ำกว่าเกณฑ์
                        </Text>
                      </>
                    ) : (
                      <>
                        <Text style={[styles.modalTitle, { color: '#3997EA' }]}>
                          ค่าน้ำตาลท่านต่ำกว่าเกณฑ์ !
                        </Text>

                        <Text style={[styles.modalText, { color: '#3997EA' }]}>
                          ระบุสาเหตุที่ท่านคาดว่า
                        </Text>
                        <Text style={[styles.modalText, { color: '#3997EA' }]}>
                          ทำให้ระดับน้ำตาลของท่านต่ำกว่าเกณฑ์
                        </Text>
                      </>
                    )}

                    <View style={{ height: 230, marginTop: 10 }}>
                      <ScrollView>
                        {reasonsforBelow.map(item => (
                          <TouchableOpacity
                            key={item.id}
                            style={[
                              styles.activityBox,
                              reason === item.title && reasonInput === null
                                ? { backgroundColor: '#095C3E' }
                                : null,
                            ]}
                            activeOpacity={0.9}
                            onPress={() => {
                              setReasonInput(null);
                              setReason(item.title);
                            }}
                          >
                            <Text
                              style={[
                                { textAlign: 'center', fontSize: 18 },
                                reason === item.title && reasonInput === null
                                  ? { color: '#fff' }
                                  : null,
                              ]}
                            >
                              {item.title}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>

                    <TextInput
                      maxLength={50}
                      placeholderTextColor="#6e6969"
                      placeholder="อื่นๆ"
                      style={{
                        fontSize: 18,
                        color: '#0c0c0c',
                        backgroundColor: '#fff',
                        borderRadius: 12,
                        borderColor: '#c0c0c0',
                        borderWidth: 1,
                        padding: 15,
                        marginVertical: 10,
                      }}
                      onChangeText={setReasonInput}
                      value={reasonInput}
                      width={265}
                    />

                    <View style={styles.modalButtonContainer}>
                      <LinearGradient
                        style={styles.add}
                        colors={['#0A905F', '#095C3E']}
                      >
                        <TouchableOpacity
                          underlayColor="grey"
                          style={{ width: '100%', alignItems: 'center' }}
                          disabled={false}
                          onPress={selectReason}
                        >
                          <Text style={styles.buttonTextAdd}>เลือก</Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </Modal>
          )}

          {loading === true ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <View>
                <ActivityIndicator size="large" color="0A7C53" />
              </View>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
    userTele: state.userTele,
  };
}

export default connect(mapStateToProps, null)(MonitorAddData);
