import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Header, SafeAreaView, Text, Icon, Image } from '@components';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { BaseStyle, BaseColor } from '@config';
import MobileIcon from '@assets/images/mobile-icon.png';
import CalendarIcon from '@assets/images/calendar-icon.png';
import RejectIcon from '@assets/images/reject-icon.png';
import { TelemedicineActions } from '@actions';
import {
  PERMISSIONS,
  checkMultiple,
  RESULTS,
  requestMultiple,
  request,
} from 'react-native-permissions';

import styles from './styles';

import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';

import {
  Container,
  Card,
  Card2,
  TopCard,
  ProfileImage,
  Row,
  BottomRow,
  MainContainer,
} from './style';
import { Dimensions } from 'react-native';
import { ItemRow } from '../TeleSymptom/components/Dropdown/style';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TeleDoctorProfile = ({ navigation, route }) => {
  const telemedicine = useSelector(state => state.telemedicine);
  const dispatch = useDispatch();
  const [theStatus, setStatus] = useState('online');
  // Doctor ID Parameter

  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [textShown2, setTextShown2] = useState(false); //To show ur remaining Text

  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const toggleNumberOfLines2 = () => {
    //To toggle the show text or hide it
    setTextShown2(!textShown2);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    console.log('nativeevent');
    console.log(e.nativeEvent);
  }, []);

  // var ref = firebase.database().ref(`/doctorStatus/${id}`);
  // ref.once("value")
  // 	.then(function (snapshot) {
  // 		let data = snapshot.val();
  // 		let status = data.status;
  // 		console.log('refff');
  // 		console.log(status);
  // 		setStatus(status)
  // 	});

  const checkPermissions = async callback => {
    const iosPermissions = [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE];
    const androidPermissions = [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ];
    try {
      const currentPlatform =
        Platform.OS === 'ios' ? iosPermissions : androidPermissions;
      const status = await checkMultiple(currentPlatform);
      const [CAMERA, AUDIO] = currentPlatform;
      const isUnavailable =
        status[CAMERA] === RESULTS.UNAVAILABLE ||
        status[AUDIO] === RESULTS.UNAVAILABLE;
      const isBlocked =
        status[CAMERA] === RESULTS.BLOCKED || status[AUDIO] === RESULTS.BLOCKED;
      const isDeniedAll =
        status[CAMERA] === RESULTS.DENIED && status[AUDIO] === RESULTS.DENIED;
      const isDeniedOnce =
        status[CAMERA] === RESULTS.DENIED || status[AUDIO] === RESULTS.DENIED;
      const isAllowed =
        status[CAMERA] === RESULTS.GRANTED || status[AUDIO] === RESULTS.GRANTED;

      // Check hardware is support ?
      if (isUnavailable) {
        return Alert.alert(
          'Error',
          'Hardware to support video calls is not available',
        );
      }

      // Check user blocked ?
      if (isBlocked) {
        return Alert.alert(
          'Error',
          'Permission to access . hardware was blcoked, Please grant manually',
        );
      }

      // User is denied all hardware at system require
      if (isDeniedAll) {
        const statusNew = await requestMultiple(currentPlatform);
        const isAllowAll =
          statusNew[CAMERA] === RESULTS.GRANTED &&
          statusNew[AUDIO] === RESULTS.GRANTED;
        if (!isAllowAll) {
          return Alert.alert('Error', 'One of the permissions was not granted');
        }
        return callback && callback();
      }

      // User is denied once of hardware at system require
      if (isDeniedOnce) {
        const isCameraDenied =
          status[CAMERA] === RESULTS.DENIED ? CAMERA : AUDIO;
        const isGranted = await request(isCameraDenied);
        if (!isGranted) {
          return Alert.alert('Error', 'Permission not granted');
        }
        return callback && callback();
      }

      // User is allowd hardware at system require
      if (isAllowed) {
        return callback && callback();
      }
      return Alert.alert('Error', 'Please contact admin');
    } catch (error) {
      Alert.alert('Error', error);
    }
  };

  const handleGoScreen = (name, type) => {
    if (type) {
      const data = {
        ...telemedicine.data,
        consultCaseType: type,
      };
      dispatch(TelemedicineActions.setTelemedicine(data));
    }
    // console.log(' handleGoScreen telemed data');

    // console.log(telemedicine);
    navigation.navigate(name);
  };

  const onPressCall = (name, type) => {
    if (type === 'video' || type === 'voice') {
      return checkPermissions(() => handleGoScreen(name, type));
    }
    return handleGoScreen(name, type);
  };

  const renderGroupIcon = (icon, lable, name, type) => {
    return (
      <TouchableOpacity
        /*underlayColor="transparent"*/
        activeOpacity={0.5}
        style={
          (styles.iconTopParent4,
          {
            flex: 1,
            backgroundColor: '#087951',
            borderRadius: 12,
            padding: 15,
          })
        }
        onPress={() => onPressCall(name, type)}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* <Icon
                  name={icon}
                  // color={BaseColor.primaryColor}
                  // solid
                  style={{ width: 60, height: 60, marginBottom: 10 }}
                /> */}

          <Icon
            name={icon}
            style={{
              fontSize: 18,
              color: 'white',
            }}
          />
          <Text bold style={{ color: 'white', fontSize: 14 }} grayColor>
            {'\t\t' + lable + '\t\t'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // const styles = StyleSheet.create({
  //   textOnline: {
  //     color: 'green',
  //     fontWeight: 'bold',
  //   },
  //   textOffline: {
  //     color: 'red',
  //     fontWeight: 'bold',
  //   },
  // });

  const education =
    telemedicine.data &&
    telemedicine.data.doctor &&
    telemedicine.data.doctor.detail &&
    telemedicine.data.doctor.detail.educational
      ? telemedicine.data.doctor.detail.educational.split(',')
      : '';

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title={route?.params?.name ?? 'แพทย์'}
        textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        style={{ backgroundColor: '#f5f5f5' }}
        scrollEventThrottle={8}
      >
        <Container>
          <Card>
            <TopCard>
              <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                <View>
                  <ProfileImage
                    source={{
                      uri: _.get(telemedicine, 'data.doctor.profileImage'),
                    }}
                  />
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      flexShrink: 1,
                    }}
                  >
                    <Text
                      primaryColor
                      bold
                      style={{
                        marginTop: 2,
                        marginLeft: 20,
                        fontSize: 16,
                        color: '#0A5C3E',
                      }}
                    >
                      {_.get(telemedicine, 'data.doctor.fullname')}
                    </Text>
                    <Text
                      style={{
                        marginTop: 2,
                        marginLeft: 20,
                        fontSize: 14,
                        color: '#A2A2A2',
                      }}
                    >
                      <Icon
                        name="hospital"
                        style={{
                          fontSize: 14,
                          width: 25,
                          color: '#A2A2A2',
                        }}
                      />{' '}
                      คณะแพทย์ศาสตร์
                      {_.get(telemedicine, 'data.doctor.detail.hospital')}
                    </Text>
                    <Text
                      style={{
                        marginTop: 2,
                        marginLeft: 20,
                        fontSize: 14,
                        color: '#A2A2A2',
                      }}
                    >
                      <Icon
                        name="book"
                        style={{
                          fontSize: 14,
                          width: 25,
                          color: '#A2A2A2',
                        }}
                      />{' '}
                      {_.get(telemedicine, 'data.doctor.detail.specialist')}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginVertical: 8,
                  marginTop: 20,
                  marginBottom: 20,
                  width: '100%',
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  {theStatus == 'online' ? (
                    <View
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {renderGroupIcon(
                        'calendar',
                        'ทำการนัดหมาย',
                        'Appointment',
                      )}
                    </View>
                  ) : (
                    <View
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {renderGroupIcon(
                        CalendarIcon,
                        'Appointment',
                        'Appointment',
                      )}
                    </View>
                  )}
                </View>
              </View>
            </TopCard>

            {/* <Row>
							<Text caption1 grayColor semibold style={{ width: 100 }}>
								Date of birth
              </Text>
							<Text bold numberOfLines={1}>
								-
              </Text>
						</Row>
						<Row>
							<Text caption1 grayColor semibold style={{ width: 100 }}>
								Gender
              </Text>
							<Text bold numberOfLines={1}>
								{_.upperFirst(_.get(telemedicine, 'data.doctor.gender'))}
							</Text>
						</Row>
						<Row>
							<Text caption1 grayColor semibold style={{ width: 100 }}>
								Tel.
              </Text>
							<Text bold numberOfLines={1}>
								-
              </Text>
						</Row>
						<Row>
							<Text caption1 grayColor semibold style={{ width: 100 }}>
								Location
              </Text>
							<Text bold numberOfLines={1}>
								-
              </Text>
						</Row> */}
            {/*<Row>*/}
            {/*  <Text caption1 bold style={{ width: 100, fontSize: 16 }}>*/}
            {/*    สถานะ*/}
            {/*  </Text>*/}
            {/*  {theStatus == 'online' ? (*/}
            {/*    <View>*/}
            {/*      <Text style={styles.textOnline}>ออนไลน์อยู่</Text>*/}
            {/*    </View>*/}
            {/*  ) : (*/}
            {/*    <View>*/}
            {/*      <Text style={styles.textOffline}>ออฟไลน์</Text>*/}
            {/*    </View>*/}
            {/*  )}*/}
            {/*</Row>*/}
          </Card>

          <MainContainer>
            <Text
              style={{
                alignSelf: 'flex-start',
                fontSize: 16,
                lineHeight: 20,
                color: '#575757',
                fontWeight: 'bold',
                marginBottom: 10,
              }}
            >
              ประวัติและความเชี่ยวชาญเฉพาะทาง
            </Text>
            {education
              ? education.map(item => (
                  <Text
                    key={item}
                    onTextLayout={onTextLayout}
                    numberOfLines={textShown2 ? undefined : 4}
                    style={{ lineHeight: 21 }}
                  >
                    {item}
                  </Text>
                ))
              : null}
          </MainContainer>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeleDoctorProfile;
