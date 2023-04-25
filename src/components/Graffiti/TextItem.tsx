import React from 'react';
import { StyleSheet, View } from 'react-native';
import Typography from '../ui/Typography';

const TextItem: React.FC<{
  title: string;
  subTitle1: string;
  subTitle2: string;
}> = ({ title, subTitle1, subTitle2 }) => {
  return (
    <View style={styles.textItemContainer}>
      <Typography color="#000" fontSize={24}>
        {title}
      </Typography>

      <View style={styles.textItemSubTitle}>
        <Typography color="#aaa" fontSize={12}>
          {subTitle1}
        </Typography>
        <Typography color="#aaa" fontSize={12}>
          {subTitle2}
        </Typography>
      </View>
    </View>
  );
};

export default TextItem;

const styles = StyleSheet.create({
  textItemContainer: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  textItemSubTitle: {
    marginLeft: 8,
  },
});
