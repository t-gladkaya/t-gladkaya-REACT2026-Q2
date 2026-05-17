import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import Card, { type Character } from './Card';

const mockCharacter: Character = {
  id: '1',
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

describe('Card component', () => {
  it('renders character information correctly', () => {
    render(
      <MemoryRouter>
        <Card data={mockCharacter} detailsHref="/page/1/details/1" />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /rick sanchez/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/status:/i).closest('p')).toHaveTextContent(
      'Status: Alive'
    );
    expect(screen.getByText(/species:/i).closest('p')).toHaveTextContent(
      'Species: Human'
    );
    expect(screen.getByText(/gender:/i).closest('p')).toHaveTextContent(
      'Gender: Male'
    );

    const image = screen.getByRole('img', { name: /character image/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCharacter.image);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/page/1/details/1'
    );
  });
});
