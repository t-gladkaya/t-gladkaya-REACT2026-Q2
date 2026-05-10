import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import SearchLine from './SearchLine';

describe('SearchLine component', () => {
  it('renders input and button correctly', async () => {
    const mockOnChange = vi.fn();
    const mockOnSearch = vi.fn();
    const user = userEvent.setup();

    render(
      <SearchLine
        value="test"
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test');
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
