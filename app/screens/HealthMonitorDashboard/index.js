import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { useSelector, connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BaseStyle, BaseColor } from '@config';
import { Header, SafeAreaView, Icon, Text, BookingTab } from '@components';
import { BookingsActions } from '@actions';
import styles from './styles';
import { useHooks } from './hooks';
import axios from 'axios';
import config from '@_config';
import booking from '../../api/booking';
import { useIsFocused } from '@react-navigation/native';

const routes = [
  { key: 'upcoming', title: 'ทั้งหมด' },
  { key: 'ongoing', title: 'เวชกรรม' },
  { key: 'admitted', title: 'โทรเวชกรรม' },
  // { key: 'reviewed', title: 'Reviewed' },
];

const _renderTabBar = () => props => (
  <TabBar
    {...props}
    scrollEnabled
    indicatorStyle={styles.indicator}
    style={styles.tabbar}
    tabStyle={styles.tab}
    inactiveColor={BaseColor.grayColor}
    activeColor={BaseColor.textPrimaryColor}
    renderLabel={({ route, focused, color }) => (
      <View style={{ flex: 1, width: 100, alignItems: 'center' }}>
        <Text headline semibold={focused} style={{ color }}>
          {route.title}
        </Text>
      </View>
    )}
  />
);

// Render correct screen container when tab is activated
const _renderScene = (navigation, bookings, userTele, user = []) => ({
  route,
  jumpTo,
}) => {
  switch (route.key) {
    case 'first':
      return <BloodGlucose foo={this.props.foo} />;
    case 'second':
      return <BloodPressure />;
    default:
      return null;
  }
};

function BloodGlucose(props) {
  return <View />;
}

function BloodPressure(props) {
  return <View />;
}

function HealthMonitorDashboard(props) {
  const { bookings, navigation, userTele, auth, user } = props;
  const { index, ready, events } = useHooks(props);
  const [symptom, setSymptom] = useState('');

  const telemedicine = useSelector(state => state.telemedicine);
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

  //  console.log('Tele user');
  // console.log(userTele);

  // console.log("OMA user")
  // console.log(user);

  // const info = (user && user.data && user.data.userInformation) || {
  // 	img: null,
  // 	firstname: 'anonymous',
  // 	lastname: '',
  // 	userId: '',
  // 	id: '',
  // 	cId: '',
  // 	email: '',
  // };

  // console.log(info)

  var userId;
  if (userTele.dataTele !== null) {
    userId = userTele.dataTele.userId;
  } else {
    userId = 0;
  }

  // console.log('user-------------');
  //  console.log(userId);

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchUpdate = async () => {
      const response = await axios(
        `${config.VA_API_URL}/Bookings/filterByPatientId?patientId=${userId}`,
      );
      await setData(response.data);
    };
    fetchUpdate();
  }, [isFocused]);

  const refresher = async () => {
    //  console.log('call refresher');
    const response = await axios(
      `${config.VA_API_URL}/Bookings/filterByPatientId?patientId=${userId}`,
    );
    await setData(response.data);
  };

  //  console.log('databooking');
  // console.log(dataBooking);

  var finalData = dataBooking.map(userTele => ({
    bookingDay: userTele.admitTime,
    bookingTime: userTele.bookingTime,
    doctor: userTele.doctor,
    doctorId: userTele.doctorId,
    status: userTele.status,
    bookingId: userTele.id,
    prescriptionId: userTele.prescriptionId,
  }));

  //  console.log('finalDataaaaa');
  //  console.log(finalData);

  // const onApply = result => {
  // 	const data = {
  // 		symptom: result,
  // 	};
  // 	console.log('reeeeeeee')
  // 	console.log(result)

  // 	dispatch(TelemedicineActions.setTelemedicine(data));
  // 	navigation.navigate('MyBookingActivity', { day: result.bookingDay, time: result.bookingTime, doctorId: result.doctorId, doctor: result.doctor, status: result.status, bookingId: result.bookingId, prescriptionId: result.prescriptionId });
  // };

  // if (bookings.error) {
  // 	return <Text>Fetch booking is failed: {bookings.error.message}</Text>;
  // }

  // if (!ready || bookings.loading) {
  // 	return <Text>Loading</Text>;
  // }

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="การแพทย์ทางไกล"
        renderLeft={() => {
          return (
            <Icon
              name="chevron-left"
              size={20}
              color={BaseColor.primaryColor}
            />
          );
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
            <Text
              style={{
                fontSize: 24,
                fontWeight: '500',
              }}
            >
              คุณยังไม่มีรายการ
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginTop: 5,
              }}
            >
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
              backgroundColor: '#284F30',
              width: '30%',
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
              ล๊อกอิน
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
          <Header
            title=""
            // renderLeft={() => {
            //   return (
            //     <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
            //   );
            // }}
            onPressLeft={() => {
              navigation.goBack();
            }}
          />

          <TabView
            lazy
            navigationState={{
              index,
              routes,
            }}
            renderScene={_renderScene(navigation, finalData)}
            renderTabBar={_renderTabBar()}
            onIndexChange={events.setIndex()}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    bookings: state.bookings,
    auth: state.auth,
    userTele: state.userTele,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(BookingsActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HealthMonitorDashboard);
