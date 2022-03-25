import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Image, Text, Icon } from '@components';
import { getPriceText, getStatusText, getTimeText } from '@utils/shared';
import styles, { Card, TopCard, ProfileImage } from './styles';
import { BaseStyle, BaseColor, Images } from '@config';

import moment from 'moment';

const PAYMENT_STATUS = {
  PHARMACY_CONFIRM_RX: 'รอผู้ป่วยชำระเงิน',
  PATIENT_PENDING_PAYMENT: 'ยังไม่ชำระ โปรดชำระค่าใช้จ่าย',
  PATIENT_SUCCESS_PAYMENT: 'ชำระเงินแล้ว',
  WAIT_FOR_PHARMACYSTORE_NOTIFY: 'กำลังจัดส่งไปที่ร้านยา',
  WAIT_FOR_PATIENT_PHARMACY: 'รอผู้ป่วยมารับยา',
  WAIT_FOR_PATIENT_EMS: 'กำลังจัดส่งทางไปรษณีย์',
  WAIT_FOR_PATIENT_PHAMACYSTORE: 'รอผู้ป่วยมารับยาที่ร้านยา',
  SUCCESS_BY_EMS: 'รับยาจากไปรษณีย์แล้ว',
  SUCCESS_BY_PHARMACYSTORE: 'รับยาจากร้านยาใกล้บ้านแล้ว',
  SUCCESS_BY_PHARMACY: 'ผู้ป่วยมารับยาแล้ว',
  SUCCESS_BY_PATIENT: 'ผู้ป่วยมารับยาแล้ว',
};

const checkPaymentColor = status => {
  if (status.includes('PENDING') || status.includes('WAIT')) {
    return '#CC4344';
  } else if (status.includes('SUCCESS')) {
    return '#09B678';
  } else {
    return '#08B678';
  }
};

const checkStatusColor = status => {
  if (status.includes('WAIT')) {
    return '#F3BF06';
  } else if (status.includes('SUCCESS')) {
    return '#09B678';
  } else {
    return '#08B678';
  }
};

function BookingTabPharmacy(props) {
  const { booking, onPress } = props;

  let statusText = '';
  let textColor = '';
  let showAppointment = false;
  let patientState = '';
  let doctorState = '';
  let icon = '';

  // switch (booking.status) {
  //   case 'DOCTOR_CONFIRM':
  //     doctorState = 'docConfirm';
  //     statusText = 'ได้รับการอนุมัติจากแพทย์';
  //     textColor = 'green';
  //     // showAppointment = true;
  //     icon = 'doctor';
  //     break;

  //   case 'DOCTOR_PENDING':
  //     doctorState = 'docPending';
  //     statusText = 'รอแพทย์ยืนยันการนัดหมาย';
  //     textColor = 'orange';
  //     icon = 'doctor';
  //     break;
  // }

  // console.log('xxxx');
  // console.log(booking.prescription.paymentStatus);

  return (
    <TouchableOpacity
      style={{
        margin: 4,
        borderColor: BaseColor.textSecondaryColor,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        elevation: 3,
        padding: 10,
      }}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: checkPaymentColor(
              booking.prescription.paymentStatus,
            ),
            borderRadius: 50,
            width: 45,
            height: 45,
            marginTop: 10,
            marginBottom: 10,
            marginRight: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image source={Images.homeicon8} style={{ width: 25, height: 25 }} />
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
        >
          <View>
            <Text bold>
              {`${
                moment(booking.admitTime)
                  .format('LLLL')
                  .split('เวลา')[0]
              }`}
            </Text>
            <Text>{`เวลา ${moment()
              .startOf('isoWeek')
              .add(booking.bookingTime, 'minutes')
              .format('HH:mm')} น.`}</Text>
            <Text
              bold
              style={{
                color: checkPaymentColor(booking.prescription.paymentStatus),
              }}
            >
              {`${PAYMENT_STATUS[booking.prescription.paymentStatus]}`}
            </Text>
            <Text
              bold
              style={{
                color: checkStatusColor(booking.prescription.status),
              }}
            >
              {`${PAYMENT_STATUS[booking.prescription.status]}`}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 2,
          }}
        >
          <Icon name="chevron-right" size={20} color="#535353" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default BookingTabPharmacy;
