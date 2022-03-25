import React, { useReducer, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { Divider } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { Header, SafeAreaView, Icon, Image } from '@components';
import { BaseStyle, BaseColor, Images } from '@config';
import { connect } from 'react-redux';
import { getAccessToken } from '@utils/asyncStorage';
import CameraRoll from '@react-native-community/cameraroll';
import QRCode from 'react-native-qrcode-svg';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob';
import config from '@_config';
import axios from 'axios';
import styles from './styles';

function PaymentPayouts({ navigation, auths, route }) {
  const [saving, savingState] = useState('');
  const [codePayment, setCodePayment] = useState(null);
  const [bookingDate, setBookingDate] = useState(null);
  const [doctorDetail, setDoctorDetail] = useState({
    name: '',
    department: '',
  });
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [total, setTotal] = useState('');
  const [vn, setVn] = useState('');
  const [prescriptions, setPrescriptions] = useState(null);
  const [pickupId, setPickupId] = useState(0);

  const [modal, setModal] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    hnId,
    vnNumber,
    amount,
    doctor,
    id,
    bookingTime,
    bookingMinutesEndTime,
    bookingMinutesTime,
    drugItems,
    prescriptionId,
  } = route.params.pickupItem;

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    setDoctorDetail({
      name: doctor?.fullname,
      department: doctor?.detail?.department,
    });
    setVn(vnNumber);
    setTotal(amount);
    setPickupId(id);
    // const convertedTime = moment(detail.bookingTime).subtract(7, 'hours');

    setBookingDate(bookingTime);
    setPrescriptions(drugItems);

    await checkStatus(prescriptionId);
  };

  const checkStatus = async id => {
    // const ACCESS_TOKEN = await getAccessToken();

    try {
      const { data } = await axios.get(
        `${config.VA_API_URL}/prescriptions/${id}`,
      );

      //  console.log('Payment Status');
      //  console.log(data);
      //  console.log(data.paymentStatus);

      if (data.paymentStatus === 'PATIENT_SUCCESS_PAYMENT') {
        setPaymentStatus(true);
      } else {
        setPaymentStatus(false);
        var codePaymentQrText = `|099400016602812
${hnId}
${vnNumber}
${amount}`;
        setCodePayment(codePaymentQrText);
      }
    } catch (error) {
      console.log('error fetching status...', error);
    }
  };

  const updateDetail = async () => {
    // const ACCESS_TOKEN = await getAccessToken();

    setLoading(true);
    try {
      const {
        data,
      } = await axios.patch(
        `${config.VA_API_URL}/PrescriptionPickups/${pickupId}`,
        { received: true },
      );
      //  console.log('Returned data...');
      //  console.log(data);

      // await getDetails();

      // add drugs to list
      await sendDrugs();
    } catch (error) {
      console.log('error fetching details...', error);
      setModal(false);
      setModalError(true);
      setLoading(false);
    }
  };

  const sendDrugs = async () => {
    const ACCESS_TOKEN = await getAccessToken();

    const userId = auths.data.userId;
    const orderNumber = vn;
    const data = prescriptions;

    try {
      await axios.post(
        `${config.VA_API_URL}/drugCompliances/updateByPrescriptionId?access_token=${ACCESS_TOKEN.id}`,
        {
          userId,
          orderNumber,
          data,
        },
      );
      setLoading(false);
      setModal(false);
      setModalSuccess(true);
    } catch (error) {
      setLoading(false);
      setModal(false);
      setModalError(true);
      console.log('error calling updateByPrescriptionId', error);
    }
  };

  const getSvg = svg => {
    svg
      ? svg.toDataURL(data => {
          savingState(data);
        })
      : '';
  };

  // get permission on android
  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        '',
        'Your permission is required to save images to your device',
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: false },
      );
    } catch (err) {
      // handle error as you please
      console.log('err', err);
    }
  };

  const saveQrToDisk = async svg => {
    if (Platform.OS === 'android') {
      const granted = await getPermissionAndroid();
      if (!granted) {
        return;
      }
    } else {
      CameraRoll.saveToCameraRoll(`data:image/png;base64,${saving}`, 'photo')
        .then(() => {
          Alert.alert(
            'บันทึก QR Code สำเร็จ',
            'กรุณาอัพโหลด QR Code เพื่อชำระผ่านแอพฯธนาคาร',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false },
          );
        })
        .catch(error => {
          Alert.alert(
            '!ไม่สามารถบันทึกรูปภาพได้',
            'พบข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false },
          );
        });
    }

    if (Platform.OS === 'android') {
      const PictureDir = RNFetchBlob.fs.dirs.PictureDir;
      let imageLocation = PictureDir + '/test.png';
      RNFS.writeFile(imageLocation, saving, 'base64')
        .then(() => {
          Alert.alert(
            'บันทึก QR Code สำเร็จ',
            'กรุณาอัพโหลด QR Code เพื่อชำระผ่านแอพฯธนาคาร',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false },
          );
        })
        .catch(error => {
          Alert.alert(
            '!ไม่สามารถบันทึกรูปภาพได้',
            'พบข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false },
          );
        });
    }
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      forceInset={{
        top: 'always',
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{
          flex: 1,
        }}
      >
        <Header
          title="รายการค่าใช้จ่าย"
          textStyle={styles.headerText}
          renderLeft={() => {
            return <Icon bold name="chevron-left" size={20} color="#fff" />;
          }}
          onPressLeft={() => navigation.goBack()}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: '#f5f5f5',
          }}
        >
          <View style={styles.topContainer}>
            <View style={styles.topBlock}>
              <View style={styles.leftGroup}>
                <Icon name="calendar" style={styles.titleIcon} />
                <Text style={styles.titleText}>รายการโทรเวชกรรม ณ วันที่</Text>
              </View>
            </View>
            <View style={{ marginLeft: 23, marginBottom: 15 }}>
              {bookingDate && (
                <Text style={{ color: '#6C6C6C' }}>
                  {`${moment(bookingDate).format('LL')}`}{' '}
                  {bookingMinutesTime && (
                    <Text style={{ color: '#6C6C6C' }}>
                      {`เวลา ${moment()
                        .startOf('day')
                        .add(bookingMinutesTime, 'minutes')
                        .format('HH:mm')} น.`}
                    </Text>
                  )}
                </Text>
              )}
            </View>
            <View style={styles.topBlock}>
              <View style={styles.leftGroup}>
                <Icon name="stethoscope" style={styles.titleIcon} />
                <Text style={styles.titleText}>{doctorDetail?.name}</Text>
              </View>
            </View>
            <View style={{ marginLeft: 23, marginBottom: 15 }}>
              <Text style={{ color: '#6C6C6C' }}>
                {doctorDetail?.department}
              </Text>
            </View>

            <View style={styles.topBlock}>
              <View style={styles.leftGroup}>
                <Icon name="credit-card" style={styles.titleIcon} />
                <Text style={styles.titleText}>สถานะการจ่ายเงิน</Text>
              </View>
            </View>
            <View style={{ marginLeft: 23, marginBottom: 15 }}>
              {paymentStatus ? (
                <Text style={{ color: '#086C48' }}>ชำระเรียบร้อยแล้ว</Text>
              ) : (
                <Text style={{ color: 'red' }}>
                  ยังไม่ชำระ หรือกำลังตรวจสอบการชำระ
                </Text>
              )}
            </View>

            <View style={{ marginBottom: 20 }} />
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: 10,
                alignItems: 'center',
              }}
            >
              {!paymentStatus && codePayment && (
                <QRCode
                  value={codePayment}
                  logoBackgroundColor="transparent"
                  size={200}
                  getRef={c => getSvg(c)}
                  backgroundColor="white"
                  color="black"
                  logo={Images.avata1}
                  logoSize={30}
                />
              )}
            </View>
            <View style={{ marginBottom: 10 }}></View>

            <View style={{ padding: 20 }}>
              <View
                style={[
                  styles.presListHead,
                  { marginBottom: 20, marginTop: 10 },
                ]}
              >
                <Text style={styles.titleText}>โอนเข้าบัญชี</Text>
                <Text style={styles.titleText}>โรงพยาบาลวชิรพยาบาล</Text>
              </View>
              <Divider
                style={{
                  marginTop: -15,
                  marginBottom: 20,
                  color: '#40424B',
                  padding: 0.3,
                }}
              />
              <View
                style={[
                  styles.presListHead,
                  { marginBottom: 20, marginTop: 10 },
                ]}
              >
                <Text style={styles.titleText}>จำนวนเงิน</Text>
                <Text style={styles.titleText}>{`${total} บาท`}</Text>
              </View>
              <Divider
                style={{
                  marginTop: -15,
                  marginBottom: 20,
                  color: '#40424B',
                  padding: 0.3,
                }}
              />
              <View
                style={[
                  styles.presListHead,
                  { marginBottom: 20, marginTop: 10 },
                ]}
              >
                <Text style={styles.titleText}>เลขที่อ้างอิง</Text>
                <Text style={styles.titleText}>{vn}</Text>
              </View>
              <Divider
                style={{
                  marginTop: -15,
                  marginBottom: 20,
                  color: '#40424B',
                  padding: 0.3,
                }}
              />
            </View>

            {!paymentStatus && codePayment && (
              <LinearGradient
                colors={['#0DA36D', '#0A7C53', '#086C48']}
                style={styles.signInGradient}
              >
                <TouchableOpacity
                  full
                  style={styles.button}
                  //onPress={() => Linking.openURL('https://lin.ee/gymFOp1')}
                  onPress={saveQrToDisk}
                >
                  <Text
                    bold
                    style={
                      (styles.buttonText, { fontSize: 12, color: 'white' })
                    }
                  >
                    ดาวน์โหลด QR CODE เพื่อชำระเงิน ผ่าน App ธนาคาร
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            )}

            {prescriptions && (
              <>
                <View style={styles.presListTitle}>
                  <Icon
                    name="list-alt"
                    style={[styles.titleIcon, { fontSize: 18 }]}
                  />
                  <Text style={[styles.titleText, { fontSize: 18 }]}>
                    รายการยา
                  </Text>
                </View>
                <View
                  style={{
                    marginHorizontal: 10,
                    margin: 4,
                    borderColor: BaseColor.textSecondaryColor,
                    marginBottom: 10,
                    borderRadius: 10,
                    backgroundColor: 'white',
                    shadowColor: '#000',
                    elevation: 3,
                    padding: 10,
                  }}
                >
                  <View
                    style={[
                      styles.presListHead,
                      { marginBottom: 20, marginTop: 10 },
                    ]}
                  >
                    <Text style={styles.titleText}>ชื่อยา</Text>
                    <Text style={styles.titleText}>จำนวน</Text>
                  </View>
                  <Divider
                    style={{
                      marginBottom: 10,
                      color: '#40424B',
                    }}
                  />

                  {prescriptions &&
                    prescriptions.map((prescription, index) => (
                      <View key={index}>
                        <View style={styles.presListHead}>
                          <Text bold>{index + 1}.</Text>
                          <Text bold style={styles.presName}>
                            {prescription.drugNondugName}
                          </Text>
                          <Text bold>{prescription.qty} (แผง)</Text>
                        </View>
                        <View
                          style={[styles.presListHead, styles.instructions]}
                        >
                          <Text bold style={{ color: '#40424B' }}>
                            วิธีใช้:
                          </Text>
                        </View>
                        <View
                          style={[styles.presListHead, styles.instructions]}
                        >
                          <Text>{prescription.drugUsage}</Text>
                        </View>
                        <View
                          style={[styles.presListHead, styles.instructions]}
                        >
                          {prescription.medlblhlp1_name ? (
                            <Text style={{ color: 'dodgerblue' }}>
                              {prescription.medlblhlp1_name}
                            </Text>
                          ) : null}
                        </View>
                        <View
                          style={[styles.presListHead, styles.instructions]}
                        >
                          {prescription.medlblhlp2_name ? (
                            <Text style={{ color: 'dodgerblue' }}>
                              {prescription.medlblhlp2_name}
                            </Text>
                          ) : null}
                        </View>
                        <View
                          style={[styles.presListHead, styles.instructions]}
                        >
                          {prescription.medlblhlp3 ? (
                            <Text style={{ color: 'dodgerblue' }}>
                              {prescription.medlblhlp3}
                            </Text>
                          ) : null}
                        </View>
                        <View
                          style={[styles.presListHead, styles.instructions]}
                        >
                          {prescription.medlblhlp4 ? (
                            <Text style={{ color: 'dodgerblue' }}>
                              {prescription.medlblhlp4}
                            </Text>
                          ) : null}
                        </View>
                        <Divider
                          style={{
                            marginTop: 10,
                            marginBottom: 10,
                            color: '#40424B',
                          }}
                        />
                      </View>
                    ))}

                  {paymentStatus && (
                    <View style={styles.buttonConfirmContainer}>
                      <LinearGradient
                        colors={['#0DA36D', '#0A7C53', '#086C48']}
                        style={styles.signInGradient}
                      >
                        <TouchableOpacity
                          full
                          style={styles.button}
                          onPress={() => setModal(true)}
                        >
                          <Text bold style={styles.buttonText}>
                            ได้รับยาแล้ว
                          </Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                  )}
                </View>
              </>
            )}
          </View>

          <Modal animationType="slide" transparent={true} visible={modal}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={[styles.modalText, { color: '#000' }]}>
                  ท่านยืนยันว่า
                </Text>
                <Text
                  style={[
                    styles.modalText,
                    { color: '#000', marginBottom: 10 },
                  ]}
                >
                  ได้รับยาที่โรงพยาบาลแล้ว
                </Text>

                <View style={styles.modalRowContainer}>
                  <LinearGradient
                    style={[styles.modalButton, { marginBottom: 5 }]}
                    colors={['#8c8c8c', '#c0c0c0']}
                  >
                    <TouchableOpacity
                      underlayColor="grey"
                      style={{ width: '100%', alignItems: 'center' }}
                      disabled={false}
                      onPress={() => (loading ? null : setModal(false))}
                    >
                      <Text style={styles.buttonTextAdd}>ไม่</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  <LinearGradient
                    style={[styles.modalButton, { marginBottom: 5 }]}
                    colors={['#0A905F', '#095C3E']}
                  >
                    <TouchableOpacity
                      underlayColor="grey"
                      style={{ width: '100%', alignItems: 'center' }}
                      disabled={false}
                      onPress={() => (loading ? null : updateDetail())}
                    >
                      {loading ? (
                        <ActivityIndicator size="large" color="#fff" />
                      ) : (
                        <Text style={styles.buttonTextAdd}>ยืนยัน</Text>
                      )}
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </Modal>

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalError}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalFailTitle}>เกิดข้อผิดพลาด</Text>

                  <Text style={{ textAlign: 'center', fontSize: 15 }}>
                    บันทึกรายการไม่สำเร็จ{'\n'} โปรดติดต่อเจ้าหน้าที่
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginVertical: 20,
                    }}
                  >
                    <LinearGradient
                      colors={['#0DA36D', '#0A7C53', '#086C48']}
                      style={styles.signInGradient}
                    >
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => setModalError(false)}
                      >
                        <Text style={styles.textConfirm}>ตกลง</Text>
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
              visible={modalSuccess}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalSuccessTitle}>
                    บันทึกรายการสำเร็จ
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginVertical: 20,
                    }}
                  >
                    <LinearGradient
                      colors={['#0DA36D', '#0A7C53', '#086C48']}
                      style={styles.signInGradient}
                    >
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          setModalSuccess(false);
                          navigation.navigate('Home');
                        }}
                      >
                        <Text style={styles.textConfirm}>ตกลง</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return {
    auths: state.auth,
  };
}

export default connect(mapStateToProps)(PaymentPayouts);
