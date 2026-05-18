import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import NotFound from './notFound';

const renderNotFound = (initialPath = '/unknown') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/" element={<div>Main page</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MemoryRouter>
  );

describe('NotFound', () => {
  it('renders not found message and navigation button', () => {
    renderNotFound();

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText(/the page you are looking for could not be found/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /to main page/i })
    ).toBeInTheDocument();
  });

  it('navigates to main page when button is clicked', async () => {
    const user = userEvent.setup();

    renderNotFound();

    await user.click(screen.getByRole('button', { name: /to main page/i }));

    expect(screen.getByText('Main page')).toBeInTheDocument();
  });
});
