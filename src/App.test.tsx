import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { vi } from 'vitest';
import App from './App';
import MainPage from './pages/mainPage';

vi.mock('./pages/mainPage', () => ({
  default: () => <div data-testid="main-page">Main Page</div>,
}));

describe('App', () => {
  it('renders MainPage', () => {
    const router = createMemoryRouter([
      {
        path: '/',
        element: <App />,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
        ],
      },
    ]);

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });
});
