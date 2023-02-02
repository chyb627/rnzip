import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { BottomTabNavigation } from '../navigation/Lotto/BottomTabNavigation';
import { store } from '../store/store';

export const Lotto = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <BottomTabNavigation />
      </Provider>
    </SafeAreaProvider>
  );
};
