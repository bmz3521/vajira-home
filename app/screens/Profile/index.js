import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Grid,
  NativeModules,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AuthActions, AuthTeleActions, UserActions } from '@actions';
import config from '@_config';
import axios from 'axios';
import { BaseStyle, BaseColor, Images } from '@config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Fitness from '@ovalmoney/react-native-fitness';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Image,
  ModalGoogleSignIn,
} from '@components';
import AndroidIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionics from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { getTracking, resetTracking } from '@utils/asyncStorage';
import { useIsFocused } from '@react-navigation/native';

const permissions = [
  {
    kind: Fitness.PermissionKinds.Steps,
    access: Fitness.PermissionAccesses.Read,
  },
];

function Profile({
  navigation,
  user,
  userTele,
  auth,
  actions,
  userActions,
  store,
}) {
  const [loading, setLoading] = useState(false);
  const [healthkitEnabled, setHealthkitEnabled] = useState(false);
  const isFocus = useIsFocused();
  const refModalGoogle = useRef();
  const { CheckInstalledApplication } = NativeModules;

  useEffect(() => {
    getAllKeys();
  }, []);

  const getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiGet(keys);
    } catch (e) {
      console.log('[error]', e);
    }
  };

  function calculateAge() {
    var ageDifMs =
      Date.now() - new Date(user?.data?.userInformation?.birthDate).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return 543 - Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const checkGoogleFitPackage = async () => {
    const isInstalled = await CheckInstalledApplication.isInstalled(
      'com.google.android.apps.fitness',
    );
    if (isInstalled) {
      refModalGoogle && refModalGoogle.current.show('default');
    } else {
      refModalGoogle && refModalGoogle.current.show('playstore');
    }
  };

  const enableHealthKit = async () => {
    // console.log('Fitness');
    // console.log(Fitness);

    let isAuthorized = await Fitness.isAuthorized(permissions);
    if (!isAuthorized) {
      isAuthorized = await Fitness.requestPermissions(permissions);
    }
    setHealthkitEnabled(isAuthorized);
  };

  // console.log('isauthen');
  // console.log(auth);
  // console.log('Info From OMA');
  // console.log(user);
  // console.log('Info From Telemed');
  // console.log(userTele.dataTele);

  const onLogOut = async () => {
    setLoading(true);
    actions.logout(response => {
      if (response.success) {
        setLoading(false);
        navigation.navigate('Loading');
      } else {
        setLoading(false);
      }
    });
    const keys = ['access_tele_token', 'access_token'];
    await AsyncStorage.multiRemove(keys);
    await AsyncStorage.setItem('USER_TYPE', 'USER');
    // console.log('Done removed');
  };
  useEffect(() => {
    if (isFocus) {
      checkVerifyIdAndUpdateForUser();
      checkAuthorized();
      sendStatistics();
    }
  }, [isFocus]);

  const checkAuthorized = async () => {
    let isAuthorized = await Fitness.isAuthorized(permissions);
    setHealthkitEnabled(isAuthorized);
  };

  const checkVerifyIdAndUpdateForUser = async () => {
    if (auth.isAuthenticated) {
      const userInfo = await fetchUserInfo(auth.data.userId);
      if (userInfo.verifyId !== auth.data.verifyId) {
        const newUserData = {
          ...user.data,
          userInformation: {
            ...userInfo,
          },
        };
        actions.loginSuccess(userInfo);
        userActions.getUserSuccess(newUserData);
      }
    }
  };

  const sendStatistics = async () => {
    try {
      // Mobile uses AsyncStorage to collect user's activities
      // Retrieve data from AsyncStorage (if any)
      const collected = await getTracking();

      // If data is found, that means Mobile has already been tracking
      if (collected !== null) {
        // But let's check our db first if this userId already exists
        const { data: r } = await axios.get(
          `${config.VA_API_URL}/dashboardData?filter[where][userId]=${auth.data.userId}`,
        );

        // these are the fields that Mobile keeps counting
        const {
          gameCount,
          diaryCount,
          pickupByEmsCount,
          healthRecordCount,
          bookingStatusCount,
          drugTakingCount,
          drugTrackingCount,
        } = collected;

        // if userId already exists in db, we'll use only index 0 for updating
        if (r.length) {
          const dashboardId = r[0]?.id;
          // use patch here because we don't want to overwrite existing item
          await axios.patch(
            `${config.VA_API_URL}/dashboardData/${dashboardId}`,
            {
              gameCount: r[0]?.gameCount + gameCount,
              diaryCount: r[0]?.diaryCount + diaryCount,
              pickupByEmsCount: r[0]?.pickupByEmsCount + pickupByEmsCount,
              healthRecordCount: r[0]?.healthRecordCount + healthRecordCount,
              bookingStatusCount: r[0]?.bookingStatusCount + bookingStatusCount,
              drugTakingCount: r[0]?.drugTakingCount + drugTakingCount,
              drugTrackingCount: r[0]?.drugTrackingCount + drugTrackingCount,
            },
          );
        } else {
          // if userId doesn't exist, that means Mobile will create a new item
          await axios.post(`${config.VA_API_URL}/dashboardData`, {
            userId: auth.data.userId,
            gameCount,
            diaryCount,
            pickupByEmsCount,
            healthRecordCount,
            bookingStatusCount,
            drugTakingCount,
            drugTrackingCount,
            telemedicineCount: 0,
            chatbotAiMessageCount: 0,
            telemedicineTimeCount: 0,
            chatbotMessageFromUserCount: 0,
            emergencyCount: 0,
          });
        }
        // reset AsyncStorage so that Mobile can start a new round
        await resetTracking();
      }
    } catch (error) {
      console.log(error, 'failed to send Statistics');
    }
  };

  const fetchUserInfo = async userId => {
    try {
      const { data } = await axios.get(
        `${config.apiUrl}/UserInfos/userInfoByPatientId?patientId=${userId}`,
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <ModalGoogleSignIn
        ref={refModalGoogle}
        openFitness={() => {
          enableHealthKit();
          refModalGoogle.current.close();
        }}
      />
      <Header
        title="บัญชีผู้ใช้"
        textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
        {auth.isAuthenticated ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.topCard}>
              {user?.data?.HIEimage ? (
                <Image
                  style={styles.profile}
                  source={{
                    uri: `data:image/png;base64,${user?.data?.HIEimage}`,
                  }}
                />
              ) : (
                <Image style={styles.profile} source={Images.avata2} />
              )}

              <Text style={styles.name}>
                {user?.data?.userInformation?.firstname}{' '}
                {user?.data?.userInformation?.lastname}
              </Text>
              <Text style={styles.age}>อายุ {calculateAge()} ปี</Text>
            </View>
            <View style={styles.bottomCard}>
              <View style={styles.category}>
                <Text style={styles.cText}>การตั้งค่าบัญชี</Text>
              </View>
              <View style={styles.card}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    navigation.navigate('SettingInfo');
                  }}
                  style={styles.item}
                >
                  <Image style={styles.icon} source={Images.setting01} />
                  <Text style={styles.option}>ข้อมูลส่วนบุคคล</Text>
                </TouchableOpacity>
                {healthkitEnabled ? (
                  <View
                    activeOpacity={0.9}
                    onPress={() => {}}
                    style={styles.item}
                  >
                    {/* <View style={{ width: 20 }} /> */}
                    {Platform.OS === 'android' ? (
                      <AndroidIcon size={25} name="google-fit" color="#ccc" />
                    ) : (
                      <Ionics
                        size={25}
                        name="ios-fitness-outline"
                        color="#ccc"
                      />
                    )}
                    <Text style={styles.optionGray}>
                      {Platform.OS === 'ios'
                        ? 'เปิดใช้ Healthkit แล้ว'
                        : 'เชื่อมต่อกับ Google Fit แล้ว'}
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={
                      Platform.OS === 'ios'
                        ? enableHealthKit
                        : checkGoogleFitPackage
                    }
                    style={styles.item}
                  >
                    {/* <View style={{ width: 20 }} /> */}
                    {Platform.OS === 'android' ? (
                      <AndroidIcon
                        size={25}
                        name="google-fit"
                        color="#0AB678"
                      />
                    ) : (
                      <Ionics
                        size={25}
                        name="ios-fitness-outline"
                        color="#0AB678"
                      />
                    )}
                    <Text style={styles.option}>
                      {Platform.OS === 'ios'
                        ? 'เปิดการใช้ Healthkit'
                        : 'เชื่อมต่อกับ Google Fit'}
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    navigation.navigate('ChangePassword', { data: auth.data });
                  }}
                  style={styles.item}
                >
                  <Image style={styles.icon} source={Images.setting02} />
                  <Text style={styles.option}>เปลี่ยนรหัสผ่าน</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {}}
                  style={styles.item}
                >
                  <Image style={styles.icon} source={Images.setting03} />
                  <Text style={styles.option}>รายการการจ่ายทั้งหมด</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {}}
                  style={[styles.item, { marginBottom: 0 }]}
                >
                  <Image style={styles.icon} source={Images.setting04} />
                  <Text style={styles.option}>แจ้งเตือน</Text>
                </TouchableOpacity> */}
              </View>
              {/* <View style={styles.category}>
                <Text style={styles.cText}>ข้อมูลโรงพยาบาล</Text>
              </View>
              <View style={styles.card}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {}}
                  style={[styles.item, { marginBottom: 0 }]}
                >
                  <Image style={styles.icon} source={Images.setting05} />
                  <Text style={styles.option}>ข้อมูลโรงพยาบาลวชิรพยาบาล</Text>
                </TouchableOpacity>
              </View> */}
              <View style={styles.category}>
                <Text style={styles.cText}>การแจ้งเตือน</Text>
              </View>
              <View style={styles.card}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {}}
                  style={styles.item}
                >
                  <Image style={styles.icon} source={Images.setting06} />
                  <Text style={styles.optionGray}>ปรับการแจ้งเตือน</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {}}
                  style={[styles.item, { marginBottom: 0 }]}
                >
                  <Image style={styles.icon} source={Images.setting07} />
                  <Text style={styles.optionGray}>ปรับรายการเข้าถึงข้อมูล</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.category}>
                <Text style={styles.cText}>ช่วยเหลือ</Text>
              </View>
              <View style={styles.card}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {}}
                  style={styles.item}
                >
                  <Image style={styles.icon} source={Images.setting08} />
                  <Text style={styles.optionGray}>ศูนย์ความปลอดภัย</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {}}
                  style={styles.item}
                >
                  <Image style={styles.icon} source={Images.setting09} />
                  <Text style={styles.optionGray}>ช่วยเหลือ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {}}
                  style={[styles.item, { marginBottom: 0 }]}
                >
                  <Image style={styles.icon} source={Images.setting10} />
                  <Text style={styles.optionGray}>แนะนำปรับปรุง</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.category}>
                <Text style={styles.cText}>LEGAL</Text>
              </View>
              <View style={styles.card}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {}}
                  style={styles.item}
                >
                  <Image style={styles.icon} source={Images.setting11} />
                  <Text style={styles.optionGray}>เงื่อนไขการใช้งาน</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {}}
                  style={[styles.item, { marginBottom: 0 }]}
                >
                  <Image style={styles.icon} source={Images.setting12} />
                  <Text style={styles.optionGray}>เพิ่มบัญชี</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.card, { marginTop: 20, marginBottom: 20 }]}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={onLogOut}
                  style={[styles.item, { marginBottom: 0 }]}
                >
                  <Image style={styles.icon} source={Images.setting13} />
                  <Text style={styles.option}>ออกจากระบบ</Text>
                </TouchableOpacity>
              </View>

              {/* <LinearGradient
                colors={['#0DA36D', '#0A7C53', '#086C48']}
                style={styles.signInOutGradient}
              >
                <TouchableOpacity
                  style={{
                    borderRadius: 12,
                    paddingVertical: 8,
                    flexDirection: 'row',
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={onLogOut}
                >
                  <Text
                    bold
                    style={{
                      alignSelf: 'center',
                      textAlign: 'center',
                      fontSize: 20,
                      color: '#FFFFFF',
                    }}
                  >
                    ออกจากระบบ
                  </Text>
                </TouchableOpacity>
              </LinearGradient> */}
            </View>
          </ScrollView>
        ) : (
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
                คุณยังไม่ได้ลงชื่อใช้งาน
              </Text>
              <Text style={{ fontSize: 18, marginTop: 5 }}>
                โปรดลงชื่อใช้งานเพื่อดูบัญชีผู้ใช้
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
        )}
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
