import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getMovieDetails } from '../../actions/movie';

interface UseMovieParams {
  id: number;
}

const useMovie = ({ id }: UseMovieParams) => {
  const dispatch = useDispatch<AppDispatch>();
  const { getMovieDetailsData, getMoviesDataLoading: isLoading } = useSelector(
    (state: RootState) => state.movie,
  );

  useEffect(() => {
    dispatch(getMovieDetails({ id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    movie: getMovieDetailsData,
    isLoading,
  };
};

export default useMovie;
