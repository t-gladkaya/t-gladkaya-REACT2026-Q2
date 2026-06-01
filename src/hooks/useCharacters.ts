import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useGetCharactersQuery } from '../api/api';

const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError =>
  typeof error === 'object' && error !== null && 'status' in error;

export const useCharacters = (query: string, page: number) => {
  const { data, isLoading, isFetching, error } = useGetCharactersQuery({
    query,
    page,
  });

  const isNotFound = isFetchBaseQueryError(error) && error.status === 404;

  return {
    results: isNotFound ? [] : (data?.results ?? []),
    loading: isLoading || isFetching,
    fetching: isFetching,
    error:
      error && !isNotFound
        ? new Error('Something went wrong while loading results.')
        : null,
    totalPages: isNotFound ? 0 : (data?.info.pages ?? 0),
  };
};
