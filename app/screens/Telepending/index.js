import React, { useRef, useEffect, useState, Component } from 'react';
import {
  Animated,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Platform,
  TouchableHighlight,
} from 'react-native';
import { BaseStyle, BaseColor, Images } from '@config';
import { Header, SafeAreaView, Icon, Image } from '@components';
import { DotIndicator } from 'react-native-indicators';
import axios from 'axios';
import firebase from '@react-native-firebase/app';
import styles from './styles';
import { fcmService } from '../../FCMService';
import { localNotificationService } from '../../LocalNotificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import OfficerCard from './doctorCard';
import MobileIcon from '@assets/images/mobile-icon.png';
import CalendarIcon from '@assets/images/calendar-icon.png';
import RejectIcon from '@assets/images/reject-icon.png';
import ChatIcon from '@assets/images/chat.png';
import LocationIcon from '@assets/images/bookingicon1.png';
import LinearGradient from 'react-native-linear-gradient';

const TouchablePlatform =
  Platform.OS === 'android' ? TouchableHighlight : TouchableOpacity;

const PulseView = props => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(props.delays),
      Animated.loop(
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 3000,
          }),
          Animated.timing(scaleAnim, {
            toValue: 2,
            duration: 3000,
          }),
        ]),
      ),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default class Telepending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callStatus: 'patientWaiting',
      officer: '',
    };
  }

  onRegister(token) {
    console.log('[oj] onRegister: ', token);
  }

  onNotification(notify) {
    console.log('[App] onNotification: ', notify);
    const options = {
      soundName: 'default',
      playSound: true, //,
      // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
      // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
    };
    localNotificationService.showNotification(
      0,
      notify.title,
      notify.body,
      notify,
      options,
    );

    console.log('[NotificationFCM] onNotification: ', notify);
    // For Android
    const channelObj = {
      channelId: 'SampleChannelID',
      channelName: 'SampleChannelName',
      channelDes: 'SampleChannelDes',
    };
    const channel = fcmService.buildChannel(channelObj);

    const buildNotify = {
      dataId: notify._notificationId,
      title: notify._title,
      content: notify._body,
      sound: 'default',
      channel: channel,
      data: {
        fullname: 'sittikiat',
      },
      colorBgIcon: '#1A243B',
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_launcher',
      vibrate: true,
    };

    const notification = fcmService.buildNotification(buildNotify);
    fcmService.displayNotification(notification);
  }

  onOpenNotification(notify) {
    console.log('[NotificationFCM] onOpenNotification: ', notify);
    alert('Open Notification: ' + notify._body);
  }

  setPermission = async () => {
    try {
      const enabled = await firebase.messaging().hasPermission();
      if (!enabled) {
        await firebase.messaging().requestPermission();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  initNotification = async () => {
    await this.setPermission();
    const fcmToken = await firebase.messaging().getToken();
    await AsyncStorage.setItem('fcmToken', fcmToken);
    // await this.createNoti();
  };

  render() {
    const {
      navigation,
      otherType,
      otherTypeName,
      telemedicine,
      cancelRoom,
      chatNoti,
    } = this.props;
    const officerInfo = telemedicine.data.doctor;
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView, { backgroundColor: '#ffffff' }]}
        forceInset={{ top: 'always' }}
      >
        <Header
          title={`โทรคุยกับ${
            otherTypeName
              ? otherTypeName
              : otherType === 'physiotherapist'
              ? 'นักกายภาพบำบัด'
              : otherType === 'nurse'
              ? 'พยาบาล'
              : 'แพทย์'
          }`}
          textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
          renderLeft={() => {
            return <Icon bold name="chevron-down" size={20} color="#fff" />;
          }}
          onPressLeft={() => {
            cancelRoom();
          }}
        />
        <View style={styles.section1}>
          <Text style={styles.header}>
            ห้องรอปรึกษา
            {otherTypeName
              ? otherTypeName
              : otherType === 'physiotherapist'
              ? 'นักกายภาพบำบัด'
              : otherType === 'nurse'
              ? 'พยาบาล'
              : this.props.officer === 'pharmacy'
              ? 'เภสัชกร'
              : 'แพทย์'}
          </Text>
          <Text style={styles.label}>
            ขณะนี้
            {otherTypeName
              ? otherTypeName
              : otherType === 'physiotherapist'
              ? 'นักกายภาพบำบัด'
              : otherType === 'nurse'
              ? 'พยาบาล'
              : this.props.officer === 'pharmacy'
              ? 'เภสัชกร'
              : 'แพทย์'}
            กำลังเตรียมความพร้อม
          </Text>
        </View>
        <View style={styles.container}>
          <View style={{ marginTop: 60 }} />
          <View style={styles.section2}>
            <TouchablePlatform
              activeOpacity={0.2}
              underlayColor={
                Platform.OS === 'android' ? 'white' : 'transparent'
              }
              onPress={() => this.props.setChatScreen(true)}
            >
              <View style={styles.circleSmall}>
                <View style={styles.alert}>
                  <Image style={styles.alertPic} source={Images.setting06} />
                  <Text style={styles.alertText}>{chatNoti}</Text>
                </View>
                <Icon name="comment-dots" style={styles.greenIcon} />
                <Text style={styles.greenText}>ข้อความ</Text>
              </View>
            </TouchablePlatform>

            <View style={styles.circle}>
              <Text style={styles.timeText2}>เวลา</Text>
              <Text style={styles.timeText}>
                {`${this.props.minutesCounter} : ${this.props.secondsCounter}`}
              </Text>
              <Text style={styles.timeText2}>นาที</Text>
            </View>
            <View style={styles.circleSmall}>
              <Icon name="video" style={styles.blueIcon} />
              <Text style={styles.blueText}>รอสักครู่</Text>
            </View>
            {/* <PulseView style={styles.circle} delays={2000}></PulseView>
            <PulseView style={styles.circle} delays={1000}></PulseView>
            <PulseView style={styles.circle} delays={0}></PulseView> */}
          </View>
          <View style={styles.section3}>
            <Text>
              {this.props.officer === 'pharmacy'
                ? 'รอเภสัชกรแจ้งเข้าห้อง...'
                : `รอ${
                    otherTypeName
                      ? otherTypeName
                      : otherType === 'physiotherapist'
                      ? 'นักกายภาพบำบัด'
                      : otherType === 'nurse'
                      ? 'พยาบาล'
                      : 'แพทย์'
                  }แจ้งเข้าห้อง...`}
            </Text>
            <DotIndicator
              color="#d9d9d9"
              size={10}
              count={3}
              style={{ marginTop: 10 }}
            />
          </View>
          <View style={styles.section4}>
            {/* {console.log(doctor.profileImage)} */}
            {/* <Image
              source={{ uri: doctor.profileImage }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginTop: 20,
                marginBottom: 10,
                backgroundColor: 'black',
              }}
            /> */}
            {/* <Text>{doctor.fullname}</Text> */}
          </View>
        </View>
        {/* <View>
          <View style={{ marginHorizontal: 10 }}>
            <View
              style={[styles.shadowBox, { marginTop: 20, marginBottom: 20 }]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 0,
                  paddingBottom: 15,
                }}
              >
                <View style={{ width: '10%' }}>
                </View>
                <View style={{ width: '60%', flexDirection: 'column' }}>
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                      รอสักครู่
                    </Text>
                  </View>

                  {this.state.callStatus === 'ambulanceDispatched' && (
                    <View style={{ alignSelf: 'center', height: 50 }}>
                      <Text style={{ fontSize: 18 }}>
                        เจ้าหน้าที่กำลังเดินทางไปหาคุณ
                      </Text>
                    </View>
                  )}
                </View>

                <View style={{ width: '15%', alignSelf: 'flex-start' }}>
                  {this.state.callStatus === 'patientWaiting' && (
                    <ActivityIndicator size="large" color="orange" />
                  )}
                  {this.state.callStatus === 'ambulanceDispatched' && (
                    <ActivityIndicator size="large" color="green" />
                  )}
                </View>
              </View>
            </View>
          </View>
        </View> */}

        <View style={styles.officerContainer}>
          <View style={styles.makeRow}>
            <Icon name="list-alt" style={styles.serviceIcon} />
            <Text style={styles.serviceText}>ข้อมูลการรับบริการ</Text>
          </View>
          {telemedicine.data && telemedicine.data.doctor && (
            <OfficerCard
              data={officerInfo}
              officerType={this.props.officer}
              otherType={otherType}
              otherTypeName={otherTypeName}
            />
          )}

          {this.state.callStatus === 'ambulanceDispatched' && (
            <View
              style={{
                width: '45%',
                flexDirection: 'column',
                borderLeftWidth: 0.5,
                borderLeftColor: 'black',
              }}
            >
              <View>
                <Text>แผนก EMS โรงพยาบาลวชิระ</Text>
              </View>
              <View>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                  กรุณาอย่าเคลื่อนย้ายที่
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* <View
          style={{
            width: '45%',
            flexDirection: 'column',
            borderLeftWidth: 0.5,
            borderLeftColor: '#dddddd',
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TeleChatMessages', {
                isNavigate: true,
              })
            }
          >
            <Image
              source={ChatIcon}
              style={{
                width: 50,
                height: 50,
                alignSelf: 'center',
                marginTop: 5,
              }}
            />
          </TouchableOpacity>
        </View> */}
      </SafeAreaView>
    );
  }
}
