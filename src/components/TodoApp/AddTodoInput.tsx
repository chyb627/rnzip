/* eslint-disable react-native/no-inline-styles */

import React, { Dispatch, SetStateAction } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { ITEM_WIDTH } from '../../util/util';
import { Icon } from '../UI/Icons';

export const AddTodoInput: React.FC<{
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  placeholder: string;
  onPressAdd: () => void;
  onSubmitEditing: () => void;
  onFocus: () => void;
}> = ({
  value,
  onChangeText,
  placeholder,
  onPressAdd,
  onSubmitEditing,
  onFocus,
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
        onFocus={onFocus}
      />
      <TouchableOpacity onPress={onPressAdd} style={{ padding: 5 }}>
        <Icon name="add" size={20} color="#494949" />
      </TouchableOpacity>
    </View>
  );
};
