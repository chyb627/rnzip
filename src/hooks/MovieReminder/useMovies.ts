import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import dayjs from 'dayjs';
import { getDiscoverMovies } from '../../actions/movie';

const useMovies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { getDiscoverMoviesData, getDiscoverMoviesLoading: isLoading } = useSelector(
    (state: RootState) => state.movie,
  );

  useEffect(() => {
    const params = {
      releaseDateGte: dayjs().format('YYYY-MM-DD'),
      releaseDateLte: dayjs().add(1, 'year').format('YYYY-MM-DD'),
    };
    dispatch(getDiscoverMovies(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const movies = getDiscoverMoviesData?.results ?? [];

  return {
    movies,
    isLoading,
  };
};

export default useMovies;
