import React, { useCallback, useRef } from 'react';
import { Text, View, Animated, ScrollView, StyleSheet } from 'react-native';
import Spacer from '../components/ui/Spacer';
import Button from '../components/ui/Button';
import Typography from '../components/ui/Typography';

const AnimationScreen = () => {
  const translateYAnimation = useRef(new Animated.Value(-50)).current;
  const translateXAnimation = useRef(new Animated.Value(-50)).current;
  const opacityAnimation = useRef(new Animated.Value(1)).current;
  const heightAnimation = useRef(new Animated.Value(100)).current;

  const onPressSpring = useCallback(() => {
    translateYAnimation.setValue(-50);
    Animated.spring(translateYAnimation, {
      toValue: 50,
      stiffness: 100, // 스프링의 강도
      damping: 10, // 마찰력
      mass: 10, // 용수철 끝에 매달려있는 물체의 질량
      velocity: 0,
      useNativeDriver: true,
    }).start();
  }, [translateYAnimation]);

  const onPressTiming = useCallback(() => {
    translateXAnimation.setValue(-100);
    Animated.timing(translateXAnimation, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [translateXAnimation]);

  const onPressFadeIn = useCallback(() => {
    Animated.loop(
      Animated.timing(opacityAnimation, {
        toValue: 0,
        useNativeDriver: true,
      }),
      // { iterations: 3 },
    ).start();
  }, [opacityAnimation]);

  const onPressUp = useCallback(() => {
    Animated.timing(heightAnimation, {
      toValue: 200,
      useNativeDriver: false,
    }).start();
  }, [heightAnimation]);

  return (
    <ScrollView style={styles.contaier}>
      <Spacer space={80} />

      {/* y축 -100 100으로 이동하는 spring 애니메이션 */}
      <View style={styles.animItemContainer}>
        <Button onPress={onPressSpring}>
          <Text>Spring</Text>
        </Button>
        <Animated.Text
          style={{
            transform: [
              {
                translateY: translateYAnimation,
              },
            ],
          }}>
          <Typography fontSize={70}>⭐︎</Typography>
        </Animated.Text>
      </View>

      <Spacer space={100} />

      {/* timing 애니메이션 */}
      <View style={styles.animItemContainer}>
        <Button onPress={onPressTiming}>
          <Text>Timing</Text>
        </Button>
        <Animated.Text
          style={{
            transform: [
              {
                translateX: translateXAnimation,
              },
            ],
          }}>
          <Typography fontSize={70}>⭐︎</Typography>
        </Animated.Text>
      </View>

      <Spacer space={80} />

      {/* 페이드인, 페이드아웃, 루프 */}
      <View style={styles.animItemContainer}>
        <Button onPress={onPressFadeIn}>
          <Text>Opacity</Text>
        </Button>
        <Animated.Text
          style={{
            opacity: opacityAnimation,
          }}>
          <Typography fontSize={70}>⭐︎</Typography>
        </Animated.Text>
      </View>

      <Spacer space={80} />

      {/* 크게 바꾸기 */}
      <View style={styles.animItemContainer}>
        <Button onPress={onPressUp}>
          <Text>Size Change</Text>
        </Button>
        <Animated.View
          style={[
            styles.width,
            {
              height: heightAnimation,
              backgroundColor: heightAnimation.interpolate({
                inputRange: [100, 200],
                outputRange: ['#d9e808', '#4de90f'],
              }),
              transform: [
                {
                  rotate: heightAnimation.interpolate({
                    inputRange: [100, 200],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        />
      </View>

      <Spacer space={80} />
    </ScrollView>
  );
};

export default AnimationScreen;

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
