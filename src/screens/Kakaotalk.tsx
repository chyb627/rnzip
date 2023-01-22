import React from 'react';
import {Platform, View, StyleSheet} from 'react-native';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import {KakaoHeader} from '../components/Kakaotalk/KakaoHeader';

const statusBarHeight = getStatusBarHeight(true);
const bottomSpace = getBottomSpace();

console.log(`${Platform.OS}: ${statusBarHeight}, ${bottomSpace}`);

export const Kakaotalk = () => {
  return (
    <View style={styles.container}>
      <KakaoHeader />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,
    // paddingBottom: bottomSpace,
    backgroundColor: '#fff',
    // justifyContent: 'flex-end',
  },
});
