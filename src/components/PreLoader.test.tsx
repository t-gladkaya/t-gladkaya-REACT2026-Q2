import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PreLoader from './PreLoader';

describe('PreLoader component', () => {
  it('renders loading status', () => {
    render(<PreLoader />);

    expect(
      screen.getByRole('status', { name: /loading/i })
    ).toBeInTheDocument();
  });
});
