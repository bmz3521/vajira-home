import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Header, SafeAreaView, Icon } from '@components';
import { BaseStyle, BaseColor, Images } from '@config';
import axios from 'axios';
import config from '@_config';
import { connect } from 'react-redux';
import { getAccessToken } from '@utils/asyncStorage';

function MonitorConnect({ navigation, user }) {
  var disconnectListener = null;
  var monitorListener = null;
  const [isScanning, setIsScanning] = useState(false);
  const [defaultGlucose, setDefaultGlucose] = useState({
    defaultLow: 70,
    defaultHigh: 130,
  });
  const [statistics, setStatistics] = useState({
    above: 0,
    normal: 0,
    below: 0,
  });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  const fetchMonitoringReports = async () => {
    setLoading(true);
    const ACCESS_TOKEN = await getAccessToken();

    try {
      const { data } = await axios.get(
        `${config.apiUrl}/monitoringReports?access_token=${ACCESS_TOKEN.id}&filter[where][appUserId]=${user.data.userInformation.userId}`,
      );

      // Set Glucose
      let tempGlucose = data.filter(
        item => item.detail.measurements.glucoseMeasurements !== false,
      );

      const glucose = [];

      tempGlucose.map(item => glucose.push(item));

      if (tempGlucose.length > 0) {
        // Find highest & lowest
        let sorted = tempGlucose.sort(
          (a, b) =>
            b.detail.measurements.glucoseMeasurements.glucose -
            a.detail.measurements.glucoseMeasurements.glucose,
        );

        // Store default
        // setDefaultGlucose({
        //   defaultLow: 70,
        //   defaultHigh: 130,
        // });

        let doctorLow = null;
        let doctorHigh = null;

        if (user?.data?.userInformation?.defaultGlucoseValue) {
          doctorLow = parseInt(
            user?.data?.userInformation?.defaultGlucoseValue[0],
          );
          doctorHigh = parseInt(
            user?.data?.userInformation?.defaultGlucoseValue[1],
          );
        } else {
          doctorLow = defaultGlucose.defaultLow;
          doctorHigh = defaultGlucose.defaultHigh;
        }

        setDefaultGlucose({
          defaultLow: doctorLow,
          defaultHigh: doctorHigh,
        });

        // Keep track of results
        let above = 0;
        let normal = 0;
        let below = 0;
        sorted.forEach(item => {
          if (
            item.detail.measurements.glucoseMeasurements.glucose < doctorLow
          ) {
            return (below = below + 1);
          } else if (
            item.detail.measurements.glucoseMeasurements.glucose > doctorHigh
          ) {
            return (above = above + 1);
          } else {
            return (normal = normal + 1);
          }
        });

        setStatistics({ above, normal, below });
      } else {
        setStatistics({
          above: 0,
          normal: 0,
          below: 0,
        });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setApiError(true);
      console.log('Error From MonitorBloodGlucose', error);
    }
  };

  useEffect(() => {
    fetchMonitoringReports();
  }, []);

  useEffect(() => {
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
      disconnectListener && disconnectListener.remove();
      monitorListener && monitorListener.remove();
    };
  }, []);

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

  const connect = item => {
    if (isScanning) {
      BluetoothManager.stopScan();
      //   console.log('stopScan');
      setIsScanning(false);
    }

    if (BluetoothManager.isConnecting) {
      alert('กรุณากดปุ่มด้านขวาของเครื่องวัดน้ำตาลค้างไว้ 4 วินาที');
      //   console.log('อุปกรณ์มีการเชื่อมต่ออยู่ ไม่สามารถเชื่อมต่อได้');
      return;
    }

    BluetoothManager.connect(item.id)
      .then(device => {
        onDisconnect(item);

        startMonitorDevice('00002a52-0000-1000-8000-00805f9b34fb');

        // 0x0101 Request permission to real all data

        console.log('Enter writing...');
        BluetoothManager.write('0x0101')
          .then(characteristic => {})
          .catch(error => {
            // console.log('write fail');
            navigation.navigate('MonitorAddGlucose', {
              no: statistics.above + statistics.normal + statistics.below,
              above: defaultGlucose.defaultHigh,
              below: defaultGlucose.defaultLow,
              firstConnect: true,
            });
          });
      })
      .catch(err => {
        //   console.log('updating status after catch...');
        alert(
          'ไม่สามารถเชื่อมต่อได้ กรุณาไปที่ Setting ของมือถือท่าน และลบสัญญาณ Bluetooth ที่ชื่อว่า meter+ ออกก่อน จากนั้นให้ลองเชื่อมต่ออีกครั้ง',
        );

        console.log('err', err);
      });
  };

  //Monitor Bluetooth disconnection
  const onDisconnect = item => {
    BluetoothManager.manager.onDeviceDisconnected(
      BluetoothManager.peripheralId,
      (error, device) => {
        if (error) {
          //Bluetooth automatically disconnects when encountering an error
          console.log('onDeviceDisconnected', 'device disconnect', error);
        } else {
          disconnectListener && disconnectListener.remove();
        }
      },
    );
  };

  const startMonitorDevice = uuid => {
    let transactionId = 'monitor';
    BluetoothManager.manager.monitorCharacteristicForDevice(
      BluetoothManager.peripheralId,
      '00001808-0000-1000-8000-00805f9b34fb',
      uuid,
      (error, characteristic) => {
        console.log('Successfully connected.......');

        navigation.navigate('MonitorAddGlucose', {
          no: statistics.above + statistics.normal + statistics.below,
          above: defaultGlucose.defaultHigh,
          below: defaultGlucose.defaultLow,
          firstConnect: true,
        });
      },
      transactionId,
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="เชื่อมต่อ Accu-Chek"
        textStyle={{
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
        }}
        renderLeft={() => {
          return <Icon name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <View style={styles.deviceContainer}>
          <View style={styles.card}>
            <View style={{ justifyContent: 'flex-start' }}>
              <Text style={styles.cardText}>การตั้งค่าแรกใช้: </Text>
              <Text style={styles.cardText}>
                1. กดปุ่มด้านขวาล่างของเครื่องวัดน้ำตาลค้างไว้ 4 วินาที
              </Text>
              <Text style={styles.cardText}>
                2. กดปุ่ม "เชื่อมต่อ" บนโทรศัพท์
              </Text>
              <Text style={styles.cardText}>
                3. กรอกรหัส PIN 6 หลัก ข้างหลังเครื่องวัดน้ำตาล
              </Text>
            </View>

            <Image style={styles.accu} source={Images.accu_back} />
          </View>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="0A7C53" />
        ) : apiError ? (
          <View>
            <Text style={styles.textError}>
              ขออภัย ไม่สามารถเชื่อมต่อได้ในขณะนี้
            </Text>
          </View>
        ) : (
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
                onPress={() => scanDevices()}
              >
                <Text style={styles.buttonTextAdd}>
                  {isScanning ? 'กำลังค้นหา...' : 'เชื่อมต่อ'}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  box: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  pic: {
    width: 60,
    height: 60,
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 12,
  },
  txt: {
    fontSize: 18,
    color: '#000',
  },
  deviceContainer: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  card: {
    padding: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 12,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 30,
  },
  accu: {
    width: 130,
    height: 220,
  },
  bluetoothContainer: {
    width: '100%',
    alignItems: 'center',
  },
  add: {
    width: '60%',
    height: 50,
    marginTop: 10,
    padding: 12,
    borderRadius: 20,
    alignSelf: 'center',
  },
  buttonTextAdd: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textError: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(MonitorConnect);
