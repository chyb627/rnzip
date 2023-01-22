/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '../UI/Icons';

export const FriendSection: React.FC<{
  freindProfileLen: number;
  isOpened: boolean;
  onPressArrow: () => void;
}> = (props) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ color: 'grey' }}>친구 {props.freindProfileLen}</Text>

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
