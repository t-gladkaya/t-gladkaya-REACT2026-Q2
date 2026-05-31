import { useGetCharactersQuery } from '../api/api';

export const useCharacters = (query: string, page: number) => {
  const { data, isLoading, isFetching, error } = useGetCharactersQuery({
    query,
    page,
  });

  return {
    results: data?.results ?? [],
    loading: isLoading,
    fetching: isFetching,
    error: error
      ? new Error('Something went wrong while loading results.')
      : null,
    totalPages: data?.info.pages ?? 1,
  };
};
