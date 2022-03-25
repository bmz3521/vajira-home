import React, { Fragment, Component } from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  Animated,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
  TouchableHighlight,
  Text,
  ActivityIndicator,
  Button,
  TextInput,
  Modal,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { BaseStyle, BaseColor, Images } from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  PlaceItem,
  FilterSort,
  CardList,
  Image,
} from '@components';
import styles from './styles';
import * as yup from 'yup';
import { Field, Form, Formik, FormikProps } from 'formik';
import stylesCard, {
  Card,
  ProfileImage,
  LeftCard,
  Tag,
  TagText,
} from './styleCard';

import * as Utils from '@utils';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

// Load sample data
import { PlaceListData } from '@data';
import Geolocation from 'react-native-geolocation-service';
import database from '@react-native-firebase/database';

import LocationIcon from '@assets/images/bookingicon1.png';
import AmbulanceIcon from '@assets/images/ambulanceIcon.png';

class EmergencyBeacon extends Component {
  constructor(props) {
    super(props);
    // this.map = React.createRef();
    // this.map.current = [];

    this.state = {
      ambulanceStatus: 'completed',
      numberFromFireBase: '',
      modalVisible: false,
      landmark: '',
      inputNumber: '',
      inputPatientName: '',
      pageState: 0,
      loading: true,
      region: {
        latitude: 13.736717,
        longitude: 100.523186,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      isMapReady: false,
      marginTop: 1,
      userLocation: [],
      userLocationLat: 0,
      userLocationLng: 0,
      regionChangeProgress: false,
    };
  }

  hasLocationPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          { text: 'Go to Settings', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => {} },
        ],
      );
    }

    return false;
  };

  hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await this.hasLocationPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  async componentDidMount() {
    const { userTele } = this.props;
    const userTeleId =
      userTele && userTele.dataTele && userTele.dataTele.userId;
    // console.log('userTeleId');
    // console.log(userTeleId);
    // console.log('call');
    const hasLocationPermission = await this.hasLocationPermission();
    console.log(hasLocationPermission);
    console.log(
      'this.props.authsthis. ******  === ',
      this.props.auths.hasOwnProperty('data')
        ? this.props.auths.data.firstname
        : '',
    );
    if (this.props.auths.isAuthenticated) {
      if (hasLocationPermission) {
        //console.log('fetchingPosition');
        Geolocation.getCurrentPosition(
          position => {
            console.log('position ========', position);
            const region = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.004,
            };
            console.log(region);
            this.setState({
              region: region,
              loading: true,
              error: null,
            });
            this.map.animateToRegion(region);
          },
          error => {
            console.log('error ========', error);
            const region = {
              latitude: 13.736717,
              longitude: 100.523186,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            };
            this.setState({
              region: region,
              loading: false,
              error: null,
            });
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 5000 },
        );
        // Geolocation.getCurrentPosition(
        //   position => {
        //     console.log('position.coords.latitude');
        //     console.log(position);
        //     console.log(position.coords.latitude);
        //     const region = {
        //       latitude: position.coords.latitude,
        //       longitude: position.coords.longitude,
        //       latitudeDelta: 0.005,
        //       longitudeDelta: 0.004,
        //     };
        //     console.log(region);
        //     this.setState({
        //       region: region,
        //       loading: true,
        //       error: null,
        //     });
        //     this.map.animateToRegion(region);
        //   },
        //   error => {
        //     console.log(error);
        //     const region = {
        //       latitude: 13.736717,
        //       longitude: 100.523186,
        //       latitudeDelta: 0.0922,
        //       longitudeDelta: 0.0421,
        //     };
        //     this.setState({
        //       region: region,
        //       //loading: false,
        //       error: null,
        //     });
        //     // alert(error);
        //     // this.setState({
        //     //   error: error.message,
        //     //   loading: false
        //     // })
        //   },
        //   { enableHighAccuracy: false, timeout: 5000, maximumAge: 5000 },
        // );

        const onValueChange = database()
          .ref(`/emsPositionAlert/` + userTeleId)
          .on('value', snapshot => {
            console.log('User data: ', snapshot.val());
            if (snapshot.val() !== null && snapshot.val() !== '') {
              const valueObject = snapshot.val();
              this.setState({
                ambulanceStatus: valueObject.status,
                numberFromFireBase: valueObject.number,
              });
            }
          });
      } else {
        console.log('not authenticated');
      }
    }
  }

  onMapReady = () => {
    this.setState({ isMapReady: true, marginTop: 0 });
  };

  //  Fetch location details as a JOSN from google map API
  // fetchAddress = () => {
  //   fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.region.latitude + "," + this.state.region.longitude + "&key=" + "AIzaSyAXW-WDp0MF5si6oFXaukDQuThTr1wqmDE")
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       const userLocation = responseJson.results[0].formatted_address;
  //       this.setState({
  //         userLocation: userLocation,
  //         regionChangeProgress: false
  //       });
  //     });
  // }

  setDataToRemote = async values => {
    this.setState({
      inputNumber: values.number,
      inputPatientName: values.patientName,
      // landmark: values.landmark
    });
    this.onPageConfirmLocation();
  };
  fetchAddress = () => {
    this.setState({
      userLocationLat: this.state.region.latitude,
      userLocationLng: this.state.region.longitude,

      regionChangeProgress: false,
    });
  };

  // Update state on region change
  onRegionChange = region => {
    this.setState(
      {
        region,
        regionChangeProgress: true,
      },
      () => this.fetchAddress(),
    );
  };

  // Action to be taken after select location button click
  onLocationSelect = () => {
    // alert(this.state.userLocation);
    console.log(this.state.userLocationLat);
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onPageConfirmLocation = () => {
    this.setModalVisible(true);
  };

  onPageConfirmEmergency = () => {
    this.setState(
      {
        pageState: 1,
        modalVisible: false,
        // ambulanceStatus: 'patientWaiting'
        //   loading: true
      },
      () => this.sendLocationToFireBase(),
    );

    setTimeout(() => {
      this.setState({ pageState: 0 });
    }, 2000);
  };

  doSomeNotification = () => {};

  sendLocationToFireBase = () => {
    const { userTele, auths, user } = this.props;
    const userTeleId =
      userTele && userTele.dataTele && userTele.dataTele.userId;

    database()
      .ref('/emsPositionAlert/' + userTeleId)
      .set({
        lat: this.state.region.latitude,
        lng: this.state.region.longitude,
        number: this.state.inputNumber,
        patientName: this.state.inputPatientName,
        patientId: user.data.id,
        date: new Date().toUTCString(),
        // landmark: this.state.landmark,
        status: 'patientWaiting',
      })
      .then(() => console.log('Data set.'));
  };

  render() {
    const { navigation } = this.props;

    const modalHeader = (
      <View style={styles.modalHeader}>
        <Text style={styles.title}>ทำการเรียกรถฉุกเฉิน</Text>
        <View style={styles.divider}></View>
      </View>
    );
    const modalBody = (
      <View style={styles.modalBody}>
        <Text style={styles.bodyText}>
          ถ้าคุณมั่นใจที่จะทำการเรียกรถฉุกเฉิน ให้กดยืนยัน
          แล้วเจ้าหน้าที่จะทำการโทรไปหาเบอร์ที่กรอกไว้
        </Text>
      </View>
    );
    const modalFooter = (
      <View style={styles.modalFooter}>
        <View style={styles.divider}></View>
        <View style={{ flexDirection: 'row-reverse', margin: 10 }}>
          <TouchableOpacity
            style={{ ...styles.actions, backgroundColor: '#db2828' }}
            onPress={() => {
              this.setModalVisible(false);
            }}
          >
            <Text style={styles.actionText}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.onPageConfirmEmergency();
            }}
            style={{ ...styles.actions, backgroundColor: '#21ba45' }}
          >
            <Text style={styles.actionText}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    const modalContainer = (
      <View style={styles.modalContainer}>
        {modalHeader}
        {modalBody}
        {modalFooter}
      </View>
    );

    if (!this.state.loading) {
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{ top: 'always' }}
        >
          <Header
            title=""
            renderLeft={() => {
              return <Icon name="chevron-left" size={20} color="black" />;
            }}
            renderRight={() => {
              return <Icon size={20} color={BaseColor.primaryColor} />;
            }}
            // onPressLeft={() => {
            //     // navigation.goBack();
            // }}
            // onPressRight={() => {
            //     this.onChangeMapView();
            // }}
          />
          <View style={styles.spinnerView}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </SafeAreaView>
      );
    } else if (!this.props.auths.isAuthenticated) {
      return (
        <View>
          <Header
            title="ระบบเรียกรถฉุกเฉิน"
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
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#cccccc',
              marginHorizontal: 20,
            }}
          />
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: '500' }}>
              คุณจำเป็นที่จะต้องล๊อกอินเพื่อใช้ระบบ Vajira Emergency Service
            </Text>
            <Text style={{ fontSize: 18, marginTop: 5 }}>
              คุณสามารถใช้หน้าต่างนี้ในการเรียกรถฉุกเฉินได้จากทุกที่ทั่วกรุงเทพ
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
      );
    } else
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{ top: 'always' }}
        >
          <View style={styles.contain}>
            <View style={{ flex: 1, zIndex: 100 }}></View>
            <TouchableOpacity
              style={styles.hoveringBackButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Icon
                name="chevron-left"
                style={{ fontSize: 25, lineHeight: 50, alignSelf: 'center' }}
              />
            </TouchableOpacity>
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 1 }}></View>
          </View>
          <Modal
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
          >
            <View style={styles.modal}>
              <View>{modalContainer}</View>
            </View>
          </Modal>

          <View style={styles.deatilSection}>
            <KeyboardAwareScrollView>
              {/* <Text style={{ fontSize: 16, fontWeight: "bold",  marginBottom: 20 }}>Move map for location</Text>
              <Text style={{ fontSize: 10, color: "#999" }}>LOCATION</Text> */}
              {this.state.pageState === 0 &&
                (this.state.ambulanceStatus === 'completed' ||
                  this.state.ambulanceStatus === 'cancelled') && (
                  <Formik
                    initialValues={{
                      email: '',
                      // landmark: '',
                      patientName: this.props.auths.hasOwnProperty('data')
                        ? `${this.props.auths.data.firstname}  ${this.props.auths.data.lastname}`
                        : '',
                      number: this.props.auths.hasOwnProperty('data')
                        ? this.props.auths.data.mobileNumber
                        : '',
                      language: '',
                    }}
                    onSubmit={async values => {
                      console.log('submitting');
                      await this.setDataToRemote(values);
                    }}
                    validationSchema={yup.object().shape({
                      // landmark: yup.string().required(),

                      patientName: yup.string().required(),

                      number: yup.number().required(),
                    })}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleSubmit,
                      handleBlur,
                      setFieldValue,
                    }) => (
                      <Fragment>
                        <View
                          style={{
                            paddingHorizontal: 0,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            paddingTop: 15,
                            zIndex: 20,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: 'bold',
                              marginLeft: 10,
                              marginBottom: 15,
                            }}
                          >
                            Vajira Emergency 1554
                          </Text>
                          {/* <TextInput
                            value={values.landmark}
                            onChangeText={handleChange('landmark')}
                            placeholder="จุดสังเกตุ เลขที่"
                            placeholderTextColor="#7c7b7b"
                            onBlur={handleBlur('landmark')}
                            style={[
                              styles.textInput,
                              {
                                zIndex: 20,
                                fontSize: 14,
                                padding: 10,
                                alignSelf: 'center',
                                borderColor: '#CCCCCC',
                                borderWidth: 1,
                              },
                            ]}
                          /> */}

                          <TextInput
                            value={values.patientName}
                            onChangeText={handleChange('patientName')}
                            placeholder="ชื่อผู้ป่วยฉุกเฉิน"
                            placeholderTextColor="#7c7b7b"
                            onBlur={handleBlur('patientName')}
                            style={[
                              styles.textInput,
                              {
                                fontSize: 14,
                                padding: 10,
                                alignSelf: 'center',
                                borderColor: '#CCCCCC',

                                borderWidth: 1,
                              },
                            ]}
                          />

                          {touched.email && errors.email && (
                            <Text
                              style={{
                                fontSize: 10,
                                color: 'red',
                                marginLeft: 5,
                              }}
                            >
                              {errors.email}
                            </Text>
                          )}

                          <Text
                            style={{
                              fontSize: 13,
                              marginLeft: 20,
                              marginRight: 20,
                              marginBottom: 10,
                            }}
                          >
                            ท่านจำเป็นที่จะต้องกรอกเบอร์มือถือ
                            เพื่อให้เจ้าหน้าที่โทรติดต่อ
                          </Text>

                          <TextInput
                            value={values.number}
                            onChangeText={handleChange('number')}
                            placeholder="เบอร์ติดต่อ (Mobile number)"
                            placeholderTextColor="#7c7b7b"
                            onBlur={handleBlur('number')}
                            style={[
                              styles.textInput,
                              {
                                fontSize: 14,
                                padding: 10,
                                alignSelf: 'center',
                                borderColor: '#CCCCCC',

                                borderWidth: 1,
                              },
                            ]}
                          />
                        </View>

                        <Text numberOfLines={2} style={{ fontSize: 14 }}>
                          {!this.state.regionChangeProgress
                            ? this.state.userLocation
                            : 'Identifying Location...'}
                        </Text>

                        {touched && errors && (
                          <Text
                            style={
                              this.props?.user?.data?.HIEimage
                                ? {
                                    fontSize: 14,
                                    color: 'red',
                                    marginHorizontal: 20,
                                    paddingVertical: 10,
                                  }
                                : {
                                    fontSize: 14,
                                    color: 'red',
                                    marginHorizontal: 20,
                                    paddingVertical: 10,
                                    textAlign: 'center',
                                  }
                            }
                          >
                            {this.props?.user?.data?.HIEimage
                              ? `ตรวจเช็คข้อมูลให้ถูกต้องก่อนเริ่มเรียกรถฉุกเฉิน`
                              : `ขออภัยในความไม่สะดวก \n ไม่พบข้อมูลท่านในฐานข้อมูลของโรงพยาบาล จึงไม่สามารถใช้ระบบนี้ได้ แนะนำให้ท่านโทร 1669 เพื่อแจ้งเหตุด่วนของท่าน`}
                          </Text>
                        )}

                        <LinearGradient
                          style={[styles.add, { marginBottom: 5 }]}
                          colors={
                            this.props?.user?.data?.HIEimage
                              ? ['#0A905F', '#095C3E']
                              : ['#5f5f5f', '#5f5f5f']
                          }
                        >
                          <TouchableOpacity
                            style={{ width: '100%', alignItems: 'center' }}
                            disabled={
                              this.props?.user?.data?.HIEimage ? false : true
                            }
                            onPress={handleSubmit}
                          >
                            <Text style={styles.buttonTextAdd}>
                              ยืนยันข้อมูล
                            </Text>
                          </TouchableOpacity>
                        </LinearGradient>
                      </Fragment>
                    )}
                  </Formik>
                )}
              {this.state.pageState === 1 && (
                <View>
                  <View style={styles.shadowBox}>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingBottom: 20,
                        paddingTop: 10,
                      }}
                    >
                      <View style={{ width: '20%' }}>
                        <Image
                          source={AmbulanceIcon}
                          style={{
                            width: 50,
                            height: 50,
                            marginBottom: 10,
                            marginLeft: 15,
                          }}
                        />
                      </View>

                      <View style={{ width: '60%', flexDirection: 'column' }}>
                        <View>
                          <Text>แผนก EMS โรงพยาบาลวชิระ</Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            กำลังดำเนินการ
                          </Text>
                        </View>
                      </View>

                      <View style={{ width: '15%', alignSelf: 'flex-start' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                      </View>
                    </View>
                  </View>
                  <View style={[styles.shadowBox, { marginTop: 20 }]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingBottom: 20,
                        paddingTop: 10,
                      }}
                    >
                      <View style={{ width: '20%' }}>
                        <Image
                          source={Images.homeicon1}
                          style={{
                            width: 50,
                            height: 50,
                            marginBottom: 10,
                            marginLeft: 15,
                          }}
                        />
                      </View>

                      <View style={{ width: '60%', flexDirection: 'column' }}>
                        <View>
                          <Text style={{ fontSize: 15 }}>
                            เบอร์ที่ใช้ติดต่อเพื่อยืนยัน
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 16, paddingVertical: 10 }}>
                            {this.state.inputNumber}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.shadowBox,
                      { marginTop: 20, marginBottom: 20 },
                    ]}
                  >
                    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                      <View style={{ width: '20%' }}>
                        <Image
                          source={LocationIcon}
                          style={{
                            width: 50,
                            height: 50,
                            marginBottom: 10,
                            marginLeft: 15,
                          }}
                        />
                      </View>

                      <View style={{ width: '60%', flexDirection: 'column' }}>
                        <View>
                          <Text style={{ fontSize: 16 }}>
                            โรงพยาบาลวชิระ - ถนนสามเสน
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 16, paddingVertical: 10 }}>
                            Pin Location - ตำแหน่งหมุด
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              {this.state.pageState === 0 &&
                this.state.ambulanceStatus !== 'completed' &&
                this.state.ambulanceStatus !== 'cancelled' && (
                  <View>
                    <View
                      style={[
                        styles.shadowBox,
                        { marginTop: 20, marginBottom: 20 },
                      ]}
                    >
                      <View
                        style={{ flexDirection: 'row', paddingVertical: 10 }}
                      >
                        <View style={{ width: '20%' }}>
                          <Image
                            source={AmbulanceIcon}
                            style={{
                              width: 50,
                              height: 50,
                              marginBottom: 10,
                              marginLeft: 15,
                            }}
                          />
                        </View>
                        <View style={{ width: '60%', flexDirection: 'column' }}>
                          {this.state.ambulanceStatus === 'patientWaiting' ? (
                            <View style={{ alignSelf: 'center', height: 50 }}>
                              <Text
                                style={{ fontSize: 18, fontWeight: 'bold' }}
                              >
                                รอเจ้าหน้าที่โทรยืนยัน
                              </Text>
                            </View>
                          ) : this.state.ambulanceStatus === 'arrived' ? (
                            <View style={{ alignSelf: 'center', height: 50 }}>
                              <Text
                                style={{ fontSize: 18, fontWeight: 'bold' }}
                              >
                                เจ้าหน้าที่ถึงที่หมายแล้ว
                              </Text>
                            </View>
                          ) : (
                            <View style={{ alignSelf: 'center', height: 50 }}>
                              <Text
                                style={{ fontSize: 18, fontWeight: 'bold' }}
                              >
                                กำลังดำเนินการ
                              </Text>
                            </View>
                          )}
                        </View>

                        <View style={{ width: '15%', alignSelf: 'flex-start' }}>
                          {this.state.ambulanceStatus === 'patientWaiting' && (
                            <ActivityIndicator size="large" color="orange" />
                          )}
                          {this.state.ambulanceStatus ===
                            'ambulanceDispatched' && (
                            <ActivityIndicator size="large" color="green" />
                          )}
                        </View>
                      </View>
                    </View>

                    <View style={styles.shadowBox}>
                      <View
                        style={{ flexDirection: 'row', paddingVertical: 15 }}
                      >
                        <View style={{ width: '20%' }}>
                          <Image
                            source={Images.homeicon4}
                            style={{
                              width: 50,
                              height: 50,
                              marginBottom: 10,
                              marginLeft: 15,
                            }}
                          />
                        </View>

                        {this.state.ambulanceStatus === 'patientWaiting' ? (
                          <View
                            style={{ width: '60%', flexDirection: 'column' }}
                          >
                            <View>
                              <Text>แผนก EMS โรงพยาบาลวชิระ</Text>
                            </View>
                            <View>
                              <Text
                                style={{ fontSize: 16, fontWeight: 'bold' }}
                              >
                                โปรดรอรับสายที่เบอร์
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={{ fontSize: 18, paddingVertical: 10 }}
                              >
                                {this.state.numberFromFireBase}
                              </Text>
                            </View>
                          </View>
                        ) : (
                          <View
                            style={{ width: '60%', flexDirection: 'column' }}
                          >
                            <View>
                              <Text>แผนก EMS โรงพยาบาลวชิระ</Text>
                            </View>
                            <View>
                              <Text
                                style={{ fontSize: 16, fontWeight: 'bold' }}
                              >
                                กรุณาอย่าเคลื่อนย้ายที่
                              </Text>
                            </View>
                          </View>
                        )}
                      </View>
                    </View>
                    <View
                      style={[
                        styles.shadowBox,
                        { marginTop: 20, marginBottom: 20 },
                      ]}
                    >
                      <View
                        style={{ flexDirection: 'row', paddingVertical: 10 }}
                      >
                        <View style={{ width: '20%' }}>
                          <Image
                            source={LocationIcon}
                            style={{
                              width: 50,
                              height: 50,
                              marginBottom: 10,
                              marginLeft: 15,
                            }}
                          />
                        </View>

                        <View style={{ width: '60%', flexDirection: 'column' }}>
                          <View>
                            <Text style={{ fontSize: 16 }}>
                              โรงพยาบาลวชิระ - ถนนสามเสน
                            </Text>
                          </View>
                          <View>
                            <Text style={{ fontSize: 16, paddingVertical: 10 }}>
                              Pin Location - ตำแหน่งหมุด
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
            </KeyboardAwareScrollView>
          </View>

          <View style={{ flex: 1.3, zIndex: 1, elevation: 1 }}>
            {!!this.state.region.latitude && !!this.state.region.longitude && (
              <MapView
                style={{ ...styles.map, marginTop: this.state.marginTop }}
                initialRegion={this.state.region}
                scrollEnabled={
                  this.state.pageState < 1 && this.state.ambulanceStatus === ''
                    ? true
                    : false
                }
                zoomEnabled={
                  this.state.pageState < 1 && this.state.ambulanceStatus === ''
                    ? true
                    : false
                }
                zoomTapEnabled={
                  this.state.pageState < 1 && this.state.ambulanceStatus === ''
                    ? true
                    : false
                }
                // onMapReady={this.onMapReady}
                onRegionChange={this.onRegionChange}
                ref={ref => (this.map = ref)}
              ></MapView>
            )}
            <View
              style={{
                zIndex: 100,
                position: 'absolute',
                marginTop: -37,
                marginLeft: -11,
                left: '50%',
                top: '25%',
              }}
            >
              {this.state.ambulanceStatus === 'ambulanceDispatched' ? (
                <PulseIndicator name="map-marker" size={40} color="green" />
              ) : (
                <PulseIndicator name="map-marker" size={40} color="orange" />
              )}
            </View>
            <View style={styles.mapMarkerContainer}></View>
          </View>
        </SafeAreaView>
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

export default connect(mapStateToProps)(EmergencyBeacon);
