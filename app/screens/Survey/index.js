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

const Survey = props => {
  const { route, navigation, user } = props;
  const { bookingId, userTeleId, skipStep } = route.params;
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState('');
  const [waitingTime, setWaitingTime] = useState('');
  const [appointmentStat, setAppointmentStat] = useState('');
  const [transportCost, setTransportCost] = useState('');
  const [healCost, setHealCost] = useState('');
  const [admitTime, setAdmitTime] = useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

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

  async function submitForm() {
    await axios.post(`${config.apiUrl}/surveyForms`, {
      bookingId: bookingId,
      surveyUserId: userTeleId,
      detail: values,
    });
    setModalVisible(true);
  }

  const values = [
    {
      rating: rating,
      waitingTime: waitingTime,
      appointmentStat: appointmentStat,
      transportCost: transportCost,
      healCost: healCost,
      admitTime: admitTime,
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
                    "ก่อน" ที่จะมีแอปพลิเคชัน
                    <Text style={{ color: '#CD4343' }}>*</Text>
                  </Text>
                </View>
                <ProgressCircle
                  percent={16.66}
                  radius={25}
                  borderWidth={6}
                  color="#1DAF0C"
                  shadowColor="#E5E5E5"
                  bgColor="#F5F5F5"
                >
                  <Text style={{ fontSize: 15 }}>{'1/6'}</Text>
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
                            setRating(item.value);
                          }}
                        >
                          {item.value != rating ? (
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
                    "ก่อน" ที่จะมีแอปพลิเคชัน
                    <Text style={{ color: '#CD4343' }}>*</Text>
                  </Text>
                </View>
                <ProgressCircle
                  percent={33.33}
                  radius={25}
                  borderWidth={6}
                  color="#1DAF0C"
                  shadowColor="#E5E5E5"
                  bgColor="#F5F5F5"
                >
                  <Text style={{ fontSize: 15 }}>{'2/6'}</Text>
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
                            setWaitingTime(item.value);
                          }}
                        >
                          {item.value != waitingTime ? (
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
                    "ก่อน" ที่จะมีแอปพลิเคชัน
                    <Text style={{ color: '#CD4343' }}>*</Text>
                  </Text>
                </View>
                <ProgressCircle
                  percent={49.98}
                  radius={25}
                  borderWidth={6}
                  color="#1DAF0C"
                  shadowColor="#E5E5E5"
                  bgColor="#F5F5F5"
                >
                  <Text style={{ fontSize: 15 }}>{'3/6'}</Text>
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
                            setAppointmentStat(item.value);
                          }}
                        >
                          {item.value != appointmentStat ? (
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
                    "ก่อน" ที่จะมีแอปพลิเคชัน
                    <Text style={{ color: '#CD4343' }}>*</Text>
                  </Text>
                </View>
                <ProgressCircle
                  percent={66.64}
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
                            setTransportCost(item.value);
                          }}
                        >
                          {item.value != transportCost ? (
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
                    "ก่อน" ที่จะมีแอปพลิเคชัน
                    <Text style={{ color: '#CD4343' }}>*</Text>
                  </Text>
                </View>
                <ProgressCircle
                  percent={83.3}
                  radius={25}
                  borderWidth={6}
                  color="#1DAF0C"
                  shadowColor="#E5E5E5"
                  bgColor="#F5F5F5"
                >
                  <Text style={{ fontSize: 15 }}>{'5/6'}</Text>
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
                            setAdmitTime(item.value);
                          }}
                        >
                          {item.value != admitTime ? (
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
                    "ก่อน" ที่จะมีแอปพลิเคชัน
                    <Text style={{ color: '#CD4343' }}>*</Text>
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
                  <Text style={{ fontSize: 15 }}>{'6/6'}</Text>
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
                            setHealCost(item.value);
                          }}
                        >
                          {item.value != healCost ? (
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

Survey.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Survey);
