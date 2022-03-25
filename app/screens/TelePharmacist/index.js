import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TabView, TabBar } from 'react-native-tab-view';
import _, { indexOf } from 'lodash';
import {
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { Header, SafeAreaView, Icon, EventCard, Text } from '@components';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

import BookingPharmacy from './components/BookingPharmacy';

import { BaseStyle, BaseColor, Images } from '@config';
import styles from './styles';

import { FlatList } from 'react-native-gesture-handler';
import { TelemedicineActions } from '@actions';
import Specialisation from './routes/Specialisation';
import config from '@_config';
import moment from 'moment';
import { useHooks } from './hooks';

const routes = [
  { key: 'pending', title: 'ยังไม่ชำระ' },
  { key: 'toReceive', title: 'ที่ต้องได้รับ' },
  { key: 'received', title: 'สำเร็จ' },
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

// Render correct screen container when tab is activated
const _renderScene = (navigation, bookings, loading, userTele, user = []) => ({
  route,
  jumpTo,
}) => {
  const filter = [];
  let bookingAll;
  switch (route.key) {
    case 'pending':
      bookingAll = bookings.filter(
        booking =>
          booking.prescription.paymentStatus === 'PATIENT_PENDING_PAYMENT',
      );
      break;
    case 'toReceive':
      bookingAll = bookings.filter(
        booking =>
          booking.prescription.status === 'WAIT_FOR_PATIENT_EMS' ||
          booking.prescription.status === 'WAIT_FOR_PATIENT_PHAMACYSTORE',
      );
      break;
    case 'received':
      bookingAll = bookings.filter(
        booking =>
          booking.prescription.status === 'SUCCESS_BY_EMS' ||
          booking.prescription.status === 'SUCCESS_BY_PHARMACYSTORE',
      );
      break;
  }

  return loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <View style={{ marginTop: 60 }}>
        <ActivityIndicator size="large" color="#76C8AA" />
      </View>
    </View>
  ) : (
    <BookingPharmacy
      jumpTo={jumpTo}
      navigation={navigation}
      bookings={bookingAll}
    />
  );
};

function TelePharmacist(props) {
  const { telePharmacist, navigation, route } = props;
  const [pharmacies, setPharmacy] = useState();
  const [pharmacyStore, setStoreData] = useState();
  const [searchText, setSearchText] = useState('');
  const userTele = useSelector(state => state.userTele);
  const auths = useSelector(state => state.auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pharId, setPharId] = useState();
  const dispatch = useDispatch();
  const { index, ready, events } = useHooks(props);

  const [iconsTop, setIcon] = useState([
    {
      icon: Images.delivery1,
      image: 'delivery1',
      name: 'รับยาทางไปรษณีย์',
      route: 'DeliveryOptions',
      notAuthenticated: 'PharmacyList',
    },
    {
      icon: Images.delivery2,
      image: 'delivery2',
      name: 'รับยาที่ร้านยาใกล้บ้าน',
      route: 'DeliveryOptions',
      notAuthenticated: 'PharmacyList',
    },
    {
      icon: Images.delivery3,
      image: 'delivery3',
      name: 'รับยาที่โรงพยาบาล',
      route: 'DeliveryOptions',
      notAuthenticated: 'PharmacyList',
    },
  ]);

  const bookingId = route.params ?? 0;
  const prescriptionId = route.params ?? 0;

  const http = new easyHTTP();

  function easyHTTP() {
    this.http = new XMLHttpRequest();
  }

  useEffect(() => {
    fetchPharmacyStore();
    fetchPrescription();
  }, []);

  const fetchPrescription = async () => {
    setLoading(true);
    let filterData = null;

    try {
      const { data } = await axios.get(
        `${config.VA_API_URL}/Bookings?filter[include]=prescription&filter[where][patientId]=${userTele.dataTele.userId}`,
      );

      filterData = data.filter(
        x =>
          x.vnNumber &&
          x.prescription &&
          x.prescription.status !== 'DRAFT_PRESCRIPTION' &&
          x.prescription.status !== 'PHARMACY_PENDING_RX',
      );

      console.log('DATA', data);
    } catch (error) {
      console.log('error getting booking data', error);
    }

    // Check payment status

    const getPaymentStatus = async vn => {
      try {
        const { data } = await axios.get(
          `${config.apiUrl}/userInfoHies/getByCid?cid=${auths.data.cId}`,
        );

        console.log('Before finding...');
        const found = data.find(item => item.vn === parseInt(vn));

        // console.log('data from userInfoHies');
        // console.log(data);
        // console.log('vn');
        // console.log(vn);
        // console.log(auths.data.cId);

        let statusPayment = '';
        const paidStatus = ['ชำระเงินแล้ว', 'ปิดบัญชี'];
        const unPaidStatus = ['ยังไม่ชำระเงิน'];

        if (found?.payments) {
          const checkPaid = found.payments.every(
            pm =>
              paidStatus.includes(pm.paidstName) ||
              (pm.itemno && pm.itemno === -1 && pm.incamt === 0),
          );
          const checkUnPaid = found.payments.every(
            pm =>
              unPaidStatus.includes(pm.paidstName) ||
              (pm.itemno && pm.itemno !== -1 && pm.incamt !== 0),
          );
          statusPayment = checkPaid
            ? 'ชำระเงินแล้ว'
            : checkUnPaid
            ? 'ยังไม่ชำระเงิน'
            : 'ชำระเงินบางส่วน';
        } else {
          statusPayment = 'ไม่พบรายการ payments';
        }

        return statusPayment;
      } catch (error) {
        console.log('error !!!', error);
      }
    };

    async function checkStatus(id, localPrescription) {
      // const ACCESS_TOKEN = await getAccessToken();
      try {
        const { data } = await axios.get(
          `${config.VA_API_URL}/prescriptions/${id}`,
        );
        if (data.paymentStatus === 'PATIENT_SUCCESS_PAYMENT') {
          // return unchanged state
          return localPrescription;
        } else {
          // update paymentStatus to 'PATIENT_SUCCESS_PAYMENT'
          return await changeStatus(id, localPrescription);
        }
      } catch (error) {
        console.log('error fetching status...', error);
        return localPrescription;
      }
    }

    async function changeStatus(id, localPrescription) {
      try {
        const { data } = await axios.patch(
          `${config.VA_API_URL}/prescriptions/${id}`,
          {
            paymentStatus: 'PATIENT_SUCCESS_PAYMENT',
          },
        );

        console.log('successful data patching of prescription id: ', id);
        console.log(data);

        // return the new paymentStatus to the local state
        return data;
      } catch (error) {
        console.log('error patching paymentStatus...', error);
        return localPrescription;
      }
    }

    // console.log('filterData....');
    // console.log(filterData);

    if (filterData !== null && filterData.length > 0) {
      for (let i = 0; i < filterData.length; i++) {
        // the field vn was created later in development
        // so, older bookings won't have it
        if (filterData[i].vn !== null) {
          // Check latest payment status from HIE using vn
          const result = await getPaymentStatus(filterData[i].vn);

          console.log('vn:', filterData[i].vn, result);

          // For testing

          // if (filterData[i].vn === "640640568"){
          //   const updated = await checkStatus(
          //     filterData[i].prescriptionId,
          //     filterData[i].prescription,
          //   );

          //   // update the new status in local object
          //   filterData[i].prescription = updated;
          // }

          if (result === 'ยังไม่ชำระเงิน' || result === 'ชำระเงินบางส่วน') {
            // leave the paymentStatus in prescription
            // in the booking local object unchanged
            console.log('No change');
          } else if (result === 'ชำระเงินแล้ว') {
            // check and change payment status in our db so that
            // web devs will know that item is paid
            const updated = await checkStatus(
              filterData[i].prescriptionId,
              filterData[i].prescription,
            );

            // update the new status in local object
            filterData[i].prescription = updated;
          }
        }
      }

      console.log('After checking and updating statuses...');
      console.log(filterData);

      setBookings(filterData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  const fetchPharmacyStore = async () => {
    const { data } = await axios.get(`${config.VA_API_URL}/pharmacyStoreInfos`);
    setStoreData(data);
  };

  const checkColor = status => {
    if (status.includes('PENDING') || status.includes('WAIT')) {
      return 'orange';
    } else if (status.includes('SUCCESS')) {
      return 'green';
    } else {
      return 'blue';
    }
  };

  const onClick = pop => {
    var x = pop;

    navigation.navigate('PharmacyAppointment', {
      bookingId: bookingId,
      prescriptionId: prescriptionId,
      pharmacyId: x,
    });
  };

  const renderIconTop = () => {
    const { navigation } = props;
    return (
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {iconsTop.map((icon, i) => (
            <TouchableOpacity
              key={i}
              // style={{ alignItems: "center" }}
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate(icon.route, {
                  name: icon.name,
                  image: icon.image,
                })
              }
              style={styles.iconTopParent}
            >
              <ImageBackground
                source={icon.icon}
                style={styles.mainIconContainer}
              >
                <LinearGradient
                  colors={['#76C8AA', '#0A7C53', '#086C48']}
                  style={styles.mainGradient}
                >
                  <Text style={styles.mainTextContainer}>{icon.name}</Text>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="ติดตามยา"
        textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      {renderIconTop()}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ padding: 20 }}>
          <TabView
            lazy
            navigationState={{ index, routes }}
            renderScene={_renderScene(navigation, bookings, loading)}
            renderTabBar={_renderTabBar(index)}
            onIndexChange={events.setIndex()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TelePharmacist;
