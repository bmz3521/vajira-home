import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import NetInfo from "@react-native-community/netinfo";


export default function NetworkStateChecker({userTele, user, auth, navigation}) {
  const [email, setEmail] = React.useState('');
  const [callStatus, setNetworkStatus] = React.useState('');
  const [doctorName, setCallingDoctorName] = React.useState('');
  const [pharmacyCallStatus, setPharmacyCallStatus] = React.useState('');
  const [pharmacyName, setCallingPharmacyName] = React.useState('');


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      setNetworkStatus(state)
    });
    // const {auths, user } = props.props;
    // const auth = props.auth;
  
  }, []);

  return (
    <View>

  </View>
  );
}