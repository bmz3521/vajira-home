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

function MonitorBloodPressure({ navigation, user }) {
  const [pressure, setPressure] = useState([]);
  const [defaultPressure, setDefaultPressure] = useState({
    defaultLow: 60,
    defaultHigh: 140,
  });
  const [highValues, setHighValues] = useState([{ x: 0, y: 0 }]);
  const [lowValues, setLowValues] = useState([{ x: 0, y: 0 }]);
  const [lowestOfHigh, setLowestOfHigh] = useState(0);
  const [highestOfHigh, setHighestOfHigh] = useState(0);
  const [lowestOfLow, setLowestOfLow] = useState(0);
  const [highestOfLow, setHighestOfLow] = useState(0);
  const [averageOfHigh, setAverageOfHigh] = useState(0);
  const [averageOfLow, setAverageOfLow] = useState(0);
  const [defaultTopHigh, setDefaultTopHigh] = useState(140);
  const [defaultTopLow, setDefaultTopLow] = useState(90);
  const [defaultBottomHigh, setDefaultBottomHigh] = useState(90);
  const [defaultBottomLow, setDefaultBottomLow] = useState(60);
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

      // Set Pressure
      let tempPressure = data.filter(
        item => item.detail.measurements.pressureMeasurements !== false,
      );

      let forHigh = [...tempPressure];
      let forLow = [...tempPressure];

      const pressure = [];

      tempPressure.map(item => pressure.push(item));

      if (tempPressure.length > 0) {
        // Store pressure values in chronological order
        let highInChro = [];
        let lowInChro = [];

        tempPressure.map((item, index) => {
          let highValue;

          if (item.detail.measurements.pressureMeasurements.high > 200) {
            highValue = 200;
          } else {
            highValue = item.detail.measurements.pressureMeasurements.high;
          }

          highInChro.push({
            x: index + 1,
            y: highValue,
          });
          lowInChro.push({
            x: index + 1,
            y: item.detail.measurements.pressureMeasurements.low,
          });
        });

        let topHigh = null;
        let topLow = null;
        let bottomHigh = null;
        let bottomLow = null;

        if (
          user?.data?.userInformation?.defaultPressureMeasurementsAbove &&
          user?.data?.userInformation?.defaultPressureMeasurementsBelow
        ) {
          topHigh = parseInt(
            user?.data?.userInformation?.defaultPressureMeasurementsAbove[1],
          );
          topLow = parseInt(
            user?.data?.userInformation?.defaultPressureMeasurementsAbove[0],
          );
          bottomHigh = parseInt(
            user?.data?.userInformation?.defaultPressureMeasurementsBelow[1],
          );
          bottomLow = parseInt(
            user?.data?.userInformation?.defaultPressureMeasurementsBelow[0],
          );
        } else {
          topHigh = defaultTopHigh;
          topLow = defaultTopLow;
          bottomHigh = defaultBottomHigh;
          bottomLow = defaultBottomLow;
        }

        // Keep track of results

        let above = 0;
        let normal = 0;
        let below = 0;
        tempPressure.forEach(item => {
          let high = item.detail.measurements.pressureMeasurements.high;
          let low = item.detail.measurements.pressureMeasurements.low;

          if (
            high >= topLow &&
            high <= topHigh &&
            low >= bottomLow &&
            low <= bottomHigh
          ) {
            return (normal = normal + 1);
          } else if (high > topHigh || low > bottomHigh) {
            return (above = above + 1);
          } else if (high < topLow || low < bottomLow) {
            return (below = below + 1);
          }
        });

        // Store default
        setDefaultPressure({
          defaultLow: bottomLow,
          defaultHigh: topHigh,
        });

        setDefaultTopHigh(topHigh);
        setDefaultTopLow(topLow);
        setDefaultBottomHigh(bottomHigh);
        setDefaultBottomLow(bottomLow);

        // Find highest & lowest of high
        let sortedHigh = forHigh.sort(
          (a, b) =>
            b.detail.measurements.pressureMeasurements.high -
            a.detail.measurements.pressureMeasurements.high,
        );

        // Find highest & lowest of low
        let sortedLow = forLow.sort(
          (a, b) =>
            b.detail.measurements.pressureMeasurements.low -
            a.detail.measurements.pressureMeasurements.low,
        );

        // Find Average High
        let allHighValues = [];
        sortedLow.map(item => {
          allHighValues.push(
            item.detail.measurements.pressureMeasurements.high,
          );
        });

        let totalHigh = allHighValues.reduce((accu, curr) => {
          return accu + curr;
        }, 0);
        let averageHigh = totalHigh / sortedHigh.length;

        // Find Average Low
        let allLowValues = [];

        sortedLow.map(item => {
          allLowValues.push(item.detail.measurements.pressureMeasurements.low);
        });

        let totalLow = allLowValues.reduce((accu, curr) => {
          return accu + curr;
        }, 0);
        let averageLow = totalLow / sortedLow.length;

        setPressure(
          pressure
            .sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt))
            .splice(0, 3),
        );

        setStatistics({
          above,
          normal,
          below,
        });
        setHighValues(highInChro);
        setLowValues(lowInChro);
        setAverageOfHigh(Math.round(averageHigh));
        setAverageOfLow(Math.round(averageLow));
        setHighestOfHigh(
          sortedHigh[0].detail.measurements.pressureMeasurements.high,
        );
        setLowestOfHigh(
          sortedHigh[sortedHigh.length - 1].detail.measurements
            .pressureMeasurements.high,
        );
        setHighestOfLow(
          sortedLow[0].detail.measurements.pressureMeasurements.low,
        );
        setLowestOfLow(
          sortedLow[sortedLow.length - 1].detail.measurements
            .pressureMeasurements.low,
        );
      } else {
        setPressure([]);
        setHighValues([{ x: 0, y: 0 }]);
        setLowValues([{ x: 0, y: 0 }]);
        setAverageOfHigh(0);
        setAverageOfLow(0);
        setHighestOfHigh(0);
        setLowestOfHigh(0);
        setHighestOfLow(0);
        setLowestOfLow(0);
        setStatistics({
          above: 0,
          normal: 0,
          below: 0,
        });
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
          title="ความดันโลหิต"
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
        title="ความดันโลหิต"
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
              yDomain={{ min: 0, max: 200 }}
              xDomain={{ min: 0, max: highValues.length + 10 }}
              viewport={{ size: { width: 10 } }}
              data={highValues}
            >
              <VerticalAxis
                tickValues={[
                  0,
                  defaultPressure.defaultLow,
                  defaultPressure.defaultHigh,
                  200,
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
                    from: { color: '#FFE4E4', opacity: 1.0 },
                    to: { color: '#FFE4E4', opacity: 1.0 },
                  },
                }}
                smoothing="cubic-spline"
                data={[
                  { x: 0, y: 200 },
                  { x: highValues.length + 10, y: 200 },
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
                  { x: 0, y: defaultPressure.defaultHigh },
                  { x: highValues.length + 10, y: defaultPressure.defaultHigh },
                ]}
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
                  { x: 0, y: defaultPressure.defaultLow },
                  { x: highValues.length + 10, y: defaultPressure.defaultLow },
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
                data={highValues}
              />
              <Line
                theme={{
                  stroke: { color: '#095C3E', width: 2 },
                  scatter: {
                    default: { width: 8, height: 8, rx: 4, color: '#095C3E' },
                  },
                }}
                smoothing="cubic-spline"
                data={lowValues}
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
          <View style={styles.ValueContainer}>
            <View style={styles.tabContainer}>
              <View style={styles.boxContainer}>
                <View>
                  <Text style={styles.tabText}>ความดันตัวบนต่ำสุด</Text>
                </View>
                <View>
                  <Text style={styles.tabValue}>
                    {lowestOfHigh}{' '}
                    <Text style={styles.tabMeasure}>มม./ปรอท.</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.boxContainerWithBorder}>
                <View>
                  <Text style={styles.tabText}>ความดันตัวบนสูงสุด</Text>
                </View>
                <View>
                  <Text style={styles.tabValue}>
                    {highestOfHigh}{' '}
                    <Text style={styles.tabMeasure}>มม./ปรอท.</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.boxContainer}>
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
            </View>
            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>
            <View style={styles.tabContainer}>
              <View style={styles.boxContainer}>
                <View>
                  <Text style={styles.tabText}>ความดันตัวล่างต่ำสุด</Text>
                </View>
                <View>
                  <Text style={styles.tabValue}>
                    {lowestOfLow}{' '}
                    <Text style={styles.tabMeasure}>มม./ปรอท.</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.boxContainerWithBorder}>
                <View>
                  <Text style={styles.tabText}>ความดันตัวล่างสูงสุด</Text>
                </View>
                <View>
                  <Text style={styles.tabValue}>
                    {highestOfLow}{' '}
                    <Text style={styles.tabMeasure}>มม./ปรอท.</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.boxContainer}>
                <View>
                  <Text style={styles.tabText}>ค่าเฉลี่ยความดัน</Text>
                </View>
                <View>
                  <Text style={[styles.tabValue, { fontSize: 14 }]}>
                    {averageOfHigh}/{averageOfLow}
                    <Text style={styles.tabMeasure}> มม./ปรอท.</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.listContainer}>
          <View style={styles.header}>
            <View style={styles.left}>
              <Image source={Images.blood_pressure} style={styles.image} />
              <Text style={styles.leftText}>บันทึกค่าความดันโลหิต</Text>
            </View>
            <View style={styles.right}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.push('MonitorFullList', {
                    report: 'ความดันโลหิต',
                  })
                }
              >
                <Text style={styles.rightText}>ดูทั้งหมด</Text>
              </TouchableOpacity>
            </View>
          </View>
          {pressure.length > 0
            ? pressure.map(item => (
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
                        {item.detail.measurements.pressureMeasurements.high >=
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
            : null}
          <LinearGradient style={styles.add} colors={['#0A905F', '#095C3E']}>
            <TouchableOpacity
              underlayColor="grey"
              style={{ width: '100%', alignItems: 'center' }}
              disabled={false}
              onPress={() =>
                navigation.push('MonitorAddData', {
                  type: 'pressure',
                  no: statistics.above + statistics.normal + statistics.below,
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

export default connect(mapStateToProps, null)(MonitorBloodPressure);
