import React, { ReactElement, useCallback, useState } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

const AnimationButton: React.FC<{
  onPress: () => void;
  hitSlop?: { left: number; right: number; top: number; bottom: number };
  backgroundColor?: string;
  paddingHorizontal?: number;
  paddingVertical?: number;
  children: ReactElement | ReactElement[];
}> = (props) => {
  const [buttonAnimationValue] = useState(new Animated.Value(0));

  const onPressIn = useCallback(() => {
    Animated.timing(buttonAnimationValue, {
      duration: 200,
      toValue: 1,
      useNativeDriver: false,
    }).start();
  }, [buttonAnimationValue]);

  const onPressOut = useCallback(() => {
    Animated.timing(buttonAnimationValue, {
      duration: 200,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  }, [buttonAnimationValue]);

  const scale = buttonAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1.0, 0.95],
  });

  return (
    <Pressable
      {...props}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={props.onPress}
      hitSlop={
        props.hitSlop ?? {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }
      }
      style={[
        styles.container,
        {
          backgroundColor: props.backgroundColor,
          paddingHorizontal: props.paddingHorizontal,
          paddingVertical: props.paddingVertical,
        },
      ]}>
      <Animated.View style={{ transform: [{ scale: scale }] }}>{props.children}</Animated.View>
    </Pressable>
  );
};

export default AnimationButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
