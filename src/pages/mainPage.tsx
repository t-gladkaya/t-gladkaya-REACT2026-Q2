import React from 'react';
import SearchLine from '../components/SearchLine';
import ResultsSection from '../components/ResultsSection';
import TestButton from '../components/TestButton';
import Pagination from '../components/Pagination';
import type { Character } from '../components/Card';
import { API_URLS } from '../api/api';
import { useNavigate, useSearchParams } from 'react-router';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface CharacterResponse {
  info: {
    pages: number;
  };
  results: Character[];
}

interface MainPageState {
  query: string;
  lastSearchedQuery: string | null;
  results: Character[];
  loading: boolean;
  error: Error | null;
  totalPages: number;
}

const fetchCharacter = async (
  query: string,
  page: number
): Promise<CharacterResponse> => {
  let lastError: unknown;

  for (const apiUrl of API_URLS) {
    try {
      const trimmedQuery = query.trim();

      const params = new URLSearchParams();

      if (trimmedQuery) {
        params.set('name', trimmedQuery);
      }
      params.set('page', page.toString());

      const response = await fetch(`${apiUrl}?${params.toString()}`);

      if (response.status === 404) {
        return { results: [], info: { pages: 0 } };
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
  const [savedQuery, saveSearchTerm] = useLocalStorage('lastInput', '');
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page') ?? '1');
  const currentPage =
    Number.isNaN(pageFromUrl) || pageFromUrl < 1 ? 1 : pageFromUrl;

  const [state, setState] = React.useState<MainPageState>({
    query: savedQuery.trim(),
    lastSearchedQuery: '',
    results: [],
    loading: true,
    error: null,
    totalPages: 1,
  });

  const { query, results, loading, error, totalPages } = state;

  React.useEffect(() => {
    if (!searchParams.has('page')) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set('page', '1');
      setSearchParams(nextParams);
    }
  }, [searchParams, setSearchParams]);

  React.useEffect(() => {
    let isCancelled = false;

    const loadPage = async () => {
      try {
        const data = await fetchCharacter(
          state.lastSearchedQuery ?? '',
          currentPage
        );

        if (isCancelled) {
          return;
        }

        setState((prevState) => ({
          ...prevState,
          results: data.results,
          loading: false,
          totalPages: data.info.pages,
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

    void loadPage();

    return () => {
      isCancelled = true;
    };
  }, [currentPage, state.lastSearchedQuery]);

  const handleQueryChange = (query: string) => {
    setState((prevState) => ({
      ...prevState,
      query,
    }));
  };

  const handleSearch = async () => {
    const trimmedQuery = state.query.trim();

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', '1');
    setSearchParams(nextParams);

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
  };

  const handlePageChange = (page: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', page.toString());
    setSearchParams(nextParams);

    setState((prevState) => ({
      ...prevState,
      loading: true,
      error: null,
    }));
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <TestButton />
      </div>
    </div>
  );
};

export default MainPage;
