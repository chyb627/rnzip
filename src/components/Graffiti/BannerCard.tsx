import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import Button from '../ui/Button';

const BannerCard: React.FC<{
  backgroundColor: string;
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  children: React.ReactNode | string;
  bgImage?: number;
}> = ({ backgroundColor, children, justifyContent, bgImage }) => {
  return (
    <Button onPress={() => {}}>
      {bgImage ? (
        <ImageBackground
          source={bgImage}
          style={[
            styles.container,
            { backgroundColor, justifyContent: justifyContent ?? 'flex-start' },
          ]}>
          {children}
        </ImageBackground>
      ) : (
        <View
          style={[
            styles.container,
            { backgroundColor, justifyContent: justifyContent ?? 'flex-start' },
          ]}>
          {children}
        </View>
      )}
    </Button>
  );
};

export default BannerCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 12,
    padding: 12,
    borderRadius: 24 / 8,
    flexDirection: 'row',
  },
});
