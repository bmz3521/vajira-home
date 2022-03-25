import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { store, persistor } from './store';
import { BaseColor } from '@config';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Navigator from './navigation';
// import { I18nextProvider } from 'react-i18next';
// import i18n from './i18n';
import '@react-native-firebase/auth';
import SafeViewAndroidGlobalStyle from './SafeViewAndroidGlobalStyle';

import BleModule from './BleModule';

global.BluetoothManager = new BleModule();

// console.disableYellowBox = true;

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={SafeViewAndroidGlobalStyle.AndroidSafeArea}>
          {/* <I18nextProvider i18n={i18n}> */}
          <Navigator />
          {/* </I18nextProvider> */}
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}
