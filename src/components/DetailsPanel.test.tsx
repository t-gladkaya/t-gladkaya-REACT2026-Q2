import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import { afterEach, vi } from 'vitest';
import { Provider } from 'react-redux';
import { createAppStore } from '../app/state';
import DetailsPanel from './DetailsPanel';

const character = {
  id: '1',
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
  },
  location: {
    name: 'Citadel of Ricks',
  },
  image: 'https://example.com/rick.png',
  episode: ['episode-1', 'episode-2'],
  created: '2017-11-04T18:48:46.250Z',
};

const renderDetailsPanel = (initialPath = '/page/3/details/1') =>
  render(
    <Provider store={createAppStore()}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/page/:page" element={<div>Main page</div>} />
          <Route path="/page/:page/details/:id" element={<DetailsPanel />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

const response = (body: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  });

const getFetchUrls = () =>
  vi
    .mocked(fetch)
    .mock.calls.map(([request]) =>
      request instanceof Request ? request.url : String(request)
    );

describe('DetailsPanel', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows loader while character details are loading', () => {
    globalThis.fetch = vi.fn(
      () => new Promise(() => {})
    ) as unknown as typeof fetch;

    renderDetailsPanel();

    expect(
      screen.getByRole('status', { name: /loading/i })
    ).toBeInTheDocument();
  });

  it('fetches and renders character details', async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValue(response(character)) as unknown as typeof fetch;

    renderDetailsPanel();

    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Rick Sanchez' })).toHaveAttribute(
      'src',
      character.image
    );
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByText('Species')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('Origin')).toBeInTheDocument();
    expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
    expect(screen.getByText('Episodes')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    await waitFor(() => {
      expect(getFetchUrls()).toContain(
        'https://rickandmortyapi.com/api/character/1'
      );
    });
  });

  it('shows error message when details request fails', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    renderDetailsPanel();

    expect(
      await screen.findByText(/something went wrong while loading details/i)
    ).toBeInTheDocument();
  });

  it('navigates back to current page when close button is clicked', async () => {
    const user = userEvent.setup();

    globalThis.fetch = vi
      .fn()
      .mockResolvedValue(response(character)) as unknown as typeof fetch;

    renderDetailsPanel();

    await screen.findByText('Rick Sanchez');
    await user.click(screen.getByRole('button', { name: /close details/i }));

    expect(screen.getByText('Main page')).toBeInTheDocument();
  });
});
