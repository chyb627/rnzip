import React, { useCallback } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Spacer from '../components/ui/Spacer';
import Button from '../components/ui/Button';
import Typography from '../components/ui/Typography';

const ReanimatedScreen = () => {
  const translateYAnimation = useSharedValue(-50);
  const translateXAnimation = useSharedValue(-50);
  const opacityAnimation = useSharedValue(1);

  const translateYStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateYAnimation.value }],
    };
  });
  const translateXStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateXAnimation.value }],
    };
  });
  const opacityStyles = useAnimatedStyle(() => {
    return {
      opacity: opacityAnimation.value,
    };
  });

  const onPressSpring = useCallback(() => {
    translateYAnimation.value = withSpring(50, {
      stiffness: 100, // 스프링의 강도
      damping: 10, // 마찰력
      mass: 10, // 용수철 끝에 매달려있는 물체의 질량
      velocity: 0,
    });
  }, [translateYAnimation]);

  const onPressTiming = useCallback(() => {
    translateXAnimation.value = withTiming(100, { duration: 1000 });
  }, [translateXAnimation]);

  const onPressFadeIn = useCallback(() => {
    opacityAnimation.value = withRepeat(withTiming(0), -1, true);
  }, [opacityAnimation]);

  return (
    <ScrollView style={styles.contaier}>
      <Spacer space={80} />

      {/* y축 -100 100으로 이동하는 spring 애니메이션 */}
      <View style={styles.animItemContainer}>
        <Button onPress={onPressSpring}>
          <Text>Spring</Text>
        </Button>
        <Animated.Text style={translateYStyles}>
          <Typography fontSize={70}>⭐︎</Typography>
        </Animated.Text>
      </View>

      <Spacer space={100} />

      {/* timing 애니메이션 */}
      <View style={styles.animItemContainer}>
        <Button onPress={onPressTiming}>
          <Text>Timing</Text>
        </Button>
        <Animated.Text style={translateXStyles}>
          <Typography fontSize={70}>⭐︎</Typography>
        </Animated.Text>
      </View>

      <Spacer space={80} />

      {/* 페이드인, 페이드아웃, 루프 */}
      <View style={styles.animItemContainer}>
        <Button onPress={onPressFadeIn}>
          <Text>Opacity</Text>
        </Button>
        <Animated.Text style={opacityStyles}>
          <Typography fontSize={70}>⭐︎</Typography>
        </Animated.Text>
      </View>

      <Spacer space={80} />
    </ScrollView>
  );
};

export default ReanimatedScreen;

const styles = StyleSheet.create({
  contaier: {
    flex: 1,
  },
  animItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  width: {
    width: 100,
  },
});
