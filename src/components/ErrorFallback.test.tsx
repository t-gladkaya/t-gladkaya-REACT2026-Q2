import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorFallback from './ErrorFallback';

describe('ErrorFallback component', () => {
  it('renders error message', () => {
    render(<ErrorFallback error={new Error('Request failed')} />);

    expect(screen.getByText(/request failed/i)).toBeInTheDocument();
  });

  it('renders default error message when error is null', () => {
    render(<ErrorFallback error={null} />);

    expect(
      screen.getByText(/an unexpected error occurred/i)
    ).toBeInTheDocument();
  });
});
