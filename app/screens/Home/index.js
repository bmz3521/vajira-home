import React, { Component } from 'react';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList,
  Alert,
  BackHandler,
  Dimensions,
  Linking,
  InteractionManager,
  ImageBackground,
  Modal,
  LogBox,
  Platform,
  Button,
  AppState,
  TouchableWithoutFeedback,
} from 'react-native';
import VersionCheck from 'react-native-version-check';
import { Text, Icon, SafeAreaView, Image } from '@components';
import {
  checkTimeHomePage,
  addTimeHomePage,
  setTimeHomePage,
  getListDrugNoti,
  getDateUpdatedDrugNoti,
  setDateUpdatedDrugNoti,
} from '@utils/asyncStorage';
import { manageDrugNotiIOS } from '@utils/manageDrugNoti';
import { BaseStyle, BaseColor, Images } from '@config';
import * as Utils from '@utils';
import styles from './styles';
import { useSelector } from 'react-redux';
import { store } from 'app/store';
import { connect } from 'react-redux';
import { AuthActions, UserActions } from '@actions';
import { bindActionCreators } from 'redux';
import RNBootSplash from 'react-native-bootsplash';
// import { UserData } from '@data';
// import UserAvatar from 'react-native-user-avatar';
// import ImgToBase64 from 'react-native-image-base64';
// import ImagePicker from 'react-native-image-picker';
// import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';
// import VajiraCard from '../../components/ImageCardComponent/vajira-card';
import moment from 'moment';
import config from '@_config';

// import database from '@react-native-firebase/database';
// import AmbulanceIcon from '@assets/images/ambulanceIcon.png';
import EMS from '@assets/images/ems.jpg';
import CallStatus from './CallStatus';
import PaymentButton from './PaymentButton';
import CarouselMenu from './components/CarouselMenu';
import { localNotificationService } from '../../LocalNotificationService';
import PushNotification from 'react-native-push-notification';

const { width, height } = Dimensions.get('window');

const SCREEN_WIDTH = width < height ? width : height;

class Home extends Component {
  firebaseRef;

  constructor(props) {
    super(props);
    this.state = {
      modalNoti: false,
      listNoti: [],
      callStatus: '',
      callingDoctorName: '',
      pharmacyCallStatus: '',
      calliingPharmacyName: '',
      imageProfile: Images.avata2,
      isLoading: true,
      surveyExist: true,
      surveyData: [],
      surveyCount: 0,
      pickups: [],
      pickupsLoading: false,
      iconsMany: [
        {
          icon: 'newspaper',
          name: 'ข่าวสุขภาพ',
          route: 'Post',
        },
        {
          icon: 'shield-alt',
          name: 'ข้อมูลสิทธิ',
          route: 'EmergencyBeacon',
        },
        {
          icon: 'ambulance',
          name: 'ฉุกเฉิน 1669',
          route: 'EmergencyBeacon',
        },
        {
          icon: 'prescription',
          name: 'ร้านยา',
          route: 'PharmacyList',
        },
      ],
      iconsTop: [
        {
          icon: Images.homepic1,
          name: 'ปรึกษาแพทย์',
          route: 'TeleSymptom',
          notAuthenticated: 'SignIn2',
        },
        {
          icon: Images.homepic2,
          name: 'สถานะรายการ',
          route: 'MyBookingsUI',
          notAuthenticated: 'SignIn2',
        },
        {
          icon: Images.homepic3,
          name: 'ประวัติสุขภาพ',
          route: 'PatientHIEBookingHistory',
          notAuthenticated: 'SignIn2',
        },
        {
          icon: Images.homepic4,
          name: 'สมุดบันทึก',
          route: 'HealthActivity',
          notAuthenticated: 'SignIn2',
        },
      ],
      heightHeader: Utils.heightHeader(),
      ids: [],
      news: [],
      renderMapView: false,
      region: {
        latitude: 13.78095,
        longitude: 100.5093,
        latitudeDelta: 0.006,
        longitudeDelta: 0.006,
      },
      verifiedModal: false,
    };
    this._deltaY = new Animated.Value(0);

    LogBox.ignoreLogs(['Module RNFetchBlob']);
    LogBox.ignoreLogs(['Require cycles']);
  }
  componentDidMount() {
    const { navigation } = this.props;
    if (Platform.OS === 'ios') {
      this.checkUpdateNeeded();
      AppState.addEventListener('change', this._handleAppState.bind(this));
    }
    this.getListDrugNotification();
    setDateUpdatedDrugNoti(moment().format());
    // called getDetails() to check payment statuses from HIE
    // This will create a red banner for unpaid items
    this.getDetails();

    this.focusListener = navigation.addListener('focus', async () => {
      // called getDetails() in focus
      if (this.props.user?.data?.userInformation) {
        this.getDetails();
      }

      if (this.props.auths?.data?.verifyId) {
        let time = await checkTimeHomePage();
        if (time === 10) {
          this.fetchSurveyForm();
          setTimeHomePage(0);
        } else {
          setTimeHomePage(time + 1);
        }
      }
    });
    RNBootSplash.hide({ duration: 250 });
    InteractionManager.runAfterInteractions(() => {
      this.setState({ renderMapView: true });
    });
    this.checkVerifyIdAndUpdateForUser();
  }

