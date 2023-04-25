import React from 'react';
import { TouchableOpacity } from 'react-native';
import { DarkColor, LightClor } from '../../util/color';
import Icon from '../ui/Icons';

const AlarmButton: React.FC<{
  onPress: () => void;
  style?: {
    paddingHorizontal?: number;
  };
  NEWCOLOR: LightClor | DarkColor;
}> = ({ onPress, style, NEWCOLOR }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Icon name="alarm-outline" size={20} color={NEWCOLOR.GRAY_3_GRAY_2} />
    </TouchableOpacity>
  );
};

export default AlarmButton;
