import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  Modal,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { Text, Image, Header, SafeAreaView, Icon, Button } from '@components';
import axios from 'axios';
import styles from './styles';
import { getAccessToken } from '@utils/asyncStorage';
import { BaseStyle, BaseColor, Images } from '@config';
import config from '@_config';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob';
import VajiraLogo from '../../assets/images/logo_Vajira.jpg';
import CameraRoll from '@react-native-community/cameraroll';
const deliveryOptions = option => {
  var value;

  switch (option) {
    case 1:
      value = {
        key: 1,
        status: 'รับยาที่ร้านยาคุณภาพ',
        price: 100,
      };
      break;
    case 2:
      value = {
        key: 1,
        status: 'รับยาที่บ้านผ่านไปรษณีย์',
        price: 100,
      };
      break;
    case 3:
      value = {
        key: 1,
        status: 'รับยาที่โรงพยาบาลวชิรพยาบาล',
        price: 0,
      };
      break;
    default:
      break;
  }

  return value;
};

const checkColor = status => {
  //  console.log(status);
  if (status.includes('PATIENT_PENDING_PAYMENT')) {
    return '#CC4344';
  } else if (status.includes('PATIENT_SUCCESS_PAYMENT')) {
    return '#09B678';
  } else {
    return '#0A5C3E';
  }
};

