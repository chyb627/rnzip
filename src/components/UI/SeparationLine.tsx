import React from 'react';
import { StyleSheet, View } from 'react-native';

const SeparationLine: React.FC<{
  color?: string;
}> = (props) => {
  return <View style={[styles.container, { borderColor: props.color ?? '#bbb' }]} />;
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
});

export default SeparationLine;
