import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from '@components';
import { BaseStyle } from '@config';

const PaymentAdd = ({ isVisible, bgColor, opacity }) => {
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection={['down']}
      style={{ backgroundColor: 'transparent' }}
      backdropColor={bgColor ? bgColor : "#fff"}
      backdropOpacity={opacity ? opacity : 0.1}
      useNativeDriver={true}
      propagateSwipe={true}
    >
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <View
            style={{
              width: 150,
              height: 100,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" color="#0A905F" />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
export default PaymentAdd;
