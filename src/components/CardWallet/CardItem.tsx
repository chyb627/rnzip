import React, { useRef } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';

interface CardItemProps {
  color: string;
  totalCount: number;
  xAnimation: Animated.Value;
  yAnimation: Animated.Value;
  rotateZAnim: Animated.Value;
}

const { width } = Dimensions.get('window');

const CardItem: React.FC<CardItemProps> = ({
  color,
  xAnimation,
  totalCount,
  yAnimation,
  rotateZAnim,
}) => {
  const multiplyValue = useRef(new Animated.Value(totalCount - 3)).current;
  const translateY = Animated.multiply(yAnimation, multiplyValue);

  return (
    <Animated.View
      style={[
        styles.cardContents,
        {
          transform: [
            { translateY: translateY },
            { translateX: xAnimation },
            {
              rotateZ: rotateZAnim.interpolate({
                inputRange: [0, 20],
                outputRange: ['0deg', '2deg'],
              }),
            },
          ],
          marginTop: totalCount * 20,
          backgroundColor: color,
        },
      ]}
    />
  );
};

export default CardItem;

const styles = StyleSheet.create({
  cardContents: {
    position: 'absolute',
    width: width * 0.7,
    height: width * 0.7 * 0.58,
    borderRadius: 4,
    shadowOffset: {
      width: -3,
      height: -3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
});
