import { useCallback, useState } from 'react';

export const useCalculator = () => {
  const [input, setInput] = useState<number>(0);
  const [currentOperator, setCurrentOperator] = useState<
    '+' | '-' | '*' | '/' | '=' | null
  >(null);
  const [result, setResult] = useState<number>(0);
  const [tempInput, setTempInput] = useState<number>(0);
  const [tempOperator, setTempOperator] = useState<string | null>(null);
  const [isClickedOperator, setIsClickedOperator] = useState<boolean>(false);
  const [isClickedEqual, setIsClickedEqual] = useState<boolean>(false);

  const hasInput = !!input; // input ? true : false;

  const onPressNum = useCallback(
    (num: number) => {
      if (currentOperator && isClickedOperator) {
        setResult(input);
        setInput(num);
        setIsClickedOperator(false);
      } else {
        const newInput = Number(`${input}${num}`);
        setInput(newInput);
      }
    },
    [currentOperator, input, isClickedOperator],
  );

  const onPressOperator = useCallback(
    (operator: '+' | '-' | '*' | '/' | '=') => {
      if (operator !== '=') {
        setCurrentOperator(operator);
        setIsClickedOperator(true);
        setIsClickedEqual(false);
      } else {
        let finalResult = result;
        const finalInput = isClickedEqual ? tempInput : input;
        const finalOperator = isClickedEqual ? tempOperator : currentOperator;

        switch (finalOperator) {
          case '+':
            finalResult = result + finalInput;
            break;
          case '-':
            finalResult = result - finalInput;
            break;
          case '*':
            finalResult = result * finalInput;
            break;
          case '/':
            finalResult = result / finalInput;
            break;
          default:
            break;
        }
        setResult(finalResult);
        setInput(finalResult);
        setTempInput(finalInput);
        setCurrentOperator(null);
        setTempOperator(finalOperator);
        setIsClickedEqual(true);
      }
    },
    [currentOperator, input, isClickedEqual, result, tempInput, tempOperator],
  );

  const onPressReset = useCallback(() => {
    if (hasInput) {
      setInput(0);
    } else {
      setInput(0);
      setCurrentOperator(null);
      setResult(0);
      setTempInput(0);
      setTempOperator(null);
    }
  }, [hasInput]);

  return {
    input,
    currentOperator,
    hasInput,
    onPressNum,
    onPressOperator,
    onPressReset,
  };
};
