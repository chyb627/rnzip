import React from 'react';
import RootStackNavigation from '../navigation/LoveDog/RootStackNavigation';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '925348430499-nrf1p4d3dnuvsqv7nvb1frv592enm7bp.apps.googleusercontent.com',
});

const LoveDog = () => {
  return <RootStackNavigation />;
};

export default LoveDog;
