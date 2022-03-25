import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Image, Text, Icon } from '@components';
import { getPriceText, getStatusText, getTimeText } from '@utils/shared';
import styles, { Card, TopCard, ProfileImage } from './styles';
import { BaseStyle, BaseColor, Images } from '@config';

import moment from 'moment';

function BookingTabHospital(props) {
  const { booking, onPress } = props;
  const formatDay = moment(booking?.bookingDay).format('dddd D MMM');
  const formatDayFull = moment(booking?.bookingDay).format('HH:mm Do MMM');

  const realTime = moment()
    .startOf('isoWeek')
    .add(booking?.bookingTime, 'minutes')
    .format('HH:mm');

  const endTimes =
    booking?.bookingEndTime === 0
      ? null
      : moment()
          .startOf('isoWeek')
          .add(booking?.bookingEndTime, 'minutes')
          .format('HH:mm');
  let statusText = '';
  let textColor = '';
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

  switch (booking?.status) {
    case 'DOCTOR_CONFIRM':
      doctorState = 'docConfirm';
      //statusText = 'ได้รับการอนุมัติจากแพทย์';
      statusText = 'ได้รับการอนุมัติ';
      textColor = 'green';
      // showAppointment = true;
      icon = 'doctor';
      break;

    case 'DOCTOR_PENDING':
      doctorState = 'docPending';
      //statusText = 'รอแพทย์ยืนยันการนัดหมาย';
      statusText = 'รอการยืนยัน';
      textColor = 'orange';
      icon = 'doctor';
      break;

    case 'DOCTOR_DECLINE':
      doctorState = 'docDecline';
      //statusText = 'แพทย์ยกเลิกการนัดหมาย';
      statusText = 'การนัดหมายถูกยกเลิก';
      textColor = 'red';
      icon = 'doctor';
      break;

    case 'DOCTOR_PENDING_RX':
      doctorState = 'docRx';
      statusText = 'แพทย์รอจ่ายยา';
      textColor = 'orange';
      icon = 'doctor-Rx';
      break;

    case 'DOCTOR_ALERT':
      patientState = 'doctorAlert';
      textColor = 'red';
      statusText = 'การโทรมีปัญหารอทีมงานจองเวลาใหม่';
      icon = 'doctor';
      break;

    case 'STAFF_CONFIRM':
      doctorState = 'staffConfirm';
      statusText = 'ได้รับการอนุมัติ';
      textColor = 'green';
      icon = 'doctor';
      break;

    case 'STAFF_PENDING':
      doctorState = 'staffPending';
      statusText = 'รอการยืนยัน';
      textColor = 'orange';
      icon = 'doctor';
      break;

    case 'STAFF_DECLINE':
      doctorState = 'staffDecline';
      statusText = 'การนัดหมายถูกยกเลิก';
      textColor = 'red';
      icon = 'doctor';
      break;

    case 'STAFF_ALERT':
      patientState = 'staffAlert';
      textColor = 'red';
      statusText = 'การโทรมีปัญหารอทีมงานจองเวลาใหม่';
      icon = 'doctor';
      break;

    case 'PATIENT_DRAFT':
      doctorState = 'patientDraft';
      statusText = 'รอการยืนยัน';
      textColor = 'orange';
      icon = 'doctor';
      break;

    case 'PATIENT_SUCCESS_PAYMENT':
      patientState = 'patientSuccess';
      textColor = 'green';
      statusText = 'ชำระเงินเสร็จสิ้น';
      icon = 'Rx';
      break;

    case 'PATIENT_DECLINE_PAYMENT':
      patientState = 'patientDecline';
      textColor = 'red';
      statusText = 'ผู้ป่วยยกเลิกการชำระเงิน';
      icon = 'doctor';
      break;

    case 'PHARMACY_ALERT':
      patientState = 'pharmacyAlert';
      textColor = 'red';
      statusText = 'การโทรมีปัญหารอทีมงานจองเวลาใหม่';
      icon = 'RX';
      break;

    case 'PHARMACY_PENDING_RX':
      patientState = 'pharmacyPending';
      textColor = 'orange';
      statusText = 'รอเภสัชกรตรวจยา';
      icon = 'Rx';
      break;

    case 'PHARMACY_COMPLETE_RX':
      patientState = 'pharmacyComplete';
      textColor = 'green';
      statusText = 'เภสัชกรตรวจยาเสร็จแล้ว';
      icon = 'Rx';
      break;

    case 'PHARMACY_PENDING_BOOKING':
      patientState = 'pharmacyBooking';
      statusText = 'รอการยืนยัน';
      textColor = 'orange';
      // showAppointment = true;
      icon = 'Rx';
      break;

    case 'PHARMACY_CONFIRM_BOOKING':
      patientState = 'pharmacyConfirm';
      statusText = 'เภสัชกรยืนยันการนัดหมาย';
      textColor = 'green';
      icon = 'Rx';
      break;

    case 'PHARMACY_DECLINE_BOOKING':
      patientState = 'pharmacyDecline';
      statusText = 'เภสัชกรยกเลิกการนัดหมาย';
      textColor = 'red';
      icon = 'Rx';
      break;

    case 'CALL_CENTER_CONFIRM':
      patientState = 'centerConfirm';
      textColor = 'orange';
      statusText = 'รอผู้ป่วยดำเนินการชำระเงิน';
      icon = 'doctor';
      break;

    case 'CALL_CENTER_DECLINE':
      patientState = 'centerDecline';
      statusText = 'เจ้าหน้าที่ยกเลิกการนัดหมาย';
      textColor = 'red';
      icon = 'doctor';
      break;

    case 'EPHIS_CONFIRM':
      patientState = 'ephisPending';
      statusText = 'ทำการนัดหมายเภสัชกร';
      textColor = 'green';
      icon = 'Rx';
      break;

    case 'EPHIS_PENDING':
      patientState = 'ephisPending';
      statusText = 'รอแพทย์สั่งยา';
      textColor = 'orange';
      icon = 'Rx';
      break;

    case 'BOOKING_COMPLETED':
      patientState = 'bookingComplete';
      statusText = 'เสร็จสิ้น';
      textColor = 'blue';
      icon = 'Rx';
      break;

    case 'DOCTOR_COMPLETED':
      patientState = 'doctorComplete';
      statusText = 'เสร็จสิ้นการพบแพทย์';
      textColor = 'blue';
      icon = 'doctor';
      break;

    case 'STAFF_COMPLETED':
      patientState = 'staffComplete';
      statusText = `เสร็จสิ้นการพบ${
        booking?.otherTypeName
          ? booking?.otherTypeName
          : booking?.otherType === 'physiotherapist'
          ? 'นักกายภาพบำบัด'
          : booking?.otherType === 'nurse'
          ? 'พยาบาล'
          : ''
      }`;
      textColor = 'blue';
      icon = 'doctor';
      break;

    case 'PHARMACY_COMPLETED':
      patientState = 'pharmacyComplete';
      statusText = 'เสร็จสิ้นการพบเภสัชกร';
      textColor = 'blue';
      icon = 'Rx';
      break;
  }

  let bookingTime = moment(booking?.bookingDay).format('YYYY-MM-DD');

  let checkBookingTime = moment(bookingTime).isBefore();

  return (
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
                  { color: checkBookingTime ? '#085394' : '#085394' },
                ]}
              >
                นัดหมายเภสัชกร
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
                นัดหมาย
                {booking?.otherTypeName
                  ? booking?.otherTypeName
                  : booking?.otherType === 'physiotherapist'
                  ? 'นักกายภาพบำบัด'
                  : booking?.otherType === 'nurse'
                  ? 'พยาบาล'
                  : 'แพทย์'}
              </Text>
            </>
          )}
          <View style={styles.status}>
            <View style={[styles.statusIcon, { backgroundColor: textColor }]} />
            <Text style={[styles.statusText, { color: textColor }]}>
              {statusText}
            </Text>
          </View>
        </View>

        <View style={styles.lineContainer}>
          <View style={styles.line} />
        </View>

        <TopCard>
          <View style={styles.makeColumn}>
            <Text style={styles.timeText}>วันและเวลาที่นัดหมาย:</Text>
            <Text style={styles.appoitnmentText}>
              วัน{formatDay} เวลา {realTime}{' '}
              {endTimes && (
                <Text style={styles.appoitnmentText}>- {endTimes}</Text>
              )}{' '}
              น.
            </Text>
          </View>
          {booking?.status !== 'EPHIS_CONFIRM' &&
          booking?.status !== 'PHARMACY_CONFIRM_BOOKING' &&
          booking?.status !== 'PHARMACY_PENDING_BOOKING' &&
          booking?.status !== 'PHARMACY_COMPLETED' &&
          booking?.doctor &&
          booking?.doctor.detail !== undefined ? (
            <>
              <View style={styles.makeColumn}>
                <Text style={styles.timeText}>
                  {booking?.otherTypeName
                    ? booking?.otherTypeName
                    : booking?.otherType === 'physiotherapist'
                    ? 'นักกายภาพบำบัด'
                    : booking?.otherType === 'nurse'
                    ? 'พยาบาล'
                    : 'แพทย์'}
                  ผู้ให้คำปรึกษา
                </Text>
              </View>

              <View style={styles.makeRow}>
                <ProfileImage
                  style={styles.userAva}
                  source={{
                    uri:
                      booking?.doctor && booking?.doctor?.profileImage
                        ? booking?.doctor?.profileImage
                        : '',
                  }}
                />
                <View style={styles.userProfile}>
                  <View style={styles.doctorProfile}>
                    <View style={styles.wrapName}>
                      <Text style={styles.detailText}>
                        {booking?.doctor && booking?.doctor?.fullname
                          ? booking?.doctor?.fullname
                          : ''}
                      </Text>
                    </View>
                  </View>

                  {booking?.doctor.detail ? (
                    <View style={styles.doctorProfile}>
                      <View style={styles.wrapName}>
                        <Text style={styles.detailText}>
                          {booking?.doctor?.detail?.department}
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
            </>
          ) : null}
        </TopCard>
      </>
    </TouchableHighlight>
  );
}

export default BookingTabHospital;
