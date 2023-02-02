/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Typography } from '../UI/Typography';

export const LottoNumberView: React.FC<{
  numbers: number[];
}> = (props) => {
  const [viewHeight, setViewHeight] = useState(0);
  const [animatedValue] = useState(new Animated.Value(1));

  const getNumberBackgroundColor = useCallback(() => {
    const randomNumber = Math.floor(Math.random() * 10) % 6;

    if (randomNumber === 0) {
      return 'red';
    }

    if (randomNumber === 1) {
      return 'blue';
    }

    if (randomNumber === 2) {
      return 'gray';
    }

    if (randomNumber === 3) {
      return 'green';
    }

    if (randomNumber === 4) {
      return 'purple';
    }

    return 'black';
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-viewHeight * 0.6, 0],
  });

  useEffect(() => {
    animatedValue.setValue(0);

    Animated.timing(animatedValue, {
      duration: 1000,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [props.numbers]);

  return (
    <View
      style={styles.lottoItem}
      onLayout={({ nativeEvent }) => {
        console.log('nativeEvent.layout::::', nativeEvent.layout);
        setViewHeight(nativeEvent.layout.height);
      }}>
      {props.numbers.map((item, index) => {
        return (
          <Animated.View
            key={`lotto-number-view-${index}`}
            style={[
              styles.lottoItemDetail,
              {
                backgroundColor: getNumberBackgroundColor(),
                transform: [
                  {
                    translateY,
                  },
                ],
              },
            ]}>
            <Typography fontSize={20} color="#fff">
              {item}
            </Typography>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  lottoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  lottoItemDetail: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
