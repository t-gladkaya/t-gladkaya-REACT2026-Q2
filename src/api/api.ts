import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Character,
  CharacterResponse,
  GetCharactersArgs,
} from '../types/types';

const cacheTime = Number(import.meta.env.VITE_CACHE_TIME ?? 300);

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api' }),
  keepUnusedDataFor: cacheTime,
  tagTypes: ['Characters', 'Character'],
  endpoints: (builder) => ({
    getCharacters: builder.query<CharacterResponse, GetCharactersArgs>({
      query: ({ query, page }) => ({
        url: 'character',
        params: {
          page,
          ...(query.trim() ? { name: query.trim() } : {}),
        },
      }),
      providesTags: [{ type: 'Characters', id: 'LIST' }],
    }),

    getCharacterById: builder.query<Character, string>({
      query: (id) => `character/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Character', id }],
    }),

    testInvalidEndpoint: builder.query<unknown, void>({
      query: () => 'invalid-endpoint',
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterByIdQuery,
  useLazyTestInvalidEndpointQuery,
} = mainApi;
