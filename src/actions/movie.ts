import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import { Movie } from '../types/movieReminderType';
import Config from 'react-native-config';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const axios = Axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: Config.MOVIE_API_KEY,
    language: 'ko-KR',
  },
});

interface MovieResponse {
  poster_path: string | null;
  overview: string;
  release_date: string;
  id: number;
  original_title: string;
  title: string;
}

interface GetDiscoverMoviesResponse {
  page: number;
  results: MovieResponse[];
  total_results: number;
  total_pages: number;
}

interface GetDiscoverMoviesParams {
  releaseDateGte?: string;
  releaseDateLte?: string;
  page?: number;
}

export const getDiscoverMovies = createAsyncThunk(
  'discover/movie',
  async ({ releaseDateGte, releaseDateLte, page }: GetDiscoverMoviesParams) => {
    const response = await axios.get<GetDiscoverMoviesResponse>('discover/movie', {
      params: {
        ['release_date.gte']: releaseDateGte,
        ['release_date.lte']: releaseDateLte,
        region: 'KR',
        page,
      },
    });

    const movies: Movie[] = response.data.results.map<Movie>((v) => ({
      id: v.id,
      title: v.title,
      originalTitle: v.original_title,
      releaseData: v.release_date,
      overview: v.overview,
      posterUrl: v.poster_path != null ? `${IMG_BASE_URL}/${v.poster_path}` : null,
    }));

    const newOjb = {
      page: response.data.page,
      results: movies,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results,
    };

    return newOjb;
  },
);

export const getMoviesData = createAsyncThunk(
  'discover/movies',
  async ({ releaseDateGte, releaseDateLte, page }: GetDiscoverMoviesParams) => {
    const response = await axios.get<GetDiscoverMoviesResponse>('discover/movie', {
      params: {
        ['release_date.gte']: releaseDateGte,
        ['release_date.lte']: releaseDateLte,
        region: 'KR',
        page,
      },
    });

    const movies: Movie[] = response.data.results.map<Movie>((v) => ({
      id: v.id,
      title: v.title,
      originalTitle: v.original_title,
      releaseData: v.release_date,
      overview: v.overview,
      posterUrl: v.poster_path != null ? `${IMG_BASE_URL}/${v.poster_path}` : null,
    }));

    return movies;
  },
);
