import React from 'react';
import { View } from 'react-native';
import { Header, SafeAreaView, Icon, Text } from '@components';
import { BaseStyle, BaseColor } from '@config';

const Telemedicine = ({ navigation }) => {
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="Telemedicine"
        renderLeft={() => {
          return (
            <Icon name="chevron-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {}}
      />
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90%',
        }}
      >
        <Text body1 bold>
          Not Available
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default Telemedicine;
