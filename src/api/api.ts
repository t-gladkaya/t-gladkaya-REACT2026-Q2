import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Character,
  CharacterResponse,
  GetCharactersArgs,
} from '../types/types';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api' }),
  endpoints: (builder) => ({
    getCharacters: builder.query<CharacterResponse, GetCharactersArgs>({
      query: ({ query, page }) => ({
        url: 'character',
        params: {
          page,
          ...(query.trim() ? { name: query.trim() } : {}),
        },
      }),
    }),
    getCharacterById: builder.query<Character, string>({
      query: (id) => `character/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = mainApi;
