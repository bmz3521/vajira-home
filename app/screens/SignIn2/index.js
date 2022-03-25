import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { AuthActions } from '@actions';
import { bindActionCreators } from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  TouchableHighlight,
  Dimensions,
  Platform,
} from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';
import { BaseStyle, BaseColor, Images } from '@config';
import { Header, SafeAreaView, Icon, Text, Button, Image } from '@components';
import styles from './styles';
import { useHooks } from './hooks';
import Loading from '@components/Loading';
import NetworkStateChecker from '@components/NetworkState';
import config from '@_config';
import { getFcmToken, getAccessToken } from '@utils/asyncStorage';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
const { width, height } = Dimensions.get('window');
GoogleSignin.configure();

function SignIn2(props) {
  const { navigation, user, auth } = props;
  const {
    email,
    password,
    ready,
    loading,
    events,
    fail,
    modalVisible,
  } = useHooks(props);
  const cRef = useRef();
  const [hidden, setHidden] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [onLoad, setOnLoad] = useState(true);
  const [orientation, setOrientation] = useState(
    width < height ? 'Portrait' : 'Landscape',
  );
  const [buttonWidth, setButtonWidth] = useState(width);
  const label = [
    { name: 'เข้าสู่ระบบ' },
    { name: 'เข้าสู่ระบบโดยแพทย์และเจ้าหน้าที่' },
  ];
  const addFcmToken = async userId => {
    try {
      const { id } = await getAccessToken();
      const fcmToken = await getFcmToken();
      const res = await axios.post(
        `${config.apiUrl}/userFcmTokens/upsertWithWhere?where={"fcmToken":"${fcmToken}"}&access_token=${id}`,
        {
          fcmToken,
          userId,
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      addFcmToken(auth.data.userId);
    }
    setTimeout(() => {
      setOnLoad(false);
    }, 300);
    Dimensions.addEventListener('change', ({ window: { width, height } }) => {
      width < height ? setOrientation('Portrait') : setOrientation('Landscape');
      setButtonWidth(width);
    });
  }, [auth.isAuthenticated]);

  const RenderButtonLogin = ({ item, index }) => {
    return (
      <View key={index} style={{ width: buttonWidth - 40 }}>
        <LinearGradient
          colors={['#0DA36D', '#0A7C53', '#086C48']}
          style={styles.signInGradient}
        >
          <TouchableOpacity
            full
            disabled={!email && !password && password.length < 5}
            loading={loading}
            fail={fail}
            style={{
              borderRadius: 12,
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 15,
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'center',
            }}
            onPress={
              index === 0
                ? events.handleLoginWithEmail()
                : events.handleDoctorLogin()
            }
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
              {item.name}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <NetworkStateChecker fixedHeader={true} />

      <Header
        title="การเข้าใช้ระบบ"
        textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      <Loading isVisible={loading} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <Text
            style={{
              textAlign: 'left',
              color: '#284F30',
              marginBottom: 5,
              marginTop: 15,
              marginHorizontal: 20,
              fontSize: 18,
            }}
          >
            คุณสามารถทำการยืนยันตนเพื่อสมัครได้ที่ห้องบัตร หรือผ่าน V-KYC
          </Text>

          {!fail && auth.error && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                marginHorizontal: 20,
                padding: 10,
                borderWidth: 1,
                borderRadius: 12,
                borderColor: '#ccc',
              }}
            >
              <Text style={{ color: '#CC4344' }}>
                หมายเลขบัตรประจำตัวประชาชน
              </Text>
              <Text style={{ color: '#CC4344' }}>หรือรหัสผ่านไม่ถูกต้อง</Text>
              <Text style={{ color: '#CC4344' }}>ลองใหม่อีกครั้ง</Text>
            </View>
          )}

          <View style={styles.contain}>
            <Text
              bold
              style={{
                textAlign: 'left',
                color: '#284F30',
                marginBottom: 10,
                fontSize: 17,
              }}
            >
              {activeIndex ? 'อีเมล' : 'เลขประจำตัวประชาชน'}
            </Text>

            <TextInput
              style={[
                BaseStyle.textInput,
                {
                  fontSize: 16,
                  height: 'auto',
                  padding: 12,
                  marginBottom: -1,
                  borderRadius: 12,
                  borderColor: '#CCCCCC',
                  // borderColor:
                  //   auth && auth.error && auth.error ? 'red' : '#CCCCCC',
                  borderWidth: 1,
                  backgroundColor: 'white',
                },
              ]}
              onChangeText={events.handleChangeText('email')}
              autoCorrect={false}
              placeholder={
                activeIndex
                  ? 'กรอกที่อยู่อีเมล'
                  : 'กรอกเลขบัตรประจำตัวประชาชน (จำนวน 13 หลัก)'
              }
              placeholderTextColor="#7c7b7b"
              value={email}
              selectionColor={BaseColor.primaryColor}
            />
            <Text
              bold
              style={{
                textAlign: 'left',
                color: '#284F30',
                marginTop: 20,
                marginBottom: 10,
                fontSize: 17,
              }}
            >
              รหัสผ่าน
            </Text>
            <View>
              <TextInput
                style={[
                  BaseStyle.textInput,
                  {
                    fontSize: 16,
                    height: 'auto',
                    padding: 12,
                    marginBottom: -1,
                    borderRadius: 12,
                    borderColor: '#CCCCCC',
                    // borderColor:
                    //   auth && auth.error && auth.error ? 'red' : '#CCCCCC',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    color: 'black',
                  },
                ]}
                onChangeText={events.handleChangeText('password')}
                placeholder="กรอกรหัสผ่าน"
                placeholderTextColor="#7c7b7b"
                secureTextEntry={hidden}
                value={password}
                selectionColor={BaseColor.primaryColor}
              />
              <TouchableOpacity
                style={{ position: 'absolute', right: 0, padding: 20 }}
                onPress={() => (hidden ? setHidden(false) : setHidden(true))}
              >
                {hidden ? (
                  <Icon name="eye-slash" size={18} color="black" />
                ) : (
                  <Icon name="eye" size={18} color="black" />
                )}
              </TouchableOpacity>
              {auth.error == 'LOGIN_FAILED' ? (
                <Text style={{ color: 'red' }}>การลงชื่อเข้าใช้ผิดพลาด</Text>
              ) : (
                <Text></Text>
              )}
            </View>

            {auth &&
              auth.error &&
              auth.error.err &&
              auth.error.err.statusCode === 500 && (
                <View>
                  <Text
                    style={{
                      marginTop: 10,
                      color: 'red',
                    }}
                  >
                    กรุณาเชื่อมต่อเข้ากับอินเตอร์เน็ต
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('UserRegistation')}
                  >
                    <View></View>
                  </TouchableOpacity>
                </View>
              )}
            <View>
              {onLoad === false && (
                <Carousel
                  ref={cRef}
                  layout="default"
                  data={label}
                  sliderWidth={width}
                  itemWidth={width}
                  renderItem={RenderButtonLogin}
                  onSnapToItem={index => setActiveIndex(index)}
                />
              )}
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  marginTop: 15,
                }}
              >
                พบปัญหาการเข้าสู่ระบบ
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ChangePassword', {
                    data: 'forgot_password',
                  })
                }
                // onPress={() => navigation.navigate('UserRegistation')}
              >
                <Text
                  style={{
                    marginTop: 5,
                    color: '#095A3B',
                  }}
                >
                  {/* ติดต่อเรา */}
                  ลืมรหัสผ่าน
                </Text>
              </TouchableOpacity>
            </View>

            {/* <View
            style={{
              marginVertical: 30,
              borderBottomWidth: 1,
              borderColor: '#CCCCCC',
            }}
          /> */}
            <View style={{ flexDirection: 'row', marginVertical: 25 }}>
              <View style={styles.line} />
              <Text style={styles.lineText}>หรือ</Text>
              <View style={styles.line} />
            </View>
            <TouchableOpacity
              full
              loading={loading}
              style={styles.kvcButton}
              onPress={() => navigation.navigate('UserRegistation')}
            >
              <Text
                bold
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color: '#095A3B',
                }}
              >
                สมัครสมาชิก ผ่าน V-Kyc
              </Text>
            </TouchableOpacity>
            <View style={{ alignItems: 'center', marginTop: 15 }}>
              <TouchableOpacity
                full
                onPress={() => navigation.navigate('FaqMain')}
              >
                <Text
                  style={{
                    marginTop: 12,
                    color: '#095A3B',
                    fontSize: 11,
                    textAlign: 'center',
                  }}
                >
                  การยืนยันตัวตนด้วยภาพผ่านระบบ VAJIRA-KNOW YOUR CUSTOMER หรือ
                  V-KYC คืออะไร?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* {!fail && auth.error && (
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Icon
                    name="times-circle"
                    size={60}
                    style={{ color: '#CC4344' }}
                  />
                  <Text style={styles.modalTitle}>ขออภัยครับ/ค่ะ</Text>
                  <Text style={styles.modalText}>
                    หมายเลขบัตรประจำตัวประชาชน
                  </Text>
                  <Text style={styles.modalText}>หรือรหัสผ่านไม่ถูกต้อง</Text>

                  <TouchableHighlight
                    style={{
                      ...styles.openButton,
                      backgroundColor: '#CC4344',
                    }}
                    onPress={events.handleModal()}
                  >
                    <Text style={styles.textStyle}>ลองใหม่อีกครั้ง</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>
        )} */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn2);
