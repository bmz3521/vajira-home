import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@components';
import styles from './styles';

function PaymentButton({ pickupItem, navigation }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('PaymentPayouts', { pickupItem })}
    >
      <View style={styles.paymentAlert}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <Icon
              name="bell"
              style={[
                styles.titleIcon,
                { fontSize: 18, marginRight: 8, color: '#062d38' },
              ]}
            />
            <Text style={styles.paymentTitle}>แจ้งเตือนชำระเงิน</Text>
          </View>
          <View>
            <Text style={{ color: '#062d38' }}>
              ท่านมีค้างชำระเงินค่าบริการโทรเวชกรรม
            </Text>
          </View>
        </View>
        <View style={styles.paymentButton}>
          <Icon
            name="chevron-right"
            style={[
              styles.titleIcon,
              {
                fontSize: 26,
                color: '#062d38',
              },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default PaymentButton;
