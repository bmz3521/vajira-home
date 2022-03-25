import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  BackHandler,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AirbnbRating } from 'react-native-elements';
import storage from '@react-native-firebase/storage';
import { Button } from 'native-base';
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
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { find } from 'lodash';
import {
  TwilioVideoParticipantView,
  TwilioVideoLocalView,
  TwilioVideo,
} from 'react-native-twilio-video-webrtc';
import axios from 'axios';
import { BaseColor } from '@config';
import { Header, Icon } from '@components';
import { getAccessTeleToken } from '@utils/asyncStorage';
import { setChatNoti, getChatNoti } from '@utils/asyncStorage';
import PenddingScreen from '@screens/Telepending';
import ChatMessages from '@screens/ChatMessages';
import ChatIcon from '@assets/images/chat-icon.png';
import styles from './styles';
import { State } from 'react-native-image-zoom-viewer/built/image-viewer.type';
import database from '@react-native-firebase/database';
import { useFocusEffect } from '@react-navigation/native';
import KeepAwake from 'react-native-keep-awake';
import Loading from '@components/Loading';

const Mute = require('../../assets/images/mute.png');
const Unmute = require('../../assets/images/unmute.png');
const Flip = require('../../assets/images/flip.png');
const End = require('../../assets/images/end.png');
import config from '@_config';

