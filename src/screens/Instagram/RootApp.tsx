// import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { RootStackNavigation } from '../../navigation/Instagram/RootStackNavigation';
import { SplashView } from './SplashView';

export const RootApp = () => {
  const [initialize, setInitialize] = useState(false);

  if (!initialize) return <SplashView onFinishLoad={() => setInitialize(true)} />;

  return (
    // <NavigationContainer>
    <RootStackNavigation />
    // </NavigationContainer>
  );
};
