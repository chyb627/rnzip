import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Button } from './Button';
import { Typography } from './Typography';

test('Button Test', async () => {
  const onPressed = jest.fn();

  const expectedButtonName = 'TEST_BUTTON';

  render(
    <Button onPress={onPressed}>
      <Typography>{expectedButtonName}</Typography>
    </Button>,
  );

  expect(screen.toJSON()).toMatchSnapshot();

  fireEvent.press(screen.getByText(expectedButtonName));

  expect(onPressed).toHaveBeenCalled();
});

// 의도된 변화이면 업데이트 명령어를 다음과 같이 적어준다
// yarn test:unit -- --u
