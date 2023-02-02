import dayjs from 'dayjs';
import {
  CreateNewNumbersAction,
  CREATE_NEW_NUMBERS,
} from '../actions/lottoNumbers';

interface InitialState {
  currentNumber: number[];
  history: {
    date: string;
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
    const date = dayjs(new Date()).format('YYYY.MM.DD hh:mm');

    return {
      ...state,
      currentNumber: action.numbers,
      history: state.history.concat([
        {
          date,
          numbers: action.numbers,
        },
      ]),
    };
  }

  return {
    ...state,
  };
};
