import React from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useHooks = props => {
  const { actions, teleActions, navigation, auth, user } = props;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [type, setType] = React.useState('USER');
  const [fail, setFail] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    // actions.isAuth();
  }, []);

  React.useEffect(() => {
    console.log('auth.isAuthenticated =====', auth.isAuthenticated, type);
    if (auth.isAuthenticated) {
      navigation.popToTop();
      navigation.navigate('Home');
      setLoading(false);
      setFail(true);
      setModalVisible(false);
    } else if (!auth.isAuthenticated && type === 'DOCTOR') {
      changeTypeOfUser('USER');
    }
  }, [navigation, auth.isAuthenticated]);
  const changeTypeOfUser = async type => {
    await AsyncStorage.setItem('USER_TYPE', type);
  };
  const getTypeOfUser = async type => {
    const typeUser = await AsyncStorage.getItem('USER_TYPE');
    setType(typeUser);
  };
  const handleChangeText = React.useCallback(
    label => text => {
      switch (label) {
        case 'email':
          setEmail(text);
          break;

        case 'password':
          setPassword(text);
          break;

        default:
          break;
      }
    },
    [],
  );

  const handleModal = React.useCallback(
    () => async () => {
      setModalVisible(false);
    },
    [modalVisible],
  );

  const handleLoginWithEmail = React.useCallback(
    () => async () => {
      console.log('LOGIN');
      await AsyncStorage.setItem('USER_TYPE', 'USER');
      setLoading(true);
      try {
        const credential = {
          email: email,
          password: password,
        };
        let response = await actions.login(credential);
        await teleActions.loginTele();
      } catch (e) {
        console.log('error', e);
      }
      setLoading(false);
      setFail(false);
      setModalVisible(true);

      // if (response.ok) return await response.json()
    },
    [email, password],
  );

  const handleLoginWithGoogle = React.useCallback(
    () => async () => {
      setLoading(true);
      console.log('handleLoginWithGoogle');

      try {
        const hasGooglePlay = await GoogleSignin.hasPlayServices();
        if (!hasGooglePlay) {
          return new Error('Device is require google play service');
        }
        const userInfo = await GoogleSignin.signIn();
        actions.thirdPartyLogin({ provider: 'google', profile: userInfo.user });
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
        console.log('error google login', error);
      }
    },
    [],
  );

  const handleLoginWithFacebook = React.useCallback(
    () => async () => {
      setLoading(true);
      console.log('handleLoginWithFacebook');
      try {
        const login = await LoginManager.logInWithPermissions([
          'public_profile',
          'email',
        ]);
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          const data = await AccessToken.getCurrentAccessToken();
          const token = data.accessToken.toString();
          const profileRequest = new GraphRequest(
            '/me',
            {
              token,
              parameters: {
                fields: { string: 'id, email, first_name, last_name' },
              },
            },
            (error, result) => {
              if (error) {
                console.log('login info has error: ' + error);
              } else {
                actions.thirdPartyLogin({
                  provider: 'facebook',
                  profile: result,
                });
              }
            },
          );

          new GraphRequestManager().addRequest(profileRequest).start();
        }
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );
  const handleDoctorLogin = React.useCallback(() => async () => {
    changeTypeOfUser('DOCTOR');
    const credential = {
      email: email,
      password: password,
    };
    let response = await actions.login(credential);
    await teleActions.loginTele();
    setFail(false);
  });
  return {
    email,
    password,
    ready: !!email && !!password,
    loading: loading,
    fail: fail,
    modalVisible: modalVisible,
    events: {
      handleChangeText,
      handleModal,
      handleDoctorLogin,
      handleLoginWithEmail,
      handleLoginWithGoogle,
      handleLoginWithFacebook,
    },
  };
};

export { useHooks };
