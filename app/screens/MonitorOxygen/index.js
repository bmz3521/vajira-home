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

function MonitorOxygen({ navigation, user }) {
  const [oxygens, setOxygens] = useState([]);
  const [defaultOxygen, setDefaultOxygen] = useState({
    defaultLow: 90,
    defaultDangerous: 95,
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

      // Set Temperature
      let tempOxygen = data.filter(
        item =>
          item.detail.measurements.oxygenMeasurements !== false &&
          item.detail.measurements.oxygenMeasurements !== undefined,
      );

      const finalTemp = [];

      tempOxygen.map(item => finalTemp.push(item));

      if (tempOxygen.length > 0) {
        // Store temperature values in chronological order
        let valueInChro = [];
        tempOxygen.map((item, index) => {
          let value;

          if (item.detail.measurements.oxygenMeasurements.percent < 80) {
            value = 80;
          } else if (
            item.detail.measurements.oxygenMeasurements.percent > 100
          ) {
            value = 100;
          } else {
            value = item.detail.measurements.oxygenMeasurements.percent;
          }
          valueInChro.push({
            x: index + 1,
            y: value,
          });
        });

        // Find highest & lowest
        let sorted = tempOxygen.sort(
          (a, b) =>
            b.detail.measurements.oxygenMeasurements.percent -
            a.detail.measurements.oxygenMeasurements.percent,
        );

        // Keep track of results
        let above = 0;
        let normal = 0;
        let below = 0;
        sorted.forEach(item => {
          if (item.detail.measurements.oxygenMeasurements.percent < 90.0) {
            return (below = below + 1);
          } else if (
            item.detail.measurements.oxygenMeasurements.percent > 95.0
          ) {
            return (above = above + 1);
          } else {
            return (normal = normal + 1);
          }
        });

        // Find Average
        let allValues = [];
        sorted.map(item =>
          allValues.push(item.detail.measurements.oxygenMeasurements.percent),
        );
        let total = allValues.reduce((accu, curr) => {
          return accu + curr;
        }, 0);
        let average = total / sorted.length;

        setOxygens(
          finalTemp
            .sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt))
            .splice(0, 3),
        );
        setStatistics({ above, normal, below });
        setValues(valueInChro);
        setAverage(average);
        setHighest(sorted[0].detail.measurements.oxygenMeasurements.percent);
        setLowest(
          sorted[sorted.length - 1].detail.measurements.oxygenMeasurements
            .percent,
        );
      } else {
        setOxygens([]);
        setValues([{ x: 0, y: 0 }]);
        setStatistics({ above: 0, normal: 0, below: 0 });
        setLowest(0);
        setHighest(0);
        setAverage(0);
      }

      // Store default
      setDefaultOxygen({
        defaultLow: 90,
        defaultDangerous: 95,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error From MonitorOxygen', error);
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
          title="ออกซิเจน"
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
        title="ออกซิเจน"
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
              yDomain={{ min: 80, max: 100.0 }}
              xDomain={{ min: 0, max: values.length + 10 }}
              viewport={{ size: { width: 10 } }}
              data={values}
            >
              <VerticalAxis
                tickValues={[
                  defaultOxygen.defaultLow == 80 ? 0 : 80,
                  defaultOxygen.defaultLow,
                  defaultOxygen.defaultDangerous,
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
                    from: { color: '#E9FFF5', opacity: 1.0 },
                    to: { color: '#E9FFF5', opacity: 1.0 },
                  },
                }}
                smoothing="cubic-spline"
                data={[
                  { x: 0, y: 100 },
                  { x: values.length + 10, y: 100 },
                ]}
              />
              <Area
                theme={{
                  gradient: {
                    from: { color: '#FEF7E5', opacity: 1.0 },
                    to: { color: '#FEF7E5', opacity: 1.0 },
                  },
                }}
                smoothing="cubic-spline"
                data={[
                  { x: 0, y: defaultOxygen.defaultDangerous },
                  { x: values.length + 10, y: defaultOxygen.defaultDangerous },
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
                  { x: 0, y: defaultOxygen.defaultLow },
                  { x: values.length + 10, y: defaultOxygen.defaultLow },
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
                <Text style={styles.above}>ปกติดี</Text>
                <Text style={styles.above}>
                  <Text style={[styles.above, { fontSize: 16 }]}>
                    {statistics.above}{' '}
                  </Text>
                  ครั้ง
                </Text>
              </View>
              <View>
                <Text style={styles.normal}>เฝ้าระวังอาการ</Text>
                <Text style={styles.normal}>
                  <Text style={[styles.normal, { fontSize: 16 }]}>
                    {statistics.normal}{' '}
                  </Text>
                  ครั้ง
                </Text>
              </View>
              <View>
                <Text style={styles.below}>ต่ำกว่าปกติ</Text>
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
                  {lowest} <Text style={styles.tabMeasure}>%</Text>
                </Text>
              </View>
            </View>
            <View style={styles.boxContainerWithBorder}>
              <View>
                <Text style={styles.tabText}>ค่าสูงสุด</Text>
              </View>
              <View>
                <Text style={styles.tabValue}>
                  {highest} <Text style={styles.tabMeasure}>%</Text>
                </Text>
              </View>
            </View>
            <View style={styles.boxContainer}>
              <View>
                <Text style={styles.tabText}>ค่าเฉลี่ย</Text>
              </View>
              <View>
                <Text style={styles.tabValue}>
                  {average.toFixed(2)} <Text style={styles.tabMeasure}>%</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.listContainer}>
          <View style={styles.header}>
            <View style={styles.left}>
              <Image source={Images.oxygen} style={styles.image} />
              <Text style={styles.leftText}>บันทึกค่าออกซิเจน</Text>
            </View>
            <View style={styles.right}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.push('MonitorFullList', {
                    report: 'ออกซิเจน',
                  })
                }
              >
                <Text style={styles.rightText}>ดูทั้งหมด</Text>
              </TouchableOpacity>
            </View>
          </View>
          {oxygens.length > 0
            ? oxygens.map(item => (
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
            : null}
          <LinearGradient style={styles.add} colors={['#0A905F', '#095C3E']}>
            <TouchableOpacity
              underlayColor="grey"
              style={{ width: '100%', alignItems: 'center' }}
              disabled={false}
              onPress={() =>
                navigation.push('MonitorAddData', {
                  type: 'oxygen',
                  no: statistics.above + statistics.normal + statistics.below,
                  dangerous: 95,
                  low: 90,
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

export default connect(mapStateToProps, null)(MonitorOxygen);
