import React from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import { BaseColor } from '@config';

const TextInputCustom = ({ lable, children, errors }) => {
  return (
    <View style={{ height: 86 }}>
      <Text
        caption1
        style={{ marginTop: 20, color: errors ? 'red' : BaseColor.grayColor }}
      >
        {lable}
      </Text>
      {children}
      {errors && <Text style={{ color: 'red' }}>This is required.</Text>}
    </View>
  );
};

export default TextInputCustom;
