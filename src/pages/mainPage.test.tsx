import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import MainPage from './mainPage';

const mocks = vi.hoisted(() => ({
  getSavedSearchTerm: vi.fn(),
  saveSearchTerm: vi.fn(),
}));

vi.mock('../utils/handleLocalStorage', () => ({
  getSavedSearchTerm: mocks.getSavedSearchTerm,
  saveSearchTerm: mocks.saveSearchTerm,
}));

vi.mock('../components/SearchLine', () => ({
  default: ({
    value,
    onChange,
    onSearch,
  }: {
    value: string;
    onChange: (query: string) => void;
    onSearch: () => void;
  }) => (
    <div data-testid="search-line">
      <span data-testid="search-value">{value}</span>
      <button onClick={() => onChange('rick')}>Change query</button>
      <button onClick={onSearch}>Search</button>
    </div>
  ),
}));

vi.mock('../components/ResultsSection', () => ({
  default: ({
    results,
    loading,
    error,
  }: {
    results: { id: string; name: string }[];
    loading: boolean;
    error: Error | null;
  }) => (
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

describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mocks.getSavedSearchTerm.mockReturnValue('');

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        results: [
          {
            id: '1',
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            gender: 'Male',
            image: 'image-url',
          },
        ],
      }),
    }) as unknown as typeof fetch;
  });

  it('renders child components', () => {
    render(<MainPage />);

    expect(screen.getByTestId('search-line')).toBeInTheDocument();
    expect(screen.getByTestId('results-section')).toBeInTheDocument();
    expect(screen.getByTestId('test-button')).toBeInTheDocument();
  });

  it('loads saved search term on mount', async () => {
    mocks.getSavedSearchTerm.mockReturnValue('morty');

    render(<MainPage />);

    expect(await screen.getByTestId('search-value')).toHaveTextContent('morty');
  });

  it('updates query when SearchLine calls onChange', async () => {
    const user = userEvent.setup();

    render(<MainPage />);

    await user.click(screen.getByRole('button', { name: /change query/i }));

    expect(screen.getByTestId('search-value')).toHaveTextContent('rick');
  });

  it('saves query and fetches results after search', async () => {
    const user = userEvent.setup();

    render(<MainPage />);

    await user.click(screen.getByRole('button', { name: /change query/i }));
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(mocks.saveSearchTerm).toHaveBeenCalledWith('rick');

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character?name=rick'
      );
    });

    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('passes empty results when API returns 404', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    }) as unknown as typeof fetch;

    render(<MainPage />);

    await waitFor(() => {
      expect(screen.getByTestId('results-count')).toHaveTextContent('0');
    });
  });

  it('passes error to ResultsSection when request fails', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    render(<MainPage />);

    expect(
      await screen.findByText(/something went wrong while loading results/i)
    ).toBeInTheDocument();
  });
});
