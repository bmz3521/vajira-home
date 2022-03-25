import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import {
  // Image,
  Icon,
  ClinicItem,
  Card,
  Button,
  SafeAreaView,
  EventCard,
  CarouselComponent,
  ImageCardComponent,
  Image,
} from '@components';
import styles from './styles';
import DoctorIcon from '@assets/images/homeicon7.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import config from '@_config';
import { Images } from '@config';
import { ScrollView } from 'react-native-gesture-handler';

export default function CallStatus({ userTele, user, auth, navigation }) {
  const [email, setEmail] = React.useState('');
  const [callStatus, setCallStatus] = React.useState('');
  const [doctorName, setCallingDoctorName] = React.useState('');
  const [pharmacyCallStatus, setPharmacyCallStatus] = React.useState('');
  const [pharmacyName, setCallingPharmacyName] = React.useState('');
  const [queue, setQueue] = React.useState([]);
  const [appointments, setAppointments] = React.useState([]);
  const [time, setTime] = React.useState('');

  useEffect(() => {
    if (auth && !auth.isAuthenticated) {
      console.log('please log in');
    } else {
      fetchQueue();
      fetchAppointments();
      fetchTime();
      if (userTele?.dataTele?.userId) {
        fetchPharmacyCall();
      }
    }
  }, [userTele]);

  const fetchPharmacyCall = () => {
    database()
      .ref(`/patientStatus/patient${userTele.dataTele.userId}pharmacy`)
      .on('value', snapshot => {
        let valueObject = snapshot.val() ? snapshot.val() : {};
        setPharmacyCallStatus(valueObject);
      });
  };

  const fetchTime = async () => {
    const dataTime = (await AsyncStorage.getItem('Time')) || '';
    setTime(dataTime);
  };

  const fetchQueue = async () => {
    const { data } = await axios.get(`${config.apiUrl}/UserInfos/getQueue/`, {
      params: {
        hnId: auth.data.hnId,
      },
    });
    let sorted = [];
    if (data && data.length) {
      data.forEach(function(v, i) {
        if (v.queue_status !== 'สิ้นสุดบริการ') {
          sorted.push(data[i]);
        }
      });

      data.forEach(function(v, i) {
        if (v.queue_status === 'สิ้นสุดบริการ') {
          sorted.push(data[i]);
        }
      });
    }
    setQueue(sorted);
  };

  const fetchAppointments = async () => {
    const { data } = await axios.get(
      `${config.apiUrl}/UserInfos/getAppointments/`,
      {
        params: {
          patientId: auth.data.userId,
        },
      },
    );
    const dataCheck = () => {
      // console.log(appointments);

      function checkOverdueWhite(value) {
        return value === 'เลื่อนนัด' ? '#000' : '#fff';
      }

      function checkOverdueGreen(value) {
        return value === 'เลื่อนนัด' ? '#000' : '#0BB678';
      }

      let result = data
        .sort(function(a, b) {
          return (
            new Date(a.appointmentDateTime) - new Date(b.appointmentDateTime)
          );
        })
        .filter(
          booking =>
            moment(booking.appointmentDateTime).isAfter(moment()) ||
            booking.oappstName === 'เลื่อนนัด',
        )
        .map((item, index) => {
          // if (index !== appointments.length - 1) {

          // console.log('Raw Time');
          // console.log(item.appointmentDateTime);
          // console.log(moment(item.appointmentDateTime).valueOf());
          // console.log('Converted Current Time');
          // console.log(moment().valueOf());
          // console.log('Converted From Raw Time');
          // console.log(moment('2021-05-27T10:00:00').valueOf());

          let time = moment(item.appointmentDateTime).valueOf();
          let today = moment().valueOf();
          let mockTime = moment('2021-05-21T17:00:00').valueOf();

          if (moment(time).isSame(today, 'day')) {
            return {
              pressAction: () =>
                navigation.navigate('AppointmentDetail', { item }),
              title: {
                content: item.clinicName,
                style: {
                  color: '#fff',
                },
              },
              description: {
                content: item.note,
                style: {
                  color: '#fff',
                },
              },
              doctorName: {
                content: item.doctorName,
                style: {
                  color: '#fff',
                },
              },
              today: { content: true },
              status: { content: item.oappstName },
              time: {
                content: `${moment(item.appointmentDateTime).format(
                  'D MMM YYYY',
                )} \n (${moment(item.appointmentDateTime).format('HH:mm')} น.)
              `,
                style: {
                  color: '#0BB678',
                  fontWeight: 'bold',
                },
              },
              icon: {
                style: {
                  backgroundColor: '#0BB678',
                  color: '#0BB678',
                  borderColor: '#0BB678',
                },
              },
            };
          } else {
            return {
              pressAction: () =>
                navigation.navigate('AppointmentDetail', { item }),
              title: {
                content: item.clinicName,
                style: {
                  color:
                    item.oappstName === 'เลื่อนนัด' ? '#CC4343' : '#0BB678',
                },
              },
              description: {
                content: item.note,
              },
              doctorName: {
                content: item.doctorName,
              },
              today: { content: false },
              status: { content: item.oappstName },
              time: {
                content: `${moment(item.appointmentDateTime).format(
                  'D MMM YYYY',
                )} \n (${moment(item.appointmentDateTime).format('HH:mm')} น.)
              `,
                style: {
                  color: checkOverdueGreen(item.oappstName),
                  fontWeight: 'bold',
                },
              },
              icon: {
                style: {
                  backgroundColor: checkOverdueWhite(item.oappstName),
                  color: checkOverdueWhite(item.oappstName),
                  borderColor: checkOverdueGreen(item.oappstName),
                },
              },
            };
          }
        });

      // console.log('filtered appointments');
      // console.log(result);

      return result;
    };
    setAppointments(dataCheck());
  };

  return (
    <View>
      {queue.length && auth.isAuthenticated ? (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {queue.map((q, i) => (
            <>
              {q.queue_status !== 'สิ้นสุดบริการ' ? (
                <View
                  style={{
                    marginHorizontal: 20,
                    marginTop: 15,
                    marginBottom: 5,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 6,
                    overflow: 'hidden',
                    marginLeft: i == 0 ? 20 : 0,
                  }}
                >
                  <View style={{ padding: 10, backgroundColor: '#0AB678' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                      {q.point_queue}
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      flexDirection: 'row',
                    }}
                  >
                    <TouchableOpacity
                      onPress={async () => {
                        fetchQueue();
                        setTime(moment().format('LTS'));
                        await AsyncStorage.setItem(
                          'Time',
                          moment().format('LTS'),
                        );
                      }}
                    >
                      <Image
                        resizeMode="contain"
                        source={Images.queue_active}
                        style={{ width: 50, height: 50, marginRight: 5 }}
                      />
                    </TouchableOpacity>
                    <View style={{ marginRight: 25 }}>
                      <Text style={{ color: '#000', fontWeight: 'bold' }}>
                        จำนวนคิวที่รอ
                      </Text>
                      <Text
                        style={{
                          color: '#0AB678',
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}
                      >
                        {q.waitqty} คิว
                      </Text>
                      {time ? (
                        <Text style={{ fontSize: 12, color: '#0AB678' }}>
                          อัปเดตล่าสุด {time} น.
                        </Text>
                      ) : null}
                    </View>
                    <View>
                      <Text style={{ fontWeight: 'bold' }}>หมายเลขคิว</Text>
                      <Text
                        style={{
                          color: '#0AB678',
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}
                      >
                        {q.queuenotxt}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      backgroundColor: '#F5F5F5',
                    }}
                  >
                    <Text style={{ color: '#000', fontWeight: 'bold' }}>
                      {q.lct_status}
                    </Text>
                    <Text style={{ color: '#000' }}>{q.queue_status}</Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    marginHorizontal: 20,
                    marginTop: 15,
                    marginBottom: 5,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 6,
                    overflow: 'hidden',
                    marginLeft: i == 0 ? 20 : 0,
                  }}
                >
                  <View style={{ padding: 10, backgroundColor: '#0AB678' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                      {q.point_queue}
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      flexDirection: 'row',
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      source={Images.queue_inactive}
                      style={{ width: 50, height: 50, marginRight: 5 }}
                    />
                    <View style={{ marginRight: 25 }}>
                      <Text style={{ color: '#000', fontWeight: 'bold' }}>
                        จำนวนคิวที่รอ
                      </Text>
                      <Text
                        style={{
                          color: '#535353',
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}
                      >
                        {q.waitqty} คิว
                      </Text>
                      {time ? (
                        <Text style={{ fontSize: 12, color: '#535353' }}>
                          อัปเดตล่าสุด {time} น.
                        </Text>
                      ) : null}
                    </View>
                    <View>
                      <Text style={{ color: '#535353', fontWeight: 'bold' }}>
                        หมายเลขคิว
                      </Text>
                      <Text
                        style={{
                          color: '#535353',
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}
                      >
                        {q.queuenotxt}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      backgroundColor: '#F5F5F5',
                    }}
                  >
                    <Text style={{ color: '#000', fontWeight: 'bold' }}>
                      {q.lct_status}
                    </Text>
                    <Text style={{ color: '#000' }}>{q.queue_status}</Text>
                  </View>
                </View>
              )}
            </>
          ))}
        </ScrollView>
      ) : (
        <View />
      )}
      {appointments.length && auth.isAuthenticated ? (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate('AppointmentList', { appointments })
          }
        >
          <View
            style={{
              flexDirection: 'row',
              padding: 20,
              marginTop: 15,
              width: '90%',
              backgroundColor: '#FFF0F0',
              alignSelf: 'center',
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 6,
            }}
          >
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Icon
                  name="bell"
                  style={[
                    styles.titleIcon,
                    { fontSize: 18, marginRight: 8, color: '#CC4343' },
                  ]}
                />
                <Text style={{ color: '#CC4343', fontWeight: 'bold' }}>
                  แจ้งเตือน
                </Text>
              </View>
              <View>
                <Text style={{ color: '#CC4343' }}>
                  ท่านมีรายการนัดหมาย ตรวจสอบรายละเอียดได้ที่นี่
                </Text>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 10,
              }}
            >
              <Icon
                name="chevron-right"
                style={[
                  styles.titleIcon,
                  {
                    fontSize: 26,
                    color: '#CC4343',
                  },
                ]}
              />
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View />
      )}
      {pharmacyCallStatus.status === 'pharmacyCallBack' && (
        <TouchableOpacity
          // style={{ alignItems: "center" }}
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate('VideoCall', {
              officer: pharmacyCallStatus.officerId,
              bookingId: pharmacyCallStatus.bookingId,
            })
          }
          style={styles.iconTopAppointment}
        >
          <BarIndicator
            color="green"
            style={{
              alignSelf: 'flex-start',
              flex: 0.09,
              marginTop: -33,
              elevation: 30,
            }}
          />
          <Image
            source={DoctorIcon}
            size={10}
            // color={BaseColor.primaryColor}
            // solid
            style={{ width: 50, height: 50, marginBottom: 10 }}
          />
          <View
            style={{ paddingHorizontal: 3, alignSelf: 'flex-start' }}
          ></View>
          <View
            style={{
              paddingHorizontal: 10,
              flex: 0.85,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                alignSelf: 'center',
                color: 'white',
              }}
              caption1
              grayColor
            >
              คุณมีนัดหมายกับเภสัชอยู่ในตอนนี้
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                alignSelf: 'center',
                color: 'white',
              }}
              caption1
              grayColor
            >
              กรุณาเข้าห้องรอเพื่อเริ่มปรึกษากับเภสัช
            </Text>
          </View>
          <Icon
            name="phone"
            style={{
              fontSize: 20,
              color: '#dddddd',
              alignSelf: 'flex-end',
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