  async getListDrugNotification() {
    try {
      const options = {
        soundName: 'default',
        playSound: true,
      };
      const res = await getListDrugNoti();
      const result = manageDrugNotiIOS(res);
      localNotificationService.showNotification(
        0,
        '',
        '',
        null,
        options,
        result,
      );
    } catch (err) {
      console.log(err.message);
    }
  }

  async checkUpdateNeeded() {
    // console.log('checking Version...');
    try {
      let updateNeeded = await VersionCheck.needUpdate();

      // console.log('updateNeeded');
      // console.log(updateNeeded);

      if (updateNeeded.isNeeded) {
        //  console.log('launching alert to update version...');
        Alert.alert(
          'อัพเดตเวอร์ชั่นใหม่',
          'กรุณาอัพเดตแอปพลิเคชั่นเป็นเวอร์ชั่นล่าสุดเพื่อใช้งานต่อ',
          [
            {
              text: 'อัพเดต',
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL(updateNeeded.storeUrl);
              },
            },
          ],
          { cancelable: false },
        );
      }
    } catch (error) {}
  }

  async _handleAppState(appState) {
    // console.log('appState ===>', appState)
    if (appState !== 'active') {
      return;
    }
    const { date } = await getDateUpdatedDrugNoti();
    if (date && !moment(date).isSame(moment(), 'day')) {
      this.getListDrugNotification();
      setDateUpdatedDrugNoti(moment().format());
    } else if (!date) {
      this.getListDrugNotification();
      setDateUpdatedDrugNoti(moment().format());
    }
  }

  async checkVerifyIdAndUpdateForUser() {
    const auth = store.getState().auth || [];
    const user = store.getState().user || [];
    if (auth.isAuthenticated) {
      const userInfo = await this.fetchUserInfo(auth.data.userId);
      if (userInfo.verifyId !== auth.data.verifyId) {
        const newUserData = {
          ...user.data,
          userInformation: {
            ...userInfo,
          },
        };
        this.props.actions.loginSuccess(userInfo);
        this.props.userActions.getUserSuccess(newUserData);
      }
    }
  }

  async fetchUserInfo(userId) {
    try {
      const { data } = await axios.get(
        `${config.apiUrl}/UserInfos/userInfoByPatientId?patientId=${userId}`,
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') {
      AppState.removeEventListener('change', this._handleAppState.bind(this));
    }
    this.focusListener();
  }

  async fetchSurveyForm() {
    const { navigation } = this.props;
    const { userTele } = this.props;
    const { data } = await axios.get(
      `${config.apiUrl}/surveyForms?filter[where][surveyUserId]=${userTele.dataTele.userId}`,
    );
    let filterData = data.map(d => {
      const {
        ratingApp,
        waitingTimeApp,
        appointmentStatApp,
        transportCostApp,
        healCostApp,
        admitTimeApp,
        recommendApp,
      } = d.detail[0];
      if (data && data.length) {
        if (
          !ratingApp &&
          !waitingTimeApp &&
          !appointmentStatApp &&
          !transportCostApp &&
          !healCostApp &&
          !admitTimeApp
        ) {
          if (recommendApp) {
            return 'skip';
          } else {
            return false;
          }
        } else if (recommendApp) {
          return true;
        }
      } else {
        return false;
      }
    });
    let bottom = [];
    if (filterData.includes(true)) {
      bottom = [];
    } else if (filterData.includes('skip')) {
      bottom.push(
        {
          text: 'ตกลง',
          onPress: () => {
            navigation.navigate('PostSurvey', {
              bookingId: data.bookingId,
              userTeleId: userTele.dataTele.userId,
              skipStep: false,
            });
          },
        },
        {
          text: 'ข้าม',
          onPress: () => navigation.navigate('Home'),
        },
      );
    } else if (filterData.includes(false) || !filterData.length) {
      bottom.push(
        {
          text: 'ตกลง',
          onPress: () => {
            navigation.navigate('PostSurvey', {
              bookingId: data.bookingId,
              userTeleId: userTele.dataTele.userId,
              skipStep: false,
            });
          },
        },
        {
          text: 'ข้าม',
          onPress: () =>
            navigation.navigate('PostSurvey', {
              bookingId: data.bookingId,
              userTeleId: userTele.dataTele.userId,
              skipStep: true,
            }),
        },
      );
    }
    if (bottom.length) {
      const description =
        'ขอความร่วมมือท่านสักครู่ ในการทำแบบสอบถาม เพื่อพัฒนาและปรับปรุงแอปพลิเคชันให้ดียิ่งขึ้น';
      Alert.alert('ขอความร่วมมือ', description || '', bottom, {
        cancelable: false,
      });
    }
  }

  checkIfVerify() {
    const { auths, navigation } = this.props;

    //  console.log('Verify triggered...');
    //  console.log(auths?.data?.verifyId);
    //  console.log(auths?.data?.firstname);

    if (auths?.data?.verifyId) {
      navigation.navigate('ChatbotLanding');
    } else {
      this.setState({ verifiedModal: true });
    }
  }

  async fetchEverNews() {
    const { data } = await axios.get(
      'https://news-backend.everapp.io/ever-news',
    );
    if (data) {
      this.setState({
        news: data,
      });
    }
  }

  async getDetails() {
    const { auths } = this.props;

    console.log('Get Details');
    console.log(auths.data);
    console.log(auths.data.cId);

    const getPaymentStatus = async vn => {
      try {
        const { data } = await axios.get(
          `${config.apiUrl}/userInfoHies/getByCid?cid=${auths.data.cId}`,
        );

        const found = data.find(item => item.vn === parseInt(vn));

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

    try {
      const { data } = await axios.get(
        `${config.VA_API_URL}/PrescriptionPickups?filter[where][userId]=${auths.data.userId}`,
      );

      // filter items with drugItems whether user already receives drugs
      let filtered = data.filter(
        item => item.received !== true && item.drugItems !== null,
      );
      console.log('filtered with drugs');
      console.log(filtered);

      // filter items without drugItems - doctor finished the session
      // without prescribing any drugs
      const filteredNoDrug = data.filter(item => item.drugItems === null);
      console.log('filtered No Drug');
      console.log(filteredNoDrug);

      async function checkStatus(id) {
        // const ACCESS_TOKEN = await getAccessToken();
        try {
          const { data } = await axios.get(
            `${config.VA_API_URL}/prescriptions/${id}`,
          );
          if (data.paymentStatus === 'PATIENT_SUCCESS_PAYMENT') {
            // do nothing
            return;
          } else {
            // update paymentStatus to 'PATIENT_SUCCESS_PAYMENT'
            return await changeStatus(id);
          }
        } catch (error) {
          console.log('error fetching status...', error);
        }
      }

      async function changeStatus(id) {
        try {
          const { data } = await axios.patch(
            `${config.VA_API_URL}/prescriptions/${id}`,
            {
              paymentStatus: 'PATIENT_SUCCESS_PAYMENT',
            },
          );

          console.log('successful data patching of prescription id: ', id);
          console.log(data);

          return;
        } catch (error) {
          console.log('error patching paymentStatus...', error);
        }
      }

      if (filteredNoDrug !== null && filteredNoDrug.length > 0) {
        this.setState({ pickupsLoading: true });

        for (let i = 0; i < filteredNoDrug.length; i++) {
          // Check latest payment status from HIE using vn
          const result = await getPaymentStatus(filteredNoDrug[i].vnNumber);

          console.log('vn:', filteredNoDrug[i].vnNumber, result);

          if (result === 'ยังไม่ชำระเงิน' || result === 'ชำระเงินบางส่วน') {
            // generate a not-paid blue banner
            filtered.push(filteredNoDrug[i]);
          } else if (result === 'ชำระเงินแล้ว') {
            // check and change payment status in our db so that
            // web devs will know that item is paid
            await checkStatus(filteredNoDrug[i].prescriptionId);
          }
        }

        console.log(
          'filtered including items with drugs (not received) and unpaid items w/o drugs...',
        );
        console.log(filtered);

        this.setState({ pickupsLoading: false });

        this.setState({
          pickups: filtered,
        });
      } else {
        this.setState({
          pickups: filtered,
        });
      }
    } catch (error) {
      console.log('error fetching pick-up details...', error);
    }
  }

  routeAuth = async icon => {
    const { navigation, user, auths, userTele } = this.props;
    const auth = store.getState().auth || [];
    if (auth.isAuthenticated) {
      navigation.navigate(icon.route);
    }
  };

  renderIconManyService() {
    const { navigation } = this.props;
    const { iconsMany } = this.state;
    return (
      <FlatList
        data={iconsMany}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.itemServiceMany}
              activeOpacity={0.9}
              onPress={() => {
                // navigation.navigate(item.route);
              }}
            >
              <View style={styles.iconContentMany}>
                <Icon name={item.icon} size={24} color={'#7d7d7d'} solid />
              </View>
              <Text footnote grayColor>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  }

  render() {
    const auth = store.getState().auth || [];
    const { auths, user, userTele } = this.props;
    const { navigation } = this.props;
    const { packages, clinics, heightHeader } = this.state;
    const heightImageBanner = Utils.scaleWithPixel(140);
    const marginTopBanner = heightImageBanner - heightHeader;
    const renderIconTop = () => {
      const { navigation } = this.props;
      const auth = store.getState().auth || [];
      return this.state.iconsTop.map((icon, i) => {
        return (
          <TouchableOpacity
            key={i}
            // style={{ alignItems: "center" }}
            activeOpacity={0.9}
            onPress={() => this.routeAuth(icon)}
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
        );
      });
    };

    const renderNews = () => {
      const { navigation } = this.props;

      return this.state.news.slice(0, 4).map((item, i) => {
        return (
          <TouchableOpacity
            key={i}
            // style={{ alignItems: "center" }}
            activeOpacity={0.9}
            onPress={() =>
              navigation.navigate('NewsDetail', {
                detail: item,
              })
            }
            style={styles.newsCards}
          >
            <View
              style={[
                styles.contentServiceIcon,
                { marginLeft: i == 0 ? 20 : 0 },
              ]}
            >
              <Image
                source={{
                  uri: `https://news-backend.everapp.io${item.picture.url}`,
                }}
                style={styles.newsImage}
              />
              <Text
                style={{
                  color: 'black',
                  flexDirection: 'row',
                  flex: 1,
                  flexWrap: 'wrap',
                  flexShrink: 1,
                  width: 150,
                }}
                caption1
              >
                {item.header}
              </Text>
            </View>
          </TouchableOpacity>
        );
      });
    };

    let currentTime = moment();
    const getGreetingTime = currentTime => {
      if (!currentTime || !currentTime.isValid()) {
        return 'Hello';
      }

      const splitMorningMeal = 12;
      const splitAfternoonMeal = 12;
      const splitAfternoon = 12;
      const splitEvening = 17; // 24hr time to split the evening
      const currentHour = parseFloat(currentTime.format('HH'));

      if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
        // Between 12 PM and 5PM
        return 'สวัสดี';
      } else if (currentHour >= splitEvening) {
        // Between 5PM and Midnight
        return 'สวัสดีตอนเย็น';
      }
      // Between dawn and noon
      return 'อรุณสวัสดิ์';
    };
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Animated.Image
          // source={Images.topSplash}
          style={[
            styles.imageBackground,
            {
              height: this._deltaY.interpolate({
                inputRange: [
                  0,
                  Utils.scaleWithPixel(100),
                  Utils.scaleWithPixel(100),
                ],
                outputRange: [heightImageBanner, heightHeader, 0],
              }),
            },
          ]}
        />
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{ top: 'always' }}
        >
          {/* <Modal visible={this.state.modalNoti} transparent>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={{ height: 500, backgroundColor: 'white', width: '90%' }}
              >
                <ScrollView
                  contentContainerStyle={{ backgroundColor: 'white' }}
                >
                  {this.state.listNoti.length > 0 ? (
                    this.state.listNoti.map((item, index) => (
                      <View style={{ alignSelf: 'center', marginVertical: 10 }}>
                        <Text key={index}>
                          {moment(item.date).format('llll')}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text>ไม่มีรายการ Notification</Text>
                  )}
                </ScrollView>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setState({
                      modalNoti: false,
                    });
                  }}
                >
                  <View>
                    <Text>Close</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </Modal>
          <Button
            title="ดู Noti ทั้งหมด"
            onPress={() => {
              PushNotification.getScheduledLocalNotifications(call => {
                this.setState({
                  listNoti: call.sort((a, b) => a.date - b.date),
                  modalNoti: true,
                });
              });
            }}
          /> */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { y: this._deltaY },
                  },
                },
              ],
              { useNativeDriver: false },
            )}
            onContentSizeChange={() =>
              this.setState({
                heightHeader: Utils.heightHeader(),
              })
            }
            scrollEventThrottle={8}
          >
            {!auth.isAuthenticated ? (
              <LinearGradient
                colors={['#0DA36D', '#0A7C53', '#086C48']}
                style={styles.linearGradient}
              >
                <View style={{ marginRight: 10 }}>
                  <TouchableOpacity>
                    <Image source={Images.avata1} style={styles.thumb} />
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 2, justifyContent: 'flex-start' }}>
                  <Text style={{ fontSize: 14, color: '#fff' }}>
                    ยินดีต้อนรับ
                  </Text>
                  <Text bold style={{ fontSize: 20, color: '#fff' }}>
                    VAJIRA@HOME
                  </Text>
                  <View style={{ flex: 1, flexDirection: 'row', height: 20 }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('SignIn2')}
                    >
                      <View>
                        <Text
                          style={{
                            fontSize: 14,
                            color: 'yellow',
                          }}
                        >
                          กรุณาเข้าสู่ระบบ{' '}
                          <Icon
                            name="chevron-right"
                            size={14}
                            style={{ color: 'yellow' }}
                          />
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            ) : (
              <LinearGradient
                colors={['#0DA36D', '#0A7C53', '#086C48']}
                style={styles.linearGradient}
              >
                <View style={{ marginRight: 10 }}>
                  <TouchableOpacity>
                    <Image source={Images.avata1} style={styles.thumb} />
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 2, justifyContent: 'flex-start' }}>
                  <Text bold style={{ fontSize: 20, color: '#fff' }}>
                    {getGreetingTime(currentTime)}
                  </Text>
                  <Text style={{ fontSize: 16, color: 'yellow' }}>
                    {user.data && user.data.userInformation.firstname}
                  </Text>
                </View>
                <View style={{ marginRight: 15 }}>
                  {user?.data?.HIEimage ? (
                    <Image
                      style={styles.thumb}
                      source={{
                        uri: `data:image/png;base64,${user?.data?.HIEimage}`,
                      }}
                    />
                  ) : (
                    <Image
                      style={styles.thumb}
                      source={this.state.imageProfile}
                    />
                  )}
                </View>
              </LinearGradient>
            )}
            {!auth.isAuthenticated ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('SignIn2')}
              ></TouchableOpacity>
            ) : (
              <View />
            )}
            <View
              style={{
                alignContent: 'center',
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'center',
              }}
            ></View>

            {auths?.data?.verifyId &&
              this.state.pickups.length > 0 &&
              this.state.pickups.map(item => (
                <PaymentButton
                  key={item.id}
                  pickupItem={item}
                  navigation={navigation}
                />
              ))}

            {auths?.data?.verifyId && (
              <CallStatus
                navigation={navigation}
                user={this.props.user}
                userTele={this.props.userTele}
                auth={store.getState().auth}
              />
            )}

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              {renderIconTop()}
            </View>
            {/** NOTE This is a carousal menu */}
            <CarouselMenu
              user={this.props.user}
              navigation={this.props.navigation}
              routeAuth={this.routeAuth.bind(this)}
              checkIfVerify={this.checkIfVerify.bind(this)}
            />
            {/* {auths?.data?.verifyId && (
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('EmergencyBeacon')}
                >
                  <FastImage
                    source={EMS}
                    style={{ width: SCREEN_WIDTH, height: 180 }}
                  />
                </TouchableOpacity>
              </View>
            )} */}

            <Text bold style={styles.justHeader} caption1>
              ข้อมูลเกี่ยวกับโรงพยาบาล
            </Text>

            {this.state.renderMapView && (
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={this.state.region}
                onRegionChangeComplete={region => this.setState({ region })}
              >
                <Marker
                  coordinate={{ latitude: 13.78095, longitude: 100.5093 }}
                  pinColor="#0D784F"
                />
              </MapView>
            )}

            <View style={styles.locationContainer}>
              <Icon name="map-marker-alt" size={14} />
              <Text
                caption1
                style={{ color: '#000', fontSize: 14, paddingLeft: 5 }}
              >
                681 ถนนสามเสน แขวงวชิรพยาบาล เขตดุสิต กรุงเทพมหานคร 10300
              </Text>
            </View>
            <View style={styles.locationContainer}>
              <Icon name="clock" size={14} />
              <Text
                caption1
                style={{ color: '#000', fontSize: 14, paddingLeft: 5 }}
              >
                จันทร์ - ศุกร์ เวลา 06:00 - 16:00 น.
              </Text>
            </View>
            <View style={styles.locationContainer}>
              <Icon name="phone" size={14} />
              <Text
                caption1
                style={{ color: '#000', fontSize: 14, paddingLeft: 5 }}
              >
                02 244 3000
              </Text>
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.verifiedModal}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalTitle}>
                    คุณยังไม่ได้รับการยืนยันตัวตน
                  </Text>

                  <View style={styles.modalButtonContainer}>
                    <LinearGradient
                      style={[styles.add, { marginBottom: 5 }]}
                      colors={['#0A905F', '#095C3E']}
                    >
                      <TouchableOpacity
                        style={{ width: '100%', alignItems: 'center' }}
                        disabled={false}
                        onPress={() => {
                          this.setState({ verifiedModal: false });
                        }}
                      >
                        <Text style={styles.buttonTextAdd}>ตกลง</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
              </View>
            </Modal>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    auths: state.auth,
    user: state.user,
    userTele: state.userTele,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
