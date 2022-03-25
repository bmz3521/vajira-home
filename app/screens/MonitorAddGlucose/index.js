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
import { Buffer } from 'buffer';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { Header, SafeAreaView, Icon, Image } from '@components';
import { BaseStyle, BaseColor, Images } from '@config';
import { connect } from 'react-redux';
import { getAccessToken } from '@utils/asyncStorage';
import config from '@_config';
import axios from 'axios';
import styles from './styles';

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

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DEVICE':
      const { payload: device } = action;

      // check if the detected device is not already added to the list
      if (device && !state.find(dev => dev.id === device.id)) {
        return [...state, device];
      }
      return state;
    case 'UPDATE_DEVICE':
      const {
        payload: { id, status },
      } = action;

      const toUpdate = state.find(el => el.id === id);
      toUpdate.isConnecting = status;
      return [toUpdate];
    case 'CLEAR':
      return [];
    default:
      return state;
  }
};

function MonitorAddGlucose({ navigation, user, route }) {
  const { no, above, below, firstConnect } = route.params;

  const collectedItems = [];

  const [reasonsforAbove, setReasonsForAbove] = useState();
  const [reasonsforBelow, setReasonsForBelow] = useState();
  const [warning, setWarning] = useState(false);
  const [modalAbove, setModalAbove] = useState(false);
  const [modalBelow, setModalBelow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState(null);
  const [reasonInput, setReasonInput] = useState(null);
  const [activity, setActivity] = useState(null);
  const [activityInput, setActivityInput] = useState(null);
  const [modalActivity, setModalActivity] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [dataModal, setDataModal] = useState(false);
  const [allData, setAllData] = useState([]);

  const [errorMessage, setErrorMessage] = useState(false);

  // Bluetooth
  const [isScanning, setIsScanning] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [receivedData, setReceivedData] = useState([]);
  // const [currentDevice, setCurrentDevice] = useState(null);
  const [deviceData, dispatch] = useReducer(reducer, []);

  const [glucoseValue, setGlucoseValue] = useState(null);
  const [time, setTime] = useState(null);

  // console.log('BluetoothManager');
  // console.log(BluetoothManager);

  // const onStateChangeListener = null;
  var disconnectListener = null;
  var monitorListener = null;
  var bluetoothReceivedData = [];

  const alert = text => {
    Alert.alert('Accu-Chek Instant', text, [
      { text: 'ตกลง', onPress: () => {} },
    ]);
  };

  useEffect(() => {
    //   console.log('Start useEffect...');

    if (Platform.OS === 'android') requestBLEPermission();

    setReasonsForAbove(glucoseAbove);
    setReasonsForBelow(glucoseBelow);

    // onStateChangeListener = BluetoothManager.manager.onStateChange(state => {
    //   console.log('onStateChange: ', state);
    //   if (state === 'PoweredOn') {
    //     scanDevices();
    //     onStateChangeListener.remove();
    //   }
    // });

    BluetoothManager.manager.onStateChange(state => {
      const subscription = BluetoothManager.manager.onStateChange(state => {
        //  console.log('onStateChange: ', state);
        if (state === 'PoweredOn') {
          scanDevices();
          subscription.remove();
        }
      }, true);
      return () => subscription.remove();
    });

    return () => {
      //   console.log('unmounting...');

      //   console.log('currentDevice');
      //   console.log(BluetoothManager.peripheralId);

      if (BluetoothManager.peripheralId) {
        BluetoothManager.disconnect()
          .then(res => {
            console.log('disconnected successfully.');
          })
          .catch(err => {
            console.log('disconnected with error', err);
          });
      }

      BluetoothManager.stopScan();
      // BluetoothManager.manager.destroy();
      // onStateChangeListener && onStateChangeListener.remove();
      disconnectListener && disconnectListener.remove();
      monitorListener && monitorListener.remove();
    };
  }, [setReasonsForAbove, setReasonsForBelow]);

  const requestBLEPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Bluetooth Permission',
          message:
            'Vajira@Home needs access to Bluetooth to read data from your blood glucose meter.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Bluetooth permission granted');
      } else {
        console.log('Bluetooth permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const addGlucoseReport = async () => {
    let converted = parseInt(glucoseValue);

    if (isNaN(converted)) {
      //   console.log('glucose value is not correct.');
      setErrorMessage(true);
      return;
    }

    setErrorMessage(false);

    if (converted < below && reason === null) {
      //   console.log('ต่ำกว่าเกณฑ์');
      return setModalBelow(true);
    } else if (converted > above && reason === null) {
      //   console.log('สูงกว่าเกณฑ์');
      return setModalAbove(true);
    }

    //  console.log('normal...');

    const ACCESS_TOKEN = await getAccessToken();

    try {
      setLoading(true);
      await axios.post(
        `${config.apiUrl}/monitoringReports?access_token=${ACCESS_TOKEN.id}`,
        {
          detail: {
            timeStamp: time,
            period: activity,
            measurements: {
              glucoseMeasurements: {
                glucose: converted,
                reason: reason,
                timeStamp: time,
              },
              pressureMeasurements: false,
              weightMeasurements: false,
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
  };

  const convertTime = value => {
    // for today's date with a different time:
    // moment(12, "HH")

    let dateStr = value.year + '-' + value.month + '-' + value.date;

    let converted = moment(dateStr, 'YYYY-MM-DD').set({
      hour: value.hour,
      minute: value.minute,
      second: value.second,
    });

    return moment(converted)
      .subtract(value.diff + 60, 'seconds')
      .format();
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

  const scanDevices = () => {
    if (!isScanning) {
      setIsScanning(true);
      //   console.log('start scanning...');

      BluetoothManager.manager.startDeviceScan(
        null,
        { allowDuplicates: false },
        (error, device) => {
          if (error) {
            console.log('error scanning', error);
            if (error.errorCode == 102) {
              alert('กรุณาเปิด Bluetooth โทรศัพท์');
            }
            setIsScanning(false);
          } else {
            //   console.log(device.id, device.name);

            if (device?.name) {
              let result = device?.name.slice(0, 6);

              if (result === 'meter+') {
                device.isConnecting = false;
                dispatch({
                  type: 'ADD_DEVICE',
                  payload: device,
                });

                // setCurrentDevice(device);
                BluetoothManager.stopScan();
                setIsScanning(false);
                connect(device);
              }
            }
          }
        },
      );
    } else {
      BluetoothManager.stopScan();
      setIsScanning(false);
      //   console.log('stopScan');
    }
  };

  //  console.log('isMonitoring');
  //  console.log(isMonitoring);
  //  console.log('glucoseValue');
  //  console.log(glucoseValue);

  const startMonitorDevice = uuid => {
    let transactionId = 'monitor';
    monitorListener = BluetoothManager.manager.monitorCharacteristicForDevice(
      BluetoothManager.peripheralId,
      '00001808-0000-1000-8000-00805f9b34fb',
      uuid,
      (error, characteristic) => {
        // console.log('Monitoring Stage.......');

        if (error) {
          //   console.log('Monitor fail: ', error);
          // alert('การเชื่อมต่อสิ้นสุด');

          // setHowto(true);
          setIsMonitoring(false);
        } else {
          //   console.log('Saving characteristic values...');
          setIsMonitoring(true);
          // setHowto(false);

          // console.log('characteristic >>>>');
          // console.log(characteristic);

          if (characteristic?.value) {
            const values = Buffer.from(characteristic.value, 'base64');

            const time = {
              date: values[6],
              month: values[5],
              year: values[3] + 1792,
              hour: values[7],
              minute: values[8],
              second: values[9],
              diff: (values[11] - values[10]) * 60,
            };

            const item = {
              id: values[1],
              value: values[12].toString(),
              time: convertTime(time),
            };

            collectedItems.push(item);

            setAllData(collectedItems);

            setTimeout(() => {
              setDataModal(true);
            }, 1400);

            // bluetoothReceivedData.push(values);
            // setReceivedData(bluetoothReceivedData);
          }
        }
      },
      transactionId,
    );
  };

  const connect = item => {
    if (isScanning) {
      BluetoothManager.stopScan();
      //   console.log('stopScan');
      setIsScanning(false);
    }

    if (BluetoothManager.isConnecting) {
      alert('ไม่สามารถเชื่อมต่อได้ กรุณาตั้งค่าการเชื่อมต่อ');
      //   console.log('อุปกรณ์มีการเชื่อมต่ออยู่ ไม่สามารถเชื่อมต่อได้');
      return;
    }

    dispatch({
      type: 'UPDATE_DEVICE',
      payload: { id: item.id, status: true },
    });

    BluetoothManager.connect(item.id)
      .then(device => {
        dispatch({
          type: 'UPDATE_DEVICE',
          payload: { id: item.id, status: false },
        });

        setDeviceConnected(true);
        onDisconnect(item);

        // NOTE

        // '00002a52-0000-1000-8000-00805f9b34fb'
        // then '00002a18-0000-1000-8000-00805f9b34fb'
        // unmount screen???

        //   console.log('Enter monitoring....');

        // monitor bluetooth signal
        // if values exist, this is where they will be
        // startMonitorDevice('00002a52-0000-1000-8000-00805f9b34fb');
        startMonitorDevice('00002a18-0000-1000-8000-00805f9b34fb');

        // 0x0101 Request permission to real all data

        console.log('Enter writing...');
        if (monitorListener !== null) {
          console.log('Get Ready...');
          // 0x0101 Request permission to real all data
          BluetoothManager.write('0x0101')
            .then(characteristic => {
              bluetoothReceivedData = [];

              // ???????
              dispatch({
                type: 'CLEAR',
              });
              setIsMonitoring(true);
              // setHowto(false);
              //     console.log('write success');
            })
            .catch(error => {
              console.log('write fail');
              //   alert('การเชื่อมต่อล้มเหลว');
              //   this.alert('write fail: ', error.reason);
            });
        }
      })
      .catch(err => {
        //   console.log('updating status after catch...');
        alert('ไม่สามารถเชื่อมต่อได้');
        dispatch({
          type: 'CLEAR',
        });

        // setCurrentDevice(null);
        setIsScanning(false);
        console.log('err', err);
      });
  };

  //Monitor Bluetooth disconnection
  const onDisconnect = item => {
    //   console.log('calling onDisconnect...');
    disconnectListener = BluetoothManager.manager.onDeviceDisconnected(
      BluetoothManager.peripheralId,
      (error, device) => {
        if (error) {
          //Bluetooth automatically disconnects when encountering an error
          console.log('onDeviceDisconnected', 'device disconnect', error);
          dispatch({
            type: 'ADD_DEVICE',
            payload: item,
          });
          setDeviceConnected(false);
        } else {
          disconnectListener && disconnectListener.remove();
          // console.log(
          //   'onDeviceDisconnected',
          //   'device disconnect',
          //   device.id,
          //   device.name,
          // );
        }
      },
    );
  };

  // Disconnect Bluetooth
  const disconnect = () => {
    BluetoothManager.disconnect()
      .then(res => {
        dispatch({
          type: 'CLEAR',
        });

        // setCurrentDevice(null);
        setDeviceConnected(false);
        // setHowto(false);
      })
      .catch(err => {
        dispatch({
          type: 'CLEAR',
        });
        // setCurrentDevice(null);
        setDeviceConnected(false);
        // setHowto(false);
      });
  };

  const renderScanner = () => {
    return (
      <View
        style={{
          paddingHorizontal: 24,
        }}
      >
        <LinearGradient
          style={[styles.add, { marginBottom: 10 }]}
          colors={['#2193b0', '#49B5D0']}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.bluetoothContainer}
            onPress={() => (deviceConnected ? disconnect() : scanDevices())}
          >
            <Text style={styles.buttonTextAdd}>
              {isScanning
                ? 'กำลังค้นหา...'
                : deviceConnected && isMonitoring
                ? 'ยกเลิกการเชื่อมต่อ'
                : 'เชื่อมต่อ'}
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        {isScanning && <ActivityIndicator color={'teal'} size={25} />}
      </View>
    );
  };

  const renderFirstTime = () => {
    return (
      <View
        style={{
          paddingHorizontal: 24,
        }}
      >
        <LinearGradient
          style={[styles.add, { marginBottom: 10 }]}
          colors={['#2193b0', '#49B5D0']}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.bluetoothContainer}
            onPress={() => navigation.navigate('MonitorConnect')}
          >
            <Text style={styles.buttonTextAdd}>ตั้งค่า</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  const renderResult = () => {
    return (
      <View style={styles.deviceContainer}>
        <View style={[styles.card, { alignItems: 'flex-start' }]}>
          <Text style={styles.cardText}>การเชื่อมต่อครั้งแรก: </Text>
          <Text style={styles.cardText}>
            1. หากเห็น OK ให้ปิดเครื่องวัดน้ำตาลก่อน
          </Text>
          <Text style={styles.cardText}>
            2. เปิดเครื่อง แล้วกดปุ่ม "เชื่อมต่อ" ได้เลย
          </Text>
        </View>
      </View>
    );
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
          title="บันทึกค่าน้ำตาลในเลือด"
          textStyle={styles.headerText}
          renderLeft={() => {
            return <Icon bold name="chevron-left" size={20} color="#fff" />;
          }}
          onPressLeft={() => navigation.goBack()}
        />
        <ScrollView
          style={{
            backgroundColor: '#f5f5f5',
          }}
        >
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
                {time ? (
                  <Text
                    style={[
                      styles.leftText,
                      {
                        fontWeight: 'normal',
                        fontSize: 14,
                      },
                    ]}
                  >
                    วันที่ {moment(time).format('D MMMM YYYY')} เวลา{' '}
                    {moment(time).format('HH:mm')} น.
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.leftText,
                      {
                        fontWeight: 'normal',
                        fontSize: 14,
                      },
                    ]}
                  >
                    วันที่ -- --- -- เวลา -- -- น.
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View style={styles.dataContainer}>
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
                editable={false}
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
                onChangeText={setGlucoseValue}
                value={glucoseValue}
                width={120}
              />

              <Text>มก./ดล.</Text>
            </View>
            {errorMessage && (
              <Text style={{ color: 'red' }}>ค่าน้ำตาลไม่ถูกต้อง</Text>
            )}
            <Text
              style={[
                styles.leftText,
                {
                  marginTop: 10,
                  marginBottom: 5,
                },
              ]}
            >
              กิจกรรม
            </Text>
            <TouchableOpacity
              style={[
                styles.activityContainer,
                warning
                  ? {
                      borderColor: 'red',
                      borderWidth: 1,
                    }
                  : null,
              ]}
              activeOpacity={0.9}
              onPress={() => setModalActivity(true)}
            >
              {activity === null ? <Text>เลือก</Text> : <Text>{activity}</Text>}
            </TouchableOpacity>

            {reason ? (
              <Text
                style={[
                  styles.leftText,
                  {
                    marginTop: 10,
                    marginBottom: 5,
                  },
                ]}
              >
                สาเหตุ: {reason}
              </Text>
            ) : null}

            {activity === null ? (
              <LinearGradient style={styles.add} colors={['#fff', '#fff']}>
                <TouchableOpacity
                  underlayColor="grey"
                  style={{
                    width: '100%',
                    alignItems: 'center',
                  }}
                  disabled={false}
                  onPress={() => setWarning(true)}
                >
                  <Text
                    style={[
                      styles.buttonTextAdd,
                      {
                        color: '#c0c0c0',
                      },
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
                  style={{
                    width: '100%',
                    alignItems: 'center',
                  }}
                  disabled={false}
                  onPress={addGlucoseReport}
                >
                  <Text style={styles.buttonTextAdd}>บันทึก</Text>
                </TouchableOpacity>
              </LinearGradient>
            )}
          </View>

          <View style={styles.deviceBox}>
            <View style={styles.howto}>
              <Text style={styles.title}>เชื่อมต่อเครื่องวัดน้ำตาลในเลือด</Text>
            </View>

            {renderScanner()}

            {firstConnect && glucoseValue === null && renderResult()}

            <View
              style={{
                paddingTop: 15,
                paddingBottom: 15,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setShowOptions(prev => !prev);
                }}
              >
                <View style={styles.containerFAQ}>
                  <Text
                    style={{
                      fontSize: 16,
                      // flex: 1,
                      fontWeight: 'bold',
                      color: '#333',
                    }}
                  >
                    ตั้งค่าการเชื่อมต่อ
                  </Text>
                  <MaterialIcons
                    name={showOptions ? 'expand-less' : 'expand-more'}
                    size={24}
                  />
                </View>
              </TouchableOpacity>
              {showOptions && !firstConnect && renderFirstTime()}
            </View>
          </View>

          {modalActivity && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalActivity}
            >
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                style={{
                  flex: 1,
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalActivity}>
                    <Text
                      style={[
                        styles.modalTitle,
                        {
                          color: '#095C3E',
                          paddingHorizontal: 60,
                        },
                      ]}
                    >
                      เลือกกิจกรรม
                    </Text>
                    <View
                      style={{
                        height: 230,
                      }}
                    >
                      <ScrollView>
                        {activityList.map(item => (
                          <TouchableOpacity
                            key={item.id}
                            style={[
                              styles.activityBox,
                              activity === item.title && activityInput === null
                                ? {
                                    backgroundColor: '#095C3E',
                                  }
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
                                {
                                  textAlign: 'center',
                                  fontSize: 18,
                                },
                                activity === item.title &&
                                activityInput === null
                                  ? {
                                      color: '#fff',
                                    }
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
                          style={{
                            width: '100%',
                            alignItems: 'center',
                          }}
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
                style={{
                  flex: 1,
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>
                      ค่าน้ำตาลท่านสูงกว่าเกณฑ์ !
                    </Text>
                    <Text style={styles.modalText}>
                      ระบุสาเหตุที่ท่านคาดว่า
                    </Text>
                    <Text style={styles.modalText}>
                      ทำให้ระดับน้ำตาลของท่านสูงกว่าเกณฑ์
                    </Text>

                    <View
                      style={{
                        height: 230,
                        marginTop: 10,
                      }}
                    >
                      <ScrollView>
                        {reasonsforAbove.map(item => (
                          <TouchableOpacity
                            key={item.id}
                            style={[
                              styles.activityBox,
                              reason === item.title && reasonInput === null
                                ? {
                                    backgroundColor: '#095C3E',
                                  }
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
                                {
                                  textAlign: 'center',
                                  fontSize: 18,
                                },
                                reason === item.title && reasonInput === null
                                  ? {
                                      color: '#fff',
                                    }
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
                          style={{
                            width: '100%',
                            alignItems: 'center',
                          }}
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
                style={{
                  flex: 1,
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text
                      style={[
                        styles.modalTitle,
                        {
                          color: '#3997EA',
                        },
                      ]}
                    >
                      ค่าน้ำตาลท่านต่ำกว่าเกณฑ์ !
                    </Text>

                    <Text
                      style={[
                        styles.modalText,
                        {
                          color: '#3997EA',
                        },
                      ]}
                    >
                      ระบุสาเหตุที่ท่านคาดว่า
                    </Text>
                    <Text
                      style={[
                        styles.modalText,
                        {
                          color: '#3997EA',
                        },
                      ]}
                    >
                      ทำให้ระดับน้ำตาลของท่านต่ำกว่าเกณฑ์
                    </Text>

                    <View
                      style={{
                        height: 230,
                        marginTop: 10,
                      }}
                    >
                      <ScrollView>
                        {reasonsforBelow.map(item => (
                          <TouchableOpacity
                            key={item.id}
                            style={[
                              styles.activityBox,
                              reason === item.title && reasonInput === null
                                ? {
                                    backgroundColor: '#095C3E',
                                  }
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
                                {
                                  textAlign: 'center',
                                  fontSize: 18,
                                },
                                reason === item.title && reasonInput === null
                                  ? {
                                      color: '#fff',
                                    }
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
                          style={{
                            width: '100%',
                            alignItems: 'center',
                          }}
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

          <Modal animationType="slide" transparent={true} visible={dataModal}>
            <View style={styles.optionContainer}>
              <View style={styles.optionView}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {allData
                    .sort((a, b) => new Date(b.time) - new Date(a.time))
                    .map((item, index) => (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles.options,
                          item.time === time
                            ? { borderColor: '#095C3E' }
                            : { borderColor: '#ccc' },
                        ]}
                        onPress={() => {
                          setGlucoseValue(item.value);
                          setTime(item.time);
                        }}
                      >
                        <View style={{ alignItems: 'center' }}>
                          {index === 0 && (
                            <View
                              style={{
                                position: 'absolute',
                                left: 150,
                                top: -15,
                                backgroundColor: '#095C3E',
                                paddingVertical: 26,
                                paddingHorizontal: 5,
                              }}
                            >
                              <Text style={{ color: '#fff', fontSize: 12 }}>
                                ล่าสุด!
                              </Text>
                            </View>
                          )}

                          <View>
                            <Text>{item.value} มก./ดล.</Text>
                          </View>
                          <View>
                            <Text>{moment(item.time).format('lll')}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
                <View style={[styles.modalButtonContainer, { marginTop: 10 }]}>
                  <LinearGradient
                    style={styles.add}
                    colors={['#0A905F', '#095C3E']}
                  >
                    <TouchableOpacity
                      underlayColor="grey"
                      style={{
                        width: '100%',
                        alignItems: 'center',
                      }}
                      disabled={false}
                      onPress={() => (glucoseValue ? setDataModal(false) : {})}
                    >
                      <Text style={styles.buttonTextAdd}>เลือก</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </Modal>

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
  };
}

export default connect(mapStateToProps, null)(MonitorAddGlucose);
