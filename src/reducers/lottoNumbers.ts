import dayjs, { Dayjs } from 'dayjs';
import {
  CreateNewNumbersAction,
  CREATE_NEW_NUMBERS,
} from '../actions/lottoNumbers';

interface InitialState {
  currentNumber: number[];
  history: {
    date: Dayjs;
    numbers: number[];
  }[];
}

const defaultState: InitialState = {
  currentNumber: [],
  history: [],
};

export const lottoNumberReducers = (
  state = defaultState,
  action: CreateNewNumbersAction,
) => {
  if (action.type === CREATE_NEW_NUMBERS) {
    return {
      ...state,
      currentNumber: action.numbers,
      history: state.history.concat([
        {
          date: dayjs(new Date()),
          numbers: action.numbers,
        },
      ]),
    };
  }

  return {
    ...state,
  };
};
