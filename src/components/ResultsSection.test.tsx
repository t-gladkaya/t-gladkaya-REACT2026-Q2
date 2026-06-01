import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../app/state';
import ResultsSection from './ResultsSection';
import type { Character } from '../types/types';

const mockResults: Character[] = [
  {
    id: '1',
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
    },
    location: {
      name: 'Earth (C-137)',
    },
    episode: [],
    detailsUrl: '/page/1/details/1',
  },
  {
    id: '2',
    name: 'Morty Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
    },
    location: {
      name: 'Earth (C-137)',
    },
    episode: [],
    detailsUrl: '/page/1/details/2',
  },
];

describe('ResultsSection', () => {
  it('displays loading state', () => {
    render(
      <ResultsSection
        results={[]}
        loading={true}
        currentPage={1}
        error={null}
      />
    );

    expect(
      screen.getByRole('status', { name: /loading/i })
    ).toBeInTheDocument();
  });

  it('displays error state', () => {
    render(
      <ResultsSection
        results={[]}
        loading={false}
        currentPage={1}
        error={new Error('Failed to fetch data')}
      />
    );

    expect(screen.getByText(/failed to fetch data/i)).toBeInTheDocument();
  });

  it('displays no results message', () => {
    render(
      <ResultsSection
        results={[]}
        loading={false}
        currentPage={1}
        error={null}
      />
    );

    expect(
      screen.getByText(/nothing found for this search/i)
    ).toBeInTheDocument();
  });

  it('displays results correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResultsSection
            results={mockResults}
            loading={false}
            currentPage={2}
            error={null}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByRole('heading', { name: /rick sanchez/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /morty smith/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('link')[0]).toHaveAttribute(
      'href',
      '/page/2/details/1'
    );
  });
});
