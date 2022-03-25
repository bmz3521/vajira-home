import React from 'react';
import { View, FlatList, Text, SectionList } from 'react-native';
import { BookingTabHospital } from '@components';
import styles from './styles';
import { BaseStyle, BaseColor, Images } from '@config';

function BookingTab(props) {
  const { navigation, bookings } = props;

  const handlePressItem = React.useCallback(
    item => () => {
      navigation.navigate('MyBookingActivity', { bookingId: item?.bookingId });
    },
    [navigation],
  );

  return (
    <>
      {bookings.map((booking, index) => (
        <BookingTabHospital
          key={index}
          style={[styles.item]}
          booking={booking}
          onPress={handlePressItem(booking)}
        />
      ))}
    </>
  );
}

export default BookingTab;
