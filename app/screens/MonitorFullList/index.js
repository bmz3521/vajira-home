import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { Header, SafeAreaView, Icon, Image } from '@components';
import { BaseStyle, BaseColor, Images } from '@config';
import { connect } from 'react-redux';
import { getAccessToken } from '@utils/asyncStorage';
import config from '@_config';
import axios from 'axios';
import styles from './styles';

function MonitorFullList({ navigation, user, route }) {
  const [report] = useState(route.params.report);
  const [extractedHeight] = useState(route.params.extractedHeight);
  const [glucose, setGlucose] = useState([]);
  const [pressure, setPressure] = useState([]);
  const [bmi, setBmi] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [oxygen, setOxygen] = useState([]);
  const [defaultGlucose, setDefaultGlucose] = useState({
    defaultLow: 70,
    defaultHigh: 130,
  });
  const [defaultTopHigh, setDefaultTopHigh] = useState(140);
  const [defaultTopLow, setDefaultTopLow] = useState(90);
  const [defaultBottomHigh, setDefaultBottomHigh] = useState(90);
  const [defaultBottomLow, setDefaultBottomLow] = useState(60);

  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [modal, setModal] = useState(false);

  const fetchGlucoseReports = async () => {
    const ACCESS_TOKEN = await getAccessToken();

    try {
      const { data } = await axios.get(
        `${config.apiUrl}/monitoringReports?access_token=${ACCESS_TOKEN.id}&filter[where][appUserId]=${user.data.userInformation.userId}`,
      );

      if (data.length > 0) {
        // Set Glucose
        const glucose = data
          .filter(
            item =>
              item.detail.measurements.glucoseMeasurements !== false &&
              item.detail.measurements.glucoseMeasurements !== undefined,
          )
          .sort(
            (a, b) =>
              new Date(b.detail.timeStamp) - new Date(a.detail.timeStamp),
          );

        setGlucose(glucose);
        setDefaultGlucose({
          defaultLow: parseInt(
            user.data.userInformation.defaultGlucoseValue[0],
          ),
          defaultHigh: parseInt(
            user.data.userInformation.defaultGlucoseValue[1],
          ),
        });
      } else {
        setGlucose([]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error From MonitorBloodGlucose', error);
    }
  };

  const fetchPressureReports = async () => {
    const ACCESS_TOKEN = await getAccessToken();

    try {
      const { data } = await axios.get(
        `${config.apiUrl}/monitoringReports?access_token=${ACCESS_TOKEN.id}&filter[where][appUserId]=${user.data.userInformation.userId}`,
      );

      if (data.length > 0) {
        // Set Pressure
        let pressure = data
          .filter(
            item =>
              item.detail.measurements.pressureMeasurements !== false &&
              item.detail.measurements.pressureMeasurements !== undefined,
          )
          .sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt));

        setPressure(pressure);

        setDefaultTopHigh(
          parseInt(
            user.data.userInformation.defaultPressureMeasurementsAbove[1],
          ),
        );
        setDefaultTopLow(
          parseInt(
            user.data.userInformation.defaultPressureMeasurementsAbove[0],
          ),
        );
        setDefaultBottomHigh(
          parseInt(
            user.data.userInformation.defaultPressureMeasurementsBelow[1],
          ),
        );
        setDefaultBottomLow(
          parseInt(
            user.data.userInformation.defaultPressureMeasurementsBelow[0],
          ),
        );
      } else {
        setPressure([]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error From MonitorBloodGlucose', error);
    }
  };

  const fetchBmiReports = async () => {
    const ACCESS_TOKEN = await getAccessToken();

    try {
      const { data } = await axios.get(
        `${config.apiUrl}/monitoringReports?access_token=${ACCESS_TOKEN.id}&filter[where][appUserId]=${user.data.userInformation.userId}`,
      );

      if (data.length > 0) {
        // Set Bmi
        const bmi = data
          .filter(
            item =>
              item.detail.measurements.weightMeasurements !== false &&
              item.detail.measurements.weightMeasurements !== undefined,
          )
          .sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt));

        setBmi(bmi);
      } else {
        setBmi([]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error From MonitorWeight', error);
    }
  };

  const fetchTemperatureReports = async () => {
    const ACCESS_TOKEN = await getAccessToken();

    try {
      const { data } = await axios.get(
        `${config.apiUrl}/monitoringReports?access_token=${ACCESS_TOKEN.id}&filter[where][appUserId]=${user.data.userInformation.userId}`,
      );

      if (data.length > 0) {
        // Set Temperature
        const temp = data
          .filter(
            item =>
              item.detail.measurements.temperatureMeasurements !== false &&
              item.detail.measurements.temperatureMeasurements !== undefined,
          )
          .sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt));
        setTemperature(temp);
      } else {
        setTemperature([]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error From MonitorTemperature', error);
    }
  };

  const fetchOxygenReports = async () => {
    const ACCESS_TOKEN = await getAccessToken();

    try {
      const { data } = await axios.get(
        `${config.apiUrl}/monitoringReports?access_token=${ACCESS_TOKEN.id}&filter[where][appUserId]=${user.data.userInformation.userId}`,
      );

      if (data.length > 0) {
        // Set Oxygen
        const ox = data
          .filter(
            item =>
              item.detail.measurements.oxygenMeasurements !== false &&
              item.detail.measurements.oxygenMeasurements !== undefined,
          )
          .sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt));

        setOxygen(ox);
      } else {
        setOxygen([]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error From MonitorOxygen', error);
    }
  };

  useEffect(() => {
    if (report === 'น้ำตาลในเลือด') {
      fetchGlucoseReports();
    } else if (report === 'ความดันโลหิต') {
      fetchPressureReports();
    } else if (report === 'อุณหภูมิ') {
      fetchTemperatureReports();
    } else if (report === 'ออกซิเจน') {
      fetchOxygenReports();
    } else {
      fetchBmiReports();
    }
  }, []);

  const onDelete = async () => {
    const ACCESS_TOKEN = await getAccessToken();

    try {
      await axios.delete(
        `${config.apiUrl}/monitoringReports/${deleteId}?access_token=${ACCESS_TOKEN.id}`,
      );
    } catch (err) {
      console.log(err);
    }

    if (report === 'น้ำตาลในเลือด') {
      fetchGlucoseReports();
    } else if (report === 'ความดันโลหิต') {
      fetchPressureReports();
    } else if (report === 'อุณหภูมิ') {
      fetchTemperatureReports();
    } else if (report === 'ออกซิเจน') {
      fetchOxygenReports();
    } else {
      fetchBmiReports();
    }

    setDeleteId(null);
    setModal(false);
  };

  if (loading === true) {
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        <Header
          title={report}
          textStyle={styles.headerText}
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
        title={report}
        textStyle={styles.headerText}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.navigate('HealthActivity');
        }}
      />

      {report === 'น้ำตาลในเลือด' ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: '#f5f5f5' }}
        >
          <View style={styles.listContainer}>
            <View style={styles.header}>
              <View style={styles.left}>
                <Image source={Images.diabetes} style={styles.image} />
                <Text style={styles.leftText}>บันทึกค่าน้ำตาลในเลือด</Text>
              </View>
            </View>
            {glucose.length > 0 ? (
              glucose.map(item => (
                <View key={item.id}>
                  <View style={styles.itemContainer}>
                    <View style={styles.dateAndActivity}>
                      <Text style={styles.leftValue}>
                        {item.detail.measurements.glucoseMeasurements.glucose}{' '}
                        <Text style={styles.leftMeasurement}>มก./ดล.</Text>
                      </Text>
                      <Text style={styles.leftMeasurement}>
                        วันที่{' '}
                        {moment(item.detail.timeStamp).format('D MMMM YYYY')} (
                        {moment(item.detail.timeStamp).format('HH:mm')} น.)
                      </Text>
                      <Text style={styles.leftMeasurement}>
                        กิจกรรม: {item?.detail?.period}
                      </Text>
                      <Text style={styles.leftMeasurement}>
                        หมายเหตุ:{' '}
                        {
                          item?.detail?.measurements?.glucoseMeasurements
                            ?.reason
                        }
                      </Text>
                    </View>
                    <View style={styles.resultAndDelete}>
                      <View>
                        {item.detail.measurements.glucoseMeasurements.glucose <
                        defaultGlucose.defaultLow ? (
                          <Text style={[styles.result, { color: '#CC4343' }]}>
                            ต่ำกว่าเกณฑ์
                          </Text>
                        ) : item.detail.measurements.glucoseMeasurements
                            .glucose > defaultGlucose.defaultHigh ? (
                          <Text style={[styles.result, { color: '#3997EA' }]}>
                            สูงกว่าเกณฑ์
                          </Text>
                        ) : (
                          <Text style={[styles.result, { color: '#0AB678' }]}>
                            เกณฑ์ดี
                          </Text>
                        )}
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                          setDeleteId(item.id);
                          setModal(true);
                        }}
                      >
                        <Icon bold name="trash-alt" size={16} color="#c0c0c0" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.lineContainer}>
                    <View style={styles.line} />
                  </View>
                </View>
              ))
            ) : (
              <View>
                <Text>ไม่พบข้อมูล</Text>
              </View>
            )}
            <LinearGradient style={styles.add} colors={['#0A905F', '#095C3E']}>
              <TouchableOpacity
                underlayColor="grey"
                style={{ width: '100%', alignItems: 'center' }}
                disabled={false}
                onPress={() =>
                  navigation.push('MonitorAddData', {
                    type: 'glucose',
                    no: glucose.length,
                    above: defaultGlucose.defaultHigh,
                    below: defaultGlucose.defaultLow,
                  })
                }
              >
                <Text style={styles.buttonText}>+ เพิ่ม</Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient style={styles.add} colors={['#0A905F', '#095C3E']}>
              <TouchableOpacity
                underlayColor="grey"
                style={{ width: '100%', alignItems: 'center' }}
                disabled={false}
                onPress={() =>
                  navigation.push('MonitorAddGlucose', {
                    no: glucose.length,
                    above: defaultGlucose.defaultHigh,
                    below: defaultGlucose.defaultLow,
                  })
                }
              >
                <Text style={styles.buttonText}>
                  + เพิ่มจากเครื่อง Accu-Chek
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      ) : null}

      {report === 'ความดันโลหิต' ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: '#f5f5f5' }}
        >
          <View style={styles.listContainer}>
            <View style={styles.header}>
              <View style={styles.left}>
                <Image source={Images.blood_pressure} style={styles.image} />
                <Text style={styles.leftText}>
                  บันทึกค่าความดันโลหิตทั้งหมด
                </Text>
              </View>
            </View>
            {pressure.length > 0 ? (
              pressure.map(item => (
                <View key={item.id}>
                  <View style={styles.itemContainer}>
                    <View style={styles.dateAndActivity}>
                      <Text style={styles.leftValue}>
                        {item.detail.measurements.pressureMeasurements.high}/
                        {item.detail.measurements.pressureMeasurements.low}
                        <Text style={styles.leftMeasurement}> มม./ปรอท.</Text>
                      </Text>
                      <Text style={styles.leftMeasurement}>
                        วันที่{' '}
                        {moment(item.detail.timeStamp).format('D MMMM YYYY')} (
                        {moment(item.detail.timeStamp).format('HH:mm')} น.)
                      </Text>
                      <Text style={styles.leftMeasurement}>
                        กิจกรรม: {item?.detail?.period}
                      </Text>
                      <Text style={styles.leftMeasurement}>
                        หมายเหตุ:{' '}
                        {
                          item?.detail?.measurements?.pressureMeasurements
                            ?.reason
                        }
                      </Text>
                    </View>
                    <View style={styles.resultAndDelete}>
                      <View>
                        {item.detail.measurements.pressureMeasurements.high >
                          defaultTopLow &&
                        item.detail.measurements.pressureMeasurements.high <=
                          defaultTopHigh &&
                        item.detail.measurements.pressureMeasurements.low >=
                          defaultBottomLow &&
                        item.detail.measurements.pressureMeasurements.low <=
                          defaultBottomHigh ? (
                          <Text style={[styles.result, { color: '#0AB678' }]}>
                            เกณฑ์ดี
                          </Text>
                        ) : item.detail.measurements.pressureMeasurements.high >
                            defaultTopHigh ||
                          item.detail.measurements.pressureMeasurements.low >
                            defaultBottomHigh ? (
                          <Text style={[styles.result, { color: '#CC4343' }]}>
                            สูงกว่าเกณฑ์
                          </Text>
                        ) : (
                          <Text style={[styles.result, { color: '#3997EA' }]}>
                            ต่ำกว่าเกณฑ์
                          </Text>
                        )}
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                          setDeleteId(item.id);
                          setModal(true);
                        }}
                      >
                        <Icon bold name="trash-alt" size={16} color="#c0c0c0" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.lineContainer}>
                    <View style={styles.line} />
                  </View>
                </View>
              ))
            ) : (
              <View>
                <Text>ไม่พบข้อมูล</Text>
              </View>
            )}
            <LinearGradient style={styles.add} colors={['#0A905F', '#095C3E']}>
              <TouchableOpacity
                underlayColor="grey"
                style={{ width: '100%', alignItems: 'center' }}
                disabled={false}
                onPress={() =>
                  navigation.push('MonitorAddData', {
                    type: 'pressure',
                    no: pressure.length,
                    defaultTopHigh: defaultTopHigh,
                    defaultTopLow: defaultTopLow,
                    defaultBottomHigh: defaultBottomHigh,
                    defaultBottomLow: defaultBottomLow,
                  })
                }
              >
                <Text style={styles.buttonText}>+ เพิ่ม</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      ) : null}

      {report === 'ดัชนีมวลกาย' ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: '#f5f5f5' }}
        >
          <View style={styles.listContainer}>
            <View style={styles.header}>
              <View style={styles.left}>
                <Image source={Images.bmi} style={styles.image} />
                <Text style={styles.leftText}>บันทึกค่าดัชนีมวลกายทั้งหมด</Text>
              </View>
            </View>
            {bmi.length > 0 ? (
              bmi.map(item => (
                <View key={item.id}>
                  <View style={styles.itemContainer}>
                    <View style={styles.dateAndActivity}>
                      <Text style={styles.leftValue}>
                        {item.detail.measurements.weightMeasurements.bmi}{' '}
                        <Text style={styles.leftMeasurement}>กก./ตร.ม.</Text>
                      </Text>
                      {item.detail.measurements.weightMeasurements.weight !==
                        undefined &&
                        item.detail.measurements.weightMeasurements.height !==
                          undefined &&
                        item.detail.measurements.weightMeasurements.weight !==
                          0 &&
                        item.detail.measurements.weightMeasurements.height !==
                          0 && (
                          <View>
                            <Text style={styles.leftMeasurement}>
                              (
                              {
                                item.detail.measurements.weightMeasurements
                                  .weight
                              }{' '}
                              กก. /{' '}
                              {
                                item.detail.measurements.weightMeasurements
                                  .height
                              }{' '}
                              ซม.)
                            </Text>
                          </View>
                        )}
                      <Text style={styles.leftMeasurement}>
                        วันที่{' '}
                        {moment(item.detail.timeStamp).format('D MMMM YYYY')} (
                        {moment(item.detail.timeStamp).format('HH:mm')} น.)
                      </Text>
                    </View>
                    <View style={styles.resultAndDelete}>
                      <View>
                        {item.detail.measurements.weightMeasurements.bmi <
                        18.5 ? (
                          <Text style={[styles.result, { color: '#3997EA' }]}>
                            ต่ำกว่าเกณฑ์
                          </Text>
                        ) : item.detail.measurements.weightMeasurements.bmi >
                          22.99 ? (
                          <Text style={[styles.result, { color: '#CC4343' }]}>
                            สูงกว่าเกณฑ์
                          </Text>
                        ) : (
                          <Text style={[styles.result, { color: '#0AB678' }]}>
                            เกณฑ์ดี
                          </Text>
                        )}
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                          setDeleteId(item.id);
                          setModal(true);
                        }}
                      >
                        <Icon bold name="trash-alt" size={16} color="#c0c0c0" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.lineContainer}>
                    <View style={styles.line} />
                  </View>
                </View>
              ))
            ) : (
              <View>
                <Text>ไม่พบข้อมูล</Text>
              </View>
            )}
            <LinearGradient style={styles.add} colors={['#0A905F', '#095C3E']}>
              <TouchableOpacity
                underlayColor="grey"
                style={{ width: '100%', alignItems: 'center' }}
                disabled={false}
                onPress={() =>
                  navigation.push('MonitorAddData', {
                    type: 'bmi',
                    no: bmi.length,
                    above: 22.99,
                    below: 18.5,
                    extractedHeight: extractedHeight,
                  })
                }
              >
                <Text style={styles.buttonText}>+ เพิ่ม</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      ) : null}

      {report === 'อุณหภูมิ' ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: '#f5f5f5' }}
        >
          <View style={styles.listContainer}>
            <View style={styles.header}>
              <View style={styles.left}>
                <Image source={Images.temperature} style={styles.image} />
                <Text style={styles.leftText}>บันทึกค่าอุณหภูมิทั้งหมด</Text>
              </View>
            </View>
            {temperature.length > 0 ? (
              temperature.map(item => (
                <View key={item.id}>
                  <View style={styles.itemContainer}>
                    <View style={styles.dateAndActivity}>
                      <Text style={styles.leftValue}>
                        {
                          item.detail.measurements.temperatureMeasurements
                            .celsius
                        }{' '}
                        <Text style={styles.leftMeasurement}>ซ.</Text>
                      </Text>
                      <Text style={styles.leftMeasurement}>
                        วันที่{' '}
                        {moment(item.detail.timeStamp).format('D MMMM YYYY')} (
                        {moment(item.detail.timeStamp).format('HH:mm')} น.)
                      </Text>
                    </View>
                    <View style={styles.resultAndDelete}>
                      <View>
                        {item.detail.measurements.temperatureMeasurements
                          .celsius < 35.0 ? (
                          <Text style={[styles.result, { color: '#3997EA' }]}>
                            ต่ำกว่าเกณฑ์
                          </Text>
                        ) : item.detail.measurements.temperatureMeasurements
                            .celsius > 37.8 ? (
                          <Text style={[styles.result, { color: '#CC4343' }]}>
                            สูงกว่าเกณฑ์
                          </Text>
                        ) : (
                          <Text style={[styles.result, { color: '#0AB678' }]}>
                            เกณฑ์ดี
                          </Text>
                        )}
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                          setDeleteId(item.id);
                          setModal(true);
                        }}
                      >
                        <Icon bold name="trash-alt" size={16} color="#c0c0c0" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.lineContainer}>
                    <View style={styles.line} />
                  </View>
                </View>
              ))
            ) : (
              <View>
                <Text>ไม่พบข้อมูล</Text>
              </View>
            )}
            <LinearGradient style={styles.add} colors={['#0A905F', '#095C3E']}>
              <TouchableOpacity
                underlayColor="grey"
                style={{ width: '100%', alignItems: 'center' }}
                disabled={false}
                onPress={() =>
                  navigation.push('MonitorAddData', {
                    type: 'temperature',
                    no: temperature.length,
                    above: 37.8,
                    below: 35.0,
                  })
                }
              >
                <Text style={styles.buttonText}>+ เพิ่ม</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      ) : null}

      {report === 'ออกซิเจน' ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: '#f5f5f5' }}
        >
          <View style={styles.listContainer}>
            <View style={styles.header}>
              <View style={styles.left}>
                <Image source={Images.oxygen} style={styles.image} />
                <Text style={styles.leftText}>บันทึกค่าออกซิเจนทั้งหมด</Text>
              </View>
            </View>
            {oxygen.length > 0 ? (
              oxygen.map(item => (
                <View key={item.id}>
                  <View style={styles.itemContainer}>
                    <View style={styles.dateAndActivity}>
                      <Text style={styles.leftValue}>
                        {item.detail.measurements.oxygenMeasurements.percent}{' '}
                        <Text style={styles.leftMeasurement}>%</Text>
                      </Text>
                      <Text style={styles.leftMeasurement}>
                        วันที่{' '}
                        {moment(item.detail.timeStamp).format('D MMMM YYYY')} (
                        {moment(item.detail.timeStamp).format('HH:mm')} น.)
                      </Text>
                    </View>
                    <View style={styles.resultAndDelete}>
                      <View>
                        {item.detail.measurements.oxygenMeasurements.percent >
                        95.0 ? (
                          <Text style={[styles.result, { color: '#0AB678' }]}>
                            ปกติดี
                          </Text>
                        ) : item.detail.measurements.oxygenMeasurements
                            .percent > 90 ? (
                          <Text style={[styles.result, { color: '#E6B285' }]}>
                            เฝ้าระวังอาการ
                          </Text>
                        ) : (
                          <Text style={[styles.result, { color: '#CC4343' }]}>
                            ต่ำกว่าปกติ
                          </Text>
                        )}
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                          setDeleteId(item.id);
                          setModal(true);
                        }}
                      >
                        <Icon bold name="trash-alt" size={16} color="#c0c0c0" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.lineContainer}>
                    <View style={styles.line} />
                  </View>
                </View>
              ))
            ) : (
              <View>
                <Text>ไม่พบข้อมูล</Text>
              </View>
            )}
            <LinearGradient style={styles.add} colors={['#0A905F', '#095C3E']}>
              <TouchableOpacity
                underlayColor="grey"
                style={{ width: '100%', alignItems: 'center' }}
                disabled={false}
                onPress={() =>
                  navigation.push('MonitorAddData', {
                    type: 'oxygen',
                    no: oxygen.length,
                    dangerous: 95,
                    low: 90,
                  })
                }
              >
                <Text style={styles.buttonText}>+ เพิ่ม</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      ) : null}

      {modal && (
        <Modal animationType="slide" transparent={true} visible={modal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[styles.modalTitle, { color: '#CC4343' }]}>
                ลบข้อมูล
              </Text>

              <Text style={[styles.modalText, { color: '#000' }]}>
                ท่านต้องการลบข้อมูลที่บันทึกไว้นี้
              </Text>

              <View style={styles.modalButtonContainer}>
                <LinearGradient
                  style={styles.addModal}
                  colors={['#c0c0c0', '#ada6a6']}
                >
                  <TouchableOpacity
                    underlayColor="grey"
                    style={{ width: '100%', alignItems: 'center' }}
                    disabled={false}
                    onPress={() => {
                      setModal(false);
                    }}
                  >
                    <Text style={styles.buttonTextDelete}>ยกเลิก</Text>
                  </TouchableOpacity>
                </LinearGradient>
                <LinearGradient
                  style={styles.addModal}
                  colors={['#CB4344', '#CC4343']}
                >
                  <TouchableOpacity
                    underlayColor="grey"
                    style={{ width: '100%', alignItems: 'center' }}
                    disabled={false}
                    onPress={() => {
                      onDelete();
                    }}
                  >
                    <Text style={styles.buttonTextAdd}>ลบ</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(MonitorFullList);
