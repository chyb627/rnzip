/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ITEM_WIDTH } from '../../util/util';
import { Icon } from '../UI/Icons';

export const AddTodoInput: React.FC = ({
  value,
  onChangeText,
  placeholder,
  onPressAdd,
  onSubmitEditing,
  // onFocus,
}) => {
  return (
    <View
      style={{
        width: ITEM_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={{
          flex: 1,
          padding: 5,
          color: '#595959',
        }}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false}
        // onFocus={onFocus}
      />
      <TouchableOpacity onPress={onPressAdd} style={{ padding: 5 }}>
        <Icon name="add" size={20} color="#494949" />
      </TouchableOpacity>
    </View>
  );
};
