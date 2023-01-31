import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TUnsplashPhoto } from "./../types";

const BASE_URL = "https://api.unsplash.com";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers, { endpoint }) => {
    headers.set("Cache-Control", "no-cache"),
      headers.set("Pragma", "no-cache"),
      headers.set("Expires", "0");
    return headers;
  }
});


export const apiUnsplash = createApi({
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getPhotos: builder.query<TUnsplashPhoto[], { page: number }>({
      query: (page) => ({
        url: `/search/photos`,
        method: "get",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
        params: {
          page: page,
          'per_page': 30,
          query: "js",
          client_id: "fn-pVLasIokTQN9i-QrPuH9FeftGgSdo76B4ybimcdQ",
        },
      }),
      transformResponse: (response: any, meta, args) => {
        console.log("last item \n\n\n", response?.results[0].id, args);
        return response?.results as TUnsplashPhoto[];
      },
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        console.log("prevuosusss", currentArg, previousArg);
        return currentArg !== previousArg;
      }
    }),
      getPhotoById: builder.query<TUnsplashPhoto, string>({
      query: (id) => ({
        url: `/photos/${id}?client_id=fn-pVLasIokTQN9i-QrPuH9FeftGgSdo76B4ybimcdQ`,
        params: {
        //   'client_id': "fn-pVLasIokTQN9i-QrPuH9FeftGgSdo76B4ybimcdQ",
        },
      }),
    }),
  }),
});

export const { useGetPhotosQuery, useLazyGetPhotosQuery, useGetPhotoByIdQuery } = apiUnsplash;
