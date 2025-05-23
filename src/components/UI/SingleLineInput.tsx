import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';

const SingleLineInput: React.FC<{
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  onSubmitEditing: () => void;
  fontSize?: number;
  keyboardType?: TextInputProps['keyboardType'];
}> = (props) => {
  const [focused, setFocused] = useState(false);
  const borderColor = { borderColor: focused ? 'black' : 'gray' };

  return (
    <View style={[styles.container, borderColor]}>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        value={props.value}
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        onSubmitEditing={props.onSubmitEditing}
        style={[{ fontSize: props.fontSize ?? 20 }, styles.textInput]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  textInput: {
    padding: 0,
  },
});

export default SingleLineInput;
