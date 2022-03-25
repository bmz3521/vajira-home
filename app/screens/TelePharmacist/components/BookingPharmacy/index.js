import React from 'react';
import { View, FlatList, Text, SectionList } from 'react-native';
import BookingTabPharmacy from '../BookingTabPharmacy';
import styles from './styles';
import { BaseStyle, BaseColor, Images } from '@config';

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

function BookingPharmacy(props) {
  const { navigation, bookings } = props;

  const handlePressItem = React.useCallback(
    booking => () => {
      navigation.navigate('Prescription', {
        booking,
        PAYMENT_STATUS,
      });
    },
    [navigation],
  );

  return (
    <>
      {bookings.map(booking => (
        <BookingTabPharmacy
          key={booking.id}
          style={[styles.item]}
          booking={booking}
          onPress={handlePressItem(booking)}
        />
      ))}
    </>
  );
}

export default BookingPharmacy;
