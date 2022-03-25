import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { TabView, TabBar } from 'react-native-tab-view';
import { useSelector, connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BaseStyle, BaseColor } from '@config';
import { Header, SafeAreaView, Icon, Text, BookingTab } from '@components';
import { BookingsActions } from '@actions';
import config from '@_config';
import styles from './styles';
import axios from 'axios';
import { setTracking } from '@utils/asyncStorage';
import moment from 'moment';
import Loading from '@components/Loading';

const routes = [
  { key: 'today', title: 'วันนี้' },
  { key: 'all', title: 'ทั้งหมด' },
  { key: 'past', title: 'ที่ผ่านมา' },
];

const _renderTabBar = tabBorder => props => (
  <TabBar
    {...props}
    scrollEnabled
    indicatorStyle={{
      backgroundColor: '#09B678',
      height: '100%',
      borderTopLeftRadius: tabBorder === 0 ? 12 : 0,
      borderBottomLeftRadius: tabBorder === 0 ? 12 : 0,
      borderTopRightRadius: tabBorder === 2 ? 12 : 0,
      borderBottomRightRadius: tabBorder === 2 ? 12 : 0,
    }}
    style={styles.tabbar}
    tabStyle={styles.tab}
    inactiveColor="#000"
    activeColor="#fff"
    renderLabel={({ route, focused, color }) => (
      <View>
        <Text bold headline semibold={focused} style={{ color }}>
          {route.title}
        </Text>
      </View>
    )}
  />
);

const nowTime = moment().format('YYYY-MM-DD');

// Render correct screen container when tab is activated
const _renderScene = (navigation, bookings, userTele, user = []) => ({
  route,
  jumpTo,
}) => {
  const filter = [];
  let bookingAll;
  switch (route.key) {
    case 'today':
      bookingAll = bookings?.filter(
        booking =>
          moment(booking.bookingDay).format('YYYY-MM-DD') ===
            moment().format('YYYY-MM-DD') &&
          booking?.status !== 'DOCTOR_COMPLETED' &&
          booking?.status !== 'PHARMACY_COMPLETED' &&
          booking?.status !== 'STAFF_CONFIRM',
      );
      break;
    case 'past':
      bookingAll = bookings?.filter(
        booking =>
          booking?.status === 'DOCTOR_COMPLETED' ||
          (booking?.status === 'PHARMACY_COMPLETED' &&
            booking?.status !== 'STAFF_CONFIRM'),
      );
      break;
    case 'all':
      bookingAll = bookings?.sort((a, b) => {
        let dateA = `${moment(a?.bookingDay).format('DD-MM-YYYY')} ${moment()
          .startOf('isoWeek')
          .add(a?.bookingTime, 'minutes')
          .format('HH:mm:ss')}`;
        let dateB = `${moment(b?.bookingDay).format('DD-MM-YYYY')} ${moment()
          .startOf('isoWeek')
          .add(b?.bookingTime, 'minutes')
          .format('HH:mm:ss')}`;
        return new Date(dateB) - new Date(dateA);
      });
      break;
  }

  return (
    <BookingTab jumpTo={jumpTo} navigation={navigation} bookings={bookingAll} />
  );
};

function MyBookingsUI(props) {
  const { bookings, navigation, userTele, auth, user } = props;
  const [index, setIndex] = useState(0);
  const [symptom, setSymptom] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(userTele?.dataTele?.userId);
  const isFocused = useIsFocused();

  const telemedicine = useSelector(state => state?.telemedicine);
  const [dataBooking, setData] = useState([]);

  const dispatch = useDispatch();

  function easyHTTP() {
    this.http = new XMLHttpRequest();
  }

  const http = new easyHTTP();

  // Make an HTTP POST Request
  easyHTTP.prototype.post = function(url, data, callback) {
    this.http.open('POST', url, true);
    this.http.setRequestHeader('Content-type', 'application/json');

    let self = this;
    this.http.onload = function() {
      callback(null, self.http.responseText);
    };

    this.http.send(JSON.stringify(data));
  };

  useEffect(() => {
    (async () => await setTracking('bookingStatusCount'))();
  }, []);

  useEffect(() => {
    if (auth?.isAuthenticated) fetchUpdate();
  }, [isFocused]);

  const fetchUpdate = async () => {
    setLoading(true);
    const response = await axios(
      `${config.VA_API_URL}/Bookings/filterByPatientId?patientId=${userId}`,
    );
    await setData(response.data);
    setLoading(false);
  };

  //  console.log('dataBooking from MyBookingsUI');
  //  console.log(dataBooking);

  var finalData = dataBooking.map(userTele => ({
    bookingDay: userTele?.admitTime,
    bookingTime: userTele?.bookingTime,
    bookingEndTime: userTele?.bookingEndTime,
    doctor: userTele?.doctor,
    doctorId: userTele?.doctorId,
    otherType: userTele?.doctor?.roles[0]?.name,
    otherTypeName: userTele?.doctor?.roles[0]?.description,
    status: userTele?.status,
    bookingId: userTele?.id,
    prescriptionId: userTele?.prescriptionId,
  }));
  return (
    <SafeAreaView
      style={BaseStyle?.safeAreaView}
      forceInset={{ top: 'always' }}
    >
      <Header
        title="สถานะรายการ"
        textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      {!auth.isAuthenticated ? (
        <View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#cccccc',
              marginHorizontal: 20,
            }}
          />
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: '500' }}>
              คุณยังไม่มีรายการ
            </Text>
            <Text style={{ fontSize: 18, marginTop: 5 }}>
              คุณสามารถใช้หน้าต่างนี้ในการดูข้อมูลประวัติการใช้งานระบบ Vajira @
              Home ทั้งหมด
            </Text>
          </View>
          <TouchableOpacity
            full
            style={{
              marginHorizontal: 20,
              marginTop: 20,
              borderRadius: 5,
              backgroundColor: '#0A7C53',
              width: '40%',
              paddingHorizontal: 20,
              paddingVertical: 15,
            }}
            onPress={() => navigation.navigate('SignIn2')}
          >
            <Text
              bold
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: '#FFFFFF',
              }}
            >
              ลงชื่อใช้งาน
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
        >
          <Loading isVisible={loading} />
          <TabView
            lazy
            navigationState={{ index, routes }}
            renderScene={_renderScene(navigation, finalData)}
            renderTabBar={_renderTabBar(index)}
            onIndexChange={num => {
              fetchUpdate();
              setIndex(num);
            }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    bookings: state?.bookings,
    auth: state?.auth,
    userTele: state?.userTele,
    user: state?.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(BookingsActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBookingsUI);
