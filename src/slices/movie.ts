import { createSlice } from '@reduxjs/toolkit';
import { getDiscoverMovies, getMoviesData } from '../actions/movie';
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
  getMoviesDataLoading: boolean;
  getMoviesDataDone: boolean;
  getMoviesDataError: Error | string | null | undefined;
  getMoviesResultData: Movie[];
}

export const initialState: InitialState = {
  getDiscoverMoviesLoading: false,
  getDiscoverMoviesDone: false,
  getDiscoverMoviesError: null,
  getDiscoverMoviesData: null,
  getMoviesDataLoading: false,
  getMoviesDataDone: false,
  getMoviesDataError: null,
  getMoviesResultData: [],
};

const MovieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    resetMovieData(state) {
      return {
        ...state,
        getMoviesResultData: [],
      };
    },
  },
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
        state.getMoviesResultData = action.payload.results;
      })
      .addCase(getDiscoverMovies.rejected, (state, action) => {
        state.getDiscoverMoviesLoading = false;
        state.getDiscoverMoviesError = action.error.message;
      })
      // getMoviesData
      .addCase(getMoviesData.pending, (state) => {
        state.getMoviesDataLoading = true;
        state.getMoviesDataDone = false;
        state.getMoviesDataError = null;
      })
      .addCase(getMoviesData.fulfilled, (state, action) => {
        state.getMoviesDataLoading = false;
        state.getMoviesDataDone = true;
        state.getMoviesResultData = state.getMoviesResultData.concat(action.payload);
      })
      .addCase(getMoviesData.rejected, (state, action) => {
        state.getMoviesDataLoading = false;
        state.getMoviesDataError = action.error.message;
      }),
});

export default MovieSlice;
