import { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import dayjs from 'dayjs';
import { getDiscoverMovies, getMoviesData } from '../../actions/movie';
import MovieSlice from '../../slices/movie';

const useMovies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    getDiscoverMoviesData,
    getDiscoverMoviesLoading: isLoading,
    getMoviesResultData: movies,
  } = useSelector((state: RootState) => state.movie);
  const [pageNumber, setPageNumber] = useState(1);
  const { resetMovieData } = MovieSlice.actions;

  useEffect(() => {
    const params = {
      releaseDateGte: dayjs().format('YYYY-MM-DD'),
      releaseDateLte: dayjs().add(1, 'year').format('YYYY-MM-DD'),
    };
    dispatch(getDiscoverMovies(params));

    return () => {
      dispatch(resetMovieData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = useCallback(() => {
    if (getDiscoverMoviesData && pageNumber < getDiscoverMoviesData.totalPages) {
      const params = {
        releaseDateGte: dayjs().format('YYYY-MM-DD'),
        releaseDateLte: dayjs().add(1, 'year').format('YYYY-MM-DD'),
        page: pageNumber + 1,
      };

      dispatch(getMoviesData(params));
      setPageNumber(pageNumber + 1);
    }
  }, [dispatch, getDiscoverMoviesData, pageNumber]);

  const refresh = useCallback(() => {
    dispatch(resetMovieData());
    const params = {
      releaseDateGte: dayjs().format('YYYY-MM-DD'),
      releaseDateLte: dayjs().add(1, 'year').format('YYYY-MM-DD'),
      page: 1,
    };
    dispatch(getDiscoverMovies(params));
    setPageNumber(1);
  }, [dispatch, resetMovieData]);

  return {
    movies,
    isLoading,
    loadMore,
    refresh,
  };
};

export default useMovies;
