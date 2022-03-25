import React, { useState, useEffect } from 'react';
import { View, ScrollView, Button, TouchableOpacity, Text } from 'react-native';
import { BaseStyle, BaseColor, Images } from '@config';
import { Header, SafeAreaView, Icon } from '@components';
import config from '@_config';
import { connect } from 'react-redux';
import _, { indexOf } from 'lodash';
import styles from './styles';
import stylesCard, {
  Card,
  ProfileImage,
  LeftCard,
  Tag,
  TagText,
  Image,
} from './style';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { TelemedicineActions } from '@actions';
import axios from 'axios';
import firebase from '@react-native-firebase/app';
import 'moment/locale/th'; // without this line it didn't work
moment.locale('th');
import Modal from 'react-native-modal';

function MyHealthHistory(props) {
  const { navigation, userTele, route } = props;
  const dispatch = useDispatch();
  const [status, setStatus] = useState('');
  const [price, setPrice] = useState('');
  const [doctor, setDoctor] = useState({});
  const [visible, setVisible] = useState(false);
  const [minuteTimes, setMinute] = useState();
  const { booking } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const bookingTime = booking.bookingTime;
  const bookingDay = booking.bookingDay;
  const bookingId = booking.bookingId;
  const prescriptionId = booking.prescriptionId;
  const doctorId = booking.doctorId;

  // const bookingDay = navigation.getParam('day')
  // const bookingTime = navigation.getParam('time')
  // const bookingId = navigation.getParam('bookingId')
  // const prescriptionId = navigation.getParam('prescriptionId')
  // const doctorId = navigation.getParam('doctorId')

  console.log('bookingId---------------------------------');
  console.log(route.params.booking);
  const history = route.params.booking;
  console.log(doctorId);
  var pharmacyId = doctorId;

  const onApply = result => {
    const data = {
      symptom: result,
    };

    dispatch(TelemedicineActions.setTelemedicine(data));
    navigation.navigate('PharmacyPayment', {
      day: bookingDay,
      time: bookingTime,
      bookingId: bookingId,
      prescriptionId: prescriptionId,
      pharmacyId: pharmacyId,
      price,
    });
  };

  const onClick = result => {
    const data = {
      symptom: result,
    };

    dispatch(TelemedicineActions.setTelemedicine(data));
    navigation.navigate('TelePharmacist', {
      day: bookingDay,
      time: bookingTime,
      bookingId: bookingId,
      prescriptionId: prescriptionId,
    });
  };

  var userId = userTele.dataTele.id || 1;

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const response = await axios.get(
      `${config.VA_API_URL}/Bookings/${bookingId}?filter[include]=doctor&filter[include]=prescription`,
    );
    setStatus(response.data.status);
    setDoctor(response.data.doctor);

    if (prescriptionId !== undefined) {
      setPrice(response.data.prescription.sumprice);
    } else {
      setPrice(0);
    }
  };

  const newTime = moment(history.bookingTime).format('HH:mm');
  const newDay = moment(history.bookingTime).format('Do MMMM YYYY');

  var appointmentTime = `${newDay}, ${newTime}`;

  var nowTime = moment().format('Do MMMM, HH:mm');

  var patientState = '';
  var doctorState = '';
  let icon = '';
  let statusUser = '';

  switch (status) {
    case 'DOCTOR_CONFIRM':
      doctorState = 'docConfirm';
      statusUser = 'หมอยืนยันการนัด';
      icon = 'doctor';
      break;
    case 'DOCTOR_PENDING':
      doctorState = 'docPending';
      statusUser = 'รอหมอยืนยันการนัด';
      icon = 'doctor';

      break;
    case 'DOCTOR_DECLINE':
      doctorState = 'docDecline';
      statusUser = 'หมอยกเลิกการนัด';
      icon = 'doctor';

      break;
    case 'DOCTOR_PENDING_RX':
      doctorState = 'docRx';
      statusUser = 'หมอรอจ่ายยา';
      icon = 'doctor';

      break;
    case 'PATIENT_PENDING_PAYMENT':
      patientState = 'patientPending';
      statusUser = 'รอผู้ป่วยดำเนินการชำระเงิน';
      icon = 'doctor';

      break;
    case 'PATIENT_SUCCESS_PAYMENT':
      patientState = 'patientSuccess';
      statusUser = 'เลือกเภสัชกรเพื่อรับยา';
      icon = 'doctor';

      break;
    case 'PATIENT_DECLINE_PAYMENT':
      patientState = 'patientDecline';
      statusUser = 'ผู้ป่วยยกเลิกการชำระเงิน';
      icon = 'doctor';

      break;
    case 'PHARMACY_PENDING_RX':
      patientState = 'pharmacyPending';
      statusUser = 'รอเภสัชกรตรวจยา';
      icon = 'doctor';

      break;
    case 'PHARMACY_PENDING_BOOKING':
      patientState = 'pharmacyBooking';
      statusUser = 'รอเภสัชกรยืนยันนัดหมาย';
      icon = 'doctor';

      break;
    case 'PHARMACY_CONFIRM_BOOKING':
      patientState = 'pharmacyConfirm';
      statusUser = 'เภสัชกรยืนยันนัดหมาย';
      icon = 'doctor';
      break;
  }

  console.log('patient');
  console.log(patientState);
  console.log(bookingId);
  console.log('pharmacy');
  console.log(price);
  console.log(prescriptionId);

  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <Card>
          <ScrollView>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flex: 0.5 }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        marginTop: 17,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}
                    >
                      รายการยา
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.5,
                      alignItems: 'flex-end',
                      alignSelf: 'center',
                      marginRight: 20,
                      marginTop: 10,
                    }}
                  >
                    <TouchableOpacity onPress={toggleModal}>
                      <Icon name="times" color="black" size={20} solid />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text body2 bold></Text>
                <View style={{ marginBottom: 30, paddingHorizontal: 0 }}>
                  {history.billingItems.map(item => (
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        paddingVertical: 20,
                        borderTopWidth: 1,
                        borderColor: '#eeeeee',
                      }}
                    >
                      <View style={{ flex: 0.2 }}>
                        <Text style={{ marginTop: 0, fontWeight: 'bold' }}>
                          {item.qty}x
                        </Text>
                      </View>
                      <View style={{ flex: 0.8, flexDirection: 'column' }}>
                        <Text style={{ marginTop: 0 }}>
                          {item.drugNondugFullName}
                        </Text>
                        <Text style={{ marginTop: 0, fontWeight: 'bold' }}>
                          {item.drugUsage}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    borderBottomColor: '#000000',
                    borderBottomWidth: 7,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 14,
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </Card>
      </Modal>

      <Image source={Images.room6} style={[styles.imgBanner]} />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        <Header
          title=""
          renderLeft={() => {
            return (
              <Icon name="arrow-left" size={20} color={BaseColor.blackColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
            // changeStatus()
          }}
        />
        <ScrollView>
          <View style={{ paddingHorizontal: 5 }}>
            <View style={[styles.contentBoxTop]}>
              <Card>
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flex: 1,
                    }}
                  >
                    <Image
                      source={Images.homeicon7}
                      style={{
                        width: 80,
                        height: 80,
                        marginLeft: 0,
                        marginBottom: 0,
                      }}
                    />

                    {statusUser == 'เภสัชกรยืนยันนัดหมาย' ||
                    statusUser == 'หมอยืนยันการนัด' ||
                    statusUser == 'เลือกเภสัชกรเพื่อรับยา' ||
                    statusUser == 'รอผู้ป่วยดำเนินการชำระเงิน' ? (
                      <Text
                        style={{ color: 'red', marginTop: 10, fontSize: 20 }}
                      >
                        {statusUser}
                      </Text>
                    ) : (
                      <Text
                        style={{ color: 'green', fontSize: 20, marginTop: 10 }}
                      >
                        {statusUser}
                      </Text>
                    )}
                    <Text
                      numberOfLines={1}
                      style={{ marginTop: 0, marginBottom: 10, fontSize: 20 }}
                    >
                      เวลาที่เข้าพบแพทย์
                    </Text>
                    <View style={{ flexDirection: 'column' }}>
                      <Text
                        bold
                        numberOfLines={1}
                        style={{ marginTop: 0, fontSize: 30 }}
                      >
                        {newDay}{' '}
                      </Text>
                      <Text
                        bold
                        numberOfLines={1}
                        style={{ marginTop: 0, fontSize: 30 }}
                      >
                        {newTime} น.
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 100,
                        borderBottomColor: '#D8D8D8',
                        borderBottomWidth: 1,
                        paddingBottom: 20,
                        border: 'solid',
                      }}
                    ></View>
                    {/* {doctorState == 'docConfirm' || patientState == 'pharmacyConfirm' ?

										// <Text numberOfLines={1} style={{ marginTop: 0, paddingVertical: 20 }}>ติดต่อแพทย์โทรเวช</Text>
											// && nowTime == appointmentTime ?
											(
												<View>
													<TouchableOpacity onPress={() => { navigation.navigate("TelePayment", { pharmacyId, bookingId }) }}>
														<View style={{ borderWidth: 1, width: 80, height: 30, borderRadius: 5, margin: 5, alignItems: 'center', justifyContent: 'center' }}>
															<Text>เข้าห้องรอ</Text>
														</View>
													</TouchableOpacity>
												</View>
											) : (
												<View style={{ borderWidth: 1, width: 80, height: 30, borderRadius: 5, margin: 5, alignItems: 'center', justifyContent: 'center', borderColor: 'white' }}>
													<Text style={{ color: 'white' }}>Call</Text>
												</View>
											)
										} */}
                  </View>
                  <View style={{ paddingVertical: 30 }}>
                    <Text
                      numberOfLines={1}
                      bold
                      style={{ marginTop: 10, marginBottom: 10, fontSize: 20 }}
                    >
                      ชื่อแพทย์ที่เข้าพบ
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{ marginTop: 10, marginBottom: 10, fontSize: 30 }}
                    >
                      {history.doctorName}
                    </Text>
                  </View>
                </View>
              </Card>
            </View>
            <View style={[styles.contentBoxTop, { marginTop: 0 }]}>
              <Card>
                <View style={{ flex: 0.2 }}>
                  <Image
                    source={Images.homeicon4}
                    style={{ width: 60, height: 60, marginTop: 20 }}
                  />
                </View>
                <View style={{ flex: 0.8 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text>
                      {doctor && doctor.fullname ? doctor.fullname : ''}
                    </Text>
                  </View>
                  <View style={{ marginTop: 5, flexDirection: 'row' }}>
                    <Text
                      bold
                      style={{ marginTop: 0, fontSize: 16, fontWeight: 'bold' }}
                    >
                      {history.department}
                    </Text>
                  </View>
                  <View style={{ marginTop: 8, flexDirection: 'row' }}>
                    <Text
                      caption1
                      numberOfLines={1}
                      style={{ flex: 1, color: '#000000' }}
                    >
                      คณะแพทยศาสตร์วชิรพยาบาล
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      flexWrap: 'wrap',
                      marginTop: 10,
                    }}
                  >
                    {/* <Tag>
											<TagText>Infection Disease</TagText>
										</Tag>
										<Tag>
											<TagText>Diabetes</TagText>
										</Tag>
										<Tag>
											<TagText>Disorder Treat..</TagText>
										</Tag> */}
                  </View>
                </View>
              </Card>
              <Card>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    borderRadius: 5,
                  }}
                >
                  {patientState == 'pharmacyPending' ||
                  patientState == 'patientPending' ? (
                    <View style={{ alignItems: 'flex-start' }}>
                      <Text>รายการชำระเงินที่ {prescriptionId}</Text>
                      <Text>ราคา {price} บาท</Text>
                    </View>
                  ) : (
                    <View></View>
                  )}
                  {patientState == 'patientSuccess' ? (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          onClick();
                        }}
                      >
                        <View
                          style={{
                            borderWidth: 1,
                            width: 80,
                            height: 30,
                            borderRadius: 5,
                            margin: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Text>เลือกเภสัช</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : patientState == 'patientPending' ? (
                    <View>
                      <Button
                        onPress={() => onApply()}
                        title="ชำระเงิน"
                        style={{
                          borderWidth: 1,
                          width: 80,
                          height: 30,
                          borderRadius: 5,
                          margin: 5,
                          marginTop: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      />
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              </Card>
            </View>
            <View style={[styles.contentBoxTop, { marginTop: 0 }]}>
              <Card>
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        marginTop: 17,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}
                    >
                      รายการยา
                    </Text>
                    <Text body2 bold></Text>
                    <View style={{ marginBottom: 30, paddingHorizontal: 0 }}>
                      {history.billingItems.map(item => (
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                            paddingVertical: 20,
                            borderTopWidth: 1,
                            borderColor: '#eeeeee',
                          }}
                        >
                          <View style={{ flex: 0.2 }}>
                            <Text style={{ marginTop: 0, fontWeight: 'bold' }}>
                              {item.qty}x
                            </Text>
                          </View>
                          <View style={{ flex: 0.8 }}>
                            <Text style={{ marginTop: 0 }}>
                              {item.drugNondugFullName}
                            </Text>
                          </View>
                        </View>
                      ))}
                      <TouchableOpacity
                        onPress={toggleModal}
                        style={{
                          alignSelf: 'flex-end',
                          marginTop: 30,
                          marginRight: 30,
                        }}
                      >
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={{ fontSize: 16 }}>
                            กดเพื่อดูการใช้งานยา
                          </Text>
                          <Icon
                            style={{
                              marginLeft: 10,
                              justifyContent: 'center',
                              alignSelf: 'center',
                            }}
                            name="chevron-right"
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        borderBottomColor: '#000000',
                        borderBottomWidth: 7,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 14,
                      }}
                    />
                  </View>
                </View>
              </Card>
            </View>
            <View style={styles.blockView}>
              <Text
                headline
                style={{ fontWeight: 'bold', fontSize: 17, marginTop: 30 }}
              >
                ข้อมูลสถานพยาบาล
              </Text>
              <Text body2 style={{ marginTop: 5 }}>
                โรงพยาบาลวชิระ หรือ วชิรพยาบาลในพระอุปถัมภ์สมเด็จพระเจ้าภคินีเธอ
                เจ้าฟ้าเพชรรัตนราชสุดา สิริโสภาพัณณวดี
                เป็นโรงพยาบาลมหาวิทยาลัยของ คณะแพทยศาสตร์วชิรพยาบาล
                มหาวิทยาลัยนวมินทราธิราช
                เป็นโรงพยาบาลแห่งแรกๆที่เกิดขึ้นในประเทศไทย
                สถาปนาขึ้นโดยพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัวในปี พ.ศ. 2455
                (นับแบบเก่า)
                วชิรพยาบาลเป็นโรงพยาบาลในสังกัดคณะแพทยศาสตร์วชิรพยาบาล
                และเป็นที่ทำการเรียนการสอนของ คณะแพทยศาสตร์วชิรพยาบาล และ
                คณะพยาบาลศาสตร์เกื้อการุณย์ ตั้งอยู่บน ถนนสามเสน แขวงวชิรพยาบาล
                เขตดุสิต กรุงเทพมหานคร
              </Text>
            </View>
            <View style={styles.blockView}>
              <Text
                headline
                style={{ marginBottom: 5, fontWeight: 'bold', fontSize: 17 }}
                semibold
              >
                สถานที่ตั้ง
              </Text>
              <Text body2 numberOfLines={2}>
                คณะแพทยศาสตร์วชิรพยาบาล 681 ถนนสามเสน แขวงวชิรพยาบาล เขตดุสิต
                กรุงเทพมหานคร 10300 0 2244 3000
              </Text>
              <View
                style={{
                  height: 180,
                  width: '100%',
                  marginTop: 10,
                }}
              ></View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    userTele: state.userTele,
  };
};

export default connect(mapStateToProps)(MyHealthHistory);
