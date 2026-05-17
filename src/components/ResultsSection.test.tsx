import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import ResultsSection from './ResultsSection';
import type { Character } from './Card';

const mockResults: Character[] = [
  {
    id: '1',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
  {
    id: '2',
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
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
      <MemoryRouter>
        <ResultsSection
          results={mockResults}
          loading={false}
          currentPage={2}
          error={null}
        />
      </MemoryRouter>
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
