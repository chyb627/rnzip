import React, { useRef, useState } from 'react';
import { View, Dimensions, PanResponder, Animated, StyleSheet } from 'react-native';
import CardItem from '../components/CardWallet/CardItem';

const { width } = Dimensions.get('window');

const CardWallet = () => {
  const [focus, setFocus] = useState(5);
  const cardRef = useRef('fold'); // fold, unfold
  const yAnimation = useRef(new Animated.Value(0)).current;
  const rotateZAnim = useRef(new Animated.Value(0)).current;
  const card = [
    { color: '#aaa', xAnim: useRef(new Animated.Value(0)).current },
    { color: '#bbb', xAnim: useRef(new Animated.Value(0)).current },
    { color: '#ccc', xAnim: useRef(new Animated.Value(0)).current },
    { color: '#ddd', xAnim: useRef(new Animated.Value(0)).current },
    { color: '#eee', xAnim: useRef(new Animated.Value(0)).current },
    { color: '#f4f4f4', xAnim: useRef(new Animated.Value(0)).current },
  ];

  const panResponer = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const { dy, dx } = gestureState;
      // dy, dx 뭐가 더 크게 변했을까
      const XSlider = Math.abs(dy) < Math.abs(dx);
      const YSlider = Math.abs(dx) < Math.abs(dy);
      if (XSlider) {
        // 카드 버리기
        if (dx < -5 && cardRef.current === 'fold' && focus >= 0) {
          card[focus].xAnim.setValue(dx);
        }

        // 카드 가져오기
        // if (5 < dx && cardRef.current === 'fold' && focus <= 5) {
        //   card[focus].xAnim.setValue(dx);
        // }
      }

      if (YSlider) {
        if (dy > 5 && dy < 100 && cardRef.current === 'fold') {
          yAnimation.setValue(dy);
        }

        if (dy > 5 && dy < 100 && cardRef.current === 'unfold') {
          rotateZAnim.setValue(dy);
        }

        if (dy > -75 && dy < 5 && cardRef.current === 'unfold') {
          yAnimation.setValue(65 + dy);
        }
      }
    },
    onPanResponderEnd: (evt, gestureState) => {
      const { dy, dx } = gestureState;
      const XSlider = Math.abs(dy) < Math.abs(dx);
      const YSlider = Math.abs(dx) < Math.abs(dy);
      if (XSlider) {
        if (dx < -5 && cardRef.current === 'fold' && focus >= 0) {
          Animated.timing(card[focus].xAnim, {
            toValue: -600,
            duration: 300,
            useNativeDriver: false,
          }).start(({ finished }) => {
            if (finished) {
              setFocus((el) => el - 1);
            }
          });
        }

        if (dx > 5 && cardRef.current === 'fold' && focus < 5) {
          Animated.timing(card[focus + 1].xAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start(({ finished }) => {
            if (finished) {
              setFocus((el) => el + 1);
            }
          });
        }
      }

      if (YSlider) {
        if (dy > 5) {
          Animated.spring(yAnimation, {
            toValue: 65,
            useNativeDriver: false,
          }).start();
          cardRef.current = 'unfold';
        }

        if (dy > 5 && cardRef.current === 'unfold') {
          Animated.spring(rotateZAnim, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }

        if (dy < -5) {
          Animated.spring(yAnimation, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
          cardRef.current = 'fold';
        }
      }
    },
  });

  return (
    <View {...panResponer.panHandlers} style={styles.container}>
      <View
        style={[
          styles.cardContainer,
          {
            height: width * 0.7 * 0.58 + (card.length - 1) * 20,
          },
        ]}>
        {card.map((value, index) => {
          return (
            <CardItem
              key={`card-item-${index}`}
              color={value.color}
              xAnimation={value.xAnim}
              totalCount={index}
              yAnimation={yAnimation}
              rotateZAnim={rotateZAnim}
            />
          );
        })}
      </View>
    </View>
  );
};

export default CardWallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    position: 'relative',
    width: width * 0.7,
  },
});
