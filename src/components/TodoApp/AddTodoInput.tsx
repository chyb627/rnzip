import React, { Dispatch, SetStateAction } from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import { ITEM_WIDTH } from '../../util/util';
import Icon from '../ui/Icons';

const AddTodoInput: React.FC<{
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  placeholder: string;
  onPressAdd: () => void;
  onSubmitEditing: () => void;
  onFocus: () => void;
}> = ({ value, onChangeText, placeholder, onPressAdd, onSubmitEditing, onFocus }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.TextInputContainer}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false}
        onFocus={onFocus}
      />
      <TouchableOpacity onPress={onPressAdd} style={styles.iconButton}>
        <Icon name="add" size={20} color="#494949" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  TextInputContainer: {
    flex: 1,
    padding: 5,
    color: '#595959',
  },
  iconButton: {
    padding: 5,
  },
});

export default AddTodoInput;
