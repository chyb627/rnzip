import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView, { AnimationObject } from 'lottie-react-native';
import LottieBike from '../assets/animations/bike.json';

const Lottie: React.FC<{
  height?: number | undefined;
  lottieSource?:
    | string
    | AnimationObject
    | {
        uri: string;
      }
    | undefined;
}> = ({ height = 340, lottieSource }) => {
  return (
    <View style={styles.lottieContainer}>
      <LottieView
        style={{ height }}
        source={lottieSource ?? LottieBike}
        loop={true}
        resizeMode="contain"
        autoPlay
      />
    </View>
  );
};

export default Lottie;

const styles = StyleSheet.create({
  lottieContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieImage: {
    height: 340,
  },
});
