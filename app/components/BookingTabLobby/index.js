import React, { useEffect, useState } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Image, Text, Icon } from '@components';
import { getPriceText, getStatusText, getTimeText } from '@utils/shared';
import styles, { Card, TopCard, ProfileImage } from './styles';
import { BaseStyle, BaseColor, Images } from '@config';

import moment from 'moment';

function BookingTabHospital(props) {
  const { booking, onPress, patientDetail, loading } = props;
  const formatDay = moment(booking?.bookingDay).format('dddd D MMM');
  const formatDayFull = moment(booking?.bookingDay).format('HH:mm Do MMM');
  const [loopInterval, setLoopInterval] = useState(new Date().getMinutes());
  const [patientInfo, setPatientInfo] = useState(
    patientDetail?.patientInfo || '',
  );
  const [doctorInfo, setDoctorInfo] = useState(patientDetail?.doctor || '');
  const realTime = moment()
    .startOf('isoWeek')
    .add(booking?.bookingTime, 'minutes')
    .format('HH:mm');

  useEffect(() => {
    const interval = setInterval(() => {
      setLoopInterval(new Date().getMinutes());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const endTimes =
    booking?.bookingEndTime === 0
      ? null
      : moment()
          .startOf('isoWeek')
          .add(booking?.bookingEndTime, 'minutes')
          .format('HH:mm');
  let statusText = '';
  let showAppointment = false;
  let patientState = '';
  let doctorState = '';
  let icon = '';

  let formatTime;
  if (booking?.bookingEndTime) {
    formatTime = `เวลา ${moment()
      .startOf('isoWeek')
      .add(booking?.bookingTime, 'minutes')
      .format('HH:mm')} - ${moment()
      .startOf('isoWeek')
      .add(booking?.bookingEndTime, 'minutes')
      .format('HH:mm')} น.`;
  } else {
    formatTime = `เวลา ${moment()
      .startOf('isoWeek')
      .add(booking?.bookingTime, 'minutes')
      .format('HH:mm')} น.`;
  }

  const status = {
    inWaitingRoom: {
      textColor: 'green',
      text: 'ผู้ป่วยอยู่ในห้องรอ',
    },
    calling: {
      textColor: 'red',
      text: 'ผู้ป่วยกำลังพบแพทย์',
    },
    DOCTOR_ALERT: {
      textColor: 'red',
      text: 'การโทรมีปัญหารอทีมงานจองเวลาใหม่',
    },
  };

  let bookingTime = moment(booking?.bookingDay).format('YYYY-MM-DD');

  let checkBookingTime = moment(bookingTime).isBefore();

  const convertImage = base64 => {
    if (base64) {
      return `data:image/png;base64,${base64}`;
    }
    return 'https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-picture-default-avatar-photo-placeholder-profile-picture-eps-file-easy-to-edit-125707135.jpg';
  };
  const checkTitleName = patient => {
    let name = 'ไม่พบข้อมูลลูกค้า';
    if (patient.fullname && patient.fullname.firstName) {
      const { title, firstName, lastName } = patient.fullname;
      name = `${title} ${firstName} ${lastName}`;
    } else if (patient.user && patient.user.firstname) {
      const { firstname, lastname } = patient.user;
      name = `${firstname} ${lastname}`;
    }
    return name;
  };
  return loading ? (
    <View
      style={[
        styles.content,
        {
          backgroundColor: '#fff',
          height: 230,
        },
      ]}
    >
      <>
        <View style={styles.makeRow}>
          <>
            <View
              name="stethoscope"
              style={{
                backgroundColor: '#d9d9d9',
                width: 20,
                height: 20,
              }}
            />
            <View style={{ backgroundColor: '#d9d9d9' }}>
              <Text
                style={[
                  styles.titleText,
                  {
                    paddingRight: 5,
                    color: '#d9d9d9',
                  },
                ]}
              >
                {doctorInfo?.fullname}
              </Text>
            </View>
          </>

          <View style={[styles.status]}>
            <View style={{ backgroundColor: '#d9d9d9' }} />
            <View style={{ backgroundColor: '#d9d9d9' }}>
              <Text style={[styles.statusText, { color: '#d9d9d9' }]}>
                {status[patientDetail?.status]?.text}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.lineContainer}>
          <View style={styles.line} />
        </View>

        <TopCard>
          <>
            <View style={styles.makeRow}>
              <View
                style={[
                  styles.thumb,
                  { backgroundColor: '#d9d9d9', borderRadius: 15 },
                ]}
              />
              <View style={styles.userProfile}>
                <View style={styles.doctorProfile}>
                  <View style={styles.wrapName}>
                    <Text
                      style={[
                        styles.detailText,
                        {
                          color: '#d9d9d9',
                          backgroundColor: '#d9d9d9',
                          height: 15,
                          marginVertical: 5,
                        },
                      ]}
                    >
                      {checkTitleName(patientDetail)}
                    </Text>
                  </View>
                </View>
                <View style={styles.doctorProfile}>
                  <View style={styles.wrapName}>
                    <Text
                      style={[
                        styles.detailText,
                        {
                          color: '#d9d9d9',
                          backgroundColor: '#d9d9d9',
                          height: 15,
                          marginVertical: 5,
                        },
                      ]}
                    >
                      คลินิก{' '}
                      {patientDetail?.doctor?.detail
                        ? patientDetail?.doctor?.detail?.department
                        : 'ไม่ระบุ'}
                    </Text>
                  </View>
                </View>
                <View style={styles.doctorProfile}>
                  <Text
                    style={[
                      styles.detailText,
                      {
                        color: '#d9d9d9',
                        backgroundColor: '#d9d9d9',
                        height: 15,
                        marginVertical: 5,
                      },
                    ]}
                  >
                    แพทย์ผู้สั่งยา : {doctorInfo?.fullname}
                  </Text>
                </View>
                <View style={styles.doctorProfile}>
                  <Text
                    style={[
                      styles.detailText,
                      {
                        color: '#d9d9d9',
                        backgroundColor: '#d9d9d9',
                        height: 15,
                        marginVertical: 5,
                      },
                    ]}
                  >
                    เวลา:
                    {patientDetail.bookingEndTime
                      ? ` ${moment()
                          .startOf('week')
                          .add(patientDetail.bookingTime, 'minutes')
                          .format('HH:mm')} - ${moment()
                          .startOf('week')
                          .add(patientDetail.bookingEndTime, 'minutes')
                          .format('HH:mm')}`
                      : `  ${moment()
                          .startOf('week')
                          .add(patientDetail.bookingTime, 'minutes')
                          .format('HH:mm')}`}{' '}
                    น.
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.makeColumn}>
              <Text
                style={[
                  styles.detailText,
                  {
                    color: '#d9d9d9',
                    backgroundColor: '#d9d9d9',
                    height: 15,
                    marginVertical: 5,
                  },
                ]}
              >
                {patientDetail.date
                  ? moment(moment().valueOf() - patientDetail.date).format(
                      'mm',
                    ) < 3
                    ? `เข้ามาในห้องรอเมื่อ ${moment(patientDetail.date).format(
                        'HH:mm',
                      )} (ไม่กี่นาทีที่แล้ว)`
                    : `เข้ามาในห้องรอเมื่อ ${moment(patientDetail.date).format(
                        'HH:mm',
                      )} (${
                        moment
                          .duration(
                            moment().valueOf() - moment(patientDetail.date),
                          )
                          .hours() > 0
                          ? `${moment
                              .duration(
                                moment().valueOf() - moment(patientDetail.date),
                              )
                              .hours()} ชั่วโมง `
                          : ''
                      }${moment
                        .duration(
                          moment().valueOf() - moment(patientDetail.date),
                        )
                        .minutes()} นาทีที่แล้ว)`
                  : 'ไม่ระบุเวลาเขัา'}
              </Text>
            </View>
          </>
        </TopCard>
      </>
    </View>
  ) : (
    <TouchableHighlight
      underlayColor="#f4f2f2"
      style={[
        styles.content,
        {
          backgroundColor: checkBookingTime ? '#fff' : '#fff',
        },
      ]}
      onPress={onPress}
    >
      <>
        <View style={styles.makeRow}>
          {booking?.status === 'EPHIS_CONFIRM' ||
          booking?.status === 'PHARMACY_CONFIRM_BOOKING' ||
          booking?.status === 'PHARMACY_PENDING_BOOKING' ||
          booking?.status === 'PHARMACY_COMPLETED' ? (
            <>
              <Icon
                name="prescription-bottle-alt"
                style={[
                  styles.titleIcon,
                  { color: checkBookingTime ? '#085394' : '#085394' },
                ]}
              />
              <Text
                style={[
                  styles.titleText,
                  {
                    paddingRight: 5,
                    color: checkBookingTime ? '#085394' : '#085394',
                  },
                ]}
              >
                DOCTOR01
              </Text>
            </>
          ) : (
            <>
              <Icon
                name="stethoscope"
                style={[
                  styles.titleIcon,
                  { color: checkBookingTime ? '#085394' : '#085394' },
                ]}
              />
              <Text
                style={[
                  styles.titleText,
                  {
                    paddingRight: 5,
                    color: checkBookingTime ? '#085394' : '#085394',
                  },
                ]}
              >
                {doctorInfo?.fullname}
              </Text>
            </>
          )}
          <View style={styles.status}>
            <View
              style={[
                styles.statusIcon,
                { backgroundColor: status[patientDetail?.status]?.textColor },
              ]}
            />
            <Text
              style={[
                styles.statusText,
                { color: status[patientDetail?.status]?.textColor },
              ]}
            >
              {status[patientDetail?.status]?.text}
            </Text>
          </View>
        </View>

        <View style={styles.lineContainer}>
          <View style={styles.line} />
        </View>

        <TopCard>
          <>
            <View style={styles.makeRow}>
              <ProfileImage
                style={styles.thumb}
                source={{
                  uri: convertImage(patientDetail?.imageBase64),
                }}
              />
              <View style={styles.userProfile}>
                <View style={styles.doctorProfile}>
                  <View style={styles.wrapName}>
                    <Text style={styles.detailText}>
                      {checkTitleName(patientDetail)}
                    </Text>
                  </View>
                </View>
                <View style={styles.doctorProfile}>
                  <View style={styles.wrapName}>
                    <Text style={styles.detailText}>
                      คลินิก{' '}
                      {patientDetail?.doctor?.detail
                        ? patientDetail?.doctor?.detail?.department
                        : 'ไม่ระบุ'}
                    </Text>
                  </View>
                </View>
                <View style={styles.doctorProfile}>
                  <Text style={styles.timeText}>
                    แพทย์ผู้สั่งยา : {doctorInfo?.fullname}
                  </Text>
                </View>
                <View style={styles.doctorProfile}>
                  <Text style={styles.timeText}>
                    เวลา:
                    {patientDetail.bookingEndTime
                      ? ` ${moment()
                          .startOf('week')
                          .add(patientDetail.bookingTime, 'minutes')
                          .format('HH:mm')} - ${moment()
                          .startOf('week')
                          .add(patientDetail.bookingEndTime, 'minutes')
                          .format('HH:mm')}`
                      : `  ${moment()
                          .startOf('week')
                          .add(patientDetail.bookingTime, 'minutes')
                          .format('HH:mm')}`}{' '}
                    น.
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.makeColumn}>
              <Text style={styles.appoitnmentText}>
                {patientDetail.date
                  ? moment(moment().valueOf() - patientDetail.date).format(
                      'mm',
                    ) < 3 &&
                    moment
                      .duration(moment().valueOf() - moment(patientDetail.date))
                      .hours() === 0
                    ? `เข้ามาในห้องรอเมื่อ ${moment(patientDetail.date).format(
                        'HH:mm',
                      )} (ไม่กี่นาทีที่แล้ว)`
                    : `เข้ามาในห้องรอเมื่อ ${moment(patientDetail.date).format(
                        'HH:mm',
                      )} (${
                        moment
                          .duration(
                            moment().valueOf() - moment(patientDetail.date),
                          )
                          .hours() > 0
                          ? `${moment
                              .duration(
                                moment().valueOf() - moment(patientDetail.date),
                              )
                              .hours()} ชั่วโมง `
                          : ''
                      }${moment
                        .duration(
                          moment().valueOf() - moment(patientDetail.date),
                        )
                        .minutes()} นาทีที่แล้ว)`
                  : 'ไม่ระบุเวลาเขัา'}
              </Text>
            </View>
          </>
        </TopCard>
      </>
    </TouchableHighlight>
  );
}

export default BookingTabHospital;
