import { useCallback, useEffect, useState } from 'react';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export const useRocket = () => {
  const [count, setCount] = useState(3);
  const [counting, setCounting] = useState(false);
  const [removeButton, setRemoveButton] = useState(false);

  const value = useSharedValue(0);

  const rocketStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: value.value }],
    };
  });

  const onPressButton = useCallback(() => {
    setCounting(true);
    value.value = 0;
  }, [value]);

  useEffect(() => {
    if (count === 0) {
      setCounting(false);
      setRemoveButton(true);
      // 로켓 올라가는 EVENT
      value.value = withTiming(-600, { duration: 3000 });
    }

    if (counting) {
      const id = setInterval(() => {
        setCount((countValue) => countValue - 1);
      }, 1000);
      return () => clearInterval(id);
    }
  }, [counting, count, value]);

  return {
    count,
    counting,
    removeButton,
    rocketStyles,
    onPressButton,
  };
};
