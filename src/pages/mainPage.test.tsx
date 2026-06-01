import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import { vi } from 'vitest';
import '../test-utils/mainPageMocks';
import { ThemeProvider } from '../context/ThemeProvider';
import MainPage from './mainPage';
import { Provider } from 'react-redux';
import { createAppStore } from '../app/state';

const response = (body: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  });

const expectFetchUrl = (
  expectedUrl: string,
  expectedParams: Record<string, string>
) => {
  const urls = vi.mocked(fetch).mock.calls.map(([request]) => {
    const url = request instanceof Request ? request.url : String(request);
    return new URL(url);
  });

  expect(
    urls.some((url) => {
      if (url.origin + url.pathname !== expectedUrl) {
        return false;
      }

      return Object.entries(expectedParams).every(
        ([key, value]) => url.searchParams.get(key) === value
      );
    })
  ).toBe(true);
};

const renderMainPage = () =>
  render(
    <Provider store={createAppStore()}>
      <ThemeProvider>
        <MemoryRouter initialEntries={['/page/1']}>
          <Routes>
            <Route path="/page/:page" element={<MainPage />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    globalThis.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve(
        response({
          info: {
            pages: 2,
          },
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
        })
      )
    ) as unknown as typeof fetch;
  });

  it('renders child components', async () => {
    renderMainPage();

    expect(screen.getByTestId('search-line')).toBeInTheDocument();
    expect(screen.getByTestId('results-section')).toBeInTheDocument();
    expect(await screen.findByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('test-button')).toBeInTheDocument();
  });

  it('loads saved search term on mount', async () => {
    localStorage.setItem('lastInput', 'morty');

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

    expect(localStorage.getItem('lastInput')).toBe('rick');

    await waitFor(() => {
      expectFetchUrl('https://rickandmortyapi.com/api/character', {
        name: 'rick',
        page: '1',
      });
    });

    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('passes empty results when API returns 404', async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValue(
        response({}, { status: 404 })
      ) as unknown as typeof fetch;

    renderMainPage();

    await waitFor(() => {
      expect(screen.getByTestId('results-count')).toHaveTextContent('0');
    });

    expect(screen.getByTestId('error')).toHaveTextContent('');
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
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
    localStorage.setItem('lastInput', 'rick');

    const user = userEvent.setup();

    renderMainPage();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    vi.mocked(fetch).mockClear();

    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expectFetchUrl('https://rickandmortyapi.com/api/character', {
        name: 'rick',
        page: '1',
      });
    });

    vi.mocked(fetch).mockClear();

    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(fetch).not.toHaveBeenCalled();
  });

  it('fetches selected page when pagination changes', async () => {
    const user = userEvent.setup();

    renderMainPage();

    await waitFor(() => {
      expectFetchUrl('https://rickandmortyapi.com/api/character', {
        page: '1',
      });
    });

    vi.mocked(fetch).mockClear();

    await user.click(screen.getByRole('button', { name: '2' }));

    await waitFor(() => {
      expectFetchUrl('https://rickandmortyapi.com/api/character', {
        page: '2',
      });
    });
  });

  it('reuses cached page data when returning to a previously loaded page', async () => {
    const user = userEvent.setup();

    renderMainPage();

    await waitFor(() => {
      expectFetchUrl('https://rickandmortyapi.com/api/character', {
        page: '1',
      });
    });

    vi.mocked(fetch).mockClear();

    await user.click(screen.getByRole('button', { name: '2' }));

    await waitFor(() => {
      expectFetchUrl('https://rickandmortyapi.com/api/character', {
        page: '2',
      });
    });

    vi.mocked(fetch).mockClear();

    await user.click(screen.getByRole('button', { name: '1' }));

    await waitFor(() => {
      expect(screen.getByTestId('pagination-value')).toHaveTextContent('1 / 2');
    });

    expect(fetch).not.toHaveBeenCalled();
  });

  it('refetches current page when refresh button is clicked', async () => {
    const user = userEvent.setup();

    renderMainPage();

    await waitFor(() => {
      expectFetchUrl('https://rickandmortyapi.com/api/character', {
        page: '1',
      });
    });

    vi.mocked(fetch).mockClear();

    await user.click(screen.getByRole('button', { name: /refresh data/i }));

    await waitFor(() => {
      expectFetchUrl('https://rickandmortyapi.com/api/character', {
        page: '1',
      });
    });
  });
});
