// import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { RootNavigation } from '../navigation/NewsScrap/RootNavigation';
import { store } from '../store/store';

export const NewsScrap = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {/* <NavigationContainer> */}
        <RootNavigation />
        {/* </NavigationContainer> */}
      </SafeAreaProvider>
    </Provider>
  );
};
