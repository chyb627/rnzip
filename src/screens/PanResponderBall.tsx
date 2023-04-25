import React, { useRef } from 'react';
import { Animated, PanResponder, StyleSheet, Text, View } from 'react-native';

const PanResponderBall = () => {
  const panAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  console.log('panAnim:::', panAnim);
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: panAnim.x, // 터치 시작후 누적 이동거리
          dy: panAnim.y,
        },
      ],
      {
        useNativeDriver: false,
      },
    ),
    onPanResponderEnd: (event, gestureState) => {
      Animated.decay(panAnim, {
        velocity: { x: gestureState.vx, y: gestureState.vy }, // 초기 속도
        deceleration: 0.997, // 어느정도로 감속할 것인지 초기값 0.997
        useNativeDriver: true,
      }).start();
    },
    onPanResponderRelease: () => {
      setTimeout(() => {
        panAnim.setValue({ x: 0, y: 50 });
        Animated.spring(panAnim, {
          toValue: { x: 0, y: 0 },
          friction: 7,
          tension: 30,
          useNativeDriver: true,
        }).start();
      }, 1000);
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.ballContainer,
          {
            transform: [
              {
                translateX: panAnim.x,
              },
              {
                translateY: panAnim.y,
              },
            ],
          },
        ]}>
        <Text style={styles.ballText}>🏀</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ballContainer: {
    position: 'absolute',
    bottom: 20,
  },
  ballText: {
    fontSize: 100,
  },
});

export default PanResponderBall;
