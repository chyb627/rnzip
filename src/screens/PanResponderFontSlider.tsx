import React, { useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

const BOX = 50;
const CIRCLE = 20;

const PanResponderFontSlider = () => {
  const FONT = [
    {
      title: { fontSize: 20, lineHeight: 32 },
      body: { fontSize: 12 },
    },
    {
      title: { fontSize: 24, lineHeight: 38 },
      body: { fontSize: 14 },
    },
    {
      title: { fontSize: 30, lineHeight: 40 },
      body: { fontSize: 15 },
    },
    {
      title: { fontSize: 38, lineHeight: 50 },
      body: { fontSize: 19 },
    },
  ];

  const [step, setStep] = useState(0);

  const onPress = (index) => {
    setStep(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View>
          <Text style={FONT[step].title}>Font Step 1</Text>
          <Text style={FONT[step].body}>font body style</Text>
        </View>

        <View style={styles.sliderContainer}>
          <View style={styles.rowLine} />

          <View style={styles.row}>
            {[...Array(4)].map((v, i) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  onPress(i);
                }}
                key={i}>
                <View style={styles.grayCircle}>
                  <View style={styles.grayCircleBackground} />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>

          <View
            style={[
              styles.selectedCircle,
              {
                left: BOX / 2 - CIRCLE / 2 + step * BOX,
              },
            ]}
          />
        </View>
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
  subContainer: {
    width: 200,
    height: 150,
    justifyContent: 'flex-end',
  },
  sliderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowLine: {
    position: 'absolute',
    top: 24,
    width: BOX * 3,
    borderBottomColor: '#ddd',
    borderBottomWidth: 2,
  },
  grayCircle: {
    width: BOX,
    height: BOX,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grayCircleBackground: {
    backgroundColor: '#ddd',
    width: 10,
    height: 10,
    borderRadius: 100,
  },
  row: {
    flexDirection: 'row',
  },
  selectedCircle: {
    width: 20,
    height: 20,
    backgroundColor: '#333',
    position: 'absolute',
    borderRadius: 100,
  },
});

export default PanResponderFontSlider;