function Prescription(props) {
  const { booking, PAYMENT_STATUS } = props.route.params;
  const { navigation } = props;
  const [ems, setEms] = useState([]);
  const user = useSelector(state => state.user);
  const userTele = useSelector(state => state.userTele);
  const [prescriptions, setPrescriptions] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState({});
  const [modalOpen, setModal] = useState(false);
  const [modalError, setModalError] = useState(false);

  const [saving, savingState] = useState('');
  const [codePayment, setCodePayment] = useState('');
  const [vn, setVN] = useState('');
  const [paid, setPaid] = useState('');
  const [qrStatus, setQrStatus] = useState(false);
  useEffect(() => {
    if (booking) {
      fetchPrescription();
      fetchEms();
    }
  }, [booking]);

  const fetchEms = async () => {
    const { data } = await axios.get(
      `${config.VA_API_URL}/prescriptionRelatedTrackingNumbers?filter[include]=trackingNumberId&filter[where][prescriptionTrackingId]=${booking.prescription.id}`,
    );
    setEms(data);
  };

  // const alertUpdatePrescription = () => {
  //   Alert.alert(
  //     'การยืนยันการรับยา',
  //     'คุณต้องการยืนยันการรับยาใช่หรือไม่',
  //     [
  //       {
  //         text: 'ไม่ใช่',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'ใช่',
  //         onPress: () => updatePrescription(),
  //       },
  //     ],
  //     { cancelable: false },
  //   );
  // };

  // const updatePrescription = async () => {
  //   let detail;
  //   if (booking.prescription.status === 'WAIT_FOR_PATIENT_EMS') {
  //     detail = {
  //       status: 'SUCCESS_BY_EMS',
  //     };
  //   }
  //   if (booking.prescription.status === 'WAIT_FOR_PATIENT_PHAMACYSTORE') {
  //     detail = {
  //       status: 'SUCCESS_BY_PHARMACYSTORE',
  //     };
  //   }
  //   const response = await axios.patch(
  //     `${config.VA_API_URL}/prescriptions/${booking.prescription.id}`,
  //     detail,
  //   );
  //   if (response.status === 200) {
  //     Alert.alert(
  //       'ยืนยันสำเร็จ',
  //       'กลับสู่หน้าหลัก',
  //       [
  //         {
  //           text: 'ใช่',
  //           onPress: () => navigation.navigate('Home'),
  //         },
  //       ],
  //       { cancelable: false },
  //     );
  //   }
  // };

  const handleModal = async () => {
    let detail;

    const ACCESS_TOKEN = await getAccessToken();

    if (booking.prescription.status === 'WAIT_FOR_PATIENT_EMS') {
      detail = {
        status: 'SUCCESS_BY_EMS',
      };
    }
    if (booking.prescription.status === 'WAIT_FOR_PATIENT_PHAMACYSTORE') {
      detail = {
        status: 'SUCCESS_BY_PHARMACYSTORE',
      };
    }

    axios
      .all([
        axios.patch(
          `${config.VA_API_URL}/prescriptions/${booking.prescription.id}`,
          detail,
        ),
        axios.post(
          `${config.VA_API_URL}/drugCompliances/updateByPrescriptionId?access_token=${ACCESS_TOKEN.id}`,
          {
            userId: user.data.userInformation.userId,
            prescriptionId: booking.prescription.id,
            orderNumber: prescriptions[0].orderNo,
            data: prescriptions,
          },
        ),
      ])
      .then(
        axios.spread((response1, response2) => {
          console.log('response1', response1);
          console.log('response2', response2);

          if (response1.status === 200 && response2.status === 200) {
            console.log('updated all successfully...');
            setModal(false);
            navigation.navigate('Home');
          } else {
            console.log('error updating prescriptions');
            setModal(false);
            setModalError(true);
          }
        }),
      )
      .catch(err => {
        setModal(false);
        setModalError(true);
        console.log('FAIL', err);
      });
  };
  const fetchVnNumber = async () => {
    const { data } = await axios.get(
      `${config.apiUrl}/UserInfos/checkVisitNumber`,
      {
        params: {
          patientId: user.data.id,
          selectedDate: moment(new Date(booking.admitTime)).format(
            'YYYY-MM-DD',
          ),
        },
      },
    );
    return data.length !== 0 && data[0].vn ? data[0].vn : '';
  };
  const fetchPrescription = async () => {
    const getVnNumber = await fetchVnNumber();

    const { data } = await axios.get(
      `${config.apiUrl}/UserInfos/checkDrugsDetailByOrderNo`,
      {
        params: {
          patientId: user.data.id,
          orderNumber: booking.vnNumber,
          vnNumber: getVnNumber,
        },
      },
    );

    let status = deliveryOptions(booking.prescription.logisticId);
    setDeliveryOption(status);
    setPrescriptions(data.billingItems);
    if (data.account && data.hn && data.vn) {
      setPaid(data.qrpaid / 100);
      setVN(data.vn);
      var codePaymentQrText = `|${data.account}
${data.hn}
${data.vn}
${data.qrpaid}`;
      setCodePayment(codePaymentQrText);
      //console.log('getVnNumber == == ==== ==', data);
      setQrStatus(true);
    } else {
      setQrStatus(false);
    }

    // setCodePayment(codePaymentQrText);
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
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="รายการยา"
        textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#F5F5F5' }}
      >
        <View style={styles.topContainer}>
          <View style={styles.topBlock}>
            <View style={styles.leftGroup}>
              <Icon name="calendar" style={styles.titleIcon} />
              <Text style={styles.titleText}>รายการยา ณ วันที่</Text>
            </View>
            <View>
              <Text
                bold
                style={{
                  fontSize: 12,
                  color: checkColor(booking.prescription.paymentStatus),
                }}
              >
                {PAYMENT_STATUS[booking.prescription.paymentStatus]}
              </Text>
            </View>
          </View>
          <View style={{ marginLeft: 20, marginBottom: 15 }}>
            <Text style={{ color: '#6C6C6C' }}>{`${
              moment(booking.admitTime)
                .format('LLLL')
                .split('เวลา')[0]
            } เวลา ${moment()
              .startOf('isoWeek')
              .add(booking.bookingTime, 'minutes')
              .format('HH:mm')} น.`}</Text>
          </View>
          <View style={styles.topBlock}>
            <View style={styles.leftGroup}>
              <Icon name="prescription-bottle-alt" style={styles.titleIcon} />
              <Text style={styles.titleText}>ช่องทางการรับยา</Text>
            </View>
          </View>
          <View style={{ marginLeft: 20, marginBottom: 15 }}>
            <Text style={{ color: '#6C6C6C' }}>{deliveryOption?.status}</Text>
          </View>

          {ems ? (
            <>
              <View style={styles.topBlock}>
                <View style={styles.leftGroup}>
                  <Icon name="paper-plane" style={styles.titleIcon} />
                  <Text style={styles.titleText}>สถานะการจัดส่ง</Text>
                </View>
              </View>
              {ems.map((x, index) => (
                <View key={index} style={{ marginLeft: 20 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#6C6C6C',
                    }}
                  >
                    หมายเลขพัสดุ {x.trackingNumberId.barcode}
                  </Text>
                  <Text
                    style={{
                      color: '#6C6C6C',
                    }}
                  >
                    สถานที่
                  </Text>

                  <View>
                    {x.trackingNumberId.location &&
                      x.trackingNumberId.postcode && (
                        <Text>
                          {`${x.trackingNumberId.location}, ${x.trackingNumberId.postcode}`}
                        </Text>
                      )}
                  </View>

                  <View>
                    <Text
                      style={{
                        color: '#6C6C6C',
                      }}
                    >
                      สถานะ
                    </Text>
                  </View>
                  <View>
                    <Text>{x.trackingNumberId.status}</Text>
                  </View>
                </View>
              ))}
            </>
          ) : null}

          <View style={{ marginBottom: 10 }}></View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 10,
              alignItems: 'center',
            }}
          >
            {qrStatus ? (
              codePayment ? (
                <QRCode
                  value={codePayment}
                  logoBackgroundColor="transparent"
                  size={200}
                  getRef={c => getSvg(c)}
                  backgroundColor="white"
                  color="black"
                  logo={VajiraLogo}
                  logoSize={30}
                />
              ) : (
                <Text style={{ color: '#6C6C6C' }}>LOADING ...</Text>
              )
            ) : null}
          </View>
          <View style={{ marginBottom: 20 }}></View>
          {/* <View style={styles.topBlock}>
            <View style={styles.leftGroup}>
              <Icon name="paper-plane" style={styles.titleIcon} />
              <Text style={styles.titleText}>สถานะการจัดส่ง</Text>
            </View>
          </View>
          <View style={{ marginLeft: 20, marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 14,
                color: checkColor(booking.prescription.paymentStatus),
              }}
            >
              {PAYMENT_STATUS[booking.prescription.paymentStatus]}
            </Text>
          </View> */}
          {qrStatus ? (
            booking.prescription.paymentStatus === 'PATIENT_PENDING_PAYMENT' &&
            (codePayment ? (
              <View style={styles.buttonContainer}>
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
                    <Text style={styles.titleText}>{paid}</Text>
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
                <View style={{ padding: 20, marginTop: 20 }}>
                  <Text
                    style={{
                      color: '#6C6C6C',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  >
                    หากท่านชำระเงินผ่าน QR CODEเรียบร้อยแล้ว
                  </Text>
                  <Text
                    style={{
                      color: '#6C6C6C',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  >
                    กรุณาส่งสลิปการชำระเงินที่ปุ่มด้านล่าง
                  </Text>
                </View>
                <LinearGradient
                  colors={['#0DA36D', '#0A7C53', '#086C48']}
                  style={styles.signInGradient}
                >
                  <TouchableOpacity
                    full
                    style={styles.button}
                    onPress={() => Linking.openURL('https://lin.ee/gymFOp1')}
                  >
                    <Text
                      bold
                      style={
                        (styles.buttonText, { fontSize: 12, color: 'white' })
                      }
                    >
                      ไปที่ LINE OFFICIAL เพื่อส่งสลิปชำระเงิน
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                  alignItems: 'center',
                  padding: 20,
                }}
              >
                <Text style={{ color: '#6C6C6C' }}>LOADING ...</Text>
              </View>
            ))
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: 10,
                alignItems: 'center',
                padding: 20,
              }}
            >
              <Text style={{ color: '#6C6C6C' }}>
                ไม่มีข้อมูลการชำระในขณะนี้
              </Text>
            </View>
          )}
        </View>

        <View style={styles.centeredView}>
          <Modal animationType="slide" transparent={true} visible={modalOpen}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalSuccessTitle}>ยืนยันการรับยา</Text>

                <Text style={{ textAlign: 'center', fontSize: 15 }}>
                  ท่านได้ตรวจสอบรายการยาและ{'\n'}{' '}
                  ได้รับยาทั้งหมดเป็นที่เรียบร้อยแล้ว
                </Text>

                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                  <LinearGradient
                    colors={['#F7F7F7', '#F7F7F7', '#F7F7F7']}
                    style={styles.signInGradient}
                  >
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => setModal(false)}
                    >
                      <Text style={styles.textCancel}>ย้อนกลับ</Text>
                    </TouchableOpacity>
                  </LinearGradient>

                  <LinearGradient
                    colors={['#0DA36D', '#0A7C53', '#086C48']}
                    style={styles.signInGradient}
                  >
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleModal()}
                    >
                      <Text style={styles.textConfirm}>ยืนยัน</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.centeredView}>
          <Modal animationType="slide" transparent={true} visible={modalError}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalFailTitle}>เกิดข้อผิดพลาด</Text>

                <Text style={{ textAlign: 'center', fontSize: 15 }}>
                  บันทึกรายการไม่สำเร็จ{'\n'} โปรดติดต่อเจ้าหน้าที่
                </Text>

                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
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

        <View style={styles.presListTitle}>
          <Icon name="list-alt" style={[styles.titleIcon, { fontSize: 18 }]} />
          <Text style={[styles.titleText, { fontSize: 18 }]}>รายการยา</Text>
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
            style={[styles.presListHead, { marginBottom: 20, marginTop: 10 }]}
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

          {prescriptions.map((prescription, index) => (
            <View key={index}>
              <View style={styles.presListHead}>
                <Text bold>{index + 1}.</Text>
                <Text bold style={styles.presName}>
                  {prescription.drugNondugName}
                </Text>
                <Text bold>{prescription.qty} (แผง)</Text>
              </View>
              <View style={[styles.presListHead, styles.instructions]}>
                <Text bold style={{ color: '#40424B' }}>
                  วิธีใช้:
                </Text>
              </View>
              <View style={[styles.presListHead, styles.instructions]}>
                <Text>{prescription.drugUsage}</Text>
              </View>
              <View style={[styles.presListHead, styles.instructions]}>
                {prescription.medlblhlp1_name ? (
                  <Text style={{ color: 'dodgerblue' }}>
                    {prescription.medlblhlp1_name}
                  </Text>
                ) : null}
              </View>
              <View style={[styles.presListHead, styles.instructions]}>
                {prescription.medlblhlp2_name ? (
                  <Text style={{ color: 'dodgerblue' }}>
                    {prescription.medlblhlp2_name}
                  </Text>
                ) : null}
              </View>
              <View style={[styles.presListHead, styles.instructions]}>
                {prescription.medlblhlp3 ? (
                  <Text style={{ color: 'dodgerblue' }}>
                    {prescription.medlblhlp3}
                  </Text>
                ) : null}
              </View>
              <View style={[styles.presListHead, styles.instructions]}>
                {prescription.medlblhlp4 ? (
                  <Text style={{ color: 'dodgerblue' }}>
                    {prescription.medlblhlp4}
                  </Text>
                ) : null}
              </View>
              <Divider
                style={{ marginTop: 10, marginBottom: 10, color: '#40424B' }}
              />
              {/* {index + 1 !== prescriptions.length && (
                <Divider
                  style={{ marginTop: 10, marginBottom: 10, color: '#40424B' }}
                />
              )} */}
            </View>
          ))}

          {booking.prescription.status === 'WAIT_FOR_PATIENT_EMS' && (
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

          {booking.prescription.status === 'WAIT_FOR_PATIENT_PHAMACYSTORE' && (
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
          <Text style={{ marginBottom: 8 }}>หากสงสัยหรือติดปัญหา</Text>
          <Text>วันจันทร์ - ศุกร์ 8.00 - 16.00 น.</Text>
          <Text style={{ marginBottom: 8 }}>
            ติดต่อ Call Center ได้ที่เบอร์ 02-2443000 ต่อ 5340
            (เฉพาะในเวลาราชการเท่านั้น)
          </Text>
          <Text>วันจันทร์ - ศุกร์ 16.00 - 20.00 น.</Text>
          <Text>ติดต่อ เภสัชกร ได้ที่เบอร์ 02-2443000 ต่อ 5442</Text>
        </View>
        {/* <View style={{ padding: 20 }}>
          {(booking.prescription.status === 'WAIT_FOR_PATIENT_EMS' ||
            booking.prescription.status ===
              'WAIT_FOR_PATIENT_PHAMACYSTORE') && (
            <TouchableOpacity onPress={() => alertUpdatePrescription()}>
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
                  style={{
                    color: '#ffffff',
                    fontSize: 18,
                    fontWeight: '700',
                  }}
                >
                  ยืนยันการรับยา
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Prescription;
