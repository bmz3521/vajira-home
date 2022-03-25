import React, { useState } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { Header, SafeAreaView, Icon } from '@components';
import { BaseStyle, BaseColor } from '@config';
import getOmiseToken from '@utils/getOmiseToken';
import creditCardType from 'credit-card-type';

import Form from './Form';

const PaymentAdd = ({ addCredit, isVisible, setModalVisible }) => {
  const [loading, setLoading] = useState(false);

  const onAddCredit = async values => {
    setLoading(previousState => !previousState);
    const card = {
      name: values.name,
      number: values.number,
      expiration_month: values.expiration.substring(0, 2),
      expiration_year: values.expiration.substring(3, 5),
      security_code: values.cvc,
    };
    try {
      id = await getOmiseToken(card);
      addCredit({
        name: values.name,
        expiration_month: values.expiration.substring(0, 2),
        expiration_year: values.expiration.substring(3, 5),
        last_digits: values.number.substr(-4),
        brand: creditCardType(values.number)[0].type,
        id,
      });
      setModalVisible();
    } catch (error) {
    } finally {
      setLoading(previousState => !previousState);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      swipeDirection={['down']}
      style={{ backgroundColor: '#fff' }}
      backdropColor="#fff"
      backdropOpacity={1}
      useNativeDriver={true}
      propagateSwipe={true}
    >
      <View style={{ flex: 1 }}>
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{ top: 'always' }}
        >
          <Header
            title="Add card"
            renderLeft={() => {
              return (
                <Icon name="times" size={20} color={BaseColor.primaryColor} />
              );
            }}
            onPressLeft={() => setModalVisible()}
            onPressRight={() => {}}
          />
          <Form onAddCredit={onAddCredit} loading={loading} />
        </SafeAreaView>
      </View>
    </Modal>
  );
};
export default PaymentAdd;
