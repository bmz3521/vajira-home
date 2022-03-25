import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {
  Chart,
  Line,
  Area,
  VerticalAxis,
  HorizontalAxis,
} from 'react-native-responsive-linechart';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { Header, SafeAreaView, Icon, Image } from '@components';
import { BaseStyle, BaseColor, Images } from '@config';
import { connect } from 'react-redux';
import { getAccessToken } from '@utils/asyncStorage';
import config from '@_config';
import axios from 'axios';
import styles from './styles';

function MonitorBloodGlucose({ navigation, user }) {
  const [glucose, setGlucose] = useState([]);
  const [defaultGlucose, setDefaultGlucose] = useState({
    defaultLow: 70,
    defaultHigh: 130,
  });
  const [values, setValues] = useState([{ x: 0, y: 0 }]);
  const [lowest, setLowest] = useState(0);
  const [highest, setHighest] = useState(0);
  const [average, setAverage] = useState(0);
  const [statistics, setStatistics] = useState({
    above: 0,
    normal: 0,
    below: 0,
  });
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [modal, setModal] = useState(false);

  const fetchMonitoringReports = async () => {
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

      tempGlucose
        .sort(
          (a, b) => new Date(a.detail.timeStamp) - new Date(b.detail.timeStamp),
        )
        .map(item => glucose.push(item));

      if (tempGlucose.length > 0) {
        // Store glucose values in chronological order
        let valueInChro = [];
        tempGlucose.map((item, index) => {
          let value;

          if (item.detail.measurements.glucoseMeasurements.glucose < 50) {
            value = 50;
          } else if (
            item.detail.measurements.glucoseMeasurements.glucose > 400
          ) {
            value = 400;
          } else {
            value = item.detail.measurements.glucoseMeasurements.glucose;
          }
          valueInChro.push({
            x: index + 1,
            y: value,
          });
        });

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

        // Find Average
        let allValues = [];
        sorted.map(item => {
          allValues.push(item.detail.measurements.glucoseMeasurements.glucose);
        });
        let total = allValues.reduce((accu, curr) => {
          return accu + curr;
        }, 0);
        let average = total / sorted.length;

        setGlucose(
          glucose
            .sort(
              (a, b) =>
                new Date(b.detail.timeStamp) - new Date(a.detail.timeStamp),
            )
            .splice(0, 3),
        );
        setStatistics({ above, normal, below });
        setValues(valueInChro);
        setAverage(Math.round(average));
        setHighest(sorted[0].detail.measurements.glucoseMeasurements.glucose);
        setLowest(
          sorted[sorted.length - 1].detail.measurements.glucoseMeasurements
            .glucose,
        );
      } else {
        setGlucose([]);
        setStatistics({
          above: 0,
          normal: 0,
          below: 0,
        });
        setValues([{ x: 0, y: 0 }]);
        setAverage(0);
        setHighest(0);
        setLowest(0);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error From MonitorBloodGlucose', error);
    }
  };

  useEffect(() => {
    fetchMonitoringReports();
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

    fetchMonitoringReports();
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
          title="น้ำตาลในเลือด"
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
        title="น้ำตาลในเลือด"
        textStyle={styles.headerText}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#f5f5f5' }}
      >
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {}}
            style={styles.infoContainer}
          >
            <Image style={styles.info} source={Images.info} />
            <Text style={styles.infoText}>เกี่ยวกับเกณฑ์</Text>
          </TouchableOpacity>
          <View style={styles.topContainer}>
            <Chart
              style={{ height: 180, width: '80%' }}
              padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
              yDomain={{ min: 50, max: 400 }}
              xDomain={{ min: 0, max: values.length + 10 }}
              viewport={{ size: { width: 10 } }}
              data={values}
            >
              <VerticalAxis
                tickValues={[
                  defaultGlucose.defaultLow == 50 ? 0 : 50,
                  defaultGlucose.defaultLow,
                  defaultGlucose.defaultHigh,
                  400,
                ]}
                theme={{
                  axis: { stroke: { color: '#000', width: 2 } },
                  ticks: { stroke: { color: 'green', width: 2 } },
                  labels: { formatter: v => Number(v) },
                }}
              />
              <HorizontalAxis
                tickCount={1}
                theme={{
                  axis: { stroke: { color: '#000', width: 2 } },
                  labels: {
                    formatter: v => Number(v),
                  },
                }}
              />

              <Area
                theme={{
                  gradient: {
                    from: { color: '#E0F1FF', opacity: 1.0 },
                    to: { color: '#E0F1FF', opacity: 1.0 },
                  },
                }}
                smoothing="cubic-spline"
                data={[
                  { x: 0, y: 400 },
                  { x: values.length + 10, y: 400 },
                ]}
              />
              <Area
                theme={{
                  gradient: {
                    from: { color: '#E4FFF5', opacity: 1.0 },
                    to: { color: '#E4FFF5', opacity: 1.0 },
                  },
                }}
                smoothing="cubic-spline"
                data={[
                  { x: 0, y: defaultGlucose.defaultHigh },
                  { x: values.length + 10, y: defaultGlucose.defaultHigh },
                ]}
              />
              <Area
                theme={{
                  gradient: {
                    from: { color: '#FFE4E4', opacity: 1.0 },
                    to: { color: '#FFE4E4', opacity: 1.0 },
                  },
                }}
                smoothing="cubic-spline"
                data={[
                  { x: 0, y: defaultGlucose.defaultLow },
                  { x: values.length + 10, y: defaultGlucose.defaultLow },
                ]}
              />
              <Line
                theme={{
                  stroke: { color: '#095394', width: 2 },
                  scatter: {
                    default: { width: 8, height: 8, rx: 4, color: '#095394' },
                  },
                }}
                smoothing="cubic-spline"
                data={values}
              />
            </Chart>
            <View style={styles.rightContainer}>
              <View>
                <Text style={styles.above}>สูงกว่าเกณฑ์</Text>
                <Text style={styles.above}>
                  <Text style={[styles.above, { fontSize: 16 }]}>
                    {statistics.above}{' '}
                  </Text>
                  ครั้ง
                </Text>
              </View>
              <View>
                <Text style={styles.normal}>เกณฑ์ดี</Text>
                <Text style={styles.normal}>
                  <Text style={[styles.normal, { fontSize: 16 }]}>
                    {statistics.normal}{' '}
                  </Text>
                  ครั้ง
                </Text>
              </View>
              <View>
                <Text style={styles.below}>ต่ำกว่าเกณฑ์</Text>
                <Text style={styles.below}>
                  <Text style={[styles.below, { fontSize: 16 }]}>
                    {statistics.below}{' '}
                  </Text>
                  ครั้ง
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.tabContainer}>
            <View style={styles.boxContainerWithBorder}>
              <View>
                <Text style={styles.tabText}>จำนวนการบันทึก</Text>
              </View>
              <View>
                <Text style={styles.tabValue}>
                  {statistics.above + statistics.normal + statistics.below}{' '}
                  <Text style={styles.tabMeasure}>ครั้ง</Text>
                </Text>
              </View>
            </View>
            <View style={styles.boxContainer}>
              <View>
                <Text style={styles.tabText}>ค่าต่ำสุด</Text>
              </View>
              <View>
                <Text style={styles.tabValue}>
                  {lowest} <Text style={styles.tabMeasure}>มก./ดล.</Text>
                </Text>
              </View>
            </View>
            <View style={styles.boxContainerWithBorder}>
              <View>
                <Text style={styles.tabText}>ค่าสูงสุด</Text>
              </View>
              <View>
                <Text style={styles.tabValue}>
                  {highest} <Text style={styles.tabMeasure}>มก./ดล.</Text>
                </Text>
              </View>
            </View>
            <View style={styles.boxContainer}>
              <View>
                <Text style={styles.tabText}>ค่าเฉลี่ย</Text>
              </View>
              <View>
                <Text style={styles.tabValue}>
                  {average} <Text style={styles.tabMeasure}>มก./ดล.</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.listContainer}>
          <View style={styles.header}>
            <View style={styles.left}>
              <Image source={Images.diabetes} style={styles.image} />
              <Text style={styles.leftText}>บันทึกค่าน้ำตาลในเลือด</Text>
            </View>
            <View style={styles.right}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.push('MonitorFullList', {
                    report: 'น้ำตาลในเลือด',
                  })
                }
              >
                <Text style={styles.rightText}>ดูทั้งหมด</Text>
              </TouchableOpacity>
            </View>
          </View>
          {glucose.length > 0
            ? glucose.map(item => (
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
            : null}
          <LinearGradient style={styles.add} colors={['#0A905F', '#095C3E']}>
            <TouchableOpacity
              underlayColor="grey"
              style={{ width: '100%', alignItems: 'center' }}
              disabled={false}
              onPress={() =>
                navigation.push('MonitorAddData', {
                  type: 'glucose',
                  no: statistics.above + statistics.normal + statistics.below,
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
                  no: statistics.above + statistics.normal + statistics.below,
                  above: defaultGlucose.defaultHigh,
                  below: defaultGlucose.defaultLow,
                })
              }
            >
              <Text style={styles.buttonText}>+ เพิ่มจากเครื่อง Accu-Chek</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

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
                    style={styles.add}
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
                    style={styles.add}
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
      </ScrollView>
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(MonitorBloodGlucose);
