import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const TranslationButton: React.FC<{
  onPress: () => void;
  isSelected: boolean;
  text: 'KO' | 'EN' | 'JA' | 'ZH';
}> = ({ onPress, isSelected, text }) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        isSelected ? styles.selectedButton : styles.notSelectedButton,
      ]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#FFFFFF80',
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginHorizontal: 5,
  },
  selectedButton: {
    borderColor: 'white',
  },
  notSelectedButton: {
    borderColor: 'transparent',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
