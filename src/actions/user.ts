import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootReducer } from '../store/store';
import { FeedInfo } from '../types/FeedInfo';
import { UserInfo } from '../types/UserInfo';
import { sleep } from '../util/sleep';

export const SET_USER_INFO = 'SET_USER_INFO' as const;

export const GET_MY_FEED_REQUEST = 'GET_MY_FEED_REQUEST' as const;
export const GET_MY_FEED_SUCCESS = 'GET_MY_FEED_SUCCESS' as const;
export const GET_MY_FEED_FAILURE = 'GET_MY_FEED_FAILURE' as const;

export const setUserInfo = (user: UserInfo) => {
  return {
    type: SET_USER_INFO,
    user,
  };
};

export const getMyFeedRequest = () => {
  return {
    type: GET_MY_FEED_REQUEST,
  };
};

export const getMyFeedSuccess = (list: FeedInfo[]) => {
  return {
    type: GET_MY_FEED_SUCCESS,
    list,
  };
};

export const getMyFeedFailure = () => {
  return {
    type: GET_MY_FEED_FAILURE,
  };
};

export const signIn = (): TypeUserThunkAction => async (dispatch) => {
  await sleep(1000);
  dispatch(
    setUserInfo({
      uid: 'TEST_UID',
      name: 'TEST_NAME',
      profileImage: 'TEST_PROFILE_IMAGE',
    }),
  );
};

export const getMyFeedList = (): TypeUserThunkAction => async (dispatch) => {
  dispatch(getMyFeedRequest());

  await sleep(500);
  dispatch(
    getMyFeedSuccess([
      {
        id: 'IDIDID1',
        content: 'CONTENT1',
        writer: {
          name: 'NAME1',
          uid: 'UID1',
        },
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmIqaNHzUTR81YyZZ9UheF3KQ3Q_gwZBSqhA&usqp=CAU',
        likeHistory: ['UID_01', 'UID_02', 'UID_03'],
        createdAt: new Date().getTime(),
      },
      {
        id: 'IDIDID2',
        content: 'CONTENT2',
        writer: {
          name: 'NAME2',
          uid: 'UID2',
        },
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBEJXbuwtmMSeRMzw2fiUqCUB-yLZOFzcycQ&usqp=CAU',
        likeHistory: ['UID_21', 'UID_22', 'UID_23'],
        createdAt: new Date().getTime(),
      },
      {
        id: 'IDIDID3',
        content: 'CONTENT3',
        writer: {
          name: 'NAME3',
          uid: 'UID3',
        },
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBEJXbuwtmMSeRMzw2fiUqCUB-yLZOFzcycQ&usqp=CAU',
        likeHistory: ['UID_31', 'UID_32', 'UID_33'],
        createdAt: new Date().getTime(),
      },
    ]),
  );
};

export type TypeUserThunkAction = ThunkAction<
  Promise<void>,
  RootReducer,
  undefined,
  TypeUserInfoActions
>;
export type TypeUserDispatch = ThunkDispatch<
  RootReducer,
  undefined,
  TypeUserInfoActions
>;

export type TypeUserInfoActions =
  | ReturnType<typeof setUserInfo>
  | ReturnType<typeof getMyFeedRequest>
  | ReturnType<typeof getMyFeedSuccess>
  | ReturnType<typeof getMyFeedFailure>;
