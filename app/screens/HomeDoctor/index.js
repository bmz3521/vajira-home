import React, { useState, useEffect, useFocusEffect, useCallback } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  LogBox,
  Platform,
  AppState,
} from 'react-native';
import { Text, Icon, SafeAreaView, Image } from '@components';
import { BaseStyle, Images } from '@config';
import * as Utils from '@utils';
import styles from './styles';
import { store } from 'app/store';
import { connect, useSelector } from 'react-redux';
import { AuthActions, UserActions } from '@actions';
import { bindActionCreators } from 'redux';
import RNBootSplash from 'react-native-bootsplash';
// import VajiraCard from '../../components/ImageCardComponent/vajira-card';
import moment from 'moment';
import config from '@_config';
import { localNotificationService } from '../../LocalNotificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import RoomListDetail from './RoomList';

const { width, height } = Dimensions.get('window');

const SCREEN_WIDTH = width < height ? width : height;

const Home = props => {
  const auth = useSelector(state => state?.auth?.data);
  const { auths, user, userTele, navigation } = props;
  const doctorInfo = useSelector(state => state?.auth?.data);
  const [roles, setRoles] = useState('');
  const [load, setLoad] = useState(false);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [imageProfile, setImageProfile] = useState(Images.avata2);
  const [patientStatus, setPatientStatus] = useState([]);
  const [patientDetails, setPatientDetails] = useState([]);
  const _deltaY = useState(new Animated.Value(0))[0];
  const heightImageBanner = Utils.scaleWithPixel(140);

  useEffect(() => {
    initialFunction();
    setRoles(doctorInfo?.roles[0]?.name);
  }, []);
  const checkStatusFirebase = (status, roomKey, officerId, id, role) => {
    const filterStatus = ['inWaitingRoom', 'calling'];
    if (filterStatus.includes(status) && role.includes('callCenter')) {
      return true;
    }
    if (
      filterStatus.includes(status) &&
      (([
        'doctor',
        'nurse',
        'physiotherapist',
        'pharmacySchedule',
        'nutritionist',
      ].includes(role) &&
        officerId == id) ||
        role === 'pharmacy') &&
      roomKey.includes(role)
    ) {
      return true;
    }
    return false;
  };

  const initialFunction = useCallback(() => {
    const id = auth?.id;
    database()
      .ref('patientStatus')
      .on('value', async value => {
        const data = [];
        await value.forEach(valueStatus => {
          if (
            checkStatusFirebase(
              valueStatus?.val()?.status,
              valueStatus.key,
              valueStatus?.val()?.officerId,
              id,
              auth?.roles[0]?.name,
            )
          ) {
            data.push({
              ...valueStatus.val(),
              key: valueStatus.key,
            });
          }
        });
        setPatientStatus(data);
      });
  }, [patientStatus.length]);

  let currentTime = moment();
  const getGreetingTime = currentTime => {
    // if (!currentTime || !currentTime.isValid()) {
    //   return 'Hello';
    // }

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
    <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
      <Animated.Image
        // source={Images.topSplash}
        style={[
          styles.imageBackground,
          {
            height: _deltaY.interpolate({
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
            <Text style={{ fontSize: 16, color: 'yellow' }}>{auth?.email}</Text>
          </View>
          <View style={{ marginRight: 15 }}>
            {auth?.profileImage ? (
              <Image
                style={styles.thumb}
                source={{
                  uri: auth?.profileImage,
                }}
              />
            ) : (
              <Image style={styles.thumb} source={imageProfile} />
            )}
          </View>
        </LinearGradient>
        <View style={styles.contentCard}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon
              name="video"
              style={{
                fontSize: 20,
                marginRight: 8,
                color: '#4c4c4c',
                paddingTop: 5,
              }}
            />
            <Text bold style={{ fontSize: 20, color: '#4c4c4c' }}>
              ห้องโทรเวชกรรม {patientDetails.length} ห้อง
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <RoomListDetail
            navigation={navigation}
            patientStatus={patientStatus}
            onReload={() => initialFunction()}
            trigger={patientStatus.length}
            doctorInfo={doctorInfo}
            roles={roles}
            setLoad={setLoad}
            load={load}
            patientDetails={patientDetails}
            setPatientDetails={setPatientDetails}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    auths: state?.auth,
    user: state?.user,
    userTele: state?.userTele,
    patientStatus: state?.patientStatus || [],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
