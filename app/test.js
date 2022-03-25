// import React, { Component } from 'react';
// import { store, persistor } from 'app/store';
// import { StatusBar, Alert } from 'react-native';
// import { BaseColor } from '@config';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// // import I18n from 'react-native-i18n';
// import 'react-native-gesture-handler';
// import { I18nextProvider } from 'react-i18next';
// import i18n from './i18n';
// import { fcmService } from './FCMService';
// import {localNotificationService} from './LocalNotificationService'
// import Navigator from './navigation';

// console.disableYellowBox = true;

// // Wrapping a stack with translation hoc asserts we get new render on language change
// // the hoc is set to only trigger rerender on languageChanged
// // class WrappedStack extends React.Component {
// //     static router = Stack.router;
// //     render() {
// //       const { t } = this.props;
// //       return <Stack screenProps={{ t }} {...this.props} />;
// //     }
// //   }
// //   const ReloadAppOnLanguageChange = withNamespaces('common', {
// //     bindI18n: 'languageChanged',
// //     bindStore: false,
// //   })(createAppContainer(WrappedStack));
// export default class test extends Component {
//   constructor(props) {
//     super(props);

//     /**
//      * Define translation
//      *
//      * @author Passion UI <passionui.com>
//      * @date 2019-08-03
//      */
//     I18n.fallbacks = true;
//     // I18n.translations = {
//     //     en: require("./lang/en.json"),
//     //     ko: require("./lang/ko.json"),
//     //     vi: require("./lang/vi.json")
//     // };
//   }

//   //1
//   async checkPermission() {
//     const enabled = await firebase.messaging().hasPermission();
//     if (enabled) {
//       this.getToken();
//     } else {
//       this.requestPermission();
//     }
//   }

//   //3
//   async getToken() {
//     let fcmToken = await AsyncStorage.getItem('fcmToken');
//     if (!fcmToken) {
//       fcmToken = await firebase.messaging().getToken();
//       if (fcmToken) {
//         // user has a device token
//         await AsyncStorage.setItem('fcmToken', fcmToken);
//       }
//     }
//   }

//   //2
//   async requestPermission() {
//     try {
//       await firebase.messaging().requestPermission();
//       // User has authorised
//       this.getToken();
//     } catch (error) {
//       // User has rejected permissions
//       console.log('permission rejected');
//     }
//   }

//   componentDidMount() {
//     fcmService.registerAppWithFCM()
//     fcmService.register(
//       this.onRegister,
//       this.onNotification,
//       this.onOpenNotification,
//     );
//     localNotificationService.configure(this.onOpenNotification)

//   }

//   onRegister(token) {
//     console.log('[NotificationFCM] onRegister: ', token);
//   }

//   onNotification(notify) {
//     console.log("[App] onNotification: ", notify)
//     const options = {
//       soundName: 'default',
//       playSound: true //,
//       // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
//       // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
//     }
//     localNotificationService.showNotification(
//       0,
//       notify.title,
//       notify.body,
//       notify,
//       options
//     )
//   }

//   onOpenNotification(notify) {
//     console.log("[App] onOpenNotification: ", notify)
//     alert("Open Notification: " + notify.body)
//   }

//   componentWillUnmount(){
//     console.log("[App] unRegister")
//     fcmService.unRegister()
//     localNotificationService.unregister()
//   }

//   render() {
//     return (
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <StatusBar translucent backgroundColor="transparent" />
//           <I18nextProvider i18n={i18n}>
//             <Navigator />
//           </I18nextProvider>
//         </PersistGate>
//       </Provider>
//     );
//   }
// }
