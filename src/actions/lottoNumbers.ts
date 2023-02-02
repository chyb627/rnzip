import { getRandomSixNumber } from '../util/util';

export const CREATE_NEW_NUMBERS = 'CREATE_NEW_NUMBERS';

export interface CreateNewNumbersAction {
  type: typeof CREATE_NEW_NUMBERS;
  numbers: number[];
}

export const createNewNumbers = (): CreateNewNumbersAction => {
  const numbers = getRandomSixNumber();

  return {
    type: CREATE_NEW_NUMBERS,
    numbers,
  };
};
