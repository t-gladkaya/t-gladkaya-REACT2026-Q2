import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import TestButton from './TestButton';
import ErrorBoundary from './ErrorBoundary';

describe('TestButton', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders without crashing', () => {
    render(<TestButton />);

    expect(
      screen.getByRole('button', { name: /test button/i })
    ).toBeInTheDocument();
  });

  it('shows error boundary when request fails', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);

    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <TestButton />
      </ErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: /test button/i }));

    expect(
      await screen.findByText(/request failed with status 404/i)
    ).toBeInTheDocument();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
