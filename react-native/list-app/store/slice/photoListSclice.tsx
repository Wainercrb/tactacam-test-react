import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as unsplashClient from '../../clients/unsplashClient'
import { TFIlterArgs, TUnsplashPhoto } from '../../types';

export type UserListState = {
  photos: TUnsplashPhoto[];
  loading: boolean;
  error: boolean;
  nextPage: number;
};

const initialState: UserListState = {
  photos: [],
  loading: false,
  error: true,
  nextPage: 1,
};

export const fetchPhotos = createAsyncThunk<{photos: TUnsplashPhoto[]}, {page: number} & TFIlterArgs>(
  'fetchUsers',
  async ({page, color, orientation}) => {
    const response = await unsplashClient.fetchPhothosByPage(page, color, orientation);
    if (response.kind === 'success') {
      return {
        photos: response.body ?? [],
      };
    } else {
      throw 'Error fetching users';
    }
  },
);

const photoListSlice = createSlice({
  name: 'photoList',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.nextPage += 1;
        state.photos = state.photos.concat(action.payload.photos);
        state.loading = false;
      })
      .addCase(fetchPhotos.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default photoListSlice.reducer;
