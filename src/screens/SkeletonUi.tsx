import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, useWindowDimensions, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

const SkeletonUi: React.FC = () => {
  const { width } = useWindowDimensions();

  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.linear),
        useNativeDriver: true,
      }),
    ).start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.skeletonContainer,
          {
            height: width,
            width: width,
          },
        ]}>
        <AnimatedLG
          colors={['#c0c0c0', '#d0d0d0', '#d0d0d0', '#c0c0c0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ ...StyleSheet.absoluteFillObject, transform: [{ translateX: translateX }] }}
        />
      </View>
    </View>
  );
};

export default SkeletonUi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  skeletonContainer: {
    backgroundColor: '#c0c0c0',
    borderColor: '#d0d0d0',
  },
});
