import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../ui/Icons';

const FriendSection: React.FC<{
  freindProfileLen: number;
  isOpened: boolean;
  onPressArrow: () => void;
}> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textColor}>친구 {props.freindProfileLen}</Text>

      <TouchableOpacity onPress={props.onPressArrow}>
        <Icon
          name={props.isOpened ? 'chevron-up-sharp' : 'chevron-down-sharp'}
          size={24}
          color="#000"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textColor: {
    color: 'grey',
  },
});

export default FriendSection;
