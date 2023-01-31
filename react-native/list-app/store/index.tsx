import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiUnsplash } from "../services/unsplash";
import photoListSlice from "./slice/photoListSclice";

const rootReducer = combineReducers({
  photoList: photoListSlice,
  [apiUnsplash.reducerPath]: apiUnsplash.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiUnsplash.middleware),
  devTools: process.env.NODE_ENV !== "production",
});


export default store;
