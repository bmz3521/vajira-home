import React, { useEffect, useState } from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/* Main Stack Navigator */
import Main from 'app/navigation/main';
/* Modal Screen only affect iOS */
import Loading from '@screens/Loading';
import ChatMessages from '@screens/ChatMessages';
import VideoCall from '@screens/VideoCall';
import { fcmService } from '../FCMService';
import { localNotificationService } from '../LocalNotificationService';
import { setChatNoti, getChatNoti, setFcmToken } from '@utils/asyncStorage';

const RootStack = createStackNavigator();

export default function Navigator() {
  //   const storeLanguage = useSelector(state => state.application.language);
  //   const {theme, colors} = useTheme();
  //   const isDarkMode = useDarkMode();
  const [screenName, setScreenName] = useState('');

  const navigationRef = React.createRef();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFF',
    },
  };

  // const forFade = ({ current, closing }) => ({
  //   cardStyle: {
  //     opacity: current.progress,
  //   },
  // });

  useEffect(() => {
    // i18n.use(initReactI18next).init({
    //   resources: BaseSetting.resourcesLanguage,
    //   lng: storeLanguage ?? BaseSetting.defaultLanguage,
    //   fallbackLng: BaseSetting.defaultLanguage,
    // });
    // SplashScreen.hide();

    async function onOpenNotification(notify) {
      // console.log('Notify === == eieie setttttt- background', notify);

      // alert(notify.message);
      if (notify.alertAction) {
        // console.log('screenName === ==', screenName);

        let nextScreen = screenName;

        if (notify.screen !== null || notify.screen !== undefined) {
          nextScreen = notify.screen ? notify.screen : screenName;
        }
        navigationRef.current?.navigate('Main', { screen: nextScreen });
        // alert(notify.message);
      }
    }

    // const { userId } = getAccessToken();

    async function onNotification(notify, data) {
      // console.log('NOTI ---------++++++----- Foreground', notify);
      // console.log('data :::::::', data.screen);

      if (
        notify.body === 'แพทย์ได้ส่งข้อความถึงคุณ.' ||
        notify.body === 'เภสัชกรได้ส่งข้อความถึงคุณ.' ||
        notify.body === 'แพทย์ได้ส่งข้อความถึงคุณ' ||
        notify.body === 'เภสัชกรได้ส่งข้อความถึงคุณ'
      ) {
        // console.log('Get Chat noti...');
        const x = await getChatNoti();
        setChatNoti(x + 1);
      }

      if (data.screen) {
        setScreenName(data.screen);
      } else {
        setScreenName('');
      }
      const options = {
        soundName: 'default',
        playSound: true,
      };
      // console.log({ notify, data });
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
        data,
      );
    }
    function onRegister(token) {
      setFcmToken(token);
    }

    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('white');
    }
    StatusBar.setBarStyle('dark-content');
    return () => {
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, [screenName]);

  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef}>
      <RootStack.Navigator
        mode="modal"
        headerMode="none"
        initialRouteName="Loading"
      >
        <RootStack.Screen
          name="Loading"
          component={Loading}
          options={{ gestureEnabled: false }}
        />
        <RootStack.Screen name="Main" component={Main} />
        <RootStack.Screen name="TeleChatMessages" component={ChatMessages} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
