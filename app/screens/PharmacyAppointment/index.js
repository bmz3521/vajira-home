import React, { useEffect, useState } from 'react';
import moment from 'moment';
import _, { indexOf } from 'lodash';
import { View, TouchableOpacity, Alert, Modal } from 'react-native';
import { Header, SafeAreaView, Text, Icon, Button } from '@components';
import { useSelector, connect, useDispatch } from 'react-redux';
import { BaseStyle, BaseColor } from '@config';
import { TopCard, ProfileImage } from './style';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { post } from '../../AppStyles';
import config from '@_config';
// import Loading from './loading';
import axios from 'axios';
import * as Utils from '@utils';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';

function PharmacyAppointment(props) {
  const telemedicine = useSelector(state => state.telemedicine);
  const [selectDay, setSelectDay] = useState([]);
  const [showTheThing, setShowTheThing] = useState(false);
  const [selectTime, setSelectTime] = useState(false);
  const [calendarTime, setCalendar] = useState();
  const [availableTimes, setAvailableTimes] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [bookingTimes, setBooking] = useState();
  const [selectDate, setDate] = useState();
  const { navigation, userTele, route } = props;
  const {
    bookingTime,
    bookingDay,
    bookingId,
    prescriptionId,
    doctorId,
  } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);

  const [vnNumber, setVnNumber] = useState('');
  const [doctorBookingId, setDoctorBookingId] = useState('');

  const dId = doctorId || 0;

  const today = `วัน${moment().format('dddd')}ที่ ${moment().format(
    'Do MMMM',
  )} ${Number(moment().format('YYYY')) + 543}`;

  const DATE = {
    0: [8640, 10079],
    1: [0, 1439],
    2: [1440, 2879],
    3: [2880, 4319],
    4: [4320, 5759],
    5: [5760, 7199],
    6: [7200, 8639],
  };

  function easyHTTP() {
    this.http = new XMLHttpRequest();
  }

  const http = new easyHTTP();

  easyHTTP.prototype.post = function(url, data, callback) {
    this.http.open('POST', url, true);
    this.http.setRequestHeader('Content-type', 'application/json');

    let self = this;
    this.http.onload = function() {
      callback(null, self.http.responseText);
    };

    this.http.send(JSON.stringify(data));
  };

  async function updateDoctorBooking() {
    await axios.patch(`${config.VA_API_URL}/Bookings`, doctorBookingData);
  }

  function createPharmacyBooking() {
    http.post(`${config.VA_API_URL}/Bookings`, pharmacyBookingData, function(
      err,
      post,
    ) {
      if (err) {
        console.log(err);
      } else {
        console.log('POST', post);
      }
    });
  }

  var newArray = [];

  switch (selectDay) {
    case 'จันทร์':
      newArray = [0, 1439];
      break;
    case 'อังคาร':
      newArray = [1440, 2879];
      break;
    case 'พุธ':
      newArray = [2880, 4319];
      break;
    case 'พฤหัสบดี':
      newArray = [4320, 5759];
      break;
    case 'ศุกร์':
      newArray = [5760, 7199];
      break;
    case 'เสาร์':
      newArray = [7200, 8639];
      break;
    case 'อาทิตย์':
      newArray = [8640, 10079];
      break;
  }
  async function fetchDoctorBooking() {
    const { data } = await axios.get(
      `${config.VA_API_URL}/Bookings/${bookingId}?filter[include]=doctor&filter[include]=prescription`,
    );
    setVnNumber(data.vnNumber);
    setDoctorBookingId(data.id);
  }
  useEffect(() => {
    fetchPharmacyAvailableTimes();
    fetchDoctorBooking();
  }, [doctorBookingId, vnNumber]);

  const fetchPharmacyAvailableTimes = async () => {
    const { data } = await axios.get(
      `${
        config.VA_API_URL
      }/pharmacyAvailableTimes/checkBookingNumberPharmacy?date=${moment().format(
        'YYYY-MM-DD',
      )}&startTime=${DATE[moment().format('d')][0]}&endTime=${
        DATE[moment().format('d')][1]
      }`,
    );
    const filterData = data.sort((a, b) => a.startTime - b.startTime);
    setAvailableTimes(filterData);
  };

  const checkPharmacyAvailableTimes = async () => {
    const { data } = await axios.get(
      `${
        config.VA_API_URL
      }/pharmacyAvailableTimes/checkBookingNumberPharmacy?date=${moment().format(
        'YYYY-MM-DD',
      )}&startTime=${selectTime.startTime}&endTime=${selectTime.endTime}`,
    );
    if (data && data.length && data[0].count < data[0].maxQuantity) {
      updateDoctorBooking();
      createPharmacyBooking();
      navigation.navigate('PackageConsult', { type: 'เภสัชกร' });
    } else {
      setModalErrorVisible(true);
    }
  };

  const pharmacyBookingData = {
    status: 'PHARMACY_PENDING_BOOKING',
    admitTime: moment().format('YYYY-MM-DD'),
    bookingTime: selectTime.startTime,
    bookingEndTime: selectTime.endTime,
    patientId: userTele.dataTele.userId,
    doctorId: dId,
    prescriptionId: prescriptionId,
    vnNumber: vnNumber,
    doctorBookingId: doctorBookingId,
  };

  const doctorBookingData = {
    status: 'DOCTOR_COMPLETED',
    id: bookingId,
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="นัดหมายเภสัชกร"
        textStyle={styles.headerText}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      <ScrollView style={styles.container}>
        <View style={styles.head}>
          <View style={styles.headTextContainer}>
            <Text style={styles.headText}>ตารางการนัดหมาย</Text>
          </View>
          <View style={[styles.headTextContainer, { marginBottom: 15 }]}>
            <Text>{today}</Text>
          </View>
        </View>
        <View style={styles.subTitle}>
          <Text style={styles.headText}>ช่วงเวลาที่ต้องการนัดหมาย</Text>
        </View>
        <View style={styles.timeContainer}>
          {availableTimes && availableTimes.length ? (
            <FlatList
              data={availableTimes}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              renderItem={({ item: result }) => (
                <View
                  style={{
                    flex: 1,
                    flexWrap: 'wrap',
                  }}
                >
                  {result.count < result.maxQuantity ? (
                    <TouchableOpacity onPress={() => setSelectTime(result)}>
                      {selectTime.startTime === result.startTime &&
                      selectTime.endTime === result.endTime ? (
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
                              .add(result.startTime, 'minutes')
                              .format('HH:mm')}{' '}
                            -{' '}
                            {moment()
                              .startOf('isoWeek')
                              .add(result.endTime, 'minutes')
                              .format('HH:mm')}{' '}
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
                              .add(result.startTime, 'minutes')
                              .format('HH:mm')}{' '}
                            -{' '}
                            {moment()
                              .startOf('isoWeek')
                              .add(result.endTime, 'minutes')
                              .format('HH:mm')}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={{
                        borderColor: '#C4C4C4',
                        borderWidth: 1,
                        backgroundColor: '#C4C4C4',
                        borderRadius: 10,
                        alignItems: 'center',
                        padding: 15,
                        margin: 5,
                      }}
                    >
                      <Text>
                        {moment()
                          .startOf('isoWeek')
                          .add(result.startTime, 'minutes')
                          .format('HH:mm')}{' '}
                        -{' '}
                        {moment()
                          .startOf('isoWeek')
                          .add(result.endTime, 'minutes')
                          .format('HH:mm')}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            />
          ) : (
            <>
              <View style={styles.redTitle}>
                <Text style={styles.redText}>ช่วงเวลาที่ต้องการนัดหมาย</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.detailText}>
                  ช่วงเวลาการนัดหมายใน{today} เต็ม
                  ท่านสามารถติดต่อเพื่อทำการนัดหมายได้ดังนี้
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <View style={styles.makeRow}>
                  <Icon name="phone" style={styles.phoneIcon} />
                  <View>
                    <Text style={[styles.detailText, { fontWeight: 'bold' }]}>
                      วันจันทร์ - ศุกร์ เวลา 08:00 - 16:00 น.
                    </Text>
                    <Text style={styles.detailText}>
                      ติดต่อได้ที่ CALL CENTER TELEMED
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.detailContainer}>
                <View style={styles.makeRow}>
                  <Icon name="phone" style={styles.phoneIcon} />
                  <View>
                    <Text style={[styles.detailText, { fontWeight: 'bold' }]}>
                      วันจันทร์ - ศุกร์ เวลา 16:00 - 20:00 น.
                    </Text>
                    <Text style={styles.detailText}>
                      ติดต่อได้ที่เบอร์โทรศัพท์ 02-2443000 ต่อ 5442
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
        {selectTime && (
          <TouchableOpacity
            style={{ padding: 20 }}
            disabled={!selectTime}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <LinearGradient
              style={{
                height: 50,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              colors={['#0A905F', '#095C3E']}
            >
              <Text
                style={{ color: '#ffffff', fontSize: 18, fontWeight: '700' }}
              >
                ยืนยันการนัดหมาย
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Icon name="calendar" size={60} style={{ color: '#0A8C5C' }} />
                <Text style={styles.modalTitle}>คุณเลือกนัดหมายเภสัชกร</Text>
                <Text style={styles.modalText}>
                  {today}
                  {'\n'}
                  {`เวลา ${moment()
                    .startOf('isoWeek')
                    .add(selectTime.startTime, 'minutes')
                    .format('HH:mm')} น. - ${moment()
                    .startOf('isoWeek')
                    .add(selectTime.endTime, 'minutes')
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
                        checkPharmacyAvailableTimes();
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

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalErrorVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Icon name="calendar" size={60} style={{ color: '#0A8C5C' }} />
                <Text style={styles.modalTitle}>เกิดข้อผิดพลาด</Text>
                <Text style={styles.modalText}>
                  เนื่องจากเวลาดังกล่าวเต็มแล้ว กรุณาทำรายการใหม่อีกครั้ง
                </Text>

                <View style={styles.nextContainer}>
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => setModalErrorVisible(false)}
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
                        setSelectTime(false);
                        fetchPharmacyAvailableTimes();
                        setModalErrorVisible(false);
                      }}
                    >
                      <Text style={styles.finishText}>ตกลง</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    userTele: state.userTele,
    user: state.user,
  };
};

export default connect(mapStateToProps)(PharmacyAppointment);
