import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Image, Text, Icon } from '@components';
import { getPriceText, getStatusText, getTimeText } from '@utils/shared';
import styles from './styles';
import { BaseStyle, BaseColor, Images } from '@config';

import moment from 'moment';

function BookingTabPatientHistoryCard(props) {
  const { navigation, booking, onPress } = props;
  const formatDay = moment(booking.bookingTime).format('MMM / Do');
  const formatDayFull = moment(booking.bookingTime).format('HH:mm Do MMM');

  const handlePressItem = React.useCallback(
    booking => () => {
      console.log('triiggering');
      navigation.navigate('MyHealthHistory', { booking });
    },
    [navigation],
  );

  console.log('diagnosisThaiNamesadasda');
  console.log(booking);

  console.log(booking.diagnosisThaiName);

  let statusText = '';
  let textColor = '';
  let showAppointment = false;
  switch (booking.status) {
    case 'DOCTOR_CONFIRM':
      statusText = 'นัดหมายแพทย์สำเร็จ';
      textColor = 'green';
      showAppointment = true;
      break;
    case 'PHARMACY_CONFIRM_BOOKING':
      statusText = 'เภสัชกรนัดหมายสำเร็จ';
      textColor = 'green';
      showAppointment = true;
      break;
    default:
    // code block
  }

  return (
    <TouchableOpacity
      style={[styles.content]}
      onPress={handlePressItem(booking)}
    >
      <View style={{ flex: 1, marginLeft: 10 }}>
        <View
          style={{
            // borderStyle: 'solid',
            height: 250,
            borderLeftWidth: 1,
            borderRightWidth: 0,
            marginTop: 20,
            position: 'absolute',
          }}
        ></View>
        <Icon
          name="circle"
          style={{
            width: 50,
            height: 50,
            fontSize: 24,
            marginLeft: -11,
            marginTop: -3,
          }}
        />
      </View>

      <View style={{ flex: 8 }}>
        <View style={styles.colFirstChild}>
          <Text style={{ textAlign: 'right', color: '#575757' }} body1>
            {formatDay}
          </Text>
        </View>

        <View style={styles.blockView}>
          <View style={styles.row}>
            <View style={styles.col}>
              {/* <Text style={{ textAlign: 'left', color: textColor }} body1 bold>
                    {statusText}
                    </Text> */}
              <Text style={{ textAlign: 'left', color: 'black' }} body1 bold>
                {booking.diagnosisThaiName[0].icd10ThaiName}
              </Text>
              <Text style={{ textAlign: 'left' }} body1>
                {booking.doctorName}
              </Text>
              <Text
                body1
                numberOfLines={1}
                style={{ textAlign: 'left', color: '#575757' }}
              >
                {booking.department} - {booking.address}
              </Text>
            </View>
            <View style={styles.colFirstChild}>
              <Image
                source={Images.homeicon7}
                style={{ width: 50, height: 50, marginLeft: -7 }}
              />
            </View>
          </View>
        </View>
      </View>

      {showAppointment ? (
        <View>
          <View
            style={{
              marginTop: 20,
              marginBottom: 20,
              borderTopWidth: 1,
              borderTopColor: '#D8D8D8',
            }}
          />
          <View>
            <Text body1 style={{ marginBottom: 10 }}>
              เวลานัดหมาย: {formatDayFull}
            </Text>
          </View>
        </View>
      ) : (
        <View />
      )}

      {/* {booking.procedures.map(procedure => (
                    <View style={styles.row}>
                        <View style={styles.leftView2}>
                            <Text body2>{procedure.name}</Text>
                        </View>
                        <View style={styles.rightView}>
                            <Text body2 grayColor>
                                {`(${getPriceText(procedure)})`}
                            </Text>
                        </View>
                    </View>
                ))} */}
    </TouchableOpacity>
  );
}

export default BookingTabPatientHistoryCard;
