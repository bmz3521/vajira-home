import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@components';
import NetInfo from '@react-native-community/netinfo';

export default function NetworkStateChecker({
  textToShow,
  fixedHeader,
  subTextToShow,
  auth,
  backgrounColor,
  textColor,
}) {
  const [email, setEmail] = React.useState('');
  const [networkStatus, setNetworkStatus] = React.useState('');
  const [doctorName, setCallingDoctorName] = React.useState('');
  const [pharmacyCallStatus, setPharmacyCallStatus] = React.useState('');
  const [pharmacyName, setCallingPharmacyName] = React.useState('');

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      console.log(state);
      setNetworkStatus(state);
    });
    // const {auths, user } = props.props;
    // const auth = props.auth;
  }, []);

  return (
    <View style={{ zIndex: 2 }}>
      {!networkStatus.isConnected && (
        <View
          style={{
            elevation: 30,
            zIndex: 30,
            justifyContent: 'center',
            paddingVertical: 30,
            paddingHorizontal: 30,
            flexDirection: 'row',
            backgroundColor: '#ffd4d4',
            width: '100%',
            height: 120,
            position: fixedHeader ? 'absolute' : null,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', color: '#702e2e' }}
            >
              {textToShow ? textToShow : 'ไม่พบการเชื่อมต่อ'}
            </Text>
            <Text style={{ fontSize: 16, color: '#702e2e' }}>
              {subTextToShow ? subTextToShow : 'กรุณาเช้คสัญญาณอินเตอร์เน็ต'}
            </Text>
          </View>
          <View style={{ flex: 0.3, justifyContent: 'center' }}>
            <Icon
              name="slash"
              style={{
                alignSelf: 'center',
                fontSize: 40,
                color: '#702e2e',
                position: 'absolute',
              }}
            />
            <Icon
              name="wifi"
              style={{ alignSelf: 'center', fontSize: 40, color: '#702e2e' }}
            />
          </View>
        </View>
      )}
    </View>
  );
}
