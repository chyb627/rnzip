import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from '../ui/Icons';

interface QnaCardProps {
  question: string;
  answer: string;
}

const QnaCard: React.FC<QnaCardProps> = ({ question, answer }) => {
  const interpolateAnimation = useRef(new Animated.Value(0)).current;
  let isOpened = false;

  const onPressQuestion = () => {
    Animated.timing(interpolateAnimation, {
      toValue: isOpened ? 0 : 1,
      useNativeDriver: false,
    }).start(() => {
      isOpened = !isOpened;
    });
  };

  return (
    <>
      {/* 질문 */}
      <TouchableWithoutFeedback onPress={onPressQuestion}>
        <View style={styles.questionContaienr}>
          <Text style={styles.questionText}>{question}</Text>

          <Animated.View
            style={[
              styles.questionIconContainer,
              {
                transform: [
                  {
                    rotate: interpolateAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '180deg'],
                    }),
                  },
                ],
              },
            ]}>
            <Icon name="chevron-down" size={24} color="yellow" />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>

      {/* 답변 */}
      <Animated.View
        style={[
          styles.answerContainer,
          {
            height: interpolateAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 100],
            }),
          },
        ]}>
        <Text style={styles.answerText}>{answer}</Text>
      </Animated.View>
    </>
  );
};

export default QnaCard;

const styles = StyleSheet.create({
  questionContaienr: {
    backgroundColor: '#4c5ced',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 16,
    flexShrink: 1,
  },
  questionIconContainer: {
    flexShrink: 1,
    marginLeft: 10,
  },
  answerContainer: {
    paddingHorizontal: 40,
    justifyContent: 'center',
    borderBottomColor: '#4c5ced',
    borderBottomWidth: 0.5,
  },
  answerText: {
    fontSize: 14,
  },
});
