/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { useCalculator } from '../hooks/Calculator/use-calculator';

const COLOR = {
  RESULT: '#4e4c51',
  RESET: '#5d5e62',
  OPERATOR: '#f39c29',
  NUM: '#5c5674',
};

const Button: React.FC<{
  text: string;
  onPress: () => void;
  flex: number;
  type: string;
  isSelected?: boolean;
}> = ({ text, onPress, flex, type, isSelected }) => {
  const backgroundColor =
    type === 'reset'
      ? COLOR.RESET
      : type === 'operator'
      ? COLOR.OPERATOR
      : type === 'num'
      ? COLOR.NUM
      : 'transparent';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderWidth: isSelected ? 1 : 0.2,
        borderColor: '#000',
      }}>
      <Text style={{ color: 'white', fontSize: 25 }}>{text}</Text>
    </TouchableOpacity>
  );
};

const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;
const InputContainer = styled.View`
  background-color: ${COLOR.RESULT};
  min-height: 50px;
  justify-content: center;
  align-items: flex-end;
  padding: 10px 5px; // (top, bottom)-vertical (right, left)-holizontal
`;

export const Calculator = () => {
  const { input, currentOperator, hasInput, onPressNum, onPressOperator, onPressReset } =
    useCalculator();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 1, width: 250, justifyContent: 'center' }}>
        {/* 결과 */}
        <InputContainer>
          <Text style={{ color: 'white', fontSize: 35, textAlign: 'right' }}>{input}</Text>
        </InputContainer>

        {/* [AC ~ /] */}
        <ButtonContainer>
          <Button type="reset" text={hasInput ? 'C' : 'AC'} onPress={onPressReset} flex={3} />
          <Button
            type="operator"
            text="/"
            onPress={() => onPressOperator('/')}
            flex={1}
            isSelected={currentOperator === '/'}
          />
        </ButtonContainer>

        {/* [7 ~ x] */}
        <ButtonContainer>
          {[7, 8, 9].map((num) => (
            <Button
              type="num"
              text={`${num}`}
              onPress={() => onPressNum(num)}
              flex={1}
              key={`btn-${num}`}
            />
          ))}

          <Button
            type="operator"
            text="*"
            onPress={() => onPressOperator('*')}
            flex={1}
            isSelected={currentOperator === '*'}
          />
        </ButtonContainer>

        {/* [4 ~ -] */}
        <ButtonContainer>
          {[4, 5, 6].map((num) => (
            <Button
              type="num"
              text={`${num}`}
              onPress={() => onPressNum(num)}
              flex={1}
              key={`btn-${num}`}
            />
          ))}
          <Button
            type="operator"
            text="-"
            onPress={() => onPressOperator('-')}
            flex={1}
            isSelected={currentOperator === '-'}
          />
        </ButtonContainer>

        {/* [1 ~ +] */}
        <ButtonContainer>
          {[1, 2, 3].map((num) => (
            <Button
              type="num"
              text={`${num}`}
              onPress={() => onPressNum(num)}
              flex={1}
              key={`btn-${num}`}
            />
          ))}
          <Button
            type="operator"
            text="+"
            onPress={() => onPressOperator('+')}
            flex={1}
            isSelected={currentOperator === '+'}
          />
        </ButtonContainer>

        {/* [0 ~ =] */}
        <ButtonContainer>
          <Button type="num" text="0" onPress={() => onPressNum(0)} flex={3} />
          <Button type="operator" text="=" onPress={() => onPressOperator('=')} flex={1} />
        </ButtonContainer>
      </View>
    </SafeAreaView>
  );
};
