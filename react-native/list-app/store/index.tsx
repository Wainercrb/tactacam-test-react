import {combineReducers, configureStore} from '@reduxjs/toolkit';
import photoListSlice from './slice/photoListSclice';

const rootReducer = combineReducers({
  photoList: photoListSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
