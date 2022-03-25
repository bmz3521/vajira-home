import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Header, SafeAreaView, Icon, Image } from '@components';
import { BaseStyle, BaseColor, Images } from '@config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserActions } from '@actions';
import { getAccessToken } from '@utils/asyncStorage';
import config from '@_config';
import axios from 'axios';
import styles from './styles';

function SetTime({ navigation, user, route, actions }) {
  const [failModal, setFailModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [textColor, setTextColor] = useState('#000');
  const [showBeginPicker, setShowBeginPicker] = useState(false);
  const [showEatPicker, setShowEatPicker] = useState(false);

  const iOsColorFix = () => {
    setTimeout(() => {
      setTextColor('#04a56a');
    }, 0);
  };

  const [morningBegin, setMorningBegin] = useState(
    new Date('2021-06-28T06:00:00+07:00'),
  );
  const [morningEat, setMorningEat] = useState(
    new Date('2021-06-28T07:00:00+07:00'),
  );
  const [morningEnd, setMorningEnd] = useState(
    new Date('2021-06-28T09:00:00+07:00'),
  );

  const [lunchBegin, setLunchBegin] = useState(
    new Date('2021-06-28T11:00:00+07:00'),
  );
  const [lunchEat, setLunchEat] = useState(
    new Date('2021-06-28T12:00:00+07:00'),
  );
  const [lunchEnd, setLunchEnd] = useState(
    new Date('2021-06-28T14:00:00+07:00'),
  );

  const [eveningBegin, setEveningBegin] = useState(
    new Date('2021-06-28T16:00:00+07:00'),
  );
  const [eveningEat, setEveningEat] = useState(
    new Date('2021-06-28T17:00:00+07:00'),
  );
  const [eveningEnd, setEveningEnd] = useState(
    new Date('2021-06-28T18:00:00+07:00'),
  );

  const [bedBegin, setBedBegin] = useState(
    new Date('2021-06-28T19:00:00+07:00'),
  );
  const [bedEat, setBedEat] = useState(new Date('2021-06-28T20:00:00+07:00'));
  const [bedEnd, setBedEnd] = useState(new Date('2021-06-28T23:59:00+07:00'));

  const onMorningBegin = (event, selectedDate) => {
    const currentDate = selectedDate || morningBegin;
    setShowBeginPicker(false);
    setMorningBegin(currentDate);
  };

  const onMorningEat = (event, selectedDate) => {
    const currentDate = selectedDate || morningEat;
    setShowEatPicker(false);
    setMorningEat(currentDate);
  };

  const onLunchBegin = (event, selectedDate) => {
    const currentDate = selectedDate || lunchBegin;
    setShowBeginPicker(false);
    setLunchBegin(currentDate);
  };

  const onLunchEat = (event, selectedDate) => {
    const currentDate = selectedDate || lunchEat;
    setShowEatPicker(false);
    setLunchEat(currentDate);
  };

  const onEveningBegin = (event, selectedDate) => {
    const currentDate = selectedDate || eveningBegin;
    setShowBeginPicker(false);
    setEveningBegin(currentDate);
  };

  const onEveningEat = (event, selectedDate) => {
    const currentDate = selectedDate || eveningEat;
    setShowEatPicker(false);
    setEveningEat(currentDate);
  };

  // const onEveningEnd = (event, selectedDate) => {
  //   const currentDate = selectedDate || eveningEnd;
  //   setEveningEnd(currentDate);
  // };

  const onBedBegin = (event, selectedDate) => {
    const currentDate = selectedDate || bedBegin;
    setShowBeginPicker(false);
    setBedBegin(currentDate);
  };

  const onBedEat = (event, selectedDate) => {
    const currentDate = selectedDate || bedEat;
    setShowEatPicker(false);
    setBedEat(currentDate);
  };

  // console.log(moment('2021-06-28T09:15:41.000Z').format());

  const fetchInfo = async () => {
    try {
      await actions.getUpdateInfo();
    } catch (error) {
      console.log('Error fetching Info', error);
    }
  };

  const updateInfo = async period => {
    const ACCESS_TOKEN = await getAccessToken();

    let newTime;
    if (period === 'MORNING') {
      newTime = {
        morning: {
          begin: moment(morningBegin).format(),
          end: moment(morningEnd).format(),
          eat: moment(morningEat).format(),
        },
        lunch: user?.data?.userInformation?.drugTime?.lunch,
        evening: user?.data?.userInformation?.drugTime?.evening,
        bed: user?.data?.userInformation?.drugTime?.bed,
      };
    } else if (period === 'LUNCH') {
      newTime = {
        morning: user?.data?.userInformation?.drugTime?.morning,
        lunch: {
          begin: moment(lunchBegin).format(),
          end: moment(lunchEnd).format(),
          eat: moment(lunchEat).format(),
        },
        evening: user?.data?.userInformation?.drugTime?.evening,
        bed: user?.data?.userInformation?.drugTime?.bed,
      };
    } else if (period === 'EVENING') {
      newTime = {
        morning: user?.data?.userInformation?.drugTime?.morning,
        lunch: user?.data?.userInformation?.drugTime?.lunch,
        evening: {
          begin: moment(eveningBegin).format(),
          end: moment(eveningEnd).format(),
          eat: moment(eveningEat).format(),
        },
        bed: user?.data?.userInformation?.drugTime?.bed,
      };
    } else if (period === 'BED') {
      newTime = {
        morning: user?.data?.userInformation?.drugTime?.morning,
        lunch: user?.data?.userInformation?.drugTime?.lunch,
        evening: user?.data?.userInformation?.drugTime?.evening,
        bed: {
          begin: moment(bedBegin).format(),
          end: moment(bedEnd).format(),
          eat: moment(bedEat).format(),
        },
      };
    }

    try {
      await axios.patch(
        `${config.apiUrl}/UserInfos/${user.data.userInformation.id}?access_token=${ACCESS_TOKEN.id}`,
        {
          drugTime: newTime,
        },
      );
      await fetchInfo();
      setSuccessModal(true);
      // resetForm();
    } catch (error) {
      setFailModal(true);
      console.log('Error From updateInfo', error);
    }
  };

  useEffect(() => {
    // Morning
    const morningBegin = user?.data?.userInformation?.drugTime?.morning?.begin;
    const morningEat = user?.data?.userInformation?.drugTime?.morning?.eat;
    const morningEnd = user?.data?.userInformation?.drugTime?.lunch?.begin;

    if (morningBegin) setMorningBegin(new Date(morningBegin));
    if (morningEat) setMorningEat(new Date(morningEat));
    if (morningEnd) setMorningEnd(new Date(morningEnd));

    // Lunch
    const lunchBegin = user?.data?.userInformation?.drugTime?.lunch?.begin;
    const lunchEat = user?.data?.userInformation?.drugTime?.lunch?.eat;
    const lunchEnd = user?.data?.userInformation?.drugTime?.evening?.begin;

    if (lunchBegin) setLunchBegin(new Date(lunchBegin));
    if (lunchEat) setLunchEat(new Date(lunchEat));
    if (lunchEnd) setLunchEnd(new Date(lunchEnd));

    // Evening
    const eveningBegin = user?.data?.userInformation?.drugTime?.evening?.begin;
    const eveningEat = user?.data?.userInformation?.drugTime?.evening?.eat;
    const eveningEnd = user?.data?.userInformation?.drugTime?.bed?.begin;

    if (eveningBegin) setEveningBegin(new Date(eveningBegin));
    if (eveningEat) setEveningEat(new Date(eveningEat));
    if (eveningEnd) setEveningEnd(new Date(eveningEnd));

    // Bed
    const bedBegin = user?.data?.userInformation?.drugTime?.bed?.begin;
    const bedEat = user?.data?.userInformation?.drugTime?.bed?.eat;
    const bedEnd = user?.data?.userInformation?.drugTime?.bed?.end;

    if (bedBegin) setBedBegin(new Date(bedBegin));
    if (bedEat) setBedEat(new Date(bedEat));
    if (bedEnd) setBedEnd(new Date(bedEnd));

    // fix for textColor not changing bug from the library
    // https://github.com/react-native-datetimepicker/datetimepicker/issues/308
    iOsColorFix();
  }, [setTextColor]);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="ตั้งค่าเวลา"
        textStyle={styles.headerText}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#fff' }}
      >
        {route.params.period === 'MORNING' && (
          <>
            <View style={styles.mainContainer}>
              <Text style={styles.title}>เวลาเริ่มต้นช่วงเช้า</Text>
            </View>
            {Platform.OS === 'ios' ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={morningBegin}
                mode="time"
                textColor={textColor}
                is24Hour={true}
                locale="th-TH"
                display="spinner"
                onChange={onMorningBegin}
                style={styles.container}
                minimumDate={new Date('2021-06-28T04:00:00+07:00').getTime()}
                maximumDate={new Date(lunchBegin).getTime() - 3600000}
              />
            ) : (
              <>
                <View style={styles.mainContainer}>
                  <Text style={[styles.androidText, { color: '#CB3837' }]}>
                    กรุณาตั้งเวลาเริ่มต้น "หลัง"{' '}
                    {moment('2021-06-28T06:00:00+07:00').format('HH:mm')} น.
                  </Text>
                  <Text style={styles.androidText}>
                    เวลาที่คุณตั้ง {moment(morningBegin).format('HH:mm')} น.
                  </Text>
                </View>
                <LinearGradient
                  style={styles.androidSetTime}
                  colors={['#2193b0', '#3EAAC5']}
                >
                  <TouchableOpacity
                    underlayColor="grey"
                    style={{ width: '100%', alignItems: 'center' }}
                    disabled={false}
                    onPress={() => setShowBeginPicker(true)}
                  >
                    <Text style={styles.buttonText}>ตั้งค่าเวลา</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </>
            )}

            <View style={styles.mainContainer}>
              <Text style={styles.title}>เวลาทานอาหาร (โดยประมาณ)</Text>
            </View>
            {Platform.OS === 'ios' ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={morningEat}
                mode="time"
                textColor={textColor}
                is24Hour={true}
                locale="th-TH"
                display="spinner"
                onChange={onMorningEat}
                style={styles.container}
                minimumDate={new Date(morningBegin).getTime() + 1800000}
                maximumDate={new Date(lunchBegin).getTime() - 1800000}
              />
            ) : (
              <>
                <View style={styles.mainContainer}>
                  <Text style={[styles.androidText, { color: '#CB3837' }]}>
                    กรุณาตั้งเวลาทาน "ไม่เกิน"{' '}
                    {moment(new Date(lunchBegin).getTime() - 1800000).format(
                      'HH:mm',
                    )}{' '}
                    น.
                  </Text>
                  <Text style={styles.androidText}>
                    เวลาที่คุณตั้ง {moment(morningEat).format('HH:mm')} น.
                  </Text>
                </View>
                <LinearGradient
                  style={styles.androidSetTime}
                  colors={['#2193b0', '#3EAAC5']}
                >
                  <TouchableOpacity
                    underlayColor="grey"
                    style={{ width: '100%', alignItems: 'center' }}
                    disabled={false}
                    onPress={() => setShowEatPicker(true)}
                  >
                    <Text style={styles.buttonText}>ตั้งค่าเวลา</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </>
            )}

            <LinearGradient style={styles.take} colors={['#0AB678', '#0AB678']}>
              <TouchableOpacity
                underlayColor="grey"
                style={{ width: '100%', alignItems: 'center' }}
                disabled={false}
                onPress={() => updateInfo('MORNING')}
              >
                <Text style={styles.buttonText}>บันทึก</Text>
              </TouchableOpacity>
            </LinearGradient>
          </>
        )}

        {route.params.period === 'LUNCH' && (
          <>
            <View style={styles.mainContainer}>
              <Text style={styles.title}>เวลาเริ่มต้นช่วงกลางวัน</Text>
            </View>
            {Platform.OS === 'ios' ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={lunchBegin}
                mode="time"
                textColor={textColor}
                is24Hour={true}
                locale="th-TH"
                display="spinner"
                onChange={onLunchBegin}
                style={styles.container}
                minimumDate={new Date(morningEat).getTime() + 1800000}
                maximumDate={new Date(eveningBegin).getTime() - 3600000}
              />
            ) : (
              <>
                <View style={styles.mainContainer}>
                  <Text style={[styles.androidText, { color: '#CB3837' }]}>
                    กรุณาตั้งเวลาเริ่มต้น "หลัง"{' '}
                    {moment(new Date(morningEat).getTime() + 1800000).format(
                      'HH:mm',
                    )}{' '}
                    น.
                  </Text>
                  <Text style={styles.androidText}>
                    เวลาที่คุณตั้ง {moment(lunchBegin).format('HH:mm')} น.
                  </Text>
                </View>
                <LinearGradient
                  style={styles.androidSetTime}
                  colors={['#2193b0', '#3EAAC5']}
                >
                  <TouchableOpacity
                    underlayColor="grey"
                    style={{ width: '100%', alignItems: 'center' }}
                    disabled={false}
                    onPress={() => setShowBeginPicker(true)}
                  >
                    <Text style={styles.buttonText}>ตั้งค่าเวลา</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </>
            )}

            <View style={styles.mainContainer}>
              <Text style={styles.title}>เวลาทานอาหาร (โดยประมาณ)</Text>
            </View>
            {Platform.OS === 'ios' ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={lunchEat}
                mode="time"
                textColor={textColor}
                is24Hour={true}
                locale="th-TH"
                display="spinner"
                onChange={onLunchEat}
                style={styles.container}
                minimumDate={new Date(lunchBegin).getTime() + 1800000}
                maximumDate={new Date(eveningBegin).getTime() - 1800000}
              />
            ) : (
              <>
                <View style={styles.mainContainer}>
                  <Text style={[styles.androidText, { color: '#CB3837' }]}>
                    กรุณาตั้งเวลาทาน "ไม่เกิน"{' '}
                    {moment(new Date(eveningBegin).getTime() - 1800000).format(
                      'HH:mm',
                    )}{' '}
                    น.
                  </Text>
                  <Text style={styles.androidText}>
                    เวลาที่คุณตั้ง {moment(lunchEat).format('HH:mm')} น.
                  </Text>
                </View>
                <LinearGradient
                  style={styles.androidSetTime}
                  colors={['#2193b0', '#3EAAC5']}
                >
                  <TouchableOpacity
                    underlayColor="grey"
                    style={{ width: '100%', alignItems: 'center' }}
                    disabled={false}
                    onPress={() => setShowEatPicker(true)}
                  >
                    <Text style={styles.buttonText}>ตั้งค่าเวลา</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </>
            )}

            <LinearGradient style={styles.take} colors={['#0AB678', '#0AB678']}>
              <TouchableOpacity
                underlayColor="grey"
                style={{ width: '100%', alignItems: 'center' }}
                disabled={false}
                onPress={() => updateInfo('LUNCH')}
              >
                <Text style={styles.buttonText}>บันทึก</Text>
              </TouchableOpacity>
            </LinearGradient>
          </>
        )}

        {route.params.period === 'EVENING' && (
          <>
            <View style={styles.mainContainer}>
              <Text style={styles.title}>เวลาเริ่มต้นช่วงเย็น</Text>
            </View>
            {Platform.OS === 'ios' ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={eveningBegin}
                mode="time"
                textColor={textColor}
                is24Hour={true}
                locale="th-TH"
                display="spinner"
                onChange={onEveningBegin}
                style={styles.container}
                minimumDate={new Date(lunchEat).getTime() + 1800000}
                maximumDate={new Date(bedBegin).getTime() - 3600000}
              />
            ) : (
              <>
                <View style={styles.mainContainer}>
                  <Text style={[styles.androidText, { color: '#CB3837' }]}>
                    กรุณาตั้งเวลาเริ่มต้น "หลัง"{' '}
                    {moment(new Date(lunchEat).getTime() + 1800000).format(
                      'HH:mm',
                    )}{' '}
                    น.
                  </Text>
                  <Text style={styles.androidText}>
                    เวลาที่คุณตั้ง {moment(eveningBegin).format('HH:mm')} น.
                  </Text>
                </View>
                <LinearGradient
                  style={styles.androidSetTime}
                  colors={['#2193b0', '#3EAAC5']}
                >
                  <TouchableOpacity
                    underlayColor="grey"
                    style={{ width: '100%', alignItems: 'center' }}
                    disabled={false}
                    onPress={() => setShowBeginPicker(true)}
                  >
                    <Text style={styles.buttonText}>ตั้งค่าเวลา</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </>
            )}

            <View style={styles.mainContainer}>
              <Text style={styles.title}>เวลาทานอาหาร (โดยประมาณ)</Text>
            </View>
            {Platform.OS === 'ios' ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={eveningEat}
                mode="time"
                textColor={textColor}
                is24Hour={true}
                locale="th-TH"
                display="spinner"
                onChange={onEveningEat}
                style={styles.container}
                minimumDate={new Date(eveningBegin).getTime() + 1800000}
                maximumDate={new Date(bedBegin).getTime() - 1800000}
              />
            ) : (
              <>
                <View style={styles.mainContainer}>
                  <Text style={[styles.androidText, { color: '#CB3837' }]}>
                    กรุณาตั้งเวลาทาน "ไม่เกิน"{' '}
                    {moment(new Date(bedBegin).getTime() - 1800000).format(
                      'HH:mm',
                    )}{' '}
                    น.
                  </Text>
                  <Text style={styles.androidText}>
                    เวลาที่คุณตั้ง {moment(eveningEat).format('HH:mm')} น.
                  </Text>
                </View>
                <LinearGradient
                  style={styles.androidSetTime}
                  colors={['#2193b0', '#3EAAC5']}
                >
                  <TouchableOpacity
                    underlayColor="grey"
                    style={{ width: '100%', alignItems: 'center' }}
                    disabled={false}
                    onPress={() => setShowEatPicker(true)}
                  >
                    <Text style={styles.buttonText}>ตั้งค่าเวลา</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </>
            )}

            {/* <View style={styles.mainContainer}>
              <Text style={styles.title}>เวลาสิ้นสุดช่วงเย็น</Text>
            </View>
            <DateTimePicker
              testID="dateTimePicker"
              value={eveningEnd}
              mode="time"
              textColor="#000"
              is24Hour={true}
              locale="th-TH"
              display="spinner"
              onChange={onEveningEnd}
              style={styles.container}
            /> */}
            <LinearGradient style={styles.take} colors={['#0AB678', '#0AB678']}>
              <TouchableOpacity
                underlayColor="grey"
                style={{ width: '100%', alignItems: 'center' }}
                disabled={false}
                onPress={() => updateInfo('EVENING')}
              >
                <Text style={styles.buttonText}>บันทึก</Text>
              </TouchableOpacity>
            </LinearGradient>
          </>
        )}

        {route.params.period === 'BED' && (
          <>
            <View style={styles.mainContainer}>
              <Text style={styles.title}>เวลาเริ่มต้นช่วงก่อนนอน</Text>
            </View>
            {Platform.OS === 'ios' ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={bedBegin}
                mode="time"
                textColor={textColor}
                is24Hour={true}
                locale="th-TH"
                display="spinner"
                onChange={onBedBegin}
                style={styles.container}
                minimumDate={new Date(eveningEat).getTime() + 1800000}
                maximumDate={new Date(bedEnd).getTime() - 3600000}
              />
            ) : (
              <>
                <View style={styles.mainContainer}>
                  <Text style={[styles.androidText, { color: '#CB3837' }]}>
                    กรุณาตั้งเวลาเริ่มต้น "หลัง"{' '}
                    {moment(new Date(eveningEat).getTime() + 1800000).format(
                      'HH:mm',
                    )}{' '}
                    น.
                  </Text>
                  <Text style={styles.androidText}>
                    เวลาที่คุณตั้ง {moment(bedBegin).format('HH:mm')} น.
                  </Text>
                </View>
                <LinearGradient
                  style={styles.androidSetTime}
                  colors={['#2193b0', '#3EAAC5']}
                >
                  <TouchableOpacity
                    underlayColor="grey"
                    style={{ width: '100%', alignItems: 'center' }}
                    disabled={false}
                    onPress={() => setShowBeginPicker(true)}
                  >
                    <Text style={styles.buttonText}>ตั้งค่าเวลา</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </>
            )}

            <View style={styles.mainContainer}>
              <Text style={styles.title}>เวลาทานยา</Text>
            </View>
            {Platform.OS === 'ios' ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={bedEat}
                mode="time"
                textColor={textColor}
                is24Hour={true}
                locale="th-TH"
                display="spinner"
                onChange={onBedEat}
                style={styles.container}
                minimumDate={new Date(bedBegin).getTime() + 1800000}
                maximumDate={new Date(bedEnd).getTime() - 1800000}
              />
            ) : (
              <>
                <View style={styles.mainContainer}>
                  <Text style={[styles.androidText, { color: '#CB3837' }]}>
                    กรุณาตั้งเวลาทาน "ไม่เกิน"{' '}
                    {moment(new Date(bedEnd).getTime() - 1800000).format(
                      'HH:mm',
                    )}{' '}
                    น.
                  </Text>
                  <Text style={styles.androidText}>
                    เวลาที่คุณตั้ง {moment(bedEat).format('HH:mm')} น.
                  </Text>
                </View>
                <LinearGradient
                  style={styles.androidSetTime}
                  colors={['#2193b0', '#3EAAC5']}
                >
                  <TouchableOpacity
                    underlayColor="grey"
                    style={{ width: '100%', alignItems: 'center' }}
                    disabled={false}
                    onPress={() => setShowEatPicker(true)}
                  >
                    <Text style={styles.buttonText}>ตั้งค่าเวลา</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </>
            )}

            <LinearGradient style={styles.take} colors={['#0AB678', '#0AB678']}>
              <TouchableOpacity
                underlayColor="grey"
                style={{ width: '100%', alignItems: 'center' }}
                disabled={false}
                onPress={() => updateInfo('BED')}
              >
                <Text style={styles.buttonText}>บันทึก</Text>
              </TouchableOpacity>
            </LinearGradient>
          </>
        )}

        {showBeginPicker && route.params.period === 'MORNING' && (
          <DateTimePicker
            testID="dateTimePicker"
            value={morningBegin}
            mode="time"
            textColor={textColor}
            is24Hour={true}
            locale="th-TH"
            display="clock"
            onChange={onMorningBegin}
          />
        )}

        {showEatPicker && route.params.period === 'MORNING' && (
          <DateTimePicker
            testID="dateTimePicker"
            value={morningEat}
            mode="time"
            textColor={textColor}
            is24Hour={true}
            locale="th-TH"
            display="clock"
            onChange={onMorningEat}
          />
        )}

        {showBeginPicker && route.params.period === 'LUNCH' && (
          <DateTimePicker
            testID="dateTimePicker"
            value={lunchBegin}
            mode="time"
            textColor={textColor}
            is24Hour={true}
            locale="th-TH"
            display="clock"
            onChange={onLunchBegin}
          />
        )}

        {showEatPicker && route.params.period === 'LUNCH' && (
          <DateTimePicker
            testID="dateTimePicker"
            value={lunchEat}
            mode="time"
            textColor={textColor}
            is24Hour={true}
            locale="th-TH"
            display="clock"
            onChange={onLunchEat}
          />
        )}

        {showBeginPicker && route.params.period === 'EVENING' && (
          <DateTimePicker
            testID="dateTimePicker"
            value={eveningBegin}
            mode="time"
            textColor={textColor}
            is24Hour={true}
            locale="th-TH"
            display="clock"
            onChange={onEveningBegin}
          />
        )}

        {showEatPicker && route.params.period === 'EVENING' && (
          <DateTimePicker
            testID="dateTimePicker"
            value={eveningEat}
            mode="time"
            textColor={textColor}
            is24Hour={true}
            locale="th-TH"
            display="clock"
            onChange={onEveningEat}
          />
        )}

        {showBeginPicker && route.params.period === 'BED' && (
          <DateTimePicker
            testID="dateTimePicker"
            value={bedBegin}
            mode="time"
            textColor={textColor}
            is24Hour={true}
            locale="th-TH"
            display="clock"
            onChange={onBedBegin}
          />
        )}

        {showEatPicker && route.params.period === 'BED' && (
          <DateTimePicker
            testID="dateTimePicker"
            value={bedEat}
            mode="time"
            textColor={textColor}
            is24Hour={true}
            locale="th-TH"
            display="clock"
            onChange={onBedEat}
          />
        )}

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

        <Modal animationType="slide" transparent={true} visible={successModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Icon
                name="check-circle"
                size={100}
                style={[styles.okIcon, { color: '#095C3E' }]}
              />
              <Text style={[styles.modalTitle, { color: '#095C3E' }]}>
                บันทึกสำเร็จ
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
                      setSuccessModal(false);
                      navigation.replace('HealthActivity', {
                        forceReset: true,
                      });
                    }}
                  >
                    <Text style={styles.buttonTextAdd}>ไปหน้าการแจ้งเตือน</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(UserActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetTime);
