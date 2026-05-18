import React from 'react';
import SearchLine from '../components/SearchLine';
import ResultsSection from '../components/ResultsSection';
import TestButton from '../components/TestButton';
import Pagination from '../components/Pagination';
import { useNavigate, useParams, Outlet } from 'react-router';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useCharacters } from '../hooks/useCharacters';

interface MainPageState {
  query: string;
  lastSearchedQuery: string | null;
}

const MainPage = () => {
  const navigate = useNavigate();
  const [savedQuery, saveSearchTerm] = useLocalStorage('lastInput', '');
  const { page } = useParams();

  const pageFromUrl = Number(page ?? '1');
  const currentPage =
    Number.isNaN(pageFromUrl) || pageFromUrl < 1 ? 1 : pageFromUrl;

  const [state, setState] = React.useState<MainPageState>({
    query: savedQuery.trim(),
    lastSearchedQuery: '',
  });

  const { query, lastSearchedQuery } = state;
  const { results, loading, error, totalPages } = useCharacters(
    lastSearchedQuery ?? '',
    currentPage
  );

  const handleQueryChange = (query: string) => {
    setState((prevState) => ({
      ...prevState,
      query,
    }));
  };

  const handleSearch = async () => {
    const trimmedQuery = state.query.trim();

    navigate('/page/1');

    if (trimmedQuery === state.lastSearchedQuery) {
      return;
    }

    saveSearchTerm(trimmedQuery);

    setState((prevState) => ({
      ...prevState,
      query: trimmedQuery,
      lastSearchedQuery: trimmedQuery,
    }));
  };

  const handlePageChange = (page: number) => {
    navigate(`/page/${page}`);
  };

  const handleMainPanelClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (target.closest('a, button, input')) {
      return;
    }

    navigate(`/page/${currentPage}`);
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-50 text-slate-900">
      <div className="mx-auto flex h-screen max-w-350 flex-col gap-2 px-6 py-4">
        <button
          type="button"
          className="group flex w-fit items-center gap-2 self-end overflow-hidden p-1 text-sm font-medium text-slate-600 transition-all duration-300 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
          aria-label="Learn more about the app"
          onClick={() => navigate('/about')}
        >
          <img
            src="/about-icon.svg"
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

        <div className="flex min-h-0 min-w-0 flex-1 items-stretch gap-6">
          <div
            className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onClick={handleMainPanelClick}
          >
            <ResultsSection
              results={results}
              loading={loading}
              currentPage={currentPage}
              error={error}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <TestButton />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
