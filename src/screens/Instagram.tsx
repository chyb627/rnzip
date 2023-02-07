import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { RootApp } from './Instagram/RootApp';
import { store } from '../store/store';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import 'react-native-gesture-handler';
import mobileAds, { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

GoogleSignin.configure();

mobileAds()
  .initialize()
  .then((result) => {
    console.log('result:::', result);
  });

export const Instagram = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootApp />

        <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.FULL_BANNER} />
      </Provider>
    </SafeAreaProvider>
  );
};
