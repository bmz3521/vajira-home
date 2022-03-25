import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  GiftedChat,
  Bubble,
  Send,
  Composer,
  SystemMessage,
} from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import { Icon, Header } from '@components';
import Loading from '@components/Loading';
import ModalImagePicker from './components/ModalImagePicker';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import database from '@react-native-firebase/database';
import { BaseColor, BaseStyle } from '@config';
import {
  ActivityIndicator,
  View,
  SafeAreaView,
  Alert,
  StyleSheet,
  BackHandler,
  Platform,
} from 'react-native';
import axios from 'axios';
import config from '@_config';
// import { IconButton } from 'react-native-paper';
// import { AuthContext } from '../navigation/AuthProvider';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ImagePickerManager } from './utils';

function GiftedChatMessage({
  route,
  navigation,
  setChatScreen,
  bookingId,
  clearNoti,
  patientId,
}) {
  const NODE_ENV = process.env.NODE_ENV;
  // const NODE_ENV = 'development';
  const user = useSelector(state => state.user);
  const telemedicine = useSelector(state => state.telemedicine);
  const userTele = useSelector(state => state.userTele);
  const [messages, setMessages] = useState([]);
  const [patientStatus, setPatientStatus] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const modalRef = useRef();
  let isNavigate = false;
  let onlyRead = false;
  if (route && route.params) {
    onlyRead = route.params.onlyRead;
    isNavigate = route.params.isNavigate;
    bookingId = route.params.bookingId;
  }
  const userId = patientId ? patientId : userTele.dataTele.userId;
  const doctorTeleId =
    telemedicine.data &&
    telemedicine.data.doctor &&
    telemedicine.data.doctor.id;
  const role = [
    'EPHIS_CONFIRM',
    'PHARMACY_PENDING_BOOKING',
    'PHARMACY_CONFIRM_BOOKING',
    'PHARMACY_COMPLETED',
  ].includes(bookingStatus)
    ? 'pharmacy'
    : telemedicine.data &&
      telemedicine.data.doctor &&
      telemedicine.data.doctor.roles[0].name;

  const firebaseDocument =
    role === 'pharmacy'
      ? `patient${userId}${role}`
      : `patient${userId}${role}${doctorTeleId}`;

  async function fetchBooking(bookingId) {
    const { data } = await axios.get(
      `${config.VA_API_URL}/Bookings/${bookingId}?filter[include]=doctor&filter[include]=prescription`,
    );
    setBookingStatus(data.status);
  }

  async function handleSend(messages) {
    const text = messages[0].text;

    firestore()
      .collection(`THREADS_${NODE_ENV}`)
      .doc(firebaseDocument)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: userTele.dataTele.userId,
        },
        read: false,
        delivered: false,
      });

    await firestore()
      .collection(`THREADS_${NODE_ENV}`)
      .doc(firebaseDocument)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
        },
        { merge: true },
      );
  }

  useEffect(() => {
    fetchBooking(bookingId);
  }, [bookingId]);

  useEffect(() => {
    //  console.log('role');
    //  console.log(role);

    const getFirebaseStatus = () => {
      let name = `patient${userId}pharmacy`;
      if (role === 'doctor') {
        name = `patient${userId}doctor${doctorTeleId}`;
      } else if (role === 'physiotherapist') {
        name = `patient${userId}physiotherapist${doctorTeleId}`;
      } else if (role === 'nurse') {
        name = `patient${userId}nurse${doctorTeleId}`;
      }

      database()
        .ref(`/patientStatus/${name}`)
        .on('value', snapshot => {
          let valueObject = snapshot.val() ? snapshot.val() : {};
          setPatientStatus(valueObject);
        });
    };
    if (
      role === 'doctor' ||
      role === 'pharmacy' ||
      role === 'physiotherapist' ||
      role === 'nurse' ||
      isNavigate
    ) {
      getFirebaseStatus();
    }
  }, []);

  useEffect(() => {
    const checkPatientStatus = () => {
      if (
        (patientStatus.status === 'doctorJoin' ||
          patientStatus.status === 'pharmacyJoin' ||
          patientStatus.status === 'physiotherapistJoin' ||
          patientStatus.status === 'nurseJoin') &&
        isNavigate
      ) {
        navigation.navigate('VideoCall', { setJoined: true });
      }
    };
    checkPatientStatus();
  }, [patientStatus.status]);

  useEffect(() => {
    firestore()
      .collection(`THREADS_${NODE_ENV}`)
      .doc(firebaseDocument)
      .set({
        name: 'ห้องโทรเวช',
        latestMessage: {
          text: `You have joined the room.`,
          createdAt: new Date().getTime(),
        },
      })
      .then(docRef => {
        docRef.collection('MESSAGES').add({
          text: `You have joined the room.`,
          createdAt: new Date().getTime(),
          system: true,
        });
      });
    const backAction = () => {
      if (!isNavigate && !onlyRead) {
        setChatScreen(false);
        //   console.log('clear chat noti');
        clearNoti && clearNoti(0);
      } else {
        //   console.log('clear chat noti');
        clearNoti && clearNoti(0);
        navigation.goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const messagesListener = firestore()
      .collection(`THREADS_${NODE_ENV}`)
      .doc(firebaseDocument)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();
          //   console.log('FIREBASEDATA', firebaseData);

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email,
            };
          }

          return data;
        });

        setMessages(messages);
      });

    // Stop listening for updates whenever the component unmounts
    return () => messagesListener();
  }, [bookingStatus]);

  const openImagePicker = async type => {
    const option = {
      mediaType: 'photo',
      quality: 0.5,
      saveToPhotos: false,
    };
    try {
      const res = await ImagePickerManager(type, option);
      const respImage = res?.hasOwnProperty('assets') ? res?.assets[0] : res;
      uploadImageToFirebase(respImage);
      setIsLoad(false);
    } catch (error) {
      setIsLoad(false);
    }
  };

  const uploadImageToFirebase = async res => {
    const newUri =
      Platform.OS == 'ios' ? res.uri.replace('file://', '') : res.uri;
    const storageRef = storage().ref(
      moment(res.timestamp)
        .unix()
        .toString(),
    );
    const task = storageRef.putFile(newUri);
    task.on(
      'state_changed',
      snapShot => {},
      error => {
        Alert.alert(
          'ไม่สามารถส่งรูปภาพได้',
          'พบข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
          [{ text: 'Close', onPress: () => console.log('Close Pressed') }],
          { cancelable: false },
        );
      },
      async () => {
        const image = await storageRef.getDownloadURL();
        firestore()
          .collection(`THREADS_${NODE_ENV}`)
          .doc(firebaseDocument)
          .collection('MESSAGES')
          .add({
            image,
            createdAt: new Date().getTime(),
            user: {
              _id: userTele.dataTele.userId,
            },
            read: false,
            delivered: false,
          });

        await firestore()
          .collection(`THREADS_${NODE_ENV}`)
          .doc(firebaseDocument)
          .set(
            {
              latestMessage: {
                image,
                createdAt: new Date().getTime(),
              },
            },
            { merge: true },
          );
      },
    );
  };

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#6646ee',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  }

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    );
  }

  // function renderSend(props) {
  //   return (
  //     <Send {...props}>
  //       <View style={styles.sendingContainer}>
  //         <Icon icon="send-circle" size={32} color="#6646ee" />
  //       </View>
  //     </Send>
  //   );
  // }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <Icon icon="chevron-double-down" size={36} color="#6646ee" />
      </View>
    );
  }

  function renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }

  const clearNotification = () => {
    setChatScreen(false);
    //   console.log('clear chat noti');
    clearNoti && clearNoti(0);
  };

  const goBack = () => {
    //   console.log('clear chat noti');
    clearNoti && clearNoti(0);
    navigation.goBack();
  };

  const renderComposer = props => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            modalRef && modalRef.current && modalRef.current.show();
          }}
        >
          <Ionicons
            name="ios-image"
            size={30}
            style={{ marginHorizontal: 5, padding: 2 }}
            color="#6646ee"
          />
        </TouchableOpacity>
        <Composer {...props} />
        <Send {...props}>
          <View style={styles.sendingContainer}>
            <MaterialCommunityIcons
              name="send-circle"
              size={32}
              color="#6646ee"
            />
          </View>
        </Send>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ ...BaseStyle.safeAreaView, backgroundColor: '#fff' }}
      forceInset={{ top: 'always' }}
    >
      <Header
        title="ประวัติการสนทนา"
        textStyle={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}
        renderLeft={() => {
          return <Icon name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          !isNavigate && !onlyRead ? clearNotification() : goBack();
        }}
      />
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={messages}
          onSend={!onlyRead ? handleSend : null}
          user={{ _id: userTele.dataTele.userId }}
          placeholder="Aa"
          alwaysShowSend={!onlyRead}
          showUserAvatar
          scrollToBottom
          renderBubble={renderBubble}
          renderLoading={renderLoading}
          renderComposer={renderComposer}
          // renderSend={renderSend}
          scrollToBottomComponent={scrollToBottomComponent}
          renderSystemMessage={renderSystemMessage}
        />
      </View>
      <ModalImagePicker
        ref={modalRef}
        onPress={type => {
          openImagePicker(type);
          setIsLoad(true);
        }}
      />
      <Loading isVisible={isLoad} opacity={0.6} bgColor={'#000'} />
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.user,
    userTele: state.userTele,
  };
};

export default connect(mapStateToProps)(GiftedChatMessage);
