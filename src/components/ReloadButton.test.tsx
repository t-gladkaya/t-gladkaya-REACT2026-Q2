import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import ReloadButton from './ReloadButton';
import userEvent from '@testing-library/user-event';

describe('ReloadButton component', () => {
  it('should trigger page reload on click', async () => {
    const reloadSpy = vi.fn();

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: reloadSpy },
    });

    render(<ReloadButton />);

    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /reload the page/i });

    await user.click(button);
    expect(reloadSpy).toHaveBeenCalledTimes(1);

    vi.restoreAllMocks();
  });
});
