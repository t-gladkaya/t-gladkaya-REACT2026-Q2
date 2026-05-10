import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

vi.mock('./pages/mainPage', () => ({
  default: () => <div data-testid="main-page">Main Page</div>,
}));

describe('App', () => {
  it('renders MainPage', () => {
    render(<App />);

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });
});
