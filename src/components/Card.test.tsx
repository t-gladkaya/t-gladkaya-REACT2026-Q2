import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../app/state';
import Card from './Card';
import type { Character } from '../types/types';

const mockCharacter: Character = {
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
};

describe('Card component', () => {
  it('renders character information correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card data={mockCharacter} detailsHref="/page/1/details/1" />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByRole('heading', { name: /rick sanchez/i })
    ).toBeInTheDocument();

    const image = screen.getByRole('img', { name: /character image/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCharacter.image);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/page/1/details/1'
    );
  });
});