const { width, height } = Dimensions.get('window');
function VideoCall({ navigation, props, route, userId }) {
  const {
    bookingId,
    otherType,
    otherTypeName,
    setJoined,
    officer,
    doctor,
  } = route.params;
  const telemedicine = useSelector(state => state.telemedicine);
  const userTele = useSelector(state => state.userTele);
  const [chatShow, setChatScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [status, setStatus] = useState('disconnected');
  const [participants, setParticipants] = useState(new Map());
  const [videoTracks, setVideoTracks] = useState(new Map());
  const [token, setToken] = useState('');
  const [doctorJoined, setDoctorJoined] = useState(false);
  const [patientInWaiting, setPatientInWaiting] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(false);
  const [survey, setSurvey] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [firebaseStatus, setFirebaseStatus] = useState(null);
  const [room, setRoom] = useState(false);
  const [date, setDate] = useState(Date.now());
  const [isRoomNow, setIsRoomNow] = useState(null);
  const [minutesCounter, setMinutesCounter] = useState('00');
  const [secondsCounter, setSecondsCounter] = useState('00');
  const minutesRef = useRef('00');
  const secondsRef = useRef('00');
  const [onFlip, setOnFlip] = useState(false);
  const twilioRef = useRef(null);
  const [orientation, setOrientation] = useState(
    width < height ? 'Portrait' : 'Landscape',
  );
  const [noti, setNoti] = useState(0);
  const [switchVertical, setSwitchVertical] = useState(false);
  const userTeleId = userTele?.dataTele?.userId;
  let doctorTeleId = 0;
  if (telemedicine?.data?.doctor?.id) {
    doctorTeleId = telemedicine.data.doctor.id;
  }

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        twilioRef.current.disconnect();
      };
    }, []),
  );

  useEffect(() => {
    if (
      firebaseStatus &&
      (firebaseStatus === 'doctorJoin' || firebaseStatus === 'pharmacyJoin')
    ) {
      init();
      setDoctorJoined(true);
      setPatientInWaiting(false);
      setChatScreen(false);
    }
  }, [firebaseStatus]);

  useEffect(() => {
    if (isRoomNow) {
      init();
      setDoctorJoined(true);
      setPatientInWaiting(false);
      setChatScreen(false);
    }
  }, [date]);

  useEffect(() => {
    const getNoti = async () => {
      const x = await getChatNoti();
      setNoti(x);
    };

    let countTimer;

    if ((patientInWaiting && !doctorJoined) || chatShow) {
      countTimer = setInterval(() => {
        getNoti();
      }, 5000);
    }

    return () => {
      console.log('clearing noti interval...');
      clearInterval(countTimer);
    };
  }, [noti, patientInWaiting]);

  const clearNoti = value => {
    setNoti(0);
    setChatNoti(0);
  };

  useEffect(() => {
    minutesRef.current = minutesCounter;
    secondsRef.current = secondsCounter;
  });

  useEffect(() => {
    // Pending Screen Count Timer
    let countTimer;
    if ((patientInWaiting && !doctorJoined) || chatShow) {
      countTimer = setInterval(() => {
        var sec = (Number(secondsRef.current) + 1).toString();
        var min = minutesRef.current;
        if (Number(secondsRef.current) == 60) {
          min = (Number(minutesRef.current) + 1).toString();
          sec = '00';
        }
        sec = sec.length == 1 ? '0' + sec : sec;
        min = min.length == 1 ? '0' + min : min;
        setSecondsCounter(sec);
        setMinutesCounter(min);
      }, 1000);
    }

    return () => {
      clearInterval(countTimer);
    };
  }, [patientInWaiting]);

  const fetchSurvey = async () => {
    let checkSurvey = false;
    const response = await axios.get(
      `${config.apiUrl}/surveyForms?filter[where][surveyUserId]=${userTeleId}`,
    );
    if (response?.data?.length) {
      response.data.map(filterData => {
        const {
          ratingApp,
          waitingTimeApp,
          appointmentStatApp,
          transportCostApp,
          healCostApp,
          admitTimeApp,
          recommendApp,
        } = filterData.detail[0];
        if (
          Number(ratingApp) > 0 &&
          Number(waitingTimeApp) > 0 &&
          Number(appointmentStatApp) > 0 &&
          Number(transportCostApp) > 0 &&
          Number(healCostApp) > 0 &&
          Number(admitTimeApp) > 0 &&
          Number(recommendApp) > 0
        ) {
          checkSurvey = true;
        } else if (Number(recommendApp) > 0) {
          checkSurvey = 7;
        }
      });
      setSurvey(checkSurvey);
    }
  };

  useEffect(() => {
    if (setJoined) {
      init();
      setDoctorJoined(true);
      setPatientInWaiting(false);
      setChatScreen(false);
    }
    fetchSurvey();
  }, [setJoined]);

  useEffect(() => {
    KeepAwake.activate();
    checkRoomName();
  }, []);

  useEffect(() => {
    if (room && isRoomNow === null) {
      checkIsRoomNow();
    }
  }, [room]);

  useEffect(() => {
    const unsub = navigation.addListener('beforeRemove', e => {
      if (isBack) {
        return;
      }
      e.preventDefault();
      alertGoBack();
    });
    return unsub;
  }, [navigation, isBack]);

  useEffect(() => {
    if (isBack) {
      cancelRoom();
      navigation.goBack();
    }
  }, [isBack]);

  const alertGoBack = () => {
    Alert.alert('หมายเหตุ', 'คุณแน่ใจหรือไม่ที่จะออกจากห้องรอ ?', [
      {
        text: 'ไม่ใช่',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'ใช่',
        onPress: () => {
          setIsBack(true);
        },
      },
    ]);
  };

  const cancelRoom = () => {
    let room = '';
    let ref;
    if (officer) {
      room = `patient${userTeleId}pharmacy`;
    } else if (doctorTeleId && otherType) {
      // if (otherType === 'nurse') {
      room = `patient${userTeleId}${otherType}${doctorTeleId}`;
      // } else if (otherType === 'physiotherapist') {
      //   room = `patient${userTeleId}physiotherapist${doctorTeleId}`;
      // } else {
      //   room = `patient${userTeleId}doctor${doctorTeleId}`;
      // }
    }
    ref = database().ref(`/patientStatus/${room}`);
    if (doctorTeleId) {
      ref.set({
        date: '',
        status: 'completed',
        officerId: doctorTeleId,
        userId: userTeleId,
        bookingId: bookingId,
      });
    } else {
      ref.set({
        date: '',
        status: 'completed',
        userId: userTeleId,
        bookingId: bookingId,
      });
    }
  };

  const checkIsRoomNow = async () => {
    let ref = database().ref(`/patientStatus/${room}`);
    const snap = await ref.once('value');
    let isRoom = false;
    Object.keys(snap).map((key, index) => {
      if (isRoomNow === null) {
        if (!!snap[key]?.value?.date) {
          isRoom = true;
          setIsRoomNow(true);
          setDate(snap[key]?.value?.date);
        } else if (!isRoom) {
          setIsRoomNow(false);
          goLive();
        }
      }
    });
  };

  const requestAudioPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'คำขอการเข้าถึงเสียง',
          message: 'แอปต้องการเข้าถึงเสียงของคุณ',
          buttonNeutral: 'ไว้ทีหลัง',
          buttonNegative: 'ยกเลิก',
          buttonPositive: 'ตกลง',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('You can use the microphone');
      } else {
        // console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'คำขอการเข้าถึงกล้อง',
          message: 'แอปต้องการเข้าถึงกล้องของคุณ',
          buttonNeutral: 'ไว้ทีหลัง',
          buttonNegative: 'ยกเลิก',
          buttonPositive: 'ตกลง',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('You can use the camera');
      } else {
        // console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const checkRoomName = () => {
    let name = '';
    console.log(
      `otherType = ${otherType} userTeleId = ${userTeleId} doctorTeleId = ${doctorTeleId} `,
    );
    if (officer) {
      name = `patient${userTeleId}pharmacy`;
    } else if (doctorTeleId && otherType) {
      //   if (otherType === 'nurse') {
      name = `patient${userTeleId}${otherType}${doctorTeleId}`;
      // } else if (otherType === 'physiotherapist') {
      //   name = `patient${userTeleId}physiotherapist${doctorTeleId}`;
      // } else {
      //   name = `patient${userTeleId}doctor${doctorTeleId}`;
      // }
    }
    console.log('helooo -========', name);
    setRoom(name);
  };

  const goLive = async () => {
    let ref;
    ref = database().ref(`/patientStatus/${room}`);
    if (doctorTeleId) {
      ref.set({
        date: date,
        status: 'inWaitingRoom',
        officerId: doctorTeleId,
        userId: userTeleId,
        bookingId: bookingId,
      });
    } else {
      ref.set({
        date: date,
        status: 'inWaitingRoom',
        userId: userTeleId,
        bookingId: bookingId,
      });
    }
    ref.on('value', value => {
      value.forEach(v => {
        if (v.key === 'status') {
          setFirebaseStatus(v.val());
        }
      });
    });
  };

  const onConnecting = async data => {
    const { userId } = await getAccessTeleToken();
    twilioRef.current.connect({
      roomName: room + date,
      accessToken: data.token,
    });
    setStatus('connecting');
  };

  const init = async () => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `${config.VA_API_URL}/Communications/getToken`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { userId } = await getAccessTeleToken();
      await setToken(userId);
      if (data) {
        await requestAudioPermission();
        await requestCameraPermission();
        await onConnecting(data);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error');
    }
  };

  const _onRoomDidConnect = () => {
    setStatus('connected');
  };

  const _onRoomDidDisconnect = ({ error }) => {
    setStatus('disconnected');
  };

  const _onRoomDidFailToConnect = error => {
    setStatus('disconnected');
  };

  const _onParticipantAddedVideoTrack = ({ participant, track }) => {
    setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track.trackSid,
          { participantSid: participant.sid, videoTrackSid: track.trackSid },
        ],
      ]),
    );
    let ref = database().ref(`/patientStatus/${room}`);
    ref.update({
      status: 'calling',
    });
    setDoctorJoined(true);
  };

  const _onParticipantRemovedVideoTrack = ({ participant, track }) => {
    setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track.trackSid,
          { participantSid: participant.sid, videoTrackSid: track.trackSid },
        ],
      ]),
    );
    KeepAwake.deactivate();

    console.log('clear chat noti');
    clearNoti();

    const header =
      officer === 'pharmacy'
        ? 'เสร็จสิ้นการปรึกษาเภสัชกร'
        : otherType === 'physiotherapist'
        ? 'เสร็จสิ้นการปรึกษานักกายภาพบำบัด'
        : otherType === 'nurse'
        ? 'เสร็จสิ้นการปรึกษาพยาบาล'
        : 'เสร็จสิ้นการปรึกษาแพทย์';
    let description = false;
    let bottom = [];
    if (survey === 7 || !survey) {
      bottom.push(
        {
          text: 'ตกลง',
          onPress: () => {
            navigation.navigate('PostSurvey', {
              bookingId: bookingId,
              userTeleId: userTeleId,
              skipStep: false,
            });
          },
        },
        {
          text: 'ข้าม',
          onPress: () =>
            survey === 7
              ? navigation.navigate('Home')
              : navigation.navigate('PostSurvey', {
                  bookingId: bookingId,
                  userTeleId: userTeleId,
                  skipStep: true,
                }),
        },
      );
      description =
        'ขอความร่วมมือท่านสักครู่ ในการทำแบบสอบถาม เพื่อพัฒนาและปรับปรุงแอปพลิเคชันให้ดียิ่งขึ้น';
    } else if (survey) {
      bottom.push({
        text: 'ตกลง',
        onPress: () => {
          navigation.navigate('Home');
        },
      });
    }
    Alert.alert(header, description || '', bottom, { cancelable: false });
  };

  const _onEndButtonPress = () => {
    setPatientInWaiting(true);
  };

  const closeChatScreen = () => {
    setChatScreen(false);
  };

  const closePage = () => {
    _onEndButtonPress();
    navigation.navigate('Home');
  };

  const _onMuteButtonPress = () => {
    twilioRef.current
      .setLocalAudioEnabled(!isAudioEnabled)
      .then(isEnabled => setIsAudioEnabled(isEnabled));
  };

  const _onFlipButtonPress = () => {
    twilioRef.current.flipCamera();
    setOnFlip(!onFlip);
  };

  const createRating = () => {
    axios
      .post(`${config.apiUrl}/surveyForms`, {
        bookingId,
        surveyUserId: userTeleId,
        detail: {
          ratingAll: rating,
        },
      })
      .then(function(response) {
        Alert.alert(
          'ส่งแบบสอบถามสำเร็จ!',
          'ขอขอบคุณที่ท่านกรุณาสละเวลาในการตอบแบบสอบถาม',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Home');
              },
            },
          ],
          { cancelable: false },
        );
      })
      .catch(function(error) {
        console.log('Error', error);
      });
  };

  const connected = status === 'connected' || status === 'connecting';
  console.log('verticall click ====', switchVertical);
  return (
    <SafeAreaView style={styles.container}>
      <Loading isVisible={loading} />
      <Modal
        isVisible={modalVisible}
        backdropOpacity={1}
        animationIn="fadeIn"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
      >
        <View style={{ backgroundColor: '#ffffff' }}>
          <AirbnbRating
            count={5}
            reviews={[
              'ไม่แนะนำ',
              'ไม่ค่อยแนะนำ',
              'แนะนำ',
              'แนะนำมาก',
              'แนะนำอย่างมาก',
            ]}
            onFinishRating={rating => setRating(rating)}
            defaultRating={5}
          />
          <View>
            <Button
              onPress={() => {
                createRating();
                setModalVisible(false);
              }}
              full
              success
              style={{ marginTop: 20 }}
            >
              <Text>ยืนยัน</Text>
            </Button>
          </View>
        </View>
      </Modal>
      {patientInWaiting && doctorJoined && connected && (
        <TouchableOpacity
          onPress={() => setPatientInWaiting(false)}
          style={{
            backgroundColor: '#284F30',
            position: 'absolute',
            borderRadius: 30,
            flexDirection: 'row',
            width: 320,
            height: 90,
            elevation: 50,
            zIndex: 50,
            top: 400,
            right: 30,
          }}
        >
          <BarIndicator style={{ marginTop: -20 }} color={'green'} />
          <Icon
            name="phone"
            style={{
              fontSize: 50,
              color: 'white',
              paddingTop: 12,
              paddingLeft: 15,
            }}
          />
          <Text
            style={{
              paddingVertical: 10,
              color: 'white',
              alignSelf: 'center',
              fontSize: 15,
              paddingHorizontal: 5,
              flexWrap: 'wrap',
              width: 180,
            }}
          >
            เภสัชกรอยู่ในสายแล้ว คลิกที่นี่ เพื่อเข้าสู่การโทร
          </Text>
        </TouchableOpacity>
      )}
      {chatShow ? (
        <ChatMessages
          setChatScreen={condition => setChatScreen(condition)}
          bookingId={bookingId}
          clearNoti={item => clearNoti(item)}
        />
      ) : patientInWaiting && !doctorJoined ? (
        <PenddingScreen
          cancelRoom={() => alertGoBack()}
          closePage={() => closePage()}
          navigation={navigation}
          telemedicine={telemedicine}
          officer={officer}
          otherTypeName={otherTypeName}
          otherType={otherType}
          minutesCounter={minutesRef.current}
          secondsCounter={secondsRef.current}
          setChatScreen={condition => setChatScreen(condition)}
          chatNoti={noti}
        />
      ) : (
        <View style={styles.callWrapper}>
          {status === 'connected' && (
            <View style={styles.remoteGrid}>
              {Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                if (trackSid && trackIdentifier) {
                  return (
                    <TwilioVideoParticipantView
                      style={
                        switchVertical
                          ? styles.remoteVideoVertical
                          : styles.remoteVideo
                      }
                      key={trackSid}
                      trackIdentifier={trackIdentifier}
                    />
                  );
                }
                return null;
              })}
            </View>
          )}
          <View style={styles.optionsTop}>
            <TouchableOpacity
              style={styles.optionsTop}
              onPress={() => setSwitchVertical(!switchVertical)}
            >
              <View style={styles.Small}>
                <Icon
                  name={'mobile'}
                  style={{
                    transform: [{ rotate: switchVertical ? '270deg' : '0deg' }],
                    color: '#17B87B',
                    fontSize: 25,
                  }}
                />
                <Text style={styles.greenText}>
                  {switchVertical ? 'แนวนอน' : 'แนวตั้ง'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.options}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setOnFlip(!onFlip)}
            >
              <View style={styles.circleSmall}>
                <Text style={styles.greenText}>
                  {onFlip ? 'มุมกระจก' : 'มุมภาพจริง'}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setChatScreen(true)}
            >
              <View style={styles.circleSmall}>
                <Icon name="comment-dots" style={styles.greenIcon} />
                <Text style={styles.greenText}>ข้อความ</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={_onMuteButtonPress}
            >
              {isAudioEnabled ? (
                <View style={styles.circleSmall}>
                  <Icon name="microphone" style={styles.greenIcon} />
                  <Text style={styles.greenText}>ไมค์</Text>
                </View>
              ) : (
                <View style={styles.circleSmall}>
                  <Icon name="microphone-slash" style={styles.greenIcon} />
                  <Text style={styles.greenText}>ไมค์</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={_onFlipButtonPress}
            >
              <View style={styles.circleSmall}>
                <Icon name="camera" style={styles.greenIcon} />
                <Text style={styles.greenText}>กล้อง</Text>
              </View>
            </TouchableOpacity>
            <TwilioVideoLocalView
              enabled={status === 'connected'}
              style={[
                styles.localVideo,
                {
                  transform: [{ scaleX: onFlip ? 1 : -1 }],
                },
              ]}
            />
          </View>
        </View>
      )}
      <TwilioVideo
        ref={twilioRef}
        onRoomDidConnect={_onRoomDidConnect}
        onRoomDidDisconnect={_onRoomDidDisconnect}
        onRoomDidFailToConnect={_onRoomDidFailToConnect}
        onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
        onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
      />
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.user,
    userTele: state.userTele,
  };
};

export default connect(mapStateToProps)(VideoCall);
