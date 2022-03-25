import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Linking,
  Alert,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import config from '@_config';
import axios from 'axios';
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from 'react-native-twilio-video-webrtc';
import RNTextArea from '@freakycoder/react-native-text-area';
import { BaseStyle, BaseColor, Images, FontFamily } from '@config';
import { NetworkStateChecker, Header, Icon, Image, ModalUI } from '@components';
import { Icon as IconDropDown } from 'react-native-elements';
import styles, { ProfileImage } from './styles';
import { getKycPatientImages } from '@services/kycService';
import { getTwilioToken } from '@services/communicationsService';
import { AuthActions, TelemedicineActions } from '@actions';
import { useDispatch } from 'react-redux';
// import {
//   getDashboardData,
//   updateDashboard,
//   createDashboard,
// } from '@services/dashboardDataService';
import database from '@react-native-firebase/database';
import { getAppUserIdentity } from '@services/appUserService';
import { getDoctorBookings } from '@services/bookingService';
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import KeepAwake from 'react-native-keep-awake';
import DropDownPicker from 'react-native-dropdown-picker';
import ChatMessages from '@screens/ChatMessages';
import moment from 'moment';
import LocalVieoParticipant from './LocalVideoParticipant';
import { BOOKING_DOCTOR_STATUS } from './constant';
import Draggable from 'react-native-draggable';
import { getTracking, resetTracking } from '@utils/asyncStorage';

const { width, height } = Dimensions.get('window');
moment.locale('th');

