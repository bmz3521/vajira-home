import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Image, Text } from '@components';
import { getPriceText, getStatusText, getTimeText } from '@utils/shared';
import styles from './styles';

function BookingTabItem(props) {
  const { booking, onPress } = props;

  return (
    <TouchableOpacity style={[styles.content]} onPress={onPress}>
      <View style={styles.blockView}>
        <View style={styles.row}>
          <View style={styles.leftView}>
            <Image
              style={styles.image}
              source={{ uri: booking?.featureImageM }}
            />
          </View>
          <View style={[styles.rightView, { flex: 2, marginLeft: 16 }]}>
            <Text body1>{booking?.name}</Text>
            <Text grayColor>{`${booking?.city}, ${booking?.country}`}</Text>
          </View>
        </View>
      </View>
      <View style={styles.blockView}>
        <View style={styles.row}>
          <View style={styles.colFirstChild}>
            <Text style={{ textAlign: 'center' }}>From</Text>
            <Text style={{ textAlign: 'center' }}>
              {getTimeText(booking?.startTime)}
            </Text>
          </View>
          <View style={styles.col}>
            <Text style={{ textAlign: 'center' }}>To</Text>
            <Text style={{ textAlign: 'center' }}>
              {getTimeText(booking?.endTime)}
            </Text>
          </View>
          <View style={styles.col}>
            <Text style={{ textAlign: 'center' }}>Treatments</Text>
            <Text style={{ textAlign: 'center' }}>{booking?.length}</Text>
          </View>
        </View>
      </View>
      <View style={styles.blockView}>
        <Text body1 style={{ marginVertical: 10 }}>
          Status: {getStatusText(booking?.status)}
        </Text>
      </View>
      <View style={styles.blockView}>
        <Text body1 style={{ marginBottom: 10 }}>
          Procedures
        </Text>
        {/* {booking?.procedures.map(procedure => (
                    <View style={styles.row}>
                        <View style={styles.leftView2}>
                            <Text >{procedure.name}</Text>
                        </View>
                        <View style={styles.rightView}>
                            <Text  grayColor>
                                {`(${getPriceText(procedure)})`}
                            </Text>
                        </View>
                    </View>
                ))} */}
      </View>
    </TouchableOpacity>
  );
}

export default BookingTabItem;
