import React from 'react';
import { StyleSheet, View } from 'react-native';
import Typography from '../Typography';

export const HeaderTitle: React.FC<{
  title: string;
  color?: string;
}> = (props) => (
  <View style={styles.center}>
    <Typography fontSize={16} numberOfLines={1} color={props.color ?? 'black'}>
      {props.title}
    </Typography>
  </View>
);

const styles = StyleSheet.create({
  center: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
