import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useRocket } from '../hooks/Rocket/useRocket';
import LocalImage from '../components/ui/LocalImage';
import Spacer from '../components/ui/Spacer';
import Button from '../components/ui/Button';

const Rocket = () => {
  const { count, counting, removeButton, rocketStyles, onPressButton } = useRocket();

  return (
    <View style={styles.container}>
      <Animated.View style={rocketStyles}>
        <LocalImage localAsset={require('../assets/images/rocket.png')} width={40} height={40} />
      </Animated.View>

      <Spacer space={20} />

      {removeButton ? null : (
        <View style={styles.buttonContainer}>
          <Button paddingHorizontal={10} paddingVertical={10} onPress={onPressButton}>
            <Text style={styles.buttonText}>{counting ? count : '로켓발사'}</Text>
          </Button>
        </View>
      )}
    </View>
  );
};

export default Rocket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 150,
    marginBottom: 36,
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#CB2027',
    minWidth: 80,
  },
  buttonText: {
    color: '#FFF',
  },
});
