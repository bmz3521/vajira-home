import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  TouchableHighlight,
} from 'react-native';
import { BaseStyle, BaseColor, Images } from '@config';
import { Header, SafeAreaView, Icon } from '@components';
import { connect } from 'react-redux';
import _, { indexOf, sumBy, sum } from 'lodash';
import styles from './styles';
import config from '@_config';

import stylesCard, {
  Card,
  ProfileImage,
  LeftCard,
  Tag,
  TagText,
  Image,
  TopCard,
} from './style';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { TelemedicineActions } from '@actions';
import axios from 'axios';
import { Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TimerComponent from './TimerComponent.js';
import LinearGradient from 'react-native-linear-gradient';
// import { color } from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MyBookingActivity(props) {
  const { navigation, userTele, route, user } = props;
  const dispatch = useDispatch();
  const [status, setStatus] = useState('');
  const [price, setPrice] = useState('');
  const [doctor, setDoctor] = useState(false);
  const [otherType, setOtherType] = useState(null);
  const [otherTypeName, setOtherTypeName] = useState('');
  const [loading, setLoading] = useState(true);
  const [sumRefund, setSumRefund] = useState(0);
  const [booking, setBooking] = useState(false);
  const [pharmacyUI, setPharmacyUI] = useState(false);
  const [doctorUI, setDoctorUI] = useState(false);
  const [patientId, setPatientId] = useState(false);
  const [vnNumber, setVnNumber] = useState(false);
  // const [visible, setVisible] = useState(false);
  const [prescription, setPrescription] = useState('');
  const [billing, setBilling] = useState([]);
  const [visitNumber, setVisit] = useState();
  const [dataItem, setData] = useState();
  const [officer, setOfficer] = useState('pharmacy');
  const {
    bookingTime,
    bookingDay,
    bookingId,
    doctorId,
    prescriptionId,
  } = route.params;

  var pharmacyId = doctorId;
  const formatBooking = moment(bookingDay).format('YYYY-MM-DD');

  const onTelepayment = result => {
    navigation.navigate('TelePayment', {
      bookingId: bookingId,
      doctor: doctor,
    });
  };

  const onPharmacypayment = result => {
    navigation.navigate('PharmacyPayment', {
      prescription: prescription,
      bookingId: bookingId,
      price: newPrice,
    });
  };

  const onApply = result => {
    const data = {
      symptom: result,
    };
    navigation.navigate('VideoCall', {
      day: bookingDay,
      time: bookingTime,
      bookingId: bookingId,
      prescriptionId: prescriptionId,
      pharmacyId: pharmacyId,
      officer: officer,
      otherTypeName: otherTypeName,
      price,
      doctor: userTele?.dataTele,
    });
  };

  const onClick = result => {
    const data = {
      symptom: result,
    };

    navigation.navigate('PharmacyAppointment', {
      day: bookingDay,
      time: bookingTime,
      bookingId: bookingId,
      prescriptionId: prescriptionId,
      doctorId: doctor?.id,
    });
  };

  const onChatHistory = () => {
    navigation.navigate('TeleChatMessages', {
      bookingId: bookingId,
      isNavigate: true,
      onlyRead: true,
    });
  };

  const optionRoute = option => {
    if (option == 'pharmacyCall') {
      onApply();
    } else if (option == 'pharmacyListing') {
      onClick();
    } else if (option == 'telePayment') {
      onTelepayment();
    } else if (option == 'pharmacyPayment') {
      onPharmacypayment();
    } else if (option == 'chatHistory') {
      onChatHistory();
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${config.VA_API_URL}/Bookings/${bookingId}?filter[include]=doctor&filter[include]=prescription`,
        );

        console.log('data');
        console.log(data);

        if (
          data.status === 'EPHIS_CONFIRM' ||
          data.status === 'PHARMACY_PENDING_BOOKING' ||
          data.status === 'PHARMACY_CONFIRM_BOOKING' ||
          data.status === 'PHARMACY_COMPLETED'
        ) {
          setPharmacyUI(true);
        } else {
          setDoctorUI(true);
        }

        setBooking(data);
        setStatus(data?.status);
        setDoctor(data?.doctor);
        setOtherType(data?.doctor?.roles[0]?.name);
        setOtherTypeName(data?.doctor?.roles[0]?.description);
        if (data.patientId && data.vnNumber) {
          setPatientId(data?.patientId);
          setVnNumber(data?.vnNumber);
        }
        if (data.prescriptionId !== undefined) {
          setPrescription(data?.prescription);
        } else {
          setPrice(0);
        }
        if (data.doctorId === 0) {
          dispatch(TelemedicineActions.setTelemedicine({ doctor: false }));
        } else if (data?.doctor) {
          dispatch(
            TelemedicineActions.setTelemedicine({ doctor: data?.doctor }),
          );
        }
      } catch (error) {
        console.log('error fetching booking data', error);
      }
    };
    const checkDataFromHie = async () => {
      try {
        const response = await axios.get(
          `${config.VA_API_URL}/UserInfos/checkUserVisitedByVerifiedFromHIE?patientId=${user?.data?.id}`,
        );
        if (response.data && response.data.docs) {
          setData(response?.data?.docs);
        }
      } catch (error) {
        console.log('error checking data from HIE', error);
      }
    };
    checkDataFromHie();
    fetchUser();
    setLoading(false);
  }, []);

  useEffect(() => {
    const checkDrugs = async () => {
      try {
        const response = await axios.get(
          `${config.VA_API_URL}/UserInfos/checkDrugsDetailByOrderNo`,
          {
            params: {
              patientId: patientId,
              orderNumber: vnNumber,
            },
          },
        );

        if (response.data && response.data.length) {
          setBilling(response?.data);
          const sumRefund = res?.data?.map(d => {
            return d?.refund * d?.qty;
          });
          setSumRefund(sumRefund);
        }
      } catch (error) {
        console.log('error checking drug details', error);
      }
    };
    if (patientId && vnNumber) {
      checkDrugs();
    }
  }, [patientId, vnNumber]);

  const newDate = moment(booking.admitTime).format('Do MMMM YYYY');
  const newTimes = moment()
    .startOf('isoWeek')
    .add(booking?.bookingTime, 'minutes')
    .format('HH:mm');

  let endTimes = null;
  if (booking && booking.bookingEndTime) {
    endTimes = moment()
      .startOf('isoWeek')
      .add(booking?.bookingEndTime, 'minutes')
      .format('HH:mm');
  }

  // const newTime = `${newDate} ${newTimes}`;
  const isDay = moment()
    .startOf('isoWeek')
    .add(booking?.bookingTime, 'minutes')
    .format('YYYY-MM-Do');

  const checkDay = moment().isSame(isDay, 'day');

  const isTime = moment()
    .startOf('isoWeek')
    .add(booking?.bookingTime, 'minutes')
    .format('h:mma');

  const nowTime = moment().format('h:mma');

  var beginningTime = moment(isTime, 'h:mma');
  var endTime = moment(nowTime, 'h:mma');

  const checkTime = beginningTime?.isBefore(endTime);

  const billingItems = [];

  for (let i in dataItem) {
    if (dataItem[i]?.billingItems.length > 0) {
      billingItems.push(dataItem[i]?.billingItems);
    }
  }

  var drugPrice = [];

  for (let i in billingItems[0]) {
    drugPrice?.push(billingItems[0][i]?.sumPrice);
  }

  var newPrice = drugPrice?.reduce((a, b) => a + b, 0);

  var salerate = [];

  for (let i in billingItems[0]) {
    salerate.push(billingItems[0][i]?.salerate);
  }

  var refund = [];

  for (let i in billingItems[0]) {
    refund.push(billingItems[0][i]?.refund);
  }

  var qty = [];

  for (let i in billingItems[0]) {
    qty.push(billingItems[0][i]?.qty);
  }

  var totalValue = salerate.map(function(item, index) {
    return item - refund[index];
  });

  var totalNumber = totalValue.map(function(item, index) {
    return item * qty[index];
  });

  var totalPrice = totalNumber.reduce((a, b) => a + b, 0);

  var patientState = '';
  var doctorState = '';
  let icon = '';
  let statusText = '';
  let statusUser = '';
  let textColor = '';
  let ctaEnable = false;
  let buttonText = '';
  let optionSelect = '';
  //Option
  const pharmacyCall = 'pharmacyCall';
  const pharmacyPayment = 'pharmacyPayment';
  const pharmacyListing = 'pharmacyListing';
  const telePayment = 'telePayment';
  const chatHistory = 'chatHistory';

  let descriptionText = '';

  switch (status) {
    case 'DOCTOR_CONFIRM':
      doctorState = 'docConfirm';
      statusText = 'ได้รับการอนุมัติ';
      textColor = 'green';
      icon = 'doctor';
      ctaEnable = true;
      buttonText = 'เริ่มปรึกษาแพทย์';
      optionSelect = telePayment;
      descriptionText = 'เวลานัดแพทย์ทางไกล';
      break;

    case 'DOCTOR_PENDING':
      doctorState = 'docPending';
      statusText = 'รอแพทย์ยืนยันการนัดหมาย';
      textColor = 'orange';
      icon = 'doctor';
      descriptionText = 'เวลานัดแพทย์ทางไกล';
      break;

    case 'DOCTOR_COMPLETE':
      doctorState = 'docComplete';
      statusText = 'สิ้นสุดการปรึกษาแพทย์';
      textColor = 'green';
      icon = 'doctor';
      descriptionText = 'เวลานัดแพทย์ทางไกล';
      optionSelect = chatHistory;
      break;

    case 'DOCTOR_DECLINE':
      doctorState = 'docDecline';
      statusText = 'แพทย์ยกเลิกการนัดหมาย';
      textColor = 'red';
      icon = 'doctor';
      descriptionText = 'เวลานัดแพทย์ทางไกล';
      break;

    case 'DOCTOR_PENDING_RX':
      doctorState = 'docRx';
      statusText = 'รอแพทย์จ่ายยา';
      textColor = 'orange';
      icon = 'doctor-Rx';
      descriptionText = 'วันที่พบหมอ';
      break;

    case 'DOCTOR_ALERT':
      doctorState = 'docAlert';
      textColor = 'red';
      statusText = 'การโทรมีปัญหา';
      icon = 'doctor';
      descriptionText = 'วันที่พบหมอล่าสุด';
      break;

    case 'PATIENT_DRAFT':
      patientState = 'patientDraft';
      statusText = 'รอการยืนยัน';
      textColor = '#F4C221';
      icon = 'doctor';
      descriptionText = 'เวลานัดแพทย์ทางไกล';
      break;

    case 'PATIENT_SUCCESS_PAYMENT':
      patientState = 'patientSuccess';
      textColor = 'green';
      statusText = 'ผู้ป่วยชำระเงินสำเร็จ';
      icon = 'doctor';
      ctaEnable = true;
      buttonText = 'กรุณาเลือกเวลานัดหมาย';
      optionSelect = pharmacyListing;
      descriptionText = 'วันที่พบหมอล่าสุด';
      break;

    case 'PATIENT_DECLINE_PAYMENT':
      patientState = 'patientDecline';
      textColor = 'red';
      statusText = 'ผู้ป่วยยกเลิกการชำระเงิน';
      icon = 'doctor';
      descriptionText = 'วันที่พบหมอล่าสุด';
      break;

    case 'PHARMACY_PENDING_RX':
      patientState = 'pharmacyPending';
      textColor = 'orange';
      statusText = 'รอเภสัชกรตรวจยา';
      icon = 'Rx';
      descriptionText = 'วันที่พบหมอล่าสุด';
      break;

    case 'PHARMACY_COMPLETE_RX':
      patientState = 'pharmacyComplete';
      textColor = 'green';
      statusText = 'เภสัชกรตรวจยาเสร็จแล้ว';
      icon = 'Rx';
      descriptionText = 'วันที่พบหมอล่าสุด';
      break;

    case 'PHARMACY_PENDING_BOOKING':
      patientState = 'pharmacyBooking';
      statusText = 'รอการยืนยัน';
      textColor = 'orange';
      icon = 'Rx';
      descriptionText = 'เวลานัดแพทย์ทางไกล';
      break;

    case 'PHARMACY_CONFIRM_BOOKING':
      patientState = 'pharmacyConfirm';
      statusText = 'เภสัชกรยืนยันการนัดหมายสำเร็จ';
      textColor = 'green';
      icon = 'Rx';
      ctaEnable = true;
      buttonText = 'เริ่มปรึกษาเภสัชกร';
      optionSelect = pharmacyCall;
      descriptionText = 'เวลานัดแพทย์ทางไกล';
      break;

    case 'PHARMACY_DECLINE_BOOKING':
      patientState = 'pharmacyDecline';
      textColor = 'red';
      statusText = 'เภสัชกรยกเลิกการนัดหมาย';
      icon = 'Rx';
      descriptionText = 'วันที่พบหมอล่าสุด';
      break;

    case 'PHARMACY_ALERT':
      patientState = 'pharmacyAlert';
      textColor = 'red';
      statusText = 'การโทรมีปัญหารอทีมงานจองเวลาใหม่';
      icon = 'Rx';
      descriptionText = 'วันที่พบหมอล่าสุด';
      break;

    case 'CALL_CENTER_CONFIRM':
      patientState = 'centerConfirm';
      textColor = 'orange';
      statusText = 'รอผู้ป่วยดำเนินการชำระเงิน';
      icon = 'doctor';
      ctaEnable = true;
      buttonText = 'ชำระเงินค่าปรึกษาแพทย์';
      optionSelect = pharmacyPayment;
      descriptionText = 'วันที่พบหมอ';
      break;

    case 'CALL_CENTER_DECLINE':
      patientState = 'centerDecline';
      textColor = 'red';
      statusText = 'เจ้าหน้าที่ยกเลิกการนัดหมาย';
      icon = 'doctor';
      descriptionText = 'วันที่พบหมอล่าสุด';
      break;

    case 'EPHIS_CONFIRM':
      patientState = 'ephisConfirm';
      textColor = 'green';
      statusText = 'ทำการนัดหมายเภสัชกร';
      icon = 'Rx';
      ctaEnable = true;
      buttonText = 'กรุณาเลือกเวลานัดหมาย';
      optionSelect = pharmacyListing;
      descriptionText = 'วันที่พบหมอล่าสุด';
      break;

    case 'EPHIS_PENDING':
      patientState = 'ephisPending';
      statusText = 'รอแพทย์สั่งยา';
      textColor = 'orange';
      icon = 'Rx';
      descriptionText = 'เวลานัดแพทย์ทางไกล';
      break;

    // case 'BOOKING_COMPLETED':
    //   patientState = 'bookingComplete';
    //   textColor = 'blue';
    //   statusText = 'เสร็จสิ้นการพบแพทย์';
    //   icon = 'Rx';
    //   descriptionText = 'วันที่พบหมอล่าสุด';
    //   optionSelect = chatHistory;
    //   break;

    case 'DOCTOR_COMPLETED':
      patientState = 'doctorComplete';
      statusText = 'เสร็จสิ้นการพบแพทย์';
      textColor = 'blue';
      icon = 'doctor';
      descriptionText = 'วันที่พบหมอล่าสุด';
      optionSelect = chatHistory;
      break;

    case 'PHARMACY_COMPLETED':
      patientState = 'pharmacyComplete';
      statusText = 'เสร็จสิ้นการพบเภสัชกร';
      textColor = 'blue';
      icon = 'Rx';
      descriptionText = 'วันที่พบเภสัชล่าสุด';
      optionSelect = chatHistory;
      break;

    case 'STAFF_CONFIRM':
      doctorState = 'staffConfirm';
      statusText = 'ได้รับการอนุมัติ';
      textColor = 'green';
      icon = 'doctor';
      ctaEnable = true;
      buttonText = `เริ่มปรึกษา${
        otherTypeName
          ? otherTypeName
          : otherType === 'physiotherapist'
          ? 'นักกายภาพบำบัด'
          : otherType === 'nurse'
          ? 'พยาบาล'
          : 'แพทย์'
      }`;
      // 'เริ่มปรึกษา' + otherTypeName;
      // otherType === 'physiotherapist'
      //   ? 'เริ่มปรึกษานักกายภาพบำบัด'
      //   : otherType === 'nurse'
      //   ? 'เริ่มปรึกษาพยาบาล'
      //   : otherType === 'speechCorrectionSpecialist'
      //   ? 'เริ่มปรึกษานักแก้ไขการพูด-การได้ยิน'
      //   : '';
      optionSelect = telePayment;
      descriptionText = 'เวลานัดแพทย์ทางไกล';
      break;

    case 'STAFF_PENDING':
      doctorState = 'staffPending';
      statusText = 'รอเจ้าหน้าที่ยืนยันการนัดหมาย';
      textColor = 'orange';
      icon = 'doctor';
      descriptionText = 'เวลานัดแพทย์ทางไกล';
      break;

    case 'STAFF_COMPLETE':
      doctorState = 'staffComplete';
      statusText = 'สิ้นสุดการปรึกษาเจ้าหน้าที่';
      textColor = 'green';
      icon = 'doctor';
      descriptionText = 'เวลานัดแพทย์ทางไกล';
      optionSelect = chatHistory;
      break;

    case 'STAFF_DECLINE':
      doctorState = 'staffDecline';
      statusText = 'เจ้าหน้าที่ยกเลิกการนัดหมาย';
      textColor = 'red';
      icon = 'doctor';
      descriptionText = 'เวลานัดแพทย์ทางไกล';
      break;

    case 'STAFF_ALERT':
      doctorState = 'staffAlert';
      textColor = 'red';
      statusText = 'การโทรมีปัญหา';
      icon = 'doctor';
      descriptionText = 'วันที่พบเจ้าหน้าที่ล่าสุด';
      break;

    case 'STAFF_COMPLETED':
      patientState = 'staffComplete';
      statusText = `เสร็จสิ้นการพบ${
        otherTypeName
          ? otherTypeName
          : otherType === 'physiotherapist'
          ? 'นักกายภาพบำบัด'
          : otherType === 'nurse'
          ? 'พยาบาล'
          : ''
      }`;
      textColor = 'blue';
      icon = 'doctor';
      descriptionText = 'วันที่พบเจ้าหน้าที่ล่าสุด';
      optionSelect = chatHistory;
      break;
  }

  if (loading === true) {
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        <Header
          title="รายละเอียดรายการ"
          textStyle={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}
          renderLeft={() => {
            return <Icon bold name="chevron-left" size={20} color="#fff" />;
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
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
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="รายละเอียดรายการ"
        textStyle={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <Card>
          <View style={styles.makeRow}>
            {pharmacyUI ? (
              <Icon name="prescription-bottle-alt" style={styles.titleIcon} />
            ) : doctorUI ? (
              <Icon name="stethoscope" style={styles.titleIcon} />
            ) : null}
            <Text style={styles.titleText}>
              นัดหมาย
              {pharmacyUI
                ? 'เภสัชกร'
                : otherTypeName
                ? otherTypeName
                : otherType === 'physiotherapist'
                ? 'นักกายภาพบำบัด'
                : otherType === 'nurse'
                ? 'พยาบาล'
                : 'แพทย์'}
            </Text>
            <View style={styles.status}>
              <View
                style={[styles.statusIcon, { backgroundColor: textColor }]}
              />
              <Text style={[styles.statusText, { color: textColor }]}>
                {statusText}
              </Text>
            </View>
          </View>

          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>

          <TopCard>
            <View style={styles.makeRow}>
              {pharmacyUI ? (
                <ProfileImage
                  style={styles.userAva}
                  source={Images.pharmacy_logo}
                />
              ) : doctorUI && doctor?.profileImage ? (
                <ProfileImage
                  style={styles.userAva}
                  source={{
                    uri: doctor?.profileImage,
                  }}
                />
              ) : (
                <View style={styles.userAva} />
              )}

              <View style={styles.userProfile}>
                {pharmacyUI ? (
                  <View />
                ) : doctorUI ? (
                  <View style={styles.wrapName}>
                    <Text style={styles.doctorName}>
                      {doctor?.fullname ?? ''}
                      {/* {doctor && doctor.fullname ? doctor.fullname : ''} */}
                    </Text>
                  </View>
                ) : (
                  <View />
                )}

                {pharmacyUI ? (
                  <>
                    <View style={styles.doctorProfile}>
                      <View style={styles.wrapName}>
                        <View>
                          <Icon
                            name="notes-medical"
                            style={styles.detailIcon}
                          />
                        </View>
                        <Text style={styles.detailText}>
                          หน่วยจ่ายยา Telepharmacy
                        </Text>
                      </View>
                    </View>
                    <View style={styles.doctorProfile}>
                      <View style={styles.wrapName}>
                        <View>
                          <Icon name="hospital" style={styles.detailIcon} />
                        </View>
                        <Text style={styles.detailText}>
                          โรงพยาบาลวชิรพยาบาล คณะแพทยศาสตร์วชิรพยาบาล
                        </Text>
                      </View>
                    </View>
                  </>
                ) : doctorUI ? (
                  <>
                    <View style={styles.doctorProfile}>
                      <View style={styles.wrapName}>
                        <View>
                          <Icon
                            name="notes-medical"
                            style={styles.detailIcon}
                          />
                        </View>
                        <Text style={styles.detailText}>
                          {/* {doctor && doctor.detail && doctor.detail.department} */}
                          {doctor?.detail?.department}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.doctorProfile}>
                      <View style={styles.wrapName}>
                        <View>
                          <Icon name="hospital" style={styles.detailIcon} />
                        </View>
                        <Text style={styles.detailText}>
                          คณะแพทยศาสตร์{' '}
                          {/* {doctor && doctor.detail && doctor.detail.hospital} */}
                          {doctor?.detail?.hospital}
                        </Text>
                      </View>
                    </View>
                  </>
                ) : (
                  <View />
                )}
              </View>
            </View>

            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>

            <View style={styles.makeRow}>
              {booking?.status !== 'EPHIS_CONFIRM' ? (
                <>
                  <Icon name="calendar" style={styles.timeIcon} />
                  {booking?.status === 'PHARMACY_CONFIRM_BOOKING' ||
                  booking?.status === 'PHARMACY_PENDING_BOOKING' ||
                  booking?.status === 'PHARMACY_COMPLETED' ? (
                    <Text style={styles.timeText}>วันและเวลาที่นัดหมาย:</Text>
                  ) : null}
                </>
              ) : null}

              {/* {booking.status === 'PHARMACY_COMPLETED' || 'DOCTOR_COMPLETED' ?
                <TouchableOpacity
                  underlayColor="transparent"
                  onPress={() =>
                    navigation.navigate('TeleChatMessages', {
                      isNavigate: true,
                    })
                  }
                >
                  <View style={styles.massageButton}>
                    <Icon name="comment-dots" style={styles.massageIcon} />
                    <Text style={styles.greenText}>ประวัติการสนทนา</Text>
                  </View>
                </TouchableOpacity> : null
              } */}
            </View>

            {newTimes && booking?.status !== 'EPHIS_CONFIRM' ? (
              <View
                style={[
                  styles.appointmentContainer,
                  { flexDirection: 'column' },
                ]}
              >
                <View>
                  <Text style={styles.appoitnmentText}>{newDate}</Text>
                </View>
                <View>
                  {endTimes ? (
                    <Text style={styles.appoitnmentText}>
                      เวลา {newTimes} - {endTimes} น.
                    </Text>
                  ) : (
                    <Text style={styles.appoitnmentText}>
                      เวลา {newTimes} น.
                    </Text>
                  )}
                </View>
              </View>
            ) : null}

            {pharmacyUI ? (
              <>
                <View style={styles.makeRow}>
                  <Icon name="stethoscope" style={styles.timeIcon} />
                  <Text style={styles.timeText}>แพทย์ที่สั่งยา:</Text>
                </View>
                <View style={styles.appointmentContainer}>
                  {/* {doctor ? (
                    <Text style={styles.appoitnmentText}>
                      {doctor.fullname}
                    </Text>
                  ) : (
                    <Text style={styles.appoitnmentText}>...</Text>
                  )} */}
                  <Text style={styles.appoitnmentText}>{doctor?.fullname}</Text>
                </View>
                <View style={styles.makeRow}>
                  <Icon name="map-marker-alt" style={styles.timeIcon} />
                  <Text style={styles.timeText}>ห้องตรวจ:</Text>
                </View>
                <View
                  style={[
                    styles.appointmentContainer,
                    { flexDirection: 'column' },
                  ]}
                >
                  {/* {doctor && doctor.detail ? (
                    <>
                      <Text
                        style={[styles.appoitnmentText, { marginBottom: 5 }]}
                      >
                        {doctor.detail.department}
                      </Text>
                      <Text style={styles.appoitnmentText}>
                        {doctor.detail.specialist}
                      </Text>
                    </>
                  ) : (
                    <Text style={styles.appoitnmentText}>...</Text>
                  )} */}
                  <Text style={[styles.appoitnmentText, { marginBottom: 5 }]}>
                    {doctor?.detail?.department}
                  </Text>
                  <Text style={styles.appoitnmentText}>
                    {doctor?.detail?.specialist}
                  </Text>
                </View>
              </>
            ) : doctorUI ? (
              <>
                <View style={styles.makeRow}>
                  <Icon name="notes-medical" style={styles.timeIcon} />
                  <Text style={styles.timeText}>แผนก:</Text>
                </View>
                <View style={styles.appointmentContainer}>
                  <Text style={styles.appoitnmentText}>
                    {/* {doctor && doctor.detail && doctor.detail.department} */}
                    {doctor?.detail?.department}
                  </Text>
                </View>
                <View style={styles.makeRow}>
                  <Icon name="map-marker-alt" style={styles.timeIcon} />
                  <Text style={styles.timeText}>ห้องตรวจ:</Text>
                </View>
                <View style={styles.appointmentContainer}>
                  <Text style={styles.appoitnmentText}>
                    {doctor?.detail?.specialist}
                  </Text>
                </View>
              </>
            ) : null}

            {ctaEnable ? (
              <View style={styles.buttonGroupContainer}>
                {checkDay && checkTime ? (
                  <LinearGradient
                    style={styles.buttonAllowContainer}
                    colors={['#0A905F', '#095C3E']}
                  >
                    <TouchableOpacity
                      underlayColor="grey"
                      style={{ width: '100%', alignItems: 'center' }}
                      disabled={false}
                      onPress={() => optionRoute(optionSelect)}
                    >
                      <Text style={styles.buttonText}>{buttonText}</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                ) : (
                  <LinearGradient
                    style={styles.buttonAllowContainer}
                    colors={['#0A905F', '#095C3E']}
                  >
                    <TouchableOpacity
                      underlayColor="grey"
                      style={{ width: '100%', alignItems: 'center' }}
                      disabled={false}
                      onPress={() => optionRoute(optionSelect)}
                    >
                      <Text style={styles.buttonText}>{buttonText}</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                )}
              </View>
            ) : (
              <View style={styles.buttonGroupContainer}>
                {booking.status === 'PHARMACY_COMPLETED' ||
                'DOCTOR_COMPLETED' ? (
                  <TouchableOpacity
                    underlayColor="grey"
                    disabled={false}
                    style={styles.buttonMassageContainer}
                    onPress={() => optionRoute(chatHistory)}
                  >
                    <Text style={styles.buttonTextBlack}>ประวัติการสนทนา</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableHighlight
                    underlayColor="grey"
                    disabled={false}
                    style={styles.buttonNotAllowContainer}
                    onPress={() => {}}
                  >
                    <Text style={styles.buttonText}>เริ่มปรึกษา</Text>
                  </TouchableHighlight>
                )}
              </View>
            )}
          </TopCard>
        </Card>
        <View style={styles.footnoteContainer}>
          <Text style={styles.footnote}>
            ท่านจะสามารถโทรคุยกับ
            {pharmacyUI
              ? 'เภสัชกร'
              : otherType === 'physiotherapist'
              ? 'นักกายภาพบำบัด'
              : otherType === 'nurse'
              ? 'พยาบาล'
              : otherType === 'doctor'
              ? 'แพทย์'
              : ''}
            ผู้ให้คำปรึกษาได้ ในวันและเวลาที่นัดหมาย
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            margin: 4,
            marginBottom: 10,
            borderRadius: 10,
            backgroundColor: 'white',
            shadowColor: '#000',
            elevation: 3,
            padding: 10,
          }}
        >
          <Text style={{ marginBottom: 8 }}>หากสงสัยหรือติดปัญหา</Text>
          <Text>วันจันทร์ - ศุกร์ 8.00 - 16.00 น.</Text>
          <Text style={{ marginBottom: 8 }}>
            ติดต่อ Call Center ได้ที่เบอร์ 02-2443000 ต่อ 5340
            (เฉพาะในเวลาราชการเท่านั้น)
          </Text>
          <Text>วันจันทร์ - ศุกร์ 16.00 - 20.00 น.</Text>
          <Text>ติดต่อ เภสัชกร ได้ที่เบอร์ 02-2443000 ต่อ 5442</Text>
        </View>
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

export default connect(mapStateToProps)(MyBookingActivity);
