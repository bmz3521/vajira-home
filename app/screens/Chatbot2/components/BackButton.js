import React from 'react';
import { Button } from '@components';
import { Bubble } from 'react-native-gifted-chat';
import { View } from 'react-native';
import { defaultStyle } from '../styles';

const BackButton = props => {
  console.log('props ===>', props);
  return (
    <View>
      <Bubble
        {...props.message}
        textStyle={{
          right: {
            color: '#030e16',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: '#F0F2F5',
          },
          right: {
            backgroundColor: '#98f74a',
          },
        }}
      />
      <Button
        style={{ ...defaultStyle.btn, marginTop: 10 }}
        onPress={() => props.onPressMe('main')}
      >
        กลับสู่เมนูหลัก
      </Button>
    </View>
  );
};

export default BackButton;
