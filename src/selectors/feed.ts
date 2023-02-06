import { useSelector } from 'react-redux';
import { RootReducer } from '../store/store';
import { FeedInfo } from '../types/FeedInfo';

export const useTotalFeedList = () =>
  useSelector<RootReducer, FeedInfop[]>((state) => state.feedList.list);
