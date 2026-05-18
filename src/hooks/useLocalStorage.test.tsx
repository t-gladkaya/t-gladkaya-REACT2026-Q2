import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useLocalStorage } from './useLocalStorage';

const TestComponent = () => {
  const [value, setValue] = useLocalStorage('testKey', 'initial');

  return (
    <div>
      <span data-testid="stored-value">{value}</span>
      <button type="button" onClick={() => setValue('updated')}>
        Update value
      </button>
    </div>
  );
};

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns initial value when localStorage is empty', () => {
    render(<TestComponent />);

    expect(screen.getByTestId('stored-value')).toHaveTextContent('initial');
  });

  it('returns saved value from localStorage', () => {
    localStorage.setItem('testKey', 'saved');

    render(<TestComponent />);

    expect(screen.getByTestId('stored-value')).toHaveTextContent('saved');
  });

  it('updates state and localStorage', async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    await user.click(screen.getByRole('button', { name: /update value/i }));

    expect(screen.getByTestId('stored-value')).toHaveTextContent('updated');
    expect(localStorage.getItem('testKey')).toBe('updated');
  });
});
