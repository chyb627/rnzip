/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Icon from '../components/ui/Icons';

const SnowItem: React.FC<{
  index: number;
}> = ({ index }) => {
  const interpolateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(interpolateAnim, {
        toValue: 1,
        delay: index * 100,
        duration: 5000,
        useNativeDriver: false,
      }),
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.iconContainer,
        {
          top: interpolateAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['-10%', '110%'],
          }),
          left: `${Math.floor(Math.random() * 100)}%`,
        },
      ]}>
      <Icon name="snow" size={16} color="#fff" />
    </Animated.View>
  );
};

const SnowBackground = () => {
  return (
    <View style={styles.container}>
      {[...Array(100)].map((_, index) => {
        return <SnowItem key={index} index={index} />;
      })}
    </View>
  );
};

export default SnowBackground;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121723',
    flex: 1,
  },
  iconContainer: {
    position: 'absolute',
  },
});
