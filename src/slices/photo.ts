import { createSlice } from '@reduxjs/toolkit';
import { getPhotoInfo } from '../actions/photo';
import { PhotoList } from '../types/photoTypes';

export interface InitialState {
  getPhotoInfoLoading: boolean;
  getPhotoInfoDone: boolean;
  getPhotoInfoError: Error | string | null | undefined;
  getPhotoInfoData: PhotoList[];
}

export const initialState: InitialState = {
  getPhotoInfoLoading: false,
  getPhotoInfoDone: false,
  getPhotoInfoError: null,
  getPhotoInfoData: [],
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    resetGetPhotoInfo(state) {
      return {
        ...state,
        getPhotoInfoData: [],
      };
    },
  },
  extraReducers: (builder) =>
    builder
      // getPhotoInfo
      .addCase(getPhotoInfo.pending, (state) => {
        state.getPhotoInfoLoading = true;
        state.getPhotoInfoDone = false;
        state.getPhotoInfoError = null;
      })
      .addCase(getPhotoInfo.fulfilled, (state, action) => {
        const hasData = state.getPhotoInfoData && state.getPhotoInfoData.length > 0;
        state.getPhotoInfoLoading = false;
        state.getPhotoInfoDone = true;
        if (hasData) {
          state.getPhotoInfoData = state.getPhotoInfoData.concat(action.payload);
        } else {
          state.getPhotoInfoData = action.payload;
        }
      })
      .addCase(getPhotoInfo.rejected, (state, action) => {
        state.getPhotoInfoLoading = false;
        state.getPhotoInfoError = action.error.message;
      }),
});

export default photoSlice;
export const { resetGetPhotoInfo } = photoSlice.actions;
