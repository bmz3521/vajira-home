import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
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
  TopCard,
  ProfileImage,
  Row,
  BottomRow,
  MainContainer,
} from './style';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TelePharmacyProfile = ({ navigation }) => {
  const telemedicine = useSelector(state => state.telemedicine);
  const dispatch = useDispatch();
  const [theStatus, setStatus] = useState('online');
  // Doctor ID Parameter
  const id = telemedicine.data.doctor.id;

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
        consultCaseType: type,
      };
      dispatch(TelemedicineActions.setTelemedicine(data));
      // console.log(`dataaa ${data}`);
    }
    // console.log(telemedicine);
    navigation.navigate(name, { telemedicine, consultType: 'telePharmacy' });
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
        // underlayColor="transparent"
        onPress={() => onPressCall(name, type)}
        // style={styles.iconTopParent}
        style={{
          flex: 0.5,
          backgroundColor: '#284F30',
        }}
      >
        <View style={{ alignItems: 'center', alignSelf: 'center' }}>
          {/* <Icon
                  name={icon}
                  // color={BaseColor.primaryColor}
                  // solid
                  style={{ width: 60, height: 60, marginBottom: 10 }}
                /> */}
          <Icon
            name={icon}
            style={{
              fontSize: 30,
              color: 'white',
              marginTop: 15,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />
          <Text style={{ color: 'white', marginTop: 10 }} caption1 grayColor>
            {lable}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    textOnline: {
      color: 'green',
      fontWeight: 'bold',
    },
    textOffline: {
      color: 'red',
      fontWeight: 'bold',
    },
  });

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <ScrollView
        contnentContainerStype={{ marginTop: 0, paddingBottom: 0 }}
        scrollEventThrottle={8}
      >
        <Header
          title=""
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
        <Container style={{ flex: 1 }}>
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
                  <Text
                    title3
                    primaryColor
                    bold
                    numberOfLines={1}
                    style={{ marginTop: 8, marginLeft: 20 }}
                  >
                    {_.get(telemedicine, 'data.doctor.fullname')}
                  </Text>
                  <View
                    style={{
                      marginTop: 8,
                      marginLeft: 20,
                      backgroundColor: '#dddddd',
                      height: 20,
                      width: 35,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ alignSelf: 'center', lineHeight: 20 }}>
                      GP
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', marginTop: 30 }}>
                <View
                  style={{
                    marginTop: 8,
                    height: 20,
                    width: '50%',
                    borderRadius: 5,
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <View>
                      <Icon
                        name="book"
                        style={{
                          fontSize: 20,
                          width: 25,
                          height: 25,
                          color: '#284F30',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        alignSelf: 'center',
                        marginLeft: 10,
                        lineHeight: 20,
                        color: 'black',
                      }}
                    >
                      เภสัชศาสตร์
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginTop: 8,
                    height: 20,
                    width: '50%',
                    borderRadius: 5,
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <View>
                      <Icon
                        name="hospital"
                        style={{
                          fontSize: 20,
                          width: 25,
                          height: 25,
                          color: '#284F30',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        alignSelf: 'center',
                        marginLeft: 10,
                        lineHeight: 20,
                        color: 'black',
                      }}
                    >
                      วชิรพยาบาล
                    </Text>
                  </View>
                </View>
              </View>
            </TopCard>

            <MainContainer style={styles.mainContainer}>
              <Text
                style={{
                  alignSelf: 'flex-start',
                  fontSize: 18,
                  lineHeight: 20,
                  fontWeight: 'bold',
                }}
              >
                เฉพาะทาง
              </Text>
              <Text
                onTextLayout={onTextLayout}
                numberOfLines={textShown ? undefined : 4}
                style={{ lineHeight: 21 }}
              >
                เบาหวานโรคทั่วไป การควบคุมโรคไม่ติดต่อระยะยาว
                ความเคลื่อนไหวต่างๆ ในการดำเนินธุรกิจของธนาคาร ทั้งนี้
                ข้อมูลและสาระสำคัญที่ปรากฏในหน้าจอต่างๆ ตลอดจนข้อกำหนด เงื่อนไข
                และรายละเอียดต่างๆ ความถูกต้องครบถ้วนสมบูรณ์ ความเป็นปัจจุบัน
                และความต่อเนื่องของข้อมูลในเว็บไซต์นั้น
                อาจเปลี่ยนแปลงได้ตามดุลยพินิจของธนาคาร
                ธนาคารขอสงวนสิทธิ์ในการคัดเลือกผู้ประสงค์ใช้บริการ
                การระงับหรือจำกัดขอบเขต
                รวมถึงการปฏิเสธสิทธิในการใช้บริการทางเว็บไซต์ทั้งหมดหรือบางส่วนแก่ผู้ใดก็ได้ตามเกณฑ์ของธนาคาร
                โดยไม่ต้องทำการแจ้งให้ท่านทราบแต่อย่างใด
                และไม่ถือว่าเป็นการกระทำให้ท่านหรือบุคคลใดเกิดความเสียหายใดๆ
                ไม่ว่าทางตรงหรือทางอ้อม
                และจะไม่ยกเว้นเงื่อนไขการให้บริการข้อมูลนี้ไม่ว่าส่วนใดให้แก่ผู้ใดทั้งสิ้น
                เว้นแต่จะทำเป็นลายลักษณ์อักษร
                และลงนามโดยผู้มีอำนาจลงนามของธนาคาร ทั้งนี้
                หากท่านไม่สามารถดำเนินการได้ตามข้อตกลงและเงื่อนไขการใช้บริการ
                กรุณาหยุดการเข้าเว็บไซต์โดยทันที
              </Text>
              <TouchableOpacity onPress={toggleNumberOfLines}>
                <Text
                  style={{ lineHeight: 21, marginTop: 10, color: '#284F30' }}
                >
                  {textShown ? (
                    <Icon name="chevron-up" />
                  ) : (
                    <Icon name="chevron-down" />
                  )}
                </Text>
              </TouchableOpacity>
            </MainContainer>

            <MainContainer style={styles.mainContainer}>
              <Text
                style={{
                  alignSelf: 'flex-start',
                  fontSize: 18,
                  lineHeight: 20,
                  fontWeight: 'bold',
                }}
              >
                ประวัติ
              </Text>
              <Text
                onTextLayout={onTextLayout}
                numberOfLines={textShown2 ? undefined : 4}
                style={{ lineHeight: 21 }}
              >
                รับการศึกษาที่ ความเคลื่อนไหวต่างๆ ในการดำเนินธุรกิจของธนาคาร
                ทั้งนี้ ข้อมูลและสาระสำคัญที่ปรากฏในหน้าจอต่างๆ ตลอดจนข้อกำหนด
                เงื่อนไข และรายละเอียดต่างๆ ความถูกต้องครบถ้วนสมบูรณ์
                ความเป็นปัจจุบัน และความต่อเนื่องของข้อมูลในเว็บไซต์นั้น
                อาจเปลี่ยนแปลงได้ตามดุลยพินิจของธนาคาร
                ธนาคารขอสงวนสิทธิ์ในการคัดเลือกผู้ประสงค์ใช้บริการ
                การระงับหรือจำกัดขอบเขต
                รวมถึงการปฏิเสธสิทธิในการใช้บริการทางเว็บไซต์ทั้งหมดหรือบางส่วนแก่ผู้ใดก็ได้ตามเกณฑ์ของธนาคาร
                โดยไม่ต้องทำการแจ้งให้ท่านทราบแต่อย่างใด
                และไม่ถือว่าเป็นการกระทำให้ท่านหรือบุคคลใดเกิดความเสียหายใดๆ
                ไม่ว่าทางตรงหรือทางอ้อม
                และจะไม่ยกเว้นเงื่อนไขการให้บริการข้อมูลนี้ไม่ว่าส่วนใดให้แก่ผู้ใดทั้งสิ้น
                เว้นแต่จะทำเป็นลายลักษณ์อักษร
                และลงนามโดยผู้มีอำนาจลงนามของธนาคาร ทั้งนี้
                หากท่านไม่สามารถดำเนินการได้ตามข้อตกลงและเงื่อนไขการใช้บริการ
                กรุณาหยุดการเข้าเว็บไซต์โดยทันที
              </Text>
              <TouchableOpacity onPress={toggleNumberOfLines2}>
                <Text
                  style={{ lineHeight: 21, marginTop: 10, color: '#284F30' }}
                >
                  {textShown2 ? (
                    <Icon name="chevron-up" />
                  ) : (
                    <Icon name="chevron-down" />
                  )}
                </Text>
              </TouchableOpacity>
            </MainContainer>
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
            <Row>
              <Text caption1 bold style={{ width: 100, fontSize: 16 }}>
                สถานะ
              </Text>
              {theStatus == 'online' ? (
                <View>
                  <Text style={styles.textOnline}>ออนไลน์อยู่</Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.textOffline}>ออฟไลน์</Text>
                </View>
              )}
            </Row>
          </Card>
        </Container>
      </ScrollView>

      {theStatus == 'online' ? (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: windowHeight - 90,
            height: 90,
            width: windowWidth,
            backgroundColor: 'white',
          }}
        >
          {renderGroupIcon('calendar', 'ทำการนัดหมาย', 'Appointment')}
          {renderGroupIcon('video', 'โทรคุยกับเภสัชกร', 'TelePayment', 'video')}
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: windowHeight - 90,
            height: 90,
            width: windowWidth,
            backgroundColor: 'white',
          }}
        >
          {renderGroupIcon(CalendarIcon, 'Appointment', 'Appointment')}
          {renderGroupIcon(RejectIcon, 'Unavailable', 'TeleDoctorProfile')}
        </View>
      )}
    </SafeAreaView>
  );
};

export default TelePharmacyProfile;
