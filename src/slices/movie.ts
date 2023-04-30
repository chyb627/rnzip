import { createSlice } from '@reduxjs/toolkit';
import { getDiscoverMovies } from '../actions/movie';
import { Movie } from '../types/movieReminderType';

export interface InitialState {
  getDiscoverMoviesLoading: boolean;
  getDiscoverMoviesDone: boolean;
  getDiscoverMoviesError: Error | string | null | undefined;
  getDiscoverMoviesData: {
    page: number;
    results: Movie[];
    totalPages: number;
    totalResults: number;
  } | null;
}

export const initialState: InitialState = {
  getDiscoverMoviesLoading: false,
  getDiscoverMoviesDone: false,
  getDiscoverMoviesError: null,
  getDiscoverMoviesData: null,
};

const MovieSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // getDiscoverMovies
      .addCase(getDiscoverMovies.pending, (state) => {
        state.getDiscoverMoviesLoading = true;
        state.getDiscoverMoviesDone = false;
        state.getDiscoverMoviesError = null;
      })
      .addCase(getDiscoverMovies.fulfilled, (state, action) => {
        state.getDiscoverMoviesLoading = false;
        state.getDiscoverMoviesDone = true;
        state.getDiscoverMoviesData = action.payload;
      })
      .addCase(getDiscoverMovies.rejected, (state, action) => {
        state.getDiscoverMoviesLoading = false;
        state.getDiscoverMoviesError = action.error.message;
      }),
});

export default MovieSlice;
