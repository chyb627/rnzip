import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from '../ui/Icons';
import Typography from '../ui/Typography';

const TagBox: React.FC<{
  text: string;
  iconName?: string;
  backgroundColor?: string;
  fontColor?: string;
  iconColor?: string;
}> = ({ text, backgroundColor, fontColor, iconColor, iconName }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.containerInner, { backgroundColor }]}>
        {iconName && <Icon name={iconName} size={12} color={iconColor ?? '#000'} />}
        <Typography fontSize={12} color={fontColor ?? '#000'}>
          {text}
        </Typography>
      </View>
    </View>
  );
};

export default TagBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 0.1,
  },
  containerInner: {
    flexDirection: 'row',
    marginHorizontal: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});
