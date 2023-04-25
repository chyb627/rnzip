import React, { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';

const Button: React.FC<{
  onPressIn?: () => void;
  onPressOut?: () => void;
  onPress: () => void;
  hitSlop?: { left: number; right: number; top: number; bottom: number };
  backgroundColor?: string;
  paddingHorizontal?: number;
  paddingVertical?: number;
  children: ReactElement | ReactElement[];
}> = (props) => (
  <TouchableOpacity
    {...props}
    onPressIn={props.onPressIn}
    onPressOut={props.onPressOut}
    onPress={props.onPress}
    hitSlop={
      props.hitSlop ?? {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }
    }
    style={{
      backgroundColor: props.backgroundColor,
      paddingHorizontal: props.paddingHorizontal,
      paddingVertical: props.paddingVertical,
    }}>
    {props.children}
  </TouchableOpacity>
);

export default Button;
