import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BottomTabNavigation } from '../navigation/Lotto/BottomTabNavigation';
import { store, persistor } from '../store/store';

export const Lotto = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BottomTabNavigation />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};
