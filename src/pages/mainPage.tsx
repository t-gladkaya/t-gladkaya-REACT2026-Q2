import React from 'react';
import SearchLine from '../components/SearchLine';
import ResultsSection from '../components/ResultsSection';
import TestButton from '../components/TestButton';
import type { Character } from '../components/Card';
import { API_URLS } from '../api/api';
import {
  getSavedSearchTerm,
  saveSearchTerm,
} from '../utils/handleLocalStorage';
import { useNavigate } from 'react-router';

interface CharacterResponse {
  results: Character[];
}

interface MainPageState {
  query: string;
  lastSearchedQuery: string | null;
  results: Character[];
  loading: boolean;
  error: Error | null;
}

const fetchCharacter = async (query: string): Promise<CharacterResponse> => {
  let lastError: unknown;

  for (const apiUrl of API_URLS) {
    try {
      const trimmedQuery = query.trim();
      const url = trimmedQuery
        ? `${apiUrl}?name=${encodeURIComponent(trimmedQuery)}`
        : apiUrl;
      const response = await fetch(url);

      if (response.status === 404) {
        return { results: [] };
      }

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return (await response.json()) as CharacterResponse;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error('Failed to fetch characters.');
};

const MainPage = () => {
  const navigate = useNavigate();
  const savedQuery = getSavedSearchTerm().trim();

  const [state, setState] = React.useState<MainPageState>({
    query: savedQuery,
    lastSearchedQuery: '',
    results: [],
    loading: true,
    error: null,
  });

  const { query, results, loading, error } = state;

  React.useEffect(() => {
    let isCancelled = false;

    const loadFirstPage = async () => {
      try {
        const data = await fetchCharacter('');

        if (isCancelled) {
          return;
        }

        setState((prevState) => ({
          ...prevState,
          results: data.results,
          loading: false,
        }));
      } catch {
        if (isCancelled) {
          return;
        }

        setState((prevState) => ({
          ...prevState,
          results: [],
          loading: false,
          error: new Error('Something went wrong while loading results.'),
        }));
      }
    };

    void loadFirstPage();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleQueryChange = (query: string) => {
    setState((prevState) => ({
      ...prevState,
      query,
    }));
  };

  const handleSearch = async () => {
    const trimmedQuery = state.query.trim();

    if (trimmedQuery === state.lastSearchedQuery) {
      return;
    }

    saveSearchTerm(trimmedQuery);

    setState((prevState) => ({
      ...prevState,
      query: trimmedQuery,
      loading: true,
      error: null,
      lastSearchedQuery: trimmedQuery,
    }));

    try {
      const data = await fetchCharacter(trimmedQuery);
      setState((prevState) => ({
        ...prevState,
        results: data.results,
        loading: false,
      }));
    } catch {
      setState((prevState) => ({
        ...prevState,
        results: [],
        loading: false,
        error: new Error('Something went wrong while loading results.'),
      }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-295 flex-col gap-2 px-6 py-8">
        <button
          type="button"
          className="group flex w-fit items-center gap-2 self-end overflow-hidden p-1 text-sm font-medium text-slate-600 transition-all duration-300 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
          aria-label="Learn more about the app"
          onClick={() => navigate('/about')}
        >
          <img
            src="./about-icon.svg"
            className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:scale-105"
            alt="About"
          />
          <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-500 group-hover:max-w-48 group-hover:opacity-100 group-focus:max-w-48 group-focus:opacity-100 cursor-pointer">
            Learn more about the app
          </span>
        </button>
        <SearchLine
          value={query}
          onChange={handleQueryChange}
          onSearch={handleSearch}
        />
        <ResultsSection results={results} loading={loading} error={error} />
        <TestButton />
      </div>
    </div>
  );
};

export default MainPage;
