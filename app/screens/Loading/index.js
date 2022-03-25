import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { BaseColor, Images } from '@config';
import RNBootSplash from 'react-native-bootsplash';
import { Image, Text } from '@components';
import styles from './styles';
import Logo from './vjr.png';
import { AuthActions } from '@actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

function Loading({ navigation, route, actions }) {
  // const {colors} = useTheme();

  const onProcess = () => {
    setTimeout(() => {
      navigation.replace('Main');
      RNBootSplash.hide({ duration: 250 });
    }, 500);
  };
  useEffect(() => {
    const logOutDoctor = async () => {
      const keys = ['access_tele_token', 'access_token'];
      await AsyncStorage.multiRemove(keys);
      await AsyncStorage.setItem('USER_TYPE', 'USER');
      actions.logout(response => {
        if (response.success) {
          setTimeout(() => RNRestart.Restart(), 300);
        }
      });
    };
    if (route?.params?.logout === 'DOCTOR' && route?.params?.logout) {
      logOutDoctor();
    } else onProcess();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <Image source={Images.logo2} style={styles.logo} resizeMode="contain" />
      </View>
      <View
        style={{
          position: 'absolute',
          top: 220,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text title1 whiteColor semibold>
          V@Home
        </Text>
        <ActivityIndicator
          size="large"
          color={BaseColor.whiteColor}
          style={{
            marginTop: 20,
          }}
        />
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
