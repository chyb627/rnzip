import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { RootApp } from './Instagram/RootApp';
import { store } from '../store/store';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import 'react-native-gesture-handler';

GoogleSignin.configure();

export const Instagram = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootApp />
      </Provider>
    </SafeAreaProvider>
  );
};
