import React, { useEffect, useState } from 'react';
import moment from 'moment';
import _, { indexOf } from 'lodash';
import { View, TouchableOpacity, Alert, Modal } from 'react-native';
import { Header, SafeAreaView, Text, Icon, Button } from '@components';
import { useSelector, connect } from 'react-redux';
import { BaseStyle, BaseColor, FontFamily } from '@config';
import { TopCard, ProfileImage } from './style';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import * as Utils from '@utils';
import Loading from '@components/Loading';
import config from '@_config';
import axios from 'axios';
import { Calendar } from 'react-native-calendars';
import { find } from 'lodash';
import 'moment/locale/th';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';

moment.locale('th');
import { LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['th'] = {
  monthNames: [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ],
  monthNamesShort: [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ],
  dayNames: [
    'อาทิตย์',
    'จันทร์',
    'อังคาร',
    'พุธ',
    'พฤหัสบดี',
    'ศุกร์',
    'เสาร์',
  ],
  dayNamesShort: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
  today: 'วันนี้',
};
const currentDateTime = moment(new Date())
  .add(1, 'days')
  .format('YYYY-MM-DD');
LocaleConfig.defaultLocale = 'th';
function Appointment(props) {
  const telemedicine = useSelector(state => state.telemedicine);
  const [loading, setLoading] = useState(true);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookingTimes, setBooking] = useState();
  const [filterBookings, setFilterBookings] = useState();
  const [minuteTimes, setMinute] = useState();
  const [selected, setSelected] = useState(moment().format('YYYY-MM-DD'));
  const [times, setTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const { navigation, userTele, user } = props;
  const [omaUser, setOmaUser] = useState(false);
  const [dayOff, setDayOff] = useState({});
  const [weekend, setWeekEnd] = useState({});

  const staffRole = telemedicine?.data?.doctor?.roles[0]?.name ?? '';

  const fetchVerifyIdStatus = async userId => {
    try {
      const { data } = await axios.get(
        `${config.apiUrl}/UserInfos/userInfoByPatientId?patientId=${userId}`,
      );
      return data.verifyId;
    } catch (error) {
      console.log(error);
    }
  };
  const checkOmaUser = async () => {
    setLoading(true);
    if (
      user.data === null ||
      (user.data === undefined && !user.data.userInformation)
    ) {
      setOmaUser(false);
      setLoading(false);
    } else {
      const omaUserStatus = await fetchVerifyIdStatus(
        user.data.userInformation.userId,
      );
      setOmaUser(omaUserStatus);
      setLoading(false);
    }
  };
  const DISABLED_DAYS = ['Saturday', 'Sunday'];
  useEffect(() => {
    checkOmaUser();
    getHolidays();
    setWeekEnd(
      getDaysInMonth(moment().month() + 1, moment().year(), DISABLED_DAYS),
    );
  }, []);

  const calendar_api_key = 'AIzaSyBDLYwoxv5GtDACl-UE5M4aaIN77Q1MYno';
  const getHolidays = async () => {
    const disableDay = { disabled: true, disableTouchEvent: true };
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/calendar/v3/calendars/th.th.official%23holiday%40group.v.calendar.google.com/events?key=${calendar_api_key}`,
      );
      const marked = {};
      data.items.forEach(item => {
        marked[item.start.date] = disableDay;
      });

      setDayOff(marked);
    } catch (error) {
      console.log(error);
    }
  };
  const getDaysInMonth = (month, year, days) => {
    let pivot = moment()
      .month(month)
      .year(year)
      .startOf('month');
    const end = moment()
      .month(month)
      .year(year)
      .endOf('month');
    let dates = {};
    const disabled = { disabled: true };
    while (pivot.isBefore(end)) {
      days.forEach(day => {
        dates[pivot.day(day).format('YYYY-MM-DD')] = disabled;
        dates[moment(pivot.day(days[1]) - 1).format('YYYY-MM-DD')] = disabled;
      });
      pivot.add(7, 'days');
    }
    return dates;
  };

  var doctorId = telemedicine.data.doctor.id || 1;

  const alertCreateBooking = () => {
    // const date = moment(selected)
    //   .format('LLLL')
    //   .split('เวลา');
    // const time = moment()
    //   .startOf('isoWeek')
    //   .add(selectedTime, 'minutes')
    //   .format('HH:mm');

    setModalVisible(true);

    // Alert.alert(
    //   'คุณเลือกนัดหมายแพทย์',
    //   `${date[0]} เวลา ${time} น.`,
    //   [
    //     {
    //       text: 'ไม่ใช่',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel',
    //     },
    //     {
    //       text: 'ใช่',
    //       onPress: () => createBooking(),
    //     },
    //   ],
    //   { cancelable: false },
    // );
  };

  const createBooking = async () => {
    const response = await axios.post(`${config.VA_API_URL}/Bookings`, {
      admitTime: selected,
      bookingTime: selectedTime,
      patientId: userTele.dataTele.userId,
      doctorId: telemedicine.data.doctor.id,
      bookingEndTime: 0,
    });

    // console.log('day ====', {
    //   admitTime: selected,
    //   bookingTime: selectedTime,
    //   patientId: userTele.dataTele.userId,
    //   doctorId: telemedicine.data.doctor.id,
    //   bookingEndTime: 0,
    // });
    if (response.status === 200) {
      navigation.navigate('PackageConsult', { type: 'แพทย์' });
    }
  };

  useEffect(() => {
    fetchDoctorAvailableTimes();
    fetchBookings();
  }, []);

  const fetchDoctorAvailableTimes = async () => {
    const { data } = await axios.get(
      `${config.VA_API_URL}/doctorAvailableTimes/filterType?doctorId=${doctorId}&type=weekly`,
    );

    const sortAvailableTimes = data.time.sort();
    const filterAvailableTimes = sortAvailableTimes.map(sortAvailableTime => {
      const periods = [];
      let start = sortAvailableTime[0];

      // const dayName = moment(item.start.date).format('dddd');
      // dayName === 'เสาร์' && dayName === 'อาทิตย์' ?  marked[item.start.date] = disableDay : ''

      while (start < sortAvailableTime[1]) {
        periods.push(start);
        start += data.minute;
      }
      return {
        value: moment()
          .startOf('isoWeek')
          .add(sortAvailableTime[0], 'minutes')
          .format('d'),
        label: moment()
          .startOf('isoWeek')
          .add(sortAvailableTime[0], 'minutes')
          .format('dddd'),
        timePeriods: periods,
      };
    });
    const filterTimes = filterAvailableTimes.filter(
      availableTime => availableTime.value === moment().format('d'),
    );

    setTimes(''); // set current Time Default cannot booking
    setAvailableTimes(filterAvailableTimes);
    setMinute(data.minute);
  };

  const fetchBookings = async () => {
    const { data } = await axios.get(
      `${config.VA_API_URL}/Bookings/filterByDoctorId?doctorId=${doctorId}`,
    );

    const filterBooking = data.filter(
      booking =>
        moment(booking.admitTime).format('YYYY-MM-DD') ===
          moment().format('YYYY-MM-DD') &&
        ![
          'DOCTOR_COMPLETD',
          'PHARMACY_COMPLETED',
          'CALL_CENTER_DECLINE',
          'DOCTOR_DECLINE',
          'PHARMACY_DECLINE_BOOKING',
        ].includes(booking.status),
    );
    setFilterBookings(filterBooking);
    setBooking(data);
  };

  const onDayPress = day => {
    const selectedDay = moment(day.dateString).format('d');
    const filterTimes = availableTimes.filter(
      availableTime => availableTime.value === selectedDay,
    );
    const filterBooking = bookingTimes.filter(
      time => moment(time.admitTime).format('YYYY-MM-DD') === day.dateString,
    );
    // console.log('day.dateString ====', day.dateString);
    setFilterBookings(filterBooking);
    setTimes(filterTimes);
    setSelected(day.dateString);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title={
          staffRole === 'nurse'
            ? 'นัดหมายพยาบาล'
            : staffRole === 'physiotherapist'
            ? 'นัดหมายนักกายภาพบำบัด'
            : 'นัดหมายแพทย์'
        }
        textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <Loading isVisible={loading} />
      <TopCard>
        <ProfileImage
          source={{
            uri: _.get(telemedicine, 'data.doctor.profileImage'),
          }}
        />
        <Text
          title3
          bold
          numberOfLines={1}
          style={{ marginTop: 10, color: '#095C3E' }}
        >
          {_.get(telemedicine, 'data.doctor.fullname')}
        </Text>
        <Text
          title5
          numberOfLines={1}
          style={{
            marginTop: 5,
            color: '#095C3E',
            fontWeight: '400',
            color: '#535353',
          }}
        >
          {_.get(telemedicine, 'data.symptom.name')}
        </Text>
      </TopCard>
      {omaUser == false && loading === false ? (
        <View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#cccccc',
              marginHorizontal: 20,
            }}
          />
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: '500' }}>
              คุณยังไม่ได้ยืนยันตัวตน
            </Text>
            <Text style={{ fontSize: 18, marginTop: 5 }}>
              คุณสามารถยืนยันตัวตนได้กับเจ้าหน้าที่
            </Text>
          </View>
        </View>
      ) : (
        <ScrollView style={{ backgroundColor: '#F5F5F5', padding: 20 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#535353' }}>
              ตารางนัดหมาย
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Calendar
              minDate={currentDateTime}
              markedDates={{
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedColor: '#0AB678',
                  selectedTextColor: '#ffffff',
                },
                ...dayOff,
                ...weekend,
              }}
              disabledDaysIndexes={[0, 6]}
              style={{
                borderRadius: 8,
              }}
              onDayPress={onDayPress}
              onDayLongPress={day => {
                // console.log("selected day", day);
              }}
              onMonthChange={date => {
                setSelectedTime(false);
                setWeekEnd(
                  getDaysInMonth(date.month - 1, date.year, DISABLED_DAYS),
                );
              }}
              theme={{
                textSectionTitleColor: BaseColor.textPrimaryColor,
                selectedDayBackgroundColor: BaseColor.primaryColor,
                selectedDayTextColor: '#ffffff',
                todayTextColor: BaseColor.primaryColor,
                dayTextColor: BaseColor.textPrimaryColor,
                textDisabledColor: BaseColor.grayColor,
                dotColor: BaseColor.primaryColor,
                selectedDotColor: '#ffffff',
                arrowColor: BaseColor.primaryColor,
                monthTextColor: BaseColor.textPrimaryColor,
                textDayFontFamily: FontFamily.default,
                textMonthFontFamily: FontFamily.default,
                textDayHeaderFontFamily: FontFamily.default,
                textMonthFontWeight: 'bold',
                textDayFontSize: 14,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 14,
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#F5F5F5',
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <Text
              style={{ fontWeight: 'bold', fontSize: 16, color: '#535353' }}
            >
              ช่วงเวลาที่ต้องการนัดหมาย
            </Text>
            <SafeAreaView>
              {times.length ? (
                times.map(time => (
                  <FlatList
                    data={time.timePeriods}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    renderItem={({ item: period }) =>
                      find(filterBookings, { bookingTime: period }) ? (
                        <View style={{ flex: 0.33 }}>
                          <View
                            style={{
                              borderColor: '#C4C4C4',
                              borderWidth: 1,
                              backgroundColor: '#CC4343',
                              borderRadius: 10,
                              alignItems: 'center',
                              padding: 15,
                              margin: 5,
                            }}
                          >
                            <Text style={{ color: '#ffffff' }}>
                              {moment()
                                .startOf('isoWeek')
                                .add(period, 'minutes')
                                .format('HH:mm')}
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <View style={{ flex: 0.33 }}>
                          <TouchableOpacity
                            onPress={() => setSelectedTime(period)}
                          >
                            {selectedTime === period ? (
                              <View
                                style={{
                                  borderColor: '#C4C4C4',
                                  borderWidth: 1,
                                  backgroundColor: '#0AB678',
                                  borderRadius: 10,
                                  alignItems: 'center',
                                  padding: 15,
                                  margin: 5,
                                }}
                              >
                                <Text style={{ color: '#ffffff' }}>
                                  {moment()
                                    .startOf('isoWeek')
                                    .add(period, 'minutes')
                                    .format('HH:mm')}
                                </Text>
                              </View>
                            ) : (
                              <View
                                style={{
                                  borderColor: '#C4C4C4',
                                  borderWidth: 1,
                                  backgroundColor: '#ffffff',
                                  borderRadius: 10,
                                  alignItems: 'center',
                                  padding: 15,
                                  margin: 5,
                                }}
                              >
                                <Text>
                                  {moment()
                                    .startOf('isoWeek')
                                    .add(period, 'minutes')
                                    .format('HH:mm')}
                                </Text>
                              </View>
                            )}
                          </TouchableOpacity>
                        </View>
                      )
                    }
                  />
                ))
              ) : (
                <View>
                  <Text>
                    ไม่สามารถนัดหมายในวันดังกล่าวได้ เนื่องจากต้องนัดก่อน 3
                    วันล่วงหน้าหรือแพทย์อาจไม่มีตารางว่างในวันนั้น
                  </Text>
                </View>
              )}
            </SafeAreaView>
          </View>
        </ScrollView>
      )}
      <View style={{ padding: 20, backgroundColor: '#F5F5F5' }}>
        {selectedTime && times.length ? (
          <LinearGradient
            style={{
              height: 50,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            colors={['#0A905F', '#095C3E']}
          >
            <TouchableOpacity
              underlayColor="grey"
              style={{ width: '100%', alignItems: 'center' }}
              onPress={() => alertCreateBooking()}
            >
              <Text
                style={{ color: '#ffffff', fontSize: 18, fontWeight: '700' }}
              >
                ยืนยันการนัดหมาย
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <Button
            style={{
              height: 50,
              borderRadius: 20,
              backgroundColor: '#C4C4C4',
            }}
          >
            <Text style={{ color: '#A3A3A3', fontSize: 18, fontWeight: '700' }}>
              ยืนยันการนัดหมาย
            </Text>
          </Button>
        )}
      </View>

      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Icon name="calendar" size={60} style={{ color: '#0A8C5C' }} />
              <Text style={styles.modalTitle}>คุณเลือกนัดหมายแพทย์</Text>
              <Text style={styles.modalText}>
                {`${
                  moment(selected)
                    .format('LLLL')
                    .split('เวลา')[0]
                }`}
                {'\n'}
                {`เวลา ${moment()
                  .startOf('isoWeek')
                  .add(selectedTime, 'minutes')
                  .format('HH:mm')} น.`}
              </Text>

              <View style={styles.nextContainer}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.backStyle}>ยกเลิก</Text>
                </TouchableOpacity>

                <LinearGradient
                  colors={['#0DA36D', '#0A7C53', '#086C48']}
                  style={styles.finishGradient}
                >
                  <TouchableOpacity
                    full
                    style={styles.okButton}
                    onPress={() => {
                      createBooking();
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.finishText}>ยืนยัน</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    auths: state.auth,
    user: state.user,
    userTele: state.userTele,
  };
};

export default connect(mapStateToProps)(Appointment);
