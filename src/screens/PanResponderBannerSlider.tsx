import React, { useRef, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  PanResponder,
} from 'react-native';

const { width } = Dimensions.get('window');

const PanResponderBannerSlider = () => {
  const bannerAnim = useRef(new Animated.Value(0)).current;
  const [focus, setFocus] = useState(0);
  const pendingRef = useRef(true); // 2개 이상 페이지를 막기위한 트리거

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      // console.log(gestureState.dx);
      const toRight = gestureState.dx < -80;
      const toLeft = gestureState.dx > 80;

      if (toRight && pendingRef.current && focus < 3) {
        setFocus(focus + 1);
        pendingRef.current = false;
        Animated.timing(bannerAnim, {
          toValue: -(focus + 1) * width,
          duration: 500,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
            pendingRef.current = true;
          }
        });
      }
      if (toLeft && pendingRef.current && focus > 0) {
        setFocus(focus - 1);
        pendingRef.current = false;
        Animated.timing(bannerAnim, {
          toValue: -(focus - 1) * width,
          duration: 500,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
            pendingRef.current = true;
          }
        });
      }
    },
  });

  const onButtonNavigation = (index: number) => {
    setFocus(index);
    Animated.timing(bannerAnim, {
      toValue: -index * width,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.contentsContainer,
          {
            transform: [
              {
                translateX: bannerAnim,
              },
            ],
          },
        ]}>
        {[...Array(4)].map((v, i) => {
          return (
            <View key={i} style={styles.contentBoxContainer}>
              <Text style={styles.contentText}>{i}</Text>
            </View>
          );
        })}
      </Animated.View>

      <View style={styles.bannerButtonContainer}>
        <Animated.View style={styles.row}>
          {[...Array(4)].map((v, i) => {
            const isFocusedStyle = focus === i ? isFocused : styles;
            return (
              <TouchableOpacity onPress={() => onButtonNavigation(i)} key={i}>
                <View style={isFocusedStyle.bannerButton} />
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentsContainer: {
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
  },
  contentBoxContainer: {
    width,
    height: width,
    backgroundColor: '#ffa100',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 50,
    color: '#ffffff90',
  },
  bannerButtonContainer: {
    height: width,
    justifyContent: 'flex-end',
    marginTop: 60,
  },
  row: {
    flexDirection: 'row',
  },
  bannerButton: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#ffa10080',
    marginHorizontal: 4,
  },
});

const isFocused = {
  bannerButton: [styles.bannerButton, { backgroundColor: '#ffa100' }],
};

export default PanResponderBannerSlider;
