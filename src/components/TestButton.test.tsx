import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import TestButton from './TestButton';
import ErrorBoundary from './ErrorBoundary';
import { Provider } from 'react-redux';
import { createAppStore } from '../app/state';

const renderTestButton = (withErrorBoundary = false) => {
  const content = withErrorBoundary ? (
    <ErrorBoundary>
      <TestButton />
    </ErrorBoundary>
  ) : (
    <TestButton />
  );

  return render(<Provider store={createAppStore()}>{content}</Provider>);
};

describe('TestButton', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders without crashing', () => {
    renderTestButton();

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

    renderTestButton(true);

    await user.click(screen.getByRole('button', { name: /test button/i }));

    expect(await screen.findByText(/^request failed$/i)).toBeInTheDocument();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('shows default request failed message when caught value is not an Error', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockRejectedValue('Request failed');

    const user = userEvent.setup();

    renderTestButton(true);

    await user.click(screen.getByRole('button', { name: /test button/i }));

    expect(await screen.findByText(/^request failed$/i)).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
