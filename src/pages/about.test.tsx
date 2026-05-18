import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import AboutPage from './about';

const renderAboutPage = () =>
  render(
    <MemoryRouter initialEntries={['/about']}>
      <Routes>
        <Route path="/" element={<div>Main page</div>} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </MemoryRouter>
  );

describe('AboutPage', () => {
  it('renders all elements correctly', () => {
    renderAboutPage();

    expect(
      screen.getByRole('heading', { name: /about this app/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/this app is designed for searching rick and morty/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /about/i })).toBeInTheDocument();

    const githubLink = screen.getByRole('link', { name: /github profile/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/t-gladkaya');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(screen.getByText('Created by')).toBeInTheDocument();
    expect(screen.getByText('@t-gladkaya')).toBeInTheDocument();

    const courseLink = screen.getByRole('link', { name: /rs school/i });
    expect(courseLink).toHaveAttribute('href', 'https://rs.school/');
    expect(courseLink).toHaveAttribute('target', '_blank');
    expect(screen.getByText('Course')).toBeInTheDocument();
    expect(screen.getByText('RS School React')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /to main page/i })
    ).toBeInTheDocument();
  });

  it('navigates to main page when button is clicked', async () => {
    const user = userEvent.setup();

    renderAboutPage();

    await user.click(screen.getByRole('button', { name: /to main page/i }));

    expect(screen.getByText('Main page')).toBeInTheDocument();
  });
});
