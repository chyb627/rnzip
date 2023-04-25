import React from 'react';
import { Text as RNText } from 'react-native';

type TypographyProps = {
  color?: string;
  fontSize?: number;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  numberOfLines?: number;
  lineHeight?: number;
  textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through' | undefined;
  children: React.ReactNode | string;
};

const Typography: React.FC<TypographyProps> = (props) => (
  <RNText
    style={{
      color: props.color ?? 'black',
      fontWeight: props.fontWeight ?? 'normal',
      lineHeight: props.lineHeight && props.lineHeight,
      fontSize: props.fontSize ?? 10,
      textDecorationLine: props.textDecorationLine ?? 'none',
    }}
    numberOfLines={props.numberOfLines}>
    {props.children}
  </RNText>
);

export default Typography;
