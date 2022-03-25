import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import moment from 'moment';
import { useSelector, connect } from 'react-redux';
import { BaseStyle, BaseColor } from '@config';
import config from '@_config';
import { Header, SafeAreaView, Text, Icon, Button } from '@components';
import stylesCard, {
  Card,
  ProfileImage,
  LeftCard,
  Tag,
  TagText,
} from './style';
import _, { indexOf } from 'lodash';
import { TelemedicineActions } from '@actions';
import { useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

function MyBookings(props) {
  const { navigation, userTele } = props;
  const [symptom, setSymptom] = useState('');
  const telemedicine = useSelector(state => state.telemedicine);
  const [dataBooking, setData] = useState([]);

  const dispatch = useDispatch();

  var userId;

  if (userTele.dataTele !== null) {
    userId = userTele.dataTele.id;
  } else {
    userId = 0;
  }

  //   console.log('Id');
  //   console.log(userTele.dataTele);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(
        `${config.VA_API_URL}/Bookings/filterByPatientId?patientId=${userId}`,
      );
      //   console.log(response);
      setData(response.data);
    }
    fetchData();
  }, [dataBooking]);

  var finalData = dataBooking.map(userTele => ({
    bookingDay: userTele.admitTime,
    bookingTime: userTele.bookingTime,
    doctor: userTele.doctor,
    doctorId: userTele.doctorId,
    status: userTele.status,
    bookingId: userTele.id,
    prescriptionId: userTele.prescriptionId,
  }));

  //  console.log('finalDataaaaa');
  //  console.log(finalData);

  var realStatus = [];

  for (let i in finalData) {
    realStatus.push(finalData[i].status);
  }

  var newRealStatus = [];

  for (let i in realStatus) {
    if (realStatus[i] == 'DOCTOR_CONFIRM') {
      newRealStatus.push('หมอยืนยันการนัด');
    } else if (realStatus[i] == 'PATIENT_DRAFT') {
      newRealStatus.push('ผู้ป่วยนัดหมายแพทย์');
    } else if (realStatus[i] == 'CALL_CENTER_DECLINE') {
      newRealStatus.push('เจ้าหน้าที่ยกเลิก');
    } else if (realStatus[i] == 'DOCTOR_PENDING') {
      newRealStatus.push('รอหมอยึนยันการนัด');
    } else if (realStatus[i] == 'DOCTOR_DECLINE') {
      newRealStatus.push('หมอยกเลิกการนัด');
    } else if (realStatus[i] == 'DOCTOR_PENDING_RX') {
      newRealStatus.push('หมอรอจ่ายยา');
    } else if (realStatus[i] == 'PATIENT_PENDING_PAYMENT') {
      newRealStatus.push('รอผู้ป่วยดำเนินการสั่งยา');
    } else if (realStatus[i] == 'PATIENT_SUCCESS_PAYMENT') {
      newRealStatus.push('เลือกเภสัชกรเพื่อรับยา');
    } else if (realStatus[i] == 'PATIENT_DECLINE_PAYMENT') {
      newRealStatus.push('ผู้ป่วยยกเลิกการชำระเงิน');
    } else if (realStatus[i] == 'PHARMACY_PENDING_RX') {
      newRealStatus.push('รอเภสัชกรตรวจยา');
    } else if (realStatus[i] == 'BOOKING_COMPLETED') {
      newRealStatus.push('สิ้นสุดกระบวนการ');
    } else if (realStatus[i] == 'DOCTOR_COMPLETED') {
      newRealStatus.push('สิ้นสุดกระบวนการพบแพทย์');
    } else if (realStatus[i] == 'PHARMACY_COMPLETED') {
      newRealStatus.push('สิ้นสุดกระบวนการพบเภสัชกร');
    } else if (realStatus[i] == 'PHARMACY_PENDING_BOOKING') {
      newRealStatus.push('รอเภสัชกรยืนยันนัดหมาย');
    } else if (realStatus[i] == 'PHARMACY_CONFIRM_BOOKING') {
      newRealStatus.push('เภสัชกรยืนยันนัดหมาย');
    } else if (realStatus[i] == 'STAFF_CONFIRM') {
      newRealStatus.push('เจ้าหน้าที่ยืนยันการนัด');
    } else if (realStatus[i] == 'STAFF_PENDING') {
      newRealStatus.push('รอเจ้าหน้าที่ยึนยันการนัด');
    } else if (realStatus[i] == 'STAFF_DECLINE') {
      newRealStatus.push('เจ้าหน้าที่ยกเลิกการนัด');
    } else if (realStatus[i] == 'STAFF_COMPLETED') {
      newRealStatus.push('สิ้นสุดกระบวนการพบเจ้าหน้าที่');
    }
  }

  const onApply = result => {
    const data = {
      symptom: result,
    };

    dispatch(TelemedicineActions.setTelemedicine(data));
    navigation.navigate('MyBookingActivity', {
      userId,
      day: result.bookingDay,
      time: result.bookingTime,
      doctorId: result.doctorId,
      doctor: result.doctor,
      status: result.status,
      bookingId: result.bookingId,
      prescriptionId: result.prescriptionId,
    });
  };

  var changeData = finalData.map(function(el, index) {
    var o = Object.assign({}, el);
    o.thaiStatus = newRealStatus[index];
    return o;
  });

  //  console.log(changeData);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="My Booking"
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{ marginTop: 20, marginBottom: 20, marginLeft: 30 }}>
        <Text style={{ fontSize: 16, fontWeight: '500' }}>
          คุณมีนัดคุยกับแพทย์ดังนี้
        </Text>
      </View>
      <ScrollView>
        {changeData.map(result => (
          <View>
            <TouchableOpacity
              style={{
                width: '80%',
                height: 150,
                marginBottom: 70,
                alignSelf: 'center',
                borderRadius: 5,
              }}
              onPress={() => onApply(result)}
              selects={symptom}
            >
              <Card>
                <LeftCard>
                  <ProfileImage
                    source={{
                      uri: result.doctor.profileImage,
                    }}
                  />
                </LeftCard>
                <View style={{ margin: 5, borderRadius: 7, flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      textAlign: 'right',
                      paddingRight: 15,
                    }}
                  >
                    {moment()
                      .startOf('isoWeek')
                      .add(result.bookingTime, 'minutes')
                      .format('HH:mm')}{' '}
                    น.
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      textAlign: 'right',
                      paddingRight: 20,
                    }}
                  >
                    {moment(result.bookingDay).format('Do MMM')}
                  </Text>
                  {result.status == 'PATIENT_PENDING_PAYMENT' ||
                  result.status == 'PHARMACY_PENDING_BOOKING' ||
                  result.status == 'PHARMACY_PENDING_RX' ||
                  result.status == 'DOCTOR_PENDING_RX' ||
                  result.status == 'DOCTOR_PENDING' ? (
                    <Text style={{ color: 'orange' }}>{result.thaiStatus}</Text>
                  ) : result.status == 'BOOKING_COMPLETED' ||
                    result.status == 'DOCTOR_COMPLETED' ||
                    result.status == 'PHARMACY_COMPLETED' ? (
                    <Text style={{ color: 'blue' }}>{result.thaiStatus}</Text>
                  ) : (
                    <Text style={{ color: 'green' }}>{result.thaiStatus}</Text>
                  )}
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      textAlign: 'left',
                    }}
                  >
                    {result.doctor.fullname}
                  </Text>
                  <View style={{ marginTop: 5, flexDirection: 'row' }}>
                    <Text
                      caption1
                      numberOfLines={1}
                      style={{ flex: 1, color: '#A5A4A4' }}
                    >
                      {result.doctor &&
                        result.doctor.detail &&
                        result.doctor.detail.department}
                    </Text>
                  </View>
                  <View style={{ marginTop: 8, flexDirection: 'row' }}>
                    <Text
                      caption1
                      numberOfLines={1}
                      style={{ flex: 1, color: '#000000' }}
                    >
                      {result.doctorw &&
                        result.doctor.detail &&
                        result.doctor.detail.hospital}
                    </Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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

export default connect(mapStateToProps)(MyBookings);
