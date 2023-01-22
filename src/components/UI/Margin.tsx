import React from 'react';
import { View } from 'react-native';

export const Margin: React.FC<{
  height: number;
}> = (props) => {
  return <View style={{ height: props.height }} />;
};
