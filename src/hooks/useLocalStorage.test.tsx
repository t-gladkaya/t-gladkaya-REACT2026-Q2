import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
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

  it('updates state and localStorage', () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByRole('button', { name: /update value/i }));

    expect(screen.getByTestId('stored-value')).toHaveTextContent('updated');
    expect(localStorage.getItem('testKey')).toBe('updated');
  });
});
