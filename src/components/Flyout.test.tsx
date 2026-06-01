import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearSelectedItems, selectItem, store } from '../app/state';
import Flyout from './Flyout';

describe('Flyout component', () => {
  const createObjectURL = vi.fn<typeof URL.createObjectURL>(
    () => 'blob:csv-url'
  );
  const revokeObjectURL = vi.fn();

  beforeEach(() => {
    store.dispatch(clearSelectedItems());

    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: createObjectURL,
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: revokeObjectURL,
    });

    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(vi.fn());
  });

  afterEach(() => {
    store.dispatch(clearSelectedItems());
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it('downloads selected item details as CSV', async () => {
    const user = userEvent.setup();

    store.dispatch(
      selectItem({
        id: '1',
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth (C-137)' },
        location: { name: 'Citadel of Ricks' },
        episode: ['episode-1'],
        detailsUrl: '/page/1/details/1',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      })
    );

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    await user.click(screen.getByRole('button', { name: /download/i }));

    expect(createObjectURL).toHaveBeenCalled();

    const [blob] = createObjectURL.mock.calls[0];

    expect(blob).toBeInstanceOf(Blob);

    const csv = await (blob as Blob).text();

    expect(csv).toContain(
      'id,name,status,species,type,gender,origin,location,detailsUrl,image'
    );
    expect(csv).toContain('"Alive"');
    expect(csv).toContain('"Human"');
    expect(csv).toContain('"Earth (C-137)"');
    expect(csv).toContain('"/page/1/details/1"');
    expect(csv).toContain('"Citadel of Ricks"');
  });
});
