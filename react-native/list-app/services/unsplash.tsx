import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TFIlterArgs, TUnsplashPhoto } from "./../types";

const BASE_API_URL = "https://api.unsplash.com"; // TODO: Move the variable to the env file
const UNSPLSH_CLIENT_ID = "fn-pVLasIokTQN9i-QrPuH9FeftGgSdo76B4ybimcdQ"; // TODO: Move the variable to the env file

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders: async (headers) => {
    return headers;
  },
});

export const apiUnsplash = createApi({
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getPhotos: builder.query<TUnsplashPhoto[], { page: number } & TFIlterArgs>({
      query: (page) => ({
        url: `/search/photos`,
        method: "get",
        params: {
          page: page.page,
          query: page.color,
          per_page: 10,
          client_id: UNSPLSH_CLIENT_ID,
        },
      }),
      transformResponse: (response: any) => {
        return response?.results as TUnsplashPhoto[];
      },
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems, other) => {
        if (other.arg.page <= 1) {
          currentCache.length = 0;
          currentCache.push(...newItems);
        } else {
          currentCache.push(...newItems);
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return true;
      },
    }),
    getPhotoById: builder.query<TUnsplashPhoto, string>({
      query: (id) => ({
        url: `/photos/${id}`,
        params: {
          client_id: UNSPLSH_CLIENT_ID,
        },
      }),
    }),
  }),
});

export const {
  useGetPhotosQuery,
  useLazyGetPhotosQuery,
  useGetPhotoByIdQuery,
} = apiUnsplash;