const TestCall = props => {
  const { navigation, actions } = props;
  const dispatch = useDispatch();
  const { patientInfo } = props?.route?.params;
  const roles = useSelector(state => state?.auth?.data?.roles[0]?.name);
  const doctorId = useSelector(state => state?.auth?.data?.id);
  const doctor = useSelector(state => state?.auth?.data);
  const [date, setDate] = useState(patientInfo?.date);
  const [patient, setPatient] = useState(patientInfo);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [bookings, setBookings] = useState({});
  const [status, setStatus] = useState('disconnected');
  const [chatScreen, setChatScreen] = useState(false);
  const [participants, setParticipants] = useState(new Map());
  const [videoTracks, setVideoTracks] = useState(new Map());
  const [image, setImage] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomPath, setRoomPath] = useState('');
  const [complete, setComplete] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [duration, setDuration] = useState(0);
  const [drugs, setDrugs] = useState('');
  const [vn, setVn] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [orderNo, setOrderNo] = useState([]);
  const [orderNumber, setOrderNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const userId = patient?.userId;
  const [orientation, setOrientation] = useState(
    width < height ? 'Portrait' : 'Landscape',
  );
  const [onFlip, setOnFlip] = useState(false);
  const [orientNow, setOrientNow] = useState('Portrait');
  const [switchVertical, setSwitchVertical] = useState(true);
  const [visibleNote, setVisibleNote] = useState(false);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [topic, setTopic] = useState('');
  const [visibleReportProblemModal, setVisibleReportProblemModal] = useState(
    false,
  );
  const [bookingId, setBookingId] = useState('');
  const [actionStatus, setActionStatus] = useState('');
  const [sendPharmacist, setSendPharmacist] = useState({});
  const [booking, setBooking] = useState('');
  const [buttonWidth, setButtonWidth] = useState(width);
  const [token, setToken] = useState('');
  const twilioRef = useRef(null);

  let items = orderNo.length
    ? orderNo.map(value => {
        return { label: value, value: value };
      })
    : [{ label: 'ไม่มีข้อมูลหมายเลขใบสั่งยา...', value: '' }];

  useFocusEffect(
    useCallback(() => {
      return () => {
        twilioRef.current.disconnect();
      };
    }, []),
  );

  const createNote = () => {
    setNotes(prevState => [...prevState, { topic, description: '' }].reverse());
  };

  const onChangeDescription = (value, index) => {
    setNotes(prevNotes =>
      prevNotes.map((note, idx) => {
        if (index === idx) {
          return { ...prevNotes[index], description: value };
        }
        return note;
      }),
    );
  };

  const fetchBooking = async () => {
    const bookingData = await getDoctorBookings();
    const filterBooking = bookingData?.filter(
      bookingId => bookingId?.id === patientInfo?.bookingId,
    )[0];
    await fetchUser(filterBooking.id);
    setBookingId(filterBooking.id);
    setNotes(filterBooking.hasOwnProperty('notes') ? filterBooking?.notes : []);
    setBooking(filterBooking);
  };
  const fetchUser = async bookingId => {
    if (bookingId) {
      try {
        const { data } = await axios.get(
          `${config.VA_API_URL}/Bookings/${bookingId}?filter[include]=doctor&filter[include]=prescription`,
        );
        if (data.doctorId === 0) {
          dispatch(TelemedicineActions.setTelemedicine({ doctor: false }));
        } else if (data.doctor) {
          dispatch(
            TelemedicineActions.setTelemedicine({ doctor: data.doctor }),
          );
        }
      } catch (error) {
        console.log('error fetching booking data', error);
      }
    }
  };
  // console.log('orderNo ====',value)
  useEffect(() => {
    KeepAwake.activate();
  }, []);
  useEffect(() => {
    fetchBooking();
    fetchImage(patientInfo?.user?.userId);
    setDate(patientInfo?.date);
  }, [patientInfo?.date]);

  useEffect(() => {
    Dimensions.addEventListener('change', ({ window: { width, height } }) => {
      width < height ? setOrientation('Portrait') : setOrientation('Landscape');
      setButtonWidth(width);
    });
  }, []);

  const fetchImage = async patientId => {
    const response = await getKycPatientImages(patientId);
    if (response) {
      setImage(response[0]?.image);
    } else {
      setImage('https://i.stack.imgur.com/l60Hf.png');
    }
  };

  const convertHn = patient => {
    const hn = patient?.hn && patient?.hn?.length && patient?.hn[0]?.hn;
    if (!hn) return;
    const hnString = hn?.toString();
    const second = hnString?.substring(0, 2);
    const past = hnString?.substring(2)?.split('');
    let pass = 0;
    const final = past?.map(string => {
      if (pass || string !== '0') {
        pass = 1;
        return string;
      }
    });
    return final?.join('')?.concat('/', second);
  };
  const _requestAudioPermission = async () => {
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
        console.log('You can use the microphone');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const convertImage = base64 => {
    if (base64) {
      return `data:image/png;base64,${base64}`;
    }
    return 'https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-picture-default-avatar-photo-placeholder-profile-picture-eps-file-easy-to-edit-125707135.jpg';
  };
  const _requestCameraPermission = async () => {
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
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const _onEndButtonPress = () => {
    database()
      .ref(`patientStatus/${roomPath}`)
      .update({ status: 'completed', date: '' });
    createTime();
    twilioRef.current.disconnect();
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

  const _onRoomDidConnect = () => {
    setStatus('connected');
  };

  const _onRoomDidDisconnect = ({ roomName, error }) => {
    // console.log('ERROR: ', error);
    setStatus('disconnected');
    const header = 'เสร็จสิ้น';
    let description = false;
    let bottom = [];
    bottom.push({
      text: 'ตกลง',
      onPress: () => {
        // navigation.goBack();
      },
    });
    setComplete(true);
    Alert.alert(header, description || '', bottom, { cancelable: false });
  };

  const _onRoomDidFailToConnect = error => {
    // console.log('ERROR: ', error);

    setStatus('disconnected');
  };

  const _onParticipantAddedVideoTrack = ({ participant, track }) => {
    console.log(
      'participant video track =====',
      participant,
      track,
      videoTracks,
    );
    setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track.trackSid,
          { participantSid: participant.sid, videoTrackSid: track.trackSid },
        ],
      ]),
    );
    let ref = database().ref(`/patientStatus/${roomName}`);
    ref.update({
      status: 'calling',
    });
  };

  const _onParticipantRemovedVideoTrack = ({ participant, track }) => {
    console.log('remove video track =====', participant, track, videoTracks);
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
  };
  const convertPhoneNumberFormat = number => {
    let regex = /(\d{3})(\d{3})(\d{4})/;
    var match = regex.exec(number);
    if (match) {
      match.shift();
      number = match.join('-');
    }
    return number;
  };

  const convertCidFormat = cId => {
    let regex = /(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/;
    var match = regex.exec(cId);
    if (match) {
      match.shift();
      cId = match.join('-');
    }
    return cId;
  };

  const appInfo = [
    {
      title: 'ชื่อ',
      value: patient?.fullname
        ? `${patient?.fullname?.title} ${patient?.fullname?.firstName} ${patient?.fullname?.lastName}`
        : `${patient?.user?.firstname} ${patient?.user?.lastname}`,
    },
    {
      title: 'อายุ',
      value: `${moment()
        .add(543, 'year')
        .format('YYYY') - moment(patient?.user?.birthDate).format('YYYY') ||
        '-'} ปี`,
    },
    { title: 'HN', value: (patient && convertHn(patient)) || '-' },
    {
      title: 'เบอร์ติดต่อ',
      value: convertPhoneNumberFormat(patient?.user?.mobileNumber) || '-',
    },
    {
      title: 'เลขบัตรประชาชน',
      value: patient?.cId
        ? convertCidFormat(patient?.cId)
        : convertCidFormat(patient?.user?.cId),
    },
    {
      title: 'ที่อยู่ปัจจุบัน',
      value: `${patient?.user?.address?.address} ตำบล ${patient?.user?.address?.address2}, อำเภอ ${patient?.user?.address?.area}, จังหวัด ${patient?.user?.address?.province} ${patient?.user?.address?.postalCode}`,
    },
    { title: 'สัญชาติ', value: patient?.nationality || '-' },
  ];
  const ePhisInfo = [
    { title: 'เพศ', value: patient?.sexName },
    { title: 'HN', value: (patient && convertHn(patient)) || '-' },
    {
      title: 'อายุ',
      value: `${moment()
        .add(543, 'year')
        .format('YYYY') - moment(patient?.user?.birthDate).format('YYYY') ||
        'ไม่ระบุ'} ปี`,
    },
    {
      title: 'เบอร์ติดต่อ',
      value: patient?.contactInfo
        ? convertPhoneNumberFormat(patient?.contactInfo?.mobileNumber)
        : '-',
    },
    {
      title: 'เบอร์ติดต่อฉุกเฉิน',
      value: patient?.emergencyInfo
        ? `${convertPhoneNumberFormat(patient?.emergencyInfo?.mobileNumber)} ${
            patient?.emergencyInfo.relationship
              ? `(${patient?.emergencyInfo?.relationship})`
              : '-'
          }`
        : '-',
    },
    { title: 'แพ้ยา', value: patient?.drugAllergies?.length ? '' : '-' },
  ];
  const checkPatientStatus = patientDetail => {
    if (
      [
        'doctor',
        'nurse',
        'physiotherapist',
        'pharmacySchedule',
        'nutritionist',
      ].includes(roles)
    ) {
      return {
        path: `patient${patientDetail?.userId}${roles}${doctorId}`,
        date: patientDetail?.date,
      };
    }
    return {
      path: `patient${patientDetail?.userId}pharmacy`,
      date: patientDetail?.date,
    };
  };

  const handleSubmitCall = useCallback(async event => {
    const { token } = await getTwilioToken();
    let status = 'inWaitingRoom';
    database()
      .ref(`patientStatus/${event?.path}`)
      .on('value', snapshot => {
        status = snapshot.val().status;
      });
    if (status === 'inWaitingRoom') {
      if (roles.includes('pharmacy')) {
        database()
          .ref(`patientStatus/${event?.path}`)
          .update({
            officerId: doctorId,
            status: 'pharmacyJoin',
          });
      } else {
        database()
          .ref(`patientStatus/${event?.path}`)
          .update({ status: 'doctorJoin' });
      }
      setRoomName(event?.path + event?.date);
      setRoomPath(event?.path);
      setToken(token);
      _onConnectButtonPress(event?.path + event?.date, token);
    } else {
      const header = 'มีเจ้าหน้าที่เชื่อมต่อแล้ว';
      let description = false;
      let bottom = [];
      bottom.push({
        text: 'ตกลง',
        onPress: () => {
          // navigation.goBack();
        },
      });
      Alert.alert(header, description || '', bottom, { cancelable: false });
    }
  }, []);

  const _onConnectButtonPress = async (room, tokenId) => {
    twilioRef.current.connect({
      roomName: room,
      accessToken: tokenId,
      RecordParticipantsOnConnect: true,
    });
    setStatus('connecting');
  };

  const createTime = () => {
    const diff = moment.duration(moment(Date.now()).diff(moment(date)));
    const hours = filterTime(diff.hours());
    const minutes = filterTime(diff.minutes());
    const seconds = filterTime(diff.seconds());
    setDuration(`${hours}:${minutes}:${seconds}`);
    updateVideocallTimeCount(patient, seconds, minutes, hours);
  };

  const updateVideocallTimeCount = async (patient, seconds, minutes, hours) => {
    const collected = await getTracking();
    if (collected !== null) {
      let time = +seconds + +minutes * 60 + +hours * 3600;
      // console.log('time', time);
      // console.log('userId', patient?.userId);
      // const response = await getDashboardData(patient?.userId);

      const {
        gameCount,
        diaryCount,
        pickupByEmsCount,
        healthRecordCount,
        bookingStatusCount,
        drugTakingCount,
        drugTrackingCount,
      } = collected;

      const { data: response } = await axios.get(
        `${config.VA_API_URL}/dashboardData?filter[where][userId]=${patient?.userId}`,
      );
      if (response.length) {
        const dashboardId = response[0]?.id;
        // const telemedicineTimeCount = response[0]?.telemedicineTimeCount + time;
        // const data = {
        //   telemedicineTimeCount,
        // };
        // await updateDashboard({
        //   dashboardId: dashboardId,
        //   data: data,
        // });
        await axios.patch(`${config.VA_API_URL}/dashboardData/${dashboardId}`, {
          telemedicineTimeCount: response[0]?.telemedicineTimeCount + time,
          gameCount,
          diaryCount,
          pickupByEmsCount,
          healthRecordCount,
          bookingStatusCount,
          drugTakingCount,
          drugTrackingCount,
        });
      } else {
        // await createDataDashboard(patient?.userId, 0, 0, time, 0, 0);
        await axios.post(`${config.VA_API_URL}/dashboardData`, {
          userId: patient?.userId,
          gameCount,
          diaryCount,
          pickupByEmsCount,
          healthRecordCount,
          bookingStatusCount,
          drugTakingCount,
          drugTrackingCount,
          telemedicineCount: 0,
          chatbotAiMessageCount: 0,
          telemedicineTimeCount: time,
          chatbotMessageFromUserCount: 0,
          emergencyCount: 0,
        });
      }
      await resetTracking();
    }
  };

  // const createDataDashboard = async (
  //   userId,
  //   telemedicineCount,
  //   chatbotAiMessageCount,
  //   telemedicineTimeCount,
  //   chatbotMessageFromUserCount,
  //   emergencyCount,
  // ) => {
  //   await createDashboard({
  //     userId,
  //     telemedicineCount,
  //     chatbotAiMessageCount,
  //     telemedicineTimeCount,
  //     chatbotMessageFromUserCount,
  //     emergencyCount,
  //   });
  // };

  const filterTime = time => {
    let text = '00';
    if (time) {
      text = `0${time}`;
      if (time > 9) {
        text = time;
      }
    }
    return text;
  };

  const summaryInfo = [
    { title: 'ห้องสนทนาเลขที่', value: roomName },
    { title: 'ระยะเวลาสนทนา', value: duration },
    { title: 'สนทนาเมื่อ', value: patientInfo?.date || moment(date).fromNow() },
  ];
  const participantsInfo = [
    {
      title: patient?.fullname
        ? `${patient?.fullname?.title} ${patient?.fullname?.firstName} ${patient?.fullname?.lastName}`
        : `${patient?.user?.firstname} ${patient?.user?.lastname}`,
      value: roomName,
      image: convertImage(patient?.imageBase64),
    },
    { title: doctor?.fullname, value: '', image: doctor?.profileImage },
  ];

  const handleDoctorCompleteFlow = async () => {
    const response = await getAppUserIdentity(booking?.patientId);
    const everOmaId = response[0]?.everOmaId;
    const doctorData = doctor;
    const resVisit = await fetchVnNumber(everOmaId, booking);
    const data = {
      userId: everOmaId,
      bookingTime: booking?.admitTime,
      vnNumber: resVisit && resVisit?.vn ? resVisit?.vn : null,
      hnId: booking?.patient?.hnId || null,
      drugItems: null,
      amount: resVisit && resVisit?.incamt ? resVisit?.incamt : null,
      prescriptionId: booking?.prescriptionId,
      doctor: doctorData,
      bookingId: booking?.id,
      bookingMinutesTime: booking?.bookingTime,
      bookingMinutesEndTime: booking?.bookingEndTime,
    };
    const createPickup = await createPrescriptionPickup(data);
    if (createPickup) {
      const status = roles.includes('doctor')
        ? 'DOCTOR_COMPLETED'
        : 'STAFF_COMPLETED';
      await setStatusPrescription(
        booking?.prescriptionId,
        'PATIENT_PENDING_PAYMENT',
      );
      await setStatusBooking(booking?.id, status);
    }
    navigation.goBack();
  };
  const setStatusBooking = async (id, status) => {
    const { data } = await axios.patch(`${config.VA_API_URL}/Bookings`, {
      id,
      status,
    });
    return data;
  };
  const createPrescriptionPickup = async dataPrescription => {
    const res = await axios.post(
      `${config.VA_API_URL}/PrescriptionPickups`,
      dataPrescription,
    );
    return res.data;
  };
  const setStatusPrescription = async (id, status) => {
    let detail;
    if (status === 'PHARMACY_PENDING_RX') {
      detail = {
        status,
        paymentStatus: 'PATIENT_PENDING_PAYMENT',
      };
    } else if (
      ['PATIENT_PENDING_PAYMENT', 'PATIENT_SUCCESS_PAYMENT'].includes(status)
    ) {
      detail = {
        paymentStatus: status,
      };
    } else {
      detail = {
        status,
      };
    }
    const { data } = await axios.patch(
      `${config.VA_API_URL}/prescriptions/${id}`,
      detail,
    );
    return data;
  };
  const fetchVnNumber = async (everOmaId, booking) => {
    const { data } = await axios.get(
      `${config.apiUrl}/UserInfos/checkVisitNumber`,
      {
        params: {
          patientId: everOmaId,
          selectedDate: moment(new Date(booking.admitTime)).format(
            'YYYY-MM-DD',
          ),
        },
      },
    );
    if (data && data.length) {
      return {
        incamt: data[0].paymentSummarys[0].incamt,
        vn: data[0].vn,
      };
    }
    return null;
  };
  const updateVisitNumber = async (id, patchData, isPrescription) => {
    const response = await updateBooking(id, patchData, isPrescription);
    if (response) {
      const header = 'อัปเดตหมายเลขวิสิตเสร็จสิ้น';
      let description = false;
      let bottom = [];
      bottom.push({
        text: 'ตกลง',
        onPress: () => {
          navigation.goBack();
        },
      });
      Alert.alert(header, description || '', bottom, { cancelable: false });
    }
  };

  const updateBookingNote = async (bookingId, notes) => {
    try {
      const { data } = await axios.patch(
        `${config.VA_API_URL}/Bookings/${bookingId}`,
        {
          notes,
        },
      );
    } catch (e) {
      console.log('error =======', e);
    }
    await fetchBooking();
  };

  const fetchOrderNumber = async (orderNumber, patientId) => {
    setLoading(true);
    const admitDate = moment(booking?.admitTime).format('YYYY-MM-DD');
    const resp = await getAppUserIdentity(booking?.patientId);
    const everOmaId = resp[0]?.everOmaId;
    await triggerUpdateData(everOmaId, admitDate);
    if (everOmaId) {
      const response = await checkDrugsDetailByOrderNo(everOmaId, orderNumber);
      setDrugs(response?.billingItems);
      setVn(response?.vn);
      setDoctorName(response?.doctorName);
    }
    setLoading(false);
  };

  const fetchVisitNumber = async (
    id,
    patientId,
    prescriptionId,
    selectedDate,
  ) => {
    setLoading(true);
    const admitDate = moment(booking?.admitTime).format('YYYY-MM-DD');
    const resp = await getAppUserIdentity(booking?.patientId);
    const everOmaId = resp[0]?.everOmaId;
    const userRes = doctor;
    await triggerUpdateData(everOmaId, admitDate);
    const response = await selectOrderNumber(
      everOmaId,
      selectedDate,
      userRes?.employeeId,
    );
    if (response && response?.orderNo && response?.orderNo.length) {
      setOrderNo(response?.orderNo);
    } else {
      setOrderNo([]);
    }
    setLoading(false);
  };
  const updateBooking = async (id, patchData, isPrescription) => {
    const detail = isPrescription
      ? { prescriptionId: patchData }
      : { ...patchData };
    const { data } = await axios.patch(
      `${config.VA_API_URL}/Bookings/${id}`,
      detail,
    );
    return data;
  };

  const checkDrugsDetailByOrderNo = async (patientId, orderNumber) => {
    const { data } = await axios.get(
      `${config.apiUrl}/UserInfos/checkDrugsDetailByOrderNo`,
      {
        params: {
          patientId,
          orderNumber,
        },
      },
    );
    return data;
  };

  const selectOrderNumber = async (patientId, selectedDate, employeeId) => {
    const { data } = await axios.get(
      `${config.apiUrl}/UserInfos/selectOrderNumber`,
      {
        params: {
          patientId,
          selectedDate,
          employeeId,
        },
      },
    );
    return data;
  };
  const triggerUpdateData = async (patientId, vstdate) => {
    const { data } = await axios.get(
      `${config.apiUrl}/UserInfos/triggerUpdateData`,
      {
        params: {
          patientId,
          vstdate,
        },
      },
    );
    return data;
  };

  const submitReportProblemForm = async value => {
    const res = await axios.patch(
      `${config.VA_API_URL}/Bookings/${bookingId}`,
      {
        noteProblems: value,
        status: actionStatus,
      },
    );
    if (res.status === 200) {
      const header = 'ส่งเรื่องไปยังคอลเซ็นเตอร์เรียบร้อยแล้ว';
      let description = false;
      let bottom = [];
      bottom.push({
        text: 'ตกลง',
        onPress: () => {
          setVisibleReportProblemModal(false);
          navigation.goBack();
        },
      });
      Alert.alert(header, description || '', bottom, { cancelable: false });
    }
  };
  const LocalTwilioView = useCallback(({ Orient, onFlip }) => {
    const { width, height } = Dimensions.get('window');
    return (
      <Draggable x={width} y={50}>
        <TwilioVideoLocalView
          enabled={true}
          style={[
            Styles.localVideo,
            {
              transform: [{ scaleX: onFlip ? 1 : -1 }],
              width: Orient?.width,
              height: Orient?.height,
            },
          ]}
        />
      </Draggable>
    );
  }, []);

  const TwilioParticipantView = ({ trackSid, trackIdentifier }) => {
    const { width, height } = Dimensions.get('window');
    const styleVideo =
      orientation === 'Portrait'
        ? switchVertical
          ? {
              width: width,
              height: height,
            }
          : {
              width: width,
              height: height / 2.5,
            }
        : switchVertical
        ? {
            width: width / 2.5,
            height: height,
          }
        : {
            width: width,
            height: height,
          };

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TwilioVideoParticipantView
          style={styleVideo}
          key={trackSid}
          trackIdentifier={trackIdentifier}
        />
      </View>
    );
  };

  const renderItem = useCallback(props => {
    return (
      <TouchableOpacity
        disabled={props?.isSelected}
        onPress={() => props?.onPress(props?.item?.value)}
        style={styles.seperatePadding}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.listItemRow}>
            <Image source={props?.item?.uri} style={{ marginRight: 10 }} />
            <Text style={styles.listText}>{props?.item?.label}</Text>
          </View>
          {props?.isSelected && <Icon name="check" color={'#0A905F'} />}
        </View>
      </TouchableOpacity>
    );
  }, []);
  const renderArrowUpIcon = () => (
    <IconDropDown type="font-awesome-5" name="chevron-up" color={'grey'} />
  );

  const renderArrowDownIcon = () => (
    <IconDropDown type="font-awesome-5" name="chevron-down" color={'grey'} />
  );
  return (
    <View style={Styles.container}>
      {status === 'disconnected' && !complete ? (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{ top: 'always' }}
        >
          <NetworkStateChecker fixedHeader={false} />

          <Header
            title={`ประวัติผู้ป่วย`}
            textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
            renderLeft={() => {
              return <Icon bold name="chevron-left" size={20} color="#fff" />;
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
          />
          <ScrollView>
            {orientation === 'Portrait' ? (
              <View style={[styles.gabCard, { marginHorizontal: 10 }]}>
                <View style={styles.gabCard}>
                  <View style={styles.setionText}>
                    <Text style={{ fontWeight: 'bold' }}>
                      ข้อมูลจาก Vajira@Home
                    </Text>
                  </View>
                  <View style={styles.setRowInfo}>
                    <View
                      style={[
                        styles.makeColumn,
                        { justifyContent: 'center', alignItems: 'center' },
                      ]}
                    >
                      <ProfileImage
                        style={styles.thumb}
                        source={{
                          uri: image,
                        }}
                      />
                    </View>
                    <View style={{ marginVertical: 10 }}>
                      {appInfo.map((item, index) => (
                        <View key={index} style={styles.rowInfo}>
                          <View
                            style={[
                              styles.makeColumn,
                              {
                                width: '40%',
                                borderBottomColor: '#e9e9e995',
                                borderBottomWidth: 1,
                              },
                            ]}
                          >
                            <Text>{item?.title}</Text>
                          </View>
                          <View
                            style={[
                              styles.makeColumn,
                              {
                                width: '55%',
                                borderBottomColor: '#e9e9e995',
                                borderBottomWidth: 1,
                              },
                            ]}
                          >
                            {item?.title?.includes('เบอร์') ? (
                              <TouchableOpacity
                                onPress={() =>
                                  Linking.openURL(
                                    Platform.OS === 'android'
                                      ? `tel:${item?.value}`
                                      : `telprompt:${item?.value}`,
                                  )
                                }
                              >
                                <Text style={{ color: '#245cff' }}>
                                  {item?.value}
                                </Text>
                              </TouchableOpacity>
                            ) : (
                              <Text>{item?.value}</Text>
                            )}
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>

                <View style={styles.gabCard}>
                  <View style={styles.setionText}>
                    <Text style={{ fontWeight: 'bold' }}>ข้อมูลจาก E-PHIS</Text>
                  </View>
                  <View style={styles.setRowInfo}>
                    <View
                      style={[
                        styles.makeColumn,
                        { justifyContent: 'center', alignItems: 'center' },
                      ]}
                    >
                      <ProfileImage
                        style={styles.thumb}
                        source={{
                          uri: convertImage(patient?.imageBase64),
                        }}
                      />
                    </View>
                    <View style={{ marginVertical: 10 }}>
                      {ePhisInfo.map((item, index) => (
                        <View key={index} style={styles.rowInfo}>
                          <View
                            style={[
                              styles.makeColumn,
                              {
                                width: '40%',
                                borderBottomColor: '#e9e9e995',
                                borderBottomWidth: 1,
                              },
                            ]}
                          >
                            <Text>{item?.title}</Text>
                          </View>
                          <View
                            style={[
                              styles.makeColumn,
                              {
                                width: '55%',
                                borderBottomColor: '#e9e9e995',
                                borderBottomWidth: 1,
                              },
                            ]}
                          >
                            {item?.title?.includes('เบอร์') ? (
                              <TouchableOpacity
                                onPress={() =>
                                  Linking.openURL(
                                    Platform.OS === 'android'
                                      ? `tel:${item?.value}`
                                      : `telprompt:${item?.value}`,
                                  )
                                }
                              >
                                <Text style={{ color: '#245cff' }}>
                                  {item?.value}
                                </Text>
                              </TouchableOpacity>
                            ) : (
                              <Text>{item?.value}</Text>
                            )}
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View style={[styles.gabCardLand, { marginHorizontal: 10 }]}>
                <View style={styles.gabCardLand}>
                  <View style={styles.setionTextLand}>
                    <Text style={{ fontWeight: 'bold' }}>
                      ข้อมูลจาก Vajira@Home
                    </Text>
                  </View>
                  <View style={styles.setRowInfoLand}>
                    <View
                      style={[
                        styles.makeColumnLand,
                        {
                          width: '30%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        },
                      ]}
                    >
                      <ProfileImage
                        style={styles.thumbLand}
                        source={{
                          uri: image,
                        }}
                      />
                    </View>
                    <View style={{ width: '70%', marginVertical: 10 }}>
                      {appInfo.map((item, index) => (
                        <View key={index} style={styles.rowInfoLand}>
                          <View
                            style={{
                              width: '25%',
                              borderBottomColor: '#e9e9e995',
                              borderBottomWidth: 1,
                            }}
                          >
                            <Text>{item?.title}</Text>
                          </View>
                          <View
                            style={{
                              width: '70%',
                              borderBottomColor: '#e9e9e995',
                              borderBottomWidth: 1,
                            }}
                          >
                            {item?.title?.includes('เบอร์') ? (
                              <TouchableOpacity
                                onPress={() =>
                                  Linking.openURL(
                                    Platform.OS === 'android'
                                      ? `tel:${item?.value}`
                                      : `telprompt:${item?.value}`,
                                  )
                                }
                              >
                                <Text style={{ color: '#245cff' }}>
                                  {item?.value}
                                </Text>
                              </TouchableOpacity>
                            ) : (
                              <Text>{item?.value}</Text>
                            )}
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>

                <View style={styles.gabCardLand}>
                  <View style={styles.setionTextLand}>
                    <Text style={{ fontWeight: 'bold' }}>ข้อมูลจาก E-PHIS</Text>
                  </View>
                  <View style={styles.setRowInfoLand}>
                    <View
                      style={[
                        styles.makeColumnLand,
                        {
                          width: '30%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        },
                      ]}
                    >
                      <ProfileImage
                        style={styles.thumbLand}
                        source={{
                          uri: convertImage(patient?.imageBase64),
                        }}
                      />
                    </View>
                    <View style={{ width: '70%', marginVertical: 10 }}>
                      {ePhisInfo.map((item, index) => (
                        <View key={index} style={styles.rowInfoLand}>
                          <View
                            style={{
                              width: '25%',
                              borderBottomColor: '#e9e9e995',
                              borderBottomWidth: 1,
                            }}
                          >
                            <Text>{item?.title}</Text>
                          </View>
                          <View
                            style={{
                              width: '70%',
                              borderBottomColor: '#e9e9e995',
                              borderBottomWidth: 1,
                            }}
                          >
                            {item?.title?.includes('เบอร์') ? (
                              <TouchableOpacity
                                onPress={() =>
                                  Linking.openURL(
                                    Platform.OS === 'android'
                                      ? `tel:${item?.value}`
                                      : `telprompt:${item?.value}`,
                                  )
                                }
                              >
                                <Text style={{ color: '#245cff' }}>
                                  {item?.value}
                                </Text>
                              </TouchableOpacity>
                            ) : (
                              <Text>{item?.value}</Text>
                            )}
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
          <LinearGradient
            style={{
              height: 50,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 10,
              marginVertical: 10,
            }}
            colors={['#0A905F', '#095C3E']}
          >
            <TouchableOpacity
              underlayColor="grey"
              style={{ width: '100%', alignItems: 'center' }}
              onPress={() => {
                const event = checkPatientStatus(patient);
                handleSubmitCall(event);
              }}
            >
              <View style={styles.callContainer}>
                <Icon name="video" style={styles.callIcon} />
                <Text style={styles.callText}>เข้าห้องโทรเวชกรรม</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </SafeAreaView>
      ) : complete === true &&
        roles.includes('doctor') &&
        ['แพทย์ทำการอนุมัติ', 'เจ้าหน้าที่ทำการอนุมัติ'].includes(
          BOOKING_DOCTOR_STATUS[booking?.status],
        ) ? (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{ top: 'always' }}
        >
          <NetworkStateChecker fixedHeader={false} />

          <Header
            title={`สรุปการโทรเวชกรรม`}
            textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
            renderLeft={() => {
              return <Icon bold name="chevron-left" size={20} color="#fff" />;
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
          />
          <ScrollView>
            <View style={[styles.gabCard, { marginHorizontal: 10 }]}>
              <View style={styles.gabCard}>
                <View style={styles.setionText}>
                  <Text style={{ fontWeight: 'bold' }}>
                    ข้อมูลการโทรเวชกรรม
                  </Text>
                </View>
                <View style={styles.setRowInfo}>
                  <View style={{ marginVertical: 10 }}>
                    {summaryInfo.map((item, index) => (
                      <View key={index} style={styles.rowInfo}>
                        <View
                          style={[
                            styles.makeColumn,
                            {
                              width: '35%',
                              borderBottomColor: '#e9e9e995',
                              borderBottomWidth: 1,
                            },
                          ]}
                        >
                          <Text>{item?.title}</Text>
                        </View>
                        <View
                          style={[
                            styles.makeColumn,
                            {
                              width: '70%',
                              borderBottomColor: '#e9e9e995',
                              borderBottomWidth: 1,
                            },
                          ]}
                        >
                          <Text>{item?.value}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              <View style={styles.gabCard}>
                <View style={styles.setionText}>
                  <Text style={{ fontWeight: 'bold' }}>ผู้เข้าร่วม (2)</Text>
                </View>
                <View style={styles.setRowInfoSummary}>
                  {participantsInfo.map((item, index) => (
                    <View style={styles.centerContent}>
                      <View key={index}>
                        <View
                          style={{ alignItems: 'center', flexDirection: 'row' }}
                        >
                          <ProfileImage
                            style={styles.thumb}
                            source={{
                              uri: item?.image,
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 16,
                              paddingVertical: 10,
                              paddingHorizontal: 10,
                            }}
                          >
                            {item?.title}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.gabCard}>
                <View style={styles.setionText}>
                  <Text style={{ fontWeight: 'bold' }}>Note</Text>
                </View>
                <View style={styles.setRowInfoSummary}>
                  <View style={{ width: '100%' }}>
                    {booking &&
                    booking?.hasOwnProperty('notes') &&
                    booking?.notes?.length ? (
                      booking?.notes?.map((note, index) => (
                        <View
                          style={{
                            marginTop: 10,
                            justifyContent: 'flex-start',
                            textAlignVertical: 'top',
                            borderRadius: 10,
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            backgroundColor: '#efefef',
                            marginVertical: 10,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                            }}
                          >
                            {note?.topic}
                          </Text>
                          <Text style={{ marginHorizontal: 10, fontSize: 16 }}>
                            {'- '}
                            {note?.description}
                          </Text>
                        </View>
                      ))
                    ) : (
                      <View
                        style={{
                          marginTop: 10,
                          justifyContent: 'center',
                          alignContent: 'center',
                          textAlignVertical: 'top',
                          textAlign: 'center',
                          borderRadius: 10,
                          paddingHorizontal: 10,
                          paddingVertical: 10,
                          backgroundColor: '#efefef',
                          marginVertical: 10,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                          }}
                        >
                          ไม่มีบันทึก
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                flexDirection: 'column',
                width: '50%',
              }}
            >
              <ActionButton
                text={'แจ้งปัญหา'}
                bgColor={'red'}
                halfScreen={false}
                styleData={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  marginRight: 0,
                }}
                onPress={() => {
                  const status = roles.includes('doctor')
                    ? 'DOCTOR_ALERT'
                    : 'STAFF_ALERT';
                  setVisibleReportProblemModal(true);
                  setActionStatus(status);
                  setBookingId(booking.id);
                  setNote('');
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
                width: '50%',
              }}
            >
              <ActionButton
                text={'ส่งต่อเภสัช'}
                bgColor={'#0A905F'}
                halfScreen={false}
                styleData={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  marginLeft: 0,
                }}
                onPress={() => {
                  fetchVisitNumber(
                    booking.id,
                    booking.patientId,
                    booking.prescriptionId,
                    moment(booking.admitTime).format('YYYY-MM-DD'),
                  );
                  setSendPharmacist({
                    patient: booking.patient,
                    bookingId: booking.id,
                    prescriptionId: booking.prescriptionId,
                    adminTime: moment(booking.admitTime).format('YYYY-MM-DD'),
                  });
                  setVisibleModal(true);
                }}
              />
            </View>
          </View>

          <ActionButton
            text={'เสร็จสิ้น (ไม่มีการสั่งจ่ายยา)'}
            bgColor={'#0A905F'}
            halfScreen={false}
            onPress={() => handleDoctorCompleteFlow()}
          />

          <ModalUI onOpenModal={visibleModal} onCustomUI={true}>
            <View
              style={{
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                หมายเลขใบสั่งยา
              </Text>
            </View>
            {loading ? (
              <ActivityIndicator
                size="large"
                color="#0A905F"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  zIndex: 10,
                }}
              />
            ) : null}
            <DropDownPicker
              dropDownStyle={styles.listItemStyle}
              open={open}
              value={value}
              onSelectItem={data => {
                fetchOrderNumber(data, patientInfo?.user?.userId);
                setValue(data);
              }}
              items={items}
              setOpen={setOpen}
              containerStyle={styles.containerDDBox}
              placeholder={'เลือกหมายเลขใบสั่งยา'}
              showTickIcon
              ArrowDownIconComponent={renderArrowDownIcon}
              ArrowUpIconComponent={renderArrowUpIcon}
              style={styles.dropDownContainer}
              renderListItem={renderItem}
              dropDownContainerStyle={styles.listItemContainer}
              labelStyle={styles.labelDeopDown}
              closeAfterSelecting={true}
            />

            <ButtonModal
              disable={!value.length}
              titleCancel={'ยกเลิก'}
              titleSuccess={'บันทึก'}
              onPressSuccess={() => {
                setStatusBooking(sendPharmacist?.bookingId, 'EPHIS_PENDING');
                const data = {
                  vnNumber: orderNo,
                  vn: vn,
                };
                updateVisitNumber(sendPharmacist?.bookingId, data, false);
                setVisibleModal(false);
              }}
              onPressCancel={() => setVisibleModal(!visibleModal)}
            />
            <ActionButton
              text={'อัพเดทรายการยา'}
              bgColor={'#d7a900'}
              halfScreen={false}
              onPress={() => fetchOrderNumber(orderNo, patientInfo.user.userId)}
            />
          </ModalUI>
          <ModalUI onOpenModal={visibleReportProblemModal} onCustomUI={true}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                {
                  'โปรดระบุปัญหาที่ท่านต้องการ \nแจ้งให้ Call Center ดำเนินการแก้ไข'
                }
              </Text>
            </View>
            <RNTextArea
              style={{
                justifyContent: 'flex-start',
                textAlignVertical: 'top',
                borderRadius: 10,
                paddingHorizontal: 10,
                backgroundColor: '#efefef',
                marginVertical: 10,
                borderColor: note === false ? 'red' : '#9f9f9f',
                borderWidth: note === false ? 1 : 0,
              }}
              maxLength={500}
              maxCharLimit={500}
              placeholderTextColor={note === false ? 'red' : '#9f9f9f'}
              exceedCharCountColor={'red'}
              placeholder={'กรุณาระบุรายละเอียดของปัญหา'}
              textInputStyle={{
                fontFamily: FontFamily.defaultt,
              }}
              onChangeText={text => setNote(text)}
              textAlignVertical="top"
            />
            <ButtonModal
              titleCancel={'ยกเลิก'}
              titleSuccess={'ยืนยัน'}
              onPressSuccess={() => {
                if (note) {
                  submitReportProblemForm(note);
                } else setNote(false);
              }}
              onPressCancel={() =>
                setVisibleReportProblemModal(!visibleReportProblemModal)
              }
            />
          </ModalUI>
        </SafeAreaView>
      ) : complete === true && !roles.includes('doctor') ? (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{ top: 'always' }}
        >
          <NetworkStateChecker fixedHeader={false} />

          <Header
            title={`สรุปการโทรเวชกรรม`}
            textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
          />
          <ScrollView>
            <View style={[styles.gabCard, { marginHorizontal: 10 }]}>
              <View style={styles.gabCard}>
                <View style={styles.setionText}>
                  <Text style={{ fontWeight: 'bold' }}>
                    ข้อมูลการโทรเวชกรรม
                  </Text>
                </View>
                <View style={styles.setRowInfo}>
                  <View style={{ marginVertical: 10 }}>
                    {summaryInfo?.map((item, index) => (
                      <View key={index} style={styles.rowInfo}>
                        <View
                          style={[
                            styles.makeColumn,
                            {
                              width: '35%',
                              borderBottomColor: '#e9e9e995',
                              borderBottomWidth: 1,
                            },
                          ]}
                        >
                          <Text>{item?.title}</Text>
                        </View>
                        <View
                          style={[
                            styles.makeColumn,
                            {
                              width: '70%',
                              borderBottomColor: '#e9e9e995',
                              borderBottomWidth: 1,
                            },
                          ]}
                        >
                          <Text>{item?.value}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              <View style={styles.gabCard}>
                <View style={styles.setionText}>
                  <Text style={{ fontWeight: 'bold' }}>ผู้เข้าร่วม (2)</Text>
                </View>
                <View style={styles.setRowInfoSummary}>
                  {participantsInfo.map((item, index) => (
                    <View style={styles.centerContent}>
                      <View key={index}>
                        <View
                          style={{ alignItems: 'center', flexDirection: 'row' }}
                        >
                          <ProfileImage
                            style={styles.thumb}
                            source={{
                              uri: item?.image,
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 16,
                              paddingVertical: 10,
                              paddingHorizontal: 10,
                            }}
                          >
                            {item?.title}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.gabCard}>
                <View style={styles.setionText}>
                  <Text style={{ fontWeight: 'bold' }}>Note</Text>
                </View>
                <View style={styles.setRowInfoSummary}>
                  <View style={{ width: '100%' }}>
                    {booking && booking?.hasOwnProperty('notes') ? (
                      booking?.notes?.map((note, index) => (
                        <View
                          style={{
                            marginTop: 10,
                            justifyContent: 'flex-start',
                            textAlignVertical: 'top',
                            borderRadius: 10,
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            backgroundColor: '#efefef',
                            marginVertical: 10,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                            }}
                          >
                            {note?.topic}
                          </Text>
                          <Text style={{ marginHorizontal: 10, fontSize: 16 }}>
                            {'- '}
                            {note?.description}
                          </Text>
                        </View>
                      ))
                    ) : (
                      <View
                        style={{
                          marginTop: 10,
                          justifyContent: 'center',
                          alignContent: 'center',
                          textAlignVertical: 'top',
                          textAlign: 'center',
                          borderRadius: 10,
                          paddingHorizontal: 10,
                          paddingVertical: 10,
                          backgroundColor: '#efefef',
                          marginVertical: 10,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                          }}
                        >
                          ไม่มีบันทึก
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                flexDirection: 'column',
                width: '50%',
              }}
            >
              <ActionButton
                text={'แจ้งปัญหา'}
                bgColor={'red'}
                halfScreen={false}
                styleData={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  marginRight: 0,
                }}
                onPress={() => {
                  const status = roles.includes('doctor')
                    ? 'DOCTOR_ALERT'
                    : 'STAFF_ALERT';
                  setVisibleReportProblemModal(true);
                  setActionStatus(status);
                  setBookingId(booking.id);
                  setNote('');
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
                width: '50%',
              }}
            >
              <ActionButton
                text={'เสร็จสิ้น'}
                bgColor={'#0A905F'}
                halfScreen={false}
                styleData={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  marginLeft: 0,
                }}
                onPress={() => {
                  const response = setStatusBooking(
                    booking.id,
                    'PHARMACY_COMPLETED',
                  );
                  if (response) {
                    const header = 'เปลี่ยนสถานะเสร็จสิ้น';
                    let description = false;
                    let bottom = [];
                    bottom.push({
                      text: 'ตกลง',
                      onPress: () => {
                        navigation.goBack();
                      },
                    });
                    Alert.alert(header, description || '', bottom, {
                      cancelable: false,
                    });
                  }
                }}
              />
            </View>
          </View>

          <ModalUI onOpenModal={visibleReportProblemModal} onCustomUI={true}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                {
                  'โปรดระบุปัญหาที่ท่านต้องการ \nแจ้งให้ Call Center ดำเนินการแก้ไข'
                }
              </Text>
            </View>
            <RNTextArea
              style={{
                justifyContent: 'flex-start',
                textAlignVertical: 'top',
                borderRadius: 10,
                paddingHorizontal: 10,
                backgroundColor: '#efefef',
                marginVertical: 10,
                borderColor: note === false ? 'red' : '#9f9f9f',
                borderWidth: note === false ? 1 : 0,
              }}
              maxLength={500}
              maxCharLimit={500}
              placeholderTextColor={note === false ? 'red' : '#9f9f9f'}
              exceedCharCountColor={'red'}
              placeholder={'กรุณาระบุรายละเอียดของปัญหา'}
              textInputStyle={{
                fontFamily: FontFamily.defaultt,
              }}
              onChangeText={text => setNote(text)}
              textAlignVertical="top"
            />
            <ButtonModal
              titleCancel={'ยกเลิก'}
              titleSuccess={'ยืนยัน'}
              onPressSuccess={() => {
                if (note) {
                  submitReportProblemForm(note);
                } else setNote(false);
              }}
              onPressCancel={() =>
                setVisibleReportProblemModal(!visibleReportProblemModal)
              }
            />
          </ModalUI>
        </SafeAreaView>
      ) : null}

      {status === 'connected' || status === 'connecting' ? (
        <View style={Styles.callContainer}>
          {status === 'connected' && chatScreen === false ? (
            <View style={Styles.remoteGrid}>
              {/* <View style={{backgroundColor : 'red',width:100 , height : 100}}>
                  <Text style={{ color : 'white'}}>
                    {console.log('chatScreen =======',chatScreen)}
                  </Text>
                </View> */}
              {Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                return (
                  <TwilioParticipantView
                    trackSid={trackSid}
                    trackIdentifier={trackIdentifier}
                  />
                );
              })}
              <ModalUI onOpenModal={visibleNote} onCustomUI={true}>
                <View style={{ maxHeight: height / 1.8 }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}
                    >
                      NOTE
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <TextInput
                      style={{
                        fontSize: 15,
                        marginHorizontal: 5,
                        padding: 15,
                        width: '80%',
                        // margin: 5,
                        alignSelf: 'center',
                        borderColor: '#CCCCCC',
                        borderWidth: 2,
                        borderRadius: 12,
                      }}
                      placeholder={'เพิ่มหัวข้อจดบันทึก'}
                      value={topic}
                      onChangeText={setTopic}
                    />
                    <TouchableOpacity
                      underlayColor="grey"
                      style={{
                        alignItems: 'center',
                        backgroundColor: '#0A905F',
                        padding: 15,
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        createNote();
                        setTopic('');
                      }}
                      // disabled={disable ? true : false}
                    >
                      <View style={styles.callContainer}>
                        <Icon name="plus" style={Styles.greenIcon} />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {notes?.length
                      ? notes?.map((note, index) => (
                          <View
                            style={{
                              marginTop: 10,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                              }}
                            >
                              {'\u25CF '}
                              {note?.topic}
                            </Text>
                            <RNTextArea
                              style={{
                                justifyContent: 'flex-start',
                                textAlignVertical: 'top',
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                backgroundColor: '#efefef',
                                marginVertical: 10,
                                borderColor:
                                  notes === false ? 'red' : '#9f9f9f',
                                borderWidth: notes === false ? 1 : 0,
                              }}
                              maxLength={500}
                              maxCharLimit={500}
                              placeholderTextColor={
                                note === false ? 'red' : '#9f9f9f'
                              }
                              exceedCharCountColor={'red'}
                              placeholder={
                                'ระบุรายละเอียดจดบันทึกในหัวข้อ ' + note?.topic
                              }
                              textInputStyle={{
                                fontFamily: FontFamily.defaultt,
                              }}
                              value={note.description}
                              onChangeText={text =>
                                onChangeDescription(text, index)
                              }
                              textAlignVertical="top"
                            />
                          </View>
                        ))
                      : null}
                  </ScrollView>
                  <ButtonModal
                    titleCancel={'ยกเลิก'}
                    titleSuccess={'บันทึก'}
                    disable={!notes.length}
                    onPressSuccess={() => {
                      updateBookingNote(patient?.bookingId, notes);
                      setVisibleNote(false);
                    }}
                    onPressCancel={() => setVisibleNote(false)}
                  />
                </View>
              </ModalUI>
            </View>
          ) : chatScreen === true ? (
            <ChatMessages
              setChatScreen={condition => setChatScreen(condition)}
              bookingId={patient?.bookingId}
              patientId={patientInfo?.userId}
              // clearNoti={item => clearNoti(item)}
            />
          ) : null}
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
          <LocalVieoParticipant
            chatScreen={chatScreen}
            _onFlipButtonPress={_onFlipButtonPress}
            setChatScreen={setChatScreen}
            setVisibleNote={setVisibleNote}
            _onMuteButtonPress={_onMuteButtonPress}
            isAudioEnabled={isAudioEnabled}
            _onEndButtonPress={_onEndButtonPress}
            setOrientNow={setOrientNow}
            roomPath={roomPath}
            setOnFlip={setOnFlip}
            onFlip={onFlip}
          >
            <LocalTwilioView
              Orient={{
                width: orientation === 'Portrait' ? 140 : 200,
                height: orientation === 'Portrait' ? 200 : 140,
              }}
              onFlip={onFlip}
            />
          </LocalVieoParticipant>
        </View>
      ) : null}

      <TwilioVideo
        ref={twilioRef}
        onRoomDidConnect={_onRoomDidConnect}
        onRoomDidDisconnect={_onRoomDidDisconnect}
        onRoomDidFailToConnect={_onRoomDidFailToConnect}
        onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
        onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
      />
    </View>
  );
};

const ActionButton = ({
  text,
  bgColor,
  halfScreen,
  styleData,
  onPress,
  disable,
}) => (
  <LinearGradient
    style={{
      height: 50,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10,
      marginVertical: 5,
      ...styleData,
    }}
    colors={[disable ? 'grey' : bgColor, disable ? 'grey' : bgColor]}
  >
    <TouchableOpacity
      key={text}
      underlayColor="grey"
      style={{ width: '100%', alignItems: 'center' }}
      onPress={onPress}
      disabled={disable ? true : false}
    >
      <View style={styles.callContainer}>
        <Text style={styles.callText}>{text}</Text>
      </View>
    </TouchableOpacity>
  </LinearGradient>
);
const ButtonModal = ({
  titleSuccess,
  titleCancel,
  onPressSuccess,
  onPressCancel,
  disable,
}) => (
  <View style={{ flexDirection: 'row' }}>
    <View
      style={{
        flexDirection: 'column',
        width: '50%',
      }}
    >
      <ActionButton
        text={titleCancel}
        bgColor={'red'}
        halfScreen={false}
        styleData={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          marginRight: 0,
        }}
        onPress={onPressCancel}
      />
    </View>
    <View
      style={{
        flexDirection: 'column',
        width: '50%',
      }}
    >
      <ActionButton
        disable={disable}
        text={titleSuccess}
        bgColor={'#0A905F'}
        halfScreen={false}
        styleData={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          marginLeft: 0,
        }}
        onPress={onPressSuccess}
      />
    </View>
  </View>
);
const mapStateToProps = state => {
  return {
    auth: state.auth,
    bookings: state.bookings,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  optionChat: {
    position: 'absolute',
    paddingHorizontal: 10,
    right: 0,
    top: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  options: {
    position: 'absolute',
    paddingHorizontal: 20,
    left: 20,
    right: 20,
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {},
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
  callWrapper: {
    flexGrow: 1,
  },
  remoteGrid: {
    flex: 1,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleSmall: {
    backgroundColor: '#17B87B',
    width: 70,
    height: 70,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4.84,

    elevation: 12,
  },
  greenIcon: {
    color: '#fff',
    fontSize: 22,
  },
  greenIconRotate: {
    width: 40,
    height: 30,
  },
  greenText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  switchVertical: {
    position: 'absolute',
    paddingHorizontal: 20,
    left: 20,
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  callContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 50,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  button: {
    marginTop: 100,
  },
  localVideo: {
    flex: 1,
    position: 'absolute',
    right: 10,
    bottom: 200,
    borderRadius: 2,
    borderColor: '#4e4e4e',
    transform: [{ scaleX: -1 }],
  },
  remoteGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionsContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    // backgroundColor: "blue",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TestCall);
