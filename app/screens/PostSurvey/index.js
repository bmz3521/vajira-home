import React, { Fragment, useState, useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Button, Text, Item, Label, Row } from 'native-base';
import styles from './styles';
import { TouchableOpacity, View, Alert, Modal } from 'react-native';
import { Header, SafeAreaView, Icon } from '@components';
import LinearGradient from 'react-native-linear-gradient';
import ProgressCircle from 'react-native-progress-circle';

import { BaseStyle, BaseColor } from '@config';
import config from '@_config';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PostSurvey = ({ navigation, route }) => {
  const { bookingId, userTeleId, skipStep } = route.params;
  const [step, setStep] = useState(1);
  const [ratingApp, setRatingApp] = useState('');
  const [waitingTimeApp, setWaitingTimeApp] = useState('');
  const [appointmentStatApp, setAppointmentStatApp] = useState('');
  const [transportCostApp, setTransportCostApp] = useState('');
  const [healCostApp, setHealCostApp] = useState('');
  const [admitTimeApp, setAdmitTimeApp] = useState('');
  const [recommendApp, setRecommendApp] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (skipStep) {
      setStep(7);
    }
  }, [skipStep]);
  const data = [
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4',
      value: '4',
    },
    {
      label: '5',
      value: '5',
    },
    {
      label: '6',
      value: '6',
    },
    {
      label: '7',
      value: '7',
    },
    {
      label: '8',
      value: '8',
    },
    {
      label: '9',
      value: '9',
    },
    {
      label: '10',
      value: '10',
    },
  ];

  const submitForm = async () => {
    await axios.post(`${config.apiUrl}/surveyForms`, {
      bookingId: bookingId,
      surveyUserId: userTeleId,
      detail: values,
    });
    setModalVisible(true);
  };

  const values = [
    {
      ratingApp: ratingApp,
      waitingTimeApp: waitingTimeApp,
      appointmentStatApp: appointmentStatApp,
      transportCostApp: transportCostApp,
      healCostApp: healCostApp,
      admitTimeApp: admitTimeApp,
      recommendApp: recommendApp,
    },
  ];

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="แบบสอบถามความพึงพอใจ"
        textStyle={{
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
        }}
        styleCenter={{ flex: 4 }}
      />
      <ScrollView>
        <View style={styles.container}>
          {step === 1 ? (
            <View>
              <View style={styles.questionContainer}>
                <View style={styles.question}>
                  <Text style={styles.questionNo}>ข้อที่ 1:</Text>
                  <Text>
                    ความพึงพอใจในการรับบริการจากโรงพยาบาล และแอปพลิเคชัน
                  </Text>
                  <Text style={styles.questionPS}>
                    "หลัง" ที่จะมีแอปพลิเคชัน
                    <Text style={{ color: '#CD4343' }}>*</Text>
                  </Text>
                </View>
                <ProgressCircle
                  percent={14.28}
                  radius={25}
                  borderWidth={6}
                  color="#1DAF0C"
                  shadowColor="#E5E5E5"
                  bgColor="#F5F5F5"
                >
                  <Text style={{ fontSize: 15 }}>{'1/7'}</Text>
                </ProgressCircle>
              </View>

              <View style={styles.cardContainer}>
                <View style={styles.card}>
                  <Text style={{ textAlign: 'left', marginBottom: 15 }}>
                    คะแนนความพึงพอใจที่ท่านให้กับเรา
                  </Text>
                  <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    <FlatList
                      data={data}
                      numColumns={5}
                      horizontal={false}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          disabled={false}
                          style={{
                            height: 70,
                            borderRadius: 60,
                          }}
                          onPress={() => {
                            setRatingApp(item.value);
                          }}
                        >
                          {item.value != ratingApp ? (
                            <View
                              style={{
                                height: 45,
                                width: 45,
                                margin: 8,
                              }}
                            >
                              <View
                                style={{
                                  borderRadius: 7,
                                  borderColor: '#ccc',
                                  borderWidth: 1,
                                  backgroundColor: '#fff',
                                  alignItems: 'center',
                                  flex: 1,
                                  justifyContent: 'center',
                                }}
                              >
                                <Text
                                  style={{ fontSize: 18, fontWeight: 'bold' }}
                                >
                                  {item.value}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <>
                              <View
                                style={{
                                  height: 45,
                                  width: 45,
                                  margin: 8,
                                }}
                              >
                                <View
                                  style={{
                                    borderRadius: 7,
                                    borderColor: '#07B678',
                                    borderWidth: 1,
                                    backgroundColor: '#07B678',
                                    alignItems: 'center',
                                    flex: 1,
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      fontWeight: 'bold',
                                      color: '#fff',
                                    }}
                                  >
                                    {item.value}
                                  </Text>
                                </View>
                              </View>
                            </>
                          )}
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </View>

                <View style={styles.nextContainer}>
                  <TouchableOpacity
                    style={styles.nextButton}
                    disabled={values.rating === ''}
                    onPress={() => setStep(2)}
                  >
                    <Text style={styles.nextStyle}>ดำเนินการต่อ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : step === 2 ? (
            <View>
              <View style={styles.questionContainer}>
                <View style={styles.question}>
                  <Text style={styles.questionNo}>ข้อที่ 2:</Text>
                  <Text>
                    ความพึงพอใจในระยะเวลารอตรวจทั้งก่อนพบแพทย์และเวลาตั้งแต่มาถึงโรงพยาบาลจนรับยา
                  </Text>
                  <Text style={styles.questionPS}>
                    "หลัง" ที่จะมีแอปพลิเคชัน
                    <Text style={{ color: '#CD4343' }}>*</Text>
                  </Text>
                </View>
                <ProgressCircle
                  percent={28.57}
                  radius={25}
                  borderWidth={6}
                  color="#1DAF0C"
                  shadowColor="#E5E5E5"
                  bgColor="#F5F5F5"
                >
                  <Text style={{ fontSize: 15 }}>{'2/7'}</Text>
                </ProgressCircle>
              </View>

              <View style={styles.cardContainer}>
                <View style={styles.card}>
                  <Text style={{ textAlign: 'left', marginBottom: 15 }}>
                    คะแนนความพึงพอใจที่ท่านให้กับเรา
                  </Text>
                  <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    <FlatList
                      data={data}
                      numColumns={5}
                      horizontal={false}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          disabled={false}
                          style={{
                            height: 70,
                            borderRadius: 60,
                          }}
                          onPress={() => {
                            setWaitingTimeApp(item.value);
                          }}
                        >
                          {item.value != waitingTimeApp ? (
                            <View
                              style={{
                                height: 45,
                                width: 45,
                                margin: 8,
                              }}
                            >
                              <View
                                style={{
                                  borderRadius: 7,
                                  borderColor: '#ccc',
                                  borderWidth: 1,
                                  backgroundColor: '#fff',
                                  alignItems: 'center',
                                  flex: 1,
                                  justifyContent: 'center',
                                }}
                              >
                                <Text
                                  style={{ fontSize: 18, fontWeight: 'bold' }}
                                >
                                  {item.value}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <>
                              <View
                                style={{
                                  height: 45,
                                  width: 45,
                                  margin: 8,
                                }}
                              >
                                <View
                                  style={{
                                    borderRadius: 7,
                                    borderColor: '#07B678',
                                    borderWidth: 1,
                                    backgroundColor: '#07B678',
                                    alignItems: 'center',
                                    flex: 1,
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      fontWeight: 'bold',
                                      color: '#fff',
                                    }}
                                  >
                                    {item.value}
                                  </Text>
                                </View>
                              </View>
                            </>
                          )}
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </View>

                <View style={styles.nextContainer}>
                  <TouchableOpacity
                    style={styles.backButton}
                    disabled={values.rating === ''}
                    onPress={() => setStep(1)}
                  >
                    <Text style={styles.backStyle}>ย้อนกลับ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.nextButton}
                    disabled={values.waitingTime === ''}
                    onPress={() => setStep(3)}
                  >
                    <Text style={styles.nextStyle}>ดำเนินการต่อ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : step === 3 ? (
            <View>
              <View style={styles.questionContainer}>
                <View style={styles.question}>
                  <Text style={styles.questionNo}>ข้อที่ 3:</Text>
                  <Text>ความพึงพอใจที่ท่านสะดวกจะมาตรวจกับแพทย์ตามนัด</Text>
                  <Text style={styles.questionPS}>
                    "หลัง" ที่จะมีแอปพลิเคชัน
                    <Text style={{ color: '#CD4343' }}>*</Text>
                  </Text>
                </View>
                <ProgressCircle
                  percent={42.84}
                  radius={25}
                  borderWidth={6}
                  color="#1DAF0C"
                  shadowColor="#E5E5E5"
                  bgColor="#F5F5F5"
                >
                  <Text style={{ fontSize: 15 }}>{'3/7'}</Text>
                </ProgressCircle>
              </View>

              <View style={styles.cardContainer}>
                <View style={styles.card}>
                  <Text style={{ textAlign: 'left', marginBottom: 15 }}>
                    คะแนนความพึงพอใจที่ท่านให้กับเรา
                  </Text>
                  <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    <FlatList
                      data={data}
                      numColumns={5}
                      horizontal={false}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          disabled={false}
                          style={{
                            height: 70,
                            borderRadius: 60,
                          }}
                          onPress={() => {
                            setAppointmentStatApp(item.value);
                          }}
                        >
                          {item.value != appointmentStatApp ? (
                            <View
                              style={{
                                height: 45,
                                width: 45,
                                margin: 8,
                              }}
                            >
                              <View
                                style={{
                                  borderRadius: 7,
                                  borderColor: '#ccc',
                                  borderWidth: 1,
                                  backgroundColor: '#fff',
                                  alignItems: 'center',
                                  flex: 1,
                                  justifyContent: 'center',
                                }}
                              >
                                <Text
                                  style={{ fontSize: 18, fontWeight: 'bold' }}
                                >
                                  {item.value}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <>
                              <View
                                style={{
                                  height: 45,
                                  width: 45,
                                  margin: 8,
                                }}
                              >
                                <View
                                  style={{
                                    borderRadius: 7,
                                    borderColor: '#07B678',
                                    borderWidth: 1,
                                    backgroundColor: '#07B678',
                                    alignItems: 'center',
                                    flex: 1,
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      fontWeight: 'bold',
                                      color: '#fff',
                                    }}
                                  >
                                    {item.value}
                                  </Text>
                                </View>
                              </View>
                            </>
                          )}
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </View>

                <View style={styles.nextContainer}>
                  <TouchableOpacity
                    style={styles.backButton}
                    disabled={values.rating === ''}
                    onPress={() => setStep(2)}
                  >
                    <Text style={styles.backStyle}>ย้อนกลับ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.nextButton}
                    disabled={values.appointmentStat === ''}
                    onPress={() => setStep(4)}
                  >
                    <Text style={styles.nextStyle}>ดำเนินการต่อ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : step === 4 ? (
            <View>
              <View style={styles.questionContainer}>
                <View style={styles.question}>
                  <Text style={styles.questionNo}>ข้อที่ 4:</Text>
                  <Text>
                    ความพึงพอใจต่อค่าใช้จ่ายสำหรับการเดินทางเพื่อเข้ารับบริการจากโรงพยาบาล
                  </Text>
                  <Text style={styles.questionPS}>
                    "หลัง" ที่จะมีแอปพลิเคชัน
                    <Text style={{ color: '#CD4343' }}>*</Text>
                  </Text>
                </View>
                <ProgressCircle
                  percent={57.12}
                  radius={25}
                  borderWidth={6}
                  color="#1DAF0C"
                  shadowColor="#E5E5E5"
                  bgColor="#F5F5F5"
                >
                  <Text style={{ fontSize: 15 }}>{'4/6'}</Text>
                </ProgressCircle>
              </View>

              <View style={styles.cardContainer}>
                <View style={styles.card}>
                  <Text style={{ textAlign: 'left', marginBottom: 15 }}>
                    คะแนนความพึงพอใจที่ท่านให้กับเรา
                  </Text>
                  <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    <FlatList
                      data={data}
                      numColumns={5}
                      horizontal={false}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          disabled={false}
                          style={{
                            height: 70,
                            borderRadius: 60,
                          }}
                          onPress={() => {
                            setTransportCostApp(item.value);
                          }}
                        >
                          {item.value != transportCostApp ? (
                            <View
                              style={{
                                height: 45,
                                width: 45,
                                margin: 8,
                              }}
                            >
                              <View
                                style={{
                                  borderRadius: 7,
                                  borderColor: '#ccc',
                                  borderWidth: 1,
                                  backgroundColor: '#fff',
                                  alignItems: 'center',
                                  flex: 1,
                                  justifyContent: 'center',
                                }}
                              >
                                <Text
                                  style={{ fontSize: 18, fontWeight: 'bold' }}
                                >
                                  {item.value}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <>
                              <View
                                style={{
                                  height: 45,
                                  width: 45,
                                  margin: 8,
                                }}
                              >
                                <View
                                  style={{
                                    borderRadius: 7,
                                    borderColor: '#07B678',
                                    borderWidth: 1,
                                    backgroundColor: '#07B678',
                                    alignItems: 'center',
                                    flex: 1,
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      fontWeight: 'bold',
                                      color: '#fff',
                                    }}
                                  >
                                    {item.value}
                                  </Text>
                                </View>
                              </View>
                            </>
                          )}
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </View>

                <View style={styles.nextContainer}>
                  <TouchableOpacity
                    style={styles.backButton}
                    disabled={values.rating === ''}
                    onPress={() => setStep(3)}
                  >
                    <Text style={styles.backStyle}>ย้อนกลับ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.nextButton}
                    disabled={values.transportCost === ''}
                    onPress={() => setStep(5)}
                  >
                    <Text style={styles.nextStyle}>ดำเนินการต่อ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : step === 5 ? (
            <View>
              <View style={styles.questionContainer}>
                <View style={styles.question}>
                  <Text style={styles.questionNo}>ข้อที่ 5:</Text>
                  <Text>
                    ความพึงพอใจต่อค่าใช้จ่ายในการรักษาในระบบกับโรงพยาบาล
                  </Text>
                  <Text style={styles.questionPS}>
                    "หลัง" ที่จะมีแอปพลิเคชัน
                    <Text style={{ color: '#CD4343' }}>*</Text>
                  </Text>
                </View>
                <ProgressCircle
                  percent={71.4}
                  radius={25}
                  borderWidth={6}
                  color="#1DAF0C"
                  shadowColor="#E5E5E5"
                  bgColor="#F5F5F5"
                >
                  <Text style={{ fontSize: 15 }}>{'5/7'}</Text>
                </ProgressCircle>
              </View>

              <View style={styles.cardContainer}>
                <View style={styles.card}>
                  <Text style={{ textAlign: 'left', marginBottom: 15 }}>
                    คะแนนความพึงพอใจที่ท่านให้กับเรา
                  </Text>
                  <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    <FlatList
                      data={data}
                      numColumns={5}
                      horizontal={false}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          disabled={false}
                          style={{
                            height: 70,
                            borderRadius: 60,
                          }}
                          onPress={() => {
                            setAdmitTimeApp(item.value);
                          }}
                        >
                          {item.value != admitTimeApp ? (
                            <View
                              style={{
                                height: 45,
                                width: 45,
                                margin: 8,
                              }}
                            >
                              <View
                                style={{
                                  borderRadius: 7,
                                  borderColor: '#ccc',
                                  borderWidth: 1,
                                  backgroundColor: '#fff',
                                  alignItems: 'center',
                                  flex: 1,
                                  justifyContent: 'center',
                                }}
                              >
                                <Text
                                  style={{ fontSize: 18, fontWeight: 'bold' }}
                                >
                                  {item.value}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <>
                              <View
                                style={{
                                  height: 45,
                                  width: 45,
                                  margin: 8,
                                }}
                              >
                                <View
                                  style={{
                                    borderRadius: 7,
                                    borderColor: '#07B678',
                                    borderWidth: 1,
                                    backgroundColor: '#07B678',
                                    alignItems: 'center',
                                    flex: 1,
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      fontWeight: 'bold',
                                      color: '#fff',
                                    }}
                                  >
                                    {item.value}
                                  </Text>
                                </View>
                              </View>
                            </>
                          )}
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </View>

                <View style={styles.nextContainer}>
                  <TouchableOpacity
                    style={styles.backButton}
                    disabled={values.rating === ''}
                    onPress={() => setStep(4)}
                  >
                    <Text style={styles.backStyle}>ย้อนกลับ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.nextButton}
                    disabled={values.admitTime === ''}
                    onPress={() => setStep(6)}
                  >
                    <Text style={styles.nextStyle}>ดำเนินการต่อ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : step === 6 ? (
            <View>
              <View style={styles.questionContainer}>
                <View style={styles.question}>
                  <Text style={styles.questionNo}>ข้อที่ 6:</Text>
                  <Text>
                    ความพึงพอใจต่อโรงพยาบาลที่คาดว่าจะช่วยลดจำนวนครั้งในการต้องมานอนโรงพยาบาลของท่าน
                  </Text>
                  <Text style={styles.questionPS}>
                    "หลัง" ที่จะมีแอปพลิเคชัน
                    <Text style={{ color: '#CD4343' }}>*</Text>
                  </Text>
                </View>
                <ProgressCircle
                  percent={85.68}
                  radius={25}
                  borderWidth={6}
                  color="#1DAF0C"
                  shadowColor="#E5E5E5"
                  bgColor="#F5F5F5"
                >
                  <Text style={{ fontSize: 15 }}>{'6/7'}</Text>
                </ProgressCircle>
              </View>

              <View style={styles.cardContainer}>
                <View style={styles.card}>
                  <Text style={{ textAlign: 'left', marginBottom: 15 }}>
                    คะแนนความพึงพอใจที่ท่านให้กับเรา
                  </Text>
                  <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    <FlatList
                      data={data}
                      numColumns={5}
                      horizontal={false}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          disabled={false}
                          style={{
                            height: 70,
                            borderRadius: 60,
                          }}
                          onPress={() => {
                            setHealCostApp(item.value);
                          }}
                        >
                          {item.value != healCostApp ? (
                            <View
                              style={{
                                height: 45,
                                width: 45,
                                margin: 8,
                              }}
                            >
                              <View
                                style={{
                                  borderRadius: 7,
                                  borderColor: '#ccc',
                                  borderWidth: 1,
                                  backgroundColor: '#fff',
                                  alignItems: 'center',
                                  flex: 1,
                                  justifyContent: 'center',
                                }}
                              >
                                <Text
                                  style={{ fontSize: 18, fontWeight: 'bold' }}
                                >
                                  {item.value}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <>
                              <View
                                style={{
                                  height: 45,
                                  width: 45,
                                  margin: 8,
                                }}
                              >
                                <View
                                  style={{
                                    borderRadius: 7,
                                    borderColor: '#07B678',
                                    borderWidth: 1,
                                    backgroundColor: '#07B678',
                                    alignItems: 'center',
                                    flex: 1,
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      fontWeight: 'bold',
                                      color: '#fff',
                                    }}
                                  >
                                    {item.value}
                                  </Text>
                                </View>
                              </View>
                            </>
                          )}
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </View>

                <View style={styles.nextContainer}>
                  <TouchableOpacity
                    style={styles.backButton}
                    disabled={values.rating === ''}
                    onPress={() => setStep(5)}
                  >
                    <Text style={styles.backStyle}>ย้อนกลับ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.nextButton}
                    disabled={values.admitTime === ''}
                    onPress={() => setStep(7)}
                  >
                    <Text style={styles.nextStyle}>ดำเนินการต่อ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : step === 7 ? (
            <View>
              <View style={styles.questionContainer}>
                <View style={styles.question}>
                  <Text style={styles.questionNo}>ข้อที่ 7:</Text>
                  <Text>
                    ท่านอยากแนะนำให้คนที่ท่านรู้จักมาใช้งานแอปพลิเคชันนี้มากน้อยแค่ไหน
                  </Text>
                </View>
                <ProgressCircle
                  percent={100}
                  radius={25}
                  borderWidth={6}
                  color="#1DAF0C"
                  shadowColor="#E5E5E5"
                  bgColor="#F5F5F5"
                >
                  <Text style={{ fontSize: 15 }}>{'7/7'}</Text>
                </ProgressCircle>
              </View>

              <View style={styles.cardContainer}>
                <View style={styles.card}>
                  <Text style={{ textAlign: 'left', marginBottom: 15 }}>
                    คะแนนความพึงพอใจที่ท่านให้กับเรา
                  </Text>
                  <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    <FlatList
                      data={data}
                      numColumns={5}
                      horizontal={false}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          disabled={false}
                          style={{
                            height: 70,
                            borderRadius: 60,
                          }}
                          onPress={() => {
                            setRecommendApp(item.value);
                          }}
                        >
                          {item.value != recommendApp ? (
                            <View
                              style={{
                                height: 45,
                                width: 45,
                                margin: 8,
                              }}
                            >
                              <View
                                style={{
                                  borderRadius: 7,
                                  borderColor: '#ccc',
                                  borderWidth: 1,
                                  backgroundColor: '#fff',
                                  alignItems: 'center',
                                  flex: 1,
                                  justifyContent: 'center',
                                }}
                              >
                                <Text
                                  style={{ fontSize: 18, fontWeight: 'bold' }}
                                >
                                  {item.value}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <>
                              <View
                                style={{
                                  height: 45,
                                  width: 45,
                                  margin: 8,
                                }}
                              >
                                <View
                                  style={{
                                    borderRadius: 7,
                                    borderColor: '#07B678',
                                    borderWidth: 1,
                                    backgroundColor: '#07B678',
                                    alignItems: 'center',
                                    flex: 1,
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      fontWeight: 'bold',
                                      color: '#fff',
                                    }}
                                  >
                                    {item.value}
                                  </Text>
                                </View>
                              </View>
                            </>
                          )}
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </View>

                <View style={styles.nextContainer}>
                  {!skipStep ? (
                    <TouchableOpacity
                      style={styles.backButton}
                      disabled={values.rating === ''}
                      onPress={() => setStep(6)}
                    >
                      <Text style={styles.backStyle}>ย้อนกลับ</Text>
                    </TouchableOpacity>
                  ) : null}
                  <View style={{ width: '100%' }}>
                    <LinearGradient
                      colors={['#0DA36D', '#0A7C53', '#086C48']}
                      style={styles.finishGradient}
                    >
                      <TouchableOpacity
                        full
                        style={styles.finishButton}
                        onPress={() => submitForm()}
                      >
                        <Text style={styles.finishText}>เสร็จสิ้น</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            ''
          )}

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Icon
                    name="check-circle"
                    size={60}
                    style={{ color: '#1DAE0B' }}
                  />
                  <Text style={styles.modalTitle}>ตอบแบบสอบถามเสร็จสิ้น</Text>
                  <Text style={styles.modalText}>
                    โรงพยาบาลวชิรพยาบาล{'\n'}
                    ขอขอบคุณท่านที่สละเวลา{'\n'}
                    ในการตอบแบบสอบถามครั้งนี้
                  </Text>
                  <LinearGradient
                    colors={['#0DA36D', '#0A7C53', '#086C48']}
                    style={styles.finishGradient}
                  >
                    <TouchableOpacity
                      full
                      style={styles.okButton}
                      onPress={() => {
                        setModalVisible(false);
                        navigation.navigate('Home');
                      }}
                    >
                      <Text style={styles.finishText}>ตกลง</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(PostSurvey);
