import React from 'react';
import type { Character } from '../components/Card';
import { fetchCharacter } from '../api/api';

export const useCharacters = (query: string, page: number) => {
  const [results, setResults] = React.useState<Character[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [totalPages, setTotalPages] = React.useState(1);

  React.useEffect(() => {
    let isCancelled = false;

    const loadPage = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchCharacter(query, page);

        if (isCancelled) {
          return;
        }

        setResults(data.results);
        setTotalPages(data.info.pages);
      } catch {
        if (isCancelled) {
          return;
        }

        setResults([]);
        setError(new Error('Something went wrong while loading results.'));
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    void loadPage();

    return () => {
      isCancelled = true;
    };
  }, [query, page]);

  return {
    results,
    loading,
    error,
    totalPages,
  };
};
