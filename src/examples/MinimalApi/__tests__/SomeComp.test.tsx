import { SomeComp } from '../SomeComp';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('SomeComp', () => {
  test('renders color prop', () => {
    render(<SomeComp />);
    const el = screen.getByText(/Current color: blue/i);
    expect(el).toBeInTheDocument();
  });

  test('switches from blue to green', () => {
    render(<SomeComp />);
    const button = screen.getByRole('button');
    expect(screen.getByRole('button')).toBeInTheDocument();

    userEvent.click(button);

    const el = screen.getByText(/Current color: green/i);
    expect(el).toBeInTheDocument();
  });
});
