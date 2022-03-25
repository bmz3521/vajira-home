import React, { Component, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Switch, Grid } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AuthActions, AuthTeleActions } from '@actions';
import { BaseStyle, BaseColor, Images } from '@config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

import { Header, SafeAreaView, Icon, Text, Image } from '@components';
import styles from './styles';

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      reminders: false,
      loading: false,
      userData: [],
    };
  }

  componentDidMount() {
    let { navigation, auth } = this.props;
    // console.log('isauthen');
    let status = auth.isAuthenticated;
    // console.log(auth);
    this.getAllKeys();
  }

  getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);

      // console.log('map get key');

      return result.map(req => JSON.parse(req)).forEach(console.log);
    } catch (e) {
      // read key error
    }

    const jsonValue = await AsyncStorage.getItem('access_tele_token');
    const test = jsonValue != null ? JSON.parse(jsonValue) : null;

    // console.log(keys);
    // console.log('access tele token');

    // console.log(test);

    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  };

  onLogOut = async () => {
    this.setState(
      {
        loading: true,
      },
      () => {
        this.props.actions.logout(response => {
          if (response.success) {
            this.props.navigation.navigate('Loading');
          } else {
            this.setState({ loading: false });
          }
        });
      },
    );
    const keys = ['access_tele_token', 'access_token'];
    await AsyncStorage.multiRemove(keys);

    // console.log('Done removed');
  };

  checkWhatToRender() {
    let { navigation, auth } = this.props;
    let status = auth.isAuthenticated;
    // console.log(status);
    if (!status) {
      navigation.navigate('SignIn2');
    }

    this.setState({ loading: false });
  }

  render() {
    const { navigation, user, userTele, auth } = this.props;
    const { loading, userData } = this.state;

    // ('PROPS in Profile');
    // console.log(this.props);

    const info = (user && user.data && user.data.userInformation) || {
      img: null,
      firstname: 'anonymous',
      lastname: '',
      userId: '',
      cId: '',
      email: '',
    };

    const infoTele = (userTele && userTele.dataTele) || {
      id: 0,
      cId: 0,
      hnId: 0,
      email: '',
      fullName: '',
      nationality: '',
    };

    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
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
        <ScrollView>
          <View style={styles.contain}>
            <LinearGradient
              colors={['green', '#284F30', '#284F30']}
              style={{
                justifyContent: 'center',
                flex: 1,
                height: 150,
                width: '100%',
              }}
            >
              {auth.isAuthenticated && (
                <Image
                  style={{
                    marginBottom: 20,
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                    alignSelf: 'center',
                  }}
                  source={Images.avata2}
                />
              )}
            </LinearGradient>
            {/* <ProfilePerformance

                            data={user.performance}
                            style={{ marginTop: 20, marginBottom: 20 }}
                        /> */}
            <View style={{ width: '100%' }}>
              {auth.isAuthenticated && (
                <>
                  <View
                    style={[
                      {
                        backgroundColor: '#F7F7F7',
                        borderColor: '#F7F7F7',
                        borderRadius: 8,
                        borderWidth: 10,
                      },
                    ]}
                  >
                    <Text bold subhead>
                      การตั้งค่าบัญชี
                    </Text>
                    {/*
                    <Text bold subhead>
                      Telemed ID: {infoTele.userId}
                    </Text>
                    <Text bold subhead>
                      OMA ID:{info.userId}
                    </Text> */}
                  </View>

                  <TouchableOpacity
                    style={styles.profileItem}
                    onPress={() => {
                      // navigation.navigate('ProfileEdit');
                    }}
                  >
                    <View style={{ width: '20%' }}>
                      <Image
                        source={{
                          uri:
                            'https://storage.googleapis.com/ever-storage/icon/mobileapp/profile.png',
                        }}
                        // source={Images.personal}
                        style={{
                          width: 30,
                          height: 40,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      />
                    </View>
                    <Text body1>ประวัติส่วนบุคคล</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.profileItem}
                    onPress={() => {
                      // navigation.navigate('PaymentPayouts');
                    }}
                  >
                    <View style={{ width: '20%' }}>
                      {/* <Icon
                    name="money-bill-alt"
                    size={30}
                    color={BaseColor.darkprimaryColor}
                  /> */}
                      <Image
                        source={{
                          uri:
                            'https://storage.googleapis.com/ever-storage/icon/mobileapp/paymentpayout.png',
                        }}
                        // source={Images.paymentpayouts}
                        style={{
                          width: 50,
                          height: 25,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      />
                    </View>

                    <Text body1>รายการการจ่ายทั้งหมด</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.profileItem}
                    onPress={() => {
                      // navigation.navigate('Notifications');
                    }}
                  >
                    <View style={{ width: '21%' }}>
                      {/* <Icon
                    name="bell"
                    size={30}
                    color={BaseColor.darkprimaryColor}
                  /> */}
                      <Image
                        source={{
                          uri:
                            'https://storage.googleapis.com/ever-storage/icon/mobileapp/notification.png',
                        }}
                        // source={Images.notification}
                        style={{
                          width: 30,
                          height: 30,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      />
                    </View>

                    <Text body1>แจ้งเตือน</Text>
                  </TouchableOpacity>
                </>
              )}

              <View
                style={[
                  {
                    backgroundColor: '#F7F7F7',
                    borderColor: '#F7F7F7',
                    borderRadius: 8,
                    borderWidth: 10,
                    marginTop: 15,
                  },
                ]}
              >
                <Text bold subhead>
                  ข้อมูล
                </Text>
              </View>

              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  // navigation.navigate('ListYourSpace');
                }}
              >
                <View style={{ width: '20%' }}>
                  {/* <Icon
                    name="building"
                    size={30}
                    color={BaseColor.darkprimaryColor}
                  /> */}
                  <Image
                    source={{
                      uri:
                        'https://storage.googleapis.com/ever-storage/icon/mobileapp/travel.png',
                    }}
                    // source={Images.travellist}
                    style={{
                      width: 45,
                      height: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>

                <Text body1>ข้อมูลโรงพยาบาลวชิรพยาบาล</Text>
              </TouchableOpacity>

              {auth.isAuthenticated && (
                <>
                  <View
                    style={[
                      {
                        backgroundColor: '#F7F7F7',
                        borderColor: '#F7F7F7',
                        borderRadius: 8,
                        borderWidth: 10,
                        marginTop: 15,
                      },
                    ]}
                  >
                    <Text bold subhead>
                      การแจ้งเตือน
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.profileItem}
                    onPress={() => {
                      // navigation.navigate('InviteFriends');
                    }}
                  >
                    <View style={{ width: '20%' }}>
                      {/* <Icon
                    name="paper-plane"
                    size={30}
                    color={BaseColor.darkprimaryColor}
                  /> */}
                      <Image
                        source={{
                          uri:
                            'https://storage.googleapis.com/ever-storage/icon/mobileapp/inviterefer.png',
                        }}
                        // source={Images.inviterefer}
                        style={{
                          width: 45,
                          height: 40,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      />
                    </View>

                    <Text body1>ปรับการแจ้งเตือน</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.profileItem}
                    onPress={() => {
                      // navigation.navigate('ReferaHost');
                    }}
                  >
                    <View style={{ width: '20%' }}>
                      {/* <Icon
                    name="reply"
                    size={30}
                    color={BaseColor.darkprimaryColor}
                  /> */}
                      <Image
                        source={{
                          uri:
                            'https://storage.googleapis.com/ever-storage/icon/mobileapp/inviterefer.png',
                        }}
                        // source={Images.inviterefer}
                        style={{
                          width: 45,
                          height: 40,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      />
                    </View>

                    <Text body1>ปรับรายการเข้าถึงข้อมูล</Text>
                  </TouchableOpacity>
                </>
              )}
              <View
                style={[
                  {
                    backgroundColor: '#F7F7F7',
                    borderColor: '#F7F7F7',
                    borderRadius: 8,
                    borderWidth: 10,
                    marginTop: 15,
                  },
                ]}
              >
                <Text bold subhead>
                  ช่วยเหลือ
                </Text>
              </View>

              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  // navigation.navigate('SafetyCenter');
                }}
              >
                <View style={{ width: '20%' }}>
                  {/* <Icon
                    name="user-shield"
                    size={30}
                    color={BaseColor.darkprimaryColor}
                  /> */}
                  <Image
                    source={{
                      uri:
                        'https://storage.googleapis.com/ever-storage/icon/mobileapp/safetycenter.png',
                    }}
                    // source={Images.safetycenter}
                    style={{
                      width: 45,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>

                <Text body1>ศูนย์ความปลอดภัย</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  // navigation.navigate('GetHelp');
                }}
              >
                <View style={{ width: '20%' }}>
                  {/* <Icon
                    name="question-circle"
                    size={30}
                    color={BaseColor.darkprimaryColor}
                  /> */}
                  <Image
                    source={{
                      uri:
                        'https://storage.googleapis.com/ever-storage/icon/mobileapp/gethelp.png',
                    }}
                    // source={Images.gethelp}
                    style={{
                      width: 45,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>

                <Text body1>ช่วยเหลือ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  // navigation.navigate('GiveUsFeedback');
                }}
              >
                <View style={{ width: '20%' }}>
                  {/* <Icon
                    name="edit"
                    size={30}
                    color={BaseColor.darkprimaryColor}
                  /> */}
                  <Image
                    source={{
                      uri:
                        'https://storage.googleapis.com/ever-storage/icon/mobileapp/giveusfeedback.png',
                    }}
                    // source={Images.giveus}
                    style={{
                      width: 45,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>

                <Text body1>แนะนำปรับปรุง</Text>
              </TouchableOpacity>

              <View
                style={[
                  {
                    backgroundColor: '#F7F7F7',
                    borderColor: '#F7F7F7',
                    borderRadius: 8,
                    borderWidth: 10,
                    marginTop: 15,
                  },
                ]}
              >
                <Text bold subhead>
                  Legal
                </Text>
              </View>

              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  // navigation.navigate('TermsofService');
                }}
              >
                <View style={{ width: '20%' }}>
                  {/* <Icon
                    name="user"
                    size={30}
                    color={BaseColor.darkprimaryColor}
                  /> */}
                  <Image
                    source={{
                      uri:
                        'https://storage.googleapis.com/ever-storage/icon/mobileapp/termofservice.png',
                    }}
                    // source={Images.termservice}
                    style={{
                      width: 45,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>

                <Text body1>เงื่อนไขการใช้งาน</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileItem}
                onPress={() => {
                  // navigation.navigate('SwitchAccount');
                }}
              >
                <View style={{ width: '20%' }}>
                  <Image
                    source={{
                      uri:
                        'https://storage.googleapis.com/ever-storage/icon/mobileapp/switchaccount.png',
                    }}
                    // source={Images.switchaccount}
                    style={{
                      width: 45,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>

                <Text body1>เพิ่มบัญชี</Text>
              </TouchableOpacity>
            </View>
          </View>
          {!auth.isAuthenticated ? (
            <LinearGradient
              colors={['#0DA36D', '#0A7C53', '#086C48']}
              style={styles.signInOutGradient}
            >
              <TouchableOpacity
                style={{
                  borderRadius: 12,
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('SignIn2')}
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
                  เข้าสู่ระบบ
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          ) : (
            <View style={{ padding: 0 }}></View>
          )}
          {auth.isAuthenticated && (
            <LinearGradient
              colors={['#0DA36D', '#0A7C53', '#086C48']}
              style={styles.signInOutGradient}
            >
              <TouchableOpacity
                style={{
                  borderRadius: 12,
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => this.onLogOut()}
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
            </LinearGradient>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
