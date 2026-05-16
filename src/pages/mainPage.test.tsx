import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';
import { getMainPageStorageMocks } from '../test-utils/mainPageMocks';
import MainPage from './mainPage';

const mainPageStorageMocks = getMainPageStorageMocks();

const renderMainPage = () =>
  render(
    <MemoryRouter>
      <MainPage />
    </MemoryRouter>
  );

describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mainPageStorageMocks.getSavedSearchTerm.mockReturnValue('');

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
    renderMainPage();

    expect(screen.getByTestId('search-line')).toBeInTheDocument();
    expect(screen.getByTestId('results-section')).toBeInTheDocument();
    expect(screen.getByTestId('test-button')).toBeInTheDocument();
  });

  it('loads saved search term on mount', async () => {
    mainPageStorageMocks.getSavedSearchTerm.mockReturnValue('morty');

    renderMainPage();

    expect(await screen.findByTestId('search-value')).toHaveTextContent(
      'morty'
    );
  });

  it('updates query when SearchLine calls onChange', async () => {
    const user = userEvent.setup();

    renderMainPage();

    await user.click(screen.getByRole('button', { name: /change query/i }));

    expect(screen.getByTestId('search-value')).toHaveTextContent('rick');
  });

  it('saves query and fetches results after search', async () => {
    const user = userEvent.setup();

    renderMainPage();

    await user.click(screen.getByRole('button', { name: /change query/i }));
    await screen.findByText('rick');

    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(mainPageStorageMocks.saveSearchTerm).toHaveBeenCalledWith('rick');

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

    renderMainPage();

    await waitFor(() => {
      expect(screen.getByTestId('results-count')).toHaveTextContent('0');
    });
  });

  it('passes error to ResultsSection when request fails', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    renderMainPage();

    expect(
      await screen.findByText(/something went wrong while loading results/i)
    ).toBeInTheDocument();
  });

  it('passes error to ResultsSection when API returns non-ok response', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    }) as unknown as typeof fetch;

    renderMainPage();

    expect(
      await screen.findByText(/something went wrong while loading results/i)
    ).toBeInTheDocument();
  });

  it('does not fetch again when searching the same query twice', async () => {
    mainPageStorageMocks.getSavedSearchTerm.mockReturnValue('rick');

    const user = userEvent.setup();

    renderMainPage();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    vi.mocked(fetch).mockClear();

    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character?name=rick'
      );
    });

    vi.mocked(fetch).mockClear();

    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(fetch).not.toHaveBeenCalled();
  });
});
