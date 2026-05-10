import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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
    render(<ResultsSection results={[]} loading={true} error={null} />);

    expect(
      screen.getByRole('status', { name: /loading/i })
    ).toBeInTheDocument();
  });

  it('displays error state', () => {
    render(
      <ResultsSection
        results={[]}
        loading={false}
        error={new Error('Failed to fetch data')}
      />
    );

    expect(screen.getByText(/failed to fetch data/i)).toBeInTheDocument();
  });

  it('displays no results message', () => {
    render(<ResultsSection results={[]} loading={false} error={null} />);

    expect(
      screen.getByText(/nothing found for this search/i)
    ).toBeInTheDocument();
  });

  it('displays results correctly', () => {
    render(
      <ResultsSection results={mockResults} loading={false} error={null} />
    );

    expect(
      screen.getByRole('heading', { name: /rick sanchez/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /morty smith/i })
    ).toBeInTheDocument();
  });
});
