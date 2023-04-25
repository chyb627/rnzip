import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://picsum.photos',
  headers: {
    Accept: 'application/json; charset=utf-8',
  },
});

export const getPhotoInfo = createAsyncThunk('photo/getphotoinfo', async (page: number = 1) => {
  const result = await axios.get('/v2/list', {
    params: {
      page,
      limit: 10,
    },
  });
  return result.data;
});
