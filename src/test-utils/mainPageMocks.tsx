import { vi } from 'vitest';

interface SearchLineMockProps {
  value: string;
  onChange: (query: string) => void;
  onSearch: () => void;
}

interface ResultsSectionMockProps {
  results: { id: string; name: string }[];
  loading: boolean;
  error: Error | null;
}

interface PaginationMockProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

vi.mock('../components/SearchLine', () => ({
  default: ({ value, onChange, onSearch }: SearchLineMockProps) => (
    <div data-testid="search-line">
      <span data-testid="search-value">{value}</span>
      <button onClick={() => onChange('rick')}>Change query</button>
      <button onClick={onSearch}>Search</button>
    </div>
  ),
}));

vi.mock('../components/ResultsSection', () => ({
  default: ({ results, loading, error }: ResultsSectionMockProps) => (
    <div data-testid="results-section">
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="error">{error?.message ?? ''}</span>
      <span data-testid="results-count">{results.length}</span>
      {results.map((item) => (
        <span key={item.id}>{item.name}</span>
      ))}
    </div>
  ),
}));

vi.mock('../components/TestButton', () => ({
  default: () => <div data-testid="test-button" />,
}));

vi.mock('../components/Pagination', () => ({
  default: ({ currentPage, totalPages, onPageChange }: PaginationMockProps) => (
    <div data-testid="pagination">
      <span data-testid="pagination-value">
        {currentPage} / {totalPages}
      </span>
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <button key={page} type="button" onClick={() => onPageChange(page)}>
            {page}
          </button>
        );
      })}
    </div>
  ),
}));
