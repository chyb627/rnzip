// import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigation } from '../navigation/NewsScrap/RootNavigation';

export const NewsScrap = () => {
  return (
    <SafeAreaProvider>
      {/* <NavigationContainer> */}
      <RootNavigation />
      {/* </NavigationContainer> */}
    </SafeAreaProvider>
  );
};
