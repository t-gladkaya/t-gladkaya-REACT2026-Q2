import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterEach, beforeEach, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

const BrokenComponent = () => {
  throw new Error('Boundary test error');
};

describe('ErrorBoundary component', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Application content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText(/application content/i)).toBeInTheDocument();
  });

  it('renders fallback when a child throws an error', () => {
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/boundary test error/i)).toBeInTheDocument();
  });
});
