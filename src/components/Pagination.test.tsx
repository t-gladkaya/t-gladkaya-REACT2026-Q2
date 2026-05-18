import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('does not render when there is only one page', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders all page buttons when total pages are five or fewer', () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={vi.fn()} />
    );

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });

  it('shows gaps when there are many pages', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={vi.fn()} />
    );

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '5' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(screen.getByRole('button', { name: '6' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument();
    expect(screen.getAllByText('...')).toHaveLength(2);
  });

  it('disables previous button on the first page and next button on the last page', () => {
    const { rerender } = render(
      <Pagination currentPage={1} totalPages={3} onPageChange={vi.fn()} />
    );

    expect(
      screen.getByRole('button', { name: /go to previous page/i })
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: /go to next page/i })
    ).toBeEnabled();

    rerender(
      <Pagination currentPage={3} totalPages={3} onPageChange={vi.fn()} />
    );

    expect(
      screen.getByRole('button', { name: /go to previous page/i })
    ).toBeEnabled();
    expect(
      screen.getByRole('button', { name: /go to next page/i })
    ).toBeDisabled();
  });

  it('calls onPageChange when user clicks controls', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );

    await user.click(
      screen.getByRole('button', { name: /go to previous page/i })
    );
    await user.click(screen.getByRole('button', { name: /go to next page/i }));
    await user.click(screen.getByRole('button', { name: '5' }));

    expect(onPageChange).toHaveBeenNthCalledWith(1, 2);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 4);
    expect(onPageChange).toHaveBeenNthCalledWith(3, 5);
  });
});
