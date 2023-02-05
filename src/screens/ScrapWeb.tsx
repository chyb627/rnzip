import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import { RecoilCustomPersist } from '../components/ScrapWeb/RecoilCustomPersist';
import { RootNavigation } from '../navigation/ScrapWeb/RootNavigation';

export const ScrapWeb = () => {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <RecoilCustomPersist>
          <RootNavigation />
        </RecoilCustomPersist>
      </SafeAreaProvider>
    </RecoilRoot>
  );
};
